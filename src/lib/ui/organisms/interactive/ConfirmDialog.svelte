<script lang="ts">
	interface Props {
		isOpen?: boolean;
		onConfirm?: () => void;
		onCancel?: () => void;
		title?: string;
		message?: string;
		confirmText?: string;
		cancelText?: string;
		variant?: 'danger' | 'warning' | 'info';
	}

	let {
		isOpen = $bindable(false),
		onConfirm,
		onCancel,
		title = 'Confirm Action',
		message = 'Are you sure you want to proceed?',
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		variant = 'info'
	}: Props = $props();

	function handleConfirm() {
		onConfirm?.();
		isOpen = false;
	}

	function handleCancel() {
		onCancel?.();
		isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleCancel();
		}
	}
</script>

{#if isOpen}
	<div 
		class="confirm-backdrop" 
		onclick={handleCancel}
		onkeydown={handleKeydown}
		role="presentation"
	>
	<div 
		class="confirm-dialog {variant}"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="dialog-title"
		aria-describedby="dialog-message"
		tabindex="-1"
	>
			<div class="dialog-icon">
				{#if variant === 'danger'}
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10" />
						<path d="M15 9l-6 6M9 9l6 6" />
					</svg>
				{:else if variant === 'warning'}
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				{:else}
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10" />
						<path d="M12 16v-4M12 8h.01" />
					</svg>
				{/if}
			</div>

			<h3 id="dialog-title">{title}</h3>
			<p id="dialog-message">{message}</p>

			<div class="dialog-actions">
				<button type="button" class="btn-cancel" onclick={handleCancel}>
					{cancelText}
				</button>
				<button type="button" class="btn-confirm {variant}" onclick={handleConfirm}>
					{confirmText}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.confirm-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		padding: var(--spacing-4);
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.confirm-dialog {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-2xl);
		box-shadow: var(--glass-shadow-xl);
		padding: var(--spacing-6);
		max-width: 400px;
		width: 100%;
		text-align: center;
		animation: scaleIn 0.3s ease-out;
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.dialog-icon {
		margin: 0 auto var(--spacing-4);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.confirm-dialog.danger .dialog-icon {
		color: var(--color-danger-500);
	}

	.confirm-dialog.warning .dialog-icon {
		color: var(--color-warning-500);
	}

	.confirm-dialog.info .dialog-icon {
		color: var(--color-primary-500);
	}

	.confirm-dialog h3 {
		margin: 0 0 var(--spacing-3) 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-50);
	}

	.confirm-dialog p {
		margin: 0 0 var(--spacing-6) 0;
		color: var(--color-neutral-400);
		font-size: var(--font-size-base);
		line-height: 1.5;
	}

	.dialog-actions {
		display: flex;
		gap: var(--spacing-3);
	}

	.btn-cancel,
	.btn-confirm {
		flex: 1;
		padding: var(--spacing-3) var(--spacing-4);
		border-radius: var(--radius-lg);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-normal);
		border: none;
	}

	.btn-cancel {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		color: var(--color-neutral-300);
	}

	.btn-cancel:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		color: var(--color-neutral-100);
	}

	.btn-confirm {
		color: white;
	}

	.btn-confirm.danger {
		background: linear-gradient(135deg, var(--color-danger-600), var(--color-danger-700));
	}

	.btn-confirm.danger:hover {
		background: linear-gradient(135deg, var(--color-danger-500), var(--color-danger-600));
		box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
	}

	.btn-confirm.warning {
		background: linear-gradient(135deg, var(--color-warning-600), var(--color-warning-700));
	}

	.btn-confirm.warning:hover {
		background: linear-gradient(135deg, var(--color-warning-500), var(--color-warning-600));
		box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
	}

	.btn-confirm.info {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
	}

	.btn-confirm.info:hover {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
	}

	.btn-confirm:active {
		transform: scale(0.98);
	}
</style>
