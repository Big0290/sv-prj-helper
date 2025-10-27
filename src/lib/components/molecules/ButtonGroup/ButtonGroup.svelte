<script lang="ts">
	import type { Snippet } from 'svelte';
	
	import type { ButtonGroupProps } from './ButtonGroup.types.js';

	let { children,
		orientation = 'horizontal',
		size = 'md',
		className = ''
	 }: ButtonGroupProps = $props();
</script>

<div 
	class="button-group {orientation} {size} {className}" 
	role="group"
>
	{@render children()}
</div>

<style>
	.button-group {
		display: flex;
		isolation: isolate;
	}

	.button-group.horizontal {
		flex-direction: row;
	}

	.button-group.vertical {
		flex-direction: column;
	}

	/* Remove borders between buttons */
	.button-group :global(button:not(:first-child)) {
		margin-left: -1px;
	}

	.button-group.vertical :global(button:not(:first-child)) {
		margin-left: 0;
		margin-top: -1px;
	}

	/* Round corners only on first and last */
	.button-group.horizontal :global(button:not(:first-child):not(:last-child)) {
		border-radius: 0;
	}

	.button-group.horizontal :global(button:first-child) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.button-group.horizontal :global(button:last-child) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.button-group.vertical :global(button:not(:first-child):not(:last-child)) {
		border-radius: 0;
	}

	.button-group.vertical :global(button:first-child) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.button-group.vertical :global(button:last-child) {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	/* Ensure active button is on top */
	.button-group :global(button:hover),
	.button-group :global(button:focus),
	.button-group :global(button:active) {
		z-index: 1;
	}
</style>