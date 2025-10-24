import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    theme?: 'light' | 'dark' | 'system';
    customTheme?: Record<string, string>;
}
declare const ThemeProvider: import("svelte").Component<Props, {}, "theme">;
type ThemeProvider = ReturnType<typeof ThemeProvider>;
export default ThemeProvider;
