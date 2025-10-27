import type { Snippet } from 'svelte';

export interface CheckboxProps {
checked?: boolean;
		disabled?: boolean;
		label?: string;
		id?: string;
		name?: string;
		value?: string;
		indeterminate?: boolean;
		onchange?: (e: Event) => void;
}

export interface CheckboxEvents {
  // Add component events here
}

export interface CheckboxSlots {
  default: {};
}