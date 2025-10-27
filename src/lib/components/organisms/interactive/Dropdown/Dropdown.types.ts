import type { Snippet } from 'svelte';

export interface DropdownProps {
open?: boolean;
		children: Snippet;
		trigger: Snippet;
}

export interface DropdownEvents {
  // Add component events here
}

export interface DropdownSlots {
  default: {};
}