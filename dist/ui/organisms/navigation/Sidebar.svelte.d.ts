import type { Snippet } from 'svelte';
interface Props {
    children: Snippet;
    isOpen?: boolean;
    position?: 'left' | 'right';
    width?: string;
    overlay?: boolean;
    onClose?: () => void;
}
declare const Sidebar: import("svelte").Component<Props, {}, "isOpen">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
