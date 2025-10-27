<script lang="ts">
	import type { SnackbarProps } from './Snackbar.types.js';

	let { message,
		variant = 'default',
		position = 'bottom',
		duration = 3000,
		isOpen = $bindable(false),
		actionLabel,
		onAction,
		onClose
	 }: SnackbarProps = $props();

	let timeoutId: NodeJS.Timeout | undefined | undefined;

	$effect(() => {
		if (isOpen && duration > 0) {
			timeoutId = window.setTimeout(() => {
				isOpen = false;
				onClose?.();
			}, duration);

			return () => clearTimeout(timeoutId);
		}
	});

	function handleClose() {
		isOpen = false;
		onClose?.();
	}

	function handleAction() {
		onAction?.();
		handleClose();
	}
</script>

{#if isOpen}
	<div class="snackbar" data-variant={variant} data-position={position} role="alert">
		<div class="snackbar-content">
			{#if variant === 'success'}
				<svg class="snackbar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
					<path d="M22 4L12 14.01l-3-3" />
				</svg>
			{:else if variant === 'warning'}
				<svg class="snackbar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
					<path d="M12 9v4M12 17h.01" />
				</svg>
			{:else if variant === 'error'}
				<svg class="snackbar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10" />
					<path d="M15 9l-6 6M9 9l6 6" />
				</svg>
			{:else if variant === 'info'}
				<svg class="snackbar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10" />
					<path d="M12 16v-4M12 8h.01" />
				</svg>
			{/if}

			<span class="snackbar-message">{message}</span>

			{#if actionLabel}
				<button type="button" class="snackbar-action" onclick={handleAction}>
					{actionLabel}
				</button>
			{/if}

			<button type="button" class="snackbar-close" onclick={handleClose} aria-label="Close">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	.snackbar {
		position: fixed;
		z-index: 9999;
		min-width: 300px;
		max-width: 500px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		animation: snackbarSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.snackbar[data-position="bottom"],
	.snackbar[data-position="bottom-left"],
	.snackbar[data-position="bottom-right"] {
		bottom: var(--spacing-4);
	}

	.snackbar[data-position="top"],
	.snackbar[data-position="top-left"],
	.snackbar[data-position="top-right"] {
		top: var(--spacing-4);
	}

	.snackbar[data-position="bottom"],
	.snackbar[data-position="top"] {
		left: 50%;
		transform: translateX(-50%);
	}

	.snackbar[data-position="bottom-left"],
	.snackbar[data-position="top-left"] {
		left: var(--spacing-4);
	}

	.snackbar[data-position="bottom-right"],
	.snackbar[data-position="top-right"] {
		right: var(--spacing-4);
	}

	@keyframes snackbarSlideIn {
		from {
			opacity: 0;
			transform: translateY(100%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.snackbar[data-position="top"] {
		animation: snackbarSlideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes snackbarSlideDown {
		from {
			opacity: 0;
			transform: translate(-50%, -100%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	.snackbar-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-4);
	}

	.snackbar-icon {
		flex-shrink: 0;
		color: var(--color-neutral-600);
	}

	.snackbar[data-variant="success"] {
		background: var(--color-success-50);
		border-color: var(--color-success-200);
	}

	.snackbar[data-variant="success"] .snackbar-icon {
		color: var(--color-success-600);
	}

	.snackbar[data-variant="warning"] {
		background: var(--color-warning-50);
		border-color: var(--color-warning-200);
	}

	.snackbar[data-variant="warning"] .snackbar-icon {
		color: var(--color-warning-600);
	}

	.snackbar[data-variant="error"] {
		background: var(--color-error-50);
		border-color: var(--color-error-200);
	}

	.snackbar[data-variant="error"] .snackbar-icon {
		color: var(--color-error-600);
	}

	.snackbar[data-variant="info"] {
		background: var(--color-info-50);
		border-color: var(--color-info-200);
	}

	.snackbar[data-variant="info"] .snackbar-icon {
		color: var(--color-info-600);
	}

	.snackbar-message {
		flex: 1;
		font-size: var(--font-size-sm);
		color: var(--color-neutral-800);
		line-height: 1.5;
	}

	.snackbar-action {
		flex-shrink: 0;
		padding: var(--spacing-2) var(--spacing-3);
		background: none;
		border: none;
		border-radius: var(--radius-md);
		color: var(--color-primary-600);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.snackbar-action:hover {
		background: var(--color-primary-100);
	}

	.snackbar-close {
		flex-shrink: 0;
		padding: var(--spacing-1);
		background: none;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-neutral-500);
		cursor: pointer;
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.snackbar-close:hover {
		background: var(--color-neutral-200);
		color: var(--color-neutral-700);
	}

	@media (prefers-color-scheme: dark) {
		.snackbar-message {
			color: var(--color-neutral-100);
		}

		.snackbar-close:hover {
			background: var(--color-neutral-700);
			color: var(--color-neutral-100);
		}
	}

	@media (max-width: 768px) {
		.snackbar {
			min-width: auto;
			max-width: calc(100vw - var(--spacing-8));
			left: var(--spacing-4) !important;
			right: var(--spacing-4) !important;
			transform: none !important;
		}
	}
</style>
