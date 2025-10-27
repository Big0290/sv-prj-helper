import type { Snippet } from 'svelte';

export interface DividerProps {
orientation?: 'horizontal' | 'vertical';
		spacing?: '2' | '4' | '6' | '8';
}

export interface DividerEvents {
  // Add component events here
}

export interface DividerSlots {
  default: {};
}