import type { Snippet } from 'svelte';

export interface Message {
  id: string;
  content: string;
  author: string;
  sender?: string;
  avatar?: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'file';
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: Message;
  unreadCount?: number;
  avatar?: string;
  isOnline?: boolean;
  isTyping?: boolean;
  lastMessageTime?: Date;
}

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