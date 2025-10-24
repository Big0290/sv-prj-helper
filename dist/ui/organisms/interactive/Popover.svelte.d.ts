import type { Snippet } from 'svelte';
interface Props {
    children: Snippet;
    content: Snippet;
    isOpen?: boolean;
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    trigger?: 'click' | 'hover' | 'manual';
    variant?: 'default' | 'menu' | 'tooltip';
    arrow?: boolean;
    offset?: number;
    closeOnClickOutside?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare const Popover: import("svelte").Component<Props, {}, "isOpen">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
