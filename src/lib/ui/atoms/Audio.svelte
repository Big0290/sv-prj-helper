<script lang="ts">
	interface Props {
		src: string;
		title?: string;
		artist?: string;
		autoplay?: boolean;
		loop?: boolean;
	}

	let {
		src,
		title = 'Audio Track',
		artist,
		autoplay = false,
		loop = false
	}: Props = $props();

	let audioElement: HTMLAudioElement;
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let volume = $state(1);

	function togglePlay() {
		if (audioElement.paused) {
			audioElement.play();
		} else {
			audioElement.pause();
		}
	}

	function handleTimeUpdate() {
		currentTime = audioElement.currentTime;
	}

	function handleLoadedMetadata() {
		if (audioElement && audioElement.duration && isFinite(audioElement.duration)) {
			duration = audioElement.duration;
		}
	}

	$effect(() => {
		if (audioElement) {
			// Force duration update when audio element is ready
			const updateDuration = () => {
				if (audioElement.duration && isFinite(audioElement.duration)) {
					duration = audioElement.duration;
				}
			};
			
			if (audioElement.readyState >= 1) {
				updateDuration();
			}
		}
	});

	function handleSeek(e: Event) {
		const input = e.target as HTMLInputElement;
		audioElement.currentTime = parseFloat(input.value);
	}

	function handleVolumeChange(e: Event) {
		const input = e.target as HTMLInputElement;
		volume = parseFloat(input.value);
		audioElement.volume = volume;
	}

	function formatTime(seconds: number): string {
		if (!isFinite(seconds) || isNaN(seconds)) {
			return '0:00';
		}
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	const progress = $derived((currentTime / duration) * 100 || 0);
</script>

<div class="audio-player">
	<audio
		bind:this={audioElement}
		{src}
		{autoplay}
		{loop}
		preload="metadata"
		onplay={() => isPlaying = true}
		onpause={() => isPlaying = false}
		ontimeupdate={handleTimeUpdate}
		onloadedmetadata={handleLoadedMetadata}
		ondurationchange={handleLoadedMetadata}
		onloadeddata={handleLoadedMetadata}
	>
		Your browser does not support the audio element.
	</audio>

	<div class="audio-info">
		<div class="audio-title">{title}</div>
		{#if artist}
			<div class="audio-artist">{artist}</div>
		{/if}
	</div>

	<div class="audio-progress">
		<div class="progress-track">
			<div class="progress-fill" style="width: {progress}%"></div>
		</div>
		<input
			type="range"
			min="0"
			max={duration || 100}
			value={currentTime}
			oninput={handleSeek}
			class="progress-bar"
			style="--progress: {progress}%"
			aria-label="Seek audio"
		/>
	</div>

	<div class="audio-controls">
		<button
			type="button"
			class="play-button"
			onclick={togglePlay}
			aria-label={isPlaying ? 'Pause' : 'Play'}
		>
			{#if isPlaying}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<rect x="6" y="4" width="4" height="16" />
					<rect x="14" y="4" width="4" height="16" />
				</svg>
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
					<polygon points="5 3 19 12 5 21 5 3" />
				</svg>
			{/if}
		</button>

		<span class="time-display">
			{formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '--:--'}
		</span>

		<div class="volume-control">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
				<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
			</svg>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				oninput={handleVolumeChange}
				class="volume-bar"
				aria-label="Volume"
			/>
		</div>
	</div>
</div>

<style>
	.audio-player {
		width: 100%;
		padding: var(--spacing-6);
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-lg));
		-webkit-backdrop-filter: blur(var(--glass-blur-lg));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--glass-shadow);
	}

	.audio-info {
		margin-bottom: var(--spacing-4);
	}

	.audio-title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-900);
		margin-bottom: var(--spacing-1);
	}

	@media (prefers-color-scheme: dark) {
		.audio-title {
			color: var(--color-neutral-50);
		}
	}

	.audio-artist {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-600);
	}

	@media (prefers-color-scheme: dark) {
		.audio-artist {
			color: var(--color-neutral-400);
		}
	}

	.audio-progress {
		position: relative;
		margin-bottom: var(--spacing-4);
		height: 6px;
	}

	.progress-track {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 6px;
		background: var(--glass-bg-hover);
		border-radius: 3px;
		overflow: hidden;
	}

	.progress-fill {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: linear-gradient(90deg, var(--color-primary-500), var(--color-primary-600));
		border-radius: 3px;
		transition: width 0.1s linear;
	}

	.progress-bar {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 20px;
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		border-radius: 3px;
		outline: none;
		cursor: pointer;
		z-index: 2;
		margin: 0;
	}

	.progress-bar::-webkit-slider-track {
		background: transparent;
		height: 6px;
	}

	.progress-bar::-moz-range-track {
		background: transparent;
		height: 6px;
	}

	.progress-bar::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		background: white;
		border: 2px solid var(--color-primary-500);
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: transform var(--transition-fast);
	}

	.progress-bar::-webkit-slider-thumb:hover {
		transform: scale(1.2);
	}

	.progress-bar::-moz-range-thumb {
		width: 16px;
		height: 16px;
		background: white;
		border: 2px solid var(--color-primary-500);
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: transform var(--transition-fast);
	}

	.progress-bar::-moz-range-thumb:hover {
		transform: scale(1.2);
	}

	.progress-bar:focus-visible {
		outline: none;
	}

	.progress-bar:focus-visible::-webkit-slider-thumb {
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.progress-bar:focus-visible::-moz-range-thumb {
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.audio-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.play-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		padding: 0;
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		color: white;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: all var(--transition-base);
		flex-shrink: 0;
	}

	.play-button:hover {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		transform: scale(1.05);
		box-shadow: var(--glass-shadow-lg);
	}

	.play-button:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}

	.time-display {
		font-size: var(--font-size-sm);
		font-variant-numeric: tabular-nums;
		color: var(--color-neutral-700);
		white-space: nowrap;
	}

	@media (prefers-color-scheme: dark) {
		.time-display {
			color: var(--color-neutral-300);
		}
	}

	.volume-control {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		margin-left: auto;
		color: var(--color-neutral-600);
	}

	@media (prefers-color-scheme: dark) {
		.volume-control {
			color: var(--color-neutral-400);
		}
	}

	.volume-bar {
		width: 100px;
		height: 4px;
		-webkit-appearance: none;
		appearance: none;
		background: var(--glass-bg-hover);
		border-radius: 2px;
		outline: none;
		cursor: pointer;
	}

	.volume-bar::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		background: var(--color-primary-500);
		border-radius: 50%;
		cursor: pointer;
	}

	.volume-bar::-moz-range-thumb {
		width: 12px;
		height: 12px;
		background: var(--color-primary-500);
		border: none;
		border-radius: 50%;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.volume-control {
			display: none;
		}
	}
</style>
