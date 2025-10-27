import type { Snippet } from 'svelte';

export interface ButtonGroupProps {
children: Snippet;
		orientation?: 'horizontal' | 'vertical';
		size?: 'sm' | 'md' | 'lg';
		className?: string;
}

export interface ButtonGroupEvents {
  // Add component events here
}

export interface ButtonGroupSlots {
  default: {};
}