<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MessageReaction from './MessageReaction.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Chat/MessageReaction',
		component: MessageReaction,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A message reaction component for showing and adding emoji reactions.'
				}
			}
		}
	});

	const singleReaction = [
		{ emoji: '👍', count: 3, userReacted: true, users: ['You', 'Alice', 'Bob'] }
	];

	const multipleReactions = [
		{ emoji: '👍', count: 5, userReacted: true, users: ['You', 'Alice', 'Bob', 'Charlie', 'Dave'] },
		{ emoji: '❤️', count: 2, userReacted: false, users: ['Eve', 'Frank'] },
		{ emoji: '😂', count: 1, userReacted: false, users: ['Grace'] }
	];

	const pickerReactions = [
		{ emoji: '👍', count: 3, userReacted: true }
	];

	const smallReactions = [
		{ emoji: '👍', count: 5, userReacted: true }
	];

	const largeReactions = [
		{ emoji: '🔥', count: 10, userReacted: true }
	];
</script>

<Story name="SingleReaction">
	<MessageReaction reactions={singleReaction} />
</Story>

<Story name="MultipleReactions">
	<MessageReaction reactions={multipleReactions} />
</Story>

<Story name="WithPicker">
	<MessageReaction reactions={pickerReactions} showPicker={true} />
</Story>

<Story name="SmallSize">
	<MessageReaction reactions={smallReactions} size="sm" />
</Story>

<Story name="LargeSize">
	<MessageReaction reactions={largeReactions} size="lg" />
</Story>
