<script lang="ts">
	import type { SelectProps } from './Select.types.js';

	let { value = $bindable(''),
		options,
		disabled = false,
		required = false,
		error,
		label,
		helperText,
		id,
		name,
		placeholder,
		onchange
	 }: SelectProps = $props();

	const selectId = $derived(id || `select-${Math.random().toString(36).substr(2, 9)}`);
	const hasError = $derived(!!error);
</script>

<div class="select-wrapper">
	{#if label}
		<label for={selectId} class="select-label">
			{label}
			{#if required}
				<span class="required-indicator" aria-label="required">*</span>
			{/if}
		</label>
	{/if}
	<div class="select-container">
		<select
			bind:value
			id={selectId}
			{name}
			{disabled}
			{required}
			class="select"
			class:select-error={hasError}
			aria-invalid={hasError}
			aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
			{onchange}
		>
			{#if placeholder}
				<option value="" disabled>{placeholder}</option>
			{/if}
			{#each options as option}
				<option value={option.value} disabled={option.disabled}>
					{option.label}
				</option>
			{/each}
		</select>
		<svg class="select-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</div>
	{#if error}
		<p id="{selectId}-error" class="select-message select-error-message" role="alert">
			{error}
		</p>
	{:else if helperText}
		<p id="{selectId}-helper" class="select-message select-helper-text">
			{helperText}
		</p>
	{/if}
</div>

<style>
	.select-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		width: 100%;
	}

	.select-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
	}

	@media (prefers-color-scheme: dark) {
		.select-label {
			color: var(--color-neutral-300);
		}
	}

	.required-indicator {
		color: var(--color-error);
		margin-left: var(--spacing-1);
	}

	.select-container {
		position: relative;
		width: 100%;
	}

	.select {
		width: 100%;
		padding: var(--spacing-3) var(--spacing-10) var(--spacing-3) var(--spacing-4);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		color: var(--color-neutral-900);
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow);
		transition: all var(--transition-base);
		min-height: 44px;
		appearance: none;
		cursor: pointer;
	}

	@media (prefers-color-scheme: dark) {
		.select {
			color: var(--color-neutral-50);
		}
	}

	.select:hover:not(:disabled) {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-300);
	}

	.select:focus {
		outline: none;
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-500);
		box-shadow: var(--glass-shadow-lg), 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	.select:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.select-error {
		border-color: var(--color-error);
	}

	.select-error:focus {
		border-color: var(--color-error);
		box-shadow: var(--glass-shadow-lg), 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.select-icon {
		position: absolute;
		right: var(--spacing-4);
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--color-neutral-500);
		transition: all var(--transition-base);
	}

	.select:focus ~ .select-icon {
		color: var(--color-primary-500);
	}

	.select-message {
		font-size: var(--font-size-sm);
		margin: 0;
	}

	.select-helper-text {
		color: var(--color-neutral-500);
	}

	.select-error-message {
		color: var(--color-error);
	}
</style>
