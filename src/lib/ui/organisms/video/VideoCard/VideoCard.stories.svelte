<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import VideoCard from './VideoCard.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Video/VideoCard',
		component: VideoCard,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A video card component with thumbnail, metadata, and hover preview.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<VideoCard 
		title="Example Video"
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
		thumbnail="https://picsum.photos/640/360"
		description="A sample video with full metadata"
		duration={120}
		views={12345}
		author="John Doe"
	/>
</Story>

<Story name="Minimal">
	<VideoCard 
		title="Minimal Video Card"
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
	/>
</Story>

<Story name="WithMetadata">
	<VideoCard 
		title="Amazing Tutorial"
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
		thumbnail="https://picsum.photos/640/360?random=2"
		duration={300}
		views={50000}
		author="Jane Smith"
	/>
</Story>

<Story name="NoHoverPreview">
	<VideoCard 
		title="No Preview"
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
		enableHoverPreview={false}
	/>
</Story>
