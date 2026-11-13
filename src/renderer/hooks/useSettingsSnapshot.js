import { useEffect } from 'react';
import { withLocalDeviceFields, withoutDeviceFields } from '../lib/settings-snapshot';

/**
 * Carries terminal settings in and out of the cloud snapshot.
 *
 * These live in localStorage, which the main process cannot read, so the
 * renderer is the only side that can see them change. This hook reports them
 * up whenever they do, and writes back what a pull brought down from another
 * device.
 *
 * The keys are listed here rather than each hook reporting its own, so adding a
 * setting to the snapshot is one line in one place instead of a change spread
 * across every hook that happens to persist something.
 */
const SYNCED_KEYS = [
    'language',              // i18n, which language the app's own text is in
    'terminal.appearance',   // useTerminalSettings
    'terminalTheme',         // useTerminalTheme
    'terminalCustomTheme',   // useTerminalTheme, the user's own palette
    'theme',                 // useTheme, light, dark, system or custom
    'appColors',             // useTheme, the user's own app palette
    'titleBarLogo',          // useTheme, whether the title bar shows the mark
    'titleBarLogoImage',     // useTheme, the user's own mark, as a data URL
    'titleBarLogoSide',      // useTheme, which end of the title bar it sits at
    'settings.category',     // which settings page was last open
];

function readSettings() {
    const settings = {};

    for (const key of SYNCED_KEYS) {
        const value = localStorage.getItem(key);
        // Without the settings that name something on this machine only, such
        // as the local shell's path; see lib/settings-snapshot.js.
        if (value !== null) settings[key] = withoutDeviceFields(key, value);
    }

    return settings;
}

export default function useSettingsSnapshot() {
    // Report on mount and whenever anything in this window writes a synced key.
    useEffect(() => {
        const api = window.api?.webdavSync;
        const report = () => api?.reportSettings?.(readSettings());

        report();

        // localStorage.setItem does not fire an event in the window that made
        // the change, so the setter is wrapped rather than listened for. The
        // 'storage' event only covers *other* windows, which is the case this
        // app never has.
        const original = localStorage.setItem.bind(localStorage);

        localStorage.setItem = (key, value) => {
            original(key, value);
            if (SYNCED_KEYS.includes(key)) report();
        };

        return () => { localStorage.setItem = original; };
    }, []);

    // Settings arriving from another device.
    useEffect(() => {
        const api = window.api?.webdavSync;
        if (!api || typeof api.onSettings !== 'function') return;

        const off = api.onSettings((settings) => {
            if (!settings || typeof settings !== 'object') return;

            let changed = false;

            for (const key of SYNCED_KEYS) {
                const incoming = settings[key];
                if (typeof incoming !== 'string') continue;

                // Merge rather than replace: the fields this machine owns stay
                // as they are, so a snapshot from another computer cannot blank
                // a shell path that only makes sense here.
                const next = withLocalDeviceFields(key, incoming, localStorage.getItem(key));
                if (localStorage.getItem(key) === next) continue;

                localStorage.setItem(key, next);
                changed = true;
            }

            // The hooks that own these read them once, at mount, and hold the value
            // in React state from then on. Rewriting the keys underneath them
            // changes nothing on screen, and there is no way to re-seed every one
            // of them from here; a reload is what actually applies the settings.
            if (changed) window.location.reload();
        });
        return () => { if (typeof off === 'function') off(); };
    }, []);
}
