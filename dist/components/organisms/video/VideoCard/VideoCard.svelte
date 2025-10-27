<script lang="ts">
	import type { VideoCardProps } from './VideoCard.types.js';

	let { title,
		src,
		thumbnail,
		description,
		duration,
		views,
		uploadDate,
		author,
		onClick,
		enableHoverPreview = true
	 }: VideoCardProps = $props();
	
	let videoElement = $state<HTMLVideoElement>();
	let isHovering = $state(false);
	let hoverTimeout: number;
	
	function handleMouseEnter() {
		if (!enableHoverPreview) return;
		isHovering = true;
		
		// Start playing after a short delay (300ms)
		hoverTimeout = setTimeout(() => {
			if (videoElement && isHovering) {
				videoElement.currentTime = 0;
				videoElement.play().catch(() => {});
			}
		}, 300);
	}
	
	function handleMouseLeave() {
		if (!enableHoverPreview) return;
		isHovering = false;
		clearTimeout(hoverTimeout);
		
		if (videoElement) {
			videoElement.pause();
			videoElement.currentTime = 0;
		}
	}

	function formatDuration(seconds?: number): string {
		if (!seconds) return '';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function formatViews(count?: number): string {
		if (!count) return '0 views';
		if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
		if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
		return `${count} views`;
	}

	function formatDate(date?: Date | string): string {
		if (!date) return '';
		const d = typeof date === 'string' ? new Date(date) : date;
		const now = new Date();
		const diff = now.getTime() - d.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		
		if (days === 0) return 'Today';
		if (days === 1) return '1 day ago';
		if (days < 7) return `${days} days ago`;
		if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
		if (days < 365) return `${Math.floor(days / 30)} months ago`;
		return `${Math.floor(days / 365)} years ago`;
	}
</script>

<article 
	class="video-card" 
	class:hovering={isHovering}
	onclick={onClick} 
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onkeydown={(e) => {
		if (onClick && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onClick();
		}
	}}
	{...onClick ? { role: 'button', tabindex: '0', 'aria-label': `Play video: ${title}` } : {}}
>
	<div class="thumbnail-wrapper">
		{#if enableHoverPreview}
			<video
				bind:this={videoElement}
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
			<img src={thumbnail} alt={title} class="thumbnail" class:hidden={isHovering && enableHoverPreview} />
		{:else}
			<div class="thumbnail-placeholder" class:hidden={isHovering && enableHoverPreview}>
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polygon points="5 3 19 12 5 21 5 3" />
				</svg>
			</div>
		{/if}
		{#if duration}
			<span class="duration">{formatDuration(duration)}</span>
		{/if}
		<div class="play-overlay" class:hidden={isHovering && enableHoverPreview}>
			<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
				<polygon points="5 3 19 12 5 21 5 3" />
			</svg>
		</div>
	</div>

	<div class="content">
		<h3 class="title">{title}</h3>
		{#if description}
			<p class="description">{description}</p>
		{/if}
		{#if author || views || uploadDate}
			<div class="meta">
				{#if author}
					<span class="author">{author}</span>
				{/if}
				<div class="stats">
					{#if views}
						<span>{formatViews(views)}</span>
					{/if}
					{#if uploadDate}
						<span>{formatDate(uploadDate)}</span>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</article>

<style>
	.video-card {
		display: flex;
		flex-direction: column;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		transition: all var(--transition-normal);
		cursor: pointer;
	}

	.video-card:hover {
		border-color: var(--color-primary-500);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		transform: translateY(-4px);
	}

	.thumbnail-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 16/9;
		overflow: hidden;
		background: var(--color-neutral-900);
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

	.thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: opacity 0.3s ease;
	}
	
	.thumbnail.hidden,
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
		color: var(--color-neutral-600);
	}

	.duration {
		position: absolute;
		bottom: var(--spacing-2);
		right: var(--spacing-2);
		padding: 4px 8px;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		border-radius: var(--radius-sm);
		font-variant-numeric: tabular-nums;
	}

	.play-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 50%;
		color: white;
		opacity: 0;
		transition: all var(--transition-normal);
	}

	.video-card:hover .play-overlay {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1.1);
		background: var(--color-primary-600);
	}

	.content {
		padding: var(--spacing-4);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.title {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-50);
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 1.4;
	}

	.description {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 1.5;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
	}

	.author {
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-300);
	}

	.stats {
		display: flex;
		gap: var(--spacing-2);
		align-items: center;
	}

	.stats span:not(:last-child)::after {
		content: '•';
		margin-left: var(--spacing-2);
	}
</style>
