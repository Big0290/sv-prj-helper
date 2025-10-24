<script lang="ts">
	import type { Snippet } from 'svelte';
	
	interface Props {
		children: Snippet;
		isOpen?: boolean;
		onClose?: () => void;
		position?: 'left' | 'right' | 'top' | 'bottom';
		title?: string;
		size?: 'sm' | 'md' | 'lg' | 'full';
	}

	let {
		children,
		isOpen = $bindable(false),
		onClose,
		position = 'right',
		title = '',
		size = 'md'
	}: Props = $props();

	function handleClose() {
		isOpen = false;
		onClose?.();
	}

	function handleBackdropClick() {
		handleClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
	}

	const sizes = {
		sm: '320px',
		md: '480px',
		lg: '640px',
		full: '100%'
	};
</script>

{#if isOpen}
	<div 
		class="drawer-backdrop" 
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="presentation"
	>
	<div 
		class="drawer {position} {size}"
		style="--drawer-size: {sizes[size]};"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'drawer-title' : undefined}
		tabindex="-1"
	>
			<div class="drawer-header">
				{#if title}
					<h3 id="drawer-title">{title}</h3>
				{/if}
				<button 
					type="button" 
					class="drawer-close" 
					onclick={handleClose}
					aria-label="Close drawer"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>
			
			<div class="drawer-content">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style>
	.drawer-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(2px);
		z-index: 1000;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.drawer {
		position: fixed;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		box-shadow: var(--glass-shadow-xl);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.drawer.left,
	.drawer.right {
		top: 0;
		bottom: 0;
		width: var(--drawer-size);
		animation: slideIn 0.3s ease-out;
	}

	.drawer.left {
		left: 0;
		border-right: 1px solid var(--glass-border);
		border-left: none;
		border-radius: 0 var(--radius-2xl) var(--radius-2xl) 0;
	}

	.drawer.right {
		right: 0;
		border-left: 1px solid var(--glass-border);
		border-right: none;
		border-radius: var(--radius-2xl) 0 0 var(--radius-2xl);
	}

	.drawer.top,
	.drawer.bottom {
		left: 0;
		right: 0;
		height: var(--drawer-size);
		animation: slideInVertical 0.3s ease-out;
	}

	.drawer.top {
		top: 0;
		border-bottom: 1px solid var(--glass-border);
		border-top: none;
		border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
	}

	.drawer.bottom {
		bottom: 0;
		border-top: 1px solid var(--glass-border);
		border-bottom: none;
		border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
	}

	@keyframes slideIn {
		from { transform: translateX(var(--slide-from, -100%)); }
		to { transform: translateX(0); }
	}

	.drawer.right {
		--slide-from: 100%;
	}

	@keyframes slideInVertical {
		from { transform: translateY(var(--slide-from, -100%)); }
		to { transform: translateY(0); }
	}

	.drawer.bottom {
		--slide-from: 100%;
	}

	.drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-4);
		border-bottom: 1px solid var(--glass-border);
		flex-shrink: 0;
	}

	.drawer-header h3 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-50);
	}

	.drawer-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: var(--radius-lg);
		color: var(--color-neutral-300);
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.drawer-close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-neutral-50);
	}

	.drawer-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-4);
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.drawer.left,
		.drawer.right {
			width: min(var(--drawer-size), 100vw);
		}

		.drawer.top,
		.drawer.bottom {
			height: min(var(--drawer-size), 80vh);
		}
	}
</style>
