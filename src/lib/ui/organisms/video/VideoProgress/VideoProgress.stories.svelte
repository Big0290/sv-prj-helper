<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import VideoProgress from './VideoProgress.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Video/VideoProgress',
    component: VideoProgress,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A video progress component with auto-save functionality.',
        },
      },
    },
  })
</script>

<Story name="NoProgress" args={{ videoId: 'test-video-1', duration: 300, currentTime: 0 }} />

<Story name="PartialProgress" args={{ videoId: 'test-video-2', duration: 300, currentTime: 120, autoSave: false }} />

<Story name="WithoutLabel" args={{ videoId: 'test-video-3', duration: 600, currentTime: 0, showLabel: false }} />
