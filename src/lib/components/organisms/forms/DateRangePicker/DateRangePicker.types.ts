import type { Snippet } from 'svelte';

export interface DateRangePickerProps {
start?: Date | null;
		end?: Date | null;
		label?: string;
		onRange?: (start: Date | null, end: Date | null) => void;
}

export interface DateRangePickerEvents {
  // Add component events here
}

export interface DateRangePickerSlots {
  default: {};
}