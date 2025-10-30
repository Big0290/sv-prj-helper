<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './Alert.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Alert',
		component: Alert,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'Alert component for displaying important messages to users.'
				}
			}
		}
	});
</script>

<Story name="Info" args={{ variant: 'info' }}>
	This is an informational message for the user.
</Story>

<Story name="Success" args={{ variant: 'success' }}>
	Your changes have been saved successfully!
</Story>

<Story name="Warning" args={{ variant: 'warning' }}>
	Please review your input before proceeding.
</Story>

<Story name="Error" args={{ variant: 'error' }}>
	An error occurred while processing your request.
</Story>

<Story name="With Title" args={{ variant: 'info', title: 'Information' }}>
	This alert has a title and detailed message content.
</Story>

<Story name="Dismissible">
	<Alert variant="info" dismissible={true} onclose={() => console.log('Alert dismissed')}>
		This alert can be dismissed by clicking the close button.
	</Alert>
</Story>

<Story name="All Variants">
	<div class="alerts-container">
		<Alert variant="info" title="Info">
			This is an informational alert.
		</Alert>
		<Alert variant="success" title="Success">
			Operation completed successfully.
		</Alert>
		<Alert variant="warning" title="Warning">
			Please be careful with this action.
		</Alert>
		<Alert variant="error" title="Error">
			Something went wrong. Please try again.
		</Alert>
	</div>
</Story>

<style>
	.alerts-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 500px;
	}
</style>
