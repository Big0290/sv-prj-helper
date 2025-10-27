<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { AccordionProps } from './Accordion.types.js';

	let { title, open = $bindable(false), children  }: AccordionProps = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<div class="accordion">
	<button
		type="button"
		class="accordion-trigger"
		onclick={() => open = !open}
		onkeydown={handleKeydown}
		aria-expanded={open}
	>
		<span class="accordion-title">{title}</span>
		<svg class="accordion-icon" class:accordion-icon-open={open} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</button>
	{#if open}
		<div class="accordion-content">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.accordion {
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.accordion-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-4);
		background: transparent;
		border: none;
		font-family: inherit;
		text-align: left;
		cursor: pointer;
		transition: background-color var(--transition-fast);
	}

	.accordion-trigger:hover {
		background: var(--glass-bg-hover);
	}

	.accordion-title {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-900);
	}

	@media (prefers-color-scheme: dark) {
		.accordion-title {
			color: var(--color-neutral-50);
		}
	}

	.accordion-icon {
		transition: transform var(--transition-base);
		color: var(--color-neutral-600);
	}

	.accordion-icon-open {
		transform: rotate(180deg);
	}

	.accordion-content {
		padding: var(--spacing-4);
		animation: slideDown var(--transition-base);
	}

	@keyframes slideDown {
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
