<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'info' | 'success' | 'warning' | 'error';
		dismissible?: boolean;
		onclose?: () => void;
		title?: string;
		children: Snippet;
	}

	let {
		variant = 'info',
		dismissible = false,
		onclose,
		title,
		children
	}: Props = $props();

	let visible = $state(true);

	function handleClose() {
		visible = false;
		onclose?.();
	}
</script>

{#if visible}
	<div class="alert alert-{variant}" role="alert">
		<div class="alert-content">
			{#if title}
				<div class="alert-title">{title}</div>
			{/if}
			<div class="alert-message">
				{@render children()}
			</div>
		</div>
		{#if dismissible}
			<button
				type="button"
				class="alert-close"
				onclick={handleClose}
				aria-label="Close alert"
			>
				<svg
					width="20"
					height="20"
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
		{/if}
	</div>
{/if}

<style>
	.alert {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--spacing-4);
		padding: var(--spacing-4);
		border-radius: var(--radius-lg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid;
		animation: slideIn var(--transition-base);
	}

	.alert-info {
		background: rgba(59, 130, 246, 0.1);
		border-color: rgba(59, 130, 246, 0.3);
		color: #1e40af;
	}

	@media (prefers-color-scheme: dark) {
		.alert-info {
			color: #93c5fd;
		}
	}

	.alert-success {
		background: rgba(16, 185, 129, 0.1);
		border-color: rgba(16, 185, 129, 0.3);
		color: #065f46;
	}

	@media (prefers-color-scheme: dark) {
		.alert-success {
			color: #6ee7b7;
		}
	}

	.alert-warning {
		background: rgba(245, 158, 11, 0.1);
		border-color: rgba(245, 158, 11, 0.3);
		color: #92400e;
	}

	@media (prefers-color-scheme: dark) {
		.alert-warning {
			color: #fcd34d;
		}
	}

	.alert-error {
		background: rgba(239, 68, 68, 0.1);
		border-color: rgba(239, 68, 68, 0.3);
		color: #991b1b;
	}

	@media (prefers-color-scheme: dark) {
		.alert-error {
			color: #fca5a5;
		}
	}

	.alert-content {
		flex: 1;
	}

	.alert-title {
		font-weight: var(--font-weight-semibold);
		margin-bottom: var(--spacing-1);
	}

	.alert-message {
		font-size: var(--font-size-sm);
	}

	.alert-close {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-1);
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		color: currentColor;
		opacity: 0.7;
		transition: all var(--transition-fast);
	}

	.alert-close:hover {
		opacity: 1;
		background: rgba(0, 0, 0, 0.05);
	}

	.alert-close:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: 2px;
	}

	@keyframes slideIn {
		from {
			transform: translateX(-10px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
