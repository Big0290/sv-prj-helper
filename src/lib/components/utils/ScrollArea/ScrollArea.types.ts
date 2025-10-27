import type { Snippet } from 'svelte';

export interface ScrollAreaProps {
children?: Snippet;
		height?: string;
		maxHeight?: string;
		type?: 'auto' | 'always' | 'scroll' | 'hover';
		[key: string]: any;
}

export interface ScrollAreaEvents {
  // Add component events here
}

export interface ScrollAreaSlots {
  default: {};
}