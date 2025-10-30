import { getContext, setContext } from 'svelte';

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

const TOAST_CONTEXT_KEY = 'toasts';

export function createToastContext() {
	let toasts = $state<Toast[]>([]);

	const context: ToastContext = {
		get toasts() {
			return toasts;
		},
		show: (toast: Omit<Toast, 'id'>) => {
			const id = Math.random().toString(36).substring(2, 9);
			const newToast: Toast = { id, ...toast };
			toasts = [...toasts, newToast];

			if (toast.duration !== 0) {
				setTimeout(() => {
					context.dismiss(id);
				}, toast.duration || 3000);
			}
		},
		dismiss: (id: string) => {
			toasts = toasts.filter(t => t.id !== id);
		},
		clear: () => {
			toasts = [];
		}
	};

	setContext(TOAST_CONTEXT_KEY, context);
	
	return context;
}

export function useToast(): ToastContext {
	const context = getContext<ToastContext>(TOAST_CONTEXT_KEY);
	
	if (!context) {
		throw new Error('useToast must be used within a component that has called createToastContext');
	}
	
	return context;
}
