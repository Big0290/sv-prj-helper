<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DraggableGrid from './DraggableGrid.svelte';

  const { Story } = defineMeta({
    title: 'Layouts/DraggableGrid',
    component: DraggableGrid,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'A draggable grid component for managing reorderable items with keyboard support.'
        }
      }
    }
  });

  const defaultItems = [
    { id: '1', data: { title: 'Item 1', description: 'First item' } },
    { id: '2', data: { title: 'Item 2', description: 'Second item' } },
    { id: '3', data: { title: 'Item 3', description: 'Third item' } },
  ];

  const manyItems = [
    { id: '1', data: { title: 'Task 1' } },
    { id: '2', data: { title: 'Task 2' } },
    { id: '3', data: { title: 'Task 3' } },
    { id: '4', data: { title: 'Task 4' } },
    { id: '5', data: { title: 'Task 5' } },
    { id: '6', data: { title: 'Task 6' } },
  ];
</script>

<Story name="Default" args={{ items: defaultItems }} />

<Story name="Two Columns" args={{ items: defaultItems, cols: '2' }} />

<Story name="Four Columns" args={{ items: manyItems, cols: '4' }} />
