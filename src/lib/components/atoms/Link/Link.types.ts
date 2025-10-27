import type { Snippet } from 'svelte';

export interface LinkProps {
children?: Snippet;
		href: string;
		external?: boolean;
		underline?: 'none' | 'hover' | 'always';
		color?: string;
		size?: 'xs' | 'sm' | 'base' | 'lg';
		[key: string]: any;
}

export interface LinkEvents {
  // Add component events here
}

export interface LinkSlots {
  default: {};
}