import type { Snippet } from 'svelte';

export interface BarcodeInputProps {
value?: string;
		placeholder?: string;
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		readonly?: boolean;
		error?: string;
		helperText?: string;
		onScan?: (code: string, format: string) => void;
		onChange?: (value: string) => void;
}

export interface BarcodeInputEvents {
  // Add component events here
}

export interface BarcodeInputSlots {
  default: {};
}