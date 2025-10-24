import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    for?: string;
    required?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'base' | 'lg';
    [key: string]: any;
}
declare const Label: import("svelte").Component<Props, {}, "">;
type Label = ReturnType<typeof Label>;
export default Label;
