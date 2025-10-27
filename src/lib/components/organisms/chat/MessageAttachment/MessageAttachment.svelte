<script lang="ts">
	export interface Attachment {
		id: string;
		name: string;
		size: number;
		type: string;
		url: string;
		thumbnail?: string;
	}

	import type { MessageAttachmentProps } from './MessageAttachment.types.js';

	let { attachment,
		onDownload,
		variant = 'inline'
	 }: MessageAttachmentProps = $props();

	const isImage = $derived(attachment.type.startsWith('image/'));
	const isVideo = $derived(attachment.type.startsWith('video/'));
	const isAudio = $derived(attachment.type.startsWith('audio/'));
	const isPDF = $derived(attachment.type === 'application/pdf');

	function formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
		return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
	}

	function getFileIcon(): string {
		if (isImage) return '🖼️';
		if (isVideo) return '🎬';
		if (isAudio) return '🎵';
		if (isPDF) return '📄';
		if (attachment.type.includes('zip') || attachment.type.includes('compressed')) return '🗜️';
		if (attachment.type.includes('word') || attachment.type.includes('document')) return '📝';
		if (attachment.type.includes('sheet') || attachment.type.includes('excel')) return '📊';
		if (attachment.type.includes('presentation') || attachment.type.includes('powerpoint')) return '📽️';
		return '📎';
	}

	function handleDownload() {
		onDownload?.(attachment);
	}
</script>

{#if variant === 'inline'}
	<div class="attachment-inline">
		{#if isImage}
			<div class="image-preview">
				<img src={attachment.url} alt={attachment.name} />
				<button type="button" class="download-overlay" onclick={handleDownload} aria-label="Download">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
					</svg>
				</button>
			</div>
		{:else if isVideo}
			<video src={attachment.url} controls class="video-preview">
				<track kind="captions" />
			</video>
		{:else if isAudio}
			<audio src={attachment.url} controls class="audio-preview">
				<track kind="captions" />
			</audio>
		{:else}
			<div class="file-preview">
				<span class="file-icon">{getFileIcon()}</span>
				<div class="file-info">
					<span class="file-name">{attachment.name}</span>
					<span class="file-size">{formatSize(attachment.size)}</span>
				</div>
				<button type="button" class="download-btn" onclick={handleDownload} aria-label="Download">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
					</svg>
				</button>
			</div>
		{/if}
	</div>
{:else}
	<button type="button" class="attachment-compact" onclick={handleDownload}>
		<span class="compact-icon">{getFileIcon()}</span>
		<div class="compact-info">
			<span class="compact-name">{attachment.name}</span>
			<span class="compact-size">{formatSize(attachment.size)}</span>
		</div>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
		</svg>
	</button>
{/if}

<style>
	.attachment-inline {
		max-width: 400px;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.image-preview {
		position: relative;
		background: var(--color-neutral-900);
	}

	.image-preview img {
		width: 100%;
		height: auto;
		display: block;
		max-height: 300px;
		object-fit: cover;
	}

	.download-overlay {
		position: absolute;
		top: var(--spacing-2);
		right: var(--spacing-2);
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		border: none;
		border-radius: var(--radius-lg);
		color: white;
		cursor: pointer;
		opacity: 0;
		transition: all var(--transition-fast);
	}

	.image-preview:hover .download-overlay {
		opacity: 1;
	}

	.download-overlay:hover {
		background: rgba(0, 0, 0, 0.9);
		transform: scale(1.05);
	}

	.video-preview,
	.audio-preview {
		width: 100%;
		border-radius: var(--radius-lg);
		background: var(--color-neutral-900);
	}

	.video-preview {
		max-height: 300px;
	}

	.file-preview {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
	}

	.file-icon {
		font-size: 32px;
		flex-shrink: 0;
	}

	.file-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		min-width: 0;
	}

	.file-name {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-100);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.file-size {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
	}

	.download-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-neutral-300);
		cursor: pointer;
		transition: all var(--transition-fast);
		flex-shrink: 0;
	}

	.download-btn:hover {
		background: var(--color-primary-600);
		border-color: var(--color-primary-500);
		color: white;
		transform: translateY(-1px);
	}

	.attachment-compact {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-3);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		max-width: 250px;
	}

	.attachment-compact:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--color-primary-500);
	}

	.compact-icon {
		font-size: 24px;
		flex-shrink: 0;
	}

	.compact-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.compact-name {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-200);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.compact-size {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
	}

	.attachment-compact svg {
		color: var(--color-neutral-400);
		flex-shrink: 0;
	}
</style>
