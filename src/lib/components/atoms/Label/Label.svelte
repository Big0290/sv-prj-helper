<script lang="ts">
	import { type Snippet } from 'svelte';

	import type { LabelProps } from './Label.types.js';

	let { children,
		for: htmlFor,
		required = false,
		disabled = false,
		size = 'base',
		...restProps
	 }: LabelProps = $props();
</script>

<label
	for={htmlFor}
	class="label label--{size}"
	class:disabled
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
	{#if required}
		<span class="required" aria-label="required">*</span>
	{/if}
</label>

<style>
	.label {
		display: inline-block;
		font-weight: var(--font-weight-medium, 500);
		color: var(--text-primary);
		cursor: pointer;
		user-select: none;
	}

	.label--sm { font-size: var(--font-size-sm, 0.875rem); }
	.label--base { font-size: var(--font-size-base, 1rem); }
	.label--lg { font-size: var(--font-size-lg, 1.125rem); }

	.label.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.required {
		color: var(--color-error);
		margin-left: 2px;
	}
</style>
