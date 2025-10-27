import type { Snippet } from 'svelte';
export interface ScrollAreaProps {
    children?: Snippet;
    height?: string;
    maxHeight?: string;
    type?: 'auto' | 'always' | 'scroll' | 'hover';
    [key: string]: any;
}
export interface ScrollAreaEvents {
}
export interface ScrollAreaSlots {
    default: {};
}
//# sourceMappingURL=ScrollArea.types.d.ts.map