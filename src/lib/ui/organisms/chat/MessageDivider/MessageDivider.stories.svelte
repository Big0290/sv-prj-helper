<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MessageDivider from './MessageDivider.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/MessageDivider',
    component: MessageDivider,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of MessageDivider component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
