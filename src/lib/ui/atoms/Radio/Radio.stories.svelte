<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Radio from './Radio.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Radio',
		component: Radio,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A radio button component for single selection in a group.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Option 1', value: 'option1' }} />

<Story name="Checked" args={{ label: 'Selected option', value: 'selected', group: 'test' }} />

<Story name="Disabled" args={{ disabled: true, label: 'Disabled option', value: 'disabled' }} />

<Story name="Radio Group">
	<div class="radio-group-container">
		<h4>Select an option:</h4>
		<div class="radio-options">
			<Radio label="Option 1" value="1" group="demo" />
			<Radio label="Option 2" value="2" group="demo" />
			<Radio label="Option 3" value="3" group="demo" />
		</div>
	</div>
</Story>

<Story name="With Different Values" args={{ label: 'High', value: 'high' }} />

<Story name="Required Selection">
	<div class="radio-group-container">
		<h4>Payment Method (required):</h4>
		<div class="radio-options">
			<Radio label="Credit Card" value="credit" group="payment" />
			<Radio label="PayPal" value="paypal" group="payment" />
			<Radio label="Bank Transfer" value="bank" group="payment" />
		</div>
	</div>
</Story>

<style>
	.radio-group-container h4 {
		margin: 0 0 1rem 0;
		font-size: 1rem;
	}
	
	.radio-options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
