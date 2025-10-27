import type { Snippet } from 'svelte';

export interface SidebarProps {
children: Snippet;
		isOpen?: boolean;
		position?: 'left' | 'right';
		width?: string;
		overlay?: boolean;
		onClose?: () => void;
}

export interface SidebarEvents {
  // Add component events here
}

export interface SidebarSlots {
  default: {};
}