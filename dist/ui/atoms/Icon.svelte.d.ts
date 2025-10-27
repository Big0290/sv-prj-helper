import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    name?: string;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
    color?: string;
    spin?: boolean;
    [key: string]: any;
}
declare const Icon: import("svelte").Component<Props, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
//# sourceMappingURL=Icon.svelte.d.ts.map