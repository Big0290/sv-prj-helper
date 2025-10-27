import type { Snippet } from 'svelte';

export interface ImageProps {
src: string;
		alt: string;
		width?: string | number;
		height?: string | number;
		fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
		loading?: 'lazy' | 'eager';
		fallback?: string;
		onLoad?: () => void;
		onError?: () => void;
		[key: string]: any;
}

export interface ImageEvents {
  // Add component events here
}

export interface ImageSlots {
  default: {};
}