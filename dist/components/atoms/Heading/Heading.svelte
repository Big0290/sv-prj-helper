<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { HeadingProps } from './Heading.types.js';

	let { children,
		as = 'h2',
		size,
		weight = 'bold',
		align,
		color,
		...restProps
	 }: HeadingProps = $props();

	const level = $derived(size || as.slice(1));
</script>

<svelte:element 
	this={as} 
	class="heading heading--{level} heading--{weight}"
	style:text-align={align}
	style:color={color}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.heading {
		margin: 0;
		line-height: 1.2;
		font-family: var(--font-family-heading, inherit);
		color: var(--text-primary);
	}

	.heading--1 { font-size: var(--font-size-5xl, 3rem); }
	.heading--2 { font-size: var(--font-size-4xl, 2.25rem); }
	.heading--3 { font-size: var(--font-size-3xl, 1.875rem); }
	.heading--4 { font-size: var(--font-size-2xl, 1.5rem); }
	.heading--5 { font-size: var(--font-size-xl, 1.25rem); }
	.heading--6 { font-size: var(--font-size-lg, 1.125rem); }

	.heading--normal { font-weight: var(--font-weight-normal, 400); }
	.heading--medium { font-weight: var(--font-weight-medium, 500); }
	.heading--semibold { font-weight: var(--font-weight-semibold, 600); }
	.heading--bold { font-weight: var(--font-weight-bold, 700); }
</style>
