import type { Snippet } from 'svelte';
interface Props {
    children: Snippet;
    isOpen?: boolean;
    onClose?: () => void;
    position?: 'left' | 'right' | 'top' | 'bottom';
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
}
declare const Drawer: import("svelte").Component<Props, {}, "isOpen">;
type Drawer = ReturnType<typeof Drawer>;
export default Drawer;
//# sourceMappingURL=Drawer.svelte.d.ts.map