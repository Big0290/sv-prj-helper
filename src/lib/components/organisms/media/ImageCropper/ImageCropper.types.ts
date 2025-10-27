import type { Snippet } from 'svelte';

export interface ImageCropperProps {
src: string;
		aspectRatio?: number;
		onCrop?: (blob: Blob) => void;
		minWidth?: number;
		minHeight?: number;
}

export interface ImageCropperEvents {
  // Add component events here
}

export interface ImageCropperSlots {
  default: {};
}