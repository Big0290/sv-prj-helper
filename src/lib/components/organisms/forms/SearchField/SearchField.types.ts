import type { Snippet } from 'svelte';

export interface SearchFieldProps {
value?: string;
		placeholder?: string;
		suggestions?: string[];
		onSearch?: (value: string) => void;
		onSelect?: (value: string) => void;
		loading?: boolean;
}

export interface SearchFieldEvents {
  // Add component events here
}

export interface SearchFieldSlots {
  default: {};
}