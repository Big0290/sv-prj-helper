#!/usr/bin/env node

/**
 * Component Generator Script
 * 
 * Generates new Svelte 5 components with proper structure, types, and documentation
 * 
 * Usage:
 *   node scripts/component-generator.js <ComponentName> [category] [options]
 *   
 * Examples:
 *   node scripts/component-generator.js Modal molecules
 *   node scripts/component-generator.js TextField atoms --with-stories
 *   node scripts/component-generator.js DataTable organisms --with-tests
 */

import { mkdir, writeFile, readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Component categories and their descriptions
const CATEGORIES = {
  atoms: 'Basic building blocks (Button, Input, Icon)',
  molecules: 'Composed components (Card, Menu, Alert)', 
  organisms: 'Complex components (DataTable, Form, Modal)',
  layouts: 'Layout components (Container, Grid, Sidebar)',
  utils: 'Utility components (Portal, FocusTrap, ScrollArea)',
  hooks: 'Svelte 5 hooks (useTheme, useToast, useDialog)',
  theme: 'Theme-related components (ThemeProvider, ColorPicker)'
};

/**
 * Main generator entry point
 */
async function main() {
  const [,, componentName, category = 'atoms', ...flags] = process.argv;

  if (!componentName || componentName === '--help' || componentName === 'help') {
    showHelp();
    process.exit(0);
  }

  if (!isValidComponentName(componentName)) {
    console.error('❌ Invalid component name. Use PascalCase (e.g., MyComponent)');
    process.exit(1);
  }

  if (!CATEGORIES[category]) {
    console.error(`❌ Invalid category. Choose from: ${Object.keys(CATEGORIES).join(', ')}`);
    process.exit(1);
  }

  const options = parseFlags(flags);

  try {
    console.log(`🚀 Generating ${componentName} component in ${category} category...`);
    
    const componentPath = await generateComponent(componentName, category, options);
    
    console.log(`✅ Component generated successfully!`);
    console.log(`📁 Location: ${componentPath}`);
    console.log(`📝 Files created:`);
    console.log(`   - ${componentName}.svelte`);
    console.log(`   - ${componentName}.types.ts`);
    console.log(`   - README.md`);
    
    if (options.withStories) {
      console.log(`   - ${componentName}.stories.ts`);
    }
    
    if (options.withTests) {
      console.log(`   - ${componentName}.test.ts`);
    }
    
    console.log(`\n📚 Next steps:`);
    console.log(`   1. Implement your component logic in ${componentName}.svelte`);
    console.log(`   2. Update the props interface in ${componentName}.types.ts`);
    console.log(`   3. Add examples to the README.md`);
    console.log(`   4. Export the component in src/lib/components/index.ts`);
    
  } catch (error) {
    console.error('❌ Error generating component:', error.message);
    process.exit(1);
  }
}

/**
 * Generate component files
 */
async function generateComponent(componentName, category, options) {
  const componentPath = join('src/lib/components', category, componentName);
  
  // Check if component already exists
  try {
    await stat(componentPath);
    throw new Error(`Component ${componentName} already exists in ${category}`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
  
  // Create component directory
  await mkdir(componentPath, { recursive: true });
  
  // Generate component files
  await Promise.all([
    writeFile(join(componentPath, `${componentName}.svelte`), generateSvelteFile(componentName, category)),
    writeFile(join(componentPath, `${componentName}.types.ts`), generateTypesFile(componentName)),
    writeFile(join(componentPath, 'README.md'), generateReadmeFile(componentName, category)),
    ...(options.withStories ? [writeFile(join(componentPath, `${componentName}.stories.ts`), generateStoriesFile(componentName))] : []),
    ...(options.withTests ? [writeFile(join(componentPath, `${componentName}.test.ts`), generateTestFile(componentName))] : [])
  ]);
  
  return componentPath;
}

/**
 * Generate Svelte component file
 */
function generateSvelteFile(componentName, category) {
  const isHook = category === 'hooks';
  
  if (isHook) {
    return generateHookFile(componentName);
  }
  
  return `<script lang="ts">
  import type { ${componentName}Props } from './${componentName}.types.js';

  let {
    // Add your props here with defaults
    children
  }: ${componentName}Props = $props();

  // Add derived values using $derived
  const classes = $derived(\`${componentName.toLowerCase()}\`);
</script>

<div class={classes}>
  {@render children?.()}
</div>

<style>
  .${componentName.toLowerCase()} {
    /* Component styles using CSS custom properties */
    /* Follow glassmorphism design patterns */
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    box-shadow: var(--glass-shadow);
    
    /* Add your component-specific styles here */
  }

  /* Focus visible for accessibility */
  .${componentName.toLowerCase()}:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }
</style>
`;
}

/**
 * Generate hook file for hooks category
 */
function generateHookFile(componentName) {
  const hookName = componentName.startsWith('use') ? componentName : `use${componentName}`;
  
  return `/**
 * ${hookName} - Svelte 5 hook
 * 
 * Description: Add your hook description here
 * 
 * Usage:
 * \`\`\`svelte
 * <script>
 *   import { ${hookName} } from '@sv-project-helper/ui/hooks';
 *   
 *   const { value, setValue } = ${hookName}();
 * </script>
 * \`\`\`
 */

import { type Snippet } from 'svelte';

export interface ${componentName}Options {
  // Add hook options here
}

export interface ${componentName}Return {
  // Add return type here
}

/**
 * ${hookName} hook implementation
 */
export function ${hookName}(options: ${componentName}Options = {}): ${componentName}Return {
  // Add your hook logic here using Svelte 5 runes
  
  return {
    // Return your hook API
  };
}
`;
}

/**
 * Generate TypeScript types file
 */
function generateTypesFile(componentName) {
  return `import type { Snippet } from 'svelte';

export interface ${componentName}Props {
  /**
   * Add your prop descriptions here
   */
  children?: Snippet;
  
  // Add more props as needed
  // variant?: 'primary' | 'secondary';
  // size?: 'sm' | 'md' | 'lg';
  // disabled?: boolean;
  // ariaLabel?: string;
  // onclick?: (e: MouseEvent) => void;
}

export interface ${componentName}Events {
  // Add component events here
  // click: CustomEvent<MouseEvent>;
  // change: CustomEvent<string>;
}

export interface ${componentName}Slots {
  default: {};
  // Add named slots here
  // header: {};
  // footer: {};
}
`;
}

/**
 * Generate README documentation file
 */
function generateReadmeFile(componentName, category) {
  return `# ${componentName}

A ${category.slice(0, -1)} component for the SV Project Helper UI library.

**Category:** ${category} | **Import:** \`@sv-project-helper/ui\`

## Overview

${componentName} is a ${CATEGORIES[category].split('(')[0].trim().toLowerCase()} component that provides [describe functionality here].

This component follows accessibility-first design principles with glassmorphism styling and full keyboard navigation support.

## Installation

\`\`\`bash
npm install @sv-project-helper/ui
\`\`\`

## Basic Usage

\`\`\`svelte
<script>
  import { ${componentName} } from '@sv-project-helper/ui';
</script>

<${componentName}>
  Default content
</${componentName}>
\`\`\`

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| \`children\` | \`Snippet\` | - | ✓ | Component content |

*Add more props as you develop the component*

## Events

| Event | Type | Detail | Description |
|-------|------|--------|-------------|

*Add events as you develop the component*

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| \`default\` | - | Main component content |

*Add named slots as you develop the component*

## Accessibility

### Keyboard Navigation
- Add keyboard navigation details

### ARIA Attributes
- Add ARIA attributes used

### Screen Reader Support
Full screen reader support with proper role and state announcements.

### Focus Management
Visible focus ring with proper contrast and keyboard navigation.

### Guidelines
- Add accessibility guidelines specific to this component

## Examples

### Basic Example

\`\`\`svelte
<${componentName}>
  Basic usage example
</${componentName}>
\`\`\`

### Advanced Example

\`\`\`svelte
<script>
  // Add advanced example with props and event handlers
</script>

<${componentName}>
  Advanced usage example
</${componentName}>
\`\`\`

---

**Version:** 1.0.0 | **Last Updated:** ${new Date().toISOString().split('T')[0]}

Part of [SV Project Helper UI Library](../../README.md)
`;
}

/**
 * Generate Storybook stories file
 */
function generateStoriesFile(componentName) {
  return `import type { Meta, StoryObj } from '@storybook/svelte';
import ${componentName} from './${componentName}.svelte';

const meta: Meta<${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A ${componentName.toLowerCase()} component with glassmorphism styling and accessibility features.'
      }
    }
  },
  argTypes: {
    // Add argTypes for Storybook controls
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add default args
  }
};

export const Variants: Story = {
  args: {
    // Add variant examples
  }
};

// Add more stories as needed
`;
}

/**
 * Generate test file
 */
function generateTestFile(componentName) {
  return `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import ${componentName} from './${componentName}.svelte';

describe('${componentName}', () => {
  it('renders with default props', () => {
    render(${componentName}, {
      props: {
        children: () => 'Test content'
      }
    });
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(${componentName}, {
      props: {
        children: () => 'Test content'
      }
    });
    
    const element = container.querySelector('.${componentName.toLowerCase()}');
    expect(element).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(${componentName}, {
      props: {
        children: () => 'Test content'
      }
    });
    
    // Add keyboard navigation tests
    // await user.tab();
    // expect(screen.getByRole('...')).toHaveFocus();
  });

  it('supports accessibility features', () => {
    render(${componentName}, {
      props: {
        children: () => 'Test content',
        ariaLabel: 'Test label'
      }
    });
    
    // Add accessibility tests
    // expect(screen.getByLabelText('Test label')).toBeInTheDocument();
  });

  // Add more tests as you develop the component
});
`;
}

/**
 * Parse command line flags
 */
function parseFlags(flags) {
  return {
    withStories: flags.includes('--with-stories'),
    withTests: flags.includes('--with-tests')
  };
}

/**
 * Validate component name
 */
function isValidComponentName(name) {
  return /^[A-Z][a-zA-Z0-9]*$/.test(name);
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
🧩 Component Generator

Generate new Svelte 5 components with proper structure and documentation.

Usage:
  node scripts/component-generator.js <ComponentName> [category] [options]

Arguments:
  ComponentName    Name of the component (PascalCase, e.g., MyComponent)
  category         Component category (default: atoms)

Categories:
${Object.entries(CATEGORIES).map(([key, desc]) => `  ${key.padEnd(12)} ${desc}`).join('\n')}

Options:
  --with-stories   Generate Storybook stories file
  --with-tests     Generate test file

Examples:
  node scripts/component-generator.js Modal molecules
  node scripts/component-generator.js TextField atoms --with-stories
  node scripts/component-generator.js DataTable organisms --with-tests --with-stories
  node scripts/component-generator.js useLocalStorage hooks

The generator creates:
  - ComponentName.svelte (main component file)
  - ComponentName.types.ts (TypeScript interfaces)
  - README.md (documentation template)
  - ComponentName.stories.ts (if --with-stories)
  - ComponentName.test.ts (if --with-tests)
`);
}

// Run generator if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateComponent };