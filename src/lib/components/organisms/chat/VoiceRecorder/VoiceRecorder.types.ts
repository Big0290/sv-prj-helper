import type { Snippet } from 'svelte';

export interface VoiceRecorderProps {
onSend?: (audioBlob: Blob, duration: number) => void;
		onCancel?: () => void;
		maxDuration?: number; // in seconds
}

export interface VoiceRecorderEvents {
  // Add component events here
}

export interface VoiceRecorderSlots {
  default: {};
}