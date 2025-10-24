<script lang="ts">
	interface Props {
		src: string;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
		showDuration?: boolean;
		variant?: 'default' | 'minimal';
	}

	let {
		src,
		title = '',
		size = 'md',
		showDuration = true,
		variant = 'default'
	}: Props = $props();

	let audioElement: HTMLAudioElement;
	let isPlaying = $state(false);
	let duration = $state(0);
	let currentTime = $state(0);

	function togglePlay() {
		if (isPlaying) {
			audioElement.pause();
		} else {
			audioElement.play();
		}
		isPlaying = !isPlaying;
	}

	function formatTime(seconds: number): string {
		if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function handleLoadedMetadata() {
		duration = audioElement.duration;
	}

	function handleTimeUpdate() {
		currentTime = audioElement.currentTime;
	}

	function handleEnded() {
		isPlaying = false;
	}

	const sizeClasses = {
		sm: 'audio-btn-sm',
		md: 'audio-btn-md',
		lg: 'audio-btn-lg'
	};
</script>

<audio
	bind:this={audioElement}
	{src}
	onloadedmetadata={handleLoadedMetadata}
	ontimeupdate={handleTimeUpdate}
	onended={handleEnded}
	preload="metadata"
></audio>

<button
	type="button"
	class="audio-button {sizeClasses[size]} {variant}"
	onclick={togglePlay}
	aria-label={isPlaying ? 'Pause' : 'Play'}
>
	<div class="play-icon">
		{#if isPlaying}
			<svg viewBox="0 0 24 24" fill="currentColor">
				<rect x="6" y="4" width="4" height="16" />
				<rect x="14" y="4" width="4" height="16" />
			</svg>
		{:else}
			<svg viewBox="0 0 24 24" fill="currentColor">
				<polygon points="5 3 19 12 5 21 5 3" />
			</svg>
		{/if}
	</div>
	
	{#if variant === 'default'}
		<div class="audio-info">
			{#if title}
				<span class="audio-title">{title}</span>
			{/if}
			{#if showDuration}
				<span class="audio-time">
					{formatTime(currentTime)} / {formatTime(duration)}
				</span>
			{/if}
		</div>
	{/if}
</button>

<style>
	audio {
		display: none;
	}

	.audio-button {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-3);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		padding: var(--spacing-2);
		cursor: pointer;
		transition: all var(--transition-normal);
		color: var(--color-neutral-200);
	}

	.audio-button:hover {
		border-color: var(--color-primary-500);
		background: rgba(139, 92, 246, 0.1);
	}

	.audio-button:active {
		transform: scale(0.98);
	}

	.audio-button.minimal {
		background: transparent;
		border: none;
		padding: 0;
	}

	.play-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--color-primary-500);
	}

	.audio-button-sm .play-icon svg {
		width: 16px;
		height: 16px;
	}

	.audio-button-md .play-icon svg {
		width: 20px;
		height: 20px;
	}

	.audio-button-lg .play-icon svg {
		width: 24px;
		height: 24px;
	}

	.audio-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		padding-right: var(--spacing-3);
		min-width: 0;
	}

	.audio-title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-200);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.audio-time {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
		font-family: var(--font-mono);
	}

	.audio-btn-sm {
		padding: var(--spacing-1-5);
	}

	.audio-btn-sm .audio-info {
		padding-right: var(--spacing-2);
	}

	.audio-btn-sm .audio-title {
		font-size: var(--font-size-xs);
	}

	.audio-btn-lg {
		padding: var(--spacing-3);
	}

	.audio-btn-lg .audio-info {
		padding-right: var(--spacing-4);
	}

	.audio-btn-lg .audio-title {
		font-size: var(--font-size-base);
	}
</style>
