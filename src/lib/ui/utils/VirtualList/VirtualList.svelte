<script lang="ts">
	import type { Snippet } from 'svelte';
	
	interface Props {
		items: any[];
		itemHeight: number;
		height: number | string;
		item: Snippet<[any]>;
	}
	let {
		items,
		itemHeight,
		height,
		item
	}: Props = $props();
	
	let scrollTop = $state(0);
	const heightPx = $derived(typeof height === 'number' ? `${height}px` : height);
	const heightNum = $derived(typeof height === 'number' ? height : parseInt(height));
	const visibleStart = $derived(Math.floor(scrollTop / itemHeight));
	const visibleEnd = $derived(Math.ceil((scrollTop + heightNum) / itemHeight));
	const visibleItems = $derived(items.slice(visibleStart, visibleEnd));
	const offsetY = $derived(visibleStart * itemHeight);
	const totalHeight = $derived(items.length * itemHeight);
</script>

<div class="virtual-list" style="height: {heightPx}" onscroll={(e) => scrollTop = e.currentTarget.scrollTop}>
	<div style="height: {totalHeight}px; position: relative;">
		<div style="transform: translateY({offsetY}px);">
			{#each visibleItems as virtualItem, i}
				<div style="height: {itemHeight}px">
					{@render item(virtualItem)}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.virtual-list { overflow-y: auto; }
</style>
