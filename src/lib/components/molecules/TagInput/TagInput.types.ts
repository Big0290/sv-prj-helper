import type { Snippet } from 'svelte';

export interface TagInputProps {
tags?: string[];
		placeholder?: string;
		maxTags?: number;
		allowDuplicates?: boolean;
		onAdd?: (tag: string) => void;
		onRemove?: (tag: string) => void;
		disabled?: boolean;
}

export interface TagInputEvents {
  // Add component events here
}

export interface TagInputSlots {
  default: {};
}