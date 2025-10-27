import type { Snippet } from 'svelte';
export interface CardProps {
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onclick?: (e: MouseEvent) => void;
    ariaLabel?: string;
    class?: string;
    children: Snippet;
}
export interface CardEvents {
}
export interface CardSlots {
    default: {};
}
//# sourceMappingURL=Card.types.d.ts.map