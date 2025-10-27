import type { Snippet } from 'svelte';

export interface MenuProps {
trigger?: Snippet;
		children?: Snippet;
		open?: boolean;
		placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
		onOpenChange?: (open: boolean) => void;
		[key: string]: any;
}

export interface MenuEvents {
  // Add component events here
}

export interface MenuSlots {
  default: {};
}