import type { Snippet } from 'svelte';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface Row {
  id: string | number;
  [key: string]: any;
}

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