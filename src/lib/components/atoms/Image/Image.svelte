<script lang="ts">
	import type { ImageProps } from './Image.types.js';

	let { src,
		alt,
		width,
		height,
		fit = 'cover',
		loading = 'lazy',
		fallback,
		onLoad,
		onError,
		...restProps
	 }: ImageProps = $props();

	let isLoading = $state(true);
	let hasError = $state(false);
	let imgSrc = $state(src);

	function handleLoad() {
		isLoading = false;
		onLoad?.();
	}

	function handleError() {
		isLoading = false;
		hasError = true;
		if (fallback) {
			imgSrc = fallback;
			hasError = false;
		}
		onError?.();
	}

	$effect(() => {
		imgSrc = src;
		isLoading = true;
		hasError = false;
	});
</script>

<div class="image-wrapper" style:width style:height>
	{#if isLoading}
		<div class="skeleton"></div>
	{/if}
	
	{#if hasError && !fallback}
		<div class="error-placeholder">
			<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
				<circle cx="8.5" cy="8.5" r="1.5" />
				<path d="M21 15l-5-5L5 21" />
			</svg>
		</div>
	{:else}
		<img
			src={imgSrc}
			{alt}
			{loading}
			class="image"
			class:loaded={!isLoading}
			style:object-fit={fit}
			onload={handleLoad}
			onerror={handleError}
			{...restProps}
		/>
	{/if}
</div>

<style>
	.image-wrapper {
		position: relative;
		display: inline-block;
		overflow: hidden;
		background: var(--bg-secondary);
		border-radius: var(--radius-md);
	}

	.image {
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity var(--transition-normal);
	}

	.image.loaded {
		opacity: 1;
	}

	.skeleton {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			var(--bg-secondary) 0%,
			var(--bg-tertiary) 50%,
			var(--bg-secondary) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	.error-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: var(--text-tertiary);
	}

	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}
</style>
