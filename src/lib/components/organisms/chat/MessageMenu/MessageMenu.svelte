<script lang="ts">
	import type { MessageMenuProps } from './MessageMenu.types.js';

	interface MenuItem {
		id: string;
		label: string;
		icon: string;
		variant?: 'default' | 'danger';
		disabled?: boolean;
	}

	let {
		open = false,
		onClose,
		onItemClick,
		items = [],
		position = { x: 0, y: 0 }
	}: MessageMenuProps = $props();

	const defaultItems: MenuItem[] = [
		{ id: 'reply', label: 'Reply', icon: 'reply' },
		{ id: 'forward', label: 'Forward', icon: 'forward' },
		{ id: 'copy', label: 'Copy', icon: 'copy' },
		{ id: 'edit', label: 'Edit', icon: 'edit' },
		{ id: 'pin', label: 'Pin', icon: 'pin' },
		{ id: 'star', label: 'Star', icon: 'star' },
		{ id: 'delete', label: 'Delete', icon: 'delete', variant: 'danger' }
	];

	const menuItems = items.length > 0 ? items : defaultItems;

	function handleItemClick(itemId: string, disabled?: boolean) {
		if (disabled) return;
		onItemClick?.(itemId);
		onClose?.();
	}

	function handleClickOutside(event: MouseEvent) {
		if (open && event.target instanceof HTMLElement) {
			const menu = document.querySelector('.message-menu');
			if (menu && !menu.contains(event.target)) {
				onClose?.();
			}
		}
	}

	function getIcon(iconName: string) {
		const icons: Record<string, string> = {
			reply: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
			forward: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9',
			copy: 'M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H10m0 0l3-3m-3 3l3 3',
			edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
			pin: 'M16 7V3H8v4H6v6h2v8h2v-8h4v8h2v-8h2V7h-2z',
			star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
			delete: 'M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16'
		};
		return icons[iconName] || icons.reply;
	}

	$effect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	});
</script>

{#if open}
	<div
		class="message-menu"
		style="left: {position.x}px; top: {position.y}px;"
	>
		<div class="menu-items">
			{#each menuItems as item (item.id)}
				<button
					type="button"
					class="menu-item"
					class:danger={item.variant === 'danger'}
					class:disabled={item.disabled}
					onclick={() => handleItemClick(item.id, item.disabled)}
					disabled={item.disabled}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d={getIcon(item.icon)} />
					</svg>
					<span>{item.label}</span>
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.message-menu {
		position: fixed;
		z-index: 10000;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow-xl);
		padding: var(--spacing-2);
		min-width: 200px;
		animation: menuSlide 0.15s ease-out;
	}

	@keyframes menuSlide {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(-8px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.menu-items {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-2) var(--spacing-3);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		color: var(--color-neutral-200);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
		width: 100%;
	}

	.menu-item:hover:not(.disabled) {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--color-primary-500);
		color: var(--color-neutral-100);
	}

	.menu-item.danger {
		color: var(--color-danger-400);
	}

	.menu-item.danger:hover:not(.disabled) {
		background: rgba(var(--color-danger-rgb), 0.1);
		border-color: var(--color-danger-500);
		color: var(--color-danger-300);
	}

	.menu-item.disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.menu-item svg {
		flex-shrink: 0;
	}

	.menu-item span {
		flex: 1;
	}
</style>
