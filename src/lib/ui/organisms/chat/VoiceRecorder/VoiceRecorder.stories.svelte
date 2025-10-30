<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import VoiceRecorder from './VoiceRecorder.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/VoiceRecorder',
    component: VoiceRecorder,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of VoiceRecorder component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <VoiceRecorder>Default VoiceRecorder</VoiceRecorder>
</Story>

<Story name="Variation 1">
  <VoiceRecorder>Variation 1</VoiceRecorder>
</Story>

<Story name="Variation 2">
  <VoiceRecorder>Variation 2</VoiceRecorder>
</Story>
