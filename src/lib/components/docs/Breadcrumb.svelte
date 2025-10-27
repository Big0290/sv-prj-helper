<script lang="ts">
	import { Link, Text } from '$lib/ui';

	interface BreadcrumbItem {
		title: string;
		path?: string;
	}

	interface Props {
		items: BreadcrumbItem[];
		separator?: string;
		class?: string;
	}

	let { 
		items,
		separator = '→',
		class: className = ''
	}: Props = $props();
</script>

<nav class="breadcrumb {className}" aria-label="Breadcrumb">
	<ol class="breadcrumb-list">
		{#each items as item, index}
			<li class="breadcrumb-item">
				{#if item.path && index < items.length - 1}
					<Link href={item.path} class="breadcrumb-link">
						{item.title}
					</Link>
				{:else}
					<Text color={index === items.length - 1 ? 'var(--text-secondary)' : 'inherit'} size="sm">
						{item.title}
					</Text>
				{/if}
				
				{#if index < items.length - 1}
					<span class="breadcrumb-separator" aria-hidden="true">
						{separator}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumb {
		display: flex;
		align-items: center;
	}

	.breadcrumb-list {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
		flex-wrap: wrap;
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
	}

	:global(.breadcrumb-link) {
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	:global(.breadcrumb-link:hover) {
		color: var(--text-primary);
		text-decoration: underline;
	}

	.breadcrumb-separator {
		color: var(--text-secondary);
		font-size: 0.875rem;
		user-select: none;
	}

	@media (max-width: 768px) {
		.breadcrumb-list {
			gap: 0.25rem;
		}

		.breadcrumb-item {
			gap: 0.25rem;
		}

		.breadcrumb-separator {
			font-size: 0.75rem;
		}
	}
</style>