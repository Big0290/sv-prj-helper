import type { Snippet } from 'svelte';

export interface MessageAttachmentProps {
attachment: Attachment;
		onDownload?: (attachment: Attachment) => void;
		variant?: 'inline' | 'compact';
}

export interface MessageAttachmentEvents {
  // Add component events here
}

export interface MessageAttachmentSlots {
  default: {};
}