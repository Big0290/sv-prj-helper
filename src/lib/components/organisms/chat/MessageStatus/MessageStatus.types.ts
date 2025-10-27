import type { Snippet } from 'svelte';

export interface MessageStatusProps {
status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
		timestamp?: Date;
		showTimestamp?: boolean;
}

export interface MessageStatusEvents {
  // Add component events here
}

export interface MessageStatusSlots {
  default: {};
}