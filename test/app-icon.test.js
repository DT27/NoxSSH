const assert = require('assert');
const Module = require('module');
const path = require('path');

const root = path.join(__dirname, '..');

// app-icon.js creates its production controller at module load. Stub Electron
// so the module remains importable under plain Node, then exercise an injected
// controller with observable windows and theme events.
const realLoad = Module._load;
Module._load = function (request, parent, isMain) {
    if (request === 'electron') return {};
    return realLoad.call(this, request, parent, isMain);
};

const { createIconController, iconVariant, normalizeTheme } = require(
    path.join(root, 'src', 'main', 'app-icon.js')
);
Module._load = realLoad;

function makeElectron({ packaged = false, systemDark = false } = {}) {
    const listeners = {};
    const windows = [];
    const dockIcons = [];

    const electron = {
        app: {
            isPackaged: packaged,
            dock: {
                setIcon: (image) => dockIcons.push(image.path),
            },
            on: (event, listener) => {
                listeners[`app:${event}`] = listener;
            },
        },
        BrowserWindow: {
            getAllWindows: () => windows,
        },
        ipcMain: {
            on: (channel, listener) => {
                listeners[`ipc:${channel}`] = listener;
            },
        },
        nativeImage: {
            createFromPath: (source) => ({
                path: source,
                isEmpty: () => false,
            }),
        },
        nativeTheme: {
            shouldUseDarkColors: systemDark,
            on: (event, listener) => {
                listeners[`theme:${event}`] = listener;
            },
        },
    };

    return { electron, listeners, windows, dockIcons };
}

function makeWindow() {
    const icons = [];
    return {
        icons,
        isDestroyed: () => false,
        setIcon: (image) => icons.push(image.path),
    };
}

assert.strictEqual(normalizeTheme('light'), 'light');
assert.strictEqual(normalizeTheme('unknown'), 'system');
assert.strictEqual(iconVariant('light', true), 'day');
assert.strictEqual(iconVariant('dark', false), 'night');
assert.strictEqual(iconVariant('custom', false), 'night');
assert.strictEqual(iconVariant('system', false), 'day');
assert.strictEqual(iconVariant('system', true), 'night');

const windowsRuntime = makeElectron();
const firstWindow = makeWindow();
windowsRuntime.windows.push(firstWindow);

const windowsController = createIconController(windowsRuntime.electron, {
    platform: 'win32',
    projectRoot: root,
});
windowsController.initialize();

assert.match(firstWindow.icons.at(-1), /icons-day[\\/]desktop-1024x1024\.png$/);

windowsRuntime.listeners['ipc:appearance-set-icon-theme']({}, 'dark');
assert.match(firstWindow.icons.at(-1), /icons-night[\\/]desktop-1024x1024\.png$/);

windowsRuntime.listeners['ipc:appearance-set-icon-theme']({}, 'custom');
assert.match(firstWindow.icons.at(-1), /icons-night[\\/]desktop-1024x1024\.png$/);

windowsRuntime.electron.nativeTheme.shouldUseDarkColors = false;
windowsRuntime.listeners['ipc:appearance-set-icon-theme']({}, 'system');
assert.match(firstWindow.icons.at(-1), /icons-day[\\/]desktop-1024x1024\.png$/);

windowsRuntime.electron.nativeTheme.shouldUseDarkColors = true;
windowsRuntime.listeners['theme:updated']();
assert.match(firstWindow.icons.at(-1), /icons-night[\\/]desktop-1024x1024\.png$/);

const secondWindow = makeWindow();
windowsRuntime.listeners['app:browser-window-created']({}, secondWindow);
assert.match(secondWindow.icons.at(-1), /icons-night[\\/]desktop-1024x1024\.png$/);

const macRuntime = makeElectron({ packaged: true });
const resourcesPath = path.join(root, 'packaged-resources');
const macController = createIconController(macRuntime.electron, {
    platform: 'darwin',
    resourcesPath,
    projectRoot: root,
});
macController.initialize();
assert.strictEqual(
    macRuntime.dockIcons.at(-1),
    path.join(resourcesPath, 'app-icons', 'icon-day.png')
);

macController.setTheme('dark');
assert.strictEqual(
    macRuntime.dockIcons.at(-1),
    path.join(resourcesPath, 'app-icons', 'icon-night.png')
);

console.log('app icon: adaptive theme icons verified');
