<script lang="ts">
	import type { ImageGalleryProps } from './ImageGallery.types.js';
	let { images,
		columns = 3,
		gap = 'var(--spacing-2)',
		onClick
	 }: ImageGalleryProps = $props();
</script>

<div class="gallery" style="grid-template-columns: repeat({columns}, 1fr); gap: {gap}">
	{#each images as image, i}
		<button type="button" class="image-item" onclick={() => onClick?.(i)}>
			<img src={image} alt="Gallery image {i + 1}" loading="lazy" />
		</button>
	{/each}
</div>

<style>
	.gallery { display: grid; width: 100%; }
	.image-item { position: relative; aspect-ratio: 1; overflow: hidden; border-radius: var(--radius-md); border: none; padding: 0; cursor: pointer; background: var(--glass-bg); }
	.image-item img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-normal); }
	.image-item:hover img { transform: scale(1.05); }
</style>
