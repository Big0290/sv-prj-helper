<script lang="ts">
	import type { Snippet } from 'svelte';
	
	import type { EmptyStateProps } from './EmptyState.types.js';

	let { icon,
		title = 'No data found',
		description = '',
		action,
		compact = false
	 }: EmptyStateProps = $props();
</script>

<div class="empty-state" class:compact>
	{#if icon}
		<div class="empty-icon">
			{@render icon()}
		</div>
	{:else}
		<div class="empty-icon default-icon">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
			</svg>
		</div>
	{/if}

	<div class="empty-content">
		<h3 class="empty-title">{title}</h3>
		{#if description}
			<p class="empty-description">{description}</p>
		{/if}
	</div>

	{#if action}
		<div class="empty-action">
			{@render action()}
		</div>
	{/if}
</div>

<style>
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--spacing-12) var(--spacing-6);
		color: var(--color-neutral-500);
	}

	.empty-state.compact {
		padding: var(--spacing-8) var(--spacing-4);
	}

	.empty-icon {
		margin-bottom: var(--spacing-4);
		color: var(--color-neutral-600);
	}

	.empty-icon :global(svg) {
		width: 80px;
		height: 80px;
	}

	.empty-state.compact .empty-icon :global(svg) {
		width: 56px;
		height: 56px;
	}

	.default-icon {
		opacity: 0.4;
	}

	.empty-content {
		margin-bottom: var(--spacing-4);
		max-width: 400px;
	}

	.empty-title {
		margin: 0 0 var(--spacing-2) 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-300);
	}

	.empty-state.compact .empty-title {
		font-size: var(--font-size-lg);
	}

	.empty-description {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--color-neutral-500);
		line-height: 1.5;
	}

	.empty-state.compact .empty-description {
		font-size: var(--font-size-sm);
	}

	.empty-action {
		margin-top: var(--spacing-2);
	}
</style>
