<script lang="ts">
	import type { FileUploadProps } from './FileUpload.types.js';

	let { accept,
		multiple = false,
		maxSize,
		onUpload,
		label = 'Choose files or drag and drop'
	 }: FileUploadProps = $props();

	let files = $state<File[]>([]);
	let isDragging = $state(false);

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			processFiles(Array.from(target.files));
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		
		if (e.dataTransfer?.files) {
			processFiles(Array.from(e.dataTransfer.files));
		}
	}

	function processFiles(newFiles: File[]) {
		let validFiles = newFiles;
		
		if (maxSize) {
			validFiles = newFiles.filter(f => f.size <= maxSize);
		}

		files = multiple ? [...files, ...validFiles] : validFiles;
		onUpload?.(files);
	}

	function removeFile(index: number) {
		files = files.filter((_, i) => i !== index);
		onUpload?.(files);
	}

	function formatFileSize(bytes: number): string {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
	}
</script>

<div class="file-upload">
	<div
		class="dropzone"
		class:dropzone-dragging={isDragging}
		ondrop={handleDrop}
		ondragover={(e) => { e.preventDefault(); isDragging = true; }}
		ondragleave={() => isDragging = false}
		role="button"
		tabindex="0"
	>
		<input
			type="file"
			{accept}
			{multiple}
			onchange={handleFileSelect}
			class="file-input"
			id="file-upload-input"
		/>
		<label for="file-upload-input" class="dropzone-label">
			<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="17 8 12 3 7 8" />
				<line x1="12" y1="3" x2="12" y2="15" />
			</svg>
			<p class="dropzone-text">{label}</p>
			<p class="dropzone-hint">Click to browse or drag files here</p>
		</label>
	</div>

	{#if files.length > 0}
		<ul class="file-list">
			{#each files as file, i}
				<li class="file-item">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
						<polyline points="13 2 13 9 20 9" />
					</svg>
					<span class="file-name">{file.name}</span>
					<span class="file-size">{formatFileSize(file.size)}</span>
					<button
						type="button"
						onclick={() => removeFile(i)}
						class="file-remove"
						aria-label="Remove file"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.file-upload {
		width: 100%;
	}

	.dropzone {
		position: relative;
		padding: var(--spacing-8);
		background: var(--glass-bg);
		border: 2px dashed var(--glass-border);
		border-radius: var(--radius-xl);
		transition: all var(--transition-base);
		cursor: pointer;
	}

	.dropzone:hover,
	.dropzone-dragging {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-500);
	}

	.file-input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	.dropzone-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-3);
		cursor: pointer;
		color: var(--color-neutral-600);
	}

	@media (prefers-color-scheme: dark) {
		.dropzone-label {
			color: var(--color-neutral-400);
		}
	}

	.dropzone-text {
		margin: 0;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-900);
	}

	@media (prefers-color-scheme: dark) {
		.dropzone-text {
			color: var(--color-neutral-100);
		}
	}

	.dropzone-hint {
		margin: 0;
		font-size: var(--font-size-sm);
	}

	.file-list {
		list-style: none;
		margin: var(--spacing-4) 0 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.file-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
	}

	.file-name {
		flex: 1;
		font-size: var(--font-size-sm);
		color: var(--color-neutral-900);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@media (prefers-color-scheme: dark) {
		.file-name {
			color: var(--color-neutral-100);
		}
	}

	.file-size {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-600);
	}

	@media (prefers-color-scheme: dark) {
		.file-size {
			color: var(--color-neutral-400);
		}
	}

	.file-remove {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-1);
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-neutral-500);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.file-remove:hover {
		color: var(--color-error);
		background: rgba(239, 68, 68, 0.1);
	}
</style>
