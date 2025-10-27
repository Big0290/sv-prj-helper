<script lang="ts">
	import type { ToastProps } from './Toast.types.js';

	let { message,
		variant = 'info',
		duration = 3000,
		position = 'top-right',
		onClose,
		showClose = true
	 }: ToastProps = $props();

	let visible = $state(true);
	let timer: ReturnType<typeof setTimeout>;

	$effect(() => {
		if (duration > 0) {
			timer = setTimeout(() => {
				handleClose();
			}, duration);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	});

	function handleClose() {
		visible = false;
		setTimeout(() => {
			onClose?.();
		}, 300);
	}

	const icons = {
		success: '<path d="M20 6L9 17l-5-5" />',
		error: '<path d="M18 6L6 18M6 6l12 12" />',
		warning: '<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />',
		info: '<circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />'
	};
</script>

{#if visible}
	<div class="toast {variant} {position}" role="alert" aria-live="polite">
		<div class="toast-content">
			<div class="toast-icon">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					{@html icons[variant]}
				</svg>
			</div>
			<div class="toast-message">{message}</div>
			{#if showClose}
				<button type="button" class="toast-close" onclick={handleClose} aria-label="Close notification">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			{/if}
		</div>
		<div class="toast-progress" style="animation-duration: {duration}ms;"></div>
	</div>
{/if}

<style>
	.toast {
		position: fixed;
		z-index: 9999;
		min-width: 300px;
		max-width: 500px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow-xl);
		overflow: hidden;
		animation: slideIn 0.3s ease-out;
	}

	.toast.top-right {
		top: var(--spacing-4);
		right: var(--spacing-4);
	}

	.toast.top-left {
		top: var(--spacing-4);
		left: var(--spacing-4);
	}

	.toast.bottom-right {
		bottom: var(--spacing-4);
		right: var(--spacing-4);
	}

	.toast.bottom-left {
		bottom: var(--spacing-4);
		left: var(--spacing-4);
	}

	.toast.top-center {
		top: var(--spacing-4);
		left: 50%;
		transform: translateX(-50%);
	}

	.toast.bottom-center {
		bottom: var(--spacing-4);
		left: 50%;
		transform: translateX(-50%);
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.toast-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-4);
	}

	.toast-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.toast.success .toast-icon {
		color: var(--color-success-500);
	}

	.toast.error .toast-icon {
		color: var(--color-danger-500);
	}

	.toast.warning .toast-icon {
		color: var(--color-warning-500);
	}

	.toast.info .toast-icon {
		color: var(--color-primary-500);
	}

	.toast-message {
		flex: 1;
		color: var(--color-neutral-100);
		font-size: var(--font-size-sm);
		line-height: 1.5;
	}

	.toast-close {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-1);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
		flex-shrink: 0;
	}

	.toast-close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-neutral-200);
	}

	.toast-progress {
		height: 3px;
		width: 100%;
		transform-origin: left;
		animation: progress linear forwards;
	}

	.toast.success .toast-progress {
		background: var(--color-success-500);
	}

	.toast.error .toast-progress {
		background: var(--color-danger-500);
	}

	.toast.warning .toast-progress {
		background: var(--color-warning-500);
	}

	.toast.info .toast-progress {
		background: var(--color-primary-500);
	}

	@keyframes progress {
		from {
			transform: scaleX(1);
		}
		to {
			transform: scaleX(0);
		}
	}

	@media (max-width: 768px) {
		.toast {
			min-width: calc(100vw - var(--spacing-8));
			max-width: calc(100vw - var(--spacing-8));
		}
	}
</style>
