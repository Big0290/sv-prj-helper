import type { Snippet } from 'svelte';
export interface ChipProps {
    children?: Snippet;
    variant?: 'filled' | 'outlined' | 'soft';
    size?: 'sm' | 'base' | 'lg';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    removable?: boolean;
    disabled?: boolean;
    onRemove?: () => void;
    [key: string]: any;
}
export interface ChipEvents {
}
export interface ChipSlots {
    default: {};
}
//# sourceMappingURL=Chip.types.d.ts.map