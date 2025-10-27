import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size?: '1' | '2' | '3' | '4' | '5' | '6';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    align?: 'left' | 'center' | 'right';
    color?: string;
    [key: string]: any;
}
declare const Heading: import("svelte").Component<Props, {}, "">;
type Heading = ReturnType<typeof Heading>;
export default Heading;
//# sourceMappingURL=Heading.svelte.d.ts.map