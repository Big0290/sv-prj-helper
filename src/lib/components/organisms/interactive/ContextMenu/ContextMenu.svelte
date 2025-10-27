<script module lang="ts">
export interface ContextMenuItem {
		id: string;
		label: string;
		icon?: string;
		shortcut?: string;
		disabled?: boolean;
		danger?: boolean;
		divider?: boolean;
		action?: () => void;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	

	import type { ContextMenuProps } from './ContextMenu.types.js';

	let { children, items, onItemClick  }: ContextMenuProps = $props();

	let isOpen = $state(false);
	let position = $state({ x: 0, y: 0 });
	let menuEl = $state<HTMLElement>();

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		isOpen = true;
		position = { x: e.clientX, y: e.clientY };

		setTimeout(() => {
			if (menuEl) {
				const rect = menuEl.getBoundingClientRect();
				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;

				if (rect.right > viewportWidth) {
					position.x = viewportWidth - rect.width - 8;
				}
				if (rect.bottom > viewportHeight) {
					position.y = viewportHeight - rect.height - 8;
				}
			}
		}, 0);
	}

	$effect(() => {
		if (!isOpen) return;

		const handleClick = () => {
			isOpen = false;
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				isOpen = false;
			}
		};

		document.addEventListener('click', handleClick);
		document.addEventListener('contextmenu', handleClick);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('click', handleClick);
			document.removeEventListener('contextmenu', handleClick);
			document.removeEventListener('keydown', handleEscape);
		};
	});

	function handleItemClick(item: ContextMenuItem) {
		if (item.disabled || item.divider) return;
		item.action?.();
		onItemClick?.(item);
		isOpen = false;
	}
</script>

<div 
	class="context-menu-wrapper" 
	oncontextmenu={handleContextMenu}
	role="application"
	aria-label="Context menu area"
>
	{@render children()}
</div>

{#if isOpen}
	<div
		bind:this={menuEl}
		class="context-menu"
		style="top: {position.y}px; left: {position.x}px"
		role="menu"
	>
		{#each items as item}
			{#if item.divider}
				<div class="menu-divider" role="separator"></div>
			{:else}
				<button
					type="button"
					class="menu-item"
					class:disabled={item.disabled}
					class:danger={item.danger}
					disabled={item.disabled}
					onclick={() => handleItemClick(item)}
					role="menuitem"
				>
					{#if item.icon}
						<svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d={item.icon} />
						</svg>
					{/if}
					<span class="menu-label">{item.label}</span>
					{#if item.shortcut}
						<kbd class="menu-shortcut">{item.shortcut}</kbd>
					{/if}
				</button>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.context-menu-wrapper {
		display: contents;
	}

	.context-menu {
		position: fixed;
		z-index: 9999;
		min-width: 200px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		padding: var(--spacing-2);
		animation: contextMenuFadeIn 0.1s ease-out;
	}

	@keyframes contextMenuFadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.menu-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-2) var(--spacing-3);
		background: none;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
		color: var(--color-neutral-800);
		font-size: var(--font-size-sm);
	}

	.menu-item:hover:not(:disabled) {
		background: var(--color-neutral-100);
	}

	.menu-item.danger {
		color: var(--color-error-600);
	}

	.menu-item.danger:hover:not(:disabled) {
		background: var(--color-error-50);
	}

	.menu-item:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.menu-icon {
		flex-shrink: 0;
		color: var(--color-neutral-600);
	}

	.menu-item.danger .menu-icon {
		color: var(--color-error-600);
	}

	.menu-label {
		flex: 1;
	}

	.menu-shortcut {
		padding: var(--spacing-1) var(--spacing-2);
		background: var(--color-neutral-100);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		font-family: monospace;
		color: var(--color-neutral-600);
		margin-left: auto;
	}

	.menu-divider {
		height: 1px;
		background: var(--glass-border);
		margin: var(--spacing-2) 0;
	}

	@media (prefers-color-scheme: dark) {
		.menu-item {
			color: var(--color-neutral-100);
		}

		.menu-item:hover:not(:disabled) {
			background: var(--color-neutral-800);
		}

		.menu-shortcut {
			background: var(--color-neutral-800);
			color: var(--color-neutral-300);
		}
	}
</style>
