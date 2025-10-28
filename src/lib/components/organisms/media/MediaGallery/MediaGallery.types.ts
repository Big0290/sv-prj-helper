import type { Snippet } from 'svelte';

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'file';
  url: string;
  name?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  senderName?: string;
  timestamp?: Date;
  size?: number;
}

export interface MediaGalleryProps {
items?: MediaItem[];
		filter?: 'all' | 'image' | 'video' | 'audio' | 'file';
		onItemClick?: (item: MediaItem) => void;
		onClose?: () => void;
		title?: string;
}

export interface MediaGalleryEvents {
  // Add component events here
}

export interface MediaGallerySlots {
  default: {};
}