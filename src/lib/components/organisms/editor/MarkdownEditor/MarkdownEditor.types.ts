import type { Snippet } from 'svelte';

export interface MarkdownEditorProps {
value?: string;
		placeholder?: string;
		minHeight?: string;
		maxHeight?: string;
		showPreview?: boolean;
		previewMode?: 'side' | 'tabs';
		disabled?: boolean;
		toolbar?: boolean;
		onValueChange?: (value: string) => void;
}

export interface MarkdownEditorEvents {
  // Add component events here
}

export interface MarkdownEditorSlots {
  default: {};
}