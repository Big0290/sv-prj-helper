import type { Snippet } from 'svelte';
export interface FlexProps {
    children?: Snippet;
    as?: keyof HTMLElementTagNameMap;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: string | number;
    inline?: boolean;
    [key: string]: any;
}
export interface FlexEvents {
}
export interface FlexSlots {
    default: {};
}
//# sourceMappingURL=Flex.types.d.ts.map