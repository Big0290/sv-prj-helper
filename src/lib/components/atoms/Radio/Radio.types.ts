import type { Snippet } from 'svelte';

export interface RadioProps {
group?: string;
		disabled?: boolean;
		label?: string;
		id?: string;
		name?: string;
		value: string;
		onchange?: (e: Event) => void;
}

export interface RadioEvents {
  // Add component events here
}

export interface RadioSlots {
  default: {};
}