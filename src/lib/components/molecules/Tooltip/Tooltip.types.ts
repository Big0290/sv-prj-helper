import type { Snippet } from 'svelte';

export interface TooltipProps {
content: string;
		placement?: 'top' | 'bottom' | 'left' | 'right';
		children: Snippet;
}

export interface TooltipEvents {
  // Add component events here
}

export interface TooltipSlots {
  default: {};
}