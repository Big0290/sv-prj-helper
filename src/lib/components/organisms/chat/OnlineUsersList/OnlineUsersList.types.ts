import type { Snippet } from 'svelte';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
  statusMessage?: string;
  lastSeen?: Date;
}

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