import type { Snippet } from 'svelte';

export interface TableToolbarProps {
title?: string;
		searchPlaceholder?: string;
		searchValue?: string;
		onSearch?: (value: string) => void;
		actions?: Action[];
		showSearch?: boolean;
}

export interface TableToolbarEvents {
  // Add component events here
}

export interface TableToolbarSlots {
  default: {};
}