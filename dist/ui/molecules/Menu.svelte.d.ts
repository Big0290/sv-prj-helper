import { type Snippet } from 'svelte';
interface Props {
    trigger?: Snippet;
    children?: Snippet;
    open?: boolean;
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    onOpenChange?: (open: boolean) => void;
    [key: string]: any;
}
declare const Menu: import("svelte").Component<Props, {}, "open">;
type Menu = ReturnType<typeof Menu>;
export default Menu;
