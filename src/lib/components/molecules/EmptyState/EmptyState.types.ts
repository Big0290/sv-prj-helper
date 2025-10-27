import type { Snippet } from 'svelte';

export interface EmptyStateProps {
icon?: Snippet;
		title?: string;
		description?: string;
		action?: Snippet;
		compact?: boolean;
}

export interface EmptyStateEvents {
  // Add component events here
}

export interface EmptyStateSlots {
  default: {};
}