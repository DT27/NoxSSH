/**
 * Shell integration: teach the remote shell to announce its current working
 * directory through OSC 7 ("file://hostname/path") every time it redraws the
 * prompt. The renderer parses those sequences out of the data stream and uses
 * them to land the SFTP browser in the directory the user is standing in.
 *
 * The command is POSIX shell and auto-detects bash vs zsh. Fish uses a
 * different syntax and is left alone — the SFTP pane simply stays where it
 * was, the same as before this feature existed.
 *
 * Existing prompt hooks are preserved: bash's PROMPT_COMMAND is chained with
 * `;` rather than overwritten, and zsh's precmd_functions array is appended to.
 */

// The work is done inside a shell function so the prompt-hook value stays a
// simple function call. Putting the printf straight in PROMPT_COMMAND and
// chaining with `${PROMPT_COMMAND:+; $PROMPT_COMMAND}` looks tidy but
// re-expands the variable every time the prompt runs, which recurses.
const FUNC = '__noxssh_cwd_hook';

// OSC 7: ESC ] 7 ; file://hostname/path BEL
// Single quotes around the printf body so the backslashes survive to printf.
const BODY = `printf '\\033]7;file://%s%s\\033\\\\' "$(hostname 2>/dev/null)" "$PWD"`;

// How the install command is kept off the user's screen:
//
//   1. `: ESC [ 8 m` — the colon is the null command; everything after it on
//      the same line is an argument it ignores. The PTY echoes the bytes back
//      to the terminal, so the ESC [ 8 m (SGR "conceal") lands in the output
//      stream and the terminal stops drawing subsequent echoed characters.
//
//      We used to send the conceal sequence first and then erase it from the
//      input buffer with Ctrl-U / Ctrl-C so the shell would never see it. That
//      broke on hosts whose PTY line discipline visually erases the echoed
//      characters on line-kill — the conceal sequence was wiped before the
//      terminal could act on it, and the setup command ended up on screen.
//      Passing it as an argument to `:` is harmless and always echoed.
//
//   2. The actual setup command, echoed invisibly now that conceal is on.
//   3. The newline runs it.
//
// The reveal (ESC [ 28 m) is emitted from inside PROMPT_COMMAND / precmd, not
// from the install line, so it always runs once the shell is back at the
// prompt and the display is never left concealed.
const HIDE = '\x1b[8m';
const REVEAL = "\\033[28m";

/**
 * Build the command that installs OSC 7 cwd reporting in the user's shell.
 *
 * Written to the PTY right after the connection comes up, before any
 * initCommand, so it is in place before the user types anything. It runs as
 * two lines and produces no visible output of its own (only the leading `:`
 * of the conceal line is drawn, a single character).
 */
export function installOsc7Command() {
    const body = [
        `__noxssh_cwd_hook() { ${BODY}; };`,
        // bash: chain onto PROMPT_COMMAND so the user's own hook still runs.
        // The reveal printf goes first so the display is back to normal before
        // the hook (and the user's own PROMPT_COMMAND) prints anything.
        `if [ -n "$BASH_VERSION" ]; then`,
        `PROMPT_COMMAND="printf '${REVEAL}'; ${FUNC}${'${PROMPT_COMMAND:+; $PROMPT_COMMAND}'}";`,
        // zsh: append to precmd_functions. zsh runs the array before the
        // precmd function (if any), so this never clobbers what the user
        // already has — it just adds our calls to the list. The reveal runs
        // before the cwd hook for the same reason as bash.
        `elif [ -n "$ZSH_VERSION" ]; then`,
        `precmd_functions+=(__noxssh_cwd_hook);`,
        `fi`,
    ].join(' ');

    // Line 1: `:` null-command whose argument is the conceal escape. The
    // terminal sees the echoed ESC [ 8 m and switches to hidden output.
    // Line 2: the real setup, echoed invisibly, then executed.
    return `: ${HIDE}\n${body}; printf '${REVEAL}'\n`;
}
