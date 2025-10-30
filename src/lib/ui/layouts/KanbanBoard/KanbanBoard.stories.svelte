<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import KanbanBoard from './KanbanBoard.svelte';

  const { Story } = defineMeta({
    title: 'Layouts/KanbanBoard',
    component: KanbanBoard,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'A Kanban board component for managing tasks across multiple columns with drag and drop support.'
        }
      }
    }
  });

  const defaultColumns = [
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        { id: '1', title: 'Task 1', description: 'First task' },
        { id: '2', title: 'Task 2', description: 'Second task' }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        { id: '3', title: 'Task 3', description: 'Third task' }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        { id: '4', title: 'Task 4', description: 'Fourth task' }
      ]
    }
  ];
</script>

<Story name="Default" args={{ columns: defaultColumns }} />

<Story name="With Add Column" args={{ columns: defaultColumns, showAddColumn: true }} />

<Story name="With Add Cards" args={{ columns: defaultColumns, allowAddCards: true }} />
