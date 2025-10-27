import type { Snippet } from 'svelte';

export interface BarcodeScannerProps {
onScan?: (code: string, format: string) => void;
		onError?: (error: string) => void;
		width?: string;
		height?: string;
		continuousScan?: boolean;
		showSettings?: boolean;
}

export interface BarcodeScannerEvents {
  // Add component events here
}

export interface BarcodeScannerSlots {
  default: {};
}