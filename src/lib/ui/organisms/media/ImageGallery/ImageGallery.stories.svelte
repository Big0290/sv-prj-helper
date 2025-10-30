<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ImageGallery from './ImageGallery.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Media/ImageGallery',
    component: ImageGallery,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ImageGallery component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
