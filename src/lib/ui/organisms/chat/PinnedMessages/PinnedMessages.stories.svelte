<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PinnedMessages from './PinnedMessages.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/PinnedMessages',
    component: PinnedMessages,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of PinnedMessages component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
