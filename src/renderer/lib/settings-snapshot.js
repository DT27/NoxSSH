/**
 * What a settings snapshot may carry between machines, and what it may not.
 *
 * The synced keys are plain strings, but one of them is a JSON blob that mixes
 * portable settings with settings that name something on the machine they were
 * chosen on. A shell path is the case: `/opt/homebrew/bin/fish` means a shell on
 * this Mac and nothing at all on a Windows machine, and carrying it over would
 * leave the other device failing to open a local terminal for a reason that has
 * nothing to do with it.
 *
 * So the blob is trimmed on the way out and its device-local half is kept on the
 * way in: pulling a snapshot changes the portable settings and leaves the local
 * ones exactly as this machine had them.
 */

/** key -> fields that belong to the device rather than to the account. */
export const DEVICE_LOCAL_FIELDS = {
    'terminal.appearance': ['localShell'],
};

const parseObject = (raw) => {
    if (typeof raw !== 'string') return null;
    try {
        const value = JSON.parse(raw);
        return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
    } catch {
        return null;
    }
};

/** The value to report upward: the device-local fields removed. */
export function withoutDeviceFields(key, raw) {
    const fields = DEVICE_LOCAL_FIELDS[key];
    if (!fields || typeof raw !== 'string') return raw;

    const value = parseObject(raw);
    if (!value) return raw;

    for (const field of fields) delete value[field];
    return JSON.stringify(value);
}

/** The value to write locally: the incoming one, device-local fields kept. */
export function withLocalDeviceFields(key, incoming, localRaw) {
    const fields = DEVICE_LOCAL_FIELDS[key];
    if (!fields || typeof incoming !== 'string') return incoming;

    const value = parseObject(incoming);
    if (!value) return incoming;

    const local = parseObject(localRaw);

    for (const field of fields) {
        if (local && field in local) value[field] = local[field];
        else delete value[field];
    }

    return JSON.stringify(value);
}
