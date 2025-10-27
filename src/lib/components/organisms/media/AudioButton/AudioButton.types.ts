import type { Snippet } from 'svelte';

export interface AudioButtonProps {
src: string;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
		showDuration?: boolean;
		variant?: 'default' | 'minimal';
}

export interface AudioButtonEvents {
  // Add component events here
}

export interface AudioButtonSlots {
  default: {};
}