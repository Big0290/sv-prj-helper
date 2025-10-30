<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import JsBarcode from 'jsbarcode';

	interface Props {
		value: string;
		type?: 'qrcode' | 'code128' | 'code39' | 'ean13' | 'upca';
		size?: number;
		errorCorrection?: 'L' | 'M' | 'Q' | 'H';
		showText?: boolean;
		backgroundColor?: string;
		foregroundColor?: string;
		className?: string;
	}

	let {
		value,
		type = 'qrcode',
		size = 200,
		errorCorrection = 'M',
		showText = true,
		backgroundColor = '#FFFFFF',
		foregroundColor = '#000000',
		className = ''
	}: Props = $props();

	let canvas = $state<HTMLCanvasElement>();
	let error = $state('');

	async function generateBarcode() {
		if (!canvas || !value) return;
		
		error = '';
		
		try {
			if (type === 'qrcode') {
				await QRCode.toCanvas(canvas, value, {
					width: size,
					margin: 2,
					errorCorrectionLevel: errorCorrection,
					color: {
						dark: foregroundColor,
						light: backgroundColor
					}
				});
			} else {
				const format = type === 'code128' ? 'CODE128' : 
							  type === 'code39' ? 'CODE39' : 
							  type === 'upca' ? 'UPC' : 'EAN13';
				
				// Calculate barcode height proportionally
				const height = Math.floor(size * 0.4);
				const width = Math.floor(size / 100);
				
				JsBarcode(canvas, value, {
					format: format,
					height: height,
					width: width,
					displayValue: showText,
					margin: 10,
					background: backgroundColor,
					lineColor: foregroundColor
				});
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to generate barcode';
			console.error('Barcode generation error:', err);
		}
	}

	onMount(() => {
		generateBarcode();
	});

	$effect(() => {
		// Regenerate when any prop changes
		value;
		type;
		size;
		errorCorrection;
		showText;
		backgroundColor;
		foregroundColor;
		
		if (canvas) {
			generateBarcode();
		}
	});
</script>

<div class="barcode-display {className}">
	{#if error}
		<div class="error-container">
			<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10" />
				<path d="M12 8v4M12 16h.01" />
			</svg>
			<p class="error-text">{error}</p>
		</div>
	{:else}
		<canvas 
			bind:this={canvas} 
			class="barcode-canvas" 
			aria-label="{type} barcode with value: {value}"
		></canvas>
	{/if}
</div>

<style>
	.barcode-display {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-4);
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow-md);
	}

	.barcode-canvas {
		display: block;
		max-width: 100%;
		height: auto;
	}

	.error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-3);
		padding: var(--spacing-6);
		color: var(--color-danger-500);
		text-align: center;
	}

	.error-text {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-danger-600);
		max-width: 300px;
	}
</style>
