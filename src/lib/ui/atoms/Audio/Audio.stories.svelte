<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Audio from './Audio.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Audio',
		component: Audio,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A fully-featured audio player with play/pause controls, seek functionality, volume control, and progress tracking.'
				}
			}
		},
		argTypes: {
			src: {
				control: { type: 'text' },
				description: 'Audio source URL'
			},
			title: {
				control: { type: 'text' },
				description: 'Track title'
			},
			artist: {
				control: { type: 'text' },
				description: 'Artist name'
			},
			autoplay: {
				control: { type: 'boolean' },
				description: 'Auto-play on load'
			},
			loop: {
				control: { type: 'boolean' },
				description: 'Loop playback'
			}
		}
	});
</script>

<Story name="Music Player" args={{ 
	src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
	title: 'SoundHelix Song 1',
	artist: 'Example Music'
}} />

<Story name="Looped Audio" args={{ 
	src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
	title: 'Ambient Loop',
	artist: 'Background Music',
	loop: true
}} />

<Story name="Multiple Tracks">
	<div class="tracks-container">
		<Audio 
			src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
			title="Track 1"
			artist="SoundHelix"
		/>
		<Audio 
			src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
			title="Track 2"
			artist="SoundHelix"
		/>
		<Audio 
			src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
			title="Track 3"
			artist="SoundHelix"
		/>
	</div>
</Story>

<Story name="With Artist Info">
	<Audio 
		src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
		title="Summer Vibes"
		artist="Chill Beats"
	/>
</Story>

<Story name="Compact Player">
	<Audio 
		src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
		title="Quick Preview"
		class="compact"
	/>
</Story>

<style>
	.tracks-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
		max-width: 600px;
	}
	
	.tracks-container :global(.audio-player) {
		margin: 0;
	}
</style>
