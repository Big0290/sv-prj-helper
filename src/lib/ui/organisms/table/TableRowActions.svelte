<script lang="ts">
	interface Action {
		id: string;
		label: string;
		icon?: string;
		variant?: 'default' | 'danger';
		onClick: () => void;
	}

	interface Props {
		actions?: Action[];
	}

	let { actions = [] }: Props = $props();
	let isOpen = $state(false);
</script>

<div class="table-row-actions">
	<button
		type="button"
		class="actions-trigger"
		onclick={() => (isOpen = !isOpen)}
		aria-label="Row actions"
		aria-expanded={isOpen}
	>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="1" />
			<circle cx="12" cy="5" r="1" />
			<circle cx="12" cy="19" r="1" />
		</svg>
	</button>

	{#if isOpen}
		<div class="actions-menu">
			{#each actions as action}
				<button
					type="button"
					class="action-item"
					class:danger={action.variant === 'danger'}
					onclick={() => {
						action.onClick();
						isOpen = false;
					}}
				>
					{#if action.icon}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
	.table-row-actions {
		position: relative;
	}

	.actions-trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.actions-trigger:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--glass-border);
		color: var(--color-neutral-200);
	}

	.actions-menu {
		position: absolute;
		right: 0;
		top: calc(100% + var(--spacing-1));
		min-width: 180px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow-xl);
		padding: var(--spacing-2);
		z-index: 100;
		animation: menuSlide 0.15s ease-out;
	}

	@keyframes menuSlide {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(-4px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.action-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		width: 100%;
		padding: var(--spacing-2) var(--spacing-3);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		color: var(--color-neutral-200);
		font-size: var(--font-size-sm);
		text-align: left;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.action-item:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--glass-border);
	}

	.action-item.danger {
		color: var(--color-danger-400);
	}

	.action-item.danger:hover {
		background: rgba(var(--color-danger-rgb), 0.1);
		border-color: var(--color-danger-500);
	}
</style>
