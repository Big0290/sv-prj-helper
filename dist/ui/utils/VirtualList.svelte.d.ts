import type { Snippet } from 'svelte';
interface Props {
    items: any[];
    itemHeight: number;
    height: number | string;
    item: Snippet<[any]>;
}
declare const VirtualList: import("svelte").Component<Props, {}, "">;
type VirtualList = ReturnType<typeof VirtualList>;
export default VirtualList;
