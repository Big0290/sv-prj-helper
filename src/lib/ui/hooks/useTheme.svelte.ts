import { getContext } from 'svelte';

export interface ThemeContext {
	current: () => 'light' | 'dark';
	toggle: () => void;
	set: (theme: 'light' | 'dark' | 'system') => void;
}

export function useTheme(): ThemeContext {
	const context = getContext<ThemeContext>('theme');
	
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	
	return context;
}
