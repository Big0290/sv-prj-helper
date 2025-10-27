import type { Snippet } from 'svelte';

export interface MultiSelectProps {
options: SelectOption[];
		selected?: string[];
		placeholder?: string;
		label?: string;
		searchable?: boolean;
		max?: number;
		onSelect?: (values: string[]) => void;
}

export interface MultiSelectEvents {
  // Add component events here
}

export interface MultiSelectSlots {
  default: {};
}