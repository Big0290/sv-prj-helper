<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatusDot from './StatusDot.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/StatusDot',
		component: StatusDot,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A status indicator dot for showing user online status.'
				}
			}
		}
	});
</script>

<Story name="Online" args={{ status: 'online' }} />

<Story name="Offline" args={{ status: 'offline' }} />

<Story name="Away" args={{ status: 'away' }} />

<Story name="Busy" args={{ status: 'busy' }} />

<Story name="With Label" args={{ status: 'online', showLabel: true }} />

<Story name="Small" args={{ status: 'online', size: 'sm' }} />

<Story name="Medium" args={{ status: 'online', size: 'md' }} />

<Story name="Large" args={{ status: 'online', size: 'lg' }} />

<Story name="All Status Types">
	<div class="statuses-container">
		<StatusDot status="online" showLabel={true} />
		<StatusDot status="offline" showLabel={true} />
		<StatusDot status="away" showLabel={true} />
		<StatusDot status="busy" showLabel={true} />
	</div>
</Story>

<style>
	.statuses-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}
</style>
