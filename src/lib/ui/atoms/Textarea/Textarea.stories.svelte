<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from './Textarea.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A textarea component for multi-line text input.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'Enter your message...', label: 'Message' }} />

<Story name="With Value" args={{ value: 'This is some sample text', label: 'Description' }} />

<Story name="Resizable" args={{ rows: 5, placeholder: 'Resizable textarea...', label: 'Notes' }} />

<Story name="Disabled" args={{ disabled: true, value: 'Cannot edit this text', label: 'Read only' }} />

<Story name="With Helper Text" args={{ helperText: 'Maximum 500 characters', label: 'Comments' }} />

<Story name="Required" args={{ required: true, label: 'Feedback', placeholder: 'Required field' }} />

<Story name="All States">
	<div class="states-container">
		<Textarea label="Normal" placeholder="Type here..." />
		<Textarea label="Disabled" value="Cannot edit" disabled={true} />
		<Textarea label="With Error" error="This field is required" value="test" />
	</div>
</Story>

<style>
	.states-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		min-width: 400px;
	}
</style>
