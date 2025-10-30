<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Chat from './Chat.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/Chat',
    component: Chat,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Chat component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Chat>Default Chat</Chat>
</Story>

<Story name="Variation 1">
  <Chat>Variation 1</Chat>
</Story>

<Story name="Variation 2">
  <Chat>Variation 2</Chat>
</Story>
