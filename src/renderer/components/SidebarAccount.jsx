import { memo, useCallback, useEffect, useState } from 'react';
import { CloudUploadIcon } from 'hugeicons-react';

/**
 * WebDAV sync status button at the foot of the sidebar.
 *
 * Opens Settings → Account (now the WebDAV sync settings page).
 * Shows whether sync is enabled and a very short status line.
 */
function SidebarAccount({ onNavChange }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    window.api.webdavSync?.status?.().then(setStatus);
  }, []);

  useEffect(() => {
    const off = window.api.webdavSync?.onState?.(setStatus);
    return () => { if (typeof off === 'function') off(); };
  }, []);

  const open = useCallback(() => {
    localStorage.setItem('settings.category', 'account');
    onNavChange('settings');
  }, [onNavChange]);

  // If the API isn't there yet (old build), don't render.
  if (!window.api?.webdavSync) return null;

  const label = status?.enabled
    ? (status.url ? 'WebDAV sync' : 'Sync (not configured)')
    : 'Sync';

  const sub = status?.enabled
    ? (status.lastPushAt ? 'Last saved recently' : 'Enabled')
    : 'Tap to set up';

  return (
    <button
      type="button"
      onClick={open}
      title={status?.url || 'Open sync settings'}
      className="mt-auto shrink-0 flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-left
          outline-none transition-colors
          text-gray-600 dark:text-gray-400
          hover:bg-gray-900/[0.04] dark:hover:bg-surface-raised
          focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-white/25"
    >
      <CloudUploadIcon size={22} strokeWidth={1.6} className="shrink-0" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm truncate text-gray-900 dark:text-white">{label}</span>
        {sub && (
          <span className="block text-[11px] leading-tight truncate text-gray-500 dark:text-gray-500">
            {sub}
          </span>
        )}
      </span>
    </button>
  );
}

export default memo(SidebarAccount);
