import type { Snippet } from 'svelte';

export interface Message {
  id: string;
  content: string;
  author: string;
  sender?: string;
  senderName?: string;
  avatar?: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'file';
}

export interface ChatProps {
	messages?: Message[];
		placeholder?: string;
		currentUser?: string;
		showTypingIndicator?: boolean;
		onSend?: (message: string) => void;
		height?: string;
}

export interface ChatEvents {
  // Add component events here
}

export interface ChatSlots {
  default: {};
}