import type { Snippet } from 'svelte';

export interface FocusTrapProps {
children?: Snippet;
		active?: boolean;
		initialFocus?: HTMLElement;
		returnFocus?: boolean;
		[key: string]: any;
}

export interface FocusTrapEvents {
  // Add component events here
}

export interface FocusTrapSlots {
  default: {};
}