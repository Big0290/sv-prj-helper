# Theming Page Update

## Overview

Updated the theming documentation page (`src/routes/docs/theming/+page.svelte`) to use `StaticCodeExample` component instead of `Code` component for all major code blocks. This provides better syntax highlighting, copy-to-clipboard functionality, and improved developer experience.

## Changes Made

### 1. Import Update

```typescript
import { Container, Heading, Text, Card, Stack, Code, Alert, Button, Badge, Grid, StaticCodeExample } from '$lib/ui'
```

Added `StaticCodeExample` to the imports.

### 2. Replaced Code Blocks with StaticCodeExample

#### CSS Custom Properties Section

- **Color System**: Now uses `StaticCodeExample` with title "Color System Variables" and description "Primary, secondary, status, and neutral colors"
- **Background & Text**: Converted to `StaticCodeExample` with title "Background and Text Variables"
- **Glassmorphism Effects**: Converted with title "Glassmorphism Variables"
- **Typography System**: Converted with title "Typography Variables"
- **Spacing & Layout**: Converted with title "Spacing and Layout Variables"

#### Dark Mode Section

- **Dark Mode CSS**: Converted to `StaticCodeExample` with proper title and description
- **Theme Hook Example**: Converted Svelte code example showing `useTheme` usage

#### Custom Theme Section

- **Custom Theme CSS**: Converted to `StaticCodeExample`
- **Import Theme in Layout**: Converted to `StaticCodeExample` showing how to apply custom theme

### 3. Kept Code Component For

- **Inline code** (e.g., `<Code inline>backdrop-filter</Code>`)
- **Small theme examples** in the Grid (Ocean, Forest, Sunset, Midnight themes) - kept as Code for compact display in the grid layout

## Benefits

1. **Better Syntax Highlighting**: `StaticCodeExample` provides enhanced syntax highlighting
2. **Copy to Clipboard**: All major examples now have copy buttons
3. **Improved Readability**: Titles and descriptions make each example self-contained
4. **Consistent Experience**: Matches the approach used in examples page and component docs
5. **Developer-Friendly**: Easy to copy entire code blocks without manual selection

## File Modified

- `src/routes/docs/theming/+page.svelte`

## Features of StaticCodeExample

- Syntax highlighting for CSS and Svelte
- Copy-to-clipboard button
- Title and description for each example
- Consistent styling with rest of documentation
- Language-specific highlighting
