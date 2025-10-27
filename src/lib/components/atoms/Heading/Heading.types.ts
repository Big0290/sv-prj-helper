import type { Snippet } from 'svelte';

export interface HeadingProps {
children?: Snippet;
		as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		size?: '1' | '2' | '3' | '4' | '5' | '6';
		weight?: 'normal' | 'medium' | 'semibold' | 'bold';
		align?: 'left' | 'center' | 'right';
		color?: string;
		[key: string]: any;
}

export interface HeadingEvents {
  // Add component events here
}

export interface HeadingSlots {
  default: {};
}