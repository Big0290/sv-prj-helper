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

<Story name="Default">
  <DragAndDrop>Default DragAndDrop</DragAndDrop>
</Story>

<Story name="Variation 1">
  <DragAndDrop>Variation 1</DragAndDrop>
</Story>

<Story name="Variation 2">
  <DragAndDrop>Variation 2</DragAndDrop>
</Story>
