<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'submit' | 'reset';
		href?: string;
		target?: '_blank' | '_self' | '_parent' | '_top';
		rel?: string;
		ariaLabel?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		type = 'button',
		href,
		target,
		rel,
		ariaLabel,
		onclick,
		children
	}: Props = $props();

	const classes = $derived(
		`btn btn-${variant} btn-${size} ${disabled || loading ? 'btn-disabled' : ''}`
	);

	// Determine if this should be a link or button
	const isLink = $derived(!!href && !disabled && !loading);
	
	// Set default rel for external links
	const linkRel = $derived(() => {
		if (target === '_blank' && !rel) {
			return 'noopener noreferrer';
		}
		return rel;
	});
</script>

{#if isLink}
	<a
		{href}
		{target}
		rel={linkRel()}
		class={classes}
		aria-label={ariaLabel}
		onclick={onclick}
	>
		<span>
			{@render children()}
		</span>
	</a>
{:else}
	<button
		{type}
		class={classes}
		disabled={disabled || loading}
		aria-label={ariaLabel}
		aria-busy={loading}
		onclick={onclick}
	>
		{#if loading}
			<span class="btn-spinner" aria-hidden="true"></span>
		{/if}
		<span class:btn-content-loading={loading}>
			{@render children()}
		</span>
	</button>
{/if}

<style>
	.btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		font-family: var(--font-sans);
		font-weight: var(--font-weight-semibold);
		border: none;
		cursor: pointer;
		transition: all var(--transition-base);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid var(--glass-border);
		user-select: none;
		text-decoration: none;
		box-sizing: border-box;
	}

	/* Sizes */
	.btn-sm {
		padding: var(--spacing-2) var(--spacing-4);
		font-size: var(--font-size-sm);
		border-radius: var(--radius-md);
		min-height: 32px;
	}

	.btn-md {
		padding: var(--spacing-3) var(--spacing-6);
		font-size: var(--font-size-base);
		border-radius: var(--radius-lg);
		min-height: 44px;
	}

	.btn-lg {
		padding: var(--spacing-4) var(--spacing-8);
		font-size: var(--font-size-lg);
		border-radius: var(--radius-xl);
		min-height: 52px;
	}

	/* Variants */
	.btn-primary {
		background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
		color: white;
		box-shadow: var(--glass-shadow);
	}

	.btn-primary:hover:not(.btn-disabled) {
		background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%);
		box-shadow: var(--glass-shadow-lg);
		transform: translateY(-1px);
	}

	.btn-primary:active:not(.btn-disabled) {
		transform: translateY(0);
	}

	.btn-secondary {
		background: var(--glass-bg);
		color: var(--color-primary-700);
		box-shadow: var(--glass-shadow);
	}

	.btn-secondary:hover:not(.btn-disabled) {
		background: var(--glass-bg-hover);
		box-shadow: var(--glass-shadow-lg);
		transform: translateY(-1px);
	}

	.btn-ghost {
		background: transparent;
		color: var(--color-primary-600);
		border-color: transparent;
	}

	.btn-ghost:hover:not(.btn-disabled) {
		background: var(--glass-bg);
	}

	.btn-danger {
		background: linear-gradient(135deg, var(--color-error) 0%, #dc2626 100%);
		color: white;
		box-shadow: var(--glass-shadow);
	}

	.btn-danger:hover:not(.btn-disabled) {
		background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
		box-shadow: var(--glass-shadow-lg);
		transform: translateY(-1px);
	}

	/* Disabled state */
	.btn-disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Loading state */
	.btn-spinner {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.btn-content-loading {
		opacity: 0.7;
	}

	/* Focus visible */
	.btn:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}
</style>

