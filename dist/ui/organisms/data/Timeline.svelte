<script module lang="ts">
export interface TimelineItem {
		id: string;
		title: string;
		description?: string;
		timestamp: Date | string;
		icon?: string;
		variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
		content?: Snippet;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	

	interface Props {
		items: TimelineItem[];
		variant?: 'default' | 'compact' | 'detailed' | 'alternating';
		position?: 'left' | 'right' | 'center';
		showLine?: boolean;
		showTime?: boolean;
		timeFormat?: 'relative' | 'absolute' | 'time' | 'date';
		onItemClick?: (item: TimelineItem) => void;
	}

	let {
		items,
		variant = 'default',
		position = 'left',
		showLine = true,
		showTime = true,
		timeFormat = 'relative',
		onItemClick
	}: Props = $props();

	function formatTime(timestamp: Date | string): string {
		const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
		
		if (timeFormat === 'relative') {
			const now = new Date();
			const diff = now.getTime() - date.getTime();
			const minutes = Math.floor(diff / 60000);
			const hours = Math.floor(diff / 3600000);
			const days = Math.floor(diff / 86400000);
			
			if (minutes < 1) return 'Just now';
			if (minutes < 60) return `${minutes}m ago`;
			if (hours < 24) return `${hours}h ago`;
			if (days < 7) return `${days}d ago`;
			return date.toLocaleDateString();
		} else if (timeFormat === 'time') {
			return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		} else if (timeFormat === 'date') {
			return date.toLocaleDateString();
		}
		
		return date.toLocaleString();
	}

	function getIconColor(itemVariant?: string): string {
		const colors = {
			success: 'var(--color-success-600)',
			warning: 'var(--color-warning-600)',
			error: 'var(--color-error-600)',
			info: 'var(--color-info-600)',
			default: 'var(--color-primary-600)'
		};
		return colors[itemVariant as keyof typeof colors] || colors.default;
	}
</script>

<div class="timeline" data-variant={variant} data-position={position}>
	{#each items as item, i}
		<div
			class="timeline-item"
			class:alternating-left={variant === 'alternating' && i % 2 === 0}
			class:alternating-right={variant === 'alternating' && i % 2 === 1}
		>
			{#if showLine && i > 0}
				<div class="timeline-line" aria-hidden="true"></div>
			{/if}

			<button
				type="button"
				class="timeline-dot"
				style="--dot-color: {getIconColor(item.variant)}"
				onclick={() => onItemClick?.(item)}
				disabled={!onItemClick}
			>
				{#if item.icon}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d={item.icon} />
					</svg>
				{/if}
			</button>

			<div class="timeline-content">
				{#if showTime}
					<div class="timeline-time">{formatTime(item.timestamp)}</div>
				{/if}

				<div class="timeline-card">
					<h4 class="timeline-title">{item.title}</h4>
					{#if item.description}
						<p class="timeline-description">{item.description}</p>
					{/if}
					{#if item.content}
						<div class="timeline-custom">
							{@render item.content()}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.timeline-item {
		position: relative;
		display: flex;
		gap: var(--spacing-4);
		align-items: flex-start;
	}

	.timeline[data-position="center"] {
		align-items: center;
	}

	.timeline[data-position="right"] .timeline-item {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}

	.timeline-line {
		position: absolute;
		left: 1rem;
		top: -1rem;
		width: 2px;
		height: calc(100% - 2rem);
		background: var(--color-neutral-200);
	}

	.timeline[data-position="right"] .timeline-line {
		left: auto;
		right: 1rem;
	}

	.timeline-dot {
		position: relative;
		z-index: 1;
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: var(--dot-color, var(--color-primary-600));
		border: 3px solid white;
		box-shadow: 0 0 0 2px var(--dot-color, var(--color-primary-600));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		cursor: default;
		transition: all var(--transition-normal);
	}

	.timeline-dot:not(:disabled) {
		cursor: pointer;
	}

	.timeline-dot:not(:disabled):hover {
		transform: scale(1.2);
	}

	.timeline-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		min-width: 0;
	}

	.timeline-time {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
		font-weight: var(--font-weight-medium);
	}

	.timeline-card {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: var(--spacing-4);
		transition: all var(--transition-normal);
	}

	.timeline-card:hover {
		box-shadow: var(--shadow-md);
	}

	.timeline-title {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-800);
		margin: 0 0 var(--spacing-2) 0;
	}

	.timeline-description {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-600);
		margin: 0;
		line-height: 1.5;
	}

	.timeline-custom {
		margin-top: var(--spacing-3);
	}

	/* Compact variant */
	.timeline[data-variant="compact"] .timeline-card {
		padding: var(--spacing-3);
	}

	.timeline[data-variant="compact"] .timeline-title {
		font-size: var(--font-size-sm);
	}

	.timeline[data-variant="compact"] .timeline-description {
		font-size: var(--font-size-xs);
	}

	.timeline[data-variant="compact"] .timeline-dot {
		width: 1.5rem;
		height: 1.5rem;
	}

	/* Detailed variant */
	.timeline[data-variant="detailed"] .timeline-card {
		padding: var(--spacing-6);
	}

	.timeline[data-variant="detailed"] .timeline-title {
		font-size: var(--font-size-lg);
	}

	/* Alternating variant */
	.timeline[data-variant="alternating"] {
		max-width: 800px;
		margin: 0 auto;
	}

	.timeline[data-variant="alternating"] .timeline-item {
		width: 100%;
	}

	.timeline[data-variant="alternating"] .timeline-item.alternating-left {
		flex-direction: row;
	}

	.timeline[data-variant="alternating"] .timeline-item.alternating-right {
		flex-direction: row-reverse;
	}

	.timeline[data-variant="alternating"] .timeline-content {
		max-width: 45%;
	}

	.timeline[data-variant="alternating"] .timeline-line {
		left: 50%;
		transform: translateX(-50%);
	}

	@media (prefers-color-scheme: dark) {
		.timeline-title {
			color: var(--color-neutral-100);
		}

		.timeline-dot {
			border-color: var(--color-neutral-900);
		}
	}

	@media (max-width: 768px) {
		.timeline[data-variant="alternating"] .timeline-item {
			flex-direction: row !important;
		}

		.timeline[data-variant="alternating"] .timeline-content {
			max-width: 100%;
		}

		.timeline[data-variant="alternating"] .timeline-line {
			left: 1rem;
			transform: none;
		}
	}
</style>
