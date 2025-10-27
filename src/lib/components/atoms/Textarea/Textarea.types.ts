import type { Snippet } from 'svelte';

export interface TextareaProps {
value?: string;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		error?: string;
		label?: string;
		helperText?: string;
		id?: string;
		name?: string;
		rows?: number;
		maxlength?: number;
		minlength?: number;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		onfocus?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
}

export interface TextareaEvents {
  // Add component events here
}

export interface TextareaSlots {
  default: {};
}