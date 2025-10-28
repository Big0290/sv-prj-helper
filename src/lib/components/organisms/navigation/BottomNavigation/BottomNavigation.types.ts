import type { Snippet } from 'svelte';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

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