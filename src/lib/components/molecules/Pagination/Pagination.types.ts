import type { Snippet } from 'svelte';

export interface PaginationProps {
currentPage: number;
		totalPages: number;
		onPageChange?: (page: number) => void;
		showFirstLast?: boolean;
		maxVisible?: number;
}

export interface PaginationEvents {
  // Add component events here
}

export interface PaginationSlots {
  default: {};
}