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

<Story name="Default">
  <ImageGallery>Default ImageGallery</ImageGallery>
</Story>

<Story name="Variation 1">
  <ImageGallery>Variation 1</ImageGallery>
</Story>

<Story name="Variation 2">
  <ImageGallery>Variation 2</ImageGallery>
</Story>
