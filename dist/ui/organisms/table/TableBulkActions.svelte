<script lang="ts">
	interface Action {
		id: string;
		label: string;
		icon?: string;
		variant?: 'default' | 'danger';
		onClick: () => void;
	}

	interface Props {
		selectedCount: number;
		actions?: Action[];
		onClear?: () => void;
	}

	let { selectedCount, actions = [], onClear }: Props = $props();
</script>

{#if selectedCount > 0}
	<div class="table-bulk-actions">
		<div class="selected-info">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M9 11l3 3L22 4" />
				<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
			</svg>
			<span><strong>{selectedCount}</strong> {selectedCount === 1 ? 'item' : 'items'} selected</span>
		</div>

		<div class="bulk-actions">
			{#each actions as action}
				<button
					type="button"
					class="bulk-action-btn"
					class:danger={action.variant === 'danger'}
					onclick={action.onClick}
				>
					{#if action.icon}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d={action.icon} />
						</svg>
					{/if}
					{action.label}
				</button>
			{/each}

			{#if onClear}
				<button type="button" class="clear-selection-btn" onclick={onClear} aria-label="Clear selection">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	.table-bulk-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-4);
		padding: var(--spacing-3) var(--spacing-4);
		background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.15), rgba(var(--color-primary-rgb), 0.1));
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--color-primary-500);
		border-radius: var(--radius-lg);
		animation: slideDown 0.2s ease-out;
		flex-wrap: wrap;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.selected-info {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		color: var(--color-primary-200);
		font-size: var(--font-size-sm);
	}

	.selected-info strong {
		font-weight: var(--font-weight-bold);
	}

	.bulk-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		flex-wrap: wrap;
	}

	.bulk-action-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-3);
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-md);
		color: var(--color-neutral-200);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.bulk-action-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-1px);
	}

	.bulk-action-btn.danger {
		border-color: var(--color-danger-500);
		color: var(--color-danger-300);
	}

	.bulk-action-btn.danger:hover {
		background: rgba(var(--color-danger-rgb), 0.15);
		border-color: var(--color-danger-400);
	}

	.clear-selection-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-md);
		color: var(--color-neutral-300);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.clear-selection-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
		color: var(--color-neutral-100);
	}

	@media (max-width: 640px) {
		.table-bulk-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.bulk-actions {
			width: 100%;
			justify-content: stretch;
		}

		.bulk-action-btn {
			flex: 1;
			justify-content: center;
		}
	}
</style>
