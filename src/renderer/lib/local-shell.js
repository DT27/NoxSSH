/**
 * The local terminal, as a pane sees it.
 *
 * A local shell has no stored host: no address, no credentials, nothing that
 * could be edited, synced to another device or saved. A pane still needs a
 * host-shaped record to sit in — the pane tree, the header and the tab strip
 * all read one — so this is that record, made for the session and thrown away
 * with it.
 *
 * `protocol: 'local'` is what the pane branches on: it is not one of the
 * transports a host can be saved with (see lib/protocols.js), and main never
 * routes it through the store.
 *
 * `ephemeral` is the same marker a typed-in address carries. It is what keeps
 * `lastConnectedAt` and OS detection off a record that does not exist anywhere
 * to write them to.
 */

import { translate } from '../i18n';

export const LOCAL_PROTOCOL = 'local';

export const isLocalHost = (host) => host?.protocol === LOCAL_PROTOCOL;

export function createLocalHost() {
    return {
        id: LOCAL_PROTOCOL,
        name: translate('local.title'),
        protocol: LOCAL_PROTOCOL,
        ephemeral: true,
    };
}
