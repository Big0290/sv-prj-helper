<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import VirtualList from './VirtualList.svelte';

  const { Story } = defineMeta({
    title: 'Utils/VirtualList',
    component: VirtualList,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of VirtualList component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <VirtualList>Default VirtualList</VirtualList>
</Story>

<Story name="Variation 1">
  <VirtualList>Variation 1</VirtualList>
</Story>

<Story name="Variation 2">
  <VirtualList>Variation 2</VirtualList>
</Story>
