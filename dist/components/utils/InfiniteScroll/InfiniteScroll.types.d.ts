import type { Snippet } from 'svelte';
export interface InfiniteScrollProps {
    children: Snippet;
    hasMore?: boolean;
    onLoadMore?: () => void;
    threshold?: number;
}
export interface InfiniteScrollEvents {
}
export interface InfiniteScrollSlots {
    default: {};
}
//# sourceMappingURL=InfiniteScroll.types.d.ts.map