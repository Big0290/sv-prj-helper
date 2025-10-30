<script lang="ts">
	interface Props {
		status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
		timestamp?: Date;
		showTimestamp?: boolean;
	}

	let {
		status,
		timestamp,
		showTimestamp = false
	}: Props = $props();

	function formatTime(date?: Date): string {
		if (!date) return '';
		return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
	}
</script>

<div class="message-status">
	{#if showTimestamp && timestamp}
		<span class="timestamp">{formatTime(timestamp)}</span>
	{/if}

	<div class="status-indicator" class:sending={status === 'sending'} class:failed={status === 'failed'}>
		{#if status === 'sending'}
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinner">
				<path d="M21 12a9 9 0 1 1-6.219-8.56" />
			</svg>
		{:else if status === 'sent'}
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="20 6 9 17 4 12" />
			</svg>
		{:else if status === 'delivered'}
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="20 6 9 17 4 12" />
				<polyline points="23 6 12 17 7 12" />
			</svg>
		{:else if status === 'read'}
			<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="read-indicator">
				<path d="M20 6L9 17L4 12L5.5 10.5L9 14L18.5 4.5L20 6Z" />
				<path d="M23 6L12 17L7 12L8.5 10.5L12 14L21.5 4.5L23 6Z" />
			</svg>
		{:else if status === 'failed'}
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10" />
				<line x1="15" y1="9" x2="9" y2="15" />
				<line x1="9" y1="9" x2="15" y2="15" />
			</svg>
		{/if}
	</div>
</div>

<style>
	.message-status {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
	}

	.timestamp {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
		font-variant-numeric: tabular-nums;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		color: var(--color-neutral-500);
	}

	.status-indicator svg {
		flex-shrink: 0;
	}

	.status-indicator.sending {
		color: var(--color-neutral-400);
	}

	.status-indicator.sending .spinner {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.status-indicator.failed {
		color: var(--color-danger-500);
	}

	.read-indicator {
		color: var(--color-primary-500);
	}
</style>
