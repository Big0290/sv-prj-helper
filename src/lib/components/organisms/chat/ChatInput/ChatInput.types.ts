import type { Snippet } from 'svelte';

export interface ChatInputProps {
onSend?: (message: string) => void;
		placeholder?: string;
		disabled?: boolean;
		maxLength?: number;
		showCounter?: boolean;
}

export interface ChatInputEvents {
  // Add component events here
}

export interface ChatInputSlots {
  default: {};
}