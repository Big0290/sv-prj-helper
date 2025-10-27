import type { Snippet } from 'svelte';

export interface VirtualListProps {
items: any[];
		itemHeight: number;
		height: number | string;
		item: Snippet<[any]>;
}

export interface VirtualListEvents {
  // Add component events here
}

export interface VirtualListSlots {
  default: {};
}