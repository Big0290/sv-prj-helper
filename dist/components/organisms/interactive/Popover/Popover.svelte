<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { PopoverProps } from './Popover.types.js';

	let { children,
		content,
		isOpen = $bindable(false),
		placement = 'bottom',
		trigger = 'click',
		variant = 'default',
		arrow = true,
		offset = 8,
		closeOnClickOutside = true,
		onOpenChange
	 }: PopoverProps = $props();

	let triggerEl = $state<HTMLElement>();
	let popoverEl = $state<HTMLElement>();
	let position = $state({ top: 0, left: 0 });

	function updatePosition() {
		if (!triggerEl || !popoverEl) return;

		const triggerRect = triggerEl.getBoundingClientRect();
		const popoverRect = popoverEl.getBoundingClientRect();
		let top = 0;
		let left = 0;

		switch (placement) {
			case 'top':
				top = triggerRect.top - popoverRect.height - offset;
				left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
				break;
			case 'top-start':
				top = triggerRect.top - popoverRect.height - offset;
				left = triggerRect.left;
				break;
			case 'top-end':
				top = triggerRect.top - popoverRect.height - offset;
				left = triggerRect.right - popoverRect.width;
				break;
			case 'bottom':
				top = triggerRect.bottom + offset;
				left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
				break;
			case 'bottom-start':
				top = triggerRect.bottom + offset;
				left = triggerRect.left;
				break;
			case 'bottom-end':
				top = triggerRect.bottom + offset;
				left = triggerRect.right - popoverRect.width;
				break;
			case 'left':
				top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
				left = triggerRect.left - popoverRect.width - offset;
				break;
			case 'right':
				top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
				left = triggerRect.right + offset;
				break;
		}

		position = { top, left };
	}

	$effect(() => {
		if (isOpen) {
			updatePosition();
			window.addEventListener('resize', updatePosition);
			window.addEventListener('scroll', updatePosition, true);
			return () => {
				window.removeEventListener('resize', updatePosition);
				window.removeEventListener('scroll', updatePosition, true);
			};
		}
	});

	$effect(() => {
		if (!closeOnClickOutside || !isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (
				triggerEl &&
				popoverEl &&
				!triggerEl.contains(e.target as Node) &&
				!popoverEl.contains(e.target as Node)
			) {
				isOpen = false;
				onOpenChange?.(false);
			}
		};

		setTimeout(() => {
			document.addEventListener('click', handleClickOutside);
		}, 0);

		return () => document.removeEventListener('click', handleClickOutside);
	});

	function handleTriggerClick() {
		if (trigger === 'click') {
			isOpen = !isOpen;
			onOpenChange?.(isOpen);
		}
	}

	function handleMouseEnter() {
		if (trigger === 'hover') {
			isOpen = true;
			onOpenChange?.(true);
		}
	}

	function handleMouseLeave() {
		if (trigger === 'hover') {
			isOpen = false;
			onOpenChange?.(false);
		}
	}
</script>

<div class="popover-wrapper">
	<div
		bind:this={triggerEl}
		class="popover-trigger"
		onclick={handleTriggerClick}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleTriggerClick()}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		role="button"
		tabindex="0"
		aria-label="Open popover"
	>
		{@render children()}
	</div>

	{#if isOpen}
		<div
			bind:this={popoverEl}
			class="popover"
			data-variant={variant}
			data-placement={placement}
			style="top: {position.top}px; left: {position.left}px"
			role="dialog"
		>
			{#if arrow}
				<div class="popover-arrow" data-placement={placement}></div>
			{/if}
			<div class="popover-content">
				{@render content()}
			</div>
		</div>
	{/if}
</div>

<style>
	.popover-wrapper {
		position: relative;
		display: inline-block;
	}

	.popover-trigger {
		cursor: pointer;
	}

	.popover {
		position: fixed;
		z-index: 9999;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		animation: popoverFadeIn 0.15s ease-out;
		max-width: 320px;
	}

	@keyframes popoverFadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.popover-content {
		padding: var(--spacing-4);
	}

	.popover-arrow {
		position: absolute;
		width: 12px;
		height: 12px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		transform: rotate(45deg);
	}

	.popover-arrow[data-placement="top"],
	.popover-arrow[data-placement="top-start"],
	.popover-arrow[data-placement="top-end"] {
		bottom: -7px;
		border-top: none;
		border-left: none;
	}

	.popover-arrow[data-placement="bottom"],
	.popover-arrow[data-placement="bottom-start"],
	.popover-arrow[data-placement="bottom-end"] {
		top: -7px;
		border-bottom: none;
		border-right: none;
	}

	.popover-arrow[data-placement="left"] {
		right: -7px;
		border-left: none;
		border-bottom: none;
	}

	.popover-arrow[data-placement="right"] {
		left: -7px;
		border-right: none;
		border-top: none;
	}

	.popover-arrow[data-placement="top"],
	.popover-arrow[data-placement="bottom"] {
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
	}

	.popover-arrow[data-placement="top-start"],
	.popover-arrow[data-placement="bottom-start"] {
		left: 16px;
	}

	.popover-arrow[data-placement="top-end"],
	.popover-arrow[data-placement="bottom-end"] {
		right: 16px;
	}

	.popover-arrow[data-placement="left"],
	.popover-arrow[data-placement="right"] {
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
	}

	/* Menu variant */
	.popover[data-variant="menu"] {
		min-width: 200px;
		max-width: 280px;
	}

	.popover[data-variant="menu"] .popover-content {
		padding: var(--spacing-2);
	}

	/* Tooltip variant */
	.popover[data-variant="tooltip"] {
		max-width: 240px;
	}

	.popover[data-variant="tooltip"] .popover-content {
		padding: var(--spacing-2) var(--spacing-3);
		font-size: var(--font-size-sm);
		color: var(--color-neutral-700);
	}

	@media (prefers-color-scheme: dark) {
		.popover[data-variant="tooltip"] .popover-content {
			color: var(--color-neutral-300);
		}
	}
</style>
