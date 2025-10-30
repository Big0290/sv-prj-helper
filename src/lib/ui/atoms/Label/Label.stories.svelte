<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Label from './Label.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Label',
		component: Label,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A label component for form inputs with support for required indicators and different sizes.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<Label for="input-1">Label Text</Label>
</Story>

<Story name="Required">
	<Label for="input-2" required>Required Field</Label>
</Story>

<Story name="AllSizes">
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<Label for="input-sm" size="sm">Small Label</Label>
		<Label for="input-base" size="base">Base Label</Label>
		<Label for="input-lg" size="lg">Large Label</Label>
	</div>
</Story>

<Story name="Disabled">
	<Label for="input-disabled" disabled>Disabled Label</Label>
</Story>

<Story name="FormExample">
	<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
		<div>
			<Label for="name" required>Full Name</Label>
			<input id="name" type="text" placeholder="Enter your name" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;" />
		</div>
		<div>
			<Label for="email">Email Address</Label>
			<input id="email" type="email" placeholder="your@email.com" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;" />
		</div>
		<div>
			<Label for="phone" size="sm">Phone Number</Label>
			<input id="phone" type="tel" placeholder="+1 (555) 123-4567" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;" />
		</div>
	</div>
</Story>
