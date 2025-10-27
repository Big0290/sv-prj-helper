import type { Snippet } from 'svelte';

export interface FileUploadProps {
accept?: string;
		multiple?: boolean;
		maxSize?: number;
		onUpload?: (files: File[]) => void;
		label?: string;
}

export interface FileUploadEvents {
  // Add component events here
}

export interface FileUploadSlots {
  default: {};
}