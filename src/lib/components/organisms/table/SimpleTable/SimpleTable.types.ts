import type { Snippet } from 'svelte';

export interface SimpleTableProps {
	columns: Array<{ key: string; label: string }>;
	rows: Array<Record<string, any>>;
	striped?: boolean;
	hoverable?: boolean;
	compact?: boolean;
	className?: string;
}

export interface SimpleTableEvents {
  // Add component events here
}

export interface SimpleTableSlots {
  default: {};
}