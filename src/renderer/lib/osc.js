/**
 * OSC (Operating System Command) sequence helpers.
 *
 * The only one NoxSSH currently consumes is OSC 7 — the shell-integration
 * "current working directory" announcement. A shell that knows about it emits:
 *
 *     ESC ] 7 ; file://hostname/path BEL
 *     ESC ] 7 ; file://hostname/path ESC \
 *
 * every time its prompt is redrawn. Parsing it lets the SFTP browser land in
 * the directory the user is actually standing in, instead of always dropping
 * them in $HOME.
 */

/**
 * Pull every OSC 7 cwd announcement out of `data` and return the last path.
 *
 * Returns null when the chunk holds no complete OSC 7 (the caller keeps a
 * carry-over buffer for sequences that straddle two writes). The hostname is
 * deliberately discarded: the SFTP session is on the same machine the shell
 * is, so only the path matters.
 */
export function extractOsc7Cwd(data) {
    if (!data) return null;

    // ESC ] 7 ; file:// [host] [/path] (BEL or ST)
    // [^/] skips the host (and an optional port); the capture starts at the
    // leading slash and runs until the terminator. A bare `file://host` with
    // no slash yields no path and is ignored.
    const re = /\x1b\]7;file:\/\/[^/]*(\/[^\x07\x1b]*)?(?:\x07|\x1b\\)/g;

    let match;
    let cwd = null;
    while ((match = re.exec(data)) !== null) {
        if (match[1] !== undefined) {
            try {
                cwd = decodeURIComponent(match[1]);
            } catch {
                cwd = match[1];
            }
        }
    }
    return cwd;
}

/**
 * Feed a chunk of terminal output through an OSC 7 parser that survives
 * sequences split across writes.
 *
 * Returns the latest cwd seen in this chunk (null if none). `bufferRef` is
 * mutated in place to carry any trailing, not-yet-terminated OSC over to the
 * next call — keep it in a `useRef` so it lives for the life of the pane.
 */
export function feedOsc7(data, bufferRef) {
    if (!data) return null;

    const combined = bufferRef.current + data;
    let cwd = extractOsc7Cwd(combined);

    // Preserve everything from the last ESC ] onwards if it never reaches a
    // terminator: it is the start of an OSC that the next write will finish.
    const lastEsc = combined.lastIndexOf('\x1b]');
    if (lastEsc >= 0) {
        const tail = combined.slice(lastEsc);
        if (!/\x07|\x1b\\/.test(tail)) {
            bufferRef.current = tail;
            return cwd;
        }
    }

    bufferRef.current = '';
    return cwd;
}
