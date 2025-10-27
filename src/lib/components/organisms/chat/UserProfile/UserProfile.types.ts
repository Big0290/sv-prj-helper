import type { Snippet } from 'svelte';

export interface UserProfileProps {
name: string;
		avatar?: string;
		bio?: string;
		email?: string;
		phone?: string;
		status?: string;
		isOnline?: boolean;
		joinedDate?: Date;
		onMessageClick?: () => void;
		onCallClick?: () => void;
		onVideoClick?: () => void;
		onBlockClick?: () => void;
		variant?: 'full' | 'compact';
}

export interface UserProfileEvents {
  // Add component events here
}

export interface UserProfileSlots {
  default: {};
}