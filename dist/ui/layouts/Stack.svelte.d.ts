import type { Snippet } from 'svelte';
interface Props {
    direction?: 'row' | 'column';
    gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    wrap?: boolean;
    children: Snippet;
}
declare const Stack: import("svelte").Component<Props, {}, "">;
type Stack = ReturnType<typeof Stack>;
export default Stack;
