import type { Snippet } from 'svelte';

export interface FABProps {
children?: Snippet;
		position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
		size?: 'sm' | 'md' | 'lg';
		icon?: Snippet;
		label?: string;
		onclick?: () => void;
		extended?: boolean;
}

export interface FABEvents {
  // Add component events here
}

export interface FABSlots {
  default: {};
}