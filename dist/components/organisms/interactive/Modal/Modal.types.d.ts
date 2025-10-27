import type { Snippet } from 'svelte';
export interface ModalProps {
    open?: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    onclose?: () => void;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    children: Snippet;
}
export interface ModalEvents {
}
export interface ModalSlots {
    default: {};
}
//# sourceMappingURL=Modal.types.d.ts.map