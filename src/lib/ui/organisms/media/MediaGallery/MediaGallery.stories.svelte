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

<Story name="Default">
  <MediaGallery>Default MediaGallery</MediaGallery>
</Story>

<Story name="Variation 1">
  <MediaGallery>Variation 1</MediaGallery>
</Story>

<Story name="Variation 2">
  <MediaGallery>Variation 2</MediaGallery>
</Story>
