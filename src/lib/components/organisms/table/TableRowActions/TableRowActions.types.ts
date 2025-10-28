import type { Snippet } from 'svelte';

export interface Action {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick: () => void;
}

export interface TableRowActionsProps {
actions?: Action[];
}

export interface TableRowActionsEvents {
  // Add component events here
}

export interface TableRowActionsSlots {
  default: {};
}