import { useCallback, useEffect, useRef } from 'react';
import { Copy01Icon, FlashIcon } from 'hugeicons-react';
import Tooltip from '../ui/Tooltip';

/**
 * Floating toolbar that appears when text is selected in the terminal.
 * Provides quick actions: copy and add to snippets.
 */
export default function SelectionToolbar({
    selectedText,
    position,
    onCopy,
    onAddSnippet,
    onClose
}) {
    const toolbarRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handlePointerDown = (event) => {
            if (toolbarRef.current?.contains(event.target)) return;
            // Don't close if clicking on a dialog
            if (event.target.closest('[role="dialog"]')) return;
            onClose();
        };

        document.addEventListener('mousedown', handlePointerDown, true);
        return () => document.removeEventListener('mousedown', handlePointerDown, true);
    }, [onClose]);

    const handleCopy = useCallback(() => {
        onCopy();
        onClose();
    }, [onCopy, onClose]);

    const handleAddSnippet = useCallback(() => {
        onAddSnippet();
        onClose();
    }, [onAddSnippet, onClose]);

    if (!selectedText || !position) return null;

    return (
        <div
            ref={toolbarRef}
            style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translateY(-50%)',
                zIndex: 40,
            }}
            className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white/95 dark:bg-surface-raised/95 backdrop-blur
                border border-gray-200 dark:border-surface-control shadow-lg"
            role="toolbar"
            aria-label="Selection actions"
        >
            <Tooltip label="复制">
                <button
                    type="button"
                    onClick={handleCopy}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-gray-600 dark:text-gray-300
                        hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-surface-control
                        transition-colors"
                >
                    <Copy01Icon size={14} strokeWidth={2.5} />
                </button>
            </Tooltip>

            <Tooltip label="添加到代码片段">
                <button
                    type="button"
                    onClick={handleAddSnippet}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-gray-600 dark:text-gray-300
                        hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-surface-control
                        transition-colors"
                >
                    <FlashIcon size={14} strokeWidth={2.5} />
                </button>
            </Tooltip>
        </div>
    );
}

