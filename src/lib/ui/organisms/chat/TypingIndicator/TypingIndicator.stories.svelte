<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TypingIndicator from './TypingIndicator.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Chat/TypingIndicator',
		component: TypingIndicator,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A typing indicator showing that someone is currently typing a message.'
				}
			}
		}
	});
</script>

<Story name="Bubble">
	<TypingIndicator userName="John Doe" variant="bubble" />
</Story>

<Story name="Inline">
	<TypingIndicator userName="Jane Smith" variant="inline" />
</Story>

<Story name="WithAvatar">
	<TypingIndicator userName="Bob" avatar="https://i.pravatar.cc/150?img=1" variant="bubble" />
</Story>

<Story name="Small">
	<TypingIndicator userName="Alice" size="sm" />
</Story>

<Story name="Large">
	<TypingIndicator userName="Charlie" size="lg" variant="bubble" />
</Story>

<Story name="WithoutAvatar">
	<TypingIndicator userName="Anonymous" showAvatar={false} variant="bubble" />
</Story>
