import type { Snippet } from 'svelte';
export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    ariaLabel?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
}
export interface ButtonEvents {
}
export interface ButtonSlots {
    default: {};
}
//# sourceMappingURL=Button.types.d.ts.map