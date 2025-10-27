import type { Snippet } from 'svelte';

export interface MessageReactionProps {
reactions?: Reaction[];
		showPicker?: boolean;
		onReactionClick?: (emoji: string) => void;
		onReactionAdd?: (emoji: string) => void;
		size?: 'sm' | 'md' | 'lg';
}

export interface MessageReactionEvents {
  // Add component events here
}

export interface MessageReactionSlots {
  default: {};
}