<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	<ol class="breadcrumbs-list">
		{@render children()}
	</ol>
</nav>

<style>
	.breadcrumbs-list {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		list-style: none;
	}
</style>
