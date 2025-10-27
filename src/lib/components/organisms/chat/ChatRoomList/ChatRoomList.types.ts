import type { Snippet } from 'svelte';

export interface ChatRoomListProps {
rooms: ChatRoom[];
		activeRoomId?: string;
		onRoomSelect?: (room: ChatRoom) => void;
		searchable?: boolean;
}

export interface ChatRoomListEvents {
  // Add component events here
}

export interface ChatRoomListSlots {
  default: {};
}