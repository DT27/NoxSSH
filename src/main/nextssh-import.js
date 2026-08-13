const fs = require("fs");
const store = require("./store");
const common = require("./import-common");

/**
 * Bring NextSSH hosts in from its JSON backup (`ns-backup-*.json`).
 *
 * The file is a `{ version, createdAt, data: [...] }` dump of NextSSH's
 * local store. SSH servers live as `{ _id: "ssh_server/<uuid>", name,
 * tags, connect: { host, port, auth } }`. Settings and other collections
 * are ignored.
 *
 * Unlike PuTTY / MobaXterm, NextSSH writes passwords and private keys in
 * the clear inside this export, so they can be taken as-is. The renderer
 * still only sends back which `_id`s to take; the file is re-read on apply.
 */

const LABEL = "NextSSH";

function toPort(value, fallback = 22) {
  const port = Number(value);
  return Number.isInteger(port) && port >= 1 && port <= 65535 ? port : fallback;
}

function describeAddress(host, port, username) {
  const where = port === 22 ? host : `${host}:${port}`;
  return username ? `${username}@${where}` : where;
}

function isNextSshBackup(parsed) {
  return Boolean(
    parsed &&
      typeof parsed === "object" &&
      Array.isArray(parsed.data) &&
      parsed.data.some(
        (entry) =>
          typeof entry?._id === "string" && entry._id.startsWith("ssh_server/")
      )
  );
}

function parseBackup(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return { error: `Not valid JSON: ${error.message}`, servers: [] };
  }

  if (!isNextSshBackup(parsed)) {
    return { error: "This file is not a NextSSH backup", servers: [] };
  }

  const servers = parsed.data.filter(
    (entry) =>
      entry &&
      typeof entry._id === "string" &&
      entry._id.startsWith("ssh_server/")
  );
  return { error: "", servers, createdAt: parsed.createdAt || 0 };
}

function inspectEmbeddedKey(privateKey) {
  return common.inspectIdentityText(privateKey);
}

function candidateFrom(entry, existing) {
  const connect = entry.connect || {};
  const auth = connect.auth || {};
  const host = String(connect.host || "").trim();
  if (!host) return { skip: "without an address" };

  const port = toPort(connect.port, 22);
  const username = String(auth.username || "").trim();
  const password = typeof auth.password === "string" ? auth.password : "";
  const privateKey = typeof auth.privateKey === "string" ? auth.privateKey : "";
  const tags = Array.isArray(entry.tags) ? entry.tags : [];
  const warnings = [];
  const notes = [];

  let identityState = "";
  let identityType = "";
  let identityFingerprint = "";

  if (privateKey) {
    const inspected = inspectEmbeddedKey(privateKey);
    identityState = inspected.state;
    identityType = inspected.type || "";
    identityFingerprint = inspected.fingerprint || "";

    if (inspected.state === "encrypted") {
      warnings.push(
        "Its key is passphrase-protected. Add the passphrase in Keychain after importing"
      );
    } else if (inspected.state === "ppk") {
      warnings.push("Its key is a PuTTY .ppk and cannot be imported as-is");
    } else if (inspected.state === "unreadable") {
      warnings.push(`Key: ${inspected.reason}`);
    } else if (identityType) {
      notes.push(`${identityType} key`);
    }
  } else if (password) {
    notes.push("password stored in backup");
  } else {
    notes.push("no credentials in backup");
  }

  const candidate = {
    key: entry._id,
    name: String(entry.name || host).trim() || host,
    protocol: "ssh",
    host,
    port,
    username,
    folder: "",
    address: describeAddress(host, port, username),
    tunnels: [],
    tags,
    lastConnectedAt: Number(entry.lastConnectedAt) || 0,
    password,
    privateKey,
    identityState,
    identityType,
    identityFingerprint,
    identityName: privateKey ? "embedded key" : "",
    notes,
    warnings,
  };

  const match = common.matchExistingHost(existing, candidate);
  candidate.status = match ? "present" : "new";
  candidate.existingName = match?.name || "";
  return candidate;
}

function scan(options = {}) {
  const filePath = options.path || "";
  const base = {
    source: "nextssh",
    label: LABEL,
    path: filePath,
    hosts: [],
    warnings: [],
    stats: null,
  };

  if (!filePath) {
    return {
      ...base,
      error: "Choose a NextSSH backup file (ns-backup-*.json)",
    };
  }

  let text;
  try {
    text = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return {
      ...base,
      error: error.code === "ENOENT" ? "File not found" : error.message,
    };
  }

  const parsed = parseBackup(text);
  if (parsed.error) return { ...base, error: parsed.error };

  const existing = store.getHosts();
  const hosts = [];
  let skipped = 0;

  for (const entry of parsed.servers) {
    const candidate = candidateFrom(entry, existing);
    if (candidate.skip) {
      skipped += 1;
      continue;
    }
    // Secrets stay in the file. The renderer only needs to know that a
    // password or key is present, never the material itself.
    const { password, privateKey, ...safe } = candidate;
    hosts.push({
      ...safe,
      hasPassword: Boolean(password),
      hasPrivateKey: Boolean(privateKey),
    });
  }

  return {
    ...base,
    hosts,
    stats: {
      total: parsed.servers.length,
      skippedNote: skipped ? `${skipped} without an address skipped` : "",
    },
    error: "",
  };
}

/**
 * Put an embedded private key in the keychain. Reuses an existing key with
 * the same fingerprint (or the same PEM text when there is no fingerprint)
 * so two NextSSH hosts that share a key do not create two keychain entries.
 */
function importEmbeddedKey(candidate, cache, report) {
  const privateKey = candidate.privateKey;
  if (!privateKey) return null;

  const inspected = inspectEmbeddedKey(privateKey);
  if (inspected.state !== "ready" && inspected.state !== "encrypted")
    return null;

  const cacheKey = inspected.fingerprint || privateKey;
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (cached) report.keys.reused += 1;
    return cached;
  }

  const existing = store
    .getKeys()
    .find(
      (key) =>
        (inspected.fingerprint && key.fingerprint === inspected.fingerprint) ||
        key.name === `NextSSH · ${candidate.name}`
    );
  if (existing) {
    cache.set(cacheKey, { id: existing.id, created: false });
    report.keys.reused += 1;
    return { id: existing.id, created: false };
  }

  const saved = store.saveKey({
    name: `NextSSH · ${candidate.name}`,
    type: inspected.type || "ED25519",
    comment: `Imported from NextSSH (${candidate.host})`,
    privateKey: inspected.text,
    publicKey: "",
    fingerprint: inspected.fingerprint || "",
  });

  cache.set(cacheKey, { id: saved.id, created: true });
  report.keys.imported += 1;
  return { id: saved.id, created: true };
}

/**
 * Import the selected NextSSH servers. `keys` only filters what a fresh
 * scan of the file finds; nothing the renderer sends becomes record content.
 */
function apply({ path: filePath, keys = [], importIdentityFiles = true } = {}) {
  const report = {
    hosts: { imported: 0, skipped: 0, failed: 0, relayed: 0 },
    keys: { imported: 0, reused: 0 },
    folders: { created: 0 },
    notes: [],
  };
  if (keys.length === 0) return { success: true, ...report };

  let text;
  try {
    text = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return {
      success: false,
      ...report,
      notes: [error.code === "ENOENT" ? "File not found" : error.message],
    };
  }

  const parsed = parseBackup(text);
  if (parsed.error) return { success: false, ...report, notes: [parsed.error] };

  const existing = store.getHosts();
  const wanted = new Set(keys);
  const keyCache = new Map();

  for (const entry of parsed.servers) {
    const candidate = candidateFrom(entry, existing);
    if (candidate.skip) continue;
    if (!wanted.has(candidate.key)) continue;
    if (candidate.status === "present") {
      report.hosts.skipped += 1;
      continue;
    }

    const record = {
      id: common.freshId("host"),
      name: candidate.name,
      folderId: "",
      protocol: "ssh",
      host: candidate.host,
      port: candidate.port,
      username: candidate.username,
      tags: candidate.tags,
      tunnels: [],
      authMethod: "agent",
    };

    if (candidate.lastConnectedAt) {
      record.lastConnectedAt = candidate.lastConnectedAt;
    }

    if (importIdentityFiles && candidate.privateKey) {
      const key = importEmbeddedKey(candidate, keyCache, report);
      if (key) {
        record.authMethod = "keychain";
        record.keychainKeyId = key.id;
      }
    }

    if (record.authMethod !== "keychain" && candidate.password) {
      record.authMethod = "password";
      record.password = candidate.password;
    }

    try {
      store.saveHost(record);
      report.hosts.imported += 1;
    } catch (error) {
      report.hosts.failed += 1;
      report.notes.push(`${candidate.name}: ${error.message}`);
    }
  }

  return { success: true, ...report };
}

module.exports = {
  scan,
  apply,
  parseBackup,
  isNextSshBackup,
  candidateFrom,
};
