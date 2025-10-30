<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MessageStatus from './MessageStatus.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Chat/MessageStatus',
		component: MessageStatus,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A message status indicator showing sending, sent, delivered, read, or failed states.'
				}
			}
		}
	});
</script>

<Story name="Sending">
	<MessageStatus status="sending" />
</Story>

<Story name="Sent">
	<MessageStatus status="sent" />
</Story>

<Story name="Delivered">
	<MessageStatus status="delivered" />
</Story>

<Story name="Read">
	<MessageStatus status="read" />
</Story>

<Story name="Failed">
	<MessageStatus status="failed" />
</Story>

<Story name="WithTimestamp">
	<MessageStatus status="read" timestamp={new Date()} showTimestamp={true} />
</Story>
