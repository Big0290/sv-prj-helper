<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Webcam from './Webcam.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Media/Webcam',
    component: Webcam,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Webcam component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
