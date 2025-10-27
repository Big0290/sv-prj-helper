<script lang="ts">
	import type { SpinnerProps } from './Spinner.types.js';

	let { size = 24, color = 'currentColor'  }: SpinnerProps = $props();
</script>

<span class="spinner" style="width: {size}px; height: {size}px; color: {color}" aria-label="Loading" role="status"></span>

<style>
	.spinner {
		display: inline-block;
		border: 3px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
