import type { Snippet } from 'svelte';

export interface QuickScanProps {
onScan?: (code: string, format: string) => void;
		onError?: (error: string) => void;
		height?: string;
		width?: string;
		autoClose?: boolean;
}

export interface QuickScanEvents {
  // Add component events here
}

export interface QuickScanSlots {
  default: {};
}