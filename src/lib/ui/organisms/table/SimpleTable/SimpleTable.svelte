<script lang="ts">
	interface Props {
		columns: Array<{ key: string; label: string }>;
		rows: Array<Record<string, any>>;
		striped?: boolean;
		hoverable?: boolean;
		compact?: boolean;
		className?: string;
	}

	let {
		columns,
		rows,
		striped = false,
		hoverable = true,
		compact = false,
		className = ''
	}: Props = $props();
</script>

<div class="simple-table-wrapper {className}">
	<table class="simple-table" class:striped class:hoverable class:compact>
		<thead>
			<tr>
				{#each columns as column}
					<th>{column.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if rows.length === 0}
				<tr>
					<td colspan={columns.length} class="empty-state">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="3" width="18" height="18" rx="2" />
							<path d="M3 9h18M9 21V9" />
						</svg>
						<p>No data available</p>
					</td>
				</tr>
			{:else}
				{#each rows as row}
					<tr>
						{#each columns as column}
							<td>{row[column.key] ?? '-'}</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	.simple-table-wrapper {
		width: 100%;
		overflow-x: auto;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--glass-shadow-md);
	}

	.simple-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-sm);
	}

	.simple-table thead {
		background: rgba(139, 92, 246, 0.1);
		border-bottom: 2px solid var(--glass-border);
	}

	.simple-table th {
		padding: var(--spacing-4);
		text-align: left;
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-200);
		white-space: nowrap;
	}

	.simple-table td {
		padding: var(--spacing-4);
		color: var(--color-neutral-300);
		border-bottom: 1px solid var(--glass-border);
	}

	.simple-table tbody tr:last-child td {
		border-bottom: none;
	}

	/* Striped variant */
	.simple-table.striped tbody tr:nth-child(even) {
		background: rgba(255, 255, 255, 0.02);
	}

	/* Hoverable variant */
	.simple-table.hoverable tbody tr {
		transition: background var(--transition-fast);
		cursor: pointer;
	}

	.simple-table.hoverable tbody tr:hover {
		background: rgba(139, 92, 246, 0.05);
	}

	/* Compact variant */
	.simple-table.compact th,
	.simple-table.compact td {
		padding: var(--spacing-2) var(--spacing-3);
	}

	/* Empty state */
	.empty-state {
		text-align: center;
		padding: var(--spacing-8) !important;
		color: var(--color-neutral-500);
		border: none !important;
	}

	.empty-state svg {
		margin-bottom: var(--spacing-3);
		opacity: 0.5;
	}

	.empty-state p {
		margin: 0;
		font-size: var(--font-size-base);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.simple-table {
			font-size: var(--font-size-xs);
		}

		.simple-table th,
		.simple-table td {
			padding: var(--spacing-2) var(--spacing-3);
		}
	}
</style>
