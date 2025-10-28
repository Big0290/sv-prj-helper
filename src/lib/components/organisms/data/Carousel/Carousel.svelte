<script module lang="ts">
export interface CarouselItem {
		id: string;
		content: Snippet;
		image?: string;
		title?: string;
		description?: string;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	

	import type { CarouselProps } from './Carousel.types.js';

	let { items,
		activeIndex = $bindable(0),
		variant = 'default',
		autoPlay = false,
		interval = 3000,
		showDots = true,
		showArrows = true,
		loop = true,
		aspectRatio = '16/9',
		onSlideChange
	 }: CarouselProps = $props();

	let intervalId: number | undefined = $state();
	let isDragging = $state(false);
	let startX = $state(0);
	let translateX = $state(0);

	$effect(() => {
		if (autoPlay) {
			intervalId = window.setInterval(next, interval);
			return () => clearInterval(intervalId);
		}
	});

	function next() {
		if (activeIndex < items.length - 1) {
			activeIndex++;
		} else if (loop) {
			activeIndex = 0;
		}
		onSlideChange?.(activeIndex);
	}

	function prev() {
		if (activeIndex > 0) {
			activeIndex--;
		} else if (loop) {
			activeIndex = items.length - 1;
		}
		onSlideChange?.(activeIndex);
	}

	function goToSlide(index: number) {
		activeIndex = index;
		onSlideChange?.(index);
	}

	function handleTouchStart(e: TouchEvent) {
		isDragging = true;
		startX = e.touches[0].clientX;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!isDragging) return;
		const currentX = e.touches[0].clientX;
		translateX = currentX - startX;
	}

	function handleTouchEnd() {
		if (Math.abs(translateX) > 50) {
			if (translateX > 0) {
				prev();
			} else {
				next();
			}
		}
		isDragging = false;
		translateX = 0;
	}
</script>

<div
	class="carousel"
	data-variant={variant}
	style="--aspect-ratio: {aspectRatio}"
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	role="region"
	aria-label="Carousel"
>
	<div class="carousel-viewport">
		<div
			class="carousel-container"
			style="transform: translateX(calc(-{activeIndex * 100}% + {translateX}px))"
		>
			{#each items as item, i}
				<div
					class="carousel-slide"
					class:active={i === activeIndex}
					aria-hidden={i !== activeIndex}
				>
					{#if item.image}
						<img src={item.image} alt={item.title || `Slide ${i + 1}`} class="carousel-image" />
					{/if}
					{#if item.title || item.description}
						<div class="carousel-caption">
							{#if item.title}
								<h3 class="carousel-title">{item.title}</h3>
							{/if}
							{#if item.description}
								<p class="carousel-description">{item.description}</p>
							{/if}
						</div>
					{/if}
					<div class="carousel-content">
						{item.content}
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if showArrows}
		<button
			type="button"
			class="carousel-arrow carousel-prev"
			onclick={prev}
			disabled={!loop && activeIndex === 0}
			aria-label="Previous slide"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
		</button>

		<button
			type="button"
			class="carousel-arrow carousel-next"
			onclick={next}
			disabled={!loop && activeIndex === items.length - 1}
			aria-label="Next slide"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M9 18l6-6-6-6" />
			</svg>
		</button>
	{/if}

	{#if showDots}
		<div class="carousel-dots" role="tablist">
			{#each items as _, i}
				<button
					type="button"
					class="carousel-dot"
					class:active={i === activeIndex}
					onclick={() => goToSlide(i)}
					role="tab"
					aria-selected={i === activeIndex}
					aria-label={`Go to slide ${i + 1}`}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: var(--radius-lg);
		background: var(--glass-bg);
	}

	.carousel-viewport {
		position: relative;
		width: 100%;
		aspect-ratio: var(--aspect-ratio);
		overflow: hidden;
	}

	.carousel-container {
		display: flex;
		height: 100%;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.carousel-slide {
		position: relative;
		flex: 0 0 100%;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.carousel-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.carousel-caption {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: var(--spacing-6);
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
		color: white;
	}

	.carousel-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		margin: 0 0 var(--spacing-2) 0;
	}

	.carousel-description {
		font-size: var(--font-size-base);
		margin: 0;
		opacity: 0.9;
	}

	.carousel-content {
		width: 100%;
		height: 100%;
	}

	.carousel-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border: none;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
		color: var(--color-neutral-800);
		cursor: pointer;
		transition: all var(--transition-normal);
		box-shadow: var(--shadow-md);
	}

	.carousel-arrow:hover:not(:disabled) {
		background: white;
		transform: translateY(-50%) scale(1.1);
	}

	.carousel-arrow:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.carousel-prev {
		left: var(--spacing-4);
	}

	.carousel-next {
		right: var(--spacing-4);
	}

	.carousel-dots {
		position: absolute;
		bottom: var(--spacing-4);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: var(--spacing-2);
		z-index: 10;
	}

	.carousel-dot {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		border: 2px solid white;
		background: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: all var(--transition-normal);
		padding: 0;
	}

	.carousel-dot:hover {
		background: rgba(255, 255, 255, 0.7);
	}

	.carousel-dot.active {
		background: white;
		width: 2rem;
		border-radius: var(--radius-full);
	}

	/* Fade variant */
	.carousel[data-variant="fade"] .carousel-container {
		position: relative;
	}

	.carousel[data-variant="fade"] .carousel-slide {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	.carousel[data-variant="fade"] .carousel-slide.active {
		opacity: 1;
		position: relative;
	}

	/* Cards variant */
	.carousel[data-variant="cards"] .carousel-viewport {
		padding: 0 var(--spacing-4);
	}

	.carousel[data-variant="cards"] .carousel-slide {
		padding: 0 var(--spacing-2);
	}

	.carousel[data-variant="cards"] .carousel-content {
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: var(--spacing-4);
		box-shadow: var(--shadow-lg);
	}

	/* Stack variant */
	.carousel[data-variant="stack"] .carousel-container {
		position: relative;
		perspective: 1000px;
	}

	.carousel[data-variant="stack"] .carousel-slide {
		position: absolute;
		transform-origin: center;
		transition: all 0.3s ease-out;
	}

	.carousel[data-variant="stack"] .carousel-slide:not(.active) {
		transform: scale(0.9) translateY(20px);
		opacity: 0.5;
		z-index: 0;
	}

	.carousel[data-variant="stack"] .carousel-slide.active {
		z-index: 1;
		transform: scale(1) translateY(0);
	}

	@media (max-width: 768px) {
		.carousel-arrow {
			width: 2.5rem;
			height: 2.5rem;
		}

		.carousel-caption {
			padding: var(--spacing-4);
		}

		.carousel-title {
			font-size: var(--font-size-lg);
		}

		.carousel-description {
			font-size: var(--font-size-sm);
		}
	}
</style>
