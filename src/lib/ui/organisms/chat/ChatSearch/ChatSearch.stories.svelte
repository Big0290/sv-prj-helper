<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ChatSearch from './ChatSearch.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/ChatSearch',
    component: ChatSearch,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ChatSearch component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
