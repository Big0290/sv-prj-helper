import type { Snippet } from 'svelte';

export interface DatePickerProps {
value?: Date | null;
		label?: string;
		placeholder?: string;
		min?: Date;
		max?: Date;
		onChange?: (date: Date | null) => void;
}

export interface DatePickerEvents {
  // Add component events here
}

export interface DatePickerSlots {
  default: {};
}