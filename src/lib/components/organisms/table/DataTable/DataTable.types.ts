import type { Snippet } from 'svelte';

export interface DataTableProps {
columns: Column[];
		rows: Row[];
		selectable?: boolean;
		selectedRows?: (string | number)[];
		onRowSelect?: (selectedIds: (string | number)[]) => void;
		onSort?: (key: string, direction: 'asc' | 'desc') => void;
}

export interface DataTableEvents {
  // Add component events here
}

export interface DataTableSlots {
  default: {};
}