<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { BreadcrumbsProps } from './Breadcrumbs.types.js';

	let { children  }: BreadcrumbsProps = $props();
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
