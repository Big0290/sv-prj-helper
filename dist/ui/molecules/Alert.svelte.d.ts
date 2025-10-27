import type { Snippet } from 'svelte';
interface Props {
    variant?: 'info' | 'success' | 'warning' | 'error';
    dismissible?: boolean;
    onclose?: () => void;
    title?: string;
    children: Snippet;
}
declare const Alert: import("svelte").Component<Props, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
//# sourceMappingURL=Alert.svelte.d.ts.map