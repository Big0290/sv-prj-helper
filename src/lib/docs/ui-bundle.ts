/**
 * UI Library Bundle Generator
 * Creates a module map for use in Svelte REPL context
 */

/**
 * Component export map for REPL context
 * Maps $lib/ui imports to REPL-compatible module references
 */
export const UI_COMPONENT_MAP: Record<string, string> = {
  // Atoms
  Button: './atoms/Button.svelte',
  Input: './atoms/Input.svelte',
  Textarea: './atoms/Textarea.svelte',
  Checkbox: './atoms/Checkbox.svelte',
  Radio: './atoms/Radio.svelte',
  Switch: './atoms/Switch.svelte',
  Slider: './atoms/Slider.svelte',
  Badge: './atoms/Badge.svelte',
  StatusDot: './atoms/StatusDot.svelte',
  Divider: './atoms/Divider.svelte',
  Avatar: './atoms/Avatar.svelte',
  Spinner: './atoms/Spinner.svelte',
  Progress: './atoms/Progress.svelte',
  Box: './atoms/Box.svelte',
  Flex: './atoms/Flex.svelte',
  Text: './atoms/Text.svelte',
  Heading: './atoms/Heading.svelte',
  Label: './atoms/Label.svelte',
  Link: './atoms/Link.svelte',
  Code: './atoms/Code.svelte',
  Chip: './atoms/Chip.svelte',
  Icon: './atoms/Icon.svelte',
  Image: './atoms/Image.svelte',
  Audio: './atoms/Audio.svelte',
  Video: './atoms/Video.svelte',
  CopyButton: './atoms/CopyButton.svelte',
  LoadingOverlay: './atoms/LoadingOverlay.svelte',

  // Molecules
  ButtonGroup: './molecules/ButtonGroup.svelte',
  TagInput: './molecules/TagInput.svelte',
  OTPInput: './molecules/OTPInput.svelte',
  ColorPicker: './molecules/ColorPicker.svelte',
  Rating: './molecules/Rating.svelte',
  Breadcrumb: './molecules/Breadcrumb.svelte',
  Menu: './molecules/Menu.svelte',
  MenuItem: './molecules/MenuItem.svelte',
  Pagination: './molecules/Pagination.svelte',
  Alert: './molecules/Alert.svelte',
  Toast: './molecules/Toast.svelte',
  Tooltip: './molecules/Tooltip.svelte',
  Snackbar: './molecules/Snackbar.svelte',
  Skeleton: './molecules/Skeleton.svelte',
  Card: './molecules/Card.svelte',
  StatsCard: './molecules/StatsCard.svelte',
  EmptyState: './molecules/EmptyState.svelte',
  Accordion: './molecules/Accordion.svelte',

  // Layouts
  Container: './layouts/Container.svelte',
  Grid: './layouts/Grid.svelte',
  Stack: './layouts/Stack.svelte',

  // Theme
  ThemeProvider: './theme/ThemeProvider.svelte',
}

/**
 * Process component code and replace $lib/ui imports
 * For now, we'll use a simple string replacement approach
 */
export function processCode(code: string): string {
  // Replace $lib/ui imports with explicit component paths
  // This is a temporary solution - in production, we'd use a proper bundler
  let processed = code

  // Handle import statements like: import { Button, Text } from '$lib/ui'
  const importRegex = /import\s*{([^}]+)}\s*from\s*['"]\$lib\/ui['"]/g
  processed = processed.replace(importRegex, (match, imports) => {
    // Split imports and create individual import statements
    const components = imports
      .split(',')
      .map((comp: string) => comp.trim())
      .map((name: string) => name.split(' as ')[0].trim()) // Handle aliases

    const importStatements = components
      .map((component: string) => {
        // For hooks, we'd need different handling
        if (component.includes('use')) {
          // Skip hooks for now - would need special handling
          return `// Hook: ${component} - not yet supported`
        }

        const componentKey = component.split(' as ')[0].trim()
        // Return a comment for now - actual imports would be handled by bundler
        return `// import ${componentKey}`
      })
      .filter((stmt: string) => !stmt.startsWith('// Hook:'))
      .join('\n  ')

    return `// Original: ${match}\n  ${importStatements}\n  // Note: Component imports need to be bundled externally`
  })

  return processed
}

/**
 * Get component dependencies
 */
export function getComponentDependencies(componentName: string): string[] {
  // This would analyze actual component code to find dependencies
  // For now, return empty array
  return []
}

/**
 * Generate a simple component wrapper that can be used in REPL
 */
export function generateComponentWrapper(componentName: string, props: Record<string, any> = {}): string {
  // This would generate actual wrapper code
  return `// Wrapper for ${componentName}`
}
