<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { CardProps } from './Card.types.js';

	let { variant = 'default',
		padding = 'md',
		interactive = false,
		onclick,
		ariaLabel,
		class: className = '',
		children
	 }: CardProps = $props();

	const classes = $derived(
		`card card-${variant} card-padding-${padding} ${interactive ? 'card-interactive' : ''} ${className}`.trim()
	);

	const tag = $derived(interactive || onclick ? 'button' : 'div');
</script>

<svelte:element
	this={tag}
	class={classes}
	{onclick}
	aria-label={ariaLabel}
	role={interactive && !onclick ? 'button' : undefined}
	tabindex={interactive && !onclick ? 0 : undefined}
>
	{@render children()}
</svelte:element>

<style>
	.card {
		display: block;
		width: 100%;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--glass-shadow);
		transition: all var(--transition-base);
	}

	.card-elevated {
		box-shadow: var(--glass-shadow-lg);
	}

	.card-outlined {
		border: 2px solid var(--color-primary-300);
	}

	/* Padding variants */
	.card-padding-sm {
		padding: var(--spacing-4);
	}

	.card-padding-md {
		padding: var(--spacing-6);
	}

	.card-padding-lg {
		padding: var(--spacing-8);
	}

	/* Interactive state */
	.card-interactive {
		cursor: pointer;
		text-align: left;
		font: inherit;
		color: inherit;
		background: var(--glass-bg);
	}

	.card-interactive:hover {
		background: var(--glass-bg-hover);
		box-shadow: var(--glass-shadow-lg);
		transform: translateY(-2px);
	}

	.card-interactive:active {
		transform: translateY(0);
	}

	.card-interactive:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.card-padding-lg {
			padding: var(--spacing-6);
		}
	}
</style>
