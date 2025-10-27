import type { Snippet } from 'svelte';

export interface BarcodeModalProps {
isOpen?: boolean;
		onClose?: () => void;
		onScan?: (code: string, format: string) => void;
		title?: string;
		beepOnScan?: boolean;
}

export interface BarcodeModalEvents {
  // Add component events here
}

export interface BarcodeModalSlots {
  default: {};
}