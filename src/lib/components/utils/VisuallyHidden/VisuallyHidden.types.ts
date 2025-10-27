import type { Snippet } from 'svelte';

export interface VisuallyHiddenProps {
children?: Snippet;
		as?: keyof HTMLElementTagNameMap;
		[key: string]: any;
}

export interface VisuallyHiddenEvents {
  // Add component events here
}

export interface VisuallyHiddenSlots {
  default: {};
}