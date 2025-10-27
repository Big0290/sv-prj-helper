import type { Snippet } from 'svelte';

export interface MessageQuoteProps {
userName: string;
		messageText: string;
		messageType?: 'text' | 'image' | 'video' | 'audio' | 'file';
		avatar?: string;
		onQuoteClick?: () => void;
		variant?: 'compact' | 'full';
		closable?: boolean;
		onClose?: () => void;
}

export interface MessageQuoteEvents {
  // Add component events here
}

export interface MessageQuoteSlots {
  default: {};
}