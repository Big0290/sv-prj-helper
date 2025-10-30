<script lang="ts">
  import { dndzone } from 'svelte-dnd-action'
  import type { Snippet } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  interface KanbanCard {
    id: string
    title: string
    description?: string
    color?: string
    metadata?: Record<string, unknown>
  }

  interface KanbanColumn {
    id: string
    title: string
    cards: KanbanCard[]
  }

  interface Props {
    columns: KanbanColumn[]
    persistenceKey?: string
    gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8'
    cardPadding?: 'sm' | 'md' | 'lg'
    showAddColumn?: boolean
    allowAddCards?: boolean
    disabled?: boolean
    children?: Snippet
  }

  let {
    columns,
    persistenceKey,
    gap = '4',
    cardPadding = 'md',
    showAddColumn = false,
    allowAddCards = false,
    disabled = false,
    children,
  }: Props = $props()

  const dispatch = createEventDispatcher()

  // Track columns state
  let localColumns = $state<KanbanColumn[]>(columns)

  // Load persisted state if key provided
  $effect(() => {
    if (persistenceKey) {
      const saved = localStorage.getItem(persistenceKey)
      if (saved) {
        try {
          localColumns = JSON.parse(saved)
        } catch (e) {
          console.warn('Failed to parse persisted kanban state', e)
          localColumns = columns
        }
      } else {
        localColumns = columns
      }
    } else {
      localColumns = columns
    }
  })

  // Save to localStorage when columns change
  let saveTimeout: ReturnType<typeof setTimeout> | null = null
  $effect(() => {
    if (persistenceKey && localColumns) {
      if (saveTimeout) clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        localStorage.setItem(persistenceKey, JSON.stringify(localColumns))
      }, 300)
    }
  })

  // Update local columns when prop changes
  $effect(() => {
    if (!persistenceKey) {
      localColumns = columns
    }
  })

  function handleConsider(e: CustomEvent) {
    const { items } = e.detail
    const target = e.currentTarget as HTMLElement
    const columnId = target?.dataset?.columnId
    if (columnId) {
      localColumns = localColumns.map((col) => (col.id === columnId ? { ...col, cards: items } : col))
    }
  }

  function handleFinalize(e: CustomEvent) {
    const { items } = e.detail
    const target = e.currentTarget as HTMLElement
    const columnId = target?.dataset?.columnId

    if (!columnId) return

    // Just update the column with reordered items
    localColumns = localColumns.map((col) => (col.id === columnId ? { ...col, cards: items } : col))

    // Dispatch move event
    dispatch('move', {
      columns: localColumns,
    })
  }
</script>

<div class="kanban-board kanban-gap-{gap}" class:disabled>
  {#each localColumns as column (column.id)}
    <div class="kanban-column" data-column-id={column.id}>
      <div class="column-header">
        <h3 class="column-title">{column.title}</h3>
        <span class="card-count">{column.cards.length}</span>
      </div>

      <div
        use:dndzone={{
          items: column.cards,
          dragDisabled: disabled,
        }}
        onconsider={handleConsider}
        onfinalize={handleFinalize}
        class="column-cards"
        class:empty={column.cards.length === 0}
      >
        {#each column.cards as card (card.id)}
          <div
            class="kanban-card card-padding-{cardPadding}"
            data-card-id={card.id}
            draggable={!disabled}
            role="button"
            tabindex={disabled ? -1 : 0}
            aria-label={`Card: ${card.title}`}
          >
            <div class="card-content">
              <h4 class="card-title">{card.title}</h4>
              {#if card.description}
                <p class="card-description">{card.description}</p>
              {/if}
            </div>
          </div>
        {:else}
          <div class="empty-state">
            <p>No cards yet</p>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  {#if showAddColumn}
    <button class="add-column-btn" {disabled} aria-label="Add new column">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      Add Column
    </button>
  {/if}
</div>

<style>
  .kanban-board {
    display: flex;
    gap: var(--spacing-6);
    width: 100%;
    overflow-x: auto;
    padding-bottom: var(--spacing-4);
    align-items: flex-start;
  }

  .kanban-board.disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .kanban-gap-0 {
    gap: var(--spacing-0);
  }

  .kanban-gap-1 {
    gap: var(--spacing-1);
  }

  .kanban-gap-2 {
    gap: var(--spacing-2);
  }

  .kanban-gap-3 {
    gap: var(--spacing-3);
  }

  .kanban-gap-4 {
    gap: var(--spacing-4);
  }

  .kanban-gap-6 {
    gap: var(--spacing-6);
  }

  .kanban-gap-8 {
    gap: var(--spacing-8);
  }

  .kanban-column {
    min-width: 300px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--glass-shadow);
    transition: all var(--transition-base);
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-4);
    border-bottom: 1px solid var(--glass-border);
  }

  .column-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-neutral-900);
    margin: 0;
  }

  .card-count {
    font-size: var(--font-size-sm);
    color: var(--color-neutral-600);
    background: var(--glass-bg-subtle);
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-full);
  }

  .column-cards {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
    padding: var(--spacing-4);
    min-height: 100px;
    transition: background-color 0.2s;
  }

  .column-cards.empty {
    align-items: center;
    justify-content: center;
  }

  .empty-state {
    color: var(--color-neutral-500);
    font-size: var(--font-size-sm);
  }

  .kanban-card {
    background: var(--color-neutral-50);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--glass-shadow-sm);
    transition: all var(--transition-base);
    cursor: grab;
    user-select: none;
  }

  .kanban-card:hover {
    box-shadow: var(--glass-shadow);
    transform: translateY(-2px);
    background: var(--color-neutral-100);
  }

  .kanban-card:active {
    cursor: grabbing;
  }

  .kanban-card:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }

  .card-padding-sm {
    padding: var(--spacing-3);
  }

  .card-padding-md {
    padding: var(--spacing-4);
  }

  .card-padding-lg {
    padding: var(--spacing-6);
  }

  .card-content {
    width: 100%;
  }

  .card-title {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--spacing-2);
    color: var(--color-neutral-900);
  }

  .card-description {
    font-size: var(--font-size-sm);
    color: var(--color-neutral-600);
    margin: 0;
    line-height: 1.5;
  }

  .add-column-btn {
    min-width: 300px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    padding: var(--spacing-4);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 2px dashed var(--glass-border);
    border-radius: var(--radius-xl);
    color: var(--color-primary-600);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .add-column-btn:hover:not(:disabled) {
    background: var(--glass-bg-hover);
    border-color: var(--color-primary-400);
    color: var(--color-primary-700);
  }

  .add-column-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .add-column-btn:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }

  @media (max-width: 768px) {
    .kanban-board {
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .kanban-column,
    .add-column-btn {
      min-width: 100%;
      max-width: 100%;
    }
  }

  /* dndzone drag styles */
  :global(.svelte-dnd-item-ghost) {
    opacity: 0.5;
    transform: rotate(2deg);
  }

  :global(.svelte-dnd-item-drag) {
    box-shadow: var(--glass-shadow-lg);
    transform: rotate(2deg) scale(1.02);
  }

  :global(.svelte-dnd-dropzone-active) {
    background: var(--color-primary-alpha-5);
    border-color: var(--color-primary-400);
  }
</style>
