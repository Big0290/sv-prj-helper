import type { Snippet } from 'svelte';

export interface OnlineUsersListProps {
users: User[];
		onUserClick?: (userId: string) => void;
		showOffline?: boolean;
		variant?: 'list' | 'grid' | 'compact';
		title?: string;
}

export interface OnlineUsersListEvents {
  // Add component events here
}

export interface OnlineUsersListSlots {
  default: {};
}