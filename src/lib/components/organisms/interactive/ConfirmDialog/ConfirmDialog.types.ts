import type { Snippet } from 'svelte';

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
  // Add component events here
}

export interface ConfirmDialogSlots {
  default: {};
}