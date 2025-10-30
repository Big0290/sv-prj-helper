<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		error?: string;
		label?: string;
		helperText?: string;
		id?: string;
		name?: string;
		rows?: number;
		maxlength?: number;
		minlength?: number;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		onfocus?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
	}

	let {
		value = $bindable(''),
		placeholder,
		disabled = false,
		readonly = false,
		required = false,
		error,
		label,
		helperText,
		id,
		name,
		rows = 4,
		maxlength,
		minlength,
		oninput,
		onchange,
		onfocus,
		onblur
	}: Props = $props();

	const textareaId = $derived(id || `textarea-${Math.random().toString(36).substr(2, 9)}`);
	const hasError = $derived(!!error);
</script>

<div class="textarea-wrapper">
	{#if label}
		<label for={textareaId} class="textarea-label">
			{label}
			{#if required}
				<span class="required-indicator" aria-label="required">*</span>
			{/if}
		</label>
	{/if}
	<div class="textarea-container">
		<textarea
			{...{ placeholder, disabled, readonly, required, name, rows, maxlength, minlength }}
			bind:value
			id={textareaId}
			class="textarea"
			class:textarea-error={hasError}
			aria-invalid={hasError}
			aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
			{oninput}
			{onchange}
			{onfocus}
			{onblur}
		></textarea>
	</div>
	{#if error}
		<p id="{textareaId}-error" class="textarea-message textarea-error-message" role="alert">
			{error}
		</p>
	{:else if helperText}
		<p id="{textareaId}-helper" class="textarea-message textarea-helper-text">
			{helperText}
		</p>
	{/if}
</div>

<style>
	.textarea-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		width: 100%;
	}

	.textarea-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
	}

	@media (prefers-color-scheme: dark) {
		.textarea-label {
			color: var(--color-neutral-300);
		}
	}

	.required-indicator {
		color: var(--color-error);
		margin-left: var(--spacing-1);
	}

	.textarea-container {
		position: relative;
		width: 100%;
	}

	.textarea {
		width: 100%;
		padding: var(--spacing-3) var(--spacing-4);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		line-height: var(--line-height-normal);
		color: var(--color-neutral-900);
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow);
		transition: all var(--transition-base);
		resize: vertical;
	}

	@media (prefers-color-scheme: dark) {
		.textarea {
			color: var(--color-neutral-50);
		}
	}

	.textarea::placeholder {
		color: var(--color-neutral-400);
	}

	.textarea:hover:not(:disabled):not(:read-only) {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-300);
	}

	.textarea:focus {
		outline: none;
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-500);
		box-shadow: var(--glass-shadow-lg), 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	.textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.textarea:read-only {
		background: var(--color-neutral-100);
		cursor: default;
		resize: none;
	}

	@media (prefers-color-scheme: dark) {
		.textarea:read-only {
			background: rgba(255, 255, 255, 0.05);
		}
	}

	.textarea-error {
		border-color: var(--color-error);
	}

	.textarea-error:focus {
		border-color: var(--color-error);
		box-shadow: var(--glass-shadow-lg), 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.textarea-message {
		font-size: var(--font-size-sm);
		margin: 0;
	}

	.textarea-helper-text {
		color: var(--color-neutral-500);
	}

	.textarea-error-message {
		color: var(--color-error);
	}
</style>
