import type { Snippet } from 'svelte';
export interface BadgeProps {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    children: Snippet;
}
export interface BadgeEvents {
}
export interface BadgeSlots {
    default: {};
}
//# sourceMappingURL=Badge.types.d.ts.map