import type { Snippet } from 'svelte';
interface Props {
    content: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    children: Snippet;
}
declare const Tooltip: import("svelte").Component<Props, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
