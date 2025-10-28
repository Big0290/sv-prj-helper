import type { Snippet } from 'svelte';

export interface PinnedMessage {
  id: string;
  content: string;
  author: string;
  senderName?: string;
  timestamp: Date;
}

export interface PinnedMessagesProps {
messages?: PinnedMessage[];
		onMessageClick?: (messageId: string) => void;
		onUnpin?: (messageId: string) => void;
		onClose?: () => void;
		maxVisible?: number;
}

export interface PinnedMessagesEvents {
  // Add component events here
}

export interface PinnedMessagesSlots {
  default: {};
}