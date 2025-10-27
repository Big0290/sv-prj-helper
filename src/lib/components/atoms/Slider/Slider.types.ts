import type { Snippet } from 'svelte';

export interface SliderProps {
value?: number;
		min?: number;
		max?: number;
		step?: number;
		label?: string;
		disabled?: boolean;
		showValue?: boolean;
		onchange?: (e: Event) => void;
}

export interface SliderEvents {
  // Add component events here
}

export interface SliderSlots {
  default: {};
}