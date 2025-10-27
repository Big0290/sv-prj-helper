import type { Snippet } from 'svelte';

export interface SelectProps {
value?: string;
		options: Array<{ value: string; label: string; disabled?: boolean
}

export interface SelectEvents {
  // Add component events here
}

export interface SelectSlots {
  default: {};
}