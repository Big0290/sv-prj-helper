import { getContext, setContext } from 'svelte';
const TOAST_CONTEXT_KEY = 'toasts';
export function createToastContext() {
    let toasts = $state([]);
    const context = {
        get toasts() {
            return toasts;
        },
        show: (toast) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast = { id, ...toast };
            toasts = [...toasts, newToast];
            if (toast.duration !== 0) {
                setTimeout(() => {
                    context.dismiss(id);
                }, toast.duration || 3000);
            }
        },
        dismiss: (id) => {
            toasts = toasts.filter(t => t.id !== id);
        },
        clear: () => {
            toasts = [];
        }
    };
    setContext(TOAST_CONTEXT_KEY, context);
    return context;
}
export function useToast() {
    const context = getContext(TOAST_CONTEXT_KEY);
    if (!context) {
        throw new Error('useToast must be used within a component that has called createToastContext');
    }
    return context;
}
