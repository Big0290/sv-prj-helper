import type { Snippet } from 'svelte';
export interface AlertProps {
    variant?: 'info' | 'success' | 'warning' | 'error';
    dismissible?: boolean;
    onclose?: () => void;
    title?: string;
    children: Snippet;
}
export interface AlertEvents {
}
export interface AlertSlots {
    default: {};
}
//# sourceMappingURL=Alert.types.d.ts.map