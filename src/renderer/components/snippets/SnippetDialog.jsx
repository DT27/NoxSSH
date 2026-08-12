import { useCallback, useMemo, useState } from 'react';
import { useT } from '../../i18n';
import Sheet from '../ui/Sheet';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import SegmentedControl from '../ui/SegmentedControl';
import Field, { FIELD_CLASS, MONO_FIELD_CLASS } from '../ui/Field';
import PackageSteps from './PackageSteps';
import {
    emptySnippet,
    validateSnippet,
    placeholdersIn,
    composeSnippet,
    isPackage,
} from '../../lib/snippets';

/**
 * Add or edit one snippet. Purely a form: it hands a record back and lets the
 * caller decide what saving means.
 *
 * A record is either a single command or a package of steps. Switching between
 * the two keeps both forms' work, so changing your mind halfway does not throw
 * away what you already typed; only the one matching the chosen kind is
 * validated, and only it decides what gets sent.
 */
export default function SnippetDialog({ snippet, hosts = [], library = [], dismiss, onSave, onClose }) {
    const t = useT();
    const [form, setForm] = useState(() => ({ ...emptySnippet(), ...(snippet || {}) }));
    const [tagText, setTagText] = useState(() => (snippet?.tags || []).join(', '));
    const [touched, setTouched] = useState(false);

    const set = useCallback((field, value) => {
        setForm(previous => ({ ...previous, [field]: value }));
    }, []);

    const error = useMemo(() => validateSnippet(form), [form]);

    // Placeholders come from the composed text, so a package asks once for a
    // value several of its steps share.
    const composed = useMemo(() => composeSnippet(form, library), [form, library]);
    const placeholders = useMemo(() => placeholdersIn(composed.text), [composed.text]);

    const asPackage = isPackage(form);
    const scoped = form.hostIds.length > 0;

    const toggleHost = useCallback((hostId) => {
        setForm(previous => ({
            ...previous,
            hostIds: previous.hostIds.includes(hostId)
                ? previous.hostIds.filter(id => id !== hostId)
                : [...previous.hostIds, hostId],
        }));
    }, []);

    const submit = useCallback(() => {
        setTouched(true);
        if (validateSnippet(form)) return;

        onSave({
            ...form,
            name: form.name.trim(),
            tags: tagText.split(',').map(tag => tag.trim()).filter(Boolean),
        });
    }, [form, tagText, onSave]);

    return (
        <Sheet
            title={snippet?.id
                ? (asPackage ? t('snippets.editor.titleEditPackage') : t('snippets.editor.titleEdit'))
                : (asPackage ? t('snippets.editor.titleNewPackage') : t('snippets.editor.titleNew'))}
            subtitle={asPackage
                ? t('snippets.editor.subtitlePackage')
                : t('snippets.editor.subtitle')}
            dismiss={dismiss}
            onClose={onClose}
            footer={
                <>
                    <Button onClick={onClose}>{t('common.cancel')}</Button>
                    <Button variant="primary" onClick={submit} disabled={Boolean(error)}>
                        {snippet?.id ? t('common.save') : (asPackage ? t('snippets.editor.addPackage') : t('snippets.editor.add'))}
                    </Button>
                </>
            }
        >
            <div className="flex flex-col gap-5">
                {/* Not wrapped in Field: it renders a <label>, and a <button> is
                    labelable, so clicking the caption would fire the first
                    segment rather than doing nothing. */}
                <div className="flex flex-col gap-1.5 min-w-0">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('snippets.editor.kind')}</span>
                    <SegmentedControl
                        ariaLabel={t('snippets.editor.kind')}
                        value={form.kind}
                        onChange={(value) => set('kind', value)}
                        segments={[
                            { value: 'command', label: t('snippets.editor.kindCommand') },
                            { value: 'package', label: t('snippets.editor.kindPackage') },
                        ]}
                        className="w-full"
                    />
                    <span className="text-[11px] text-gray-500 dark:text-neutral-500">
                        {asPackage
                            ? t('snippets.editor.kindPackageHint')
                            : t('snippets.editor.kindCommandHint')}
                    </span>
                </div>

                <Field label={t('snippets.editor.name')}>
                    <input
                        data-autofocus
                        value={form.name}
                        onChange={(event) => set('name', event.target.value)}
                        placeholder={asPackage ? t('snippets.editor.namePlaceholderPackage') : t('snippets.editor.namePlaceholder')}
                        className={FIELD_CLASS}
                    />
                </Field>

                {asPackage ? (
                    <PackageSteps form={form} library={library} onChange={set} />
                ) : (
                    <Field
                        label={t('snippets.editor.command')}
                        hint={t('snippets.editor.commandHint')}
                    >
                        <textarea
                            value={form.command}
                            onChange={(event) => set('command', event.target.value)}
                            rows={5}
                            spellCheck={false}
                            placeholder="tail -f /var/log/nginx/error.log"
                            className={`${MONO_FIELD_CLASS} resize-y`}
                        />
                    </Field>
                )}

                {placeholders.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap -mt-2">
                        <span className="text-[11px] text-gray-500 dark:text-neutral-500">
                            {t('snippets.editor.willAskFor')}
                        </span>
                        {placeholders.map(name => (
                            <span
                                key={name}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-gray-200 dark:border-surface-control text-gray-600 dark:text-gray-400"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                )}

                <Field label={t('snippets.editor.description')} hint={t('snippets.editor.descriptionHint')}>
                    <input
                        value={form.description}
                        onChange={(event) => set('description', event.target.value)}
                        placeholder={t('snippets.editor.descriptionPlaceholder')}
                        className={FIELD_CLASS}
                    />
                </Field>

                <Field label={t('snippets.editor.tags')} hint={t('snippets.editor.tagsHint')}>
                    <input
                        value={tagText}
                        onChange={(event) => setTagText(event.target.value)}
                        placeholder="nginx, logs"
                        spellCheck={false}
                        className={FIELD_CLASS}
                    />
                </Field>

                {/* Scope */}
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {t('snippets.editor.availableOn')}
                    </span>

                    <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 dark:bg-surface-base rounded-xl">
                        <button
                            type="button"
                            onClick={() => set('hostIds', [])}
                            className={`px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                !scoped
                                    ? 'bg-white dark:bg-surface-active text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            {t('snippets.editor.allHosts')}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (!scoped && hosts[0]) set('hostIds', [hosts[0].id]);
                            }}
                            disabled={hosts.length === 0}
                            className={`px-2 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40 ${
                                scoped
                                    ? 'bg-white dark:bg-surface-active text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            {t('snippets.editor.specificHosts')}
                        </button>
                    </div>

                    {scoped && (
                        <div className="max-h-56 overflow-y-auto rounded-xl border border-gray-200 dark:border-surface-control divide-y divide-gray-100 dark:divide-surface-control">
                            {hosts.map(host => (
                                <Checkbox
                                    key={host.id}
                                    size="sm"
                                    checked={form.hostIds.includes(host.id)}
                                    onChange={() => toggleHost(host.id)}
                                    label={host.name}
                                    description={`${host.username}@${host.host}`}
                                    className="w-full px-3 py-2 hover:bg-gray-50 dark:hover:bg-surface-base transition-colors"
                                />
                            ))}
                        </div>
                    )}

                    {scoped && form.hostIds.length === 0 && (
                        <p className="text-xs text-amber-600 dark:text-amber-500">
                            {t('snippets.editor.noHostWarning')}
                        </p>
                    )}
                </div>

                <Checkbox
                    variant="card"
                    checked={form.runImmediately}
                    onChange={(event) => set('runImmediately', event.target.checked)}
                    label={t('snippets.editor.runImmediately')}
                    description={asPackage
                        ? t('snippets.editor.runImmediatelyPackage')
                        : t('snippets.editor.runImmediatelyCommand')}
                />

                {touched && error && (
                    <p className="text-xs text-red-500 font-medium">{error}</p>
                )}
            </div>
        </Sheet>
    );
}
