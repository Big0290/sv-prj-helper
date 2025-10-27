import type { Snippet } from 'svelte';

export interface LoadingOverlayProps {
isLoading?: boolean;
		message?: string;
		variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
		blur?: boolean;
		fullscreen?: boolean;
}

export interface LoadingOverlayEvents {
  // Add component events here
}

export interface LoadingOverlaySlots {
  default: {};
}