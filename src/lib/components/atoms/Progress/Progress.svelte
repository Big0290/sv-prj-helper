<script lang="ts">
	import type { ProgressProps } from './Progress.types.js';

	let { value, max = 100, variant = 'default', label  }: ProgressProps = $props();
	const percentage = $derived((value / max) * 100);
</script>

<div class="progress-wrapper">
	{#if label}
		<div class="progress-label">{label}</div>
	{/if}
	<div class="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
		<div class="progress-bar progress-bar-{variant}" style="width: {percentage}%"></div>
	</div>
</div>

<style>
	.progress-wrapper {
		width: 100%;
	}

	.progress-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
		margin-bottom: var(--spacing-2);
	}

	@media (prefers-color-scheme: dark) {
		.progress-label {
			color: var(--color-neutral-300);
		}
	}

	.progress {
		width: 100%;
		height: 12px;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		transition: width var(--transition-base);
	}

	.progress-bar-default {
		background: linear-gradient(90deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
	}

	.progress-bar-success {
		background: linear-gradient(90deg, var(--color-success) 0%, #059669 100%);
	}

	.progress-bar-warning {
		background: linear-gradient(90deg, var(--color-warning) 0%, #d97706 100%);
	}

	.progress-bar-error {
		background: linear-gradient(90deg, var(--color-error) 0%, #dc2626 100%);
	}
</style>
