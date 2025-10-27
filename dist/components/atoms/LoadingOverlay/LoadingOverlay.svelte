<script lang="ts">
	import type { LoadingOverlayProps } from './LoadingOverlay.types.js';

	let { isLoading = false,
		message = 'Loading...',
		variant = 'spinner',
		blur = true,
		fullscreen = false
	 }: LoadingOverlayProps = $props();
</script>

{#if isLoading}
	<div
		class="loading-overlay"
		class:blur
		class:fullscreen
		data-variant={variant}
		role="alert"
		aria-busy="true"
		aria-live="polite"
	>
		<div class="loading-content">
			{#if variant === 'spinner'}
				<div class="spinner"></div>
			{:else if variant === 'dots'}
				<div class="dots">
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
				</div>
			{:else if variant === 'pulse'}
				<div class="pulse"></div>
			{/if}
			{#if message}
				<p class="loading-message">{message}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.loading-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.8);
		z-index: 999;
		animation: fadeIn 0.2s ease-out;
	}

	.loading-overlay.fullscreen {
		position: fixed;
	}

	.loading-overlay.blur {
		backdrop-filter: blur(4px);
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.loading-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-4);
	}

	.spinner {
		width: 48px;
		height: 48px;
		border: 4px solid var(--color-neutral-200);
		border-top-color: var(--color-primary-600);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.dots {
		display: flex;
		gap: var(--spacing-2);
	}

	.dot {
		width: 12px;
		height: 12px;
		background: var(--color-primary-600);
		border-radius: 50%;
		animation: bounce 1.4s ease-in-out infinite;
	}

	.dot:nth-child(1) { animation-delay: -0.32s; }
	.dot:nth-child(2) { animation-delay: -0.16s; }

	@keyframes bounce {
		0%, 80%, 100% { transform: scale(0); }
		40% { transform: scale(1); }
	}

	.pulse {
		width: 48px;
		height: 48px;
		background: var(--color-primary-600);
		border-radius: 50%;
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(0.8); }
	}

	.loading-message {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-neutral-700);
		font-weight: var(--font-weight-medium);
	}

	@media (prefers-color-scheme: dark) {
		.loading-overlay {
			background: rgba(0, 0, 0, 0.8);
		}

		.loading-message {
			color: var(--color-neutral-200);
		}
	}
</style>
