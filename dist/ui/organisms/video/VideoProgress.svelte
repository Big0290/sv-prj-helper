<script lang="ts">
	interface Props {
		videoId: string;
		duration: number;
		currentTime?: number;
		onResume?: (time: number) => void;
		autoSave?: boolean;
		showLabel?: boolean;
	}

	let {
		videoId,
		duration,
		currentTime = $bindable(0),
		onResume,
		autoSave = true,
		showLabel = true
	}: Props = $props();

	let savedProgress = $state<number>(0);
	let hasWatched = $derived(savedProgress > 0);
	let percentComplete = $derived((savedProgress / duration) * 100);
	let isComplete = $derived(percentComplete >= 90); // Consider 90%+ as complete

	// Load saved progress from localStorage on mount
	$effect(() => {
		if (autoSave && typeof window !== 'undefined') {
			const saved = localStorage.getItem(`video-progress-${videoId}`);
			if (saved) {
				savedProgress = parseFloat(saved);
			}
		}
	});

	// Auto-save progress
	$effect(() => {
		if (autoSave && currentTime > 0 && typeof window !== 'undefined') {
			localStorage.setItem(`video-progress-${videoId}`, currentTime.toString());
			savedProgress = currentTime;
		}
	});

	function handleResume() {
		if (onResume && savedProgress > 0) {
			onResume(savedProgress);
		}
	}

	function clearProgress() {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(`video-progress-${videoId}`);
			savedProgress = 0;
		}
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

{#if hasWatched}
	<div class="video-progress">
		<div class="progress-bar">
			<div class="progress-fill" style="width: {percentComplete}%"></div>
		</div>
		
		{#if showLabel}
			<div class="progress-info">
				<div class="progress-text">
					{#if isComplete}
						<span class="status-icon complete">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12" />
							</svg>
						</span>
						<span>Completed</span>
					{:else}
						<span class="status-icon">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polygon points="5 3 19 12 5 21 5 3" />
							</svg>
						</span>
						<span>{Math.round(percentComplete)}% watched</span>
					{/if}
				</div>
				
				<div class="progress-actions">
					{#if !isComplete && onResume}
						<button type="button" class="action-btn resume" onclick={handleResume}>
							Resume at {formatTime(savedProgress)}
						</button>
					{/if}
					<button type="button" class="action-btn clear" onclick={clearProgress} aria-label="Clear progress">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.video-progress {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
	}

	.progress-bar {
		height: 6px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
		overflow: hidden;
		position: relative;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-primary-600), var(--color-primary-500));
		border-radius: 3px;
		transition: width var(--transition-normal);
		position: relative;
	}

	.progress-fill::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.progress-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-3);
	}

	.progress-text {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		font-size: var(--font-size-sm);
		color: var(--color-neutral-300);
		font-weight: var(--font-weight-medium);
	}

	.status-icon {
		display: flex;
		align-items: center;
		color: var(--color-primary-500);
	}

	.status-icon.complete {
		color: var(--color-success-500);
	}

	.progress-actions {
		display: flex;
		gap: var(--spacing-2);
		align-items: center;
	}

	.action-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
		padding: var(--spacing-1) var(--spacing-3);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-neutral-200);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
	}

	.action-btn.resume {
		color: var(--color-primary-400);
	}

	.action-btn.clear {
		padding: var(--spacing-1);
		min-width: 28px;
		justify-content: center;
	}

	.action-btn.clear:hover {
		border-color: var(--color-danger-500);
		color: var(--color-danger-400);
	}

	@media (max-width: 640px) {
		.progress-info {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
