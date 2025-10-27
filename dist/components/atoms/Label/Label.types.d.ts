import type { Snippet } from 'svelte';
export interface LabelProps {
    children?: Snippet;
    for?: string;
    required?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'base' | 'lg';
    [key: string]: any;
}
export interface LabelEvents {
}
export interface LabelSlots {
    default: {};
}
//# sourceMappingURL=Label.types.d.ts.map