<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ChatBubble from './ChatBubble.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Chat/ChatBubble',
		component: ChatBubble,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A chat bubble component for displaying messages in a chat interface.'
				}
			}
		}
	});
</script>

<Story name="UserMessage">
	<ChatBubble 
		message="Hello, this is a user message"
		sender="user"
		timestamp={new Date()}
	/>
</Story>

<Story name="OtherUser">
	<ChatBubble 
		message="Hi! This is from another user"
		sender="other"
		senderName="John Doe"
		timestamp={new Date()}
	/>
</Story>

<Story name="WithAvatar">
	<ChatBubble 
		message="Message with avatar"
		sender="other"
		senderName="Jane Smith"
		avatar="https://i.pravatar.cc/150?img=1"
		timestamp={new Date()}
	/>
</Story>

<Story name="WithoutTimestamp">
	<ChatBubble 
		message="Message without timestamp"
		sender="user"
		showTimestamp={false}
	/>
</Story>

<Story name="WithoutAvatar">
	<ChatBubble 
		message="Message without avatar"
		sender="other"
		senderName="Bob Wilson"
		showAvatar={false}
		timestamp={new Date()}
	/>
</Story>
