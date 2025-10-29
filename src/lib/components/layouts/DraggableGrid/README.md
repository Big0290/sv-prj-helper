# DraggableGrid

A drag-and-drop grid component for reorderable items in a responsive grid layout.

## Features

- Drag and drop to reorder items
- Configurable grid columns (1-12)
- Optional localStorage persistence
- Smooth animations and drag preview
- Touch support via svelte-dnd-action
- Keyboard accessible navigation (arrow keys)
- Responsive design (single column on mobile)
- Glassmorphism styling
- Custom slot for item content

## Basic Usage

```svelte
<script>
	import { DraggableGrid } from '@big0290/sv-prj-helper-ui';

	const items = [
		{ id: '1', data: { title: 'Item 1', color: 'blue' } },
		{ id: '2', data: { title: 'Item 2', color: 'red' } },
		{ id: '3', data: { title: 'Item 3', color: 'green' } }
	];

	function handleMove(event) {
		console.log('Item moved:', event.detail);
	}
</script>

<DraggableGrid {items} cols="3" on:move={handleMove}>
	{#snippet render({ item, index })}
		<div>
			<h3>{item.data.title}</h3>
			<p>Position: {index}</p>
		</div>
	{/snippet}
</DraggableGrid>
```

## Props

| Prop             | Type                                            | Default     | Description                           |
| ---------------- | ----------------------------------------------- | ----------- | ------------------------------------- |
| `items`          | `DraggableItem<T>[]`                            | Required    | Array of items with id and data       |
| `persistenceKey` | `string`                                        | `undefined` | localStorage key for persisting state |
| `cols`           | `'1' \| '2' \| '3' \| '4' \| '6' \| '12'`       | `'3'`       | Number of columns                     |
| `gap`            | `'0' \| '1' \| '2' \| '3' \| '4' \| '6' \| '8'` | `'4'`       | Gap between items                     |
| `minItemHeight`  | `string`                                        | `'200px'`   | Minimum height for grid items         |
| `disabled`       | `boolean`                                       | `false`     | Disable drag and drop                 |

## Events

| Event     | Detail                                | Description                    |
| --------- | ------------------------------------- | ------------------------------ |
| `move`    | `{ fromIndex, toIndex, item, items }` | Fired when an item is moved    |
| `reorder` | `{ items }`                           | Fired when items are reordered |

## Slot

The component accepts a single snippet slot for custom item content:

```svelte
{#snippet render({ item, index })}
	<!-- Custom item content -->
{/snippet}
```

**Slot properties:**

- `item`: The item object
- `index`: The item's position in the grid

## Types

```typescript
interface DraggableItem<T = unknown> {
  id: string
  data: T
}
```

## Persistence

Enable persistence by providing a `persistenceKey`. The component will save the grid state to localStorage and restore it on mount:

```svelte
<DraggableGrid {items} persistenceKey="my-grid-layout">
	<!-- ... -->
</DraggableGrid>
```

## Keyboard Navigation

Items can be reordered using keyboard navigation:

- `Arrow Up`: Move up by number of columns
- `Arrow Down`: Move down by number of columns
- `Arrow Left`: Move left one position
- `Arrow Right`: Move right one position
- `Home`: Move to first position
- `End`: Move to last position

## Accessibility

- Items are keyboard accessible with focus indicators
- ARIA labels for screen readers
- Drag handles have proper role and tabindex
- Touch support for mobile devices

## Styling

The component uses glassmorphism design with CSS custom properties from the theme. You can customize:

- Item hover effects
- Drag ghost element appearance
- Grid gap and column layout
- Colors and spacing

Use CSS variables to customize:

```css
.draggable-grid {
  --glass-bg: your-value;
  --glass-border: your-value;
}
```

## Responsive Behavior

On screens smaller than 768px:

- Multi-column layouts collapse to single column
- Touch gestures work seamlessly
- Items maintain their order
