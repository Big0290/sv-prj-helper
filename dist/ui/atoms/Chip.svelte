<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		variant?: 'filled' | 'outlined' | 'soft';
		size?: 'sm' | 'base' | 'lg';
		color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
		removable?: boolean;
		disabled?: boolean;
		onRemove?: () => void;
		[key: string]: any;
	}

	let {
		children,
		variant = 'filled',
		size = 'base',
		color = 'primary',
		removable = false,
		disabled = false,
		onRemove,
		...restProps
	}: Props = $props();

	function handleRemove(e: MouseEvent) {
		e.stopPropagation();
		if (!disabled) {
			onRemove?.();
		}
	}
</script>

<span 
	class="chip chip--{variant} chip--{size} chip--{color}"
	class:disabled
	role="status"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
	{#if removable}
		<button
			type="button"
			class="chip-remove"
			onclick={handleRemove}
			disabled={disabled}
			aria-label="Remove"
		>
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12" />
			</svg>
		</button>
	{/if}
</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-2);
		border-radius: var(--radius-full);
		font-weight: var(--font-weight-medium);
		transition: all var(--transition-fast);
	}

	.chip--sm {
		padding: 4px 12px;
		font-size: var(--font-size-xs);
	}

	.chip--base {
		padding: 6px 14px;
		font-size: var(--font-size-sm);
	}

	.chip--lg {
		padding: 8px 16px;
		font-size: var(--font-size-base);
	}

	/* Filled variant */
	.chip--filled.chip--primary {
		background: var(--color-primary);
		color: white;
	}

	.chip--filled.chip--secondary {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.chip--filled.chip--success {
		background: var(--color-success);
		color: white;
	}

	.chip--filled.chip--error {
		background: var(--color-error);
		color: white;
	}

	.chip--filled.chip--warning {
		background: var(--color-warning);
		color: white;
	}

	/* Outlined variant */
	.chip--outlined {
		background: transparent;
		border: 1px solid currentColor;
	}

	.chip--outlined.chip--primary {
		color: var(--color-primary);
	}

	.chip--outlined.chip--secondary {
		color: var(--text-secondary);
	}

	.chip--outlined.chip--success {
		color: var(--color-success);
	}

	.chip--outlined.chip--error {
		color: var(--color-error);
	}

	.chip--outlined.chip--warning {
		color: var(--color-warning);
	}

	/* Soft variant */
	.chip--soft.chip--primary {
		background: color-mix(in srgb, var(--color-primary) 15%, transparent);
		color: var(--color-primary);
	}

	.chip--soft.chip--secondary {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.chip--soft.chip--success {
		background: color-mix(in srgb, var(--color-success) 15%, transparent);
		color: var(--color-success);
	}

	.chip--soft.chip--error {
		background: color-mix(in srgb, var(--color-error) 15%, transparent);
		color: var(--color-error);
	}

	.chip--soft.chip--warning {
		background: color-mix(in srgb, var(--color-warning) 15%, transparent);
		color: var(--color-warning);
	}

	.chip.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.chip-remove {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		border: none;
		background: transparent;
		color: inherit;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity var(--transition-fast);
	}

	.chip-remove:hover:not(:disabled) {
		opacity: 1;
	}

	.chip-remove:disabled {
		cursor: not-allowed;
	}
</style>
