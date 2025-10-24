interface Props {
    message: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    duration?: number;
    isOpen?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onClose?: () => void;
}
declare const Snackbar: import("svelte").Component<Props, {}, "isOpen">;
type Snackbar = ReturnType<typeof Snackbar>;
export default Snackbar;
