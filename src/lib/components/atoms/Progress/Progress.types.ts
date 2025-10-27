import type { Snippet } from 'svelte';

export interface ProgressProps {
value: number;
		max?: number;
		variant?: 'default' | 'success' | 'warning' | 'error';
		label?: string;
}

export interface ProgressEvents {
  // Add component events here
}

export interface ProgressSlots {
  default: {};
}