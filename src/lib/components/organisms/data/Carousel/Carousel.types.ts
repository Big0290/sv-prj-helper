import type { Snippet } from 'svelte';

export interface CarouselProps {
items: CarouselItem[];
		activeIndex?: number;
		variant?: 'default' | 'cards' | 'fade' | 'stack';
		autoPlay?: boolean;
		interval?: number;
		showDots?: boolean;
		showArrows?: boolean;
		loop?: boolean;
		aspectRatio?: string;
		onSlideChange?: (index: number) => void;
}

export interface CarouselEvents {
  // Add component events here
}

export interface CarouselSlots {
  default: {};
}