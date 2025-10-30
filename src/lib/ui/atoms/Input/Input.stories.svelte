<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Input',
		component: Input,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A versatile input component with support for multiple types, validation, and accessibility features.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'Enter text', label: 'Label' }} />

<Story name="With Value" args={{ value: 'John Doe', label: 'Name' }} />

<Story name="Email Input" args={{ type: 'email', placeholder: 'your@email.com', label: 'Email' }} />

<Story name="Password Input" args={{ type: 'password', placeholder: 'Enter password', label: 'Password' }} />

<Story name="Number Input" args={{ type: 'number', placeholder: '0', label: 'Age' }} />

<Story name="With Error" args={{ error: 'This field is required', value: 'test', label: 'Username' }} />

<Story name="Disabled" args={{ disabled: true, value: 'Cannot edit', label: 'Status' }} />

<Story name="With Helper Text" args={{ helperText: 'Must be at least 5 characters', label: 'Password' }} />

<Story name="Required" args={{ required: true, label: 'Email Address', placeholder: 'required@email.com' }} />

<Story name="All Types">
	<div class="types-container">
		<Input type="text" placeholder="Text" label="Text" />
		<Input type="email" placeholder="Email" label="Email" />
		<Input type="password" placeholder="Password" label="Password" />
		<Input type="number" placeholder="Number" label="Number" />
		<Input type="tel" placeholder="Phone" label="Tel" />
		<Input type="url" placeholder="URL" label="URL" />
		<Input type="search" placeholder="Search" label="Search" />
	</div>
</Story>

<Story name="States">
	<div class="states-container">
		<Input label="Normal" placeholder="Normal input" />
		<Input label="Disabled" value="Disabled" disabled />
		<Input label="Readonly" value="Readonly" readonly />
		<Input label="Error" error="This field has an error" />
	</div>
</Story>

<style>
	.types-container,
	.states-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 400px;
	}
</style>
