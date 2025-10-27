<script lang="ts">
	import type { RadioProps } from './Radio.types.js';

	let { group = $bindable(''),
		disabled = false,
		label,
		id,
		name,
		value,
		onchange
	 }: RadioProps = $props();

	const radioId = $derived(id || `radio-${Math.random().toString(36).substr(2, 9)}`);
</script>

<div class="radio-wrapper">
	<input
		type="radio"
		bind:group
		{disabled}
		{name}
		{value}
		id={radioId}
		class="radio"
		{onchange}
	/>
	<label for={radioId} class="radio-circle">
		<span class="radio-dot"></span>
	</label>
	{#if label}
		<label for={radioId} class="radio-label">
			{label}
		</label>
	{/if}
</div>

<style>
	.radio-wrapper {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-3);
		position: relative;
	}

	.radio {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.radio-circle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 2px solid var(--glass-border);
		border-radius: 50%;
		box-shadow: var(--glass-shadow);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.radio-dot {
		width: 10px;
		height: 10px;
		background: white;
		border-radius: 50%;
		transform: scale(0);
		transition: transform var(--transition-base);
	}

	.radio:hover ~ .radio-circle {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-300);
		box-shadow: var(--glass-shadow-lg);
	}

	.radio:checked ~ .radio-circle {
		background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
		border-color: var(--color-primary-600);
	}

	.radio:checked ~ .radio-circle .radio-dot {
		transform: scale(1);
	}

	.radio:disabled ~ .radio-circle {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.radio:focus-visible ~ .radio-circle {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}

	.radio-label {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
		cursor: pointer;
		user-select: none;
	}

	@media (prefers-color-scheme: dark) {
		.radio-label {
			color: var(--color-neutral-300);
		}
	}

	.radio:disabled ~ .radio-label {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
