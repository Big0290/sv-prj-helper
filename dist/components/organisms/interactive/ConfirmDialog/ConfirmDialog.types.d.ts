export interface ConfirmDialogProps {
    isOpen?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}
export interface ConfirmDialogEvents {
}
export interface ConfirmDialogSlots {
    default: {};
}
//# sourceMappingURL=ConfirmDialog.types.d.ts.map