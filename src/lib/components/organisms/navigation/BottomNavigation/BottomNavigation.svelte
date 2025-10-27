<script module lang="ts">
export interface NavItem {
		id: string;
		label: string;
		icon: string;
		badge?: number;
		onClick?: () => void;
	}
</script>

<script lang="ts">
	

	import type { BottomNavigationProps } from './BottomNavigation.types.js';

	let { items,
		active = $bindable(items[0]?.id),
		onItemClick
	 }: BottomNavigationProps = $props();

	function handleClick(item: NavItem) {
		active = item.id;
		item.onClick?.();
		onItemClick?.(item);
	}
</script>

<nav class="bottom-nav">
	{#each items as item}
		<button
			type="button"
			class="nav-item"
			class:active={active === item.id}
			onclick={() => handleClick(item)}
			aria-current={active === item.id ? 'page' : undefined}
		>
			<div class="icon-wrapper">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d={item.icon} />
				</svg>
				{#if item.badge}
					<span class="badge">{item.badge > 99 ? '99+' : item.badge}</span>
				{/if}
			</div>
			<span class="label">{item.label}</span>
		</button>
	{/each}
</nav>

<style>
	.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; display: flex; background: var(--glass-bg); backdrop-filter: var(--glass-blur); border-top: 1px solid var(--glass-border); z-index: 100; padding: var(--spacing-2) 0; }
	.nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: var(--spacing-1); background: none; border: none; padding: var(--spacing-2); color: var(--color-neutral-600); cursor: pointer; transition: color var(--transition-fast); }
	.nav-item:hover { color: var(--color-neutral-800); }
	.nav-item.active { color: var(--color-primary-600); }
	.icon-wrapper { position: relative; }
	.badge { position: absolute; top: -8px; right: -8px; min-width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; background: var(--color-error-600); color: white; border-radius: var(--radius-full); font-size: 10px; font-weight: var(--font-weight-bold); padding: 0 4px; }
	.label { font-size: var(--font-size-xs); font-weight: var(--font-weight-medium); }
	@media (prefers-color-scheme: dark) {
		.nav-item { color: var(--color-neutral-400); }
		.nav-item:hover { color: var(--color-neutral-200); }
	}
</style>
