import type { Snippet } from 'svelte';

export interface TypingIndicatorProps {
userName?: string;
		avatar?: string;
		showAvatar?: boolean;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'bubble' | 'inline';
}

export interface TypingIndicatorEvents {
  // Add component events here
}

export interface TypingIndicatorSlots {
  default: {};
}