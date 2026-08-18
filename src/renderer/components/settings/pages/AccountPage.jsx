import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { toastStyle as getToastStyle } from "../../../lib/toast";
import { CloudUploadIcon, CloudDownloadIcon } from "hugeicons-react";
import SettingsPage from "../ui/SettingsPage";
import SettingCard from "../ui/SettingCard";
import SettingRow, { DIVIDED } from "../ui/SettingRow";
import Toggle from "../ui/Toggle";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { useT } from "../../../i18n";

/**
 * "5 minutes ago". Short enough to sit on one line next to a button.
 */
function ago(t, iso) {
  if (!iso) return "";
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return t("settings.account.justNow");
  if (seconds < 3600)
    return t("settings.account.minutesAgo", {
      count: Math.floor(seconds / 60),
    });
  if (seconds < 86400)
    return t("settings.account.hoursAgo", {
      count: Math.floor(seconds / 3600),
    });
  return t("settings.account.daysAgo", { count: Math.floor(seconds / 86400) });
}

/** "3 hosts · 1 folder · 2 keys". Zero buckets stay off the line. */
function backupCountsLine(t, counts) {
  if (!counts) return "";
  const parts = [];
  const add = (key, n) => {
    if (n > 0) parts.push(t(key, { count: n }));
  };
  add("hosts.count", counts.hosts);
  add("hosts.folderCount", counts.folders);
  add("keychain.count", counts.keys);
  add("snippets.count", counts.snippets);
  add("settings.account.proxyCount", counts.proxies);
  add("import.hostKeyCount", counts.knownHosts);
  return parts.join(" · ");
}

const DOTS = {
  on: "bg-emerald-500",
  busy: "bg-blue-500",
  warn: "bg-amber-500",
  error: "bg-red-500",
  off: "bg-gray-300 dark:bg-neutral-600",
};

function StatusLine({ tone, text, pulse = false }) {
  if (!text) return <span />;
  return (
    <p
      title={text}
      className={`min-w-0 flex items-center gap-2 text-sm ${
        tone === "error"
          ? "text-red-600 dark:text-red-400"
          : "text-gray-500 dark:text-gray-400"
      }`}
    >
      <span
        className={`shrink-0 w-1.5 h-1.5 rounded-full ${
          DOTS[tone] || DOTS.off
        } ${pulse ? "animate-pulse" : ""}`}
      />
      <span className="truncate">{text}</span>
    </p>
  );
}

function snapshotState(t, s, saving) {
  if (!s) return { tone: "off", text: "" };
  if (!s.enabled) return { tone: "off", text: t("common.off") };
  if (saving)
    return { tone: "busy", text: t("settings.account.saving"), pulse: true };
  if (s.blocked) return { tone: "warn", text: s.blocked };
  if (s.lastError) return { tone: "error", text: s.lastError };
  if (s.pending)
    return { tone: "busy", text: t("settings.account.saving"), pulse: true };
  if (!s.lastPushAt)
    return { tone: "on", text: t("settings.account.notSavedYet") };
  return {
    tone: "on",
    text: t("settings.account.savedAgo", { when: ago(t, s.lastPushAt) }),
  };
}

function restoreState(t, s) {
  if (!s) return { tone: "off", text: "" };
  if (!s.enabled) return { tone: "off", text: t("common.off") };
  if (s.lastError) return { tone: "error", text: s.lastError };
  if (!s.lastPullAt)
    return { tone: "on", text: t("settings.account.notRestoredYet") };
  return {
    tone: "on",
    text: t("settings.account.restoredAgo", { when: ago(t, s.lastPullAt) }),
  };
}

export default function AccountPage() {
  const t = useT();
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState("");
  const [form, setForm] = useState({
    url: "",
    username: "",
    password: "",
    syncPassphrase: "",
  });
  const [testing, setTesting] = useState(false);
  const [backups, setBackups] = useState([]);
  const [backupsLoading, setBackupsLoading] = useState(false);
  const [confirming, setConfirming] = useState(null);

  const refreshBackups = useCallback(async () => {
    setBackupsLoading(true);
    try {
      const r = await window.api.webdavSync.listBackups();
      setBackups(r?.result || []);
    } catch {}
    setBackupsLoading(false);
  }, []);

  const notify = useCallback((kind, message) => {
    toast[kind](message, { style: getToastStyle() });
  }, []);

  // Initial load
  useEffect(() => {
    window.api.webdavSync.status().then((s) => {
      setStatus(s);
      setForm({
        url: s?.url || "",
        username: s?.username || "",
        password: "",
        syncPassphrase: "",
      });
    });
  }, []);

  // Live updates from main
  useEffect(() => window.api.webdavSync.onState(setStatus), []);

  // Load historical backups when we have credentials
  useEffect(() => {
    if (status?.url && status?.hasSyncPassphrase) {
      refreshBackups();
    } else {
      setBackups([]);
    }
  }, [status?.url, status?.hasSyncPassphrase, refreshBackups]);

  const applyConfig = async (patch) => {
    const next = await window.api.webdavSync.configure(patch);
    setStatus(next);
    return next;
  };

  const handleField = (key) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [key]: v }));
  };

  const saveBasic = async () => {
    setBusy("save");
    try {
      const next = await applyConfig({
        url: form.url.trim(),
        username: form.username,
      });
      notify("success", t("settings.account.configSaved") || "Settings saved");
      setStatus(next);
    } catch (e) {
      notify("error", e.message);
    } finally {
      setBusy("");
    }
  };

  const saveSecrets = async () => {
    setBusy("secrets");
    try {
      const next = await applyConfig({
        password: form.password || undefined,
        syncPassphrase: form.syncPassphrase || undefined,
      });
      // Clear sensitive fields after save (they are now in main)
      setForm((f) => ({ ...f, password: "", syncPassphrase: "" }));
      notify(
        "success",
        t("settings.account.secretsSaved") || "Credentials updated"
      );
      setStatus(next);
    } catch (e) {
      notify("error", e.message);
    } finally {
      setBusy("");
    }
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      const res = await window.api.webdavSync.test({
        url: form.url.trim(),
        username: form.username,
        password: form.password || undefined,
      });
      if (res.success) {
        notify(
          "success",
          t("settings.account.testOk") || "Connection successful"
        );
      } else {
        notify("error", res.message || "Connection failed");
      }
    } catch (e) {
      notify("error", e.message);
    } finally {
      setTesting(false);
    }
  };

  const handleToggle = async (enabled) => {
    const next = await window.api.webdavSync.setEnabled(enabled);
    setStatus(next);
    notify(
      "success",
      enabled
        ? t("settings.account.syncOn") || "Sync enabled"
        : t("settings.account.syncOff") || "Sync disabled"
    );
  };

  const handlePush = async () => {
    setBusy("push");
    try {
      const { result, status: next } = await window.api.webdavSync.push();
      setStatus(next);
      if (result?.error) notify("error", result.error);
      else if (result?.skipped) notify("error", result.skipped);
      else
        notify("success", t("settings.account.backedUp") || "Saved to WebDAV");
    } finally {
      setBusy("");
    }
  };

  const handlePull = async () => {
    setBusy("pull");
    try {
      const { result, status: next } = await window.api.webdavSync.pull();
      setStatus(next);
      if (result?.error) notify("error", result.error);
      else if (result?.skipped) notify("error", result.skipped);
      else
        notify(
          "success",
          t("settings.account.restored") || "Restored from WebDAV"
        );
    } finally {
      setBusy("");
    }
  };

  const handleBackupNow = async () => {
    setBusy("backup");
    try {
      const { result, status: next } =
        await window.api.webdavSync.createBackup();
      setStatus(next);
      if (result?.error) notify("error", result.error);
      else if (result?.skipped) notify("error", result.skipped);
      else {
        notify(
          "success",
          t("settings.account.backupCreated") || "Backup created"
        );
        refreshBackups();
      }
    } finally {
      setBusy("");
    }
  };

  const handleRestoreBackup = async (name) => {
    setBusy("restore-" + name);
    try {
      const { result, status: next } =
        await window.api.webdavSync.restoreBackup(name);
      setStatus(next);
      if (result?.error) notify("error", result.error);
      else if (result?.skipped) notify("error", result.skipped);
      else
        notify(
          "success",
          t("settings.account.backupRestored") ||
            "Restored from historical backup"
        );
    } finally {
      setBusy("");
    }
  };

  const handleDeleteBackup = async (name) => {
    setBusy("delete-" + name);
    try {
      const { result } = await window.api.webdavSync.deleteBackup(name);
      if (result?.error) notify("error", result.error);
      else {
        notify(
          "success",
          t("settings.account.backupDeleted") || "Backup deleted"
        );
        refreshBackups();
      }
    } finally {
      setBusy("");
    }
  };

  const handleResetLocal = async () => {
    setBusy("reset");
    try {
      const { result } = await window.api.webdavSync.resetLocal();
      if (result?.error) notify("error", result.error);
      else {
        notify(
          "success",
          t("settings.account.localResetDone") || "Local data cleared"
        );
        window.location.reload();
      }
    } finally {
      setBusy("");
    }
  };

  const handleBackupToggle = async (enabled) => {
    const next = await applyConfig({ backupEnabled: enabled });
    notify(
      "success",
      enabled
        ? t("settings.account.backupOnNow")
        : t("settings.account.backupOffNow")
    );
    if (enabled) {
      // trigger an immediate backup and refresh list
      setTimeout(() => {
        handleBackupNow();
      }, 50);
    }
  };

  const handleBackupFrequency = async (freq) => {
    const next = await applyConfig({ backupFrequency: freq });
    setStatus(next);
  };

  const handleMaxBackups = async (n) => {
    const v = Math.max(1, Math.min(500, parseInt(n, 10) || 30));
    const next = await applyConfig({ maxBackups: v });
    setStatus(next);
  };

  if (!status) return <SettingsPage title={t("settings.account.title")} />;

  const hasUrl = !!status.url;
  const hasPassphrase = !!status.hasSyncPassphrase;
  const canBackup = hasUrl && hasPassphrase;

  return (
    <SettingsPage
      title={t("settings.account.title")}
      description={t("settings.account.webdavPrivacyNote")}
    >
      <SettingCard>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-1">
              {t("settings.account.webdavUrl") || "WebDAV URL"}
            </div>
            <input
              type="text"
              value={form.url}
              onChange={handleField("url")}
              placeholder="https://dav.example.com/"
              className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t("settings.account.webdavUrlHint")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">
                {t("settings.account.username") || "Username"}
              </div>
              <input
                type="text"
                value={form.username}
                onChange={handleField("username")}
                className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">
                {t("settings.account.webdavPassword") || "WebDAV Password"}
              </div>
              <input
                type="password"
                value={form.password}
                onChange={handleField("password")}
                placeholder={status.hasPassword ? "••••••••" : ""}
                className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t("settings.account.webdavPasswordHint") ||
                  "HTTP Basic Auth password for your WebDAV server."}
              </p>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">
              {t("settings.account.syncPassphrase") || "Sync Passphrase"}
            </div>
            <input
              type="password"
              value={form.syncPassphrase}
              onChange={handleField("syncPassphrase")}
              placeholder={status.hasSyncPassphrase ? "••••••••" : ""}
              className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t("settings.account.syncPassphraseHint")}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={saveBasic}
              disabled={Boolean(busy) || !form.url.trim()}
              className="px-4 h-9 rounded-xl text-sm font-medium border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-50"
            >
              {t("settings.account.saveUrlUser") || "Save URL & Username"}
            </button>
            <button
              type="button"
              onClick={saveSecrets}
              disabled={
                Boolean(busy) || (!form.password && !form.syncPassphrase)
              }
              className="px-4 h-9 rounded-xl text-sm font-medium border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-50"
            >
              {t("settings.account.saveSecrets") || "Save Passwords"}
            </button>
            <button
              type="button"
              onClick={handleTest}
              disabled={testing || !form.url.trim()}
              className="px-4 h-9 rounded-xl text-sm font-medium border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-50"
            >
              {testing
                ? t("settings.account.testing") || "Testing..."
                : t("settings.account.test") || "Test connection"}
            </button>
          </div>

          <SettingRow
            className={DIVIDED}
            title={t("settings.account.enableSync") || "Enable WebDAV sync"}
            description={t("settings.account.enableSyncDesc")}
            align="center"
            control={
              <Toggle
                checked={Boolean(status.enabled)}
                onChange={handleToggle}
                disabled={!hasUrl || !hasPassphrase}
                ariaLabel={
                  t("settings.account.enableSync") || "Enable WebDAV sync"
                }
              />
            }
          />

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <StatusLine {...snapshotState(t, status, busy === "push")} />
                <p className="text-xs text-gray-500 dark:text-neutral-400">
                  {t("settings.account.saveNowHint")}
                </p>
              </div>
              <button
                type="button"
                onClick={handlePush}
                disabled={Boolean(busy) || !status.enabled}
                className="shrink-0 flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-50"
              >
                <CloudUploadIcon size={16} strokeWidth={1.8} />
                {busy === "push"
                  ? t("settings.account.saving")
                  : t("settings.account.saveNow")}
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <StatusLine {...restoreState(t, status)} />
                <p className="text-xs text-gray-500 dark:text-neutral-400">
                  {t("settings.account.restoreNowHint")}
                </p>
              </div>
              <button
                type="button"
                onClick={handlePull}
                disabled={Boolean(busy) || !status.enabled}
                className="shrink-0 flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-50"
              >
                <CloudDownloadIcon size={16} strokeWidth={1.8} />
                {busy === "pull"
                  ? t("settings.account.restoring")
                  : t("settings.account.restoreNow")}
              </button>
            </div>
          </div>

          {status.revision > 0 && (
            <p className="text-xs text-gray-500">
              {t("settings.account.revision")}: {status.revision}
            </p>
          )}
        </div>
      </SettingCard>

      {/* Historical backups (separate from live snapshot) */}
      <SettingCard>
        <div className="space-y-4">
          <SettingRow
            title={
              t("settings.account.backupEnabled") || "Enable historical backups"
            }
            description={
              t("settings.account.backupEnabledDesc") ||
              "Create timestamped encrypted backup files on the server on a schedule, separate from the current sync data."
            }
            align="center"
            control={
              <Toggle
                checked={Boolean(status.backupEnabled)}
                onChange={handleBackupToggle}
                disabled={!canBackup}
                ariaLabel={
                  t("settings.account.backupEnabled") ||
                  "Enable historical backups"
                }
              />
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">
                {t("settings.account.backupFrequency") || "Backup frequency"}
              </div>
              <select
                value={status.backupFrequency || "daily"}
                onChange={(e) => handleBackupFrequency(e.target.value)}
                disabled={!status.backupEnabled || !canBackup}
                className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
              >
                <option value="manual">
                  {t("settings.account.backupFrequencyManual") || "Manual only"}
                </option>
                <option value="hourly">
                  {t("settings.account.backupFrequencyHourly") || "Hourly"}
                </option>
                <option value="daily">
                  {t("settings.account.backupFrequencyDaily") || "Daily"}
                </option>
                <option value="weekly">
                  {t("settings.account.backupFrequencyWeekly") || "Weekly"}
                </option>
              </select>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">
                {t("settings.account.maxBackups") || "Keep at most"}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={status.maxBackups ?? 30}
                  onChange={(e) => handleMaxBackups(e.target.value)}
                  disabled={!status.backupEnabled || !canBackup}
                  className="w-28 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
                />
                <span className="text-sm text-gray-500">
                  {t("settings.account.maxBackupsSuffix") || ""}
                </span>
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleBackupNow}
                disabled={Boolean(busy) || !status.backupEnabled || !canBackup}
                className="h-9 px-4 rounded-xl text-sm font-medium border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-50"
              >
                {busy === "backup"
                  ? t("settings.account.backingUp") || "Backing up…"
                  : t("settings.account.backupNow") || "Backup now"}
              </button>
            </div>
          </div>

          {status.lastBackupAt && (
            <p className="text-xs text-gray-500">
              {t("settings.account.lastBackup") || "Last backup"}:{" "}
              {ago(t, status.lastBackupAt)}
            </p>
          )}

          <div>
            <div className="text-sm font-medium mb-2">
              {t("settings.account.backupsTitle") || "Available versions"}
            </div>
            {backupsLoading ? (
              <div className="text-sm text-gray-500">{t("common.loading")}</div>
            ) : backups.length === 0 ? (
              <div className="text-sm text-gray-500">
                {t("settings.account.noBackups") || "No historical backups yet"}
              </div>
            ) : (
              <div className="space-y-2">
                {backups.map((b) => {
                  const countsLine = backupCountsLine(t, b.counts);
                  return (
                    <div
                      key={b.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-neutral-700 px-3 py-2 text-sm"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-mono text-xs">
                          {b.name}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {b.iso ? new Date(b.iso).toLocaleString() : ""}
                        </div>
                        {countsLine ? (
                          <div className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5 truncate">
                            {countsLine}
                          </div>
                        ) : null}
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleRestoreBackup(b.name)}
                          disabled={
                            Boolean(busy) || !status.backupEnabled || !canBackup
                          }
                          className="px-3 h-8 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-50 text-xs"
                        >
                          {busy === "restore-" + b.name
                            ? t("settings.account.restoringVersion") ||
                              "Restoring…"
                            : t("settings.account.restoreVersion") ||
                              "Restore this version"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBackup(b.name)}
                          disabled={Boolean(busy) || !canBackup}
                          className="px-3 h-8 rounded-lg border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 text-xs"
                        >
                          {busy === "delete-" + b.name
                            ? t("settings.account.deletingVersion") ||
                              "Deleting…"
                            : t("common.delete")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </SettingCard>

      <SettingCard>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-red-600 dark:text-red-400">
              {t("settings.account.resetLocalTitle") || "Reset this device"}
            </div>
            <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
              {t("settings.account.resetLocalDesc") ||
                "Clears hosts, keys, snippets, proxies, known hosts and the WebDAV setup on this computer. Files already on the server are left alone."}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setConfirming({
                title: t("settings.account.resetLocalConfirmTitle"),
                message: t("settings.account.resetLocalConfirmMessage"),
                confirmLabel: t("settings.account.resetLocalConfirm"),
                onConfirm: async () => {
                  setConfirming(null);
                  await handleResetLocal();
                },
              })
            }
            disabled={Boolean(busy)}
            className="h-9 px-4 rounded-xl text-sm font-medium border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
          >
            {busy === "reset"
              ? t("settings.account.resettingLocal") || "Clearing…"
              : t("settings.account.resetLocal") || "Clear local data"}
          </button>
        </div>
      </SettingCard>

      {confirming && (
        <ConfirmDialog {...confirming} onCancel={() => setConfirming(null)} />
      )}
    </SettingsPage>
  );
}
