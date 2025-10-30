<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TreeView from './TreeView.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Data/TreeView',
    component: TreeView,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of TreeView component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
