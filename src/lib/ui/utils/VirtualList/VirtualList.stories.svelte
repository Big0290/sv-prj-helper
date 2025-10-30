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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
