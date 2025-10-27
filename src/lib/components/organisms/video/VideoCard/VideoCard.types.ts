import type { Snippet } from 'svelte';

export interface VideoCardProps {
title: string;
		src: string;
		thumbnail?: string;
		description?: string;
		duration?: number;
		views?: number;
		uploadDate?: Date | string;
		author?: string;
		onClick?: () => void;
		enableHoverPreview?: boolean;
}

export interface VideoCardEvents {
  // Add component events here
}

export interface VideoCardSlots {
  default: {};
}