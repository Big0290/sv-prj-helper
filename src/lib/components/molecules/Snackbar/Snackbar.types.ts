import type { Snippet } from 'svelte';

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
  // Add component events here
}

export interface SnackbarSlots {
  default: {};
}