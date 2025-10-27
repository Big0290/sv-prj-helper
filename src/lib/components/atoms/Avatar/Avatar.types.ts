import type { Snippet } from 'svelte';

export interface AvatarProps {
src?: string;
		alt?: string;
		initials?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		status?: 'online' | 'offline' | 'away' | 'busy';
}

export interface AvatarEvents {
  // Add component events here
}

export interface AvatarSlots {
  default: {};
}