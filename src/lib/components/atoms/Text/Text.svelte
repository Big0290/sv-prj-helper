<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { TextProps } from './Text.types.js';

	let { children,
		as = 'p',
		size = 'base',
		weight = 'normal',
		align,
		color,
		truncate = false,
		lineClamp,
		...restProps
	 }: TextProps = $props();
</script>

<svelte:element 
	this={as} 
	class="text text--{size} text--{weight}"
	class:truncate
	style:text-align={align}
	style:color={color}
	style:--line-clamp={lineClamp}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.text {
		margin: 0;
		line-height: 1.6;
	}

	.text--xs { font-size: var(--font-size-xs, 0.75rem); }
	.text--sm { font-size: var(--font-size-sm, 0.875rem); }
	.text--base { font-size: var(--font-size-base, 1rem); }
	.text--lg { font-size: var(--font-size-lg, 1.125rem); }
	.text--xl { font-size: var(--font-size-xl, 1.25rem); }

	.text--normal { font-weight: var(--font-weight-normal, 400); }
	.text--medium { font-weight: var(--font-weight-medium, 500); }
	.text--semibold { font-weight: var(--font-weight-semibold, 600); }
	.text--bold { font-weight: var(--font-weight-bold, 700); }

	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.text[style*='--line-clamp'] {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: var(--line-clamp);
		line-clamp: var(--line-clamp);
		overflow: hidden;
	}
</style>
