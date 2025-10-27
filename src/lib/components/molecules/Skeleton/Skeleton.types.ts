import type { Snippet } from 'svelte';

export interface SkeletonProps {
variant?: 'text' | 'circular' | 'rectangular';
		width?: string;
		height?: string;
		count?: number;
		className?: string;
}

export interface SkeletonEvents {
  // Add component events here
}

export interface SkeletonSlots {
  default: {};
}