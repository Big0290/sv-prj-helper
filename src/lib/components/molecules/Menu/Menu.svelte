<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { MenuProps } from './Menu.types.js';

	let { trigger,
		children,
		open = $bindable(false),
		placement = 'bottom-start',
		onOpenChange,
		...restProps
	 }: MenuProps = $props();

	let menuRef = $state<HTMLDivElement>();
	let triggerRef = $state<HTMLButtonElement>();

	function toggleMenu() {
		open = !open;
		onOpenChange?.(open);
	}

	function closeMenu() {
		open = false;
		onOpenChange?.(false);
	}

	function handleClickOutside(event: MouseEvent) {
		if (menuRef && !menuRef.contains(event.target as Node) && 
		    triggerRef && !triggerRef.contains(event.target as Node)) {
			closeMenu();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
			triggerRef?.focus();
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);
		} else {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="menu-container" {...restProps}>
	<button
		bind:this={triggerRef}
		class="menu-trigger"
		onclick={toggleMenu}
		aria-expanded={open}
		aria-haspopup="true"
		type="button"
	>
		{#if trigger}
			{@render trigger()}
		{:else}
			Menu
		{/if}
	</button>

	{#if open}
		<div 
			bind:this={menuRef}
			class="menu menu--{placement}"
			role="menu"
		>
			{#if children}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>

<style>
	.menu-container {
		position: relative;
		display: inline-block;
	}

	.menu-trigger {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font: inherit;
		color: inherit;
	}

	.menu {
		position: absolute;
		z-index: 1000;
		min-width: 200px;
		padding: var(--spacing-2);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		animation: fadeIn 0.15s ease-out;
	}

	.menu--bottom-start {
		top: calc(100% + 4px);
		left: 0;
	}

	.menu--bottom-end {
		top: calc(100% + 4px);
		right: 0;
	}

	.menu--top-start {
		bottom: calc(100% + 4px);
		left: 0;
	}

	.menu--top-end {
		bottom: calc(100% + 4px);
		right: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
