import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    height?: string;
    maxHeight?: string;
    type?: 'auto' | 'always' | 'scroll' | 'hover';
    [key: string]: any;
}
declare const ScrollArea: import("svelte").Component<Props, {}, "">;
type ScrollArea = ReturnType<typeof ScrollArea>;
export default ScrollArea;
