<script lang="ts">
	import type { DragAndDropProps } from './DragAndDrop.types.js';

	let { onDrop,
		accept,
		multiple = true,
		maxSize = 10485760, // 10MB
		maxFiles,
		disabled = false
	 }: DragAndDropProps = $props();

	let isDragging = $state(false);
	let error = $state<string | null>(null);
	let fileInputEl: HTMLInputElement;

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		if (!disabled) {
			isDragging = true;
		}
	}

	function handleDragLeave(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
	}

	function validateFiles(files: File[]): File[] {
		error = null;
		const validFiles: File[] = [];

		if (maxFiles && files.length > maxFiles) {
			error = `Maximum ${maxFiles} file(s) allowed`;
			return [];
		}

		for (const file of files) {
			if (maxSize && file.size > maxSize) {
				error = `File "${file.name}" exceeds maximum size of ${formatBytes(maxSize)}`;
				continue;
			}

			if (accept) {
				const acceptedTypes = accept.split(',').map(t => t.trim());
				const fileExtension = '.' + file.name.split('.').pop();
				const isAccepted = acceptedTypes.some(type => {
					if (type.startsWith('.')) {
						return fileExtension === type;
					}
					return file.type.match(type.replace('*', '.*'));
				});

				if (!isAccepted) {
					error = `File type "${file.type}" not accepted`;
					continue;
				}
			}

			validFiles.push(file);
		}

		return validFiles;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;

		if (disabled) return;

		const files = Array.from(e.dataTransfer?.files || []);
		const validFiles = validateFiles(files);

		if (validFiles.length > 0) {
			onDrop?.(validFiles);
		}
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		const files = Array.from(input.files || []);
		const validFiles = validateFiles(files);

		if (validFiles.length > 0) {
			onDrop?.(validFiles);
		}

		input.value = '';
	}

	function formatBytes(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
	}
</script>

<div
	class="drag-drop"
	class:dragging={isDragging}
	class:disabled
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	onclick={() => !disabled && fileInputEl.click()}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && !disabled && fileInputEl.click()}
	role="button"
	tabindex="0"
	aria-label="Drop files here or click to select"
>
	<input
		bind:this={fileInputEl}
		type="file"
		{accept}
		{multiple}
		{disabled}
		onchange={handleFileSelect}
		style="display: none;"
	/>

	<div class="content">
		<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" y1="3" x2="12" y2="15" />
		</svg>

		{#if isDragging}
			<p class="title">Drop files here</p>
		{:else}
			<p class="title">Drag & drop files here</p>
			<p class="subtitle">or click to browse</p>
		{/if}

		{#if accept || maxSize}
			<div class="info">
				{#if accept}
					<span>Accepted: {accept}</span>
				{/if}
				{#if maxSize}
					<span>Max size: {formatBytes(maxSize)}</span>
				{/if}
				{#if maxFiles}
					<span>Max files: {maxFiles}</span>
				{/if}
			</div>
		{/if}

		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
</div>

<style>
	.drag-drop {
		padding: var(--spacing-8);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 2px dashed var(--glass-border);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-normal);
		text-align: center;
	}

	.drag-drop:hover:not(.disabled) {
		border-color: var(--color-primary);
		background: var(--glass-bg-hover);
	}

	.drag-drop.dragging {
		border-color: var(--color-primary);
		background: rgba(var(--color-primary-rgb), 0.1);
		transform: scale(1.02);
	}

	.drag-drop.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-3);
		color: var(--text-secondary);
	}

	.content svg {
		opacity: 0.6;
		transition: all var(--transition-fast);
	}

	.drag-drop:hover:not(.disabled) svg,
	.drag-drop.dragging svg {
		opacity: 1;
		color: var(--color-primary);
		transform: translateY(-4px);
	}

	.title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		margin: 0;
	}

	.subtitle {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	.info {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-2);
		justify-content: center;
		margin-top: var(--spacing-2);
	}

	.info span {
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
		padding: var(--spacing-1) var(--spacing-2);
		background: var(--glass-bg);
		border-radius: var(--radius-sm);
	}

	.error {
		color: var(--color-error);
		font-size: var(--font-size-sm);
		margin: 0;
	}
</style>
