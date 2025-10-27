<script lang="ts">
	import type { MessageQuoteProps } from './MessageQuote.types.js';

	let { userName,
		messageText,
		messageType = 'text',
		avatar,
		onQuoteClick,
		variant = 'full',
		closable = false,
		onClose
	 }: MessageQuoteProps = $props();

	function getTypeIcon(type: string) {
		switch (type) {
			case 'image':
				return '🖼️';
			case 'video':
				return '🎥';
			case 'audio':
				return '🎵';
			case 'file':
				return '📄';
			default:
				return null;
		}
	}
</script>

<div
	class="message-quote"
	class:clickable={!!onQuoteClick}
	class:variant-compact={variant === 'compact'}
	onclick={onQuoteClick}
	role={onQuoteClick ? 'button' : undefined}
	onkeydown={(e) => {
		if (onQuoteClick && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onQuoteClick();
		}
	}}
>
	<div class="quote-indicator"></div>

	<div class="quote-content">
		<div class="quote-header">
			{#if avatar && variant === 'full'}
				<img src={avatar} alt={userName} class="quote-avatar" />
			{/if}
			<span class="quote-user">{userName}</span>
		</div>

		<div class="quote-message">
			{#if messageType !== 'text'}
				<span class="type-icon">{getTypeIcon(messageType)}</span>
			{/if}
			<span class="message-text">{messageText}</span>
		</div>
	</div>

	{#if closable}
		<button
			type="button"
			class="close-btn"
			onclick={(e) => {
				e.stopPropagation();
				onClose?.();
			}}
			aria-label="Remove quote"
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.message-quote {
		display: flex;
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		position: relative;
		transition: all var(--transition-fast);
	}

	.variant-compact {
		padding: var(--spacing-2);
	}

	.message-quote.clickable {
		cursor: pointer;
	}

	.message-quote.clickable:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--color-primary-500);
	}

	.quote-indicator {
		width: 3px;
		background: linear-gradient(
			to bottom,
			var(--color-primary-500),
			var(--color-primary-600)
		);
		border-radius: var(--radius-full);
		flex-shrink: 0;
	}

	.quote-content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.quote-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.quote-avatar {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid var(--glass-border);
	}

	.variant-compact .quote-avatar {
		width: 16px;
		height: 16px;
	}

	.quote-user {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--color-primary-300);
	}

	.variant-compact .quote-user {
		font-size: 10px;
	}

	.quote-message {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.type-icon {
		font-size: var(--font-size-sm);
		flex-shrink: 0;
	}

	.message-text {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-300);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.4;
	}

	.variant-compact .message-text {
		font-size: var(--font-size-xs);
	}

	.close-btn {
		position: absolute;
		top: var(--spacing-2);
		right: var(--spacing-2);
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
		padding: 0;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-danger-500);
		color: var(--color-danger-400);
	}

	.close-btn svg {
		width: 12px;
		height: 12px;
	}
</style>
