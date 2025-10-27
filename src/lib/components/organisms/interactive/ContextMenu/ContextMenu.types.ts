import type { Snippet } from 'svelte';

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