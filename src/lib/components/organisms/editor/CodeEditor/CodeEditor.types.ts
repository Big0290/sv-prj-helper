import type { Snippet } from 'svelte';

export interface CodeEditorProps {
value?: string;
		language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json' | 'markdown' | 'plaintext';
		theme?: 'light' | 'dark';
		readOnly?: boolean;
		lineNumbers?: boolean;
		lineWrapping?: boolean;
		placeholder?: string;
		minHeight?: string;
		maxHeight?: string;
		tabSize?: number;
		indentUnit?: string;
		onValueChange?: (value: string) => void;
}

export interface CodeEditorEvents {
  // Add component events here
}

export interface CodeEditorSlots {
  default: {};
}