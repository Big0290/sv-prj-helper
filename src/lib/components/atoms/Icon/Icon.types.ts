import type { Snippet } from 'svelte';

export interface IconProps {
children?: Snippet;
		name?: string;
		size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
		color?: string;
		spin?: boolean;
		[key: string]: any;
}

export interface IconEvents {
  // Add component events here
}

export interface IconSlots {
  default: {};
}