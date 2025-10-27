<script lang="ts">
	import type { ColorPickerProps } from './ColorPicker.types.js';

	let { value = $bindable('#3b82f6'),
		label,
		onChange
	 }: ColorPickerProps = $props();

	const inputId = `color-input-${Math.random().toString(36).substr(2, 9)}`;

	const presets = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#000000', '#ffffff'];

	function handleChange(e: Event) {
		const input = e.target as HTMLInputElement;
		value = input.value;
		onChange?.(value);
	}
	
	function handleHexInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const hex = input.value;
		if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
			value = hex;
			onChange?.(value);
		}
	}
</script>

<div class="color-picker">
	{#if label}<label class="label" for={inputId}>{label}</label>{/if}
	<div class="picker-wrapper">
		<input 
			id={inputId}
			type="color" 
			value={value} 
			onchange={handleChange} 
			aria-label={label || 'Color picker'}
		/>
		<div class="preview" style="background-color: {value}"></div>
		<input 
			type="text" 
			value={value} 
			class="hex-input" 
			pattern="^#[0-9A-Fa-f]{6}$" 
			oninput={handleHexInput}
			aria-label="Hex color value"
		/>
	</div>
	<div class="presets">
		{#each presets as preset}
			<button 
				type="button" 
				class="preset" 
				style="background-color: {preset}" 
				onclick={() => { value = preset; onChange?.(value); }}
				aria-label="Select color {preset}"
				title="Select color {preset}"
			></button>
		{/each}
	</div>
</div>

<style>
	.color-picker { width: 100%; }
	.label { display: block; margin-bottom: var(--spacing-2); font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-neutral-700); }
	.picker-wrapper { display: flex; align-items: center; gap: var(--spacing-2); }
	.picker-wrapper input[type="color"] { width: 60px; height: 42px; border: 2px solid var(--glass-border); border-radius: var(--radius-md); cursor: pointer; }
	.preview { width: 42px; height: 42px; border-radius: var(--radius-md); border: 2px solid var(--glass-border); }
	.hex-input { flex: 1; padding: var(--spacing-2) var(--spacing-3); background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-md); font-size: var(--font-size-sm); }
	.presets { display: flex; gap: var(--spacing-2); margin-top: var(--spacing-3); flex-wrap: wrap; }
	.preset { width: 32px; height: 32px; border: 2px solid var(--glass-border); border-radius: var(--radius-sm); cursor: pointer; transition: transform var(--transition-fast); }
	.preset:hover { transform: scale(1.1); }
</style>
