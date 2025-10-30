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
</script>

<Story name="SingleReaction">
	<script>
		const reactions = [
			{ emoji: '👍', count: 3, userReacted: true, users: ['You', 'Alice', 'Bob'] }
		];
	</script>
	<MessageReaction reactions={reactions} />
</Story>

<Story name="MultipleReactions">
	<script>
		const reactions = [
			{ emoji: '👍', count: 5, userReacted: true, users: ['You', 'Alice', 'Bob', 'Charlie', 'Dave'] },
			{ emoji: '❤️', count: 2, userReacted: false, users: ['Eve', 'Frank'] },
			{ emoji: '😂', count: 1, userReacted: false, users: ['Grace'] }
		];
	</script>
	<MessageReaction reactions={reactions} />
</Story>

<Story name="WithPicker">
	<script>
		const reactions = [
			{ emoji: '👍', count: 3, userReacted: true }
		];
	</script>
	<MessageReaction reactions={reactions} showPicker={true} />
</Story>

<Story name="SmallSize">
	<script>
		const reactions = [
			{ emoji: '👍', count: 5, userReacted: true }
		];
	</script>
	<MessageReaction reactions={reactions} size="sm" />
</Story>

<Story name="LargeSize">
	<script>
		const reactions = [
			{ emoji: '🔥', count: 10, userReacted: true }
		];
	</script>
	<MessageReaction reactions={reactions} size="lg" />
</Story>
