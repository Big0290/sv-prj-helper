<script lang="ts">
	interface MediaItem {
		id: string;
		type: 'image' | 'video' | 'audio' | 'file';
		url: string;
		thumbnail?: string;
		name: string;
		size?: number;
		timestamp: Date;
		senderName?: string;
	}

	import type { MediaGalleryProps } from './MediaGallery.types.js';

	let { items = [],
		onItemClick,
		onClose,
		title = 'Shared Media'
	 }: MediaGalleryProps = $props();

	let filter = $state<'all' | 'image' | 'video' | 'audio' | 'file'>('all');

	const filteredItems = $derived(
		filter === 'all' ? items : items.filter((item) => item.type === filter)
	);

	function formatSize(bytes?: number): string {
		if (!bytes) return '';
		const kb = bytes / 1024;
		if (kb < 1024) return `${kb.toFixed(1)} KB`;
		return `${(kb / 1024).toFixed(1)} MB`;
	}

	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function getTypeIcon(type: string) {
		const icons = {
			image: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0zM10 7v6m3-3H7',
			video: 'M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z',
			audio: 'M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z',
			file: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z'
		};
		return icons[type as keyof typeof icons] || icons.file;
	}
</script>

<div class="media-gallery">
	<div class="gallery-header">
		<h3 class="gallery-title">{title}</h3>
		{#if onClose}
			<button type="button" class="close-btn" onclick={onClose} aria-label="Close gallery">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		{/if}
	</div>

	<div class="filter-tabs">
		<button
			type="button"
			class="filter-tab"
			class:active={filter === 'all'}
			onclick={() => (filter = 'all')}
		>
			All ({items.length})
		</button>
		<button
			type="button"
			class="filter-tab"
			class:active={filter === 'image'}
			onclick={() => (filter = 'image')}
		>
			Photos ({items.filter((i) => i.type === 'image').length})
		</button>
		<button
			type="button"
			class="filter-tab"
			class:active={filter === 'video'}
			onclick={() => (filter = 'video')}
		>
			Videos ({items.filter((i) => i.type === 'video').length})
		</button>
		<button
			type="button"
			class="filter-tab"
			class:active={filter === 'audio'}
			onclick={() => (filter = 'audio')}
		>
			Audio ({items.filter((i) => i.type === 'audio').length})
		</button>
		<button
			type="button"
			class="filter-tab"
			class:active={filter === 'file'}
			onclick={() => (filter = 'file')}
		>
			Files ({items.filter((i) => i.type === 'file').length})
		</button>
	</div>

	<div class="gallery-content">
		{#if filteredItems.length === 0}
			<div class="empty-state">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
					<circle cx="8.5" cy="8.5" r="1.5" />
					<polyline points="21 15 16 10 5 21" />
				</svg>
				<p>No {filter === 'all' ? 'media' : filter + 's'} shared yet</p>
			</div>
		{:else if filter === 'image' || filter === 'video'}
			<div class="media-grid">
				{#each filteredItems as item (item.id)}
					<button
						type="button"
						class="media-item {item.type}"
						onclick={() => onItemClick?.(item)}
					>
						{#if item.thumbnail || item.type === 'image'}
							<img src={item.thumbnail || item.url} alt={item.name} class="media-thumbnail" />
						{:else}
							<div class="media-placeholder">
								<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d={getTypeIcon(item.type)} />
								</svg>
							</div>
						{/if}
						{#if item.type === 'video'}
							<div class="video-overlay">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="5 3 19 12 5 21 5 3" />
								</svg>
							</div>
						{/if}
					</button>
				{/each}
			</div>
		{:else}
			<div class="file-list">
				{#each filteredItems as item (item.id)}
					<button
						type="button"
						class="file-item"
						onclick={() => onItemClick?.(item)}
					>
						<div class="file-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d={getTypeIcon(item.type)} />
							</svg>
						</div>
						<div class="file-info">
							<span class="file-name">{item.name}</span>
							<div class="file-meta">
								{#if item.senderName}
									<span>{item.senderName}</span>
									<span>•</span>
								{/if}
								<span>{item.timestamp ? formatDate(item.timestamp) : ''}</span>
								{#if item.size}
									<span>•</span>
									<span>{formatSize(item.size)}</span>
								{/if}
							</div>
						</div>
						<svg class="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1="12" y1="15" x2="12" y2="3" />
						</svg>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.media-gallery {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--glass-shadow-lg);
	}

	.gallery-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-4);
		border-bottom: 1px solid var(--glass-border);
	}

	.gallery-title {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-100);
	}

	.close-btn {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
		padding: 0;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--color-primary-500);
		color: var(--color-neutral-200);
	}

	.filter-tabs {
		display: flex;
		gap: var(--spacing-1);
		padding: var(--spacing-3) var(--spacing-4);
		border-bottom: 1px solid var(--glass-border);
		overflow-x: auto;
	}

	.filter-tab {
		padding: var(--spacing-2) var(--spacing-3);
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-lg);
		color: var(--color-neutral-400);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.filter-tab:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-neutral-200);
	}

	.filter-tab.active {
		background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.2), rgba(var(--color-primary-rgb), 0.3));
		border-color: var(--color-primary-500);
		color: var(--color-primary-200);
	}

	.gallery-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-4);
	}

	.media-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: var(--spacing-3);
	}

	.media-item {
		position: relative;
		aspect-ratio: 1;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--glass-border);
		cursor: pointer;
		transition: all var(--transition-fast);
		padding: 0;
	}

	.media-item:hover {
		transform: scale(1.05);
		border-color: var(--color-primary-500);
		box-shadow: var(--glass-shadow-lg);
	}

	.media-thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.media-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-neutral-500);
	}

	.video-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		color: white;
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.media-item:hover .video-overlay {
		opacity: 1;
	}

	.file-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.file-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background: transparent;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
	}

	.file-item:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--color-primary-500);
	}

	.file-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border-radius: var(--radius-lg);
		color: var(--color-primary-400);
		flex-shrink: 0;
	}

	.file-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.file-name {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-200);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.file-meta {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
	}

	.download-icon {
		color: var(--color-neutral-400);
		flex-shrink: 0;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-3);
		padding: var(--spacing-10) var(--spacing-4);
		color: var(--color-neutral-500);
		text-align: center;
	}

	.empty-state svg {
		opacity: 0.5;
	}

	.empty-state p {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--color-neutral-400);
	}
</style>
