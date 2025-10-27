import type { Snippet } from 'svelte';

export interface OTPInputProps {
length?: number;
		value?: string;
		onComplete?: (code: string) => void;
}

export interface OTPInputEvents {
  // Add component events here
}

export interface OTPInputSlots {
  default: {};
}