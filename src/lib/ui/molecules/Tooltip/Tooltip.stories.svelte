<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A tooltip component for displaying contextual information on hover.'
				}
			}
		}
	});
</script>

<Story name="Top" args={{ content: 'Top tooltip', placement: 'top' }}>
	<span class="tooltip-trigger">Hover me (top)</span>
</Story>

<Story name="Bottom" args={{ content: 'Bottom tooltip', placement: 'bottom' }}>
	<span class="tooltip-trigger">Hover me (bottom)</span>
</Story>

<Story name="Left" args={{ content: 'Left tooltip', placement: 'left' }}>
	<span class="tooltip-trigger">Hover me (left)</span>
</Story>

<Story name="Right" args={{ content: 'Right tooltip', placement: 'right' }}>
	<span class="tooltip-trigger">Hover me (right)</span>
</Story>

<Story name="Long Content" args={{ content: 'This is a very long tooltip message that demonstrates how the tooltip handles extended text content.', placement: 'top' }}>
	<span class="tooltip-trigger">Hover for long tooltip</span>
</Story>

<Story name="Button Tooltip" args={{ content: 'Click to submit form', placement: 'top' }}>
	<button class="demo-button">Submit</button>
</Story>

<Story name="Icon Tooltip" args={{ content: 'Information', placement: 'top' }}>
	<span class="icon-trigger">ℹ️</span>
</Story>

<style>
	.tooltip-trigger {
		padding: 1rem 2rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		cursor: pointer;
	}
	
	.demo-button {
		padding: 0.75rem 1.5rem;
		background: var(--color-primary-500, #3b82f6);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.icon-trigger {
		font-size: 2rem;
		cursor: help;
	}
</style>
