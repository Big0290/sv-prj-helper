<script lang="ts">
	interface Props {
		columns: Array<{ key: string; label: string }>;
		rows: Array<Record<string, any>>;
		onRowClick?: (row: Record<string, any>) => void;
		className?: string;
	}

	let {
		columns,
		rows,
		onRowClick,
		className = ''
	}: Props = $props();
</script>

<div class="table-cards {className}">
	{#if rows.length === 0}
		<div class="empty-state">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="3" width="18" height="18" rx="2" />
				<path d="M3 9h18M9 21V9" />
			</svg>
			<p>No data available</p>
		</div>
	{:else}
		{#each rows as row}
			<div 
				class="table-card" 
				class:clickable={!!onRowClick}
				onclick={() => onRowClick?.(row)}
				onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRowClick?.(row); }}}
				role={onRowClick ? 'button' : undefined}
				tabindex={onRowClick ? 0 : undefined}
			>
				{#each columns as column}
					<div class="card-row">
						<span class="card-label">{column.label}</span>
						<span class="card-value">{row[column.key] ?? '-'}</span>
					</div>
				{/each}
			</div>
		{/each}
	{/if}
</div>

<style>
	.table-cards {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.table-card {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: var(--spacing-4);
		box-shadow: var(--glass-shadow-sm);
		transition: all var(--transition-normal);
	}

	.table-card.clickable {
		cursor: pointer;
	}

	.table-card.clickable:hover {
		border-color: var(--color-primary-500);
		box-shadow: var(--glass-shadow-md);
		transform: translateY(-1px);
	}

	.table-card.clickable:active {
		transform: translateY(0);
	}

	.card-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-2) 0;
		gap: var(--spacing-3);
	}

	.card-row:not(:last-child) {
		border-bottom: 1px solid var(--glass-border);
	}

	.card-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-400);
		flex-shrink: 0;
	}

	.card-value {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-200);
		text-align: right;
		word-break: break-word;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-12);
		color: var(--color-neutral-500);
		text-align: center;
	}

	.empty-state svg {
		margin-bottom: var(--spacing-4);
		opacity: 0.5;
	}

	.empty-state p {
		margin: 0;
		font-size: var(--font-size-base);
	}
</style>
