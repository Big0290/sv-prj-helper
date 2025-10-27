import type { Snippet } from 'svelte';
export interface MenuProps {
    trigger?: Snippet;
    children?: Snippet;
    open?: boolean;
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    onOpenChange?: (open: boolean) => void;
    [key: string]: any;
}
export interface MenuEvents {
}
export interface MenuSlots {
    default: {};
}
//# sourceMappingURL=Menu.types.d.ts.map