<script lang="ts">
	interface Props {
		src: string;
		title: string;
		thumbnail?: string;
		duration?: number;
		variant?: 'inline' | 'modal';
		size?: 'sm' | 'md' | 'lg';
		enableHoverPreview?: boolean;
	}

	let {
		src,
		title,
		thumbnail,
		duration,
		variant = 'inline',
		size = 'md',
		enableHoverPreview = true
	}: Props = $props();

	let isPlaying = $state(false);
	let showModal = $state(false);
	let previewVideoElement = $state<HTMLVideoElement>();
	let isHovering = $state(false);
	let hoverTimeout: NodeJS.Timeout | undefined;

	function handleClick() {
		if (variant === 'modal') {
			showModal = true;
		} else {
			isPlaying = !isPlaying;
		}
	}
	
	function handleMouseEnter() {
		if (!enableHoverPreview) return;
		isHovering = true;
		
		// Start playing after a short delay (300ms)
		hoverTimeout = setTimeout(() => {
			if (previewVideoElement && isHovering) {
				previewVideoElement.currentTime = 0;
				previewVideoElement.play().catch(() => {});
			}
		}, 300);
	}
	
	function handleMouseLeave() {
		if (!enableHoverPreview) return;
		isHovering = false;
		clearTimeout(hoverTimeout);
		
		if (previewVideoElement) {
			previewVideoElement.pause();
			previewVideoElement.currentTime = 0;
		}
	}

	function formatDuration(seconds?: number): string {
		if (!seconds) return '';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<button
	type="button"
	class="video-button"
	class:sm={size === 'sm'}
	class:md={size === 'md'}
	class:lg={size === 'lg'}
	class:hovering={isHovering}
	onclick={handleClick}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	aria-label={`Play ${title}`}
>
	<div class="thumbnail-container">
		{#if enableHoverPreview}
			<video
				bind:this={previewVideoElement}
				src={src}
				class="preview-video"
				class:visible={isHovering}
				muted
				loop
				playsinline
				aria-hidden="true"
			>
				<track kind="captions" />
			</video>
		{/if}
		
		{#if thumbnail}
			<img src={thumbnail} alt={title} class="thumbnail-img" class:hidden={isHovering && enableHoverPreview} />
		{:else}
			<div class="thumbnail-placeholder" class:hidden={isHovering && enableHoverPreview}>
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
					<line x1="7" y1="2" x2="7" y2="22" />
					<line x1="17" y1="2" x2="17" y2="22" />
					<line x1="2" y1="12" x2="22" y2="12" />
					<line x1="2" y1="7" x2="7" y2="7" />
					<line x1="2" y1="17" x2="7" y2="17" />
					<line x1="17" y1="17" x2="22" y2="17" />
					<line x1="17" y1="7" x2="22" y2="7" />
				</svg>
			</div>
		{/if}
		<div class="play-overlay" class:hidden={isHovering && enableHoverPreview}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
				<polygon points="5 3 19 12 5 21 5 3" />
			</svg>
		</div>
		{#if duration}
			<span class="duration-badge">{formatDuration(duration)}</span>
		{/if}
	</div>
	<div class="info">
		<span class="title-text">{title}</span>
	</div>
</button>

{#if isPlaying && variant === 'inline'}
	<div class="inline-player">
		<video src={src} controls autoplay aria-label={title}>
			<track kind="captions" />
		</video>
		<button type="button" class="close-btn" onclick={() => isPlaying = false} aria-label="Close">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	</div>
{/if}

{#if showModal && variant === 'modal'}
	<div
		class="modal-overlay"
		onclick={() => showModal = false}
		onkeydown={(e) => e.key === 'Escape' && (showModal = false)}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="modal-content"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && (showModal = false)}
			role="document"
		>
			<video src={src} controls autoplay aria-label={title}>
				<track kind="captions" />
			</video>
			<button type="button" class="modal-close-btn" onclick={() => showModal = false} aria-label="Close">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	.video-button {
		display: flex;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-normal);
		text-align: left;
		width: 100%;
		max-width: 400px;
	}

	.video-button:hover {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
		transform: translateY(-2px);
	}

	.video-button.sm {
		padding: var(--spacing-2);
		gap: var(--spacing-2);
		max-width: 300px;
	}

	.video-button.lg {
		padding: var(--spacing-4);
		gap: var(--spacing-4);
		max-width: 500px;
	}

	.thumbnail-container {
		position: relative;
		border-radius: var(--radius-md);
		overflow: hidden;
		flex-shrink: 0;
	}
	
	.preview-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 2;
	}
	
	.preview-video.visible {
		opacity: 1;
	}

	.video-button.sm .thumbnail-container {
		width: 100px;
		height: 56px;
	}

	.video-button.md .thumbnail-container {
		width: 120px;
		height: 68px;
	}

	.video-button.lg .thumbnail-container {
		width: 160px;
		height: 90px;
	}

	.thumbnail-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: opacity 0.3s ease;
	}
	
	.thumbnail-img.hidden,
	.thumbnail-placeholder.hidden,
	.play-overlay.hidden {
		opacity: 0;
	}

	.thumbnail-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-neutral-800);
		color: var(--color-neutral-500);
	}

	.play-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 50%;
		color: white;
		transition: all var(--transition-fast);
	}

	.video-button:hover .play-overlay {
		background: var(--color-primary-600);
		transform: translate(-50%, -50%) scale(1.1);
	}

	.duration-badge {
		position: absolute;
		bottom: var(--spacing-1);
		right: var(--spacing-1);
		padding: 2px 6px;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		border-radius: var(--radius-sm);
		font-variant-numeric: tabular-nums;
	}

	.info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	.title-text {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-50);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.video-button.sm .title-text {
		font-size: var(--font-size-sm);
		-webkit-line-clamp: 1;
		line-clamp: 1;
	}

	.video-button.lg .title-text {
		font-size: var(--font-size-lg);
	}

	.inline-player {
		position: relative;
		margin-top: var(--spacing-3);
		background: var(--color-neutral-900);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.inline-player video {
		width: 100%;
		display: block;
	}

	.close-btn {
		position: absolute;
		top: var(--spacing-2);
		right: var(--spacing-2);
		width: 32px;
		height: 32px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.7);
		border: none;
		border-radius: var(--radius-full);
		color: white;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.close-btn:hover {
		background: rgba(0, 0, 0, 0.9);
		transform: scale(1.1);
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: var(--spacing-4);
	}

	.modal-content {
		position: relative;
		width: 100%;
		max-width: 900px;
		background: var(--color-neutral-900);
		border-radius: var(--radius-xl);
		overflow: hidden;
	}

	.modal-content video {
		width: 100%;
		display: block;
	}

	.modal-close-btn {
		position: absolute;
		top: var(--spacing-3);
		right: var(--spacing-3);
		width: 40px;
		height: 40px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.7);
		border: none;
		border-radius: var(--radius-full);
		color: white;
		cursor: pointer;
		transition: all var(--transition-fast);
		z-index: 10;
	}

	.modal-close-btn:hover {
		background: rgba(0, 0, 0, 0.9);
		transform: scale(1.1);
	}
</style>
