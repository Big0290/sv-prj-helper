<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContextMenu from './ContextMenu.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/ContextMenu',
    component: ContextMenu,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ContextMenu component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <ContextMenu>Default ContextMenu</ContextMenu>
</Story>

<Story name="Variation 1">
  <ContextMenu>Variation 1</ContextMenu>
</Story>

<Story name="Variation 2">
  <ContextMenu>Variation 2</ContextMenu>
</Story>
