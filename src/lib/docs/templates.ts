import type { ComponentDocumentation, DocumentationTemplate, PropDefinition, EventDefinition, SlotDefinition, CodeExample } from './types.js';

/**
 * Generate a standardized README template for a component
 */
export function generateComponentReadme(doc: ComponentDocumentation): string {
  const sections = [
    generateHeader(doc),
    generateDescription(doc),
    generateInstallation(doc),
    generateUsage(doc),
    generateProps(doc.props),
    generateEvents(doc.events),
    generateSlots(doc.slots),
    generateAccessibility(doc.accessibility),
    generateExamples(doc.examples),
    generateRelatedComponents(doc.relatedComponents),
    generateFooter(doc)
  ];

  return sections.filter(Boolean).join('\n\n');
}

function generateHeader(doc: ComponentDocumentation): string {
  return `# ${doc.name}

${doc.description}

**Category:** ${doc.category} | **Import:** \`${doc.importPath}\``;
}

function generateDescription(doc: ComponentDocumentation): string {
  return `## Overview

${doc.description}

This component is part of the SV Project Helper UI library and follows accessibility-first design principles with glassmorphism styling.`;
}

function generateInstallation(doc: ComponentDocumentation): string {
  return `## Installation

\`\`\`bash
npm install @sv-project-helper/ui
\`\`\``;
}

function generateUsage(doc: ComponentDocumentation): string {
  const basicExample = doc.examples.find(ex => ex.category === 'basic') || doc.examples[0];
  
  return `## Basic Usage

\`\`\`svelte
<script>
  import { ${doc.name} } from '${doc.importPath}';
</script>

${basicExample?.code || `<${doc.name}>
  <!-- Component content -->
</${doc.name}>`}
\`\`\``;
}

function generateProps(props: PropDefinition[]): string {
  if (!props.length) {
    return `## Props

This component does not accept any props.`;
  }

  const tableRows = props.map(prop => {
    const required = prop.required ? '✓' : '';
    const defaultVal = prop.defaultValue ? `\`${prop.defaultValue}\`` : '-';
    return `| \`${prop.name}\` | \`${prop.type}\` | ${defaultVal} | ${required} | ${prop.description} |`;
  }).join('\n');

  return `## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
${tableRows}`;
}

function generateEvents(events: EventDefinition[]): string {
  if (!events.length) {
    return `## Events

This component does not emit any custom events.`;
  }

  const tableRows = events.map(event => {
    const detail = event.detail ? `\`${event.detail}\`` : '-';
    return `| \`${event.name}\` | \`${event.type}\` | ${detail} | ${event.description} |`;
  }).join('\n');

  return `## Events

| Event | Type | Detail | Description |
|-------|------|--------|-------------|
${tableRows}`;
}

function generateSlots(slots: SlotDefinition[]): string {
  if (!slots.length) {
    return `## Slots

This component does not provide any slots.`;
  }

  const tableRows = slots.map(slot => {
    const props = slot.props ? Object.entries(slot.props).map(([key, type]) => `${key}: ${type}`).join(', ') : '-';
    return `| \`${slot.name}\` | ${props} | ${slot.description} |`;
  }).join('\n');

  return `## Slots

| Slot | Props | Description |
|------|-------|-------------|
${tableRows}`;
}

function generateAccessibility(accessibility: ComponentDocumentation['accessibility']): string {
  const sections = [];

  if (accessibility.keyboardNavigation?.length) {
    sections.push(`### Keyboard Navigation
${accessibility.keyboardNavigation.map(key => `- ${key}`).join('\n')}`);
  }

  if (accessibility.ariaAttributes?.length) {
    sections.push(`### ARIA Attributes
${accessibility.ariaAttributes.map(attr => `- ${attr}`).join('\n')}`);
  }

  if (accessibility.screenReaderSupport) {
    sections.push(`### Screen Reader Support
${accessibility.screenReaderSupport}`);
  }

  if (accessibility.focusManagement) {
    sections.push(`### Focus Management
${accessibility.focusManagement}`);
  }

  if (accessibility.guidelines?.length) {
    sections.push(`### Guidelines
${accessibility.guidelines.map(guideline => `- ${guideline}`).join('\n')}`);
  }

  return sections.length > 0 
    ? `## Accessibility\n\n${sections.join('\n\n')}`
    : `## Accessibility

This component follows WCAG 2.1 AA guidelines and includes proper ARIA attributes and keyboard navigation support.`;
}

function generateExamples(examples: CodeExample[]): string {
  if (!examples.length) {
    return `## Examples

No examples available yet.`;
  }

  const exampleSections = examples.map(example => {
    const title = example.title;
    const description = example.description ? `\n${example.description}\n` : '';
    
    return `### ${title}${description}
\`\`\`${example.language}
${example.code}
\`\`\``;
  }).join('\n\n');

  return `## Examples

${exampleSections}`;
}

function generateRelatedComponents(relatedComponents?: string[]): string {
  if (!relatedComponents?.length) {
    return '';
  }

  return `## Related Components

${relatedComponents.map(comp => `- [${comp}](../${comp}/README.md)`).join('\n')}`;
}

function generateFooter(doc: ComponentDocumentation): string {
  const lastUpdated = doc.lastUpdated || new Date().toISOString().split('T')[0];
  const version = doc.version || '1.0.0';
  
  return `---

**Version:** ${version} | **Last Updated:** ${lastUpdated}

Part of [SV Project Helper UI Library](../../README.md)`;
}

/**
 * Get available documentation templates
 */
export function getDocumentationTemplates(): DocumentationTemplate[] {
  return [
    {
      name: 'Component',
      category: 'atoms',
      template: 'component-readme',
      requiredSections: ['Overview', 'Usage', 'Props', 'Accessibility', 'Examples']
    },
    {
      name: 'Hook',
      category: 'hooks',
      template: 'hook-readme',
      requiredSections: ['Overview', 'Usage', 'Parameters', 'Return Value', 'Examples']
    },
    {
      name: 'Utility',
      category: 'utils',
      template: 'utility-readme',
      requiredSections: ['Overview', 'Usage', 'API', 'Examples']
    }
  ];
}

/**
 * Validate that a README contains all required sections
 */
export function validateDocumentation(content: string, template: DocumentationTemplate): string[] {
  const errors: string[] = [];
  
  template.requiredSections.forEach(section => {
    const sectionRegex = new RegExp(`^##\\s+${section}`, 'm');
    if (!sectionRegex.test(content)) {
      errors.push(`Missing required section: ${section}`);
    }
  });

  return errors;
}