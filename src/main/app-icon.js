const path = require('path');
const electron = require('electron');

const THEMES = new Set(['light', 'dark', 'system', 'custom']);
const DARK_THEMES = new Set(['dark', 'custom']);

function normalizeTheme(theme) {
    return THEMES.has(theme) ? theme : 'system';
}

function iconVariant(theme, systemDark) {
    const normalized = normalizeTheme(theme);
    return DARK_THEMES.has(normalized) || (normalized === 'system' && systemDark)
        ? 'night'
        : 'day';
}

function createIconController(
    {
        app,
        BrowserWindow,
        ipcMain,
        nativeImage,
        nativeTheme,
    } = electron,
    {
        platform = process.platform,
        resourcesPath = process.resourcesPath,
        projectRoot = path.resolve(__dirname, '..', '..'),
    } = {}
) {
    let theme = 'system';
    let initialized = false;
    const images = new Map();
    const missing = new Set();

    function currentVariant() {
        return iconVariant(theme, nativeTheme.shouldUseDarkColors);
    }

    function iconPath(variant = currentVariant()) {
        if (app.isPackaged) {
            return path.join(resourcesPath, 'app-icons', `icon-${variant}.png`);
        }
        return path.join(
            projectRoot,
            'build',
            'AppIcons',
            `icons-${variant}`,
            'desktop-1024x1024.png'
        );
    }

    function currentIcon() {
        const variant = currentVariant();
        if (images.has(variant)) return images.get(variant);

        const source = iconPath(variant);
        const image = nativeImage.createFromPath(source);
        if (image.isEmpty()) {
            if (!missing.has(source)) {
                console.error(`Unable to load application icon: ${source}`);
                missing.add(source);
            }
            return null;
        }

        images.set(variant, image);
        return image;
    }

    function applyToWindow(window, image = currentIcon()) {
        if (
            platform === 'darwin'
            || !image
            || !window
            || window.isDestroyed()
            || typeof window.setIcon !== 'function'
        ) {
            return;
        }
        window.setIcon(image);
    }

    function apply() {
        const image = currentIcon();
        if (!image) return;

        if (platform === 'darwin') {
            app.dock?.setIcon(image);
            return;
        }

        for (const window of BrowserWindow.getAllWindows()) {
            applyToWindow(window, image);
        }
    }

    function setTheme(nextTheme) {
        const normalized = normalizeTheme(nextTheme);
        if (normalized === theme) return;
        theme = normalized;
        apply();
    }

    function initialize() {
        if (initialized) return;
        initialized = true;

        ipcMain.on('appearance-set-icon-theme', (_event, nextTheme) => {
            setTheme(nextTheme);
        });
        nativeTheme.on('updated', () => {
            if (theme === 'system') apply();
        });
        app.on('browser-window-created', (_event, window) => {
            applyToWindow(window);
        });

        apply();
    }

    return {
        initialize,
        setTheme,
        currentIcon,
        currentVariant,
        iconPath,
    };
}

const controller = createIconController();

module.exports = {
    ...controller,
    createIconController,
    iconVariant,
    normalizeTheme,
};
