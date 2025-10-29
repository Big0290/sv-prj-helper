import type { Snippet } from 'svelte'

export interface KanbanCard {
  id: string
  title: string
  description?: string
  color?: string
  metadata?: Record<string, unknown>
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export interface KanbanBoardProps {
  columns: KanbanColumn[]
  persistenceKey?: string
  gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8'
  cardPadding?: 'sm' | 'md' | 'lg'
  showAddColumn?: boolean
  allowAddCards?: boolean
  disabled?: boolean
  children: Snippet
}

export interface KanbanBoardEvents {
  move: CustomEvent<{
    cardId: string
    fromColumnId: string
    toColumnId: string
    fromIndex: number
    toIndex: number
    columns: KanbanColumn[]
  }>
  cardadd: CustomEvent<{
    card: KanbanCard
    columnId: string
  }>
  cardremove: CustomEvent<{
    cardId: string
    columnId: string
  }>
}

export interface KanbanBoardSlots {
  default: {
    column: KanbanColumn
    card: KanbanCard
    index: number
  }
}
