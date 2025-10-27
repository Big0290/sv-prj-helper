import type { Snippet } from 'svelte';

export interface SelectProps {
	value?: string;
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	disabled?: boolean;
	required?: boolean;
	error?: string;
	label?: string;
	helperText?: string;
	id?: string;
	name?: string;
	placeholder?: string;
	onchange?: (e: Event) => void;
}

export interface SelectEvents {
  // Add component events here
}

export interface SelectSlots {
  default: {};
}