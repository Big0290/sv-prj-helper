import type { Snippet } from 'svelte';

export interface GridProps {
cols?: '1' | '2' | '3' | '4' | '6' | '12';
		gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
		children: Snippet;
}

export interface GridEvents {
  // Add component events here
}

export interface GridSlots {
  default: {};
}