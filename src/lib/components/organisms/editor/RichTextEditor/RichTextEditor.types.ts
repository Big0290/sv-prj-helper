import type { Snippet } from 'svelte';

export interface RichTextEditorProps {
value?: string;
		placeholder?: string;
		disabled?: boolean;
		minHeight?: string;
}

export interface RichTextEditorEvents {
  // Add component events here
}

export interface RichTextEditorSlots {
  default: {};
}