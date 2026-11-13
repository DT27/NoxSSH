/**
 * Local shell sessions.
 *
 * Same shape as ssh.js, telnet.js and serial.js — one session per pane, a
 * MessagePort carrying the bytes — but there is no network anywhere in it. The
 * shell is this machine's own, run under a pseudo-terminal so that the line
 * editor, the prompt, the colours and every full-screen program behave the way
 * they do in a terminal window.
 *
 * Three things follow from that and shape everything here.
 *
 *   There is no handshake. Nothing authenticates, nothing negotiates, and there
 *   is no host record to read: the pane asks for a local session and gets one.
 *   That is why the dispatcher in transport.js is bypassed by an explicit
 *   flag rather than by a protocol on a stored record.
 *
 *   There is nothing to reconnect to. A shell that exits is gone for good; the
 *   pane reports it and the user decides whether to open another one.
 *
 *   The shell is chosen from the environment the app was launched with. A
 *   packaged app started from Finder has a thin environment, which is why the
 *   shell is started as a login shell: the profile is what puts the user's PATH
 *   back.
 *
 * `node-pty` is loaded lazily and its absence is reported rather than thrown,
 * for the same reason serialport is: a build without the binding must still
 * start and still be able to dial SSH.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { createPipe } = require('./session-pipe');

// tabId -> { term, pipe, hostId, hostName, address, openedAt }
const sessions = new Map();

let binding = null;
let bindingError = '';

/**
 * Resolve `node-pty` once, and remember either it or why it could not be had.
 *
 * The prebuilt `spawn-helper` in the 1.1.0 macOS packages is published without
 * its execute bit, which turns every spawn into "posix_spawnp failed". Setting
 * it here rather than in a postinstall script keeps a packaged app working too,
 * since the prebuilds are unpacked out of the asar archive.
 */
function load() {
    if (binding || bindingError) return binding;

    try {
        // eslint-disable-next-line global-require
        binding = require('node-pty');
        ensureHelper();
    } catch (error) {
        bindingError = /cannot find module/i.test(error.message)
            ? 'Local terminal support is not installed in this build (npm install node-pty)'
            : `Local terminal support could not be loaded: ${error.message}`;
        console.error('node-pty unavailable:', error.message);
    }

    return binding;
}

/** The PTY spawn helper has to be executable; npm may not have left it so. */
function ensureHelper() {
    if (process.platform === 'win32') return;

    try {
        const packed = path.dirname(require.resolve('node-pty/package.json'));
        // A packaged app keeps the binding outside the archive, and that copy
        // is the one that runs: a chmod on the copy inside would fail on a
        // read-only image and change nothing.
        const unpacked = packed.replace(/app\.asar(?=$|[\\/])/, 'app.asar.unpacked');

        // The same two places node-pty itself looks in (see lib/utils.js): a
        // build the packager produced first, then the shipped prebuild.
        const candidates = [...new Set([unpacked, packed])].flatMap((base) => [
            path.join(base, 'build', 'Release', 'spawn-helper'),
            path.join(base, 'prebuilds', `${process.platform}-${process.arch}`, 'spawn-helper'),
        ]);

        for (const helper of candidates) {
            if (!fs.existsSync(helper)) continue;

            try {
                fs.accessSync(helper, fs.constants.X_OK);
                return;
            } catch {
                // Not executable, which is how npm leaves the prebuild.
            }

            try {
                fs.chmodSync(helper, 0o755);
                return;
            } catch {
                // Read-only image; the next candidate is the unpacked copy.
            }
        }
    } catch (error) {
        // A build that compiles its own helper keeps it beside the binding,
        // where make already set the bit. Nothing to do.
        console.warn('Could not check the PTY helper:', error.message);
    }
}

/**
 * Which shell to start.
 *
 * `$SHELL` is what the user's own terminal would use. The fallbacks are the
 * defaults each platform ships, with PowerShell ahead of `COMSPEC` on Windows
 * because a console is expected to be more than cmd.exe.
 */
function shellPath() {
    if (process.platform === 'win32') {
        const powershell = path.join(
            process.env.SystemRoot || 'C:\\Windows',
            'System32',
            'WindowsPowerShell',
            'v1.0',
            'powershell.exe'
        );
        if (fs.existsSync(powershell)) return powershell;
        return process.env.COMSPEC || 'cmd.exe';
    }

    const shell = process.env.SHELL;
    if (shell && fs.existsSync(shell)) return shell;

    return process.platform === 'darwin' ? '/bin/zsh' : '/bin/bash';
}

/** A login shell on POSIX, so the profile puts PATH and the prompt back. */
function shellArgs() {
    return process.platform === 'win32' ? [] : ['-l'];
}

/** `~/bin/fish` means what it means in a shell; `~user` is left alone. */
function expandHome(target) {
    if (target === '~') return os.homedir();
    if (target.startsWith('~/') || target.startsWith('~\\')) {
        return path.join(os.homedir(), target.slice(2));
    }
    return target;
}

function isExecutable(file) {
    try {
        if (!fs.statSync(file).isFile()) return false;
        if (process.platform === 'win32') return true;
        fs.accessSync(file, fs.constants.X_OK);
        return true;
    } catch {
        return false;
    }
}

/**
 * Find the shell a path or a bare name names.
 *
 * A bare name is looked up in PATH, because that is what someone who types
 * `fish` means — but a window started from Finder has a short PATH, so the
 * answer may well be "not found" and the setting says so instead of quietly
 * opening a different shell than the one that was asked for.
 */
function findExecutable(target) {
    const expanded = expandHome(target);

    if (expanded.includes('/') || expanded.includes('\\')) {
        return isExecutable(expanded) ? expanded : '';
    }

    const extensions = process.platform === 'win32'
        ? (process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM').split(';').filter(Boolean)
        : [''];

    for (const directory of (process.env.PATH || '').split(path.delimiter)) {
        if (!directory) continue;

        for (const extension of extensions) {
            const named = expanded.toLowerCase().endsWith(extension.toLowerCase())
                ? expanded
                : expanded + extension;
            const candidate = path.join(directory, named);
            if (isExecutable(candidate)) return candidate;
        }
    }

    return '';
}

/**
 * The shell to start for a pane.
 *
 * The setting wins when there is one; an empty setting means the same thing it
 * always did, which is `$SHELL` and then the platform's default. A setting that
 * names nothing is reported rather than replaced: silently opening zsh for
 * someone who asked for fish is a worse answer than saying the path is wrong.
 */
function resolveShell(requested) {
    const wanted = typeof requested === 'string' ? requested.trim() : '';
    if (!wanted) return { shell: shellPath() };

    const found = findExecutable(wanted);
    if (found) return { shell: found };

    return { error: `Shell not found: ${wanted}` };
}

/** `zsh`, `bash`, `powershell`: the shell's own name, for the transcript header. */
function shellName(shell) {
    const base = path.basename(shell);
    return base.replace(/\.exe$/i, '');
}

/** PTY geometry, kept inside what a terminal can actually be. */
function dimension(value, fallback, max) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 2) return fallback;
    return Math.min(Math.round(number), max);
}

function get(tabId) {
    return sessions.get(tabId);
}

function describe(tabId) {
    const session = sessions.get(tabId);
    return {
        hostId: session?.hostId || '',
        hostName: session?.hostName || '',
        subject: session?.address || '',
    };
}

function destroy(tabId) {
    const session = sessions.get(tabId);
    if (!session) return false;

    sessions.delete(tabId);

    session.pipe.close();

    try {
        session.term.kill();
    } catch (error) {
        // Already exited; the process this session was is gone either way.
        if (!/already/i.test(error.message)) {
            console.error(`Error closing the local shell for ${tabId}:`, error.message);
        }
    }

    return true;
}

function destroyAll() {
    for (const tabId of [...sessions.keys()]) destroy(tabId);
}

/**
 * Open a shell for a pane.
 *
 * `hostId` is deliberately not read: there is no record behind a local shell,
 * and asking the store for one would only fail on a host that never existed.
 */
function connect({ tabId, cols, rows, shell: requestedShell }, { window } = {}) {
    return new Promise((resolve) => {
        if (!tabId) {
            resolve({ success: false, message: 'No pane to open a shell in' });
            return;
        }

        const chosen = resolveShell(requestedShell);
        if (chosen.error) {
            resolve({ success: false, message: chosen.error });
            return;
        }

        // A reconnect and a stale session on the same pane are the same thing:
        // the shell that was there goes, and a fresh one takes its place.
        destroy(tabId);

        const pty = load();
        if (!pty) {
            resolve({ success: false, message: bindingError });
            return;
        }

        const shell = chosen.shell;
        const home = os.homedir();

        const env = { ...process.env, TERM: 'xterm-256color', COLORTERM: 'truecolor' };
        // Inherited from whatever launched the app, these make the shell think
        // it is inside tmux or screen and draw that multiplexer's chrome.
        for (const key of ['TMUX', 'TMUX_PANE', 'STY', 'WINDOW', 'WINDOWID', 'TERMCAP', 'COLUMNS', 'LINES']) {
            delete env[key];
        }

        let term;
        try {
            term = pty.spawn(shell, shellArgs(), {
                name: 'xterm-256color',
                cols: dimension(cols, 80, 1000),
                rows: dimension(rows, 24, 500),
                cwd: home,
                env,
            });
        } catch (error) {
            resolve({
                success: false,
                message: `Could not start ${shellName(shell)}: ${error.message}`,
            });
            return;
        }

        const name = shellName(shell);

        const pipe = createPipe({
            tabId,
            window,
            label: { hostName: name, address: home, hostId: '' },
            protocol: 'local',
            onInput: (data) => {
                try {
                    term.write(data);
                } catch (error) {
                    // The shell went between the keystroke and this line.
                    console.error(`Could not write to the local shell for ${tabId}:`, error.message);
                }
            },
            onResize: (nextCols, nextRows) => {
                try {
                    term.resize(
                        dimension(nextCols, 80, 1000),
                        dimension(nextRows, 24, 500)
                    );
                } catch {
                    // A resize after exit is not worth reporting; the pane is
                    // already being told the session ended.
                }
            },
        });

        sessions.set(tabId, {
            term,
            pipe,
            hostId: '',
            hostName: name,
            address: home,
            openedAt: Date.now(),
        });

        term.onData((chunk) => pipe.deliver(chunk));

        term.onExit(() => {
            // A replaced session leaves its exit behind after the new one has
            // taken the tab; that exit is not news about the new one.
            const session = sessions.get(tabId);
            if (!session || session.term !== term) return;

            pipe.disconnected();
            if (window && !window.isDestroyed()) {
                window.webContents.send('ssh-disconnected', tabId);
            }
            destroy(tabId);
        });

        resolve({ success: true, message: 'Connected' });
    });
}

module.exports = {
    sessions,
    get,
    describe,
    connect,
    destroy,
    destroyAll,
    /** What an empty "default shell" setting resolves to, for the settings page. */
    defaultShell: shellPath,
};
