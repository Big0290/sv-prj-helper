import type { Snippet } from 'svelte';

export interface BottomNavigationProps {
items: NavItem[];
		active?: string;
		onItemClick?: (item: NavItem) => void;
}

export interface BottomNavigationEvents {
  // Add component events here
}

export interface BottomNavigationSlots {
  default: {};
}