interface Props {
    isOpen?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}
declare const ConfirmDialog: import("svelte").Component<Props, {}, "isOpen">;
type ConfirmDialog = ReturnType<typeof ConfirmDialog>;
export default ConfirmDialog;
