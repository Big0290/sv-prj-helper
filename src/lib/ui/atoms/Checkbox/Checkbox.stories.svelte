<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A checkbox input component with support for labels, disabled states, and validation.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Accept terms and conditions' }} />

<Story name="Checked" args={{ checked: true, label: 'I agree to the terms' }} />

<Story name="Disabled" args={{ disabled: true, label: 'Cannot be changed' }} />

<Story name="Disabled Checked" args={{ disabled: true, checked: true, label: 'Locked checked' }} />

<Story name="Without Label" args={{ ariaLabel: 'Checkbox without visible label' }} />

<Story name="Required" args={{ required: true, label: 'Required checkbox' }} />

<Story name="Multiple Options">
	<div class="options-container">
		<Checkbox label="Option 1" />
		<Checkbox label="Option 2" checked={true} />
		<Checkbox label="Option 3" />
		<Checkbox label="Option 4" disabled={true} />
	</div>
</Story>

<style>
	.options-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
