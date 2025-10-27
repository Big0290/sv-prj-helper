import type { Snippet } from 'svelte';

export interface DragAndDropProps {
onDrop?: (files: File[]) => void;
		accept?: string;
		multiple?: boolean;
		maxSize?: number;
		maxFiles?: number;
		disabled?: boolean;
}

export interface DragAndDropEvents {
  // Add component events here
}

export interface DragAndDropSlots {
  default: {};
}