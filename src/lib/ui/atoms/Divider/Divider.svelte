<script lang="ts">
	interface Props {
		orientation?: 'horizontal' | 'vertical';
		spacing?: '2' | '4' | '6' | '8';
	}

	let { orientation = 'horizontal', spacing = '4' }: Props = $props();
</script>

{#if orientation === 'horizontal'}
	<div
		class="divider divider-horizontal divider-spacing-{spacing}"
		role="separator"
		aria-orientation="horizontal"
		style="background: #666; height: 3px; width: 100%;"
	></div>
{:else}
	<div
		class="divider divider-vertical divider-spacing-{spacing}"
		role="separator"
		aria-orientation="vertical"
		style="background: #666; width: 3px; min-height: 30px; height: 100%;"
	></div>
{/if}

<style>
	.divider {
		flex-shrink: 0;
	}

	.divider-spacing-2 {
		margin: 0.5rem 0;
	}

	.divider-spacing-4 {
		margin: 1rem 0;
	}

	.divider-spacing-6 {
		margin: 1.5rem 0;
	}

	.divider-spacing-8 {
		margin: 2rem 0;
	}

	.divider-vertical.divider-spacing-2 {
		margin: 0 0.5rem;
	}

	.divider-vertical.divider-spacing-4 {
		margin: 0 1rem;
	}

	.divider-vertical.divider-spacing-6 {
		margin: 0 1.5rem;
	}

	.divider-vertical.divider-spacing-8 {
		margin: 0 2rem;
	}
</style>
