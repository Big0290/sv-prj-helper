<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MessageQuote from './MessageQuote.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Chat/MessageQuote',
		component: MessageQuote,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A message quote component for quoting previous messages in a chat.'
				}
			}
		}
	});
</script>

<Story name="Full">
	<MessageQuote 
		userName="John Doe"
		messageText="This is a quoted message from another user"
	/>
</Story>

<Story name="Compact">
	<MessageQuote 
		userName="Jane Smith"
		messageText="This is a compact quote variant"
		variant="compact"
	/>
</Story>

<Story name="WithAvatar">
	<MessageQuote 
		userName="Bob Wilson"
		messageText="Message with avatar"
		avatar="https://i.pravatar.cc/150?img=2"
	/>
</Story>

<Story name="ImageType">
	<MessageQuote 
		userName="Alice"
		messageText="Screenshot 2024-01-15.png"
		messageType="image"
	/>
</Story>

<Story name="VideoType">
	<MessageQuote 
		userName="Charlie"
		messageText="video.mp4"
		messageType="video"
	/>
</Story>

<Story name="Closable">
	<MessageQuote 
		userName="Diana"
		messageText="A closable quote"
		closable={true}
	/>
</Story>
