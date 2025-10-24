<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		height?: string;
		maxHeight?: string;
		type?: 'auto' | 'always' | 'scroll' | 'hover';
		[key: string]: any;
	}

	let {
		children,
		height,
		maxHeight,
		type = 'hover',
		...restProps
	}: Props = $props();
</script>

<div 
	class="scroll-area scroll-area--{type}"
	style:height
	style:max-height={maxHeight}
	{...restProps}
>
	<div class="scroll-content">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	.scroll-area {
		position: relative;
		overflow: auto;
		width: 100%;
	}

	.scroll-content {
		min-width: 100%;
	}

	/* Custom scrollbar styles */
	.scroll-area::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	.scroll-area::-webkit-scrollbar-track {
		background: var(--bg-secondary);
		border-radius: var(--radius-full);
	}

	.scroll-area::-webkit-scrollbar-thumb {
		background: var(--bg-tertiary);
		border-radius: var(--radius-full);
		transition: background var(--transition-fast);
	}

	.scroll-area::-webkit-scrollbar-thumb:hover {
		background: var(--text-tertiary);
	}

	/* Hide scrollbar for hover type */
	.scroll-area--hover::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.scroll-area--hover:hover::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	/* Auto type - uses native scrollbar behavior */
	.scroll-area--auto {
		scrollbar-width: auto;
		scrollbar-color: var(--bg-tertiary) var(--bg-secondary);
	}

	/* Always visible */
	.scroll-area--always::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	/* Firefox */
	.scroll-area {
		scrollbar-width: thin;
		scrollbar-color: var(--bg-tertiary) var(--bg-secondary);
	}

	.scroll-area--hover {
		scrollbar-width: none;
	}

	.scroll-area--hover:hover {
		scrollbar-width: thin;
	}
</style>
