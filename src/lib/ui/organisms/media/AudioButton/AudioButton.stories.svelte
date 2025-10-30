<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AudioButton from './AudioButton.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Media/AudioButton',
    component: AudioButton,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of AudioButton component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
