<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		cols?: '1' | '2' | '3' | '4' | '6' | '12';
		gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
		children: Snippet;
	}

	let { cols = '3', gap = '4', children }: Props = $props();
</script>

<div class="grid grid-cols-{cols} grid-gap-{gap}">
	{@render children()}
</div>

<style>
	.grid {
		display: grid;
		width: 100%;
	}

	.grid-cols-1 {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}

	.grid-cols-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.grid-cols-3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.grid-cols-4 {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.grid-cols-6 {
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}

	.grid-cols-12 {
		grid-template-columns: repeat(12, minmax(0, 1fr));
	}

	.grid-gap-0 {
		gap: var(--spacing-0);
	}

	.grid-gap-1 {
		gap: var(--spacing-1);
	}

	.grid-gap-2 {
		gap: var(--spacing-2);
	}

	.grid-gap-3 {
		gap: var(--spacing-3);
	}

	.grid-gap-4 {
		gap: var(--spacing-4);
	}

	.grid-gap-6 {
		gap: var(--spacing-6);
	}

	.grid-gap-8 {
		gap: var(--spacing-8);
	}

	@media (max-width: 768px) {
		.grid-cols-3,
		.grid-cols-4,
		.grid-cols-6,
		.grid-cols-12 {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}
</style>
