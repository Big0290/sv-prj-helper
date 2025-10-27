import type { Snippet } from 'svelte';

export interface CodeProps {
children?: Snippet;
		inline?: boolean;
		language?: string;
		[key: string]: any;
}

export interface CodeEvents {
  // Add component events here
}

export interface CodeSlots {
  default: {};
}