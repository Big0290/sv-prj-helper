<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ImageCropper from './ImageCropper.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Media/ImageCropper',
    component: ImageCropper,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ImageCropper component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <ImageCropper>Default ImageCropper</ImageCropper>
</Story>

<Story name="Variation 1">
  <ImageCropper>Variation 1</ImageCropper>
</Story>

<Story name="Variation 2">
  <ImageCropper>Variation 2</ImageCropper>
</Story>
