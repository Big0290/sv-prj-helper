import type { Snippet } from 'svelte';
export interface ContextMenuProps {
    children: Snippet;
    items: ContextMenuItem[];
    onItemClick?: (item: ContextMenuItem) => void;
}
export interface ContextMenuEvents {
}
export interface ContextMenuSlots {
    default: {};
}
//# sourceMappingURL=ContextMenu.types.d.ts.map