<script lang="ts">
	interface Props {
		message: string;
		sender?: 'user' | 'other';
		senderName?: string;
		timestamp?: Date;
		avatar?: string;
		showAvatar?: boolean;
		showTimestamp?: boolean;
	}

	let {
		message,
		sender = 'user',
		senderName = '',
		timestamp,
		avatar = '',
		showAvatar = true,
		showTimestamp = true
	}: Props = $props();

	function formatTime(date?: Date): string {
		if (!date) return '';
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
</script>

<div class="chat-bubble-wrapper" class:user={sender === 'user'} class:other={sender === 'other'}>
	{#if sender === 'other' && showAvatar}
		<div class="avatar">
			{#if avatar}
				<img src={avatar} alt={senderName || 'Avatar'} />
			{:else}
				<div class="avatar-placeholder">
					{senderName?.[0]?.toUpperCase() || '?'}
				</div>
			{/if}
		</div>
	{/if}
	
	<div class="bubble-content">
		{#if sender === 'other' && senderName}
			<div class="sender-name">{senderName}</div>
		{/if}
		<div class="bubble">
			<p class="message">{message}</p>
		</div>
		{#if showTimestamp && timestamp}
			<div class="timestamp">{formatTime(timestamp)}</div>
		{/if}
	</div>
</div>

<style>
	.chat-bubble-wrapper {
		display: flex;
		gap: var(--spacing-2);
		margin-bottom: var(--spacing-3);
	}

	.chat-bubble-wrapper.user {
		flex-direction: row-reverse;
	}

	.chat-bubble-wrapper.user .bubble-content {
		align-items: flex-end;
	}

	.chat-bubble-wrapper.other .bubble-content {
		align-items: flex-start;
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		overflow: hidden;
		flex-shrink: 0;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary-600);
		color: white;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
	}

	.bubble-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		max-width: 70%;
	}

	.sender-name {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-400);
		padding: 0 var(--spacing-2);
	}

	.bubble {
		padding: var(--spacing-3) var(--spacing-4);
		border-radius: var(--radius-xl);
		word-wrap: break-word;
		box-shadow: var(--glass-shadow-sm);
	}

	.user .bubble {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		border-bottom-right-radius: var(--radius-sm);
	}

	.other .bubble {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		color: var(--color-neutral-200);
		border-bottom-left-radius: var(--radius-sm);
	}

	.message {
		margin: 0;
		font-size: var(--font-size-sm);
		line-height: 1.5;
	}

	.timestamp {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
		padding: 0 var(--spacing-2);
	}

	@media (max-width: 768px) {
		.bubble-content {
			max-width: 85%;
		}
	}
</style>
