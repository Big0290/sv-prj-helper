<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { CodeProps } from './Code.types.js';

	let { children,
		inline = true,
		language,
		...restProps
	 }: CodeProps = $props();
</script>

{#if inline}
	<code class="code code--inline" {...restProps}>
		{#if children}
			{@render children()}
		{/if}
	</code>
{:else}
	<pre class="code code--block" data-language={language} {...restProps}><code>{#if children}{@render children()}{/if}</code></pre>
{/if}

<style>
	.code {
		font-family: var(--font-family-mono, 'Courier New', monospace);
		font-size: var(--font-size-sm, 0.875rem);
	}

	.code--inline {
		display: inline-block;
		padding: 2px 6px;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		color: var(--color-primary);
		line-height: 1.4;
	}

	.code--block {
		display: block;
		padding: var(--spacing-4);
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		overflow-x: auto;
		line-height: 1.6;
	}

	.code--block code {
		display: block;
		color: var(--text-primary);
	}

	.code--block[data-language]::before {
		content: attr(data-language);
		display: block;
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
		text-transform: uppercase;
		margin-bottom: var(--spacing-2);
	}
</style>
