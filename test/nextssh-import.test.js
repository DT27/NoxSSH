/**
 * NextSSH backup import: parse, scan (secrets stay out of the scan result),
 * and apply (password hosts, keychain reuse, already-present skip).
 * `electron` is stubbed so this runs under plain node.
 */
const Module = require("module");
const path = require("path");
const fs = require("fs");
const os = require("os");
const assert = require("assert");

const ROOT = path.join(__dirname, "..", "src", "main");

let userData = fs.mkdtempSync(path.join(os.tmpdir(), "nox-nextssh-"));

const electronStub = {
  app: {
    getPath: (what) => (what === "userData" ? userData : os.tmpdir()),
    getVersion: () => "1.0.0",
  },
  safeStorage: {
    isEncryptionAvailable: () => false,
    encryptString: () => {
      throw new Error("unavailable");
    },
    decryptString: () => {
      throw new Error("unavailable");
    },
  },
};

const realLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "electron") return electronStub;
  return realLoad.call(this, request, parent, isMain);
};

const fresh = (name) => {
  for (const key of Object.keys(require.cache)) {
    if (key.includes(`${path.sep}main${path.sep}`)) delete require.cache[key];
  }
  return require(path.join(ROOT, name));
};

let passed = 0;
const check = (label, fn) => {
  try {
    fn();
    console.log(`  ok   ${label}`);
    passed++;
  } catch (error) {
    console.log(`  FAIL ${label}`);
    console.log(`       ${error.message}`);
    process.exitCode = 1;
  }
};

const SHARED_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAKjC0n0testkeymaterialnotreal000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
AgMBAAECQQC00000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
AiEAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
-----END RSA PRIVATE KEY-----`;

function writeBackup(filePath, servers) {
  fs.writeFileSync(
    filePath,
    JSON.stringify({
      version: 1,
      createdAt: 1700000000000,
      data: [{ _id: "setting/theme", value: "dark" }, ...servers],
    })
  );
}

function server(id, extra) {
  return {
    _id: `ssh_server/${id}`,
    name: extra.name || id,
    tags: extra.tags || [],
    lastConnectedAt: extra.lastConnectedAt || 0,
    connect: {
      host: extra.host,
      port: extra.port ?? 22,
      auth: {
        username: extra.username || "",
        password: extra.password || "",
        privateKey: extra.privateKey || "",
        keyboardInteractive: extra.keyboardInteractive || false,
      },
    },
  };
}

console.log("\nnextssh import");

check("rejects non-JSON", () => {
  const nextssh = fresh("nextssh-import.js");
  const parsed = nextssh.parseBackup("not json {");
  assert.ok(parsed.error);
  assert.strictEqual(parsed.servers.length, 0);
});

check("rejects JSON that is not a NextSSH backup", () => {
  const nextssh = fresh("nextssh-import.js");
  const parsed = nextssh.parseBackup(
    JSON.stringify({ hosts: [{ name: "x" }] })
  );
  assert.match(parsed.error, /not a NextSSH backup/i);
  assert.strictEqual(parsed.servers.length, 0);
});

check("parseBackup keeps ssh_server entries and drops settings", () => {
  const nextssh = fresh("nextssh-import.js");
  const parsed = nextssh.parseBackup(
    JSON.stringify({
      version: 1,
      createdAt: 42,
      data: [
        { _id: "setting/theme", value: "dark" },
        server("a", { host: "10.0.0.1", username: "root" }),
      ],
    })
  );
  assert.strictEqual(parsed.error, "");
  assert.strictEqual(parsed.servers.length, 1);
  assert.strictEqual(parsed.createdAt, 42);
  assert.strictEqual(parsed.servers[0]._id, "ssh_server/a");
});

check("scan redacts secrets and skips hosts without an address", () => {
  const nextssh = fresh("nextssh-import.js");
  const filePath = path.join(userData, "scan.json");
  writeBackup(filePath, [
    server("pw", {
      name: "box",
      host: "192.168.1.10",
      username: "admin",
      password: "s3cret",
      tags: ["lab"],
    }),
    server("key", {
      name: "keybox",
      host: "192.168.1.11",
      username: "git",
      privateKey: SHARED_KEY,
    }),
    server("empty", { name: "nowhere", host: "   " }),
  ]);

  const result = nextssh.scan({ path: filePath });
  assert.strictEqual(result.error, "");
  assert.strictEqual(result.hosts.length, 2);
  assert.ok(result.stats.skippedNote);

  const passwordHost = result.hosts.find((h) => h.key === "ssh_server/pw");
  assert.ok(passwordHost);
  assert.strictEqual(passwordHost.hasPassword, true);
  assert.strictEqual(passwordHost.hasPrivateKey, false);
  assert.strictEqual(passwordHost.password, undefined);
  assert.strictEqual(passwordHost.privateKey, undefined);
  assert.deepStrictEqual(passwordHost.tags, ["lab"]);
  assert.ok(!JSON.stringify(result).includes("s3cret"));

  const keyHost = result.hosts.find((h) => h.key === "ssh_server/key");
  assert.ok(keyHost);
  assert.strictEqual(keyHost.hasPrivateKey, true);
  assert.strictEqual(keyHost.privateKey, undefined);
  assert.strictEqual(keyHost.identityState, "ready");
});

check("apply imports a password host and a shared key once", () => {
  userData = fs.mkdtempSync(path.join(os.tmpdir(), "nox-nextssh-"));
  electronStub.app.getPath = (what) =>
    what === "userData" ? userData : os.tmpdir();

  const nextssh = fresh("nextssh-import.js");
  const store = require(path.join(ROOT, "store.js"));
  const filePath = path.join(userData, "apply.json");
  writeBackup(filePath, [
    server("pw", {
      name: "prod",
      host: "10.1.1.8",
      port: 2222,
      username: "root",
      password: "hunter2",
      lastConnectedAt: 99,
    }),
    server("k1", {
      name: "alpha",
      host: "10.1.1.9",
      username: "git",
      privateKey: SHARED_KEY,
    }),
    server("k2", {
      name: "beta",
      host: "10.1.1.10",
      username: "git",
      privateKey: SHARED_KEY,
    }),
    server("skip-me", {
      name: "ignored",
      host: "10.1.1.11",
      username: "root",
      password: "nope",
    }),
  ]);

  const report = nextssh.apply({
    path: filePath,
    keys: ["ssh_server/pw", "ssh_server/k1", "ssh_server/k2"],
    importIdentityFiles: true,
  });

  assert.strictEqual(report.success, true);
  assert.strictEqual(report.hosts.imported, 3);
  assert.strictEqual(report.keys.imported, 1);
  assert.strictEqual(report.keys.reused, 1);

  const hosts = store.getHosts();
  assert.strictEqual(hosts.length, 3);

  const prod = hosts.find((h) => h.name === "prod");
  assert.ok(prod);
  assert.strictEqual(prod.authMethod, "password");
  assert.strictEqual(prod.hasPassword, true);
  assert.strictEqual(prod.port, 2222);
  assert.strictEqual(prod.lastConnectedAt, 99);

  const creds = store.resolveCredentials(prod.id);
  assert.strictEqual(creds.password, "hunter2");

  const alpha = hosts.find((h) => h.name === "alpha");
  const beta = hosts.find((h) => h.name === "beta");
  assert.strictEqual(alpha.authMethod, "keychain");
  assert.strictEqual(beta.authMethod, "keychain");
  assert.strictEqual(alpha.keychainKeyId, beta.keychainKeyId);

  const keys = store.getKeys();
  assert.strictEqual(keys.length, 1);
  assert.match(keys[0].name, /^NextSSH · /);
  assert.strictEqual(keys[0].hasPrivateKey, true);
});

check("apply skips a host that is already saved", () => {
  userData = fs.mkdtempSync(path.join(os.tmpdir(), "nox-nextssh-"));
  electronStub.app.getPath = (what) =>
    what === "userData" ? userData : os.tmpdir();

  const nextssh = fresh("nextssh-import.js");
  const store = require(path.join(ROOT, "store.js"));
  store.saveHost({
    name: "already",
    protocol: "ssh",
    host: "10.2.2.2",
    port: 22,
    username: "root",
  });

  const filePath = path.join(userData, "dup.json");
  writeBackup(filePath, [
    server("dup", {
      name: "from-nextssh",
      host: "10.2.2.2",
      username: "root",
      password: "x",
    }),
  ]);

  const scanned = nextssh.scan({ path: filePath });
  assert.strictEqual(scanned.hosts[0].status, "present");

  const report = nextssh.apply({
    path: filePath,
    keys: ["ssh_server/dup"],
    importIdentityFiles: true,
  });
  assert.strictEqual(report.hosts.imported, 0);
  assert.strictEqual(report.hosts.skipped, 1);
  assert.strictEqual(store.getHosts().length, 1);
});

check("without copy-keys, a password host still keeps its password", () => {
  userData = fs.mkdtempSync(path.join(os.tmpdir(), "nox-nextssh-"));
  electronStub.app.getPath = (what) =>
    what === "userData" ? userData : os.tmpdir();

  const nextssh = fresh("nextssh-import.js");
  const store = require(path.join(ROOT, "store.js"));
  const filePath = path.join(userData, "nocopy.json");
  writeBackup(filePath, [
    server("pw", {
      name: "plain",
      host: "10.3.3.3",
      username: "root",
      password: "keep-me",
    }),
    server("key", {
      name: "keyed",
      host: "10.3.3.4",
      username: "git",
      privateKey: SHARED_KEY,
    }),
  ]);

  const report = nextssh.apply({
    path: filePath,
    keys: ["ssh_server/pw", "ssh_server/key"],
    importIdentityFiles: false,
  });
  assert.strictEqual(report.hosts.imported, 2);
  assert.strictEqual(report.keys.imported, 0);

  const hosts = store.getHosts();
  const plain = hosts.find((h) => h.name === "plain");
  const keyed = hosts.find((h) => h.name === "keyed");
  assert.strictEqual(plain.authMethod, "password");
  assert.strictEqual(store.resolveCredentials(plain.id).password, "keep-me");
  assert.strictEqual(keyed.authMethod, "agent");
  assert.strictEqual(store.getKeys().length, 0);
});

if (process.exitCode) {
  console.log(`\nnextssh import: ${passed} passed, then failed`);
} else {
  console.log(`\nnextssh import: ${passed} passed`);
}
