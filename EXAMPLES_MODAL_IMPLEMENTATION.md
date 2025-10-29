# Examples Modal Implementation

## Overview

Implemented a live demo modal system that displays example components when users click "View Live Demo" buttons on the examples page.

## Implementation Details

### 1. Created Example Components (`src/lib/examples/`)

Created reusable example components that demonstrate real-world usage of the component library:

- **LoginFormExample.svelte**: Login form with email/password inputs, loading states, and form submission
- **CardWithBadgeExample.svelte**: Card component with badge, statistics, and flexible layout
- **BreadcrumbExample.svelte**: Navigation breadcrumb with hierarchical items
- **AlertExample.svelte**: Alert messages with different variants (success, error, info)

### 2. Updated Examples Page (`src/routes/examples/+page.svelte`)

Enhanced the examples page with:

- **Modal Integration**: Imported `Modal` component and example components
- **State Management**:
  - `selectedExample` - tracks which example to show
  - `showModal` - controls modal visibility
  - `exampleComponents` - maps example names to component classes
  - `Component` - derived reactive state for selected component
- **Open/Close Functions**:

  - `openExample(name)` - Opens modal with selected example
  - `closeModal()` - Closes modal and resets state

- **"View Live Demo" Buttons**: Added to each quick example card that triggers the modal

- **Modal Component**: Displays the live example component dynamically

### 3. Technical Details

#### Dynamic Component Rendering (Svelte 5 Runes)

Instead of deprecated `<svelte:component>`:

```svelte
$: Component = selectedExample ? exampleComponents[selectedExample.name] : null

{#if Component}
  {@const ExampleComponent = Component}
  <ExampleComponent />
{/if}
```

#### Example Mapping

```typescript
const exampleComponents = {
  'Login Form': Examples.LoginFormExample,
  'Card with Badge': Examples.CardWithBadgeExample,
  'Navigation Breadcrumb': Examples.BreadcrumbExample,
  'Alert Messages': Examples.AlertExample,
}
```

## User Experience Flow

1. User visits `/examples` page
2. Sees quick examples with code snippets
3. Clicks "View Live Demo →" button
4. Modal opens displaying the live component
5. Can interact with the component in real-time
6. Closes modal and can view another example

## Benefits

- **Live Interaction**: Users can interact with components before copying code
- **Real-World Examples**: Shows practical implementation patterns
- **Copy-Paste Ready**: Code is right there, ready to use
- **Better Learning**: Visual + code together improves understanding
- **Component Discovery**: Links to individual component docs from badges

## Future Enhancements

- Add more example components for all library components
- Add "Edit in CodePen" functionality
- Implement example search/filter
- Add example categories (forms, navigation, feedback, etc.)
- Create "Examples Gallery" with thumbnails
