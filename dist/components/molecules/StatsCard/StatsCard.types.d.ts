import type { Snippet } from 'svelte';
export interface StatsCardProps {
    label: string;
    value: string | number;
    trend?: number;
    icon?: Snippet;
    variant?: 'default' | 'success' | 'warning' | 'danger';
    loading?: boolean;
}
export interface StatsCardEvents {
}
export interface StatsCardSlots {
    default: {};
}
//# sourceMappingURL=StatsCard.types.d.ts.map