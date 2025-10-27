<script lang="ts">
	export interface Reaction {
		emoji: string;
		count: number;
		userReacted: boolean;
		users?: string[];
	}

	import type { MessageReactionProps } from './MessageReaction.types.js';

	let { reactions = [],
		showPicker = false,
		onReactionClick,
		onReactionAdd,
		size = 'md'
	 }: MessageReactionProps = $props();

	const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🎉', '🔥', '👏', '✨'];

	let pickerOpen = $state(false);

	function handleReactionClick(emoji: string, userReacted: boolean) {
		onReactionClick?.(emoji);
	}

	function handleEmojiSelect(emoji: string) {
		onReactionAdd?.(emoji);
		pickerOpen = false;
	}

	function handleTogglePicker() {
		pickerOpen = !pickerOpen;
	}

	function getTooltipText(reaction: Reaction): string {
		if (reaction.users && reaction.users.length > 0) {
			if (reaction.users.length === 1) {
				return reaction.users[0];
			} else if (reaction.users.length === 2) {
				return `${reaction.users[0]} and ${reaction.users[1]}`;
			} else {
				const others = reaction.users.length - 2;
				return `${reaction.users[0]}, ${reaction.users[1]} and ${others} other${others > 1 ? 's' : ''}`;
			}
		}
		return `${reaction.count} ${reaction.count === 1 ? 'reaction' : 'reactions'}`;
	}
</script>

<div class="message-reaction" class:size-sm={size === 'sm'} class:size-lg={size === 'lg'}>
	<div class="reactions-container">
		{#each reactions as reaction (reaction.emoji)}
			<button
				type="button"
				class="reaction-bubble"
				class:reacted={reaction.userReacted}
				onclick={() => handleReactionClick(reaction.emoji, reaction.userReacted)}
				title={getTooltipText(reaction)}
			>
				<span class="emoji">{reaction.emoji}</span>
				<span class="count">{reaction.count}</span>
			</button>
		{/each}

		{#if showPicker}
			<div class="picker-container">
				<button
					type="button"
					class="add-reaction-btn"
					onclick={handleTogglePicker}
					aria-label="Add reaction"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10" />
						<path d="M8 14s1.5 2 4 2 4-2 4-2" />
						<line x1="9" y1="9" x2="9.01" y2="9" />
						<line x1="15" y1="9" x2="15.01" y2="9" />
					</svg>
				</button>

				{#if pickerOpen}
					<div class="emoji-picker">
						<div class="emoji-grid">
							{#each commonEmojis as emoji}
								<button
									type="button"
									class="emoji-option"
									onclick={() => handleEmojiSelect(emoji)}
								>
									{emoji}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.message-reaction {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-1);
	}

	.reactions-container {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
		flex-wrap: wrap;
	}

	.reaction-bubble {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-1);
		padding: var(--spacing-1) var(--spacing-2);
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		cursor: pointer;
		transition: all var(--transition-fast);
		font-size: var(--font-size-sm);
	}

	.size-sm .reaction-bubble {
		padding: 2px var(--spacing-1);
		font-size: var(--font-size-xs);
	}

	.size-lg .reaction-bubble {
		padding: var(--spacing-2) var(--spacing-3);
		font-size: var(--font-size-base);
	}

	.reaction-bubble:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
		transform: scale(1.05);
	}

	.reaction-bubble.reacted {
		background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.2), rgba(var(--color-primary-rgb), 0.3));
		border-color: var(--color-primary-500);
	}

	.reaction-bubble.reacted:hover {
		background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.3), rgba(var(--color-primary-rgb), 0.4));
	}

	.emoji {
		line-height: 1;
	}

	.count {
		color: var(--color-neutral-200);
		font-size: inherit;
		font-weight: var(--font-weight-medium);
		line-height: 1;
	}

	.reaction-bubble.reacted .count {
		color: var(--color-primary-200);
	}

	.picker-container {
		position: relative;
	}

	.add-reaction-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding: 0;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.size-sm .add-reaction-btn {
		width: 24px;
		height: 24px;
	}

	.size-lg .add-reaction-btn {
		width: 32px;
		height: 32px;
	}

	.add-reaction-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
		color: var(--color-neutral-200);
		transform: scale(1.05);
	}

	.emoji-picker {
		position: absolute;
		bottom: calc(100% + var(--spacing-2));
		right: 0;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: var(--spacing-2);
		box-shadow: var(--glass-shadow-lg);
		z-index: 1000;
		animation: slideUp 0.2s ease-out;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.emoji-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: var(--spacing-1);
	}

	.emoji-option {
		width: 36px;
		height: 36px;
		padding: 0;
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		font-size: var(--font-size-lg);
		cursor: pointer;
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.emoji-option:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
		transform: scale(1.1);
	}
</style>
