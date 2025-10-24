<script lang="ts">
	import BarcodeModal from './BarcodeModal.svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		readonly?: boolean;
		error?: string;
		helperText?: string;
		onScan?: (code: string, format: string) => void;
		onChange?: (value: string) => void;
	}

	let {
		value = $bindable(''),
		placeholder = 'Enter or scan barcode...',
		label = '',
		size = 'md',
		disabled = false,
		readonly = false,
		error = '',
		helperText = '',
		onScan,
		onChange
	}: Props = $props();

	let isModalOpen = $state(false);
	let inputElement: HTMLInputElement;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		onChange?.(value);
	}

	function handleScan(code: string, format: string) {
		value = code;
		onChange?.(code);
		onScan?.(code, format);
		isModalOpen = false;
	}

	function openScanner() {
		if (disabled || readonly) return;
		isModalOpen = true;
	}

	const sizeClasses = {
		sm: 'input-sm',
		md: 'input-md',
		lg: 'input-lg'
	};
</script>

<div class="barcode-input-wrapper">
	{#if label}
		<label for="barcode-input" class="input-label">{label}</label>
	{/if}
	
	<div class="input-container {sizeClasses[size]}" class:error={!!error} class:disabled>
		<input
			id="barcode-input"
			bind:this={inputElement}
			type="text"
			class="input-field"
			{placeholder}
			{disabled}
			{readonly}
			value={value}
			oninput={handleInput}
			aria-invalid={!!error}
			aria-describedby={error ? 'input-error' : helperText ? 'input-helper' : undefined}
		/>
		
		<button
			type="button"
			class="scan-button"
			onclick={openScanner}
			{disabled}
			aria-label="Open barcode scanner"
			title="Scan barcode"
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M3 7V5a2 2 0 0 1 2-2h2" />
				<path d="M17 3h2a2 2 0 0 1 2 2v2" />
				<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
				<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
				<rect x="7" y="7" width="10" height="10" rx="1" />
			</svg>
		</button>
		
		{#if value}
			<button
				type="button"
				class="clear-button"
				onclick={() => { value = ''; onChange?.(''); }}
				{disabled}
				aria-label="Clear input"
				title="Clear"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
	
	{#if error}
		<p id="input-error" class="error-text">{error}</p>
	{:else if helperText}
		<p id="input-helper" class="helper-text">{helperText}</p>
	{/if}
</div>

<BarcodeModal bind:isOpen={isModalOpen} onScan={handleScan} title="Scan Barcode" />

<style>
	.barcode-input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.input-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-200);
		margin: 0;
	}

	.input-container {
		position: relative;
		display: flex;
		align-items: center;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		transition: all var(--transition-normal);
	}

	.input-container:focus-within {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}

	.input-container.error {
		border-color: var(--color-danger-500);
	}

	.input-container.error:focus-within {
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.input-container.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.input-field {
		flex: 1;
		background: transparent;
		border: none;
		color: var(--color-neutral-50);
		font-size: var(--font-size-base);
		outline: none;
		width: 100%;
	}

	.input-field::placeholder {
		color: var(--color-neutral-500);
	}

	.input-field:disabled {
		cursor: not-allowed;
	}

	.input-sm {
		padding: var(--spacing-2) var(--spacing-3);
		gap: var(--spacing-2);
	}

	.input-sm .input-field {
		font-size: var(--font-size-sm);
	}

	.input-md {
		padding: var(--spacing-3) var(--spacing-4);
		gap: var(--spacing-2);
	}

	.input-lg {
		padding: var(--spacing-4) var(--spacing-5);
		gap: var(--spacing-3);
	}

	.input-lg .input-field {
		font-size: var(--font-size-lg);
	}

	.scan-button,
	.clear-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-1);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
		flex-shrink: 0;
	}

	.scan-button:hover:not(:disabled),
	.clear-button:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-primary-400);
	}

	.scan-button:active:not(:disabled),
	.clear-button:active:not(:disabled) {
		transform: scale(0.95);
	}

	.scan-button:disabled,
	.clear-button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.clear-button {
		color: var(--color-neutral-500);
	}

	.clear-button:hover:not(:disabled) {
		color: var(--color-danger-400);
	}

	.error-text {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-danger-400);
	}

	.helper-text {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-neutral-400);
	}
</style>
