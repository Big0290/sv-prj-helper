<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		as?: keyof HTMLElementTagNameMap;
		[key: string]: any;
	}

	let {
		children,
		as = 'span',
		...restProps
	}: Props = $props();
</script>

<svelte:element this={as} class="visually-hidden" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
