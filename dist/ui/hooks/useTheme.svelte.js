import { getContext } from 'svelte';
export function useTheme() {
    const context = getContext('theme');
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
