import type { Snippet } from 'svelte';

export interface ColorPickerProps {
value?: string;
		label?: string;
		onChange?: (color: string) => void;
}

export interface ColorPickerEvents {
  // Add component events here
}

export interface ColorPickerSlots {
  default: {};
}