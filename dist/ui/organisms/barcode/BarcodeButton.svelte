<script lang="ts">
	import BarcodeModal from './BarcodeModal.svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		label?: string;
		modalTitle?: string;
		onScan?: (code: string, format: string) => void;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		label = 'Scan Barcode',
		modalTitle = 'Scan Barcode',
		onScan
	}: Props = $props();

	let isModalOpen = $state(false);

	function handleScan(code: string, format: string) {
		onScan?.(code, format);
		isModalOpen = false;
	}

	function openScanner() {
		if (disabled) return;
		isModalOpen = true;
	}

	const variantClasses = {
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		outline: 'btn-outline',
		ghost: 'btn-ghost',
		icon: 'btn-icon'
	};

	const sizeClasses = {
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg'
	};
</script>

<button
	type="button"
	class="barcode-button {variantClasses[variant]} {sizeClasses[size]}"
	onclick={openScanner}
	{disabled}
	aria-label={variant === 'icon' ? 'Scan barcode' : undefined}
>
	<svg 
		width={size === 'sm' ? '16' : size === 'lg' ? '24' : '20'} 
		height={size === 'sm' ? '16' : size === 'lg' ? '24' : '20'} 
		viewBox="0 0 24 24" 
		fill="none" 
		stroke="currentColor" 
		stroke-width="2"
	>
		<path d="M3 7V5a2 2 0 0 1 2-2h2" />
		<path d="M17 3h2a2 2 0 0 1 2 2v2" />
		<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
		<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
		<rect x="7" y="7" width="10" height="10" rx="1" />
	</svg>
	{#if variant !== 'icon'}
		<span>{label}</span>
	{/if}
</button>

<BarcodeModal bind:isOpen={isModalOpen} onScan={handleScan} title={modalTitle} />

<style>
	.barcode-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		font-weight: var(--font-weight-medium);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-normal);
		border: none;
		white-space: nowrap;
	}

	.barcode-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.barcode-button:not(:disabled):active {
		transform: scale(0.98);
	}

	/* Sizes */
	.btn-sm {
		padding: var(--spacing-2) var(--spacing-3);
		font-size: var(--font-size-sm);
		gap: var(--spacing-1-5);
	}

	.btn-md {
		padding: var(--spacing-3) var(--spacing-4);
		font-size: var(--font-size-base);
	}

	.btn-lg {
		padding: var(--spacing-4) var(--spacing-6);
		font-size: var(--font-size-lg);
		gap: var(--spacing-3);
	}

	.btn-icon {
		padding: var(--spacing-3);
		aspect-ratio: 1;
	}

	.btn-icon.btn-sm {
		padding: var(--spacing-2);
	}

	.btn-icon.btn-lg {
		padding: var(--spacing-4);
	}

	/* Variants */
	.btn-primary {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		box-shadow: var(--glass-shadow-md);
	}

	.btn-primary:hover:not(:disabled) {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		box-shadow: var(--glass-shadow-lg);
	}

	.btn-secondary {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		color: var(--color-neutral-50);
		box-shadow: var(--glass-shadow-md);
	}

	.btn-secondary:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.btn-outline {
		background: transparent;
		border: 2px solid var(--color-primary-500);
		color: var(--color-primary-400);
	}

	.btn-outline:hover:not(:disabled) {
		background: rgba(139, 92, 246, 0.1);
		border-color: var(--color-primary-400);
		color: var(--color-primary-300);
	}

	.btn-ghost {
		background: transparent;
		color: var(--color-neutral-300);
	}

	.btn-ghost:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-neutral-50);
	}

	.btn-icon {
		border-radius: var(--radius-full);
	}

	.btn-icon.btn-primary {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
	}

	.btn-icon.btn-secondary {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
	}

	.btn-icon.btn-outline {
		background: transparent;
		border: 2px solid var(--color-primary-500);
	}

	.btn-icon.btn-ghost {
		background: transparent;
	}
</style>
