import type { Snippet } from 'svelte';

export interface BarcodeButtonProps {
variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		label?: string;
		modalTitle?: string;
		onScan?: (code: string, format: string) => void;
}

export interface BarcodeButtonEvents {
  // Add component events here
}

export interface BarcodeButtonSlots {
  default: {};
}