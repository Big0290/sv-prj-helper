import type { Snippet } from 'svelte';

export interface ThemeProviderProps {
children?: Snippet;
		theme?: 'light' | 'dark' | 'system';
		customTheme?: Record<string, string>;
}

export interface ThemeProviderEvents {
  // Add component events here
}

export interface ThemeProviderSlots {
  default: {};
}