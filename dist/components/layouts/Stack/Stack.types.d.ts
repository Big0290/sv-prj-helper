import type { Snippet } from 'svelte';
export interface StackProps {
    direction?: 'row' | 'column';
    gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    wrap?: boolean;
    children: Snippet;
}
export interface StackEvents {
}
export interface StackSlots {
    default: {};
}
//# sourceMappingURL=Stack.types.d.ts.map