<script lang="ts">
  import { dndzone } from 'svelte-dnd-action'
  import type { Snippet } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  interface DraggableItem<T = unknown> {
    id: string
    data: T
  }

  interface Props<T = unknown> {
    items: DraggableItem<T>[]
    persistenceKey?: string
    cols?: '1' | '2' | '3' | '4' | '6' | '12'
    gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8'
    minItemHeight?: string
    disabled?: boolean
    children?: Snippet
  }

  let {
    items,
    persistenceKey,
    cols = '3',
    gap = '4',
    minItemHeight = '200px',
    disabled = false,
    children,
  }: Props = $props()

  const dispatch = createEventDispatcher()

  // Track items state
  let localItems = $state<DraggableItem[]>(items)

  // Load persisted state if key provided
  $effect(() => {
    if (persistenceKey) {
      const saved = localStorage.getItem(persistenceKey)
      if (saved) {
        try {
          localItems = JSON.parse(saved)
        } catch (e) {
          console.warn('Failed to parse persisted grid state', e)
          localItems = items
        }
      } else {
        localItems = items
      }
    } else {
      localItems = items
    }
  })

  // Save to localStorage when items change
  let saveTimeout: ReturnType<typeof setTimeout> | null = null
  $effect(() => {
    if (persistenceKey && localItems) {
      if (saveTimeout) clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        localStorage.setItem(persistenceKey, JSON.stringify(localItems))
      }, 300)
    }
  })

  // Update local items when prop changes
  $effect(() => {
    if (!persistenceKey) {
      localItems = items
    }
  })

  function handleConsider(e: CustomEvent) {
    const { items: newItems } = e.detail
    localItems = newItems
  }

  function handleFinalize(e: CustomEvent) {
    const { items: finalItems } = e.detail
    localItems = finalItems
    dispatch('reorder', {
      items: finalItems,
    })
  }

  // Keyboard navigation
  function handleKeyDown(e: KeyboardEvent, index: number) {
    if (disabled) return

    let newIndex = index

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        newIndex = Math.max(0, index - (cols === '1' ? 1 : parseInt(cols)))
        break
      case 'ArrowDown':
        e.preventDefault()
        newIndex = Math.min(localItems.length - 1, index + (cols === '1' ? 1 : parseInt(cols)))
        break
      case 'ArrowLeft':
        e.preventDefault()
        newIndex = Math.max(0, index - 1)
        break
      case 'ArrowRight':
        e.preventDefault()
        newIndex = Math.min(localItems.length - 1, index + 1)
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = localItems.length - 1
        break
      default:
        return
    }

    if (newIndex !== index) {
      const newItems = [...localItems]
      const [movedItem] = newItems.splice(index, 1)
      newItems.splice(newIndex, 0, movedItem)
      localItems = newItems

      dispatch('reorder', {
        items: localItems,
      })
    }
  }
</script>

<div class="draggable-grid grid-cols-{cols} grid-gap-{gap}" class:disabled>
  <div
    use:dndzone={{
      items: localItems,
      dragDisabled: disabled,
    }}
    onconsider={handleConsider}
    onfinalize={handleFinalize}
    class="grid-container"
  >
    {#each localItems as item (item.id)}
      <div
        class="grid-item"
        data-item-id={item.id}
        draggable={!disabled}
        role="button"
        tabindex={disabled ? -1 : 0}
        aria-label={`Item ${item.id}`}
        onkeydown={(e) => handleKeyDown(e, localItems.indexOf(item))}
        style="min-height: {minItemHeight};"
      >
        {#if children}{@render children()}{/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .draggable-grid {
    display: grid;
    width: 100%;
  }

  .draggable-grid.disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  .grid-gap-0 {
    gap: var(--spacing-0);
  }

  .grid-gap-1 {
    gap: var(--spacing-1);
  }

  .grid-gap-2 {
    gap: var(--spacing-2);
  }

  .grid-gap-3 {
    gap: var(--spacing-3);
  }

  .grid-gap-4 {
    gap: var(--spacing-4);
  }

  .grid-gap-6 {
    gap: var(--spacing-6);
  }

  .grid-gap-8 {
    gap: var(--spacing-8);
  }

  .grid-container {
    display: contents;
  }

  .grid-item {
    background: var(--color-neutral-50);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--glass-shadow-sm);
    transition: all var(--transition-base);
    cursor: grab;
    user-select: none;
    overflow: hidden;
  }

  .grid-item:hover {
    box-shadow: var(--glass-shadow);
    transform: translateY(-2px);
    background: var(--color-neutral-100);
  }

  .grid-item:active {
    cursor: grabbing;
  }

  .grid-item:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }

  @media (max-width: 768px) {
    .grid-cols-2,
    .grid-cols-3,
    .grid-cols-4,
    .grid-cols-6,
    .grid-cols-12 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
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
  }
</style>
