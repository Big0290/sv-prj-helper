import type { Snippet } from 'svelte';

export interface VideoButtonProps {
src: string;
		title: string;
		thumbnail?: string;
		duration?: number;
		variant?: 'inline' | 'modal';
		size?: 'sm' | 'md' | 'lg';
		enableHoverPreview?: boolean;
}

export interface VideoButtonEvents {
  // Add component events here
}

export interface VideoButtonSlots {
  default: {};
}