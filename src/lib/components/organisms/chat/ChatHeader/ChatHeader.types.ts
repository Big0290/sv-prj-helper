import type { Snippet } from 'svelte';

export interface ChatHeaderProps {
name: string;
		avatar?: string;
		isOnline?: boolean;
		lastSeen?: Date;
		isTyping?: boolean;
		onCallClick?: () => void;
		onVideoClick?: () => void;
		onInfoClick?: () => void;
}

export interface ChatHeaderEvents {
  // Add component events here
}

export interface ChatHeaderSlots {
  default: {};
}