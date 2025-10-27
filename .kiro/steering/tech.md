---
inclusion: always
---

# Technology Stack & Development Guidelines

## Core Technologies

- **Svelte 5**: Use runes (`$props`, `$derived`, `$state`) and snippets (`{@render children()}`)
- **TypeScript**: Strict mode enabled - all components must be fully typed
- **SvelteKit**: Library mode with `@sveltejs/package` for distribution
- **Vite**: Build tool with ES module output only

## Code Style & Patterns

### Component Structure

```svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    children?: Snippet;
  }
  
  let { variant = 'primary', disabled = false, children }: Props = $props();
  
  const classes = $derived(`btn btn--${variant} ${disabled ? 'btn--disabled' : ''}`);
</script>

{@render children?.()}

<style>
  .btn { /* Use CSS custom properties for theming */ }
</style>
```

### Required Patterns

- **Props Interface**: Always define typed Props interface
- **Destructuring**: Use `$props()` with defaults
- **Snippets**: Use `{@render children?.()}` for content projection
- **CSS Variables**: Theme with custom properties, not hardcoded values
- **Accessibility**: Include ARIA labels, keyboard navigation, focus management

### File Organization

- **Exports**: Centralize in `src/lib/index.ts` and `src/lib/ui/index.ts`
- **Naming**: PascalCase for components, camelCase for utilities
- **Structure**: atoms/ → molecules/ → organisms/ → layouts/

## Build Commands

```bash
npm run dev              # Development server
npm run build            # Production build
npm run package          # Library packaging
npm run check            # TypeScript validation
```

## Development Standards

- **ES Modules Only**: No CommonJS (`"type": "module"`)
- **Accessibility First**: WCAG 2.1 AA compliance required
- **Glassmorphism Theme**: Purple-based with backdrop-blur effects
- **Mobile First**: Responsive design approach
- **Type Safety**: Export component Props interfaces
- **Dark Mode**: System preference detection via CSS `prefers-color-scheme`

## Key Dependencies

- **CodeMirror 6**: Code editor components
- **ZXing/JSBarcode**: Barcode/QR functionality  
- **Marked/PrismJS**: Markdown and syntax highlighting
