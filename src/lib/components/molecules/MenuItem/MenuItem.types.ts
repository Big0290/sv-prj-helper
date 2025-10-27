import type { Snippet } from 'svelte';

export interface MenuItemProps {
children?: Snippet;
		icon?: Snippet;
		disabled?: boolean;
		danger?: boolean;
		onclick?: () => void;
		[key: string]: any;
}

export interface MenuItemEvents {
  // Add component events here
}

export interface MenuItemSlots {
  default: {};
}