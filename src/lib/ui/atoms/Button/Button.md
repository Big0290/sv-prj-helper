# Button

## Description

A versatile button component that serves as a primary interactive element in the UI. It supports rendering as either a button or an anchor element, includes multiple visual variants, sizes, and states such as loading and disabled.

## API

### Props

- `variant` (optional, default: `'primary'`): Visual style variant. Options: `'primary'`, `'secondary'`, `'ghost'`, `'danger'`
- `size` (optional, default: `'md'`): Size of the button. Options: `'sm'`, `'md'`, `'lg'`
- `disabled` (optional, default: `false`): Whether the button is disabled
- `loading` (optional, default: `false`): Shows a loading spinner when true
- `type` (optional, default: `'button'`): HTML button type attribute. Options: `'button'`, `'submit'`, `'reset'`
- `href` (optional): If provided, renders as an anchor element instead of button
- `target` (optional): Link target attribute (e.g., `'_blank'` for external links)
- `rel` (optional): Link rel attribute (automatically set to 'noopener noreferrer' for external links)
- `ariaLabel` (optional): Accessibility label for the button
- `onclick` (optional): Click event handler function
- `children` (required): Content to display inside the button

### Events

- `onclick`: Fired when the button is clicked

## Usage Examples

### Basic Button

```svelte
<Button>Click me</Button>
```

### Button Variants

```svelte
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>
```

### Button Sizes

```svelte
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Loading State

```svelte
<Button loading={true}>Processing...</Button>
```

### Disabled State

```svelte
<Button disabled={true}>Disabled</Button>
```

### As a Link

```svelte
<Button href="/about" variant="primary">Go to About</Button>
<Button href="https://example.com" target="_blank">External Link</Button>
```

### With Click Handler

```svelte
<Button onclick={() => alert('Clicked!')}>Click me</Button>
```

## Best Practices

1. **Accessibility**: Always provide an `ariaLabel` for icon-only buttons
2. **Loading State**: Use the loading state for async operations to provide user feedback
3. **Disabled State**: Disable buttons when an action is not available rather than hiding them
4. **External Links**: When using `target="_blank"`, the component automatically adds `noopener noreferrer` for security
5. **Primary Actions**: Use the primary variant for the main action on a page or form
6. **Danger Actions**: Use the danger variant for destructive actions like delete or remove
7. **Semantic HTML**: The component automatically renders as an anchor when `href` is provided

