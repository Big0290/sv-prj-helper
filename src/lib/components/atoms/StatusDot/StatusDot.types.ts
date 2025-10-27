import type { Snippet } from 'svelte';

export interface StatusDotProps {
status?: 'online' | 'offline' | 'away' | 'busy';
		size?: 'sm' | 'md' | 'lg';
		showLabel?: boolean;
		pulse?: boolean;
}

export interface StatusDotEvents {
  // Add component events here
}

export interface StatusDotSlots {
  default: {};
}