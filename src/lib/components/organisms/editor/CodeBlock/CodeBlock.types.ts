import type { Snippet } from 'svelte';

export interface CodeBlockProps {
code: string;
		language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json' | 'markdown' | 'bash' | 'plaintext';
		showLineNumbers?: boolean;
		title?: string;
		copyable?: boolean;
		maxHeight?: string;
		theme?: 'dark' | 'light';
}

export interface CodeBlockEvents {
  // Add component events here
}

export interface CodeBlockSlots {
  default: {};
}