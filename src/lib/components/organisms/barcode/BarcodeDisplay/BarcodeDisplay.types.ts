import type { Snippet } from 'svelte';

export interface BarcodeDisplayProps {
value: string;
		type?: 'qrcode' | 'code128' | 'code39' | 'ean13' | 'upca';
		size?: number;
		errorCorrection?: 'L' | 'M' | 'Q' | 'H';
		showText?: boolean;
		backgroundColor?: string;
		foregroundColor?: string;
		className?: string;
}

export interface BarcodeDisplayEvents {
  // Add component events here
}

export interface BarcodeDisplaySlots {
  default: {};
}