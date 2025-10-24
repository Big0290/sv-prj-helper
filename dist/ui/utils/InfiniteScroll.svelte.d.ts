import type { Snippet } from 'svelte';
interface Props {
    children: Snippet;
    hasMore?: boolean;
    onLoadMore?: () => void;
    threshold?: number;
}
declare const InfiniteScroll: import("svelte").Component<Props, {}, "">;
type InfiniteScroll = ReturnType<typeof InfiniteScroll>;
export default InfiniteScroll;
