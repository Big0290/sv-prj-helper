import type { Snippet } from 'svelte';

export interface PopoverProps {
children: Snippet;
		content: Snippet;
		isOpen?: boolean;
		placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
		trigger?: 'click' | 'hover' | 'manual';
		variant?: 'default' | 'menu' | 'tooltip';
		arrow?: boolean;
		offset?: number;
		closeOnClickOutside?: boolean;
		onOpenChange?: (open: boolean) => void;
}

export interface PopoverEvents {
  // Add component events here
}

export interface PopoverSlots {
  default: {};
}