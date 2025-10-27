export interface SnackbarProps {
    message: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    duration?: number;
    isOpen?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onClose?: () => void;
}
export interface SnackbarEvents {
}
export interface SnackbarSlots {
    default: {};
}
//# sourceMappingURL=Snackbar.types.d.ts.map