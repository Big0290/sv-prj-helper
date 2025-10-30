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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
