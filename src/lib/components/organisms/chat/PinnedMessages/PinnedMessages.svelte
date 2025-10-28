<script lang="ts">
	interface PinnedMessage {
		id: string;
		text: string;
		senderName: string;
		timestamp: Date;
	}

	import type { PinnedMessagesProps } from './PinnedMessages.types.js';

	let { messages = [],
		onMessageClick,
		onUnpin,
		onClose,
		maxVisible = 3
	 }: PinnedMessagesProps = $props();

	let currentIndex = $state(0);
	let expanded = $state(false);

	const visibleMessages = $derived(
		expanded ? messages : messages.slice(currentIndex, currentIndex + 1)
	);

	function handleNext() {
		currentIndex = (currentIndex + 1) % messages.length;
	}

	function handlePrevious() {
		currentIndex = (currentIndex - 1 + messages.length) % messages.length;
	}

	function formatDate(date: Date): string {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (hours < 24) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
		if (days < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

{#if messages.length > 0}
	<div class="pinned-messages" class:expanded>
		<div class="pinned-header">
			<div class="header-left">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M16 7V3H8v4H6v6h2v8h2v-8h4v8h2v-8h2V7h-2z" />
				</svg>
				<span class="header-title">
					{expanded ? `${messages.length} Pinned Message${messages.length > 1 ? 's' : ''}` : 'Pinned Message'}
				</span>
			</div>

			<div class="header-actions">
				{#if messages.length > 1 && !expanded}
					<button type="button" class="action-btn" onclick={handlePrevious} aria-label="Previous message">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="15 18 9 12 15 6" />
						</svg>
					</button>
					<span class="counter">{currentIndex + 1}/{messages.length}</span>
					<button type="button" class="action-btn" onclick={handleNext} aria-label="Next message">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9 18 15 12 9 6" />
						</svg>
					</button>
				{/if}
				{#if messages.length > 1}
					<button
						type="button"
						class="action-btn"
						onclick={() => (expanded = !expanded)}
						aria-label={expanded ? 'Show less' : 'Show all'}
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							{#if expanded}
								<polyline points="18 15 12 9 6 15" />
							{:else}
								<polyline points="6 9 12 15 18 9" />
							{/if}
						</svg>
					</button>
				{/if}
				{#if onClose}
					<button type="button" class="action-btn" onclick={onClose} aria-label="Close">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				{/if}
			</div>
		</div>

		<div class="messages-container">
			{#each visibleMessages as message (message.id)}
				<div class="pinned-message">
					<button
						type="button"
						class="message-content"
						onclick={() => onMessageClick?.(message.id)}
					>
						<div class="message-header">
							<span class="sender-name">{message.senderName}</span>
							<span class="timestamp">{formatDate(message.timestamp)}</span>
						</div>
						<p class="message-text">{message.content}</p>
					</button>
					{#if onUnpin}
						<button
							type="button"
							class="unpin-btn"
							onclick={() => onUnpin?.(message.id)}
							aria-label="Unpin message"
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.pinned-messages {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--glass-shadow-md);
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.pinned-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-2) var(--spacing-3);
		background: linear-gradient(
			135deg,
			rgba(var(--color-primary-rgb), 0.15),
			rgba(var(--color-primary-rgb), 0.1)
		);
		border-bottom: 1px solid var(--glass-border);
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		color: var(--color-primary-300);
	}

	.header-title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
	}

	.action-btn {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
		padding: 0;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
		color: var(--color-neutral-200);
	}

	.counter {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-400);
		padding: 0 var(--spacing-1);
	}

	.messages-container {
		display: flex;
		flex-direction: column;
		max-height: 300px;
		overflow-y: auto;
	}

	.pinned-message {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		border-bottom: 1px solid var(--glass-border);
	}

	.pinned-message:last-child {
		border-bottom: none;
	}

	.message-content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		background: transparent;
		border: none;
		text-align: left;
		cursor: pointer;
		transition: all var(--transition-fast);
		padding: 0;
	}

	.message-content:hover {
		color: var(--color-primary-300);
	}

	.message-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.sender-name {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--color-primary-300);
	}

	.timestamp {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
	}

	.message-text {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-neutral-300);
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.expanded .message-text {
		-webkit-line-clamp: 3;
		line-clamp: 3;
	}

	.unpin-btn {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		color: var(--color-neutral-500);
		cursor: pointer;
		transition: all var(--transition-fast);
		flex-shrink: 0;
		padding: 0;
	}

	.unpin-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-danger-500);
		color: var(--color-danger-400);
	}
</style>
