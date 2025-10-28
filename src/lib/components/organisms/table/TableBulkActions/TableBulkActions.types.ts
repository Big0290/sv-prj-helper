import type { Snippet } from 'svelte';

export interface Action {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick: () => void;
}

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