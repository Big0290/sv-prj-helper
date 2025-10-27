import type { Snippet } from 'svelte';

export interface VideoPlaylistProps {
videos: VideoItem[];
		autoPlayNext?: boolean;
		currentIndex?: number;
		onVideoChange?: (index: number) => void;
		orientation?: 'horizontal' | 'vertical';
}

export interface VideoPlaylistEvents {
  // Add component events here
}

export interface VideoPlaylistSlots {
  default: {};
}