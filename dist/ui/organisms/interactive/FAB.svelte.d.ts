import type { Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    size?: 'sm' | 'md' | 'lg';
    icon?: Snippet;
    label?: string;
    onclick?: () => void;
    extended?: boolean;
}
declare const FAB: import("svelte").Component<Props, {}, "">;
type FAB = ReturnType<typeof FAB>;
export default FAB;
//# sourceMappingURL=FAB.svelte.d.ts.map