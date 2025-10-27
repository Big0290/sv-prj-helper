import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    icon?: Snippet;
    disabled?: boolean;
    danger?: boolean;
    onclick?: () => void;
    [key: string]: any;
}
declare const MenuItem: import("svelte").Component<Props, {}, "">;
type MenuItem = ReturnType<typeof MenuItem>;
export default MenuItem;
//# sourceMappingURL=MenuItem.svelte.d.ts.map