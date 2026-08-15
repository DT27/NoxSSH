const { app, powerMonitor, net } = require("electron");
const fs = require("fs");
const path = require("path");
const store = require("./store");
const knownHosts = require("./known-hosts");
const vault = require("./vault");
const activity = require("./activity");
const backup = require("./backup");

const SCHEMA_VERSION = 1;

const SNAPSHOT_SUBDIR = "noxssh";
const SNAPSHOT_BASENAME = "snapshot.json";
const BACKUPS_SUBDIR = "backups";

const BACKUP_FREQUENCIES = ["manual", "hourly", "daily", "weekly"];

const statePath = () => path.join(app.getPath("userData"), "webdav-sync.json");

// Resolve the actual snapshot file URL from a user-provided base (directory or full file).
// If the base already ends with .json we treat it as a full file path (backward compat).
function resolveSnapshotUrl(baseUrl) {
  if (!baseUrl) return "";
  let u = String(baseUrl).trim();
  if (!u) return "";
  if (/\.json$/i.test(u)) return u;
  u = u.replace(/\/+$/, "");
  return `${u}/${SNAPSHOT_SUBDIR}/${SNAPSHOT_BASENAME}`;
}

function getBaseDir(baseUrl) {
  let u = String(baseUrl || "").trim();
  if (!u) return "";
  if (/\.json$/i.test(u)) {
    u = u.replace(/\/[^/]+\.json$/i, "");
  }
  return u.replace(/\/+$/, "");
}

function getSnapshotUrl() {
  return resolveSnapshotUrl(load().url);
}

function getBackupsDirUrl() {
  const base = getBaseDir(load().url);
  if (!base) return "";
  return `${base}/${SNAPSHOT_SUBDIR}/${BACKUPS_SUBDIR}/`;
}

function resolveBackupUrl(name) {
  const dir = getBackupsDirUrl();
  if (!dir) return "";
  // name is like 2026-08-12T15-04-33Z.json
  return `${dir}${name}`;
}

function makeBackupName() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
    d.getUTCDate()
  )}T${pad(d.getUTCHours())}-${pad(d.getUTCMinutes())}-${pad(
    d.getUTCSeconds()
  )}Z`;
  return `${stamp}.json`;
}

function parseBackupName(name) {
  // 2026-08-12T15-04-33Z.json -> ISO-ish
  const m = /^(\d{4}-\d{2}-\d{2})T(\d{2})-(\d{2})-(\d{2})Z\.json$/.exec(name);
  if (!m) return null;
  return `${m[1]}T${m[2]}:${m[3]}:${m[4]}Z`;
}

/** Counts only. Safe to store next to the ciphertext — no names or secrets. */
function summarizePayload(payload) {
  if (!payload || typeof payload !== "object") return null;
  const known = payload.knownHosts;
  return {
    hosts: Array.isArray(payload.hosts) ? payload.hosts.length : 0,
    folders: Array.isArray(payload.folders) ? payload.folders.length : 0,
    keys: Array.isArray(payload.keys) ? payload.keys.length : 0,
    snippets: Array.isArray(payload.snippets) ? payload.snippets.length : 0,
    proxies: Array.isArray(payload.proxies) ? payload.proxies.length : 0,
    knownHosts:
      known && typeof known === "object" ? Object.keys(known).length : 0,
  };
}

function normalizeCounts(raw) {
  if (!raw || typeof raw !== "object") return null;
  const n = (v) => (Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0);
  return {
    hosts: n(raw.hosts),
    folders: n(raw.folders),
    keys: n(raw.keys),
    snippets: n(raw.snippets),
    proxies: n(raw.proxies),
    knownHosts: n(raw.knownHosts),
  };
}

// Debounce and poll like the old cloud snapshot
const PUSH_DEBOUNCE_MS = 8000;
const POLL_INTERVAL_MS = 5 * 60 * 1000;

let state = null;
let pushTimer = null;
let pollTimer = null;
let backupTimer = null;
let busy = false;
let suppressPush = false;
let notify = () => {};

// Terminal settings passed from renderer (localStorage there)
let rendererSettings = null;

/* ------------------------------------------------------------------ *
 * State (config + metadata). Secrets are vault-encrypted in the file.
 * ------------------------------------------------------------------ */

function emptyState() {
  return {
    enabled: true,
    url: "",
    username: "",
    password: "",
    syncPassphrase: "",
    revision: 0,
    lastPushAt: null,
    lastPullAt: null,
    lastError: null,
    backupEnabled: true,
    backupFrequency: "daily",
    maxBackups: 30,
    lastBackupAt: null,
  };
}

function load() {
  if (state) return state;

  try {
    const raw = JSON.parse(fs.readFileSync(statePath(), "utf8"));
    state = {
      enabled: raw.enabled !== false,
      url: raw.url || "",
      username: raw.username || "",
      // Stored encrypted via vault; decrypt on load if vault is open
      password: raw.password || "",
      syncPassphrase: raw.syncPassphrase || "",
      revision: Number(raw.revision) || 0,
      lastPushAt: raw.lastPushAt || null,
      lastPullAt: raw.lastPullAt || null,
      lastError: raw.lastError || null,
      // Backup (point-in-time historical copies)
      backupEnabled: raw.backupEnabled !== false,
      backupFrequency: BACKUP_FREQUENCIES.includes(raw.backupFrequency)
        ? raw.backupFrequency
        : "daily",
      maxBackups: Number.isFinite(raw.maxBackups)
        ? Math.max(1, Math.min(500, raw.maxBackups))
        : 30,
      lastBackupAt: raw.lastBackupAt || null,
    };
  } catch {
    state = emptyState();
  }
  return state;
}

function persist() {
  try {
    const s = load();
    fs.writeFileSync(
      statePath(),
      JSON.stringify(
        {
          enabled: s.enabled,
          url: s.url,
          username: s.username,
          // Keep encrypted form on disk
          password: s.password,
          syncPassphrase: s.syncPassphrase,
          revision: s.revision,
          lastPushAt: s.lastPushAt,
          lastPullAt: s.lastPullAt,
          lastError: s.lastError,
          // Backup config
          backupEnabled: s.backupEnabled,
          backupFrequency: s.backupFrequency,
          maxBackups: s.maxBackups,
          lastBackupAt: s.lastBackupAt,
        },
        null,
        2
      ),
      { mode: 0o600 }
    );
  } catch (error) {
    console.error("Failed to save webdav-sync state:", error.message);
  }
}

vault.onUnlocked(() => {
  // Allow decrypting secrets next time load() runs
  state = null;
});

/* ------------------------------------------------------------------ *
 * Secrets helpers (password + sync passphrase)
 * ------------------------------------------------------------------ */

function encryptIfPlain(value) {
  if (!value) return "";
  if (vault.isVaultSecret(value)) return value;
  try {
    return vault.encryptSecret(value);
  } catch {
    return "";
  }
}

function decryptSecret(stored) {
  if (!stored) return "";
  if (!vault.isVaultSecret(stored)) return stored; // legacy or plain (shouldn't happen)
  try {
    return vault.decryptSecret(stored);
  } catch {
    return "";
  }
}

function getPassword() {
  return decryptSecret(load().password);
}

function getSyncPassphrase() {
  return decryptSecret(load().syncPassphrase);
}

/* ------------------------------------------------------------------ *
 * Minimal WebDAV client using Electron net (respects system proxy)
 * ------------------------------------------------------------------ */

function basicAuthHeader(username, password) {
  if (!username) return null;
  const token = Buffer.from(`${username}:${password || ""}`).toString("base64");
  return `Basic ${token}`;
}

async function davRequest(
  targetUrl,
  {
    method = "GET",
    body,
    headers = {},
    username,
    password,
    timeoutMs = 30000,
    contentType,
  } = {}
) {
  const auth = basicAuthHeader(username, password);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const finalHeaders = {
    Accept: "application/json, application/xml, text/xml, */*",
    ...(auth ? { Authorization: auth } : {}),
    ...headers,
  };
  if (body) {
    finalHeaders["Content-Type"] =
      contentType ||
      (typeof body === "string" && body.trim().startsWith("<?xml")
        ? "application/xml; charset=utf-8"
        : "application/json");
  }

  try {
    const res = await net.fetch(targetUrl, {
      method,
      signal: controller.signal,
      headers: finalHeaders,
      body: body
        ? typeof body === "string"
          ? body
          : JSON.stringify(body)
        : undefined,
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      /* not json */
    }

    return {
      ok: res.ok,
      status: res.status,
      text,
      data,
      etag: res.headers.get("etag") || null,
    };
  } catch (error) {
    return { ok: false, status: 0, error: error.message };
  } finally {
    clearTimeout(timer);
  }
}

function parsePropfindHrefs(xmlText) {
  const hrefs = [];
  // Namespaced
  const re1 = /<[^>]*:href[^>]*>([^<]+)<\/[^>]*:href>/gi;
  let m;
  while ((m = re1.exec(xmlText))) hrefs.push(m[1]);
  // No namespace
  if (hrefs.length === 0) {
    const re2 = /<href[^>]*>([^<]+)<\/href>/gi;
    while ((m = re2.exec(xmlText))) hrefs.push(m[1]);
  }
  return hrefs.map((h) => {
    try {
      return decodeURIComponent(h);
    } catch {
      return h;
    }
  });
}

async function ensureCollection(dirUrl, { username, password } = {}) {
  if (!dirUrl) return false;
  const res = await davRequest(dirUrl, { method: "MKCOL", username, password });
  // 201 created, 405 method not allowed (exists), 409 conflict (parent missing) are acceptable
  return (
    res.ok || res.status === 405 || res.status === 409 || res.status === 201
  );
}

async function propfind(url, { username, password, depth = "1" } = {}) {
  const body =
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<D:propfind xmlns:D="DAV:"><D:prop><D:resourcetype/></D:prop></D:propfind>';
  return davRequest(url, {
    method: "PROPFIND",
    body,
    contentType: "application/xml; charset=utf-8",
    headers: { Depth: depth },
    username,
    password,
  });
}

async function testConnection({ url, username, password }) {
  if (!url) return { success: false, message: "WebDAV URL is required" };

  const target = resolveSnapshotUrl(url);

  // Try a lightweight request against the target. 404 is acceptable (first time).
  const res = await davRequest(target, {
    method: "GET",
    username,
    password,
    timeoutMs: 15000,
  });

  if (res.status === 0) {
    return {
      success: false,
      message: res.error || "Could not reach the server",
    };
  }
  // 200, 404 are both "reachable with these credentials"
  if (res.ok || res.status === 404) {
    return { success: true };
  }
  if (res.status === 401 || res.status === 403) {
    return {
      success: false,
      message: "Authentication failed (check username/password)",
    };
  }
  return {
    success: false,
    message: `Server responded with HTTP ${res.status}`,
  };
}

/* ------------------------------------------------------------------ *
 * Payload helpers (re-using backup encryption for the snapshot)
 * ------------------------------------------------------------------ */

function collect() {
  const everything = store.exportAll();
  return {
    version: SCHEMA_VERSION,
    capturedAt: new Date().toISOString(),
    revision: load().revision || 0,
    hosts: everything.hosts || [],
    folders: everything.folders || [],
    keys: everything.keys || [],
    snippets: everything.snippets || [],
    proxies: everything.proxies || [],
    knownHosts: knownHosts.exportAll() || {},
    settings: rendererSettings || null,
  };
}

function apply(payload) {
  if (!payload) return { hosts: { added: 0 }, keys: { added: 0 } };

  const summary = store.importAll(
    {
      hosts: payload.hosts || [],
      folders: payload.folders || [],
      keys: payload.keys || [],
      snippets: payload.snippets || [],
      proxies: payload.proxies || [],
    },
    { overwrite: false }
  );

  if (payload.knownHosts) {
    knownHosts.importAll(payload.knownHosts, { overwrite: false });
  }

  if (payload.settings) {
    notify("cloud-snapshot-settings", payload.settings);
  }

  return summary;
}

/* ------------------------------------------------------------------ *
 * Blocked reasons
 * ------------------------------------------------------------------ */

function blocked() {
  const s = load();
  if (!s.enabled) return "Sync is turned off";
  if (!s.url) return "WebDAV URL is not configured";
  if (!getSyncPassphrase()) return "Sync passphrase is not set";
  if (vault.isLocked()) return "The app is locked";
  return "";
}

/* ------------------------------------------------------------------ *
 * Core sync
 * ------------------------------------------------------------------ */

async function pull({ force = false } = {}) {
  const stop = blocked();
  if (stop) return { skipped: stop };
  if (busy) return { skipped: "A sync is already running" };

  busy = true;
  try {
    return await pullLocked({ force });
  } finally {
    busy = false;
  }
}

async function pullLocked({ force = false } = {}) {
  const s = load();
  const passphrase = getSyncPassphrase();
  const password = getPassword();
  const target = getSnapshotUrl();

  try {
    const res = await davRequest(target, {
      method: "GET",
      username: s.username,
      password,
    });

    if (res.status === 404) {
      return { pulled: false, reason: "Nothing on the server yet" };
    }
    if (!res.ok) {
      throw new Error(`WebDAV GET failed: HTTP ${res.status}`);
    }

    let envelope;
    try {
      envelope = JSON.parse(res.text);
    } catch {
      throw new Error("Remote file is not valid JSON");
    }

    const payload = backup.unseal(envelope, passphrase);
    if (!payload) {
      throw new Error(
        "Could not decrypt remote snapshot (wrong sync passphrase?)"
      );
    }

    // Revision check
    const remoteRev = Number(payload.revision) || 0;
    if (!force && remoteRev <= s.revision) {
      return {
        pulled: false,
        reason: "Already up to date",
        revision: s.revision,
      };
    }

    const summary = apply(payload);

    state = {
      ...s,
      revision: remoteRev,
      lastPullAt: new Date().toISOString(),
      lastError: null,
    };
    persist();

    const added =
      (summary?.hosts?.added || 0) +
      (summary?.keys?.added || 0) +
      (summary?.snippets?.added || 0) +
      (summary?.folders?.added || 0) +
      (summary?.proxies?.added || 0);

    if (added > 0) {
      activity.record({
        category: "data",
        action: "sync.restore",
        outcome: "success",
        target: "WebDAV setup",
        detail: `${summary.hosts?.added || 0} host(s), ${
          summary.keys?.added || 0
        } key(s) restored`,
      });
    }

    notify("webdav-sync-state", { ...status(), pulled: true, added });
    return { pulled: true, revision: remoteRev, added, summary };
  } catch (error) {
    state = { ...s, lastError: error.message };
    persist();
    notify("webdav-sync-state", { ...status(), error: error.message });
    return { error: error.message };
  }
}

async function push() {
  const stop = blocked();
  if (stop) return { skipped: stop };
  if (busy) return { skipped: "A sync is already running" };

  busy = true;
  try {
    return await pushLocked({ retry: true });
  } catch (error) {
    state = { ...load(), lastError: error.message };
    persist();
    notify("webdav-sync-state", { ...status(), error: error.message });
    return { error: error.message };
  } finally {
    busy = false;
  }
}

async function pushLocked({ retry }) {
  const s = load();
  const passphrase = getSyncPassphrase();
  const password = getPassword();
  const target = getSnapshotUrl();

  // Check remote first for conflict
  let remoteRev = 0;
  try {
    const head = await davRequest(target, {
      method: "GET",
      username: s.username,
      password,
    });
    if (head.ok && head.text) {
      try {
        const remoteEnv = JSON.parse(head.text);
        const remotePayload = backup.unseal(remoteEnv, passphrase);
        if (remotePayload && Number(remotePayload.revision) > s.revision) {
          // Remote is newer: apply it first (merge), then continue to push
          apply(remotePayload);
          remoteRev = Number(remotePayload.revision) || 0;
        }
      } catch {
        // Ignore parse/unseal errors here; we'll push our version
      }
    }
  } catch {
    // Network error during pre-check: proceed with push attempt
  }

  const payload = collect();
  const nextRev = Math.max(s.revision, remoteRev) + 1;
  payload.revision = nextRev;

  const envelope = backup.seal(payload, passphrase);

  const put = await davRequest(target, {
    method: "PUT",
    body: JSON.stringify(envelope),
    username: s.username,
    password,
  });

  if (!put.ok) {
    throw new Error(`WebDAV PUT failed: HTTP ${put.status}`);
  }

  state = {
    ...s,
    revision: nextRev,
    lastPushAt: new Date().toISOString(),
    lastError: null,
  };
  persist();

  notify("webdav-sync-state", status());
  return { pushed: true, revision: nextRev };
}

/* ------------------------------------------------------------------ *
 * Point-in-time backups (separate from live snapshot)
 * ------------------------------------------------------------------ */

async function readBackupCounts(url, { username, password }) {
  const get = await davRequest(url, { method: "GET", username, password });
  if (!get.ok) return null;
  const envelope = get.data;
  if (!envelope || typeof envelope !== "object") return null;
  // Older backups have no header counts. Do not decrypt them just to fill this in.
  return normalizeCounts(envelope.counts);
}

async function listBackups() {
  const s = load();
  const password = getPassword();
  const dir = getBackupsDirUrl();
  if (!dir) return [];

  const res = await propfind(dir, {
    username: s.username,
    password,
    depth: "1",
  });
  if (!res.ok || !res.text) return [];

  const all = parsePropfindHrefs(res.text);
  // Filter to our backup files
  const names = all
    .map((h) => h.replace(/\/$/, "").split("/").pop())
    .filter((n) => /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}Z\.json$/.test(n));

  const listed = names
    .sort()
    .reverse()
    .map((name) => ({
      name,
      iso: parseBackupName(name) || null,
      url: resolveBackupUrl(name),
    }));

  await Promise.all(
    listed.map(async (item) => {
      item.counts = await readBackupCounts(item.url, {
        username: s.username,
        password,
      });
    })
  );

  return listed;
}

async function createBackup() {
  const stop = blocked();
  if (stop) return { skipped: stop };
  if (busy) return { skipped: "A sync is already running" };

  busy = true;
  try {
    const s = load();
    const passphrase = getSyncPassphrase();
    const password = getPassword();
    const dir = getBackupsDirUrl();
    if (!dir) throw new Error("WebDAV URL is not configured");

    // Ensure directory exists (best-effort)
    await ensureCollection(dir, { username: s.username, password });

    const payload = collect();
    // Backups are independent of the live snapshot revision
    const envelope = backup.seal(payload, passphrase);
    envelope.counts = summarizePayload(payload);
    const name = makeBackupName();
    const target = resolveBackupUrl(name);

    const put = await davRequest(target, {
      method: "PUT",
      body: JSON.stringify(envelope),
      username: s.username,
      password,
    });
    if (!put.ok) {
      throw new Error(`WebDAV PUT failed: HTTP ${put.status}`);
    }

    state = { ...s, lastBackupAt: new Date().toISOString() };
    persist();

    // Trim old backups if needed
    try {
      const all = await listBackups();
      const max = s.maxBackups || 30;
      if (all.length > max) {
        const toDelete = all.slice(max); // already newest-first
        for (const b of toDelete) {
          await davRequest(b.url, {
            method: "DELETE",
            username: s.username,
            password,
          });
        }
      }
    } catch {
      /* non-fatal */
    }

    notify("webdav-sync-state", status());
    return { created: true, name };
  } catch (error) {
    state = { ...load(), lastError: error.message };
    persist();
    notify("webdav-sync-state", { ...status(), error: error.message });
    return { error: error.message };
  } finally {
    busy = false;
  }
}

async function restoreFromBackup(name) {
  const stop = blocked();
  if (stop) return { skipped: stop };
  if (busy) return { skipped: "A sync is already running" };

  busy = true;
  try {
    const s = load();
    const passphrase = getSyncPassphrase();
    const password = getPassword();
    const target = resolveBackupUrl(name);
    if (!target) throw new Error("Invalid backup name");

    const res = await davRequest(target, {
      method: "GET",
      username: s.username,
      password,
    });
    if (res.status === 404)
      return { restored: false, reason: "Backup not found" };
    if (!res.ok) throw new Error(`WebDAV GET failed: HTTP ${res.status}`);

    let envelope;
    try {
      envelope = JSON.parse(res.text);
    } catch {
      throw new Error("Remote file is not valid JSON");
    }

    const payload = backup.unseal(envelope, passphrase);
    if (!payload)
      throw new Error("Could not decrypt backup (wrong sync passphrase?)");

    const summary = apply(payload);

    // Do not bump live snapshot revision; this is a point-in-time restore
    state = { ...s, lastPullAt: new Date().toISOString(), lastError: null };
    persist();

    const added =
      (summary?.hosts?.added || 0) +
      (summary?.keys?.added || 0) +
      (summary?.snippets?.added || 0) +
      (summary?.folders?.added || 0) +
      (summary?.proxies?.added || 0);
    if (added > 0) {
      activity.record({
        category: "data",
        action: "backup.restore",
        outcome: "success",
        target: "WebDAV backup",
        detail: `${summary.hosts?.added || 0} host(s), ${
          summary.keys?.added || 0
        } key(s) restored from ${name}`,
      });
    }

    notify("webdav-sync-state", {
      ...status(),
      pulled: true,
      added,
      fromBackup: name,
    });
    return { restored: true, name, added, summary };
  } catch (error) {
    state = { ...load(), lastError: error.message };
    persist();
    notify("webdav-sync-state", { ...status(), error: error.message });
    return { error: error.message };
  } finally {
    busy = false;
  }
}

function isBackupName(name) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}Z\.json$/.test(
    String(name || "")
  );
}

async function deleteBackup(name) {
  if (!isBackupName(name)) return { error: "Invalid backup name" };

  const s = load();
  const password = getPassword();
  const target = resolveBackupUrl(name);
  if (!target) return { error: "WebDAV URL is not configured" };

  const res = await davRequest(target, {
    method: "DELETE",
    username: s.username,
    password,
  });
  if (res.status === 404) return { deleted: true, name, missing: true };
  if (!res.ok) return { error: `WebDAV DELETE failed: HTTP ${res.status}` };
  return { deleted: true, name };
}

/**
 * Restore this machine to an empty local setup.
 * Local WebDAV settings are wiped too. Files already on the server stay put.
 */
async function resetLocalData() {
  if (pushTimer) {
    clearTimeout(pushTimer);
    pushTimer = null;
  }
  stopPolling();

  suppressPush = true;
  try {
    store.resetAll();
    knownHosts.resetAll();
    activity.clear();
    state = emptyState();
    persist();
  } finally {
    suppressPush = false;
  }

  notify("webdav-sync-state", { ...status(), localReset: true });
  return { reset: true };
}

/* ------------------------------------------------------------------ *
 * Public API (mirrors the shape the old cloud-snapshot exposed)
 * ------------------------------------------------------------------ */

function status() {
  const s = load();
  return {
    enabled: s.enabled,
    url: s.url,
    username: s.username,
    hasPassword: !!s.password,
    hasSyncPassphrase: !!s.syncPassphrase,
    revision: s.revision,
    lastPushAt: s.lastPushAt,
    lastPullAt: s.lastPullAt,
    lastError: s.lastError,
    pending: Boolean(pushTimer),
    blocked: blocked(),
    // Backup settings & state
    backupEnabled: s.backupEnabled,
    backupFrequency: s.backupFrequency,
    maxBackups: s.maxBackups,
    lastBackupAt: s.lastBackupAt,
  };
}

function setEnabled(enabled) {
  const s = load();
  state = { ...s, enabled: Boolean(enabled) };
  persist();

  if (state.enabled) {
    startPolling();
    // Pull then push to bring in remote changes and publish local ones
    pull().then(() => push());
  } else {
    stopPolling();
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = null;
  }
  return status();
}

function configure({
  url,
  username,
  password,
  syncPassphrase,
  enabled,
  backupEnabled,
  backupFrequency,
  maxBackups,
} = {}) {
  const s = load();
  const next = { ...s };

  if (typeof url === "string") next.url = url.trim();
  if (typeof username === "string") next.username = username;

  if (typeof password === "string") {
    next.password = password ? encryptIfPlain(password) : "";
  }
  if (typeof syncPassphrase === "string") {
    next.syncPassphrase = syncPassphrase ? encryptIfPlain(syncPassphrase) : "";
  }
  if (typeof enabled === "boolean") next.enabled = enabled;

  if (typeof backupEnabled === "boolean") next.backupEnabled = backupEnabled;
  if (
    typeof backupFrequency === "string" &&
    BACKUP_FREQUENCIES.includes(backupFrequency)
  ) {
    next.backupFrequency = backupFrequency;
  }
  if (Number.isFinite(maxBackups)) {
    next.maxBackups = Math.max(1, Math.min(500, Math.floor(maxBackups)));
  }

  state = next;
  persist();
  return status();
}

async function test({ url, username, password } = {}) {
  const s = load();
  return testConnection({
    url: url || s.url,
    username: username || s.username,
    password: password !== undefined ? password : getPassword(),
  });
}

function schedulePush() {
  if (suppressPush) return;
  if (blocked()) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    push();
  }, PUSH_DEBOUNCE_MS);
  pushTimer.unref?.();
}

function setSettings(settings) {
  const next = JSON.stringify(settings ?? null);
  if (next === JSON.stringify(rendererSettings ?? null)) return;
  rendererSettings = settings ?? null;
  schedulePush();
}

function scheduleBackupIfNeeded() {
  if (backupTimer) clearTimeout(backupTimer);
  backupTimer = null;
  const s = load();
  if (!s.backupEnabled || !s.url || !getSyncPassphrase()) return;
  const freq = s.backupFrequency;
  if (freq === "manual") return;

  const last = s.lastBackupAt ? new Date(s.lastBackupAt).getTime() : 0;
  const now = Date.now();
  let interval = 24 * 3600 * 1000;
  if (freq === "hourly") interval = 3600 * 1000;
  else if (freq === "weekly") interval = 7 * 24 * 3600 * 1000;

  const due = last + interval;
  const delay = Math.max(1000, due - now);
  backupTimer = setTimeout(() => {
    backupTimer = null;
    createBackup().catch(() => {});
    scheduleBackupIfNeeded();
  }, delay);
  backupTimer.unref?.();
}

function startPolling() {
  stopPolling();
  pollTimer = setInterval(() => {
    pull();
  }, POLL_INTERVAL_MS);
  pollTimer.unref?.();
  scheduleBackupIfNeeded();
}

function stopPolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = null;
  if (backupTimer) clearTimeout(backupTimer);
  backupTimer = null;
}

function start(notifier) {
  if (typeof notifier === "function") notify = notifier;

  store.onChanged?.(schedulePush);
  knownHosts.onChanged?.(schedulePush);

  powerMonitor.on("resume", () => {
    if (!blocked()) pull();
  });
  vault.onUnlocked(() => {
    if (!blocked()) pull();
  });

  const s = load();
  if (s.enabled && s.url && getSyncPassphrase()) {
    startPolling();
    pull();
  }
}

function flush() {
  if (!pushTimer) return null;
  clearTimeout(pushTimer);
  pushTimer = null;
  return push();
}

function reset() {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = null;
  if (backupTimer) clearTimeout(backupTimer);
  backupTimer = null;

  const s = load();
  state = {
    enabled: s.enabled,
    url: s.url,
    username: s.username,
    password: s.password,
    syncPassphrase: s.syncPassphrase,
    revision: 0,
    lastPushAt: null,
    lastPullAt: null,
    lastError: null,
    // Keep backup configuration; only clear live snapshot metadata
    backupEnabled: s.backupEnabled,
    backupFrequency: s.backupFrequency,
    maxBackups: s.maxBackups,
    lastBackupAt: null,
  };
  persist();
  return status();
}

module.exports = {
  status,
  configure,
  setEnabled,
  test,
  push,
  pull,
  schedulePush,
  setSettings,
  start,
  flush,
  reset,
  collect, // exposed for debugging/tests
  // Backups
  listBackups,
  createBackup,
  restoreFromBackup,
  deleteBackup,
  resetLocalData,
};
