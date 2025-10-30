<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import VideoPlaylist from './VideoPlaylist.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Video/VideoPlaylist',
    component: VideoPlaylist,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'A video playlist component with multiple videos.',
        },
      },
    },
  })

  const videos = [
    {
      id: '1',
      title: 'Video 1',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://picsum.photos/400/300?random=1',
      duration: 120,
    },
    {
      id: '2',
      title: 'Video 2',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://picsum.photos/400/300?random=2',
      duration: 90,
    },
    {
      id: '3',
      title: 'Video 3',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://picsum.photos/400/300?random=3',
      duration: 150,
    },
  ]
</script>

<Story name="Vertical" args={{ currentIndex: 0, videos, orientation: 'vertical' }} />

<Story name="Horizontal" args={{ currentIndex: 0, videos, orientation: 'horizontal' }} />

<Story name="NoAutoPlay" args={{ currentIndex: 0, videos, autoPlayNext: false }} />
