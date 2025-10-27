import type { Snippet } from 'svelte';

export interface MessageDividerProps {
text?: string;
		date?: Date;
		type?: 'date' | 'unread' | 'custom';
		unreadCount?: number;
}

export interface MessageDividerEvents {
  // Add component events here
}

export interface MessageDividerSlots {
  default: {};
}