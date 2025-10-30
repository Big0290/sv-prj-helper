<script module lang="ts">
export interface Tab {
		id: string;
		label: string;
		icon?: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	

	interface Props {
		tabs: Tab[];
		activeTab?: string;
		variant?: 'default' | 'pills' | 'underline';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		onTabChange?: (tabId: string) => void;
	}

	let {
		tabs,
		activeTab = $bindable(tabs[0]?.id),
		variant = 'pills',
		size = 'md',
		fullWidth = false,
		onTabChange
	}: Props = $props();

	function handleTabClick(tab: Tab) {
		if (tab.disabled) return;
		activeTab = tab.id;
		onTabChange?.(tab.id);
	}
</script>

<div class="tabs" class:full-width={fullWidth} data-variant={variant} data-size={size} role="tablist">
	{#each tabs as tab}
		<button
			type="button"
			class="tab"
			class:active={activeTab === tab.id}
			class:disabled={tab.disabled}
			onclick={() => handleTabClick(tab)}
			disabled={tab.disabled}
			aria-selected={activeTab === tab.id}
			role="tab"
		>
			{#if tab.icon}
				<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d={tab.icon} />
				</svg>
			{/if}
			<span>{tab.label}</span>
		</button>
	{/each}
</div>

<style>
	.tabs {
		display: flex;
		gap: var(--spacing-2);
		overflow-x: auto;
		scrollbar-width: thin;
		margin-bottom: var(--spacing-6);
	}

	.tabs.full-width {
		display: grid;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
	}

	.tab {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-5);
		background: transparent;
		border: none;
		color: var(--color-neutral-600);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-normal);
		white-space: nowrap;
		position: relative;
		border-radius: var(--radius-md);
	}

	/* Size variants */
	.tabs[data-size="sm"] .tab {
		padding: var(--spacing-2) var(--spacing-3);
		font-size: var(--font-size-xs);
	}

	.tabs[data-size="lg"] .tab {
		padding: var(--spacing-4) var(--spacing-6);
		font-size: var(--font-size-base);
	}

	/* Default variant */
	.tabs[data-variant="default"] {
		border-bottom: 1px solid var(--color-neutral-200);
	}

	.tabs[data-variant="default"] .tab {
		border-radius: 0;
		border-bottom: 2px solid transparent;
	}

	.tabs[data-variant="default"] .tab.active {
		color: var(--color-primary-600);
		border-bottom-color: var(--color-primary-600);
	}

	/* Pills variant */
	.tabs[data-variant="pills"] {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		padding: var(--spacing-2);
		border-radius: var(--radius-lg);
		border: 1px solid var(--glass-border);
	}

	.tabs[data-variant="pills"] .tab.active {
		background: var(--color-primary-600);
		color: white;
		box-shadow: var(--shadow-sm);
	}

	/* Underline variant */
	.tabs[data-variant="underline"] .tab.active {
		color: var(--color-primary-600);
	}

	.tabs[data-variant="underline"] .tab.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: var(--spacing-3);
		right: var(--spacing-3);
		height: 2px;
		background: var(--color-primary-600);
		border-radius: 2px 2px 0 0;
	}

	.tab:hover:not(.disabled):not(.active) {
		color: var(--color-primary-500);
	}

	.tabs[data-variant="pills"] .tab:hover:not(.disabled):not(.active),
	.tabs[data-variant="underline"] .tab:hover:not(.disabled):not(.active) {
		background: var(--color-neutral-100);
	}

	.tab.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.icon {
		width: 1.25em;
		height: 1.25em;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.tabs:not(.full-width) {
			overflow-x: auto;
		}
		
		.tabs[data-size="lg"] .tab {
			padding: var(--spacing-3) var(--spacing-4);
		}
	}
</style>
