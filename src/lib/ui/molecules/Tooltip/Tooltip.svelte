<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		content: string;
		placement?: 'top' | 'bottom' | 'left' | 'right';
		children: Snippet;
	}

	let { content, placement = 'top', children }: Props = $props();
	let showTooltip = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			showTooltip = !showTooltip;
		} else if (e.key === 'Escape') {
			e.preventDefault();
			showTooltip = false;
		}
	}
</script>

<div 
	class="tooltip-wrapper" 
	role="button" 
	tabindex="0" 
	onmouseenter={() => showTooltip = true} 
	onmouseleave={() => showTooltip = false}
	onkeydown={handleKeydown}
	onfocus={() => showTooltip = true}
	onblur={() => showTooltip = false}
>
	{@render children()}
	{#if showTooltip}
		<div class="tooltip tooltip-{placement}" role="tooltip">
			{content}
		</div>
	{/if}
</div>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip {
		position: absolute;
		padding: var(--spacing-2) var(--spacing-3);
		background: var(--color-neutral-900);
		color: white;
		font-size: var(--font-size-sm);
		border-radius: var(--radius-md);
		white-space: nowrap;
		z-index: var(--z-tooltip);
		pointer-events: none;
		animation: fadeIn var(--transition-fast);
	}

	@media (prefers-color-scheme: dark) {
		.tooltip {
			background: var(--color-neutral-100);
			color: var(--color-neutral-900);
		}
	}

	.tooltip-top {
		bottom: calc(100% + var(--spacing-2));
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip-bottom {
		top: calc(100% + var(--spacing-2));
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip-left {
		right: calc(100% + var(--spacing-2));
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltip-right {
		left: calc(100% + var(--spacing-2));
		top: 50%;
		transform: translateY(-50%);
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
