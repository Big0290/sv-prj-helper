import type { Snippet } from 'svelte';

export interface SwitchProps {
checked?: boolean;
		disabled?: boolean;
		label?: string;
		id?: string;
		name?: string;
		value?: string;
		onchange?: (e: Event) => void;
}

export interface SwitchEvents {
  // Add component events here
}

export interface SwitchSlots {
  default: {};
}