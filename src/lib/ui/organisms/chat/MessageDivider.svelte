<script lang="ts">
	interface Props {
		text?: string;
		date?: Date;
		type?: 'date' | 'unread' | 'custom';
		unreadCount?: number;
	}

	let { text, date, type = 'date', unreadCount = 0 }: Props = $props();

	const displayText = $derived(() => {
		if (type === 'unread') {
			return unreadCount > 0 ? `${unreadCount} Unread Message${unreadCount > 1 ? 's' : ''}` : 'Unread Messages';
		}
		if (type === 'custom' && text) {
			return text;
		}
		if (date) {
			return formatDate(date);
		}
		return 'Today';
	});

	function formatDate(d: Date): string {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		const isToday = d.toDateString() === today.toDateString();
		const isYesterday = d.toDateString() === yesterday.toDateString();

		if (isToday) return 'Today';
		if (isYesterday) return 'Yesterday';

		const diffTime = today.getTime() - d.getTime();
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 7) {
			return d.toLocaleDateString('en-US', { weekday: 'long' });
		}

		return d.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: d.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
		});
	}
</script>

<div class="message-divider" class:unread={type === 'unread'}>
	<div class="divider-line"></div>
	<span class="divider-text">{displayText()}</span>
	<div class="divider-line"></div>
</div>

<style>
	.message-divider {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		margin: var(--spacing-4) 0;
		position: relative;
	}

	.divider-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			var(--glass-border) 20%,
			var(--glass-border) 80%,
			transparent
		);
	}

	.divider-text {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-400);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		white-space: nowrap;
		padding: var(--spacing-1) var(--spacing-3);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		backdrop-filter: blur(10px);
	}

	.message-divider.unread .divider-line {
		background: linear-gradient(
			to right,
			transparent,
			var(--color-primary-500) 20%,
			var(--color-primary-500) 80%,
			transparent
		);
		height: 2px;
	}

	.message-divider.unread .divider-text {
		color: var(--color-primary-200);
		background: linear-gradient(
			135deg,
			rgba(var(--color-primary-rgb), 0.2),
			rgba(var(--color-primary-rgb), 0.3)
		);
		border-color: var(--color-primary-500);
		font-weight: var(--font-weight-semibold);
	}
</style>
