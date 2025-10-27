import type { Snippet } from 'svelte';

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