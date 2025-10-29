<script lang="ts">
	interface Props {
		src: string;
		aspectRatio?: number;
		onCrop?: (blob: Blob) => void;
		minWidth?: number;
		minHeight?: number;
	}

	let {
		src,
		aspectRatio = 1,
		onCrop,
		minWidth = 100,
		minHeight = 100
	}: Props = $props();

	let imageEl: HTMLImageElement;
	let canvasEl: HTMLCanvasElement;
	let containerEl: HTMLDivElement;
	let cropArea = $state({ x: 0, y: 0, width: 200, height: 200 });
	let isDragging = $state(false);
	let isResizing = $state(false);
	let dragStart = $state({ x: 0, y: 0 });
	let imageLoaded = $state(false);

	function handleImageLoad() {
		if (!imageEl || !containerEl) return;
		imageLoaded = true;
		
		const containerRect = containerEl.getBoundingClientRect();
		const imageRect = imageEl.getBoundingClientRect();
		
		const cropWidth = Math.min(imageRect.width * 0.8, 400);
		const cropHeight = aspectRatio ? cropWidth / aspectRatio : cropWidth;
		
		cropArea = {
			x: (imageRect.width - cropWidth) / 2,
			y: (imageRect.height - cropHeight) / 2,
			width: cropWidth,
			height: cropHeight
		};
	}

	function handleMouseDown(e: MouseEvent) {
		e.preventDefault();
		isDragging = true;
		dragStart = { x: e.clientX - cropArea.x, y: e.clientY - cropArea.y };
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging || !imageEl) return;
		
		const imageRect = imageEl.getBoundingClientRect();
		let newX = e.clientX - dragStart.x;
		let newY = e.clientY - dragStart.y;
		
		newX = Math.max(0, Math.min(newX, imageRect.width - cropArea.width));
		newY = Math.max(0, Math.min(newY, imageRect.height - cropArea.height));
		
		cropArea = { ...cropArea, x: newX, y: newY };
	}

	function handleMouseUp() {
		isDragging = false;
		isResizing = false;
	}

	function handleCrop() {
		if (!imageEl || !canvasEl) return;

		try {
			const scaleX = imageEl.naturalWidth / imageEl.width;
			const scaleY = imageEl.naturalHeight / imageEl.height;

			canvasEl.width = cropArea.width * scaleX;
			canvasEl.height = cropArea.height * scaleY;

			const ctx = canvasEl.getContext('2d');
			if (!ctx) return;

			ctx.drawImage(
				imageEl,
				cropArea.x * scaleX,
				cropArea.y * scaleY,
				cropArea.width * scaleX,
				cropArea.height * scaleY,
				0,
				0,
				canvasEl.width,
				canvasEl.height
			);

			canvasEl.toBlob((blob) => {
				if (blob) {
					onCrop?.(blob);
				}
			}, 'image/jpeg', 0.95);
		} catch (err) {
			console.error('Crop failed:', err);
			alert('Image cropping failed. This may be due to CORS restrictions. Please use a same-origin image or one with proper CORS headers.');
		}
	}

	$effect(() => {
		if (isDragging || isResizing) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('mouseup', handleMouseUp);
			};
		}
		return () => {}; // Return empty cleanup function when not active
	});
</script>

<div class="image-cropper">
	<div bind:this={containerEl} class="crop-container">
		<img
			bind:this={imageEl}
			{src}
			alt="Crop"
			class="crop-image"
			crossorigin="anonymous"
			onload={handleImageLoad}
		/>
		{#if imageLoaded}
			<div
				class="crop-area"
				style="left: {cropArea.x}px; top: {cropArea.y}px; width: {cropArea.width}px; height: {cropArea.height}px;"
				onmousedown={handleMouseDown}
				role="button"
				tabindex="0"
			>
				<div class="crop-handles">
					<div class="handle corner tl"></div>
					<div class="handle corner tr"></div>
					<div class="handle corner bl"></div>
					<div class="handle corner br"></div>
				</div>
			</div>
		{/if}
	</div>
	<div class="controls">
		<button class="crop-btn" onclick={handleCrop}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M6.13 1L6 16a2 2 0 002 2h15" />
				<path d="M1 6.13L16 6a2 2 0 012 2v15" />
			</svg>
			Crop Image
		</button>
	</div>
	<canvas bind:this={canvasEl} style="display: none;"></canvas>
</div>

<style>
	.image-cropper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.crop-container {
		position: relative;
		width: 100%;
		max-width: 800px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.crop-image {
		display: block;
		width: 100%;
		height: auto;
		user-select: none;
	}

	.crop-area {
		position: absolute;
		border: 2px solid var(--color-primary);
		box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
		cursor: move;
		user-select: none;
	}

	.crop-handles {
		position: absolute;
		inset: -4px;
	}

	.handle {
		position: absolute;
		width: 12px;
		height: 12px;
		background: white;
		border: 2px solid var(--color-primary);
		border-radius: 50%;
	}

	.handle.corner.tl { top: 0; left: 0; }
	.handle.corner.tr { top: 0; right: 0; }
	.handle.corner.bl { bottom: 0; left: 0; }
	.handle.corner.br { bottom: 0; right: 0; }

	.controls {
		display: flex;
		gap: var(--spacing-3);
	}

	.crop-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-6);
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.crop-btn:hover {
		background: var(--color-primary-hover);
		transform: translateY(-1px);
	}
</style>
