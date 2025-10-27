import type { Snippet } from 'svelte';

export interface TableSkeletonProps {
rows?: number;
		columns?: number;
}

export interface TableSkeletonEvents {
  // Add component events here
}

export interface TableSkeletonSlots {
  default: {};
}