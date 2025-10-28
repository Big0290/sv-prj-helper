<script module lang="ts">
export interface Column {
	key: string;
	label: string;
	sortable?: boolean;
	width?: string;
}

export interface Row {
	id: string | number;
	[key: string]: any;
}
</script>

<script lang="ts">
	import type { DataTableProps } from './DataTable.types.js';

	let { columns,
		rows,
		selectable = false,
		selectedRows = $bindable([]),
		onRowSelect,
		onSort
	 }: DataTableProps = $props();

	let sortKey = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');

	const sortedRows = $derived(() => {
		if (!sortKey) return rows;

		return [...rows].sort((a, b) => {
			const aVal = a[sortKey!];
			const bVal = b[sortKey!];

			if (aVal === bVal) return 0;
			
			const comparison = aVal < bVal ? -1 : 1;
			return sortDirection === 'asc' ? comparison : -comparison;
		});
	});

	const allSelected = $derived(
		rows.length > 0 && selectedRows.length === rows.length
	);

	function handleSort(key: string) {
		if (sortKey === key) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDirection = 'asc';
		}
		onSort?.(key, sortDirection);
	}

	function toggleAll() {
		if (allSelected) {
			selectedRows = [];
		} else {
			selectedRows = rows.map(row => row.id);
		}
		onRowSelect?.(selectedRows);
	}

	function toggleRow(id: string | number) {
		const index = selectedRows.indexOf(id);
		if (index > -1) {
			selectedRows = selectedRows.filter(rowId => rowId !== id);
		} else {
			selectedRows = [...selectedRows, id];
		}
		onRowSelect?.(selectedRows);
	}
</script>

<div class="datatable">
	<div class="datatable-wrapper">
		<table class="table">
			<thead>
				<tr>
					{#if selectable}
						<th class="th th-checkbox">
							<input
								type="checkbox"
								checked={allSelected}
								onchange={toggleAll}
								aria-label="Select all rows"
							/>
						</th>
					{/if}
					{#each columns as column}
						<th class="th" style={column.width ? `width: ${column.width}` : ''}>
							{#if column.sortable}
								<button
									type="button"
									class="th-button"
									onclick={() => handleSort(column.key)}
								>
									{column.label}
									{#if sortKey === column.key}
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											{#if sortDirection === 'asc'}
												<polyline points="18 15 12 9 6 15" />
											{:else}
												<polyline points="6 9 12 15 18 9" />
											{/if}
										</svg>
									{/if}
								</button>
							{:else}
								{column.label}
			{/if}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each sortedRows() as row (row.id)}
					<tr class="tr" class:tr-selected={selectedRows.includes(row.id)}>
						{#if selectable}
							<td class="td td-checkbox">
								<input
									type="checkbox"
									checked={selectedRows.includes(row.id)}
									onchange={() => toggleRow(row.id)}
									aria-label={`Select row ${row.id}`}
								/>
							</td>
						{/if}
						{#each columns as column}
							<td class="td">{row[column.key]}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.datatable {
		width: 100%;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--glass-shadow);
		overflow: hidden;
	}

	.datatable-wrapper {
		overflow-x: auto;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-sm);
	}

	.th {
		padding: var(--spacing-4);
		text-align: left;
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-700);
		background: var(--glass-bg-hover);
		border-bottom: 2px solid var(--glass-border);
		white-space: nowrap;
	}

	@media (prefers-color-scheme: dark) {
		.th {
			color: var(--color-neutral-300);
		}
	}

	.th-checkbox {
		width: 40px;
		text-align: center;
	}

	.th-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: 0;
		background: transparent;
		border: none;
		font: inherit;
		color: inherit;
		cursor: pointer;
		transition: color var(--transition-fast);
	}

	.th-button:hover {
		color: var(--color-primary-600);
	}

	.th-button:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}

	.tr {
		transition: background-color var(--transition-fast);
	}

	.tr:hover {
		background: var(--glass-bg-hover);
	}

	.tr-selected {
		background: rgba(168, 85, 247, 0.08);
	}

	.td {
		padding: var(--spacing-4);
		border-bottom: 1px solid var(--glass-border);
		color: var(--color-neutral-900);
	}

	@media (prefers-color-scheme: dark) {
		.td {
			color: var(--color-neutral-100);
		}
	}

	.td-checkbox {
		text-align: center;
	}

	.tr:last-child .td {
		border-bottom: none;
	}

	input[type="checkbox"] {
		width: 18px;
		height: 18px;
		cursor: pointer;
		accent-color: var(--color-primary-500);
	}
</style>
