<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Button',
		component: Button,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A versatile button component that can render as either a button or link element, with multiple variants, sizes, and states including loading.'
				}
			}
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'ghost', 'danger'],
				description: 'Visual style variant of the button'
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg'],
				description: 'Size of the button'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the button is disabled'
			},
			loading: {
				control: { type: 'boolean' },
				description: 'Shows a loading spinner when true'
			},
			type: {
				control: { type: 'select' },
				options: ['button', 'submit', 'reset'],
				description: 'HTML button type attribute'
			}
		}
	});
</script>

<Story name="Primary Button" args={{ variant: 'primary' }}>
	<Button variant="primary">Click Me</Button>
</Story>

<Story name="All Variants">
	<div class="story-container">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="danger">Danger</Button>
	</div>
</Story>

<Story name="All Sizes">
	<div class="story-container">
		<Button size="sm">Small</Button>
		<Button size="md">Medium</Button>
		<Button size="lg">Large</Button>
	</div>
</Story>

<Story name="Loading State">
	<Button loading={true}>Processing...</Button>
</Story>

<Story name="Disabled State">
	<div class="story-container">
		<Button disabled={true} variant="primary">Disabled Primary</Button>
		<Button disabled={true} variant="danger">Disabled Danger</Button>
	</div>
</Story>

<Story name="As External Link">
	<Button href="https://svelte.dev" target="_blank" variant="primary">
		Visit Svelte →
	</Button>
</Story>

<style>
	.story-container {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
