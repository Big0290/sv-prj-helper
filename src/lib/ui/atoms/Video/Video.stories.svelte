<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Video from './Video.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Video',
		component: Video,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A fully-featured video player with custom controls, fullscreen support, and volume management.'
				}
			}
		}
	});
</script>

<Story name="Sample Video Player" args={{ 
	src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
	poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
	controls: true
}} />

<Story name="Auto-playing Video" args={{ 
	src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	autoplay: true,
	muted: true,
	loop: true
}} />

<Story name="Video Playlist">
	<div class="playlist-container">
		<Video 
			src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
			poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
		/>
		<div class="playlist-tracks">
			<h3>More Videos</h3>
			<div class="track" onclick={() => alert('Switch to For Bigger Blazes')}>
				📹 For Bigger Blazes
			</div>
			<div class="track" onclick={() => alert('Switch to Sintel')}>
				📹 Sintel
			</div>
		</div>
	</div>
</Story>

<Story name="Custom Width">
	<Video 
		src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
		width="600px"
	/>
</Story>

<Story name="Looping Video" args={{ 
	src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
	loop: true,
	controls: true
}} />

<style>
	.playlist-container {
		display: flex;
		gap: 2rem;
		max-width: 1000px;
	}
	
	.playlist-tracks {
		flex: 1;
	}
	
	.playlist-tracks h3 {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
	}
	
	.track {
		padding: 0.75rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		border-radius: 0.5rem;
		margin-bottom: 0.5rem;
		cursor: pointer;
		transition: background 0.2s;
	}
	
	.track:hover {
		background: var(--glass-bg-hover, rgba(255, 255, 255, 0.2));
	}
</style>
