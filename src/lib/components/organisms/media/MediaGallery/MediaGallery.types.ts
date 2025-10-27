import type { Snippet } from 'svelte';

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