import type { Snippet } from 'svelte';

export interface VideoProgressProps {
videoId: string;
		duration: number;
		currentTime?: number;
		onResume?: (time: number) => void;
		autoSave?: boolean;
		showLabel?: boolean;
}

export interface VideoProgressEvents {
  // Add component events here
}

export interface VideoProgressSlots {
  default: {};
}