import type { Snippet } from 'svelte';

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  src?: string;
  thumbnail?: string;
  duration?: string;
  description?: string;
}

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