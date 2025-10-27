import type { Snippet } from 'svelte';

export interface InfiniteScrollProps {
children: Snippet;
		hasMore?: boolean;
		onLoadMore?: () => void;
		threshold?: number;
}

export interface InfiniteScrollEvents {
  // Add component events here
}

export interface InfiniteScrollSlots {
  default: {};
}