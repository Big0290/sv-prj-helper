import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    href: string;
    external?: boolean;
    underline?: 'none' | 'hover' | 'always';
    color?: string;
    size?: 'xs' | 'sm' | 'base' | 'lg';
    [key: string]: any;
}
declare const Link: import("svelte").Component<Props, {}, "">;
type Link = ReturnType<typeof Link>;
export default Link;
//# sourceMappingURL=Link.svelte.d.ts.map