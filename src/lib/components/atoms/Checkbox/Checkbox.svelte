<script lang="ts">
	import type { CheckboxProps } from './Checkbox.types.js';

	let { checked = $bindable(false),
		disabled = false,
		label,
		id,
		name,
		value,
		indeterminate = false,
		onchange
	 }: CheckboxProps = $props();

	const checkboxId = $derived(id || `checkbox-${Math.random().toString(36).substr(2, 9)}`);
</script>

<div class="checkbox-wrapper">
	<input
		type="checkbox"
		bind:checked
		{disabled}
		{name}
		{value}
		id={checkboxId}
		class="checkbox"
		class:checkbox-indeterminate={indeterminate}
		{onchange}
		aria-checked={indeterminate ? 'mixed' : checked}
	/>
	<label for={checkboxId} class="checkbox-checkmark">
		{#if indeterminate}
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
			>
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
		{:else if checked}
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="20 6 9 17 4 12" />
			</svg>
		{/if}
	</label>
	{#if label}
		<label for={checkboxId} class="checkbox-label">
			{label}
		</label>
	{/if}
</div>

<style>
	.checkbox-wrapper {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-3);
		position: relative;
	}

	.checkbox {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.checkbox-checkmark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 2px solid var(--glass-border);
		border-radius: var(--radius-sm);
		box-shadow: var(--glass-shadow);
		cursor: pointer;
		transition: all var(--transition-base);
		color: white;
	}

	.checkbox:hover ~ .checkbox-checkmark {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-300);
		box-shadow: var(--glass-shadow-lg);
	}

	.checkbox:checked ~ .checkbox-checkmark,
	.checkbox-indeterminate ~ .checkbox-checkmark {
		background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
		border-color: var(--color-primary-600);
	}

	.checkbox:disabled ~ .checkbox-checkmark {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.checkbox:focus-visible ~ .checkbox-checkmark {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}

	.checkbox-label {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
		cursor: pointer;
		user-select: none;
	}

	@media (prefers-color-scheme: dark) {
		.checkbox-label {
			color: var(--color-neutral-300);
		}
	}

	.checkbox:disabled ~ .checkbox-label {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
