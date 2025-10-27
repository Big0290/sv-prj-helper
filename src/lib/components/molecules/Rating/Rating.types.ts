import type { Snippet } from 'svelte';

export interface RatingProps {
value?: number;
		max?: number;
		readonly?: boolean;
		size?: 'sm' | 'md' | 'lg';
		showValue?: boolean;
		onChange?: (value: number) => void;
}

export interface RatingEvents {
  // Add component events here
}

export interface RatingSlots {
  default: {};
}