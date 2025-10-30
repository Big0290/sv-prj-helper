<script lang="ts">
	interface Props {
		userName?: string;
		avatar?: string;
		showAvatar?: boolean;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'bubble' | 'inline';
	}

	let {
		userName,
		avatar,
		showAvatar = true,
		size = 'md',
		variant = 'bubble'
	}: Props = $props();
</script>

<div class="typing-indicator" class:size-sm={size === 'sm'} class:size-lg={size === 'lg'} class:variant-inline={variant === 'inline'}>
	{#if showAvatar && avatar}
		<div class="avatar">
			<img src={avatar} alt={userName || 'User'} />
		</div>
	{/if}

	<div class="typing-content">
		{#if userName && variant === 'bubble'}
			<span class="user-name">{userName}</span>
		{/if}

		<div class="typing-bubble">
			<div class="typing-dots">
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
			</div>
		</div>

		{#if userName && variant === 'inline'}
			<span class="typing-text">{userName} is typing...</span>
		{/if}
	</div>
</div>

<style>
	.typing-indicator {
		display: flex;
		align-items: flex-end;
		gap: var(--spacing-2);
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.variant-inline {
		align-items: center;
	}

	.avatar {
		width: 32px;
		height: 32px;
		flex-shrink: 0;
	}

	.size-sm .avatar {
		width: 24px;
		height: 24px;
	}

	.size-lg .avatar {
		width: 40px;
		height: 40px;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--glass-border);
	}

	.typing-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.variant-inline .typing-content {
		flex-direction: row;
		align-items: center;
		gap: var(--spacing-2);
	}

	.user-name {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-400);
		padding: 0 var(--spacing-1);
	}

	.typing-bubble {
		display: inline-flex;
		align-items: center;
		padding: var(--spacing-3);
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm);
		min-width: 60px;
	}

	.size-sm .typing-bubble {
		padding: var(--spacing-2);
		min-width: 50px;
	}

	.size-lg .typing-bubble {
		padding: var(--spacing-4);
		min-width: 70px;
	}

	.variant-inline .typing-bubble {
		padding: var(--spacing-2) var(--spacing-3);
		min-width: 50px;
		border-radius: var(--radius-full);
	}

	.typing-dots {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
		justify-content: center;
		width: 100%;
	}

	.dot {
		width: 8px;
		height: 8px;
		background: var(--color-neutral-400);
		border-radius: 50%;
		animation: typing 1.4s infinite ease-in-out;
	}

	.size-sm .dot {
		width: 6px;
		height: 6px;
	}

	.size-lg .dot {
		width: 10px;
		height: 10px;
	}

	.dot:nth-child(1) {
		animation-delay: 0s;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes typing {
		0%,
		60%,
		100% {
			transform: translateY(0);
			opacity: 0.6;
		}
		30% {
			transform: translateY(-8px);
			opacity: 1;
		}
	}

	.typing-text {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-400);
		font-style: italic;
		white-space: nowrap;
	}

	.size-sm .typing-text {
		font-size: 10px;
	}

	.size-lg .typing-text {
		font-size: var(--font-size-sm);
	}
</style>
