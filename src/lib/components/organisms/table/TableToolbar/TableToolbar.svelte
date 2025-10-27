<script lang="ts">
	interface Action {
		id: string;
		label: string;
		icon?: string;
		variant?: 'default' | 'primary' | 'danger';
		onClick: () => void;
	}

	import type { TableToolbarProps } from './TableToolbar.types.js';

	let { title,
		searchPlaceholder = 'Search...',
		searchValue = $bindable(''),
		onSearch,
		actions = [],
		showSearch = true
	 }: TableToolbarProps = $props();

	function handleSearchInput(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		searchValue = value;
		onSearch?.(value);
	}

	function clearSearch() {
		searchValue = '';
		onSearch?.('');
	}
</script>

<div class="table-toolbar">
	<div class="toolbar-left">
		{#if title}
			<h3 class="toolbar-title">{title}</h3>
		{/if}
		{#if showSearch}
			<div class="search-container">
				<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
				<input
					type="text"
					class="search-input"
					placeholder={searchPlaceholder}
					value={searchValue}
					oninput={handleSearchInput}
				/>
				{#if searchValue}
					<button type="button" class="clear-btn" onclick={clearSearch} aria-label="Clear search">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				{/if}
			</div>
		{/if}
	</div>

	{#if actions.length > 0}
		<div class="toolbar-actions">
			{#each actions as action}
				<button
					type="button"
					class="action-btn"
					class:primary={action.variant === 'primary'}
					class:danger={action.variant === 'danger'}
					onclick={action.onClick}
				>
					{#if action.icon}
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d={action.icon} />
						</svg>
					{/if}
					<span>{action.label}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.table-toolbar {
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

	.toolbar-left {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		flex: 1;
		min-width: 200px;
	}

	.toolbar-title {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-100);
		white-space: nowrap;
	}

	.search-container {
		position: relative;
		flex: 1;
		max-width: 400px;
	}

	.search-icon {
		position: absolute;
		left: var(--spacing-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-neutral-400);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--spacing-3) var(--spacing-10) var(--spacing-3) var(--spacing-10);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-100);
		font-size: var(--font-size-sm);
		transition: all var(--transition-fast);
	}

	.search-input::placeholder {
		color: var(--color-neutral-500);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary-500);
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}

	.clear-btn {
		position: absolute;
		right: var(--spacing-3);
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: var(--radius-full);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.clear-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-neutral-200);
	}

	.toolbar-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		flex-wrap: wrap;
	}

	.action-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-4);
		background: transparent;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-200);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--color-primary-500);
		color: var(--color-neutral-100);
	}

	.action-btn.primary {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		border-color: var(--color-primary-500);
		color: white;
	}

	.action-btn.primary:hover {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
	}

	.action-btn.danger {
		border-color: var(--color-danger-500);
		color: var(--color-danger-400);
	}

	.action-btn.danger:hover {
		background: rgba(var(--color-danger-rgb), 0.1);
		border-color: var(--color-danger-400);
		color: var(--color-danger-300);
	}

	@media (max-width: 640px) {
		.toolbar-left {
			flex-direction: column;
			align-items: stretch;
			width: 100%;
		}

		.search-container {
			max-width: none;
		}

		.toolbar-actions {
			width: 100%;
			justify-content: stretch;
		}

		.action-btn {
			flex: 1;
			justify-content: center;
		}
	}
</style>
