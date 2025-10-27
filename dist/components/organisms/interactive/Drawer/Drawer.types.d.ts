import type { Snippet } from 'svelte';
export interface DrawerProps {
    children: Snippet;
    isOpen?: boolean;
    onClose?: () => void;
    position?: 'left' | 'right' | 'top' | 'bottom';
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
}
export interface DrawerEvents {
}
export interface DrawerSlots {
    default: {};
}
//# sourceMappingURL=Drawer.types.d.ts.map