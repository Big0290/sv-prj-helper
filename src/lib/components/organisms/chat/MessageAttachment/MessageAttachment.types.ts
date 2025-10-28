import type { Snippet } from 'svelte';

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

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