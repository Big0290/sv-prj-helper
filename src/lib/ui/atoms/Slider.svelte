<script lang="ts">
	interface Props {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		label?: string;
		disabled?: boolean;
		showValue?: boolean;
		onchange?: (e: Event) => void;
	}

	let {
		value = $bindable(50),
		min = 0,
		max = 100,
		step = 1,
		label,
		disabled = false,
		showValue = true,
		onchange
	}: Props = $props();

	const progress = $derived(((value - min) / (max - min)) * 100);
	const sliderId = `slider-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="slider-wrapper">
	{#if label}
		<label class="slider-label" for={sliderId}>
			{label}
			{#if showValue}
				<span class="slider-value">{value}</span>
			{/if}
		</label>
	{/if}
	<input
		id={sliderId}
		type="range"
		bind:value
		{min}
		{max}
		{step}
		{disabled}
		{onchange}
		class="slider"
		style="--progress: {progress}%"
		aria-label={label || 'Slider'}
	/>
</div>

<style>
	.slider-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.slider-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
	}

	@media (prefers-color-scheme: dark) {
		.slider-label {
			color: var(--color-neutral-300);
		}
	}

	.slider-value {
		font-weight: var(--font-weight-semibold);
		color: var(--color-primary-600);
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		background: linear-gradient(to right, 
			var(--color-primary-500) 0%, 
			var(--color-primary-500) var(--progress), 
			var(--glass-bg-hover) var(--progress), 
			var(--glass-bg-hover) 100%);
		border-radius: 3px;
		outline: none;
		cursor: pointer;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		background: white;
		border: 2px solid var(--color-primary-500);
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: transform var(--transition-fast);
	}

	.slider::-webkit-slider-thumb:hover {
		transform: scale(1.1);
	}

	.slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		background: white;
		border: 2px solid var(--color-primary-500);
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: transform var(--transition-fast);
	}

	.slider::-moz-range-thumb:hover {
		transform: scale(1.1);
	}

	.slider:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.slider:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}
</style>
