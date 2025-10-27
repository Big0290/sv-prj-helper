import type { Snippet } from 'svelte';

interface MenuItem {
	id: string;
	label: string;
	icon: string;
	variant?: 'default' | 'danger';
	disabled?: boolean;
}

export interface MessageMenuProps {
	open?: boolean;
	onClose?: () => void;
	onItemClick?: (itemId: string) => void;
	items?: MenuItem[];
	position?: { x: number; y: number };
}

export interface MessageMenuEvents {
  // Add component events here
}

export interface MessageMenuSlots {
  default: {};
}