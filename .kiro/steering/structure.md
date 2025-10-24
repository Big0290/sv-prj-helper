# Project Structure

## Root Directory
```
├── src/lib/                 # Library source code
├── src/routes/              # Demo/documentation routes
├── .svelte-kit/             # Generated SvelteKit files
├── node_modules/            # Dependencies
└── dist/                    # Built library output
```

## Library Architecture (`src/lib/`)

### Main Components (`src/lib/components/`)
- **Flat structure**: All components in single directory
- **Naming**: PascalCase `.svelte` files
- **Exports**: Centralized through `src/lib/index.ts`
- **Types**: Exported alongside components when needed

### UI System (`src/lib/ui/`)
- **atoms/**: Core primitives (Box, Text, Button basics)
- **molecules/**: Composed components (Menu, MenuItem)
- **organisms/**: Complex components (empty currently)
- **layouts/**: Layout components (closed folder)
- **utils/**: Utility components (Portal, FocusTrap, ScrollArea)
- **hooks/**: Svelte 5 runes-based hooks (useTheme, useToast, etc.)
- **theme/**: ThemeProvider and theme utilities

### Supporting Files
- **styles/**: Global theme CSS with custom properties
- **utils/**: Utility functions (empty currently)
- **hooks/**: Legacy hooks (useCodeEditor.ts)

## Component Patterns

### File Structure
```svelte
<script lang="ts">
  // Props interface
  interface Props { ... }
  
  // Props destructuring with defaults
  let { prop = 'default' }: Props = $props();
  
  // Derived values using $derived
  const classes = $derived(`base-class ${variant}`);
</script>

<!-- Template with snippets -->
{@render children()}

<style>
  /* Component-scoped styles using CSS custom properties */
</style>
```

### Export Pattern
- Main exports in `src/lib/index.ts`
- UI system exports in `src/lib/ui/index.ts`
- Type exports alongside component exports
- Consistent naming: `export { default as ComponentName }`

## Styling Architecture
- **CSS Custom Properties**: All theming through CSS variables
- **Glassmorphism**: Consistent glass effects using utility classes
- **Responsive**: Mobile-first approach
- **Accessibility**: Focus rings, reduced motion support
- **Dark Mode**: System preference detection

## Development Conventions
- **TypeScript**: Strict typing for all components
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Svelte 5**: Use runes (`$props`, `$derived`) over legacy reactivity
- **Snippets**: Use `{@render children()}` pattern for content projection