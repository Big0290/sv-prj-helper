import type { Snippet } from 'svelte';
export interface ThemeProviderProps {
    children?: Snippet;
    theme?: 'light' | 'dark' | 'system';
    customTheme?: Record<string, string>;
}
export interface ThemeProviderEvents {
}
export interface ThemeProviderSlots {
    default: {};
}
//# sourceMappingURL=ThemeProvider.types.d.ts.map