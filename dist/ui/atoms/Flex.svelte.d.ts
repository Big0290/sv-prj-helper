import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    as?: keyof HTMLElementTagNameMap;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: string | number;
    inline?: boolean;
    [key: string]: any;
}
declare const Flex: import("svelte").Component<Props, {}, "">;
type Flex = ReturnType<typeof Flex>;
export default Flex;
//# sourceMappingURL=Flex.svelte.d.ts.map