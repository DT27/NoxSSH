import { Alert02Icon } from 'hugeicons-react';
import Dialog, { DialogButton } from './Dialog';
import { useT } from '../../i18n';

/** Blocking confirmation for destructive work, so deletes never run unprompted. */
export default function ConfirmDialog({
    title,
    message,
    details,
    confirmLabel,
    variant = 'danger',
    onConfirm,
    onCancel,
}) {
    const t = useT();

    return (
        <Dialog
            title={title}
            subtitle={message}
            onClose={onCancel}
            icon={
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    variant === 'danger'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
                        : 'bg-amber-50 dark:bg-amber-900/20 text-amber-500'
                }`}>
                    <Alert02Icon size={20} strokeWidth={2} />
                </span>
            }
            footer={
                <>
                    <DialogButton onClick={onCancel}>{t('common.cancel')}</DialogButton>
                    <DialogButton variant={variant} onClick={onConfirm} data-autofocus>
                        {confirmLabel === undefined ? t('common.confirm') : confirmLabel}
                    </DialogButton>
                </>
            }
        >
            {details?.length > 0 && (
                <ul className="max-h-40 overflow-y-auto rounded-xl border border-gray-200 dark:border-surface-control bg-gray-50 dark:bg-surface-base/60 p-3 flex flex-col gap-1">
                    {details.slice(0, 50).map((item) => (
                        <li key={item} className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate">
                            {item}
                        </li>
                    ))}
                    {details.length > 50 && (
                        <li className="text-xs text-gray-400 dark:text-neutral-500">
                            {t('common.andMore', { count: details.length - 50 })}
                        </li>
                    )}
                </ul>
            )}
        </Dialog>
    );
}
