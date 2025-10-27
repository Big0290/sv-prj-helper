import type { Snippet } from 'svelte';

export interface BoxProps {
children?: Snippet;
		as?: keyof HTMLElementTagNameMap;
		padding?: string | number;
		margin?: string | number;
		bg?: string;
		border?: string;
		borderRadius?: string;
		width?: string;
		height?: string;
		display?: 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
		position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
		overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
		[key: string]: any;
}

export interface BoxEvents {
  // Add component events here
}

export interface BoxSlots {
  default: {};
}