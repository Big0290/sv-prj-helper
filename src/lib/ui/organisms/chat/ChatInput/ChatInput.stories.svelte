<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ChatInput from './ChatInput.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/ChatInput',
    component: ChatInput,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ChatInput component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <ChatInput>Default ChatInput</ChatInput>
</Story>

<Story name="Variation 1">
  <ChatInput>Variation 1</ChatInput>
</Story>

<Story name="Variation 2">
  <ChatInput>Variation 2</ChatInput>
</Story>
