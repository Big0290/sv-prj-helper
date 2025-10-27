import type { Snippet } from 'svelte';

export interface TablePaginationProps {
currentPage?: number;
		totalPages?: number;
		totalItems: number;
		itemsPerPage?: number;
		pageSizeOptions?: number[];
		onPageChange?: (page: number) => void;
		onPageSizeChange?: (size: number) => void;
		showPageSize?: boolean;
		showInfo?: boolean;
		variant?: 'default' | 'simple' | 'compact';
}

export interface TablePaginationEvents {
  // Add component events here
}

export interface TablePaginationSlots {
  default: {};
}