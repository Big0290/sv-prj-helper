export interface ContextMenuItem {
    id: string;
    label: string;
    icon?: string;
    shortcut?: string;
    disabled?: boolean;
    danger?: boolean;
    divider?: boolean;
    action?: () => void;
}
import type { Snippet } from 'svelte';
interface Props {
    children: Snippet;
    items: ContextMenuItem[];
    onItemClick?: (item: ContextMenuItem) => void;
}
declare const ContextMenu: import("svelte").Component<Props, {}, "">;
type ContextMenu = ReturnType<typeof ContextMenu>;
export default ContextMenu;
//# sourceMappingURL=ContextMenu.svelte.d.ts.map