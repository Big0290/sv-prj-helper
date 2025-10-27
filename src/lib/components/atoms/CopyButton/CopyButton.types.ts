import type { Snippet } from 'svelte';

export interface CopyButtonProps {
value: string;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'default' | 'ghost' | 'icon';
		successDuration?: number;
}

export interface CopyButtonEvents {
  // Add component events here
}

export interface CopyButtonSlots {
  default: {};
}