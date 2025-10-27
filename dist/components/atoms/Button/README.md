# Button

A versatile button component with glassmorphism styling, multiple variants, and comprehensive accessibility support.

**Category:** atoms | **Import:** `@sv-project-helper/ui`

## Overview

A versatile button component with glassmorphism styling, multiple variants, and comprehensive accessibility support.

This component is part of the SV Project Helper UI library and follows accessibility-first design principles with glassmorphism styling.

## Installation

```bash
npm install @sv-project-helper/ui
```

## Basic Usage

```svelte
<script>
  import { Button } from '@sv-project-helper/ui';
</script>

<Button>Click me</Button>
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' | 'secondary' | 'ghost' | 'danger'` | `primary` |  | Visual style variant of the button |
| `size` | `'sm' | 'md' | 'lg'` | `md` |  | Size of the button affecting padding and font size |
| `disabled` | `boolean` | `false` |  | Whether the button is disabled and non-interactive |
| `loading` | `boolean` | `false` |  | Shows loading spinner and disables interaction |
| `type` | `'button' | 'submit' | 'reset'` | `button` |  | HTML button type attribute |
| `ariaLabel` | `string` | - |  | Accessible label for screen readers |
| `onclick` | `(e: MouseEvent) => void` | - |  | Click event handler function |
| `children` | `Snippet` | - | ✓ | Button content (text, icons, etc.) |

## Events

| Event | Type | Detail | Description |
|-------|------|--------|-------------|
| `click` | `MouseEvent` | - | Fired when the button is clicked (if not disabled or loading) |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | - | Main button content |

## Accessibility

### Keyboard Navigation
- Tab - Focus the button
- Enter/Space - Activate the button
- Escape - Remove focus (when focused)

### ARIA Attributes
- aria-label - Custom accessible label
- aria-busy - Indicates loading state
- aria-hidden - Hides decorative spinner from screen readers

### Screen Reader Support
Full screen reader support with proper role and state announcements

### Focus Management
Visible focus ring with proper contrast and keyboard navigation

### Guidelines
- Always provide meaningful button text or aria-label
- Use loading state for async operations
- Disable buttons when actions are not available
- Ensure sufficient color contrast for all variants

## Examples

### Basic Usage
Simple button with default primary styling

```svelte
<Button>Click me</Button>
```

### Button Variants
Different visual styles for various use cases

```svelte
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Button Sizes
Different sizes for various contexts

```svelte
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Loading State
Button with loading spinner

```svelte
<Button loading={true}>
  Processing...
</Button>
```

### With Click Handler
Button with custom click handling

```svelte
<script>
  function handleClick() {
    console.log('Button clicked!');
  }
</script>

<Button onclick={handleClick}>
  Click Handler
</Button>
```

### Accessibility Example
Button with proper accessibility attributes

```svelte
<Button 
  ariaLabel="Save document"
  disabled={!canSave}
>
  Save
</Button>
```

---

**Version:** 1.0.0 | **Last Updated:** 2025-10-27

Part of [SV Project Helper UI Library](../../README.md)