import type { Snippet } from 'svelte';

export interface ChatBubbleProps {
message: string;
		sender?: 'user' | 'other';
		senderName?: string;
		timestamp?: Date;
		avatar?: string;
		showAvatar?: boolean;
		showTimestamp?: boolean;
}

export interface ChatBubbleEvents {
  // Add component events here
}

export interface ChatBubbleSlots {
  default: {};
}