export interface ThemeContext {
    current: () => 'light' | 'dark';
    toggle: () => void;
    set: (theme: 'light' | 'dark' | 'system') => void;
}
export declare function useTheme(): ThemeContext;
//# sourceMappingURL=useTheme.svelte.d.ts.map