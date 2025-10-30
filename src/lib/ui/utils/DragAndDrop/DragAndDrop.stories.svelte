<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DragAndDrop from './DragAndDrop.svelte';

  const { Story } = defineMeta({
    title: 'Utils/DragAndDrop',
    component: DragAndDrop,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of DragAndDrop component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
