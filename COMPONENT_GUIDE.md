# Component Development Guide

This guide documents the architectural decisions, patterns, and best practices for the SV Project Helper UI Library.

## Architecture Overview

### Component Organization

The library follows atomic design principles with a clear hierarchy:

```
src/lib/ui/
├── atoms/          # Basic building blocks (Button, Input, Text)
├── molecules/      # Simple compositions (Card, Alert, Menu)
├── organisms/      # Complex components (DataTable, Chat, Forms)
├── layouts/        # Layout components (Container, Grid, Stack)
├── utils/          # Utility components (Portal, FocusTrap, ScrollArea)
├── hooks/          # Svelte 5 hooks (useTheme, useToast, useDialog)
├── theme/          # Theme system (ThemeProvider)
└── index.ts        # Main exports
```

### Component Structure Pattern

All components follow this consistent structure:

```svelte
<script lang="ts">
  // Props interface - always define for TypeScript support
  interface Props {
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    children?: Snippet;
  }
  
  // Props destructuring with defaults using $props()
  let { variant = 'primary', disabled = false, children }: Props = $props();
  
  // Derived values using $derived
  const classes = $derived(`btn btn--${variant} ${disabled ? 'btn--disabled' : ''}`);
</script>

<!-- Template with snippets for content projection -->
{@render children?.()}

<style>
  .btn {
    /* Use CSS custom properties for theming */
    background: var(--sv-primary-500);
    color: var(--sv-text-on-primary);
    border-radius: var(--sv-radius-md);
  }
</style>
```

## Component Categories

### 🎯 Core Components (6)
Essential building blocks for any application:

- **Button** - Multiple variants (primary, secondary, ghost, danger), sizes, loading states
- **Input** - Text inputs with labels, validation, helper text
- **Card** - Glassmorphic containers with variants (default, elevated, outlined)
- **Modal** - Accessible dialogs with focus trapping and keyboard navigation
- **Alert** - Dismissible alerts (info, success, warning, error)
- **Badge** - Status indicators with multiple variants and sizes

### 📝 Form Components (8)
Complete form control collection:

- **Checkbox** - With indeterminate state support
- **Radio** - Radio button groups with proper binding
- **Switch** - Toggle switches with smooth animations
- **Select** - Styled select dropdowns with search
- **Textarea** - Multi-line text input with auto-resize
- **FileUpload** - Drag-and-drop file upload with preview
- **Slider** - Range sliders with customizable steps
- **TagInput** - Multi-tag input with autocomplete

### 📊 Data Display (4)
Components for presenting information:

- **DataTable** - Sortable, selectable tables with pagination
- **Avatar** - User avatars with status indicators and fallbacks
- **Accordion** - Collapsible content sections
- **Tooltip** - Contextual help with multiple placements

### 💬 Communication (3)
Interactive communication components:

- **Chat** - Full chat interface with typing indicators and avatars
- **Video** - Video player with custom controls
- **Audio** - Audio player with waveform-style progress

### 🔍 Interactive (2)
Specialized interactive components:

- **BarcodeScanner** - Camera-based barcode/QR scanner with manual input
- **SearchField** - Search with autocomplete and suggestions

## Design System

### Glassmorphism Theme

The library uses a purple-based glassmorphism design with these key characteristics:

```css
:root {
  /* Primary Colors */
  --sv-primary-50: #faf5ff;
  --sv-primary-500: #a855f7;
  --sv-primary-900: #581c87;
  
  /* Glassmorphism Effects */
  --sv-glass-bg: rgba(255, 255, 255, 0.1);
  --sv-glass-border: rgba(255, 255, 255, 0.2);
  --sv-backdrop-blur: blur(12px);
  
  /* Spacing System */
  --sv-spacing-xs: 0.25rem;
  --sv-spacing-sm: 0.5rem;
  --sv-spacing-md: 1rem;
  --sv-spacing-lg: 1.5rem;
  --sv-spacing-xl: 2rem;
}
```

### Dark Mode Implementation

Automatic dark mode detection using CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --sv-bg-primary: #0f0f23;
    --sv-text-primary: #e2e8f0;
    --sv-glass-bg: rgba(0, 0, 0, 0.2);
    --sv-glass-border: rgba(255, 255, 255, 0.1);
  }
}
```

## Accessibility Standards

### WCAG 2.1 AA Compliance

All components implement comprehensive accessibility features:

#### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Shift + Tab**: Navigate backwards
- **Enter/Space**: Activate buttons and controls
- **Escape**: Close modals and dropdowns
- **Arrow Keys**: Navigate within components (tabs, selects, etc.)

#### Focus Management
- Visible focus indicators with high contrast
- Focus trapping in modals and overlays
- Logical tab order following visual layout
- Return focus to trigger elements when closing overlays

#### Screen Reader Support
- Proper ARIA roles and labels
- Live regions for dynamic content
- Semantic HTML elements
- Label associations for form controls

#### Component-Specific Accessibility

**Modal**:
```svelte
<div 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
```

**DataTable**:
```svelte
<table role="table" aria-label="Data table">
  <thead>
    <tr role="row">
      <th role="columnheader" aria-sort="ascending">Name</th>
    </tr>
  </thead>
</table>
```

**Button**:
```svelte
<button 
  type="button"
  aria-label={ariaLabel}
  aria-disabled={disabled}
  aria-pressed={pressed}
>
```

## Development Patterns

### Svelte 5 Runes Usage

The library exclusively uses Svelte 5 runes for reactivity:

```svelte
<script lang="ts">
  // State management
  let count = $state(0);
  let items = $state([]);
  
  // Derived values
  const doubled = $derived(count * 2);
  const isEmpty = $derived(items.length === 0);
  
  // Props with bindable values
  let { value = $bindable(''), disabled = false }: Props = $props();
  
  // Effects
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>
```

### TypeScript Integration

Every component exports its Props interface for consumer use:

```typescript
// Component definition
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onclick?: () => void;
}

// Export for consumers
export type { ButtonProps };
```

### CSS Custom Properties

All styling uses CSS custom properties for complete theme customization:

```css
.component {
  /* Colors */
  background: var(--sv-component-bg, var(--sv-bg-primary));
  color: var(--sv-component-text, var(--sv-text-primary));
  border: 1px solid var(--sv-component-border, var(--sv-border-primary));
  
  /* Spacing */
  padding: var(--sv-component-padding, var(--sv-spacing-md));
  margin: var(--sv-component-margin, 0);
  
  /* Effects */
  backdrop-filter: var(--sv-backdrop-blur);
  border-radius: var(--sv-radius-md);
  box-shadow: var(--sv-shadow-md);
}
```

## Component Documentation System

### Auto-Discovery Architecture

The documentation system automatically discovers and documents components:

```
Component Scanner (scanner.ts)
    ↓ Recursively scans src/lib/ui
Component Parser (parser.ts)
    ↓ Extracts props, slots, events
Example Generator (generator.ts)
    ↓ Creates usage examples
API Endpoints (+server.ts)
    ↓ Serves component data
Documentation Pages (+page.svelte)
    ↓ Renders with StaticCodeExample
```

### Static Code Examples

Documentation uses static code examples for reliability and performance:

```svelte
<StaticCodeExample
  title="Basic Usage"
  description="Simple button with primary variant"
  language="svelte"
  code={`<script>
  import { Button } from '@big0290/sv-prj-helper-ui';
</script>

<Button variant="primary">Click me</Button>`}
/>
```

## Testing Guidelines

### Accessibility Testing

1. **Keyboard Navigation**: Test all interactions with keyboard only
2. **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)
3. **Focus Management**: Verify focus indicators and trapping
4. **Color Contrast**: Ensure 4.5:1 minimum contrast ratio
5. **Reduced Motion**: Test with `prefers-reduced-motion` enabled

### Component Testing

```typescript
// Example component test structure
describe('Button Component', () => {
  test('renders with correct variant class', () => {
    // Test implementation
  });
  
  test('handles click events', () => {
    // Test implementation
  });
  
  test('supports keyboard navigation', () => {
    // Test implementation
  });
  
  test('maintains accessibility attributes', () => {
    // Test implementation
  });
});
```

## Publishing and Distribution

### Package Configuration

The library is configured for GitHub Packages distribution:

```json
{
  "name": "@big0290/sv-prj-helper-ui",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js",
      "import": "./dist/index.js"
    },
    "./styles": "./dist/styles/theme.css"
  },
  "peerDependencies": {
    "svelte": "^5.0.0"
  }
}
```

### Build Process

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build library for distribution
npm run package      # Package for npm publishing

# Quality Assurance
npm run check        # TypeScript validation
npm run lint         # Code linting
```

## Best Practices

### Component Creation Checklist

When creating new components:

- [ ] Define TypeScript Props interface
- [ ] Use Svelte 5 runes ($state, $derived, $props)
- [ ] Implement proper ARIA labels and roles
- [ ] Add keyboard navigation support
- [ ] Use CSS custom properties for theming
- [ ] Include focus management
- [ ] Test with screen readers
- [ ] Export component types
- [ ] Add comprehensive examples
- [ ] Follow atomic design principles

### Code Quality Standards

- **TypeScript Strict Mode**: All components must be fully typed
- **Accessibility First**: WCAG 2.1 AA compliance required
- **Mobile First**: Responsive design approach
- **Performance**: Optimize for bundle size and runtime performance
- **Consistency**: Follow established patterns and conventions

## Future Enhancements

### Planned Features

1. **Enhanced Documentation**: Interactive component playground
2. **Additional Components**: More specialized components based on user needs
3. **Theme System**: Extended theming capabilities and preset themes
4. **Animation Library**: Consistent animation patterns across components
5. **Testing Suite**: Comprehensive automated testing
6. **Storybook Integration**: Component development and testing environment

### Migration Path

For future Svelte versions:
- Monitor Svelte 5 stable release
- Update runes usage as API stabilizes
- Maintain backward compatibility where possible
- Provide migration guides for breaking changes

---

This guide serves as the definitive reference for understanding and contributing to the SV Project Helper UI Library architecture and design decisions.