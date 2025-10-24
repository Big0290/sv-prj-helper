import type { Snippet } from 'svelte';
interface Props {
    children: Snippet;
    orientation?: 'horizontal' | 'vertical';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
declare const ButtonGroup: import("svelte").Component<Props, {}, "">;
type ButtonGroup = ReturnType<typeof ButtonGroup>;
export default ButtonGroup;
