import type { Snippet } from 'svelte';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
  shortcut?: string;
  action?: () => void;
}

export interface ContextMenuProps {
children: Snippet;
		items: ContextMenuItem[];
		onItemClick?: (item: ContextMenuItem) => void;
}

export interface ContextMenuEvents {
  // Add component events here
}

export interface ContextMenuSlots {
  default: {};
}