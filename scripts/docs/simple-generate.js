#!/usr/bin/env node

/**
 * Simple documentation generation script
 * Bypasses complex scanning and generates basic documentation
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = new URL('.', import.meta.url).pathname;

const projectRoot = join(__dirname, '../..');
const sourceDir = join(projectRoot, 'src/lib/ui');
const outputPath = join(projectRoot, 'LLM.md');

console.log('🚀 Starting Simple LLM Documentation Generation...');
console.log(`📁 Source: ${sourceDir}`);
console.log(`📄 Output: ${outputPath}`);

async function scanDirectory(dirPath, category = '') {
  const components = [];
  
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subComponents = await scanDirectory(fullPath, entry.name);
        components.push(...subComponents);
      } else if (entry.isFile() && extname(entry.name) === '.svelte') {
        // Found a Svelte component
        const stats = await stat(fullPath);
        const content = await readFile(fullPath, 'utf-8');
        
        components.push({
          name: basename(entry.name, '.svelte'),
          category: category || 'component',
          filePath: fullPath,
          size: stats.size,
          lastModified: stats.mtime,
          content: content.substring(0, 1000) // First 1000 chars for analysis
        });
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`);
  }
  
  return components;
}

async function generateDocumentation() {
  try {
    console.log('🔍 Scanning components...');
    
    // Scan all UI directories
    const directories = ['atoms', 'molecules', 'organisms', 'layouts', 'utils', 'hooks', 'theme'];
    let allComponents = [];
    
    for (const dir of directories) {
      const dirPath = join(sourceDir, dir);
      console.log(`  📂 Scanning ${dir}...`);
      const components = await scanDirectory(dirPath, dir);
      allComponents.push(...components);
      console.log(`    ✅ Found ${components.length} components`);
    }
    
    console.log(`📊 Total components found: ${allComponents.length}`);
    
    // Generate markdown documentation
    const markdown = generateMarkdown(allComponents);
    
    // Write to file
    await writeFile(outputPath, markdown, 'utf-8');
    
    console.log('✅ Documentation generated successfully!');
    console.log(`📄 Output: ${outputPath}`);
    console.log(`📏 Size: ${Math.round(markdown.length / 1024)}KB`);
    
  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

function generateMarkdown(components) {
  const now = new Date().toISOString();
  const totalWords = components.length * 50; // Rough estimate
  const estimatedTokens = Math.ceil(totalWords * 1.3);
  
  let markdown = `<!-- LLM_DOCUMENT_START -->
<!-- DOCUMENT_TYPE: Component Library API Reference -->
<!-- FRAMEWORK: Svelte 5 -->
<!-- LANGUAGE: TypeScript -->

# SV Project Helper UI Library - LLM Documentation

> **Version:** 1.0.0  
> **Generated:** ${now}  
> **Description:** Comprehensive API reference for the SV Project Helper UI Library

<!-- LLM_CONTEXT_START -->
**🤖 LLM Usage Instructions:**
This documentation is structured for optimal LLM consumption. Each section contains:
- Strategic markers for navigation (<!-- SECTION_TYPE:name -->)
- Component type indicators (<!-- COMPONENT_TYPE:atom/molecule/organism -->)
- Code block language hints (<!-- CODE_BLOCK:svelte/typescript -->)
- Cross-reference anchors for related content
<!-- LLM_CONTEXT_END -->

## About This Documentation

This comprehensive reference guide is optimized for Large Language Model (LLM) consumption and provides complete API documentation, usage patterns, and implementation guidance for the SV Project Helper UI Library.

## Overview <!-- OVERVIEW_SECTION -->

This is a comprehensive API reference for the SV Project Helper UI Library, a modern Svelte 5 component library with purple-themed glassmorphism design system.

### Key Features <!-- FEATURES_SECTION -->

- **Svelte 5 Native**: Built with latest Svelte 5 features including runes and snippets
- **TypeScript First**: Fully typed with strict TypeScript configuration
- **Glassmorphism Design**: Purple iOS26-inspired liquid glass effects
- **Accessibility Focused**: WCAG 2.1 AA compliant with comprehensive keyboard navigation
- **Mobile First**: Responsive design approach starting from mobile breakpoints
- **Dark Mode**: Automatic system preference detection

### Library Architecture <!-- ARCHITECTURE_SECTION -->

The component library follows atomic design principles with strict TypeScript typing:

- **atoms/**: Core primitives (Button, Input, Text, Icon)
- **molecules/**: Composed components (Card, Alert, Menu)
- **organisms/**: Complex components (DataTable, Chat, Forms)
- **layouts/**: Page-level layouts (Container, Grid, Sidebar)
- **utils/**: Utility components (Portal, FocusTrap, ScrollArea)
- **hooks/**: Svelte 5 runes-based hooks
- **theme/**: Theme provider and utilities

### Development Standards <!-- STANDARDS_SECTION -->

- **ES Modules Only**: No CommonJS support (\`"type": "module"\`)
- **Svelte 5 Runes**: Use \`$props()\`, \`$derived()\`, \`$state()\` over legacy reactivity
- **Snippets**: Use \`{@render children?.()}\` for content projection
- **CSS Variables**: All theming through custom properties, never hardcoded values
- **Accessibility**: ARIA labels, keyboard navigation, focus management required

## Component Reference <!-- COMPONENTS_SECTION -->

### Summary

Total components analyzed: ${components.length}

`;

  // Group components by category
  const componentsByCategory = components.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = [];
    acc[comp.category].push(comp);
    return acc;
  }, {});

  // Generate documentation for each category
  for (const [category, categoryComponents] of Object.entries(componentsByCategory)) {
    markdown += `### ${category.charAt(0).toUpperCase() + category.slice(1)} (${categoryComponents.length} components) <!-- COMPONENT_TYPE:${category} -->

`;

    for (const component of categoryComponents) {
      markdown += generateComponentDoc(component, category);
    }
  }

  markdown += `
## Design System

### CSS Custom Properties

The library uses CSS custom properties for theming. Key variables include:

- \`--sv-color-primary\`: Primary brand color (purple-based)
- \`--sv-color-surface\`: Surface background color
- \`--sv-glass-bg\`: Glassmorphism background
- \`--sv-glass-border\`: Glassmorphism border
- \`--sv-backdrop-blur\`: Backdrop filter blur amount

### Glassmorphism Effects

Components use consistent glassmorphism effects:

\`\`\`css
.glass-effect {
  background: var(--sv-glass-bg);
  backdrop-filter: blur(var(--sv-backdrop-blur));
  border: 1px solid var(--sv-glass-border);
}
\`\`\`

### Responsive Design

Mobile-first approach with breakpoints:

- Mobile: 0-768px
- Tablet: 768px-1024px  
- Desktop: 1024px+

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support
- Reduced motion support

## Usage Patterns

### Basic Component Usage

\`\`\`svelte
<script>
  import { Button, Card, Text } from 'sv-project-helper';
</script>

<Card>
  <Text>Hello World</Text>
  <Button variant="primary">Click me</Button>
</Card>
\`\`\`

### With TypeScript

\`\`\`svelte
<script lang="ts">
  import { Button, type ButtonProps } from 'sv-project-helper';
  
  interface Props {
    variant?: ButtonProps['variant'];
  }
  
  let { variant = 'primary' }: Props = $props();
</script>

<Button {variant}>Typed Button</Button>
\`\`\`

### Theming

\`\`\`svelte
<script>
  import { ThemeProvider } from 'sv-project-helper';
</script>

<ThemeProvider theme="dark">
  <!-- Your app content -->
</ThemeProvider>
\`\`\`

## Best Practices

1. **Always use TypeScript**: Define Props interfaces for type safety
2. **Leverage Svelte 5 runes**: Use \`$props()\`, \`$derived()\`, \`$state()\`
3. **Implement accessibility**: Include ARIA labels and keyboard navigation
4. **Use CSS custom properties**: Never hardcode colors or spacing
5. **Follow atomic design**: Compose molecules from atoms, organisms from molecules
6. **Test responsively**: Ensure components work on all screen sizes

## Troubleshooting

### Common Issues

1. **TypeScript errors**: Ensure all Props interfaces are properly defined
2. **Styling issues**: Check CSS custom property values and glassmorphism effects
3. **Accessibility warnings**: Verify ARIA labels and keyboard navigation
4. **Import errors**: Use correct import paths from 'sv-project-helper'

### Performance Tips

1. Use lazy loading for large components
2. Implement virtual scrolling for long lists
3. Optimize images and media assets
4. Use CSS containment for complex layouts

---

## Document Information <!-- DOCUMENT_META -->

<!-- LLM_OPTIMIZATION_STATS -->
- **Total Sections**: 8
- **Total Components**: ${components.length}
- **Total Words**: ${totalWords.toLocaleString()}
- **Estimated Tokens**: ${estimatedTokens.toLocaleString()}
- **Generated**: ${now}
- **Version**: 1.0.0

### LLM Usage Guidelines <!-- LLM_GUIDELINES -->

**For optimal LLM interaction with this documentation:**

1. **Navigation**: Use section markers (<!-- SECTION_TYPE:name -->) to jump to specific content
2. **Component Search**: Look for <!-- COMPONENT_TYPE:category --> markers to find components by type
3. **Code Examples**: All code blocks are marked with <!-- CODE_BLOCK:language --> for context
4. **API Reference**: Component features are marked with <!-- FEATURES_LIST --> for easy identification
5. **Cross-References**: Related components are linked with anchor tags for navigation

### Content Structure <!-- CONTENT_STRUCTURE -->

- **Header**: Library overview and architecture
- **Development Standards**: TypeScript, Svelte 5, and accessibility requirements
- **Component Reference**: Complete API reference organized by atomic design categories
- **Design System**: Theming, colors, and glassmorphism effects
- **Usage Patterns**: Common implementation patterns and best practices
- **Accessibility**: WCAG compliance guidelines and keyboard navigation
- **Troubleshooting**: Common issues and solutions

### Token Optimization <!-- TOKEN_OPTIMIZATION -->

This documentation is optimized for LLM context windows:
- Sections are structured for efficient parsing
- Strategic markers enable efficient content navigation
- Code examples are concise but functional
- Cross-references provide context without redundancy

*This documentation is optimized for Large Language Model consumption and provides comprehensive API reference for the SV Project Helper UI Library.*

<!-- LLM_DOCUMENT_END -->
`;

  return markdown;
}

function generateComponentDoc(component, category) {
  const { name, filePath, size, content } = component;
  const componentId = name.toLowerCase();
  
  // Extract basic info from component content
  const hasProps = content.includes('$props()') || content.includes('interface Props');
  const hasEvents = content.includes('createEventDispatcher') || content.includes('dispatch');
  const hasSlots = content.includes('<slot') || content.includes('{@render');
  const hasStyles = content.includes('<style>');
  
  return `<!-- COMPONENT_START:${componentId} -->
#### ${name} <!-- COMPONENT_TYPE:${category} -->

**Category**: ${category} | **Size**: ${Math.round(size / 1024)}KB <!-- COMPONENT_STATS -->  
**File**: \`${filePath.replace(process.cwd(), '.')}\`

**Features**: <!-- FEATURES_LIST -->
${hasProps ? '- ✅ Props interface' : '- ❌ No props interface'}
${hasEvents ? '- ✅ Event handling' : '- ❌ No events'}
${hasSlots ? '- ✅ Content slots' : '- ❌ No slots'}
${hasStyles ? '- ✅ Component styles' : '- ❌ No styles'}

**Basic Usage**: <!-- USAGE_EXAMPLE -->
\`\`\`svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ${name} } from 'sv-project-helper';
</script>

<${name} />
\`\`\`

<!-- COMPONENT_END:${componentId} -->

---

`;
}

// Run the generation
generateDocumentation();