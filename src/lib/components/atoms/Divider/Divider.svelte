<script lang="ts">
	import type { DividerProps } from './Divider.types.js';

	let { orientation = 'horizontal', spacing = '4'  }: DividerProps = $props();
</script>

<div
	class="divider divider-{orientation} divider-spacing-{spacing}"
	role="separator"
	aria-orientation={orientation}
></div>

<style>
	.divider {
		background: var(--glass-border);
	}

	.divider-horizontal {
		width: 100%;
		height: 1px;
	}

	.divider-vertical {
		width: 1px;
		height: 100%;
	}

	.divider-spacing-2 {
		margin: var(--spacing-2) 0;
	}

	.divider-spacing-4 {
		margin: var(--spacing-4) 0;
	}

	.divider-spacing-6 {
		margin: var(--spacing-6) 0;
	}

	.divider-spacing-8 {
		margin: var(--spacing-8) 0;
	}

	.divider-vertical.divider-spacing-2 {
		margin: 0 var(--spacing-2);
	}

	.divider-vertical.divider-spacing-4 {
		margin: 0 var(--spacing-4);
	}

	.divider-vertical.divider-spacing-6 {
		margin: 0 var(--spacing-6);
	}

	.divider-vertical.divider-spacing-8 {
		margin: 0 var(--spacing-8);
	}
</style>
