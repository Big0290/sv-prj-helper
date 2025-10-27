<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { InfiniteScrollProps } from './InfiniteScroll.types.js';
	let { children,
		hasMore = true,
		onLoadMore,
		threshold = 200
	 }: InfiniteScrollProps = $props();
	
	let sentinel = $state<HTMLElement>();
	$effect(() => {
		if (!sentinel || !hasMore) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) onLoadMore?.();
		}, { rootMargin: `${threshold}px` });
		observer.observe(sentinel);
		return () => observer.disconnect();
	});
</script>

<div class="infinite-scroll">
	{@render children()}
	{#if hasMore}
		<div bind:this={sentinel} class="sentinel">Loading...</div>
	{/if}
</div>

<style>
	.infinite-scroll { width: 100%; }
	.sentinel { padding: var(--spacing-4); text-align: center; color: var(--color-neutral-500); font-size: var(--font-size-sm); }
</style>
