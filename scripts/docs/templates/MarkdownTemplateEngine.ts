/**
 * Markdown template engine for generating LLM-optimized documentation
 */

import type {
  ComponentDocumentation,
  LLMDocumentation,
  UsageExample,
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  MethodDefinition,
  AccessibilityGuide,
  ComponentStyling
} from '../types/index.ts';

export interface TemplateContext {
  component?: ComponentDocumentation;
  documentation?: LLMDocumentation;
  [key: string]: any;
}

export interface TemplateOptions {
  includeTableOfContents?: boolean;
  maxExampleLength?: number;
  includeSourceLinks?: boolean;
  optimizeForLLM?: boolean;
}

export class MarkdownTemplateEngine {
  private readonly defaultOptions: TemplateOptions = {
    includeTableOfContents: true,
    maxExampleLength: 1000,
    includeSourceLinks: true,
    optimizeForLLM: true
  };

  constructor(private options: TemplateOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  /**
   * Render the main LLM documentation template
   */
  renderMainTemplate(documentation: LLMDocumentation): string {
    const context: TemplateContext = { documentation };
    
    return this.template`
# ${documentation.header.title}

${this.renderDocumentationHeader(documentation.header)}

${this.options.includeTableOfContents ? this.renderTableOfContents(documentation) : ''}

## Quick Reference

${this.renderQuickReference(documentation.quickReference)}

## Design System

${this.renderDesignSystem(documentation.designSystem)}

## Components

${this.renderComponentsByCategory(documentation.components)}

## Usage Patterns

${this.renderUsagePatterns(documentation.patterns)}

## Accessibility Guide

${this.renderGlobalAccessibilityGuide(documentation.accessibility)}

## Troubleshooting

${this.renderTroubleshootingGuide(documentation.troubleshooting)}

---

*Generated on ${documentation.header.lastGenerated.toISOString()}*
    `.trim();
  }

  /**
   * Render individual component documentation template
   */
  renderComponentTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

${component.api.props.length > 0 ? `**Category:** ${component.metadata.category}` : ''}

${component.metadata.dependencies.length > 0 ? `**Dependencies:** ${component.metadata.dependencies.join(', ')}` : ''}

### API Reference

${this.renderComponentAPI(component.api)}

### Styling

${this.renderComponentStyling(component.styling)}

### Accessibility

${this.renderAccessibilityGuide(component.accessibility)}

### Examples

${this.renderExamples(component.examples)}

${component.bestPractices.length > 0 ? `### Best Practices

${this.renderBestPractices(component.bestPractices)}` : ''}

${component.relatedComponents.length > 0 ? `### Related Components

${component.relatedComponents.map(name => `- [${name}](#${this.slugify(name)})`).join('\n')}` : ''}
    `.trim();
  }

  /**
   * Render API reference template for props, events, slots, and methods
   */
  renderAPIReferenceTemplate(
    props: PropDefinition[],
    events: EventDefinition[],
    slots: SlotDefinition[],
    methods: MethodDefinition[]
  ): string {
    return this.template`
${props.length > 0 ? `#### Props

${this.renderPropsTable(props)}` : ''}

${events.length > 0 ? `#### Events

${this.renderEventsTable(events)}` : ''}

${slots.length > 0 ? `#### Slots

${this.renderSlotsTable(slots)}` : ''}

${methods.length > 0 ? `#### Methods

${this.renderMethodsTable(methods)}` : ''}
    `.trim();
  }

  /**
   * Render usage examples template with progressive complexity
   */
  renderUsageExamplesTemplate(examples: UsageExample[]): string {
    const basicExamples = examples.filter(ex => ex.complexity === 'basic');
    const intermediateExamples = examples.filter(ex => ex.complexity === 'intermediate');
    const advancedExamples = examples.filter(ex => ex.complexity === 'advanced');

    return this.template`
${basicExamples.length > 0 ? `#### Basic Usage

${basicExamples.map(ex => this.renderExample(ex)).join('\n\n')}` : ''}

${intermediateExamples.length > 0 ? `#### Intermediate Usage

${intermediateExamples.map(ex => this.renderExample(ex)).join('\n\n')}` : ''}

${advancedExamples.length > 0 ? `#### Advanced Usage

${advancedExamples.map(ex => this.renderExample(ex)).join('\n\n')}` : ''}
    `.trim();
  }

  private renderDocumentationHeader(header: any): string {
    return this.template`
**Version:** ${header.version}  
**Last Generated:** ${header.lastGenerated.toISOString()}

${header.description}
    `.trim();
  }

  private renderTableOfContents(documentation: LLMDocumentation): string {
    const toc = [
      '## Table of Contents',
      '',
      '- [Quick Reference](#quick-reference)',
      '- [Design System](#design-system)',
      '- [Components](#components)'
    ];

    // Add component categories
    const categories = Object.keys(documentation.components);
    categories.forEach(category => {
      const components = (documentation.components as any)[category];
      if (components.length > 0) {
        toc.push(`  - [${this.capitalize(category)}](#${this.slugify(category)})`);
        components.forEach((comp: ComponentDocumentation) => {
          toc.push(`    - [${comp.metadata.name}](#${this.slugify(comp.metadata.name)})`);
        });
      }
    });

    toc.push('- [Usage Patterns](#usage-patterns)');
    toc.push('- [Accessibility Guide](#accessibility-guide)');
    toc.push('- [Troubleshooting](#troubleshooting)');

    return toc.join('\n');
  }

  private renderQuickReference(quickRef: any): string {
    return this.template`
### Installation

\`\`\`bash
${quickRef.installation}
\`\`\`

### Basic Usage

\`\`\`typescript
${quickRef.basicUsage}
\`\`\`

${quickRef.commonPatterns.length > 0 ? `### Common Patterns

${quickRef.commonPatterns.map((pattern: string) => `- ${pattern}`).join('\n')}` : ''}
    `.trim();
  }

  private renderDesignSystem(designSystem: any): string {
    return this.template`
### Theme System

${this.renderThemeDocumentation(designSystem.theme)}

### Component Overview

${designSystem.components.map((comp: any) => 
  `- **${comp.name}** (${comp.category}): ${comp.description}`
).join('\n')}
    `.trim();
  }

  private renderThemeDocumentation(theme: any): string {
    return this.template`
#### CSS Custom Properties

${theme.customProperties.map((prop: any) => 
  `- \`${prop.name}\`: ${prop.defaultValue} - ${prop.description}`
).join('\n')}

${theme.glassmorphism ? `#### Glassmorphism Effects

${theme.glassmorphism.effects.map((effect: any) => 
  `- **${effect.name}**: \`${effect.backdropFilter}\` - ${effect.usage}`
).join('\n')}` : ''}

${theme.responsive ? `#### Responsive Breakpoints

${theme.responsive.breakpoints.map((bp: any) => 
  `- **${bp.name}**: ${bp.minWidth}${bp.maxWidth ? ` - ${bp.maxWidth}` : '+'} - ${bp.description}`
).join('\n')}` : ''}
    `.trim();
  }

  private renderComponentsByCategory(components: any): string {
    const sections: string[] = [];

    Object.entries(components).forEach(([category, categoryComponents]) => {
      const comps = categoryComponents as ComponentDocumentation[];
      if (comps.length > 0) {
        sections.push(`### ${this.capitalize(category)}`);
        sections.push('');
        comps.forEach(comp => {
          sections.push(this.renderComponentTemplate(comp));
          sections.push('');
        });
      }
    });

    return sections.join('\n');
  }

  private renderComponentAPI(api: any): string {
    return this.renderAPIReferenceTemplate(
      api.props || [],
      api.events || [],
      api.slots || [],
      api.methods || []
    );
  }

  private renderPropsTable(props: PropDefinition[]): string {
    if (props.length === 0) return '';

    const table = [
      '| Name | Type | Required | Default | Description |',
      '|------|------|----------|---------|-------------|'
    ];

    props.forEach(prop => {
      const required = prop.required ? '✓' : '';
      const defaultValue = prop.defaultValue !== undefined ? `\`${JSON.stringify(prop.defaultValue)}\`` : '';
      table.push(`| \`${prop.name}\` | \`${prop.type}\` | ${required} | ${defaultValue} | ${prop.description} |`);
    });

    return table.join('\n');
  }

  private renderEventsTable(events: EventDefinition[]): string {
    if (events.length === 0) return '';

    const table = [
      '| Event | Type | Description | Payload |',
      '|-------|------|-------------|---------|'
    ];

    events.forEach(event => {
      const payload = event.payload || '';
      table.push(`| \`${event.name}\` | \`${event.type}\` | ${event.description} | \`${payload}\` |`);
    });

    return table.join('\n');
  }

  private renderSlotsTable(slots: SlotDefinition[]): string {
    if (slots.length === 0) return '';

    const table = [
      '| Slot | Description | Props |',
      '|------|-------------|-------|'
    ];

    slots.forEach(slot => {
      const props = slot.props ? Object.entries(slot.props).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
      table.push(`| \`${slot.name}\` | ${slot.description} | ${props} |`);
    });

    return table.join('\n');
  }

  private renderMethodsTable(methods: MethodDefinition[]): string {
    if (methods.length === 0) return '';

    const table = [
      '| Method | Parameters | Return Type | Description |',
      '|--------|------------|-------------|-------------|'
    ];

    methods.forEach(method => {
      const params = method.parameters.map(p => `${p.name}: ${p.type}`).join(', ');
      table.push(`| \`${method.name}\` | \`${params}\` | \`${method.returnType}\` | ${method.description} |`);
    });

    return table.join('\n');
  }

  private renderComponentStyling(styling: ComponentStyling): string {
    const sections: string[] = [];

    if (styling.cssProperties.length > 0) {
      sections.push('#### CSS Properties');
      sections.push('');
      styling.cssProperties.forEach(prop => {
        sections.push(`- \`${prop.name}\`: ${prop.defaultValue} - ${prop.description}`);
      });
      sections.push('');
    }

    if (styling.variants.length > 0) {
      sections.push('#### Variants');
      sections.push('');
      styling.variants.forEach(variant => {
        sections.push(`- **${variant.name}**: ${variant.description}`);
      });
      sections.push('');
    }

    return sections.join('\n');
  }

  private renderAccessibilityGuide(accessibility: AccessibilityGuide): string {
    const sections: string[] = [];

    if (accessibility.ariaAttributes.length > 0) {
      sections.push('#### ARIA Attributes');
      sections.push('');
      accessibility.ariaAttributes.forEach(attr => {
        sections.push(`- \`${attr.name}="${attr.value}"\`: ${attr.description}`);
      });
      sections.push('');
    }

    if (accessibility.keyboardNavigation.length > 0) {
      sections.push('#### Keyboard Navigation');
      sections.push('');
      accessibility.keyboardNavigation.forEach(shortcut => {
        const keys = shortcut.modifiers ? `${shortcut.modifiers.join('+')}+${shortcut.key}` : shortcut.key;
        sections.push(`- **${keys}**: ${shortcut.description}`);
      });
      sections.push('');
    }

    return sections.join('\n');
  }

  private renderExamples(examples: UsageExample[]): string {
    return this.renderUsageExamplesTemplate(examples);
  }

  private renderExample(example: UsageExample): string {
    const code = this.options.maxExampleLength && example.code.length > this.options.maxExampleLength
      ? example.code.substring(0, this.options.maxExampleLength) + '...'
      : example.code;

    return this.template`
##### ${example.title}

${example.description}

\`\`\`${example.language}
${code}
\`\`\`
    `.trim();
  }

  private renderBestPractices(bestPractices: any[]): string {
    return bestPractices.map(practice => 
      `- **${practice.title}**: ${practice.description}`
    ).join('\n');
  }

  private renderUsagePatterns(patterns: any[]): string {
    return patterns.map(pattern => this.template`
### ${pattern.name}

${pattern.description}

**Components:** ${pattern.components.join(', ')}

\`\`\`svelte
${pattern.example}
\`\`\`

**Best Practices:**
${pattern.bestPractices.map((practice: string) => `- ${practice}`).join('\n')}
    `.trim()).join('\n\n');
  }

  private renderGlobalAccessibilityGuide(accessibility: any): string {
    return this.template`
${accessibility.overview}

### WCAG Compliance

${accessibility.wcagCompliance.map((compliance: any) => 
  `- **${compliance.criterion}** (${compliance.level}): ${compliance.description}`
).join('\n')}

### Keyboard Navigation Patterns

${accessibility.keyboardNavigation.map((pattern: any) => 
  `- **${pattern.name}**: ${pattern.shortcuts.map((s: any) => s.key).join(', ')}`
).join('\n')}
    `.trim();
  }

  private renderTroubleshootingGuide(troubleshooting: any): string {
    return this.template`
### Common Issues

${troubleshooting.commonIssues.map((issue: any) => this.template`
#### ${issue.issue}

**Symptoms:**
${issue.symptoms.map((symptom: string) => `- ${symptom}`).join('\n')}

**Solutions:**
${issue.solutions.map((solution: string) => `- ${solution}`).join('\n')}
    `.trim()).join('\n\n')}

### FAQ

${troubleshooting.faq.map((faq: any) => this.template`
#### ${faq.question}

${faq.answer}
    `.trim()).join('\n\n')}
    `.trim();
  }

  private template(strings: TemplateStringsArray, ...values: any[]): string {
    let result = '';
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < values.length) {
        result += values[i];
      }
    }
    return result;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}