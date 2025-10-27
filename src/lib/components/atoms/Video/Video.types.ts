import type { Snippet } from 'svelte';

export interface VideoProps {
src: string;
		poster?: string;
		autoplay?: boolean;
		loop?: boolean;
		muted?: boolean;
		controls?: boolean;
		width?: string;
		height?: string;
		aspectRatio?: '16/9' | '4/3' | '1/1';
}

export interface VideoEvents {
  // Add component events here
}

export interface VideoSlots {
  default: {};
}