import type { Snippet } from 'svelte';

export interface Tab {
  id: string;
  label: string;
  content?: string;
  disabled?: boolean;
  icon?: string;
}

export interface TabsProps {
tabs: Tab[];
		activeTab?: string;
		variant?: 'default' | 'pills' | 'underline';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		onTabChange?: (tabId: string) => void;
}

export interface TabsEvents {
  // Add component events here
}

export interface TabsSlots {
  default: {};
}