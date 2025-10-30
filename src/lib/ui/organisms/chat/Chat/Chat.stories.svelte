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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
