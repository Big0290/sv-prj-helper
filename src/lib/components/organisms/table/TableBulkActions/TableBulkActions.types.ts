import type { Snippet } from 'svelte';

export interface TableBulkActionsProps {
selectedCount: number;
		actions?: Action[];
		onClear?: () => void;
}

export interface TableBulkActionsEvents {
  // Add component events here
}

export interface TableBulkActionsSlots {
  default: {};
}