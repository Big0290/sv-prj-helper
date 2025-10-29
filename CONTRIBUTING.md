# Contributing to SV Project Helper UI Library

Thank you for your interest in contributing to the SV Project Helper UI Library! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Svelte** 5.0+
- **TypeScript** 5.0+ (recommended)
- Basic knowledge of Svelte 5 runes and TypeScript

### Development Setup

1. **Fork and Clone the Repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/sv-prj-helper.git
   cd sv-prj-helper
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   This will start a local development server for testing components.

4. **Run Type Checking**

   ```bash
   npm run check
   ```

## Development Workflow

### Making Changes

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Use descriptive branch names:

   - `feature/add-new-component`
   - `fix/resolve-accessibility-issue`
   - `docs/update-contributing-guide`

2. **Make Your Changes**

   Follow the coding standards and component guidelines below.

3. **Test Your Changes**

   ```bash
   npm run check        # TypeScript validation
   npm run build        # Build library
   ```

4. **Commit Your Changes**

   Use [conventional commits](https://www.conventionalcommits.org/):

   ```bash
   git commit -m "feat: add new Button variant"
   git commit -m "fix: resolve modal focus trap issue"
   git commit -m "docs: update component examples"
   ```

   **Commit Types:**

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, missing semicolons, etc.)
   - `refactor`: Code refactoring
   - `perf`: Performance improvements
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks

5. **Push and Create Pull Request**

   ```bash
   git push origin feature/your-feature-name
   ```

## Coding Standards

### TypeScript

- **Strict Mode**: All code must pass TypeScript strict mode validation
- **Type Definitions**: Define interfaces for all props, events, and return types
- **Export Types**: Export component types for consumer use

```typescript
// Good: Properly typed interface
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// Export type for consumers
export type { ButtonProps }
```

### Svelte 5 Patterns

- **Use Runes**: Always use Svelte 5 runes (`$state`, `$derived`, `$props`)
- **Snippets**: Use snippets for content projection instead of slots
- **Props Destructuring**: Use `$props()` with defaults

```svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    children?: Snippet;
  }

  let { variant = 'primary', disabled = false, children }: Props = $props();

  // Use $derived for computed values
  const classes = $derived(`btn btn--${variant} ${disabled ? 'btn--disabled' : ''}`);
</script>

<!-- Use snippets for content projection -->
{@render children?.()}
```

### Component Structure

Follow this structure for all components:

```svelte
<script lang="ts">
  // 1. Imports
  import type { ComponentEvents } from 'svelte';

  // 2. Type definitions
  interface Props {
    // ... props
  }

  export type { Props };

  // 3. Props with defaults
  let { ... }: Props = $props();

  // 4. Reactive state and derived values
  // 5. Functions and event handlers
</script>

<!-- Markup -->
<element {classes} {aria-label}>
  <!-- Content -->
</element>

<style>
  /* Use CSS custom properties for theming */
  .element {
    background: var(--sv-primary-500);
  }
</style>
```

## Component Creation Guidelines

### Before Creating a Component

1. **Check if it exists**: Search existing components first
2. **Choose the right category**:

   - **Atoms**: Basic building blocks (Button, Input, Badge)
   - **Molecules**: Simple compositions (Card, Alert, Menu)
   - **Organisms**: Complex components (DataTable, Forms, Chat)
   - **Layouts**: Page-level layouts (Container, Grid, Stack)
   - **Utils**: Utility components (Portal, FocusTrap)

3. **Follow Atomic Design Principles**: Build from smallest to largest

### Component Checklist

When creating a new component:

- [ ] Define TypeScript Props interface
- [ ] Use Svelte 5 runes (`$state`, `$derived`, `$props`)
- [ ] Implement proper ARIA labels and roles
- [ ] Add keyboard navigation support
- [ ] Use CSS custom properties for theming
- [ ] Include focus management
- [ ] Test with screen readers
- [ ] Export component types
- [ ] Add to `src/lib/ui/index.ts`
- [ ] Add to `src/lib/index.ts`
- [ ] Create basic examples
- [ ] Test build process
- [ ] Verify TypeScript declarations generate correctly

### Accessibility Requirements

All components must meet WCAG 2.1 AA standards:

1. **Keyboard Navigation**

   - All interactive elements must be keyboard accessible
   - Logical tab order
   - Escape key closes dialogs/modals

2. **ARIA Labels**

   ```svelte
   <button aria-label="Close dialog">
     <Icon name="close" aria-hidden="true" />
   </button>
   ```

3. **Focus Management**

   - Visible focus indicators
   - Focus trapping in modals/dialogs
   - Focus restoration after closing modals

4. **Screen Reader Support**

   - Proper roles and attributes
   - Live regions for dynamic content
   - Descriptive labels

5. **Color Contrast**
   - Minimum 4.5:1 for text
   - Minimum 3:1 for UI components

### Theming

Use CSS custom properties for all styling:

```css
/* Define theme variables */
:root {
  --sv-primary-500: #a855f7;
  --sv-spacing-md: 1rem;
  --sv-border-radius: 0.5rem;
}

/* Use variables in components */
.button {
  background: var(--sv-primary-500);
  padding: var(--sv-spacing-md);
  border-radius: var(--sv-border-radius);
}

/* Support dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --sv-primary-500: #c084fc;
  }
}
```

## File Organization

### Directory Structure

```
src/lib/
├── ui/                    # All UI components
│   ├── atoms/            # Basic building blocks
│   ├── molecules/        # Simple compositions
│   ├── organisms/        # Complex components
│   │   ├── barcode/     # Barcode-related components
│   │   ├── chat/        # Chat-related components
│   │   └── ...          # Other categories
│   ├── layouts/         # Layout components
│   ├── utils/           # Utility components
│   ├── theme/           # Theme components
│   └── index.ts         # Component exports
├── hooks/                # Additional hooks
├── types/                # Shared type definitions
├── styles/               # Global styles
└── index.ts             # Main library exports
```

### Naming Conventions

- **Files**: PascalCase for components (`Button.svelte`)
- **Functions**: camelCase (`handleClick`)
- **Types**: PascalCase (`ButtonProps`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_SIZE`)
- **CSS Classes**: kebab-case (`btn-primary`)

## Testing

### Manual Testing Checklist

- [ ] Component renders correctly
- [ ] All props work as expected
- [ ] Events fire correctly
- [ ] Keyboard navigation works
- [ ] Focus management is correct
- [ ] Screen reader announces correctly
- [ ] Responsive on mobile devices
- [ ] Works in dark mode
- [ ] No console errors or warnings

### Building

Test that your component builds correctly:

```bash
npm run build
```

Verify:

- No TypeScript errors
- Component exports correctly
- Type definitions generate
- CSS includes properly

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] TypeScript checks pass (`npm run check`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] Accessibility requirements met
- [ ] Documentation updated (if applicable)

### Pull Request Template

Use the provided PR template and fill out all relevant sections:

- Description of changes
- Type of change
- Testing performed
- Documentation updates
- Accessibility verification
- Screenshots (if applicable)

## Code Review Process

1. **Automatic Checks**: CI will run TypeScript checks and build verification
2. **Manual Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

## Resources

- [Svelte 5 Documentation](https://svelte.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Component Guide](./COMPONENT_GUIDE.md)
- [Keyboard Navigation Guide](./KEYBOARD_NAVIGATION.md)

## Questions?

If you have questions or need help:

- Open a [GitHub Issue](https://github.com/Big0290/sv-prj-helper/issues)
- Start a [GitHub Discussion](https://github.com/Big0290/sv-prj-helper/discussions)

Thank you for contributing! 🎉

