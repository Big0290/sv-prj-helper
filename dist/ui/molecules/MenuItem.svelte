<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		icon?: Snippet;
		disabled?: boolean;
		danger?: boolean;
		onclick?: () => void;
		[key: string]: any;
	}

	let {
		children,
		icon,
		disabled = false,
		danger = false,
		onclick,
		...restProps
	}: Props = $props();
</script>

<button
	type="button"
	class="menu-item"
	class:disabled
	class:danger
	role="menuitem"
	{disabled}
	{onclick}
	{...restProps}
>
	{#if icon}
		<span class="menu-item-icon">
			{@render icon()}
		</span>
	{/if}
	<span class="menu-item-content">
		{#if children}
			{@render children()}
		{/if}
	</span>
</button>

<style>
	.menu-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-2) var(--spacing-3);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		text-align: left;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.menu-item:hover:not(:disabled) {
		background: var(--bg-tertiary);
	}

	.menu-item:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: -2px;
	}

	.menu-item.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.menu-item.danger {
		color: var(--color-error);
	}

	.menu-item.danger:hover:not(:disabled) {
		background: color-mix(in srgb, var(--color-error) 10%, transparent);
	}

	.menu-item-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.menu-item-content {
		flex: 1;
	}
</style>
