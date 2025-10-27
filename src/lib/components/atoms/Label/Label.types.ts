import type { Snippet } from 'svelte';

export interface LabelProps {
children?: Snippet;
		for?: string;
		required?: boolean;
		disabled?: boolean;
		size?: 'sm' | 'base' | 'lg';
		[key: string]: any;
}

export interface LabelEvents {
  // Add component events here
}

export interface LabelSlots {
  default: {};
}