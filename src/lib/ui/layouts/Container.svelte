<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
		padding?: boolean;
		children: Snippet;
	}

	let {
		maxWidth = 'lg',
		padding = true,
		children
	}: Props = $props();
</script>

<div class="container container-{maxWidth}" class:container-padding={padding}>
	{@render children()}
</div>

<style>
	.container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	.container-padding {
		padding-left: var(--spacing-4);
		padding-right: var(--spacing-4);
	}

	.container-sm {
		max-width: 640px;
	}

	.container-md {
		max-width: 768px;
	}

	.container-lg {
		max-width: 1024px;
	}

	.container-xl {
		max-width: 1280px;
	}

	.container-full {
		max-width: none;
	}
</style>
