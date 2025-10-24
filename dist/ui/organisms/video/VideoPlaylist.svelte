<script lang="ts">
	export interface VideoItem {
		id: string;
		title: string;
		src: string;
		thumbnail?: string;
		duration?: number;
	}

	interface Props {
		videos: VideoItem[];
		autoPlayNext?: boolean;
		currentIndex?: number;
		onVideoChange?: (index: number) => void;
		orientation?: 'horizontal' | 'vertical';
	}

	let {
		videos,
		autoPlayNext = true,
		currentIndex = $bindable(0),
		onVideoChange,
		orientation = 'vertical'
	}: Props = $props();

	let videoElement: HTMLVideoElement;
	let containerElement: HTMLDivElement;
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let isFullscreen = $state(false);

	function playVideo(index: number) {
		if (index >= 0 && index < videos.length) {
			currentIndex = index;
			onVideoChange?.(index);
			isPlaying = false;
			currentTime = 0;
		}
	}

	function playNext() {
		if (currentIndex < videos.length - 1) {
			playVideo(currentIndex + 1);
		} else if (autoPlayNext) {
			playVideo(0); // Loop back to start
		}
	}

	function playPrevious() {
		if (currentIndex > 0) {
			playVideo(currentIndex - 1);
		}
	}

	function handleVideoEnd() {
		if (autoPlayNext && currentIndex < videos.length - 1) {
			playNext();
		}
	}

	function togglePlay() {
		if (videoElement.paused) {
			videoElement.play();
		} else {
			videoElement.pause();
		}
	}

	function formatDuration(seconds?: number): string {
		if (!seconds) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function handleSeek(e: Event) {
		const input = e.target as HTMLInputElement;
		videoElement.currentTime = parseFloat(input.value);
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
</script>

<div bind:this={containerElement} class="video-playlist" class:horizontal={orientation === 'horizontal'}>
	<div class="player-section">
		<div class="video-wrapper">
			<video
				bind:this={videoElement}
				src={videos[currentIndex]?.src}
				onplay={() => isPlaying = true}
				onpause={() => isPlaying = false}
				ontimeupdate={() => currentTime = videoElement.currentTime}
				onloadedmetadata={() => duration = videoElement.duration}
				onended={handleVideoEnd}
				aria-label="Video player"
			>
				<track kind="captions" />
			</video>

			<div class="video-controls">
				<button type="button" class="control-btn" onclick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
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
					aria-label="Seek"
				/>

				<span class="time">{formatTime(currentTime)} / {formatTime(duration)}</span>

				<button type="button" class="control-btn" onclick={playPrevious} disabled={currentIndex === 0} aria-label="Previous">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polygon points="19 20 9 12 19 4 19 20" />
						<line x1="5" y1="19" x2="5" y2="5" />
					</svg>
				</button>

				<button type="button" class="control-btn" onclick={playNext} disabled={currentIndex === videos.length - 1} aria-label="Next">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polygon points="5 4 15 12 5 20 5 4" />
						<line x1="19" y1="5" x2="19" y2="19" />
					</svg>
				</button>
				
				<button type="button" class="control-btn" onclick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
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
		</div>

		<div class="current-info">
			<h3>{videos[currentIndex]?.title}</h3>
			<p>Video {currentIndex + 1} of {videos.length}</p>
		</div>
	</div>

	<div class="playlist-section">
		<h4>Playlist</h4>
		<div class="playlist-items">
			{#each videos as video, index}
				<button
					type="button"
					class="playlist-item"
					class:active={index === currentIndex}
					onclick={() => playVideo(index)}
				>
					{#if video.thumbnail}
						<img src={video.thumbnail} alt={video.title} class="thumbnail" />
					{:else}
						<div class="thumbnail-placeholder">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polygon points="5 3 19 12 5 21 5 3" />
							</svg>
						</div>
					{/if}
					<div class="item-info">
						<span class="item-title">{video.title}</span>
						{#if video.duration}
							<span class="item-duration">{formatDuration(video.duration)}</span>
						{/if}
					</div>
					{#if index === currentIndex}
						<div class="playing-indicator">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<rect x="6" y="4" width="4" height="16" />
								<rect x="14" y="4" width="4" height="16" />
							</svg>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.video-playlist {
		display: grid;
		grid-template-columns: 1fr 300px;
		gap: var(--spacing-4);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-4);
		box-shadow: var(--glass-shadow-lg);
	}
	
	.video-playlist:fullscreen {
		border-radius: 0;
		width: 100vw;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;
		background: var(--color-neutral-900);
	}
	
	.video-playlist:fullscreen .video-wrapper video {
		object-fit: contain;
	}

	.video-playlist.horizontal {
		grid-template-columns: 1fr;
		grid-template-rows: auto 200px;
	}

	.player-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.video-wrapper {
		position: relative;
		background: var(--color-neutral-900);
		border-radius: var(--radius-lg);
		overflow: hidden;
		aspect-ratio: 16/9;
	}

	video {
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
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
		color: white;
	}

	.control-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: var(--radius-md);
		color: white;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.control-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.2);
	}

	.control-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.seek-bar {
		flex: 1;
		height: 4px;
		-webkit-appearance: none;
		appearance: none;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		cursor: pointer;
	}

	.seek-bar::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 12px;
		height: 12px;
		background: white;
		border-radius: 50%;
		cursor: pointer;
	}

	.seek-bar::-moz-range-thumb {
		width: 12px;
		height: 12px;
		background: white;
		border: none;
		border-radius: 50%;
		cursor: pointer;
	}

	.time {
		font-size: var(--font-size-sm);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.current-info {
		padding: 0 var(--spacing-2);
	}

	.current-info h3 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-50);
		margin: 0 0 var(--spacing-1) 0;
	}

	.current-info p {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
		margin: 0;
	}

	.playlist-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.playlist-section h4 {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-100);
		margin: 0;
		padding: 0 var(--spacing-2);
	}

	.playlist-items {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		max-height: 500px;
		overflow-y: auto;
	}

	.playlist-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-2);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
	}

	.playlist-item:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--glass-border);
	}

	.playlist-item.active {
		background: rgba(139, 92, 246, 0.1);
		border-color: var(--color-primary-500);
	}

	.thumbnail,
	.thumbnail-placeholder {
		width: 80px;
		height: 45px;
		border-radius: var(--radius-sm);
		object-fit: cover;
		flex-shrink: 0;
	}

	.thumbnail-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-neutral-800);
		color: var(--color-neutral-500);
	}

	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		min-width: 0;
	}

	.item-title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-100);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-duration {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-400);
	}

	.playing-indicator {
		color: var(--color-primary-500);
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	.horizontal .playlist-items {
		flex-direction: row;
		max-height: none;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.horizontal .playlist-item {
		flex-direction: column;
		min-width: 150px;
	}

	.horizontal .thumbnail,
	.horizontal .thumbnail-placeholder {
		width: 100%;
		height: 80px;
	}

	@media (max-width: 768px) {
		.video-playlist {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
		}

		.playlist-items {
			max-height: 300px;
		}
	}
</style>
