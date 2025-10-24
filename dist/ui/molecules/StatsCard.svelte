<script lang="ts">
	import type { Snippet } from 'svelte';
	
	interface Props {
		label: string;
		value: string | number;
		trend?: number;
		icon?: Snippet;
		variant?: 'default' | 'success' | 'warning' | 'danger';
		loading?: boolean;
	}

	let {
		label,
		value,
		trend,
		icon,
		variant = 'default',
		loading = false
	}: Props = $props();

	const isPositive = $derived(trend !== undefined && trend > 0);
	const isNegative = $derived(trend !== undefined && trend < 0);
</script>

<div class="stats-card {variant}">
	{#if loading}
		<div class="stats-loading">
			<div class="loading-shimmer value-shimmer"></div>
			<div class="loading-shimmer label-shimmer"></div>
		</div>
	{:else}
		<div class="stats-header">
			<span class="stats-label">{label}</span>
			{#if icon}
				<div class="stats-icon">
					{@render icon()}
				</div>
			{/if}
		</div>

		<div class="stats-body">
			<div class="stats-value">{value}</div>
			
			{#if trend !== undefined}
				<div class="stats-trend" class:positive={isPositive} class:negative={isNegative}>
					{#if isPositive}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M7 17L17 7M17 7H7M17 7v10" />
						</svg>
					{:else if isNegative}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M7 7l10 10M17 17H7M17 17V7" />
						</svg>
					{/if}
					<span>{Math.abs(trend)}%</span>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.stats-card {
		padding: var(--spacing-5);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--glass-shadow-md);
		transition: all var(--transition-normal);
	}

	.stats-card:hover {
		box-shadow: var(--glass-shadow-lg);
		transform: translateY(-2px);
	}

	.stats-card.success {
		border-color: rgba(34, 197, 94, 0.3);
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02));
	}

	.stats-card.warning {
		border-color: rgba(245, 158, 11, 0.3);
		background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.02));
	}

	.stats-card.danger {
		border-color: rgba(239, 68, 68, 0.3);
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.02));
	}

	.stats-loading {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.loading-shimmer {
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(255, 255, 255, 0.05) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s ease-in-out infinite;
		border-radius: var(--radius-md);
	}

	.value-shimmer {
		height: 32px;
		width: 60%;
	}

	.label-shimmer {
		height: 16px;
		width: 40%;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	.stats-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-3);
	}

	.stats-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-400);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stats-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-lg);
		background: rgba(139, 92, 246, 0.1);
		color: var(--color-primary-400);
	}

	.stats-icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	.stats-body {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--spacing-3);
	}

	.stats-value {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-neutral-50);
		line-height: 1;
	}

	.stats-trend {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-1);
		padding: var(--spacing-1) var(--spacing-2);
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
	}

	.stats-trend.positive {
		background: rgba(34, 197, 94, 0.15);
		color: var(--color-success-400);
	}

	.stats-trend.negative {
		background: rgba(239, 68, 68, 0.15);
		color: var(--color-danger-400);
	}

	@media (max-width: 768px) {
		.stats-card {
			padding: var(--spacing-4);
		}

		.stats-value {
			font-size: var(--font-size-2xl);
		}
	}
</style>
