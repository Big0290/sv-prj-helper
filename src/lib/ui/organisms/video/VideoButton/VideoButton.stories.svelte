<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import VideoButton from './VideoButton.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Video/VideoButton',
		component: VideoButton,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A video button component that can play inline or open in a modal.'
				}
			}
		}
	});
</script>

<Story name="Inline">
	<VideoButton 
		title="Sample Video"
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
		thumbnail="https://picsum.photos/400/300"
		variant="inline"
	/>
</Story>

<Story name="Modal">
	<VideoButton 
		title="Click to open in modal"
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
		thumbnail="https://picsum.photos/400/300?random=2"
		variant="modal"
	/>
</Story>

<Story name="Small">
	<VideoButton 
		title="Small Button"
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
		size="sm"
	/>
</Story>

<Story name="Large">
	<VideoButton 
		title="Large Button"
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
		size="lg"
	/>
</Story>
