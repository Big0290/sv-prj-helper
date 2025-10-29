# Storybook Setup

This project uses Storybook for component development and testing.

## Quick Start

```bash
# Start Storybook development server
npm run storybook

# Build static Storybook
npm run build-storybook
```

Storybook will be available at `http://localhost:6006`

## Features

- **SvelteKit Integration**: Uses `@storybook/sveltekit` for seamless integration
- **Svelte 5 Support**: Full support for Svelte 5 runes (`$state`, `$props`, `$derived`)
- **Theme Integration**: Automatically imports project theme CSS
- **Accessibility Testing**: Includes `@storybook/addon-a11y` for accessibility checks
- **Documentation**: Auto-generates component documentation
- **Interactive Controls**: Test component props in real-time

## Story Format

Stories are located in:
- `src/lib/ui/**/*.stories.svelte` - Component stories
- `src/stories/**/*.stories.svelte` - Example/documentation stories

## Creating Stories

Use the Svelte CSF format with `@storybook/addon-svelte-csf`:

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MyComponent from './MyComponent.svelte';

  const { Story } = defineMeta({
    title: 'Category/MyComponent',
    component: MyComponent,
    tags: ['autodocs'],
    argTypes: {
      // Define controls for props
    }
  });
</script>

<Story name="Default" args={{ prop1: 'value' }} />
```

## Configuration

- **Main Config**: `.storybook/main.ts`
- **Preview Config**: `.storybook/preview.ts` - Includes theme CSS and global settings

## Notes

- Storybook is a **dev dependency only** and does not affect the published npm package
- Storybook build output (`storybook-static`) is gitignored
- All Storybook files are excluded from the npm package via `package.json` files array

