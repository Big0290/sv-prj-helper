import type { Snippet } from 'svelte';

export interface TextProps {
children?: Snippet;
		as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small';
		size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
		weight?: 'normal' | 'medium' | 'semibold' | 'bold';
		align?: 'left' | 'center' | 'right' | 'justify';
		color?: string;
		truncate?: boolean;
		lineClamp?: number;
		[key: string]: any;
}

export interface TextEvents {
  // Add component events here
}

export interface TextSlots {
  default: {};
}