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

<Story name="Default">
  <AudioButton>Default AudioButton</AudioButton>
</Story>

<Story name="Variation 1">
  <AudioButton>Variation 1</AudioButton>
</Story>

<Story name="Variation 2">
  <AudioButton>Variation 2</AudioButton>
</Story>
