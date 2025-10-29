import type { Snippet } from 'svelte'

export interface DraggableItem<T = unknown> {
  id: string
  data: T
}

export interface DraggableGridProps<T = unknown> {
  items: DraggableItem<T>[]
  persistenceKey?: string
  cols?: '1' | '2' | '3' | '4' | '6' | '12'
  gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8'
  minItemHeight?: string
  disabled?: boolean
  children: Snippet<{ item: DraggableItem<T>; index: number }>
}

export interface DraggableGridEvents<T = unknown> {
  move: CustomEvent<{
    fromIndex: number
    toIndex: number
    item: DraggableItem<T>
    items: DraggableItem<T>[]
  }>
  reorder: CustomEvent<{
    items: DraggableItem<T>[]
  }>
}

export interface DraggableGridSlots<T = unknown> {
  default: {
    item: DraggableItem<T>
    index: number
  }
}
