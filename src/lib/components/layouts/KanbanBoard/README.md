# KanbanBoard

A drag-and-drop Kanban board component with columns and cards for managing workflows and tasks.

## Features

- Drag and drop cards between columns
- Reorder cards within columns
- Optional localStorage persistence
- Smooth animations and drag preview
- Touch support via svelte-dnd-action
- Keyboard accessible navigation
- Responsive design (columns stack on mobile)
- Glassmorphism styling
- Custom slot for card content

## Basic Usage

```svelte
<script>
	import { KanbanBoard } from '@big0290/sv-prj-helper-ui';

	const columns = [
		{
			id: 'todo',
			title: 'To Do',
			cards: [
				{ id: '1', title: 'Task 1', description: 'Description here' },
				{ id: '2', title: 'Task 2' }
			]
		},
		{
			id: 'in-progress',
			title: 'In Progress',
			cards: [{ id: '3', title: 'Task 3' }]
		},
		{
			id: 'done',
			title: 'Done',
			cards: []
		}
	];

	function handleMove(event) {
		console.log('Card moved:', event.detail);
	}
</script>

<KanbanBoard {columns} on:move={handleMove}>
	{#snippet render({ card })}
		<div>
			<h4>{card.title}</h4>
			{#if card.description}
				<p>{card.description}</p>
			{/if}
		</div>
	{/snippet}
</KanbanBoard>
```

## Props

| Prop             | Type                                            | Default     | Description                                |
| ---------------- | ----------------------------------------------- | ----------- | ------------------------------------------ |
| `columns`        | `KanbanColumn[]`                                | Required    | Array of columns with id, title, and cards |
| `persistenceKey` | `string`                                        | `undefined` | localStorage key for persisting state      |
| `gap`            | `'0' \| '1' \| '2' \| '3' \| '4' \| '6' \| '8'` | `'4'`       | Gap between columns                        |
| `cardPadding`    | `'sm' \| 'md' \| 'lg'`                          | `'md'`      | Padding inside cards                       |
| `showAddColumn`  | `boolean`                                       | `false`     | Show "Add Column" button                   |
| `allowAddCards`  | `boolean`                                       | `false`     | Allow adding new cards (future feature)    |
| `disabled`       | `boolean`                                       | `false`     | Disable drag and drop                      |

## Events

| Event  | Detail                                                              | Description                |
| ------ | ------------------------------------------------------------------- | -------------------------- |
| `move` | `{ cardId, fromColumnId, toColumnId, fromIndex, toIndex, columns }` | Fired when a card is moved |

## Slot

The component accepts a single snippet slot for custom card content:

```svelte
{#snippet render({ column, card, index })}
	<!-- Custom card content -->
{/snippet}
```

**Slot properties:**

- `column`: The column object the card belongs to
- `card`: The card object
- `index`: The card's index in the column

## Types

```typescript
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
```

## Persistence

Enable persistence by providing a `persistenceKey`. The component will save the board state to localStorage and restore it on mount:

```svelte
<KanbanBoard {columns} persistenceKey="my-kanban-board">
	<!-- ... -->
</KanbanBoard>
```

## Accessibility

- Cards are keyboard accessible with focus indicators
- ARIA labels for screen readers
- Drag handles have proper role and tabindex
- Touch support for mobile devices

## Styling

The component uses glassmorphism design with CSS custom properties from the theme. You can customize:

- Card hover effects
- Column drop zone highlights
- Drag ghost element appearance
- Colors and spacing

Use CSS variables to customize:

```css
.kanban-board {
  --glass-bg: your-value;
  --glass-border: your-value;
}
```
