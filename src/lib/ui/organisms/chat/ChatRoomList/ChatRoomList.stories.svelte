<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ChatRoomList from './ChatRoomList.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Chat/ChatRoomList',
    component: ChatRoomList,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ChatRoomList component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
