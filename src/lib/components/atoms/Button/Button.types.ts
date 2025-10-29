import type { Snippet } from 'svelte';

export interface ButtonProps {
variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'submit' | 'reset';
		href?: string;
		target?: '_blank' | '_self' | '_parent' | '_top';
		rel?: string;
		ariaLabel?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
}

export interface ButtonEvents {
  // Add component events here
}

export interface ButtonSlots {
  default: {};
}