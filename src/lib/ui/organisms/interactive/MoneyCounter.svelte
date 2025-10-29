<script lang="ts">
	interface Props {
		/** The denomination value (e.g., 0.05 for 5 cents) */
		denomination?: number;
		/** Display label for the denomination (e.g., "5¢") */
		denominationLabel?: string;
		/** Initial count value */
		count?: number;
		/** Currency code (e.g., "CDN", "USD") */
		currency?: 'CDN' | 'USD';
		/** Whether the component is disabled */
		disabled?: boolean;
		/** Minimum count value */
		min?: number;
		/** Maximum count value */
		max?: number;
		/** Callback when count changes */
		onChange?: (count: number, total: number) => void;
		/** Callback when currency changes */
		onCurrencyChange?: (currency: 'CDN' | 'USD') => void;
	}

	export type { Props as MoneyCounterProps };

	let {
		denomination = 0.05,
		denominationLabel,
		count = $bindable(0),
		currency = $bindable('CDN'),
		disabled = false,
		min = 0,
		max,
		onChange,
		onCurrencyChange
	}: Props = $props();

	// Generate label from denomination if not provided
	const displayLabel = $derived(
		denominationLabel || `${(denomination * 100).toFixed(0)}¢`
	);

	// Calculate total value
	const total = $derived(count * denomination);

	// Quick adjustment values
	const quickAdjustments = [5, 10, 20];

	// Format currency display
	const formatCurrency = (value: number): string => {
		return new Intl.NumberFormat('en-CA', {
			style: 'currency',
			currency: currency === 'CDN' ? 'CAD' : 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(value);
	};

	// Update count value
	function updateCount(newCount: number) {
		if (disabled) return;

		// Apply min/max constraints
		let adjustedCount = newCount;
		if (adjustedCount < min) adjustedCount = min;
		if (max !== undefined && adjustedCount > max) adjustedCount = max;

		count = adjustedCount;
		// Calculate total here since we need it immediately for callback
		const newTotal = adjustedCount * denomination;
		onChange?.(adjustedCount, newTotal);
	}

	// Increment count
	function increment(amount = 1) {
		updateCount(count + amount);
	}

	// Decrement count
	function decrement(amount = 1) {
		updateCount(count - amount);
	}

	// Handle input change - validate and constrain
	function handleInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = parseInt(target.value, 10);
		if (!isNaN(value)) {
			// Use updateCount to ensure consistency and trigger onChange
			updateCount(value);
		} else if (target.value === '' || isNaN(parseFloat(target.value))) {
			// Reset to min if invalid
			updateCount(min);
		}
	}

	// Handle currency toggle
	function toggleCurrency() {
		if (disabled) return;
		const newCurrency = currency === 'CDN' ? 'USD' : 'CDN';
		currency = newCurrency;
		onCurrencyChange?.(newCurrency);
	}

	// Handle keydown for input
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			increment();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			decrement();
		}
	}
</script>

<div class="money-counter" class:disabled>
	<!-- Denomination Display -->
	<div class="denomination-display">{displayLabel}</div>

	<!-- Currency Selector -->
	<div class="currency-bar">
		<button
			type="button"
			class="currency-button"
			class:active={currency === 'CDN'}
			onclick={() => {
				if (!disabled && currency !== 'CDN') toggleCurrency();
			}}
			{disabled}
			aria-label="Select Canadian Dollar"
		>
			CDN
		</button>
		<button
			type="button"
			class="currency-button"
			class:active={currency === 'USD'}
			onclick={() => {
				if (!disabled && currency !== 'USD') toggleCurrency();
			}}
			{disabled}
			aria-label="Select US Dollar"
		>
			USD
		</button>
	</div>

	<!-- Calculation Display -->
	<div class="calculation-display">
		{count} × {denomination.toFixed(2)} $ = {formatCurrency(total)}
	</div>

	<!-- Main Counter with +/- Buttons -->
	<div class="counter-wrapper">
		<button
			type="button"
			class="increment-button decrement-button"
			onclick={() => decrement()}
			disabled={disabled || count <= min}
			aria-label="Decrease count by 1"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
		</button>

		<input
			type="number"
			class="count-input"
			bind:value={count}
			{min}
			max={max}
			{disabled}
			oninput={handleInputChange}
			onkeydown={handleKeydown}
			aria-label="Count input"
		/>

		<button
			type="button"
			class="increment-button"
			onclick={() => increment()}
			disabled={disabled || (max !== undefined && count >= max)}
			aria-label="Increase count by 1"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
		</button>
	</div>

	<!-- Quick Adjustment Buttons -->
	<div class="quick-adjustments">
		<div class="adjustment-row">
			{#each quickAdjustments as amount}
				<button
					type="button"
					class="adjustment-button decrement"
					onclick={() => decrement(amount)}
					disabled={disabled || count < min + amount}
					aria-label="Decrease by {amount}"
				>
					-{amount}
				</button>
			{/each}
		</div>
		<div class="adjustment-row">
			{#each quickAdjustments as amount}
				<button
					type="button"
					class="adjustment-button increment"
					onclick={() => increment(amount)}
					disabled={disabled || (max !== undefined && count > max - amount)}
					aria-label="Increase by {amount}"
				>
					+{amount}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.money-counter {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-4);
		padding: var(--spacing-6);
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--glass-shadow);
		min-width: 280px;
		max-width: 400px;
	}

	.money-counter.disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	/* Denomination Display */
	.denomination-display {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-primary-400);
		text-align: center;
	}

	/* Currency Selector */
	.currency-bar {
		display: flex;
		gap: var(--spacing-2);
		width: 100%;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: var(--spacing-1);
	}

	.currency-button {
		flex: 1;
		padding: var(--spacing-2) var(--spacing-4);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		color: var(--color-neutral-400);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.currency-button:hover:not(:disabled) {
		color: var(--color-primary-300);
	}

	.currency-button.active {
		background: var(--glass-bg-hover);
		color: var(--color-primary-400);
		box-shadow: var(--glass-shadow);
	}

	.currency-button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	/* Calculation Display */
	.calculation-display {
		font-size: var(--font-size-base);
		color: var(--color-neutral-300);
		text-align: center;
		font-weight: var(--font-weight-medium);
	}

	/* Main Counter */
	.counter-wrapper {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		width: 100%;
	}

	.increment-button {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);
		border: none;
		background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-base);
		box-shadow: var(--glass-shadow);
		flex-shrink: 0;
	}

	.increment-button:hover:not(:disabled) {
		background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%);
		box-shadow: var(--glass-shadow-lg);
		transform: translateY(-2px);
	}

	.increment-button:active:not(:disabled) {
		transform: translateY(0);
	}

	.increment-button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.decrement-button {
		background: linear-gradient(135deg, var(--color-error) 0%, #dc2626 100%);
	}

	.decrement-button:hover:not(:disabled) {
		background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
	}

	.count-input {
		flex: 1;
		height: 48px;
		padding: var(--spacing-2) var(--spacing-4);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		text-align: center;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-50);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		box-shadow: var(--glass-shadow);
		transition: all var(--transition-base);
	}

	.count-input:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: var(--glass-shadow-lg), 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	.count-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Hide number input arrows */
	.count-input::-webkit-outer-spin-button,
	.count-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.count-input[type='number'] {
		-moz-appearance: textfield;
	}

	/* Quick Adjustments */
	.quick-adjustments {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		width: 100%;
	}

	.adjustment-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-2);
	}

	.adjustment-button {
		padding: var(--spacing-3) var(--spacing-4);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-200);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		cursor: pointer;
		transition: all var(--transition-base);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		box-shadow: var(--glass-shadow);
	}

	.adjustment-button:hover:not(:disabled) {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-400);
		box-shadow: var(--glass-shadow-lg);
		transform: translateY(-1px);
	}

	.adjustment-button:active:not(:disabled) {
		transform: translateY(0);
	}

	.adjustment-button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.adjustment-button.decrement:hover:not(:disabled) {
		border-color: var(--color-error);
		color: var(--color-error);
	}

	.adjustment-button.increment:hover:not(:disabled) {
		border-color: var(--color-primary-400);
		color: var(--color-primary-400);
	}

	/* Focus visible */
	.currency-button:focus-visible,
	.increment-button:focus-visible,
	.count-input:focus-visible,
	.adjustment-button:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	@media (prefers-color-scheme: light) {
		.calculation-display {
			color: var(--color-neutral-600);
		}

		.count-input {
			color: var(--color-neutral-900);
			background: rgba(255, 255, 255, 0.7);
		}

		.adjustment-button {
			color: var(--color-neutral-700);
		}
	}
</style>
