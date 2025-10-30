<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ChatHeader from './ChatHeader.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/ChatHeader',
    component: ChatHeader,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ChatHeader component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <ChatHeader>Default ChatHeader</ChatHeader>
</Story>

<Story name="Variation 1">
  <ChatHeader>Variation 1</ChatHeader>
</Story>

<Story name="Variation 2">
  <ChatHeader>Variation 2</ChatHeader>
</Story>
