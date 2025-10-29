<script lang="ts">
  import { KanbanBoard } from '../ui/index.js'
  import { Button } from '../ui/index.js'

  let columns = $state([
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        { id: '1', title: 'Design landing page', description: 'Create mockups for the new landing page' },
        { id: '2', title: 'Setup CI/CD pipeline', description: 'Configure deployment workflow' },
        { id: '3', title: 'Review PR #42', description: 'Check code quality and tests' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        { id: '4', title: 'Implement authentication', description: 'Add OAuth support' },
        { id: '5', title: 'Database migration', description: 'Migrate to new schema' },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      cards: [{ id: '6', title: 'Update documentation', description: 'Add API examples' }],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [{ id: '7', title: 'Setup project structure', description: 'Initial project scaffolding' }],
    },
  ])

  function handleMove(event: CustomEvent) {
    console.log('Card moved:', event.detail)
  }

  function handleAddCard(columnId: string) {
    const column = columns.find((col) => col.id === columnId)
    if (column) {
      const newCard = {
        id: `${Date.now()}`,
        title: `New Task ${column.cards.length + 1}`,
        description: 'Click to edit',
      }
      column.cards.push(newCard)
      columns = [...columns]
    }
  }

  function removeCard(columnId: string, cardId: string) {
    const column = columns.find((col) => col.id === columnId)
    if (column) {
      column.cards = column.cards.filter((card) => card.id !== cardId)
      columns = [...columns]
    }
  }
</script>

<div class="example-container">
  <h2>Kanban Board Example</h2>
  <p class="description">Drag cards between columns to reorganize your workflow</p>

  <KanbanBoard {columns} persistenceKey="demo-kanban" on:move={handleMove} gap="4" cardPadding="md" />

  <div class="add-card-buttons">
    <Button onclick={() => handleAddCard('todo')}>Add to To Do</Button>
    <Button onclick={() => handleAddCard('in-progress')}>Add to In Progress</Button>
  </div>
</div>

<style>
  .example-container {
    padding: var(--spacing-6);
  }

  .description {
    color: var(--color-neutral-600);
    margin-bottom: var(--spacing-6);
  }

  .add-card-buttons {
    margin-top: var(--spacing-6);
    display: flex;
    gap: var(--spacing-3);
  }
</style>
