import type { Snippet } from 'svelte';

export interface ToastProps {
message: string;
		variant?: 'success' | 'error' | 'warning' | 'info';
		duration?: number;
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
		onClose?: () => void;
		showClose?: boolean;
}

export interface ToastEvents {
  // Add component events here
}

export interface ToastSlots {
  default: {};
}