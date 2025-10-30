<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MessageAttachment from './MessageAttachment.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Chat/MessageAttachment',
		component: MessageAttachment,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A message attachment component for displaying file attachments in chat.'
				}
			}
		}
	});
</script>

<Story name="Image">
	<script>
		const attachment = {
			id: '1',
			name: 'image.jpg',
			size: 2456789,
			type: 'image/jpeg',
			url: 'https://picsum.photos/400/300',
			thumbnail: 'https://picsum.photos/200/150'
		};
	</script>
	<MessageAttachment attachment={attachment} />
</Story>

<Story name="PDF">
	<script>
		const attachment = {
			id: '2',
			name: 'document.pdf',
			size: 1024567,
			type: 'application/pdf',
			url: '#'
		};
	</script>
	<MessageAttachment attachment={attachment} />
</Story>

<Story name="Video">
	<script>
		const attachment = {
			id: '3',
			name: 'video.mp4',
			size: 15728640,
			type: 'video/mp4',
			url: '#'
		};
	</script>
	<MessageAttachment attachment={attachment} />
</Story>

<Story name="Compact">
	<script>
		const attachment = {
			id: '4',
			name: 'small-file.zip',
			size: 512345,
			type: 'application/zip',
			url: '#'
		};
	</script>
	<MessageAttachment attachment={attachment} variant="compact" />
</Story>
