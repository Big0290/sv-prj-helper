<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/**
		 * Visual variant of the glass card
		 * @default 'default'
		 */
		variant?: 'default' | 'elevated' | 'subtle';
		
		/**
		 * Blur intensity level
		 * @default 'md'
		 */
		blur?: 'sm' | 'md' | 'lg';
		
		/**
		 * Background opacity (0-1)
		 * @default 0.1
		 */
		opacity?: number;
		
		/**
		 * Whether to show glass border
		 * @default true
		 */
		border?: boolean;
		
		/**
		 * Shadow intensity level
		 * @default 'md'
		 */
		shadow?: 'sm' | 'md' | 'lg';
		
		/**
		 * Whether the card is interactive (clickable)
		 * @default false
		 */
		interactive?: boolean;
		
		/**
		 * Internal padding size
		 * @default 'md'
		 */
		padding?: 'sm' | 'md' | 'lg' | 'xl';
		
		/**
		 * Click handler for interactive cards
		 */
		onclick?: (e: MouseEvent) => void;
		
		/**
		 * Accessible label for interactive cards
		 */
		ariaLabel?: string;
		
		/**
		 * Additional CSS classes
		 */
		class?: string;
		
		/**
		 * Card content
		 */
		children: Snippet;
	}

	let {
		variant = 'default',
		blur = 'md',
		opacity = 0.1,
		border = true,
		shadow = 'md',
		interactive = false,
		padding = 'md',
		onclick,
		ariaLabel,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(
		`glass-card glass-card--${variant} glass-card--blur-${blur} glass-card--shadow-${shadow} ${
			interactive ? 'glass-card--interactive' : ''
		} ${border ? 'glass-card--border' : ''} glass-card--padding-${padding} ${className}`.trim()
	);

	const tag = $derived(interactive || onclick ? 'button' : 'div');

	const customOpacity = $derived(opacity !== 0.1 ? `rgba(168, 85, 247, ${opacity})` : null);
</script>

<svelte:element
	this={tag}
	class={classes}
	style={customOpacity ? `--glass-bg-custom: ${customOpacity}; --glass-bg-hover-custom: rgba(168, 85, 247, ${opacity + 0.05}); --glass-bg-active-custom: rgba(168, 85, 247, ${opacity + 0.1})` : ''}
	{onclick}
	aria-label={ariaLabel}
	role={interactive && !onclick ? 'button' : undefined}
	tabindex={interactive && !onclick ? 0 : undefined}
>
	{@render children()}
</svelte:element>

<style>
	.glass-card {
		display: block;
		width: 100%;
		position: relative;
		border-radius: var(--radius-xl);
		transition: all var(--transition-base);
		overflow: hidden;
	}

	/* Base glass effect */
	.glass-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--glass-bg-custom, var(--glass-bg));
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		z-index: -1;
	}

	/* Variant styles */
	.glass-card--default {
		background: var(--glass-bg-custom, var(--glass-bg));
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
	}

	.glass-card--elevated {
		background: var(--glass-bg-custom, var(--glass-bg));
		backdrop-filter: blur(var(--glass-blur-lg));
		-webkit-backdrop-filter: blur(var(--glass-blur-lg));
		transform: translateY(-4px);
	}

	.glass-card--subtle {
		background: rgba(168, 85, 247, 0.05);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	/* Blur levels */
	.glass-card--blur-sm {
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.glass-card--blur-md {
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
	}

	.glass-card--blur-lg {
		backdrop-filter: blur(var(--glass-blur-lg));
		-webkit-backdrop-filter: blur(var(--glass-blur-lg));
	}

	/* Border styles */
	.glass-card--border {
		border: 1px solid var(--glass-border);
	}

	.glass-card--border::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		mask-composite: xor;
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		pointer-events: none;
	}

	/* Shadow levels */
	.glass-card--shadow-sm {
		box-shadow: 0 4px 16px 0 rgba(99, 33, 170, 0.15);
	}

	.glass-card--shadow-md {
		box-shadow: var(--glass-shadow);
	}

	.glass-card--shadow-lg {
		box-shadow: var(--glass-shadow-lg);
	}

	/* Padding variants */
	.glass-card--padding-sm {
		padding: var(--spacing-4);
	}

	.glass-card--padding-md {
		padding: var(--spacing-6);
	}

	.glass-card--padding-lg {
		padding: var(--spacing-8);
	}

	.glass-card--padding-xl {
		padding: var(--spacing-10);
	}

	/* Interactive states */
	.glass-card--interactive {
		cursor: pointer;
		text-align: left;
		font: inherit;
		color: inherit;
		background: var(--glass-bg-custom, var(--glass-bg));
		user-select: none;
	}

	.glass-card--interactive:hover {
		background: var(--glass-bg-hover-custom, var(--glass-bg-hover));
		box-shadow: var(--glass-shadow-lg);
		transform: translateY(-2px);
	}

	.glass-card--interactive:hover.glass-card--elevated {
		transform: translateY(-6px);
		box-shadow: 0 20px 60px 0 rgba(99, 33, 170, 0.4);
	}

	.glass-card--interactive:active {
		background: var(--glass-bg-active-custom, var(--glass-bg-active));
		transform: translateY(-1px);
	}

	.glass-card--interactive:active.glass-card--elevated {
		transform: translateY(-2px);
	}

	.glass-card--interactive:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}

	/* Hover glow effect */
	.glass-card--interactive::before {
		transition: opacity var(--transition-base);
		opacity: 0;
	}

	.glass-card--interactive:hover::before {
		opacity: 1;
		background: radial-gradient(
			circle at center,
			rgba(168, 85, 247, 0.1) 0%,
			transparent 70%
		);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.glass-card--padding-lg {
			padding: var(--spacing-6);
		}
		
		.glass-card--padding-xl {
			padding: var(--spacing-8);
		}

		.glass-card--interactive:hover {
			transform: translateY(-1px);
		}

		.glass-card--interactive:hover.glass-card--elevated {
			transform: translateY(-3px);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.glass-card,
		.glass-card--interactive:hover,
		.glass-card--interactive:active {
			transform: none;
			transition: background-color var(--transition-fast), box-shadow var(--transition-fast);
		}
	}

	/* Dark mode adjustments */
	@media (prefers-color-scheme: dark) {
		.glass-card--border::after {
			background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
		}

		.glass-card--interactive:hover::before {
			background: radial-gradient(
				circle at center,
				rgba(168, 85, 247, 0.15) 0%,
				transparent 70%
			);
		}
	}
</style>