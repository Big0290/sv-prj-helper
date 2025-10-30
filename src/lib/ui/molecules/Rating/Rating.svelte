<script lang="ts">
	interface Props {
		value?: number;
		max?: number;
		readonly?: boolean;
		size?: 'sm' | 'md' | 'lg';
		showValue?: boolean;
		onChange?: (value: number) => void;
	}

	let {
		value = $bindable(0),
		max = 5,
		readonly = false,
		size = 'md',
		showValue = false,
		onChange
	}: Props = $props();

	let hoveredValue = $state<number | null>(null);

	function handleClick(rating: number) {
		if (readonly) return;
		value = rating;
		onChange?.(rating);
	}

	function handleMouseEnter(rating: number) {
		if (readonly) return;
		hoveredValue = rating;
	}

	function handleMouseLeave() {
		hoveredValue = null;
	}

	const displayValue = $derived(hoveredValue ?? value);

	const sizeMap = {
		sm: '16px',
		md: '24px',
		lg: '32px'
	};
</script>

<div 
	class="rating" 
	class:readonly
	role={readonly ? 'img' : 'slider'}
	aria-label={readonly ? `Rating: ${value} out of ${max} stars` : `Rate from 1 to ${max} stars`}
	aria-valuenow={readonly ? undefined : value}
	aria-valuemin={readonly ? undefined : 0}
	aria-valuemax={readonly ? undefined : max}
>
	<div class="stars" style="--star-size: {sizeMap[size]};">
		{#each Array(max) as _, i}
			{@const rating = i + 1}
			{@const isFilled = displayValue >= rating}
			{@const isHalf = displayValue >= rating - 0.5 && displayValue < rating}
			
			<button
				type="button"
				class="star"
				class:filled={isFilled}
				class:half={isHalf}
				onclick={() => handleClick(rating)}
				onmouseenter={() => handleMouseEnter(rating)}
				onmouseleave={handleMouseLeave}
				disabled={readonly}
				aria-label={`${rating} star${rating > 1 ? 's' : ''}`}
			>
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			</button>
		{/each}
	</div>
	
	{#if showValue}
		<span class="rating-value">{value.toFixed(1)} / {max}</span>
	{/if}
</div>

<style>
	.rating {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.stars {
		display: flex;
		gap: var(--spacing-1);
	}

	.star {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--star-size);
		height: var(--star-size);
		padding: 0;
		background: transparent;
		border: none;
		color: var(--color-neutral-700);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.star svg {
		width: 100%;
		height: 100%;
	}

	.star:not(:disabled):hover {
		color: var(--color-warning-400);
		transform: scale(1.1);
	}

	.star.filled {
		color: var(--color-warning-500);
	}

	.star.half {
		background: linear-gradient(90deg, var(--color-warning-500) 50%, var(--color-neutral-700) 50%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.star:disabled {
		cursor: default;
	}

	.rating.readonly .star:hover {
		transform: none;
	}

	.rating-value {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-400);
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: reduce) {
		.star {
			transition: none;
		}
		
		.star:hover {
			transform: none;
		}
	}
</style>
