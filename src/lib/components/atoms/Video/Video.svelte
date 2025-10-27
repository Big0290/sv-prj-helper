<script lang="ts">
	import type { VideoProps } from './Video.types.js';

	let { src,
		poster,
		autoplay = false,
		loop = false,
		muted = false,
		controls = true,
		width = '100%',
		height,
		aspectRatio = '16/9'
	 }: VideoProps = $props();

	let videoElement: HTMLVideoElement;
	let containerElement: HTMLDivElement;
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let volume = $state(1);
	let isMuted = $state(muted);
	let isFullscreen = $state(false);

	function togglePlay() {
		if (videoElement.paused) {
			videoElement.play();
		} else {
			videoElement.pause();
		}
	}

	function handleTimeUpdate() {
		currentTime = videoElement.currentTime;
	}

	function handleLoadedMetadata() {
		duration = videoElement.duration || 0;
	}
	
	function handleDurationChange() {
		// Update duration when it becomes available
		if (videoElement.duration && !isNaN(videoElement.duration) && isFinite(videoElement.duration)) {
			duration = videoElement.duration;
		}
	}

	function handleSeek(e: Event) {
		const input = e.target as HTMLInputElement;
		videoElement.currentTime = parseFloat(input.value);
	}

	function handleVolumeChange(e: Event) {
		const input = e.target as HTMLInputElement;
		volume = parseFloat(input.value);
		videoElement.volume = volume;
		isMuted = volume === 0;
	}

	function toggleMute() {
		isMuted = !isMuted;
		videoElement.muted = isMuted;
	}
	
	async function toggleFullscreen() {
		try {
			if (!document.fullscreenElement) {
				await containerElement.requestFullscreen();
				isFullscreen = true;
			} else {
				await document.exitFullscreen();
				isFullscreen = false;
			}
		} catch (err) {
			console.error('Fullscreen error:', err);
		}
	}
	
	function handleFullscreenChange() {
		isFullscreen = !!document.fullscreenElement;
	}
	
	$effect(() => {
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	});

	function formatTime(seconds: number): string {
		if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<div bind:this={containerElement} class="video-container" style="width: {width}; aspect-ratio: {aspectRatio};">
	<video
		bind:this={videoElement}
		{src}
		{poster}
		{autoplay}
		{loop}
		{muted}
		controls={!controls}
		class="video-element"
		onplay={() => isPlaying = true}
		onpause={() => isPlaying = false}
		ontimeupdate={handleTimeUpdate}
		onloadedmetadata={handleLoadedMetadata}
		ondurationchange={handleDurationChange}
		aria-label="Video player"
	>
		<track kind="captions" />
		Your browser does not support the video tag.
	</video>

	{#if controls}
		<div class="video-controls">
			<button
				type="button"
				class="control-button"
				onclick={togglePlay}
				aria-label={isPlaying ? 'Pause' : 'Play'}
			>
				{#if isPlaying}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<rect x="6" y="4" width="4" height="16" />
						<rect x="14" y="4" width="4" height="16" />
					</svg>
				{:else}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<polygon points="5 3 19 12 5 21 5 3" />
					</svg>
				{/if}
			</button>

			<input
				type="range"
				min="0"
				max={duration || 0}
				value={currentTime}
				oninput={handleSeek}
				class="seek-bar"
				aria-label="Seek video"
			/>

			<span class="time-display">
				{formatTime(currentTime)} / {formatTime(duration)}
			</span>

			<button
				type="button"
				class="control-button"
				onclick={toggleMute}
				aria-label={isMuted ? 'Unmute' : 'Mute'}
			>
				{#if isMuted}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
						<line x1="23" y1="9" x2="17" y2="15" />
						<line x1="17" y1="9" x2="23" y2="15" />
					</svg>
				{:else}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
						<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
					</svg>
				{/if}
			</button>

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
			
			<button
				type="button"
				class="control-button"
				onclick={toggleFullscreen}
				aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
			>
				{#if isFullscreen}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
					</svg>
				{:else}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
					</svg>
				{/if}
			</button>
		</div>
	{/if}
</div>

<style>
	.video-container {
		position: relative;
		background: var(--color-neutral-900);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--glass-shadow-lg);
	}
	
	.video-container:fullscreen {
		border-radius: 0;
		width: 100vw;
		height: 100vh;
	}
	
	.video-container:fullscreen .video-element {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.video-element {
		width: 100%;
		height: 100%;
		display: block;
	}

	.video-controls {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
		color: white;
	}

	.control-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: var(--radius-md);
		color: white;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.control-button:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.control-button:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.seek-bar {
		flex: 1;
		height: 4px;
		-webkit-appearance: none;
		appearance: none;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		outline: none;
		cursor: pointer;
	}

	.seek-bar::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 14px;
		height: 14px;
		background: white;
		border-radius: 50%;
		cursor: pointer;
	}

	.seek-bar::-moz-range-thumb {
		width: 14px;
		height: 14px;
		background: white;
		border: none;
		border-radius: 50%;
		cursor: pointer;
	}

	.time-display {
		font-size: var(--font-size-sm);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.volume-bar {
		width: 80px;
		height: 4px;
		-webkit-appearance: none;
		appearance: none;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		outline: none;
		cursor: pointer;
	}

	.volume-bar::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		background: white;
		border-radius: 50%;
		cursor: pointer;
	}

	.volume-bar::-moz-range-thumb {
		width: 12px;
		height: 12px;
		background: white;
		border: none;
		border-radius: 50%;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.volume-bar {
			display: none;
		}
	}
</style>
