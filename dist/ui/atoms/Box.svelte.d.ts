import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    as?: keyof HTMLElementTagNameMap;
    padding?: string | number;
    margin?: string | number;
    bg?: string;
    border?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
    display?: 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
    position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
    overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
    [key: string]: any;
}
declare const Box: import("svelte").Component<Props, {}, "">;
type Box = ReturnType<typeof Box>;
export default Box;
