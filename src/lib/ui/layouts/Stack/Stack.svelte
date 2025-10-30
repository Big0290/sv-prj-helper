<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		direction?: 'row' | 'column';
		gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
		align?: 'start' | 'center' | 'end' | 'stretch';
		justify?: 'start' | 'center' | 'end' | 'between' | 'around';
		wrap?: boolean;
		children: Snippet;
	}

	let {
		direction = 'column',
		gap = '4',
		align = 'stretch',
		justify = 'start',
		wrap = false,
		children
	}: Props = $props();
</script>

<div
	class="stack stack-{direction} stack-gap-{gap} stack-align-{align} stack-justify-{justify}"
	class:stack-wrap={wrap}
>
	{@render children()}
</div>

<style>
	.stack {
		display: flex;
	}

	.stack-row {
		flex-direction: row;
	}

	.stack-column {
		flex-direction: column;
	}

	.stack-gap-0 {
		gap: var(--spacing-0);
	}

	.stack-gap-1 {
		gap: var(--spacing-1);
	}

	.stack-gap-2 {
		gap: var(--spacing-2);
	}

	.stack-gap-3 {
		gap: var(--spacing-3);
	}

	.stack-gap-4 {
		gap: var(--spacing-4);
	}

	.stack-gap-6 {
		gap: var(--spacing-6);
	}

	.stack-gap-8 {
		gap: var(--spacing-8);
	}

	.stack-align-start {
		align-items: flex-start;
	}

	.stack-align-center {
		align-items: center;
	}

	.stack-align-end {
		align-items: flex-end;
	}

	.stack-align-stretch {
		align-items: stretch;
	}

	.stack-justify-start {
		justify-content: flex-start;
	}

	.stack-justify-center {
		justify-content: center;
	}

	.stack-justify-end {
		justify-content: flex-end;
	}

	.stack-justify-between {
		justify-content: space-between;
	}

	.stack-justify-around {
		justify-content: space-around;
	}

	.stack-wrap {
		flex-wrap: wrap;
	}
</style>
