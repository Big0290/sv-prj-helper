import type { Snippet } from 'svelte';

export interface ImageGalleryProps {
images: string[];
		columns?: number;
		gap?: string;
		onClick?: (index: number) => void;
}

export interface ImageGalleryEvents {
  // Add component events here
}

export interface ImageGallerySlots {
  default: {};
}