<script lang="ts">
	import type { ChatHeaderProps } from './ChatHeader.types.js';

	let { name,
		avatar,
		isOnline = false,
		lastSeen,
		isTyping = false,
		onCallClick,
		onVideoClick,
		onInfoClick
	 }: ChatHeaderProps = $props();

	function formatLastSeen(date?: Date): string {
		if (!date) return '';
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 1) return 'Just now';
		if (minutes < 60) return `${minutes}m ago`;
		if (hours < 24) return `${hours}h ago`;
		if (days === 1) return 'Yesterday';
		return date.toLocaleDateString();
	}
</script>

<header class="chat-header">
	<div class="participant-info">
		<div class="avatar-container">
			{#if avatar}
				<img src={avatar} alt={name} class="avatar" />
			{:else}
				<div class="avatar-placeholder">
					{name.charAt(0).toUpperCase()}
				</div>
			{/if}
			{#if isOnline}
				<span class="status-indicator"></span>
			{/if}
		</div>

		<div class="info">
			<h3 class="name">{name}</h3>
			{#if isTyping}
				<div class="typing-indicator">
					<span class="typing-dot"></span>
					<span class="typing-dot"></span>
					<span class="typing-dot"></span>
					<span class="typing-text">typing...</span>
				</div>
			{:else if isOnline}
				<p class="status online-status">Online</p>
			{:else if lastSeen}
				<p class="status">Last seen {formatLastSeen(lastSeen)}</p>
			{:else}
				<p class="status">Offline</p>
			{/if}
		</div>
	</div>

	<div class="actions">
		{#if onCallClick}
			<button type="button" class="action-btn" onclick={onCallClick} aria-label="Voice call">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
				</svg>
			</button>
		{/if}

		{#if onVideoClick}
			<button type="button" class="action-btn" onclick={onVideoClick} aria-label="Video call">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polygon points="23 7 16 12 23 17 23 7" />
					<rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
				</svg>
			</button>
		{/if}

		{#if onInfoClick}
			<button type="button" class="action-btn" onclick={onInfoClick} aria-label="Info">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="16" x2="12" y2="12" />
					<line x1="12" y1="8" x2="12.01" y2="8" />
				</svg>
			</button>
		{/if}
	</div>
</header>

<style>
	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-4);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--glass-shadow-sm);
	}

	.participant-info {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		flex: 1;
		min-width: 0;
	}

	.avatar-container {
		position: relative;
		flex-shrink: 0;
	}

	.avatar,
	.avatar-placeholder {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	.avatar {
		object-fit: cover;
	}

	.avatar-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
	}

	.status-indicator {
		position: absolute;
		bottom: 2px;
		right: 2px;
		width: 12px;
		height: 12px;
		background: var(--color-success-500);
		border-radius: 50%;
		border: 2px solid var(--color-neutral-900);
	}

	.info {
		flex: 1;
		min-width: 0;
	}

	.name {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-100);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.status {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
	}

	.status.online-status {
		color: var(--color-success-500);
	}

	.typing-indicator {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
	}

	.typing-dot {
		width: 4px;
		height: 4px;
		background: var(--color-primary-500);
		border-radius: 50%;
		animation: typing 1.4s infinite;
	}

	.typing-dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.typing-dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes typing {
		0%, 60%, 100% {
			transform: translateY(0);
			opacity: 0.7;
		}
		30% {
			transform: translateY(-4px);
			opacity: 1;
		}
	}

	.typing-text {
		font-size: var(--font-size-sm);
		color: var(--color-primary-500);
		font-style: italic;
	}

	.actions {
		display: flex;
		gap: var(--spacing-2);
		flex-shrink: 0;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-300);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
		color: var(--color-primary-400);
		transform: translateY(-1px);
	}

	.action-btn:active {
		transform: translateY(0);
	}

	@media (max-width: 640px) {
		.actions {
			gap: var(--spacing-1);
		}

		.action-btn {
			width: 36px;
			height: 36px;
		}
	}
</style>
