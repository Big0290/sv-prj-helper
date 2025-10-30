<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DraggableGrid from './DraggableGrid.svelte';

  const { Story } = defineMeta({
    title: 'Layouts/DraggableGrid',
    component: DraggableGrid,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of DraggableGrid component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <DraggableGrid>Default DraggableGrid</DraggableGrid>
</Story>

<Story name="Variation 1">
  <DraggableGrid>Variation 1</DraggableGrid>
</Story>

<Story name="Variation 2">
  <DraggableGrid>Variation 2</DraggableGrid>
</Story>
