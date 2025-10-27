<script lang="ts">
	import type { TablePaginationProps } from './TablePagination.types.js';

	let { currentPage = $bindable(1),
		totalPages: providedTotalPages,
		totalItems,
		itemsPerPage = $bindable(10),
		pageSizeOptions = [10, 25, 50, 100],
		onPageChange,
		onPageSizeChange,
		showPageSize = true,
		showInfo = true,
		variant = 'default'
	 }: TablePaginationProps = $props();

	// Calculate total pages based on items and page size
	const totalPages = $derived(providedTotalPages ?? Math.ceil(totalItems / itemsPerPage));

	const startItem = $derived((currentPage - 1) * itemsPerPage + 1);
	const endItem = $derived(Math.min(currentPage * itemsPerPage, totalItems));

	const visiblePages = $derived(() => {
		const pages: (number | string)[] = [];
		const maxVisible = variant === 'compact' ? 3 : 5;
		
		if (totalPages <= maxVisible + 2) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);
			
			let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
			let end = Math.min(totalPages - 1, start + maxVisible - 1);
			
			if (end - start < maxVisible - 1) {
				start = Math.max(2, end - maxVisible + 1);
			}
			
			if (start > 2) pages.push('...');
			
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
			
			if (end < totalPages - 1) pages.push('...');
			pages.push(totalPages);
		}
		
		return pages;
	});

	function goToPage(page: number) {
		if (page < 1 || page > totalPages || page === currentPage) return;
		currentPage = page;
		onPageChange?.(page);
	}

	function handlePageSizeChange(e: Event) {
		const newSize = parseInt((e.target as HTMLSelectElement).value);
		itemsPerPage = newSize;
		currentPage = 1;
		onPageSizeChange?.(newSize);
		onPageChange?.(1);
	}
</script>

<div class="table-pagination" class:variant-simple={variant === 'simple'} class:variant-compact={variant === 'compact'}>
	{#if showInfo && variant !== 'compact'}
		<div class="pagination-info">
			<span>Showing {startItem} to {endItem} of {totalItems} entries</span>
		</div>
	{/if}

	<div class="pagination-controls">
		<button
			type="button"
			class="page-btn"
			onclick={() => goToPage(currentPage - 1)}
			disabled={currentPage === 1}
			aria-label="Previous page"
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15 18 9 12 15 6" />
			</svg>
		</button>

		{#if variant !== 'simple'}
			{#each visiblePages() as page}
				{#if page === '...'}
					<span class="page-ellipsis">...</span>
				{:else}
					<button
						type="button"
						class="page-btn page-number"
						class:active={page === currentPage}
						onclick={() => goToPage(page as number)}
					>
						{page}
					</button>
				{/if}
			{/each}
		{:else}
			<span class="page-text">{currentPage} / {totalPages}</span>
		{/if}

		<button
			type="button"
			class="page-btn"
			onclick={() => goToPage(currentPage + 1)}
			disabled={currentPage === totalPages}
			aria-label="Next page"
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</button>
	</div>

	{#if showPageSize && variant !== 'compact'}
		<div class="page-size-selector">
			<label for="pageSize">
				<span>Show</span>
				<select id="pageSize" value={itemsPerPage} onchange={handlePageSizeChange}>
					{#each pageSizeOptions as size}
						<option value={size}>{size}</option>
					{/each}
				</select>
			</label>
		</div>
	{/if}
</div>

<style>
	.table-pagination {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-4);
		padding: var(--spacing-4);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		flex-wrap: wrap;
	}

	.variant-compact {
		padding: var(--spacing-3);
		gap: var(--spacing-2);
	}

	.pagination-info {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
	}

	.page-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		height: 36px;
		padding: var(--spacing-2);
		background: transparent;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-neutral-300);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.variant-compact .page-btn {
		min-width: 32px;
		height: 32px;
	}

	.page-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--color-primary-500);
		color: var(--color-neutral-100);
	}

	.page-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.page-btn.active {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		border-color: var(--color-primary-500);
		color: white;
	}

	.page-number {
		min-width: 36px;
	}

	.page-ellipsis {
		padding: 0 var(--spacing-2);
		color: var(--color-neutral-500);
		font-size: var(--font-size-sm);
	}

	.page-text {
		padding: 0 var(--spacing-3);
		font-size: var(--font-size-sm);
		color: var(--color-neutral-300);
		font-weight: var(--font-weight-medium);
	}

	.page-size-selector {
		display: flex;
		align-items: center;
	}

	.page-size-selector label {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
	}

	.page-size-selector select {
		padding: var(--spacing-2) var(--spacing-3);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-neutral-200);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.page-size-selector select:hover {
		border-color: var(--color-primary-500);
		background: rgba(255, 255, 255, 0.08);
	}

	.page-size-selector select:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}

	@media (max-width: 640px) {
		.table-pagination {
			flex-direction: column;
			align-items: stretch;
		}

		.pagination-info {
			text-align: center;
		}

		.pagination-controls {
			justify-content: center;
		}

		.page-size-selector {
			justify-content: center;
		}
	}
</style>
