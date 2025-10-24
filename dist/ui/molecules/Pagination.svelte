<script lang="ts">
	interface Props {
		currentPage: number;
		totalPages: number;
		onPageChange?: (page: number) => void;
		showFirstLast?: boolean;
		maxVisible?: number;
	}

	let {
		currentPage = $bindable(1),
		totalPages,
		onPageChange,
		showFirstLast = true,
		maxVisible = 7
	}: Props = $props();

	function getPageNumbers(): (number | string)[] {
		if (totalPages <= maxVisible) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const pages: (number | string)[] = [];
		const halfVisible = Math.floor(maxVisible / 2);

		if (currentPage <= halfVisible + 1) {
			for (let i = 1; i <= maxVisible - 2; i++) {
				pages.push(i);
			}
			pages.push('...');
			pages.push(totalPages);
		} else if (currentPage >= totalPages - halfVisible) {
			pages.push(1);
			pages.push('...');
			for (let i = totalPages - (maxVisible - 3); i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);
			pages.push('...');
			for (let i = currentPage - halfVisible + 2; i <= currentPage + halfVisible - 2; i++) {
				pages.push(i);
			}
			pages.push('...');
			pages.push(totalPages);
		}

		return pages;
	}

	function handlePageChange(page: number) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			currentPage = page;
			onPageChange?.(page);
		}
	}

	const pageNumbers = $derived(getPageNumbers());
</script>

<nav class="pagination" aria-label="Pagination">
	<ul class="pagination-list">
		{#if showFirstLast}
			<li>
				<button
					type="button"
					class="page-button"
					onclick={() => handlePageChange(1)}
					disabled={currentPage === 1}
					aria-label="First page"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
					</svg>
				</button>
			</li>
		{/if}

		<li>
			<button
				type="button"
				class="page-button"
				onclick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label="Previous page"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M15 18l-6-6 6-6" />
				</svg>
			</button>
		</li>

		{#each pageNumbers as page}
			<li>
				{#if typeof page === 'number'}
					<button
						type="button"
						class="page-button"
						class:active={page === currentPage}
						onclick={() => handlePageChange(page)}
						aria-label="Page {page}"
						aria-current={page === currentPage ? 'page' : undefined}
					>
						{page}
					</button>
				{:else}
					<span class="page-ellipsis">{page}</span>
				{/if}
			</li>
		{/each}

		<li>
			<button
				type="button"
				class="page-button"
				onclick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label="Next page"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M9 18l6-6-6-6" />
				</svg>
			</button>
		</li>

		{#if showFirstLast}
			<li>
				<button
					type="button"
					class="page-button"
					onclick={() => handlePageChange(totalPages)}
					disabled={currentPage === totalPages}
					aria-label="Last page"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M13 19l7-7-7-7M6 19l7-7-7-7" />
					</svg>
				</button>
			</li>
		{/if}
	</ul>
</nav>

<style>
	.pagination {
		display: flex;
		justify-content: center;
	}

	.pagination-list {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.page-button {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		height: 36px;
		padding: 0 var(--spacing-2);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-neutral-300);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.page-button:hover:not(:disabled) {
		border-color: var(--color-primary-500);
		background: rgba(139, 92, 246, 0.1);
		color: var(--color-primary-400);
	}

	.page-button.active {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		border-color: var(--color-primary-500);
		color: white;
	}

	.page-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.page-ellipsis {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		height: 36px;
		color: var(--color-neutral-500);
		font-size: var(--font-size-sm);
	}
</style>
