<script lang="ts">
	interface Props {
		onSend?: (message: string) => void;
		placeholder?: string;
		disabled?: boolean;
		maxLength?: number;
		showCounter?: boolean;
	}

	let {
		onSend,
		placeholder = 'Type a message...',
		disabled = false,
		maxLength = 1000,
		showCounter = false
	}: Props = $props();

	let message = $state('');
	let textarea: HTMLTextAreaElement;

	function handleSend() {
		const trimmed = message.trim();
		if (trimmed && onSend) {
			onSend(trimmed);
			message = '';
			if (textarea) {
				textarea.style.height = 'auto';
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	function handleInput() {
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
		}
	}
</script>

<div class="chat-input-wrapper">
	<div class="input-container" class:disabled>
		<textarea
			bind:this={textarea}
			bind:value={message}
			{placeholder}
			{disabled}
			maxlength={maxLength}
			onkeydown={handleKeydown}
			oninput={handleInput}
			rows="1"
			aria-label="Message input"
		></textarea>
		
		<button
			type="button"
			class="send-button"
			onclick={handleSend}
			disabled={!message.trim() || disabled}
			aria-label="Send message"
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
			</svg>
		</button>
	</div>
	
	{#if showCounter}
		<div class="character-counter">
			{message.length} / {maxLength}
		</div>
	{/if}
</div>

<style>
	.chat-input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.input-container {
		display: flex;
		align-items: flex-end;
		gap: var(--spacing-2);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-3);
		transition: all var(--transition-normal);
	}

	.input-container:focus-within {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}

	.input-container.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	textarea {
		flex: 1;
		background: transparent;
		border: none;
		color: var(--color-neutral-50);
		font-size: var(--font-size-base);
		font-family: inherit;
		resize: none;
		outline: none;
		max-height: 150px;
		overflow-y: auto;
		line-height: 1.5;
	}

	textarea::placeholder {
		color: var(--color-neutral-500);
	}

	textarea:disabled {
		cursor: not-allowed;
	}

	.send-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		border: none;
		border-radius: var(--radius-full);
		color: white;
		cursor: pointer;
		transition: all var(--transition-normal);
		flex-shrink: 0;
	}

	.send-button:hover:not(:disabled) {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		box-shadow: var(--glass-shadow-md);
		transform: scale(1.05);
	}

	.send-button:active:not(:disabled) {
		transform: scale(0.95);
	}

	.send-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.character-counter {
		text-align: right;
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
		padding: 0 var(--spacing-2);
	}
</style>
