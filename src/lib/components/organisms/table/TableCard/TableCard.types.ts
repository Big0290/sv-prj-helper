import type { Snippet } from 'svelte';

export interface TableCardProps {
	columns: Array<{ key: string; label: string }>;
	rows: Array<Record<string, any>>;
	onRowClick?: (row: Record<string, any>) => void;
	className?: string;
}

export interface TableCardEvents {
  // Add component events here
}

export interface TableCardSlots {
  default: {};
}