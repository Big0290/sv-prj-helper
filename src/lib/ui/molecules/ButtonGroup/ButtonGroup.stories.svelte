<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ButtonGroup from './ButtonGroup.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/ButtonGroup',
		component: ButtonGroup,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A button group component for displaying related actions together.'
				}
			}
		}
	});
</script>

<Story name="Horizontal Buttons">
	<div class="button-group">
		<ButtonGroup>
			<button class="demo-button">Left</button>
			<button class="demo-button">Middle</button>
			<button class="demo-button">Right</button>
		</ButtonGroup>
	</div>
</Story>

<Story name="Primary Actions">
	<div class="button-group">
		<ButtonGroup>
			<button class="primary-btn">Save</button>
			<button class="secondary-btn">Cancel</button>
		</ButtonGroup>
	</div>
</Story>

<Story name="Icon Buttons">
	<div class="button-group">
		<ButtonGroup>
			<button class="icon-btn">◀</button>
			<button class="icon-btn">▶</button>
		</ButtonGroup>
	</div>
</Story>

<Story name="Vertical Buttons">
	<div class="button-group vertical">
		<ButtonGroup>
			<button class="demo-button">Top</button>
			<button class="demo-button">Middle</button>
			<button class="demo-button">Bottom</button>
		</ButtonGroup>
	</div>
</Story>

<style>
	.button-group {
		margin: 1rem 0;
	}
	
	.button-group.vertical {
		width: 200px;
	}
	
	.demo-button {
		padding: 0.75rem 1.5rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.primary-btn {
		padding: 0.75rem 1.5rem;
		background: var(--color-primary-500, #3b82f6);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.secondary-btn {
		padding: 0.75rem 1.5rem;
		background: transparent;
		color: inherit;
		border: 1px solid currentColor;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
	}
	
	.icon-btn {
		padding: 0.75rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		cursor: pointer;
		font-size: 1.25rem;
	}
</style>
