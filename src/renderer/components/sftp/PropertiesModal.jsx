import { InformationCircleIcon } from 'hugeicons-react';
import Dialog, { DialogButton } from '../ui/Dialog';
import { formatSize, formatDateTime, formatMode, formatOctal } from '../../lib/format';
import { localeTag, useT } from '../../i18n';

function Row({ label, children, mono }) {
    return (
        <div className="flex gap-4 py-2 border-b border-gray-100 dark:border-surface-control/70 last:border-0">
            <span className="w-32 shrink-0 text-sm text-gray-500 dark:text-gray-400">{label}</span>
            <span className={`text-sm text-gray-900 dark:text-white min-w-0 break-all ${mono ? 'font-mono' : ''}`}>
                {children}
            </span>
        </div>
    );
}

const kindOf = (entry) => {
    if (entry.isSymlink) {
        return entry.targetIsDirectory ? 'sftp.properties.kind.symlinkDirectory' : 'sftp.properties.kind.symlink';
    }
    if (entry.isDirectory) return 'sftp.properties.kind.directory';
    return 'sftp.properties.kind.file';
};

export default function PropertiesModal({ entry, path, onClose }) {
    const t = useT();

    return (
        <Dialog
            width="30rem"
            title={entry.name}
            subtitle={t(kindOf(entry))}
            onClose={onClose}
            icon={
                <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-surface-control text-gray-500 dark:text-gray-400">
                    <InformationCircleIcon size={20} strokeWidth={2} />
                </span>
            }
            footer={<DialogButton variant="primary" onClick={onClose} data-autofocus>{t('common.close')}</DialogButton>}
        >
            <div className="flex flex-col">
                <Row label={t('sftp.properties.path')} mono>{path}</Row>
                {!entry.isDirectory && (
                    <Row label={t('sftp.properties.size')}>
                        {formatSize(entry.size)} ({t('sftp.properties.byteCount', {
                            count: entry.size,
                            formatted: entry.size.toLocaleString(localeTag()),
                        })})
                    </Row>
                )}
                <Row label={t('sftp.properties.permissions')} mono>
                    {formatMode(entry.mode, entry)} · {formatOctal(entry.mode)}
                </Row>
                <Row label={t('sftp.properties.owner')}>
                    {entry.uid === null ? t('sftp.properties.unknown') : `uid ${entry.uid}`}
                    {entry.gid !== null && ` · gid ${entry.gid}`}
                </Row>
                <Row label={t('sftp.properties.modified')}>{formatDateTime(entry.modifyTime)}</Row>
                <Row label={t('sftp.properties.accessed')}>{formatDateTime(entry.accessTime)}</Row>
                {entry.isSymlink && (
                    <Row label={t('sftp.properties.linkTarget')} mono>
                        {entry.linkTarget || t('sftp.properties.unresolved')}
                        {entry.broken && ` (${t('sftp.properties.broken')})`}
                    </Row>
                )}
            </div>
        </Dialog>
    );
}
