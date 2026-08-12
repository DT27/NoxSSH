import { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
    AlertCircleIcon,
    CheckmarkCircle02Icon,
    Loading03Icon,
    ViewIcon,
    ViewOffIcon,
} from 'hugeicons-react';
import Sheet from '../ui/Sheet';
import Button, { IconButton } from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Disclosure from '../ui/Disclosure';
import StoredSecretHint from '../ui/StoredSecretHint';
import Field, { FIELD_CLASS } from '../ui/Field';
import Select from '../ui/Select';
import { useT } from '../../i18n';
import {
    DEFAULT_PORTS,
    DEFAULT_TIMEOUT,
    PROXY_TYPES,
    chainCandidates,
    nameProxy,
    proxyRoute,
    supportsAuth,
} from '../../lib/proxies';

/**
 * The proxy editor.
 *
 * Laid out to the plan the host editor follows: the question every field below
 * depends on first, the three or four values anybody fills in above the fold, and
 * everything with a working default folded away under "Optional".
 *
 * The check button is in the footer beside Save rather than inside a section,
 * because it is the thing you press repeatedly while getting the settings right.
 * It works on what is in the form, saved or not, which is the whole point: a
 * check that only reads stored records cannot help you fix an address you have
 * just mistyped.
 *
 * Mounted only while open, like every other sheet: it owns its enter and exit
 * animations and calls `onClose` once it has finished leaving.
 */
function ProxyDialog({ proxy, proxies = [], dismiss, onClose, onSave, onTest }) {
    const t = useT();
    const [formData, setFormData] = useState(() => ({
        id: proxy?.id,
        name: proxy?.name || '',
        type: proxy?.type || 'socks5',
        host: proxy?.host || '',
        port: proxy?.port || DEFAULT_PORTS[proxy?.type || 'socks5'],
        username: proxy?.username || '',
        password: '',
        remoteDns: proxy?.remoteDns === undefined ? true : Boolean(proxy.remoteDns),
        viaProxyId: proxy?.viaProxyId || '',
        timeout: proxy?.timeout || DEFAULT_TIMEOUT,
    }));
    const [showPassword, setShowPassword] = useState(false);
    // Blank means keep whatever is stored; this flag means delete it.
    const [clearPassword, setClearPassword] = useState(false);
    const [check, setCheck] = useState(null);
    const formRef = useRef(null);

    const handleChange = useCallback((field, value) => {
        setFormData(previous => ({ ...previous, [field]: value }));
        // A result describes the settings it was run against, so any edit makes
        // it stale. Leaving a green tick under a changed address would be the
        // one lie this dialog is able to tell.
        setCheck(null);
    }, []);

    const hasAuth = supportsAuth(formData.type);

    /**
     * Switching kind carries the port with it, but only when it was still the old
     * kind's default. A proxy on 3128 stays on 3128; one left on 1080 becomes
     * 8080 rather than pointing an HTTP proxy at the SOCKS port.
     */
    const handleType = useCallback((next) => {
        setCheck(null);
        setFormData((previous) => {
            const wasDefault = !previous.port || previous.port === DEFAULT_PORTS[previous.type];
            return {
                ...previous,
                type: next,
                port: wasDefault ? DEFAULT_PORTS[next] : previous.port,
            };
        });
    }, []);

    /**
     * What the chain picker offers. The current choice stays on the list even
     * once it would no longer be offered, so merely opening this form cannot
     * silently drop a setting nobody touched.
     */
    const chainOptions = useMemo(() => {
        const candidates = chainCandidates(proxies, proxy?.id);
        const chosen = formData.viaProxyId;
        if (!chosen || candidates.some(candidate => candidate.id === chosen)) return candidates;

        const stale = proxies.find(candidate => candidate.id === chosen);
        return stale ? [stale, ...candidates] : candidates;
    }, [proxies, proxy?.id, formData.viaProxyId]);

    /**
     * The hops before this proxy, in dial order.
     *
     * Choosing one can add more than one, because the proxy chosen may itself be
     * reached through another, and that is the part assembled out of records this
     * form is not showing.
     */
    const route = useMemo(
        () => proxyRoute(proxies, formData.viaProxyId).map(nameProxy),
        [proxies, formData.viaProxyId],
    );

    const summaries = useMemo(() => {
        const via = proxies.find(candidate => candidate.id === formData.viaProxyId);
        const seconds = Math.round((formData.timeout || DEFAULT_TIMEOUT) / 1000);

        return {
            chain: via ? nameProxy(via) : '',
            advanced: [
                formData.remoteDns ? '' : 'Names resolved here',
                seconds === Math.round(DEFAULT_TIMEOUT / 1000) ? '' : `${seconds}s timeout`,
            ].filter(Boolean).join(', '),
        };
    }, [formData, proxies]);

    /** The draft as the main process wants it, with the secret rule applied. */
    const draft = useCallback((forSaving) => {
        const { password, ...rest } = formData;
        return {
            ...rest,
            // '' keeps the stored secret, null deletes it. A check never deletes
            // anything, so it only ever sends what is in the box.
            password: password || (forSaving && clearPassword ? null : ''),
        };
    }, [formData, clearPassword]);

    const runCheck = useCallback(async () => {
        if (!formRef.current?.reportValidity()) return;

        setCheck({ running: true });
        const result = await onTest({ proxy: draft(false) });
        setCheck({ ...result, running: false });
    }, [draft, onTest]);

    /**
     * `reportValidity` keeps the browser's own `required` handling now that the
     * action sits in the sheet footer, outside the form. The close is the sheet's
     * animated one, so saving leaves the same way cancelling does.
     */
    const submit = useCallback(async (close) => {
        if (!formRef.current?.reportValidity()) return;

        try {
            await onSave(draft(true));
        } catch {
            // Stay open so a failed save does not discard what was typed.
            return;
        }
        close();
    }, [draft, onSave]);

    const chosen = PROXY_TYPES.find(entry => entry.id === formData.type);

    return (
        <Sheet
            title={proxy ? t('proxies.editor.titleEdit') : t('proxies.editor.titleNew')}
            subtitle={t('proxies.editor.subtitle')}
            dismiss={dismiss}
            onClose={onClose}
            footer={(close) => (
                <>
                    <Button className="mr-auto" onClick={runCheck} disabled={check?.running}>
                        {check?.running ? t('proxies.editor.checking') : t('proxies.editor.check')}
                    </Button>
                    <Button onClick={close}>{t('common.cancel')}</Button>
                    <Button variant="primary" onClick={() => submit(close)}>
                        {proxy ? t('proxies.editor.save') : t('proxies.editor.create')}
                    </Button>
                </>
            )}
        >
            {(close) => (
            <form
                ref={formRef}
                onSubmit={(event) => { event.preventDefault(); submit(close); }}
                className="flex flex-col gap-5"
            >
                {/* What the proxy speaks. First, because it decides what the
                    fields below can carry: SOCKS4 has no password and cannot
                    take an IPv6 address, and HTTP shows its credentials to the
                    proxy rather than proving them. */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {t('proxies.editor.speaks')}
                    </span>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 dark:bg-surface-base rounded-xl">
                        {PROXY_TYPES.map((entry) => (
                            <button
                                key={entry.id}
                                type="button"
                                title={entry.detail}
                                className={`px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    formData.type === entry.id
                                        ? 'bg-white dark:bg-surface-active text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                }`}
                                onClick={() => handleType(entry.id)}
                            >
                                {entry.label}
                            </button>
                        ))}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-neutral-500">
                        {chosen?.detail}
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <Field label={t('proxies.editor.address')} className="col-span-3">
                        <input
                            data-autofocus
                            type="text"
                            value={formData.host}
                            onChange={(e) => handleChange('host', e.target.value)}
                            className={`${FIELD_CLASS} font-mono`}
                            placeholder="127.0.0.1"
                            required
                        />
                    </Field>
                    <Field label={t('proxies.editor.port')}>
                        <input
                            type="number"
                            value={formData.port}
                            onChange={(e) => handleChange(
                                'port',
                                parseInt(e.target.value, 10) || DEFAULT_PORTS[formData.type]
                            )}
                            className={`${FIELD_CLASS} font-mono`}
                            required
                        />
                    </Field>
                </div>

                <Field
                    label={t('proxies.editor.name')}
                    hint={t('proxies.editor.nameHint')}
                >
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={FIELD_CLASS}
                        placeholder={t('proxies.editor.namePlaceholder')}
                    />
                </Field>

                {hasAuth ? (
                    <div className="grid grid-cols-2 gap-4">
                        <Field label={t('proxies.editor.username')}>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                                className={`${FIELD_CLASS} font-mono`}
                                placeholder={t('proxies.editor.usernamePlaceholder')}
                                autoComplete="off"
                            />
                        </Field>
                        <Field label={t('proxies.editor.password')}>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    className={`${FIELD_CLASS} pr-10`}
                                    placeholder={proxy?.hasPassword ? t('proxies.editor.passwordStored') : '••••••••'}
                                    autoComplete="off"
                                />
                                <IconButton
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? t('proxies.editor.hidePassword') : t('proxies.editor.showPassword')}
                                    className="absolute right-1 top-1/2 -translate-y-1/2"
                                    icon={showPassword
                                        ? <ViewOffIcon size={15} strokeWidth={2} />
                                        : <ViewIcon size={15} strokeWidth={2} />}
                                />
                            </div>
                            {proxy?.hasPassword && !formData.password && (
                                <StoredSecretHint
                                    label={t('proxies.editor.passwordStoredHint')}
                                    cleared={clearPassword}
                                    onClear={() => setClearPassword(true)}
                                />
                            )}
                        </Field>
                    </div>
                ) : (
                    /* SOCKS4 has no password half at all: the field is an ident
                       string, sent in the clear, which a server either ignores or
                       matches against identd. Calling it a username here would be
                       claiming the connection is authenticated when it is not. */
                    <Field
                        label={t('proxies.editor.ident')}
                        hint={t('proxies.editor.identHint')}
                    >
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            className={`${FIELD_CLASS} font-mono`}
                            placeholder={t('proxies.editor.identPlaceholder')}
                            autoComplete="off"
                        />
                    </Field>
                )}

                {/* The result of the footer's check, kept where it can be read
                    rather than in a toast that has gone by the time the address
                    is being compared against it. */}
                {check && !check.running && (
                    <p className={`flex items-start gap-2 text-[11px] rounded-lg border px-3 py-2 ${check.success
                        ? 'text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/25 bg-green-50 dark:bg-green-500/5'
                        : 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/25 bg-red-50 dark:bg-red-500/5'}`}
                    >
                        {check.success
                            ? <CheckmarkCircle02Icon size={14} strokeWidth={2} className="shrink-0 mt-px" />
                            : <AlertCircleIcon size={14} strokeWidth={2} className="shrink-0 mt-px" />}
                        <span>
                            {check.message}
                            {check.success && check.elapsed !== undefined && (
                                <span className="opacity-70"> ({check.elapsed} ms)</span>
                            )}
                        </span>
                    </p>
                )}

                {check?.running && (
                    <p className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-neutral-400">
                        <Loading03Icon size={14} strokeWidth={2} className="animate-spin" />
                        {t('proxies.editor.opening')}
                    </p>
                )}

                {/* Everything past this line has a working default, and most
                    proxies never touch any of it. */}
                <div className="flex items-center gap-3 pt-2">
                    <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                        {t('proxies.editor.optional')}
                    </span>
                    <span className="h-px flex-1 bg-gray-200 dark:bg-surface-control" />
                </div>

                <div className="flex flex-col gap-2">
                    {/* Only worth offering once there is a second proxy to chain
                        through. On its own it would be a section whose picker has
                        one entry saying "no". */}
                    {chainOptions.length > 0 && (
                    <Disclosure
                        title={t('proxies.editor.reachedThrough')}
                        summary={summaries.chain}
                        defaultOpen={Boolean(formData.viaProxyId)}
                    >
                        <Field
                            hint={formData.viaProxyId
                                ? t('proxies.editor.viaHintWith')
                                : t('proxies.editor.viaHintWithout')}
                        >
                            <Select
                                value={formData.viaProxyId}
                                onChange={(next) => handleChange('viaProxyId', next)}
                                className={FIELD_CLASS}
                                options={[
                                    { value: '', label: t('proxies.editor.dialFromHere') },
                                    ...chainOptions.map(candidate => ({
                                        value: candidate.id,
                                        label: nameProxy(candidate),
                                    })),
                                ]}
                            />
                            {/* Only once there is something the picker did not
                                already say: one hop is what was just chosen, two
                                came from that hop's own record. */}
                            {route.length > 1 && (
                                <p className="text-[11px] text-gray-500 dark:text-neutral-500 font-mono">
                                    {['this machine', ...route, formData.name || formData.host || 'this proxy'].join(' → ')}
                                </p>
                            )}
                        </Field>
                    </Disclosure>
                    )}

                    <Disclosure
                        title={t('proxies.editor.advanced')}
                        summary={summaries.advanced}
                        defaultOpen={!formData.remoteDns}
                    >
                        <Checkbox
                            variant="card"
                            checked={formData.remoteDns}
                            onChange={(e) => handleChange('remoteDns', e.target.checked)}
                            label={t('proxies.editor.remoteDns')}
                            description={formData.type === 'socks4'
                                ? t('proxies.editor.remoteDnsSocks4')
                                : t('proxies.editor.remoteDnsDesc')}
                        />

                        <Field
                            label={t('proxies.editor.timeout')}
                            hint={t('proxies.editor.timeoutHint')}
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min={1}
                                    max={120}
                                    value={Math.round((formData.timeout || DEFAULT_TIMEOUT) / 1000)}
                                    onChange={(e) => handleChange(
                                        'timeout',
                                        (parseInt(e.target.value, 10) || 0) * 1000 || DEFAULT_TIMEOUT
                                    )}
                                    className={`${FIELD_CLASS} font-mono w-24`}
                                />
                                <span className="text-xs text-gray-500 dark:text-neutral-400">{t('proxies.editor.seconds')}</span>
                            </div>
                        </Field>
                    </Disclosure>
                </div>
            </form>
            )}
        </Sheet>
    );
}

export default memo(ProxyDialog);
