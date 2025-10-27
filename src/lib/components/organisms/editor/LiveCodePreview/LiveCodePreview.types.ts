import type { Snippet } from 'svelte';

export interface LiveCodePreviewProps {
initialHtml?: string;
		initialCss?: string;
		initialJs?: string;
		layout?: 'horizontal' | 'vertical';
		showPreview?: boolean;
		autoRun?: boolean;
		minHeight?: string;
}

export interface LiveCodePreviewEvents {
  // Add component events here
}

export interface LiveCodePreviewSlots {
  default: {};
}