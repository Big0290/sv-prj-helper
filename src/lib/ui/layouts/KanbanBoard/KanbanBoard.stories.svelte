<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import KanbanBoard from './KanbanBoard.svelte';

  const { Story } = defineMeta({
    title: 'Layouts/KanbanBoard',
    component: KanbanBoard,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of KanbanBoard component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <KanbanBoard>Default KanbanBoard</KanbanBoard>
</Story>

<Story name="Variation 1">
  <KanbanBoard>Variation 1</KanbanBoard>
</Story>

<Story name="Variation 2">
  <KanbanBoard>Variation 2</KanbanBoard>
</Story>
