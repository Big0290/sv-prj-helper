<script lang="ts">
	interface Props {
		value: string;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'default' | 'ghost' | 'icon';
		successDuration?: number;
	}

	let {
		value,
		size = 'md',
		variant = 'default',
		successDuration = 2000
	}: Props = $props();

	let copied = $state(false);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, successDuration);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	const sizeClasses = {
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg'
	};
</script>

<button
	type="button"
	class="copy-button {sizeClasses[size]} {variant}"
	onclick={handleCopy}
	aria-label="Copy to clipboard"
	title={copied ? 'Copied!' : 'Copy'}
>
	{#if copied}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M20 6L9 17l-5-5" />
		</svg>
		{#if variant !== 'icon'}
			<span>Copied!</span>
		{/if}
	{:else}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<rect x="9" y="9" width="13" height="13" rx="2" />
			<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
		</svg>
		{#if variant !== 'icon'}
			<span>Copy</span>
		{/if}
	{/if}
</button>

<style>
	.copy-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		font-weight: var(--font-weight-medium);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-normal);
		border: none;
	}

	.copy-button.default {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		color: var(--color-neutral-300);
	}

	.copy-button.default:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
		color: var(--color-primary-400);
	}

	.copy-button.ghost {
		background: transparent;
		color: var(--color-neutral-400);
	}

	.copy-button.ghost:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-primary-400);
	}

	.copy-button.icon {
		background: transparent;
		color: var(--color-neutral-400);
		padding: var(--spacing-1);
	}

	.copy-button.icon:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-primary-400);
	}

	.btn-sm {
		padding: var(--spacing-1-5) var(--spacing-2);
		font-size: var(--font-size-xs);
	}

	.btn-sm svg {
		width: 14px;
		height: 14px;
	}

	.btn-md {
		padding: var(--spacing-2) var(--spacing-3);
		font-size: var(--font-size-sm);
	}

	.btn-md svg {
		width: 16px;
		height: 16px;
	}

	.btn-lg {
		padding: var(--spacing-3) var(--spacing-4);
		font-size: var(--font-size-base);
	}

	.btn-lg svg {
		width: 18px;
		height: 18px;
	}

	.copy-button:active {
		transform: scale(0.95);
	}
</style>
