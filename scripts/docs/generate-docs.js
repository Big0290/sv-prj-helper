#!/usr/bin/env node

/**
 * Documentation generation script for SV Project Helper UI Library
 * 
 * This script demonstrates the documentation system by generating
 * proper README files for components using the new templates and parsers.
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// Import our documentation system (we'll simulate the functionality for now)
// In a real scenario, these would be imported from the compiled library

/**
 * Generate documentation for Button component as an example
 */
async function generateButtonDocumentation() {
  try {
    // Read Button component files
    const buttonPath = 'src/lib/components/atoms/Button';
    const typesContent = await readFile(join(buttonPath, 'Button.types.ts'), 'utf-8');
    const componentContent = await readFile(join(buttonPath, 'Button.svelte'), 'utf-8');

    // Create enhanced Button documentation
    const buttonDoc = {
      name: 'Button',
      description: 'A versatile button component with glassmorphism styling, multiple variants, and comprehensive accessibility support.',
      category: 'atoms',
      importPath: '@sv-project-helper/ui',
      props: [
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'ghost' | 'danger'",
          defaultValue: 'primary',
          required: false,
          description: 'Visual style variant of the button'
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          defaultValue: 'md',
          required: false,
          description: 'Size of the button affecting padding and font size'
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: 'false',
          required: false,
          description: 'Whether the button is disabled and non-interactive'
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: 'false',
          required: false,
          description: 'Shows loading spinner and disables interaction'
        },
        {
          name: 'type',
          type: "'button' | 'submit' | 'reset'",
          defaultValue: 'button',
          required: false,
          description: 'HTML button type attribute'
        },
        {
          name: 'ariaLabel',
          type: 'string',
          required: false,
          description: 'Accessible label for screen readers'
        },
        {
          name: 'onclick',
          type: '(e: MouseEvent) => void',
          required: false,
          description: 'Click event handler function'
        },
        {
          name: 'children',
          type: 'Snippet',
          required: true,
          description: 'Button content (text, icons, etc.)'
        }
      ],
      events: [
        {
          name: 'click',
          type: 'MouseEvent',
          description: 'Fired when the button is clicked (if not disabled or loading)'
        }
      ],
      slots: [
        {
          name: 'default',
          description: 'Main button content'
        }
      ],
      examples: [
        {
          title: 'Basic Usage',
          description: 'Simple button with default primary styling',
          code: `<Button>Click me</Button>`,
          language: 'svelte',
          category: 'basic'
        },
        {
          title: 'Button Variants',
          description: 'Different visual styles for various use cases',
          code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
          language: 'svelte',
          category: 'basic'
        },
        {
          title: 'Button Sizes',
          description: 'Different sizes for various contexts',
          code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
          language: 'svelte',
          category: 'basic'
        },
        {
          title: 'Loading State',
          description: 'Button with loading spinner',
          code: `<Button loading={true}>
  Processing...
</Button>`,
          language: 'svelte',
          category: 'advanced'
        },
        {
          title: 'With Click Handler',
          description: 'Button with custom click handling',
          code: `<script>
  function handleClick() {
    console.log('Button clicked!');
  }
</script>

<Button onclick={handleClick}>
  Click Handler
</Button>`,
          language: 'svelte',
          category: 'advanced'
        },
        {
          title: 'Accessibility Example',
          description: 'Button with proper accessibility attributes',
          code: `<Button 
  ariaLabel="Save document"
  disabled={!canSave}
>
  Save
</Button>`,
          language: 'svelte',
          category: 'accessibility'
        }
      ],
      accessibility: {
        keyboardNavigation: [
          'Tab - Focus the button',
          'Enter/Space - Activate the button',
          'Escape - Remove focus (when focused)'
        ],
        ariaAttributes: [
          'aria-label - Custom accessible label',
          'aria-busy - Indicates loading state',
          'aria-hidden - Hides decorative spinner from screen readers'
        ],
        screenReaderSupport: 'Full screen reader support with proper role and state announcements',
        focusManagement: 'Visible focus ring with proper contrast and keyboard navigation',
        guidelines: [
          'Always provide meaningful button text or aria-label',
          'Use loading state for async operations',
          'Disable buttons when actions are not available',
          'Ensure sufficient color contrast for all variants'
        ]
      },
      lastUpdated: new Date().toISOString().split('T')[0],
      version: '1.0.0'
    };

    // Generate README content
    const readmeContent = generateReadmeFromDoc(buttonDoc);
    
    // Write the new README
    await writeFile(join(buttonPath, 'README.md'), readmeContent);
    
    console.log('✅ Generated documentation for Button component');
    return buttonDoc;
    
  } catch (error) {
    console.error('❌ Error generating Button documentation:', error);
    throw error;
  }
}

/**
 * Generate README content from documentation object
 */
function generateReadmeFromDoc(doc) {
  const sections = [];

  // Header
  sections.push(`# ${doc.name}

${doc.description}

**Category:** ${doc.category} | **Import:** \`${doc.importPath}\``);

  // Overview
  sections.push(`## Overview

${doc.description}

This component is part of the SV Project Helper UI library and follows accessibility-first design principles with glassmorphism styling.`);

  // Installation
  sections.push(`## Installation

\`\`\`bash
npm install @sv-project-helper/ui
\`\`\``);

  // Basic Usage
  const basicExample = doc.examples.find(ex => ex.category === 'basic') || doc.examples[0];
  sections.push(`## Basic Usage

\`\`\`svelte
<script>
  import { ${doc.name} } from '${doc.importPath}';
</script>

${basicExample?.code || `<${doc.name}>Default content</${doc.name}>`}
\`\`\``);

  // Props
  if (doc.props.length > 0) {
    const propsTable = doc.props.map(prop => {
      const required = prop.required ? '✓' : '';
      const defaultVal = prop.defaultValue ? `\`${prop.defaultValue}\`` : '-';
      return `| \`${prop.name}\` | \`${prop.type}\` | ${defaultVal} | ${required} | ${prop.description} |`;
    }).join('\n');

    sections.push(`## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
${propsTable}`);
  }

  // Events
  if (doc.events.length > 0) {
    const eventsTable = doc.events.map(event => {
      const detail = event.detail ? `\`${event.detail}\`` : '-';
      return `| \`${event.name}\` | \`${event.type}\` | ${detail} | ${event.description} |`;
    }).join('\n');

    sections.push(`## Events

| Event | Type | Detail | Description |
|-------|------|--------|-------------|
${eventsTable}`);
  }

  // Slots
  if (doc.slots.length > 0) {
    const slotsTable = doc.slots.map(slot => {
      const props = slot.props ? Object.entries(slot.props).map(([key, type]) => `${key}: ${type}`).join(', ') : '-';
      return `| \`${slot.name}\` | ${props} | ${slot.description} |`;
    }).join('\n');

    sections.push(`## Slots

| Slot | Props | Description |
|------|-------|-------------|
${slotsTable}`);
  }

  // Accessibility
  const accessibility = doc.accessibility;
  const accessibilitySections = [];

  if (accessibility.keyboardNavigation?.length) {
    accessibilitySections.push(`### Keyboard Navigation
${accessibility.keyboardNavigation.map(key => `- ${key}`).join('\n')}`);
  }

  if (accessibility.ariaAttributes?.length) {
    accessibilitySections.push(`### ARIA Attributes
${accessibility.ariaAttributes.map(attr => `- ${attr}`).join('\n')}`);
  }

  if (accessibility.screenReaderSupport) {
    accessibilitySections.push(`### Screen Reader Support
${accessibility.screenReaderSupport}`);
  }

  if (accessibility.focusManagement) {
    accessibilitySections.push(`### Focus Management
${accessibility.focusManagement}`);
  }

  if (accessibility.guidelines?.length) {
    accessibilitySections.push(`### Guidelines
${accessibility.guidelines.map(guideline => `- ${guideline}`).join('\n')}`);
  }

  sections.push(`## Accessibility

${accessibilitySections.join('\n\n')}`);

  // Examples
  if (doc.examples.length > 0) {
    const exampleSections = doc.examples.map(example => {
      const title = example.title;
      const description = example.description ? `\n${example.description}\n` : '';
      
      return `### ${title}${description}
\`\`\`${example.language}
${example.code}
\`\`\``;
    }).join('\n\n');

    sections.push(`## Examples

${exampleSections}`);
  }

  // Footer
  sections.push(`---

**Version:** ${doc.version} | **Last Updated:** ${doc.lastUpdated}

Part of [SV Project Helper UI Library](../../README.md)`);

  return sections.join('\n\n');
}

// Run the documentation generation
if (import.meta.url === `file://${process.argv[1]}`) {
  generateButtonDocumentation()
    .then(() => {
      console.log('📚 Documentation generation completed successfully!');
    })
    .catch((error) => {
      console.error('💥 Documentation generation failed:', error);
      process.exit(1);
    });
}

export { generateButtonDocumentation };