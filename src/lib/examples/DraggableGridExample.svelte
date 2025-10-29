<script lang="ts">
  import { DraggableGrid } from '../ui/index.js'
  import { Button } from '../ui/index.js'
  import { Badge } from '../ui/index.js'

  interface ItemData {
    title: string
    color: string
    category: string
  }

  let items = $state<Array<{ id: string; data: ItemData }>>([
    { id: '1', data: { title: 'Item 1', color: '#3b82f6', category: 'Design' } },
    { id: '2', data: { title: 'Item 2', color: '#10b981', category: 'Development' } },
    { id: '3', data: { title: 'Item 3', color: '#f59e0b', category: 'Testing' } },
    { id: '4', data: { title: 'Item 4', color: '#ef4444', category: 'Design' } },
    { id: '5', data: { title: 'Item 5', color: '#8b5cf6', category: 'Development' } },
    { id: '6', data: { title: 'Item 6', color: '#ec4899', category: 'Testing' } },
  ])

  let cols = $state<'1' | '2' | '3' | '4'>('3')

  function handleMove(event: CustomEvent) {
    console.log('Item moved:', event.detail)
  }

  function handleReorder(event: CustomEvent) {
    console.log('Items reordered:', event.detail.items)
  }

  function addItem() {
    const newId = `${Date.now()}`
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
    const categories = ['Design', 'Development', 'Testing']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]

    items.push({
      id: newId,
      data: {
        title: `Item ${items.length + 1}`,
        color: randomColor,
        category: randomCategory,
      },
    })
    items = [...items]
  }

  function clearItems() {
    items = []
  }
</script>

<div class="example-container">
  <h2>Draggable Grid Example</h2>
  <p class="description">Drag items to reorder them in the grid. Persist with localStorage.</p>

  <div class="controls">
    <label>
      Columns:
      <select bind:value={cols}>
        <option value="1">1 Column</option>
        <option value="2">2 Columns</option>
        <option value="3">3 Columns</option>
        <option value="4">4 Columns</option>
      </select>
    </label>

    <Button onclick={addItem}>Add Item</Button>
    <Button onclick={clearItems} variant="ghost">Clear All</Button>
  </div>

  <DraggableGrid
    {items}
    {cols}
    persistenceKey="demo-grid"
    on:move={handleMove}
    on:reorder={handleReorder}
    gap="4"
    minItemHeight="150px"
  />

  <p class="keyboard-hint">💡 Tip: Use arrow keys to navigate and move items</p>
</div>

<style>
  .example-container {
    padding: var(--spacing-6);
  }

  .description {
    color: var(--color-neutral-600);
    margin-bottom: var(--spacing-6);
  }

  .controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-6);
    padding: var(--spacing-4);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
  }

  label {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-size: var(--font-size-sm);
  }

  select {
    padding: var(--spacing-2) var(--spacing-3);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    background: var(--color-neutral-50);
    font-size: var(--font-size-sm);
  }

  .keyboard-hint {
    margin-top: var(--spacing-6);
    text-align: center;
    font-size: var(--font-size-sm);
    color: var(--color-neutral-600);
  }
</style>
