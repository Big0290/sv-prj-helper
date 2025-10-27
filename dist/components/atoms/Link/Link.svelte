<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { LinkProps } from './Link.types.js';

	let { children,
		href,
		external = false,
		underline = 'hover',
		color,
		size = 'base',
		...restProps
	 }: LinkProps = $props();

	const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
</script>

<a 
	{href}
	class="link link--{size} link--underline-{underline}"
	style:color={color}
	{...externalProps}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</a>

<style>
	.link {
		color: var(--color-primary);
		cursor: pointer;
		transition: color var(--transition-fast);
	}

	.link--xs { font-size: var(--font-size-xs, 0.75rem); }
	.link--sm { font-size: var(--font-size-sm, 0.875rem); }
	.link--base { font-size: var(--font-size-base, 1rem); }
	.link--lg { font-size: var(--font-size-lg, 1.125rem); }

	.link--underline-none {
		text-decoration: none;
	}

	.link--underline-hover {
		text-decoration: none;
	}

	.link--underline-hover:hover {
		text-decoration: underline;
	}

	.link--underline-always {
		text-decoration: underline;
	}

	.link:hover {
		color: var(--color-primary-hover);
	}

	.link:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
		border-radius: 2px;
	}
</style>
