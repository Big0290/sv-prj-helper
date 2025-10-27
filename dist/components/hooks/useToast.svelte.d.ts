export interface Toast {
    id: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}
export interface ToastContext {
    toasts: Toast[];
    show: (toast: Omit<Toast, 'id'>) => void;
    dismiss: (id: string) => void;
    clear: () => void;
}
export declare function createToastContext(): ToastContext;
export declare function useToast(): ToastContext;
//# sourceMappingURL=useToast.svelte.d.ts.map