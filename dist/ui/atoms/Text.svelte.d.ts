import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small';
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    align?: 'left' | 'center' | 'right' | 'justify';
    color?: string;
    truncate?: boolean;
    lineClamp?: number;
    [key: string]: any;
}
declare const Text: import("svelte").Component<Props, {}, "">;
type Text = ReturnType<typeof Text>;
export default Text;
