/**
 * Drop `cpu-features` before electron-builder rebuilds native modules.
 *
 * ssh2 lists it as optional and loads it behind a try/catch to pick a faster
 * cipher. It is built with nan, which does not compile against Electron 43's
 * V8 headers, so @electron/rebuild fails on any machine that has a compiler.
 *
 * On Windows npm never installed it, which is why that build used to work.
 * Removing it here puts every platform in the same place, including a macOS
 * host packaging `--win`: node-gyp cannot cross-compile, and this module has
 * no prebuild to fall back on.
 *
 * serialport ships prebuilds and is left alone.
 */
const fs = require('fs');
const path = require('path');

module.exports = function beforeBuild(context) {
    const dir = path.join(context.appDir, 'node_modules', 'cpu-features');
    fs.rmSync(dir, { recursive: true, force: true });

    // node-pty's prebuilt PTY helper is published without its execute bit, and
    // the packaged copy keeps whatever mode it was copied with. Setting it here
    // means the app does not have to fix permissions inside a bundle that may
    // be read-only; local-shell.js still checks at runtime for a dev install.
    const pty = path.join(
        context.appDir,
        'node_modules',
        'node-pty',
        'prebuilds',
        `${process.platform}-${process.arch}`,
        'spawn-helper'
    );
    try {
        if (fs.existsSync(pty)) fs.chmodSync(pty, 0o755);
    } catch {
        // Windows ships no helper, and a compiled build sets its own mode.
    }

    // Must be true: a falsy return tells electron-builder that node_modules
    // are handled outside it, and it then packs none of them.
    return true;
};
