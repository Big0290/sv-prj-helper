<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Accordion from './Accordion.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Accordion',
		component: Accordion,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'An accordion component for collapsible content sections.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ title: 'Click to expand', open: false }}>
	This is the content inside the accordion section.
</Story>

<Story name="Opened" args={{ title: 'Already Expanded', open: true }}>
	This accordion is open by default.
</Story>

<Story name="FAQ Item" args={{ title: 'What is your return policy?', open: false }}>
	We offer a 30-day money-back guarantee on all products. Items must be in original packaging and unused condition.
</Story>

<Story name="Multiple Accordions">
	<div class="accordions-container">
		<Accordion title="Section 1">
			Content for section 1 goes here.
		</Accordion>
		<Accordion title="Section 2">
			Content for section 2 goes here with more details.
		</Accordion>
		<Accordion title="Section 3" open={true}>
			This section is open by default.
		</Accordion>
	</div>
</Story>

<style>
	.accordions-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		max-width: 500px;
	}
</style>
