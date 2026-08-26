/**
 * Turning a blob of text into the os/distro pair the icons are keyed on.
 *
 * The input is the output of `cat /etc/os-release` and `uname -a` from a live
 * session.
 *
 * Order matters: the derivatives come before the distributions they are built
 * on, or every Kubuntu is an Ubuntu and every Manjaro is an Arch.
 */

const DISTRO_MAP = [
    // Unraid reports Slackware in /etc/os-release, so its explicit marker must
    // be checked before the base distribution.
    [['id=unraid', 'unraid'], 'unraid'],
    [['id=kubuntu', 'kubuntu'], 'kubuntu'],
    [['id=lubuntu', 'lubuntu'], 'lubuntu'],
    [['id=xubuntu', 'xubuntu'], 'xubuntu'],
    [['id=ubuntu', 'ubuntu'], 'ubuntu'],
    [['id=debian', 'debian'], 'debian'],
    [['id=fedora', 'fedora'], 'fedora'],
    [['id=centos', 'centos'], 'centos'],
    [['id=rhel', 'red hat', 'rhel'], 'rhel'],
    [['id=rocky', 'rocky'], 'rocky'],
    [['id=almalinux', 'id=alma', 'almalinux', 'alma linux'], 'alma'],
    [['id=endeavouros', 'endeavour'], 'endeavour'],
    [['id=garuda', 'garuda'], 'garuda'],
    [['id=arcolinux', 'arco'], 'arco'],
    [['id=artix', 'artix'], 'artix'],
    [['id=manjaro', 'manjaro'], 'manjaro'],
    [['id=arch', 'archlinux', 'arch linux'], 'arch'],
    [['id=alpine', 'alpine'], 'alpine'],
    [['id=nixos', 'nixos'], 'nixos'],
    [['id=gentoo', 'gentoo'], 'gentoo'],
    [['id=opensuse', 'id=sles', 'suse'], 'suse'],
    [['id=linuxmint', 'linux mint'], 'mint'],
    [['id=pop', 'pop!_os'], 'pop'],
    [['id=elementary', 'elementary'], 'elementary'],
    [['id=zorin', 'zorin'], 'zorin'],
    [['id=deepin', 'deepin'], 'deepin'],
    [['id=kali', 'kali'], 'kali'],
    [['id=parrot', 'parrot'], 'parrot'],
    [['id=tails', 'tails'], 'tails'],
    [['id=mx', 'mx linux'], 'mx'],
    [['id=void', 'void'], 'void'],
    [['id=solus', 'solus'], 'solus'],
    [['id=slackware', 'slackware'], 'slackware'],
    [['id=raspbian', 'raspberry'], 'raspios'],
    [['id=amzn', 'amazon'], 'amazon'],
];

/** The distro key for some text, or '' when nothing in the table matches. */
function matchDistro(lower) {
    for (const [keywords, name] of DISTRO_MAP) {
        if (keywords.some(keyword => lower.includes(keyword))) return name;
    }
    return '';
}

const UNRAID_MARKER = '---UNRAID---';
const OS_RELEASE_MARKER = '---OS-RELEASE---';
const SYSTEM_VERSION_MARKER = '---SYSTEM-VERSION---';
const UNAME_MARKER = '---UNAME---';

function markerIndex(text, marker) {
    return text.toLowerCase().indexOf(marker.toLowerCase());
}

function cleanVersion(value) {
    let version = String(value || '').trim();
    if (
        version.length >= 2
        && ((version.startsWith('"') && version.endsWith('"'))
            || (version.startsWith("'") && version.endsWith("'")))
    ) {
        version = version.slice(1, -1).trim();
    }
    return version.replace(/\s+/g, ' ').slice(0, 80);
}

/** Read one exact key from os-release-style key=value text. */
function releaseValue(text, key) {
    const wanted = key.toLowerCase();
    for (const rawLine of String(text || '').split(/\r?\n/)) {
        const line = rawLine.trim();
        const separator = line.indexOf('=');
        if (separator < 0 || line.slice(0, separator).trim().toLowerCase() !== wanted) continue;
        return cleanVersion(line.slice(separator + 1));
    }
    return '';
}

function firstMarkerAfter(text, start, markers) {
    const indexes = markers
        .map(marker => markerIndex(text, marker))
        .filter(index => index >= start);
    return indexes.length > 0 ? Math.min(...indexes) : text.length;
}

/**
 * Read the user-facing system version without changing the long-standing
 * os/distro classification contract.
 */
function detectOsVersion(output, { os, distro }) {
    const text = String(output || '');
    const unraidAt = markerIndex(text, UNRAID_MARKER);
    const releaseAt = markerIndex(text, OS_RELEASE_MARKER);

    if (distro === 'unraid' && unraidAt >= 0) {
        // New output puts the marker before the file; the legacy command put
        // it after. Supporting both keeps recorded fixtures and older helpers
        // useful while the live command moves to explicit sections.
        const end = releaseAt > unraidAt ? releaseAt : text.length;
        const block = releaseAt > unraidAt
            ? text.slice(unraidAt + UNRAID_MARKER.length, end)
            : text.slice(0, unraidAt);
        return releaseValue(block, 'version') || releaseValue(block, 'version_id');
    }

    if (os === 'linux') {
        const start = releaseAt >= 0
            ? releaseAt + OS_RELEASE_MARKER.length
            : (unraidAt >= 0 ? unraidAt + UNRAID_MARKER.length : 0);
        const end = firstMarkerAfter(text, start, [SYSTEM_VERSION_MARKER, UNAME_MARKER]);
        const release = text.slice(start, end);
        const version = releaseValue(release, 'version_id') || releaseValue(release, 'version');
        if (version) return version;
    }

    const systemAt = markerIndex(text, SYSTEM_VERSION_MARKER);
    if (systemAt < 0) return '';

    const start = systemAt + SYSTEM_VERSION_MARKER.length;
    const end = firstMarkerAfter(text, start, [UNAME_MARKER]);
    const line = text.slice(start, end).split(/\r?\n/).map(value => value.trim()).find(Boolean) || '';
    const windows = line.match(/windows\s+\[version\s+([^\]]+)\]/i);
    return cleanVersion(windows?.[1] || line);
}

/**
 * Classify shell output from a live session.
 *
 * Linux is the default rather than 'unknown' because this only ever runs
 * against a server that answered an SSH exec, and the family checks below are
 * the ones that can be made confidently from `uname`.
 */
function classifyShellOutput(output) {
    const lower = String(output || '').toLowerCase();

    let os = 'linux';
    if (lower.includes('darwin')) os = 'macos';
    else if (lower.includes('microsoft') || lower.includes('windows')) os = 'windows';
    else if (lower.includes('freebsd')) os = 'freebsd';
    else if (lower.includes('openbsd')) os = 'openbsd';

    return { os, distro: os === 'linux' ? matchDistro(lower) : '' };
}

function classifySystemOutput(output) {
    const detected = classifyShellOutput(output);
    return {
        ...detected,
        osVersion: detectOsVersion(output, detected),
    };
}

module.exports = {
    DISTRO_MAP,
    matchDistro,
    classifyShellOutput,
    classifySystemOutput,
};
