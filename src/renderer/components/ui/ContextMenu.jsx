import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEnterOn } from '../../hooks/useEnter';

/**
 * Right-click menu. Items are `{ label, icon, onClick, danger, disabled,
 * submenu }`, `{ type: 'separator' }`, `{ type: 'heading', label }`, or
 * `{ type: 'custom', key, render(close) }`.
 *
 * An item with a `submenu` array renders a nested menu that opens on hover to
 * the right of the parent row (or to the left when there is not enough room).
 * Submenu items share the same shape, so nesting is supported recursively.
 *
 * The top-level position is clamped to the viewport so a menu opened near an
 * edge still shows all of its items.
 */
export default function ContextMenu({ x, y, items, onClose }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ left: x, top: y, ready: false });

    useLayoutEffect(() => {
        const menu = ref.current;
        if (!menu) return;

        const { width, height } = menu.getBoundingClientRect();
        const margin = 8;

        setPosition({
            left: Math.max(margin, Math.min(x, window.innerWidth - width - margin)),
            top: Math.max(margin, Math.min(y, window.innerHeight - height - margin)),
            ready: true,
        });
    }, [x, y, items.length]);

    useEffect(() => {
        const dismiss = () => onClose();
        const handleKey = (event) => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                onClose();
            }
        };

        // `mousedown` rather than `click`, so the menu is gone before whatever
        // is underneath it reacts to the press.
        document.addEventListener('mousedown', dismiss);
        document.addEventListener('keydown', handleKey, true);
        window.addEventListener('blur', dismiss);
        window.addEventListener('resize', dismiss);

        return () => {
            document.removeEventListener('mousedown', dismiss);
            document.removeEventListener('keydown', handleKey, true);
            window.removeEventListener('blur', dismiss);
            window.removeEventListener('resize', dismiss);
        };
    }, [onClose]);

    // Comes down from where it was asked for. See lib/enterMotion.
    useEnterOn(ref, 'menu');

    const visible = items.filter(Boolean);

    return createPortal(
        <div
            ref={ref}
            className="fixed z-[300] min-w-[190px] p-1 rounded-xl bg-white dark:bg-surface-raised border border-gray-200 dark:border-surface-control shadow-2xl"
            style={{ left: position.left, top: position.top, visibility: position.ready ? 'visible' : 'hidden' }}
            onMouseDown={(event) => event.stopPropagation()}
            onContextMenu={(event) => event.preventDefault()}
            role="menu"
        >
            <MenuItems items={visible} onClose={onClose} />
        </div>,
        document.body
    );
}

/**
 * Render a list of menu items. When an item has a `submenu`, hovering it opens
 * a nested panel positioned next to the row. `depth` controls z-index layering
 * so nested menus sit above their parents.
 */
function MenuItems({ items, onClose, depth = 0 }) {
    const [openIndex, setOpenIndex] = useState(null);
    const rowRefs = useRef([]);

    // Close the open submenu when the cursor leaves the list (e.g. moving back
    // into the parent menu or out into empty space).
    const leaveTimer = useRef(null);
    const scheduleClose = () => {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = setTimeout(() => setOpenIndex(null), 120);
    };
    const cancelClose = () => clearTimeout(leaveTimer.current);

    useEffect(() => () => clearTimeout(leaveTimer.current), []);

    return (
        <div onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
            {items.map((item, index) => {
                if (item.type === 'separator') {
                    return <div key={`sep-${index}`} className="-mx-1 my-1 border-t border-gray-100 dark:border-surface-control" />;
                }
                if (item.type === 'heading') {
                    return (
                        <div
                            key={`head-${index}`}
                            className="px-2.5 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider
                                text-gray-400 dark:text-neutral-500"
                        >
                            {item.label}
                        </div>
                    );
                }
                if (item.type === 'custom') {
                    return (
                        <div key={item.key || `custom-${index}`} className="px-1 py-1.5">
                            {item.render(onClose)}
                        </div>
                    );
                }

                const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
                const isOpen = openIndex === index;

                return (
                    <div
                        key={item.label || index}
                        ref={(el) => { rowRefs.current[index] = el; }}
                        onMouseEnter={() => { cancelClose(); setOpenIndex(index); }}
                    >
                        <button
                            role="menuitem"
                            disabled={item.disabled}
                            onClick={() => {
                                if (hasSubmenu) return; // submenu items are chosen in the nested panel
                                onClose();
                                item.onClick();
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                                item.danger
                                    ? 'text-red-600 dark:text-red-400 enabled:hover:bg-red-50 dark:enabled:hover:bg-red-900/20'
                                    : 'text-gray-700 dark:text-gray-300 enabled:hover:bg-gray-100 dark:enabled:hover:bg-surface-control'
                            }`}
                        >
                            <span className="shrink-0 w-4 flex items-center justify-center">{item.icon}</span>
                            <span className="flex-1 font-medium">{item.label}</span>
                            {item.shortcut && (
                                <span className="text-[10px] text-gray-400 dark:text-neutral-500 ml-3">
                                    {item.shortcut}
                                </span>
                            )}
                            {hasSubmenu && (
                                <span className="text-[10px] text-gray-400 dark:text-neutral-500 ml-2">›</span>
                            )}
                        </button>
                        {hasSubmenu && isOpen && (
                            <Submenu
                                anchorRef={() => rowRefs.current[index]}
                                items={item.submenu}
                                onClose={onClose}
                                depth={depth + 1}
                                onEnter={cancelClose}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/**
 * Nested menu panel anchored to a parent row. Positioned to the right of the
 * anchor by default; flips to the left when it would overflow the viewport.
 */
function Submenu({ anchorRef, items, onClose, depth, onEnter }) {
    const panelRef = useRef(null);
    const [pos, setPos] = useState({ left: 0, top: 0, ready: false });

    useLayoutEffect(() => {
        const anchor = anchorRef();
        const panel = panelRef.current;
        if (!anchor || !panel) return;

        const anchorRect = anchor.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        const gap = 2;
        const margin = 8;

        // Prefer opening to the right; fall back to the left when it overflows.
        const rightFit = anchorRect.right + gap + panelRect.width + margin <= window.innerWidth;
        const left = rightFit
            ? anchorRect.right + gap
            : Math.max(margin, anchorRect.left - gap - panelRect.width);

        // Align the top with the row, but keep the panel inside the viewport.
        const top = Math.max(
            margin,
            Math.min(anchorRect.top, window.innerHeight - panelRect.height - margin)
        );

        setPos({ left, top, ready: true });
    }, [anchorRef, items.length]);

    return createPortal(
        <div
            ref={panelRef}
            className="fixed min-w-[170px] p-1 rounded-xl bg-white dark:bg-surface-raised border border-gray-200 dark:border-surface-control shadow-2xl"
            style={{
                left: pos.left,
                top: pos.top,
                zIndex: 300 + depth,
                visibility: pos.ready ? 'visible' : 'hidden',
            }}
            onMouseDown={(event) => event.stopPropagation()}
            onMouseEnter={onEnter}
            onContextMenu={(event) => event.preventDefault()}
        >
            <MenuItems items={items.filter(Boolean)} onClose={onClose} depth={depth} />
        </div>,
        document.body
    );
}
