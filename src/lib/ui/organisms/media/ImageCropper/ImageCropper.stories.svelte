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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
