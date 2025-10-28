<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { DropdownProps } from './Dropdown.types.js';

	let { open = $bindable(false),
		children,
		trigger
	 }: DropdownProps = $props();

	function toggleDropdown() {
		open = !open;
	}

	function closeDropdown() {
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			e.preventDefault();
			closeDropdown();
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div 
	class="dropdown" 
	onkeydown={handleKeydown}
	role="application"
	aria-label="Dropdown menu"
>
	<button type="button" class="dropdown-trigger" onclick={toggleDropdown} aria-expanded={open} aria-haspopup="true">
		{@render trigger()}
	</button>
	{#if open}
		<div class="dropdown-menu" role="menu">
			{@render children()}
		</div>
		<button type="button" class="dropdown-backdrop" onclick={closeDropdown} aria-label="Close dropdown"></button>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-trigger {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		font: inherit;
		color: inherit;
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + var(--spacing-2));
		left: 0;
		min-width: 200px;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-lg));
		-webkit-backdrop-filter: blur(var(--glass-blur-lg));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow-lg);
		padding: var(--spacing-2);
		z-index: var(--z-dropdown);
		animation: fadeIn var(--transition-fast);
	}

	.dropdown-backdrop {
		position: fixed;
		inset: 0;
		background: transparent;
		border: none;
		cursor: default;
		z-index: calc(var(--z-dropdown) - 1);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
