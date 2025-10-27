<script lang="ts">
	import type { Snippet } from 'svelte';
	
	import type { FABProps } from './FAB.types.js';

	let { children,
		position = 'bottom-right',
		size = 'md',
		icon,
		label = '',
		onclick,
		extended = false
	 }: FABProps = $props();

	const sizeClasses = {
		sm: 'fab-sm',
		md: 'fab-md',
		lg: 'fab-lg'
	};
</script>

<button
	type="button"
	class="fab {sizeClasses[size]} {position}"
	class:extended
	{onclick}
	aria-label={label || 'Floating action button'}
>
	{#if icon}
		<span class="fab-icon">
			{@render icon()}
		</span>
	{/if}
	{#if extended && label}
		<span class="fab-label">{label}</span>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.fab {
		position: fixed;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		border: none;
		border-radius: var(--radius-full);
		color: white;
		font-weight: var(--font-weight-semibold);
		cursor: pointer;
		box-shadow: var(--glass-shadow-xl);
		transition: all var(--transition-normal);
		z-index: 1000;
	}

	.fab:hover {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
		transform: scale(1.05);
	}

	.fab:active {
		transform: scale(0.95);
	}

	/* Positions */
	.fab.bottom-right {
		bottom: var(--spacing-6);
		right: var(--spacing-6);
	}

	.fab.bottom-left {
		bottom: var(--spacing-6);
		left: var(--spacing-6);
	}

	.fab.top-right {
		top: var(--spacing-6);
		right: var(--spacing-6);
	}

	.fab.top-left {
		top: var(--spacing-6);
		left: var(--spacing-6);
	}

	/* Sizes */
	.fab-sm {
		width: 40px;
		height: 40px;
		font-size: var(--font-size-sm);
	}

	.fab-sm.extended {
		width: auto;
		padding: 0 var(--spacing-4);
	}

	.fab-md {
		width: 56px;
		height: 56px;
		font-size: var(--font-size-base);
	}

	.fab-md.extended {
		width: auto;
		padding: 0 var(--spacing-5);
	}

	.fab-lg {
		width: 72px;
		height: 72px;
		font-size: var(--font-size-lg);
	}

	.fab-lg.extended {
		width: auto;
		padding: 0 var(--spacing-6);
	}

	.fab-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.fab-label {
		white-space: nowrap;
	}

	@media (max-width: 768px) {
		.fab.bottom-right,
		.fab.bottom-left {
			bottom: var(--spacing-4);
		}

		.fab.top-right,
		.fab.top-left {
			top: var(--spacing-4);
		}

		.fab.bottom-right,
		.fab.top-right {
			right: var(--spacing-4);
		}

		.fab.bottom-left,
		.fab.top-left {
			left: var(--spacing-4);
		}
	}
</style>
