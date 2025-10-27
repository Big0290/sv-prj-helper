<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	import type { ModalProps } from './Modal.types.js';

	let { open = $bindable(false),
		title,
		size = 'md',
		onclose,
		closeOnBackdrop = true,
		closeOnEscape = true,
		ariaLabelledBy,
		ariaDescribedBy,
		children
	 }: ModalProps = $props();

	let dialogElement: HTMLDialogElement;
	let previousActiveElement: HTMLElement | null = null;

	$effect(() => {
		if (open && dialogElement) {
			previousActiveElement = document.activeElement as HTMLElement;
			dialogElement.showModal();
			
			// Trap focus within modal
			const focusableElements = dialogElement.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusableElements.length > 0) {
				(focusableElements[0] as HTMLElement).focus();
			}
		} else if (!open && dialogElement) {
			dialogElement.close();
			previousActiveElement?.focus();
		}
	});

	function handleBackdropClick(e: MouseEvent) {
		if (closeOnBackdrop && e.target === dialogElement) {
			handleClose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === 'Escape') {
			e.preventDefault();
			handleClose();
		}
	}

	function handleClose() {
		open = false;
		onclose?.();
	}

	onMount(() => {
		return () => {
			previousActiveElement?.focus();
		};
	});
</script>

<dialog
	bind:this={dialogElement}
	class="modal modal-{size}"
	aria-labelledby={ariaLabelledBy || (title ? 'modal-title' : undefined)}
	aria-describedby={ariaDescribedBy}
	onclick={handleBackdropClick}
	onkeydown={handleKeydown}
>
	<div class="modal-content">
		{#if title}
			<div class="modal-header">
				<h2 id="modal-title" class="modal-title">{title}</h2>
				<button
					type="button"
					class="modal-close"
					onclick={handleClose}
					aria-label="Close modal"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			</div>
		{/if}
		<div class="modal-body">
			{@render children()}
		</div>
	</div>
</dialog>

<style>
	.modal {
		padding: 0;
		border: none;
		background: transparent;
		max-width: none;
		max-height: none;
	}

	.modal::backdrop {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.modal[open] {
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn var(--transition-base);
	}

	.modal-content {
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-lg));
		-webkit-backdrop-filter: blur(var(--glass-blur-lg));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-2xl);
		box-shadow: var(--glass-shadow-lg);
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		animation: slideUp var(--transition-base);
	}

	/* Size variants */
	.modal-sm .modal-content {
		width: 90vw;
		max-width: 400px;
	}

	.modal-md .modal-content {
		width: 90vw;
		max-width: 600px;
	}

	.modal-lg .modal-content {
		width: 90vw;
		max-width: 800px;
	}

	.modal-xl .modal-content {
		width: 90vw;
		max-width: 1200px;
	}

	.modal-full .modal-content {
		width: 95vw;
		height: 95vh;
		max-width: none;
		max-height: 95vh;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-6);
		border-bottom: 1px solid var(--glass-border);
	}

	.modal-title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-900);
	}

	@media (prefers-color-scheme: dark) {
		.modal-title {
			color: var(--color-neutral-50);
		}
	}

	.modal-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		color: var(--color-neutral-600);
		transition: all var(--transition-fast);
	}

	.modal-close:hover {
		background: var(--glass-bg-hover);
		color: var(--color-neutral-900);
	}

	@media (prefers-color-scheme: dark) {
		.modal-close {
			color: var(--color-neutral-400);
		}

		.modal-close:hover {
			color: var(--color-neutral-50);
		}
	}

	.modal-close:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}

	.modal-body {
		padding: var(--spacing-6);
		overflow-y: auto;
		flex: 1;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		.modal-content {
			max-height: 95vh;
			border-radius: var(--radius-xl);
		}

		.modal-header,
		.modal-body {
			padding: var(--spacing-4);
		}
	}
</style>
