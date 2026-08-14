/**
 * Assistant settings as they travel in a WebDAV snapshot: config plus
 * decrypted provider keys, never the OS-keystore ciphertext.
 *
 * `electron` is stubbed so it runs under plain node. The stub's keystore is
 * available, because the whole point of this path is that a key saved on one
 * machine can be restored on another.
 */
const Module = require("module");
const path = require("path");
const fs = require("fs");
const os = require("os");
const assert = require("assert");

const ROOT = path.join(__dirname, "..", "src", "main");
const userData = fs.mkdtempSync(path.join(os.tmpdir(), "cb-test-ai-settings-"));

const keystore = new Map();
const electronStub = {
  app: {
    getPath: () => userData,
    getVersion: () => "1.0.0",
    on: () => {},
    whenReady: () => new Promise(() => {}),
  },
  safeStorage: {
    isEncryptionAvailable: () => true,
    encryptString: (text) => {
      const token = Buffer.from(`enc:${text}`, "utf8");
      keystore.set(token.toString("base64"), text);
      return token;
    },
    decryptString: (buf) => {
      const text = keystore.get(Buffer.from(buf).toString("base64"));
      if (text == null) throw new Error("unknown ciphertext");
      return text;
    },
  },
};

const realLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "electron") return electronStub;
  return realLoad.call(this, request, parent, isMain);
};

const settings = require(path.join(ROOT, "ai", "settings"));

let passed = 0;
let failed = 0;
const check = (label, fn) => {
  try {
    fn();
    console.log(`  ok   ${label}`);
    passed++;
  } catch (error) {
    console.log(`  FAIL ${label}`);
    console.log(`       ${error.message}`);
    failed++;
  }
};

console.log("\nassistant settings snapshot");

check("export carries sanitized config and no keystore ciphertext", () => {
  settings.set({
    provider: "relay",
    relayBaseUrl: "https://relay.example.com/v1",
    relayModel: "gpt-4o",
    approval: "always",
    allowLocalTools: true,
    quickPrompts: ["uptime on every box"],
  });
  settings.setApiKey("sk-relay-secret", "relay");
  settings.setApiKey("xai-grok-secret", "grok");

  const snap = settings.exportAll();
  assert.strictEqual(snap.config.provider, "relay");
  assert.strictEqual(snap.config.relayBaseUrl, "https://relay.example.com/v1");
  assert.strictEqual(snap.config.relayModel, "gpt-4o");
  assert.strictEqual(snap.config.approval, "always");
  assert.strictEqual(snap.config.allowLocalTools, true);
  assert.deepStrictEqual(snap.quickPrompts || snap.config.quickPrompts, [
    "uptime on every box",
  ]);
  assert.strictEqual(snap.keys.relay, "sk-relay-secret");
  assert.strictEqual(snap.keys.grok, "xai-grok-secret");
  assert.ok(!snap.keys["claude-code"]);
  assert.ok(
    !JSON.stringify(snap).includes("enc:"),
    "keystore wrapping leaked into the snapshot"
  );
});

check("import restores config and re-encrypts keys for this machine", () => {
  settings.set({
    provider: "claude-code",
    relayBaseUrl: "",
    relayModel: "",
    approval: "writes",
    allowLocalTools: false,
    quickPrompts: [],
  });
  settings.setApiKey("", "relay");
  settings.setApiKey("", "grok");

  const result = settings.importAll({
    config: {
      provider: "relay",
      relayBaseUrl: "https://other.example.com/v1",
      relayModel: "kimi-k2",
      approval: "never",
      allowLocalTools: true,
      quickPrompts: ["df -h"],
    },
    keys: {
      relay: "sk-imported",
      grok: "xai-imported",
      bogus: "should-skip",
    },
  });

  assert.strictEqual(result.applied, true);
  assert.strictEqual(result.keys.restored, 2);
  assert.strictEqual(result.keys.skipped, 0);

  const after = settings.get();
  assert.strictEqual(after.provider, "relay");
  assert.strictEqual(after.relayBaseUrl, "https://other.example.com/v1");
  assert.strictEqual(after.relayModel, "kimi-k2");
  assert.strictEqual(after.approval, "never");
  assert.strictEqual(after.allowLocalTools, true);
  assert.strictEqual(after.hasApiKey, true);
  assert.strictEqual(settings.readApiKey("relay"), "sk-imported");
  assert.strictEqual(settings.readApiKey("grok"), "xai-imported");

  const onDisk = JSON.parse(
    fs.readFileSync(path.join(userData, "assistant.json"), "utf8")
  );
  assert.ok(
    !JSON.stringify(onDisk.keys).includes("sk-imported"),
    "plaintext key written to disk"
  );
  assert.ok(
    !("defaults" in onDisk.config),
    "view-only fields must not be stored"
  );
});

check("local model settings stay on this machine", () => {
  settings.set({
    provider: "local",
    localBaseUrl: "http://127.0.0.1:11434/v1",
    model: "qwen2.5-coder",
    approval: "writes",
  });
  settings.setApiKey("local-only-key", "local");

  const snap = settings.exportAll();
  assert.ok(!("localBaseUrl" in snap.config), "local address left the machine");
  assert.notStrictEqual(
    snap.config.provider,
    "local",
    "local provider travelled"
  );
  assert.ok(!snap.config.model, "local model name travelled");
  assert.ok(!snap.keys.local, "local key travelled");

  settings.set({
    provider: "local",
    localBaseUrl: "http://127.0.0.1:1234/v1",
    model: "this-box-gguf",
    approval: "always",
  });
  settings.setApiKey("keep-me", "local");

  settings.importAll({
    config: {
      provider: "local",
      localBaseUrl: "http://other-pc:1234/v1",
      model: "other-pc-gguf",
      approval: "never",
    },
    keys: { local: "other-pc-key", relay: "sk-from-other" },
  });

  const after = settings.get();
  assert.strictEqual(after.provider, "local");
  assert.strictEqual(after.localBaseUrl, "http://127.0.0.1:1234/v1");
  assert.strictEqual(after.model, "this-box-gguf");
  assert.strictEqual(after.approval, "never");
  assert.strictEqual(settings.readApiKey("local"), "keep-me");
  assert.strictEqual(settings.readApiKey("relay"), "sk-from-other");
});

check("a missing assistant block is a no-op", () => {
  const before = settings.get();
  const result = settings.importAll(null);
  assert.strictEqual(result.applied, false);
  assert.strictEqual(settings.get().provider, before.provider);
});

check("onChanged fires after a write", () => {
  let hits = 0;
  settings.onChanged(() => {
    hits += 1;
  });
  settings.set({ effort: "low" });
  assert.ok(hits >= 1, "settings write did not notify listeners");
});

console.log(
  `\n${passed} checks passed${failed > 0 ? `, ${failed} failed` : ""}`
);
if (failed > 0) process.exit(1);
