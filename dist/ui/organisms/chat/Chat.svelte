<script lang="ts">
	import type { Snippet } from 'svelte';

	export interface Message {
		id: string;
		content: string;
		sender: 'user' | 'other';
		timestamp: Date;
		avatar?: string;
		senderName?: string;
	}

	interface Props {
		messages?: Message[];
		placeholder?: string;
		currentUser?: string;
		showTypingIndicator?: boolean;
		onSend?: (message: string) => void;
		height?: string;
	}

	let {
		messages = [],
		placeholder = 'Type a message...',
		currentUser = 'You',
		showTypingIndicator = false,
		onSend,
		height = '500px'
	}: Props = $props();

	let messageInput = $state('');
	let chatContainer: HTMLDivElement;

	function handleSend() {
		if (messageInput.trim() && onSend) {
			onSend(messageInput.trim());
			messageInput = '';
			// Scroll to bottom after sending
			setTimeout(() => scrollToBottom(), 100);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}

	function formatTime(date: Date): string {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	$effect(() => {
		scrollToBottom();
	});
</script>

<div class="chat" style="height: {height}">
	<div class="chat-messages" bind:this={chatContainer}>
		{#each messages as message (message.id)}
			<div class="message message-{message.sender}">
				{#if message.sender === 'other' && message.avatar}
					<img src={message.avatar} alt={message.senderName} class="message-avatar" />
				{/if}
				<div class="message-content">
					{#if message.sender === 'other' && message.senderName}
						<div class="message-sender">{message.senderName}</div>
					{/if}
					<div class="message-bubble">
						{message.content}
					</div>
					<div class="message-time">{formatTime(message.timestamp)}</div>
				</div>
			</div>
		{/each}
		
		{#if showTypingIndicator}
			<div class="typing-indicator">
				<span></span>
				<span></span>
				<span></span>
			</div>
		{/if}
	</div>

	<div class="chat-input">
		<input
			type="text"
			bind:value={messageInput}
			placeholder={placeholder}
			onkeydown={handleKeydown}
			class="chat-input-field"
			aria-label="Message input"
		/>
		<button
			type="button"
			onclick={handleSend}
			disabled={!messageInput.trim()}
			class="chat-send-button"
			aria-label="Send message"
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="22" y1="2" x2="11" y2="13" />
				<polygon points="22 2 15 22 11 13 2 9 22 2" />
			</svg>
		</button>
	</div>
</div>

<style>
	.chat {
		display: flex;
		flex-direction: column;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-lg));
		-webkit-backdrop-filter: blur(var(--glass-blur-lg));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--glass-shadow);
	}

	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-4);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.message {
		display: flex;
		gap: var(--spacing-2);
		align-items: flex-start;
		animation: slideIn var(--transition-base);
	}

	.message-user {
		flex-direction: row-reverse;
	}

	.message-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.message-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		max-width: 70%;
	}

	.message-user .message-content {
		align-items: flex-end;
	}

	.message-sender {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-600);
		padding: 0 var(--spacing-2);
	}

	@media (prefers-color-scheme: dark) {
		.message-sender {
			color: var(--color-neutral-400);
		}
	}

	.message-bubble {
		padding: var(--spacing-3) var(--spacing-4);
		border-radius: var(--radius-lg);
		font-size: var(--font-size-sm);
		word-wrap: break-word;
	}

	.message-other .message-bubble {
		background: var(--glass-bg-hover);
		color: var(--color-neutral-900);
		border-bottom-left-radius: var(--radius-sm);
	}

	@media (prefers-color-scheme: dark) {
		.message-other .message-bubble {
			color: var(--color-neutral-50);
		}
	}

	.message-user .message-bubble {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		color: white;
		border-bottom-right-radius: var(--radius-sm);
	}

	.message-time {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
		padding: 0 var(--spacing-2);
	}

	.typing-indicator {
		display: flex;
		gap: var(--spacing-1);
		padding: var(--spacing-3) var(--spacing-4);
		background: var(--glass-bg-hover);
		border-radius: var(--radius-lg);
		width: fit-content;
	}

	.typing-indicator span {
		width: 8px;
		height: 8px;
		background: var(--color-neutral-500);
		border-radius: 50%;
		animation: typing 1.4s infinite;
	}

	.typing-indicator span:nth-child(2) {
		animation-delay: 0.2s;
	}

	.typing-indicator span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes typing {
		0%, 60%, 100% {
			transform: translateY(0);
			opacity: 0.7;
		}
		30% {
			transform: translateY(-8px);
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.chat-input {
		display: flex;
		gap: var(--spacing-2);
		padding: var(--spacing-4);
		border-top: 1px solid var(--glass-border);
		background: var(--glass-bg);
	}

	.chat-input-field {
		flex: 1;
		padding: var(--spacing-3) var(--spacing-4);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		color: var(--color-neutral-900);
		background: var(--glass-bg-hover);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		transition: all var(--transition-base);
	}

	@media (prefers-color-scheme: dark) {
		.chat-input-field {
			color: var(--color-neutral-50);
		}
	}

	.chat-input-field:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	.chat-send-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 0;
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		color: white;
		border: none;
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.chat-send-button:hover:not(:disabled) {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		transform: translateY(-1px);
		box-shadow: var(--glass-shadow-lg);
	}

	.chat-send-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.chat-send-button:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}
</style>
