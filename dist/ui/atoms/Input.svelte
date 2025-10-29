<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		error?: string;
		label?: string;
		helperText?: string;
		id?: string;
		name?: string;
		autocomplete?: 'on' | 'off' | 'name' | 'email' | 'username' | 'current-password' | 'new-password' | string;
		maxlength?: number;
		minlength?: number;
		pattern?: string;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		onfocus?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
	}

	let {
		value = $bindable(''),
		placeholder,
		type = 'text',
		disabled = false,
		readonly = false,
		required = false,
		error,
		label,
		helperText,
		id,
		name,
		autocomplete,
		maxlength,
		minlength,
		pattern,
		oninput,
		onchange,
		onfocus,
		onblur
	}: Props = $props();

	const inputId = $derived(id || `input-${Math.random().toString(36).substr(2, 9)}`);
	const hasError = $derived(!!error);
</script>

<div class="input-wrapper">
	{#if label}
		<label for={inputId} class="input-label">
			{label}
			{#if required}
				<span class="required-indicator" aria-label="required">*</span>
			{/if}
		</label>
	{/if}
	<div class="input-container">
		<input
			{type}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{name}
			{maxlength}
			{minlength}
			{pattern}
			autocomplete={autocomplete as any}
			bind:value
			id={inputId}
			class="input"
			class:input-error={hasError}
			aria-invalid={hasError}
			aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
			{oninput}
			{onchange}
			{onfocus}
			{onblur}
		/>
	</div>
	{#if error}
		<p id="{inputId}-error" class="input-message input-error-message" role="alert">
			{error}
		</p>
	{:else if helperText}
		<p id="{inputId}-helper" class="input-message input-helper-text">
			{helperText}
		</p>
	{/if}
</div>

<style>
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		width: 100%;
	}

	.input-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
	}

	@media (prefers-color-scheme: dark) {
		.input-label {
			color: var(--color-neutral-300);
		}
	}

	.required-indicator {
		color: var(--color-error);
		margin-left: var(--spacing-1);
	}

	.input-container {
		position: relative;
		width: 100%;
	}

	.input {
		width: 100%;
		padding: var(--spacing-3) var(--spacing-4);
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
	}

	@media (prefers-color-scheme: dark) {
		.input {
			color: var(--color-neutral-50);
		}
	}

	.input::placeholder {
		color: var(--color-neutral-400);
	}

	.input:hover:not(:disabled):not(:read-only) {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-300);
	}

	.input:focus {
		outline: none;
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-500);
		box-shadow: var(--glass-shadow-lg), 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	.input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.input:read-only {
		background: var(--color-neutral-100);
		cursor: default;
	}

	@media (prefers-color-scheme: dark) {
		.input:read-only {
			background: rgba(255, 255, 255, 0.05);
		}
	}

	.input-error {
		border-color: var(--color-error);
	}

	.input-error:focus {
		border-color: var(--color-error);
		box-shadow: var(--glass-shadow-lg), 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.input-message {
		font-size: var(--font-size-sm);
		margin: 0;
	}

	.input-helper-text {
		color: var(--color-neutral-500);
	}

	.input-error-message {
		color: var(--color-error);
	}
</style>
