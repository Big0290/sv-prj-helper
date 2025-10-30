<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MediaGallery from './MediaGallery.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Media/MediaGallery',
    component: MediaGallery,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of MediaGallery component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
