/**
 * Specialized templates for different component categories
 */

import type {
  ComponentDocumentation,
  ComponentCategory,
  UsageExample,
  PropDefinition
} from '../types/index.ts';
import { MarkdownTemplateEngine, type TemplateOptions } from './MarkdownTemplateEngine.ts';

export class ComponentTemplates extends MarkdownTemplateEngine {
  constructor(options: TemplateOptions = {}) {
    super(options);
  }

  /**
   * Render template optimized for atomic components (buttons, inputs, etc.)
   */
  renderAtomTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Atomic Component** - ${this.getAtomDescription(component.metadata.name)}

${this.renderQuickUsage(component)}

### Props

${this.renderPropsTable(component.api.props)}

${component.styling.variants.length > 0 ? `### Variants

${this.renderVariantsSection(component.styling.variants)}` : ''}

${component.accessibility.ariaAttributes.length > 0 ? `### Accessibility

${this.renderAccessibilitySection(component.accessibility)}` : ''}

### Examples

${this.renderProgressiveExamples(component.examples)}

${this.renderImplementationNotes(component)}
    `.trim();
  }

  /**
   * Render template optimized for molecular components (cards, menus, etc.)
   */
  renderMoleculeTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Molecular Component** - ${this.getMoleculeDescription(component.metadata.name)}

${this.renderQuickUsage(component)}

### Component Structure

${this.renderComponentStructure(component)}

### API Reference

${this.renderFullAPI(component.api)}

${component.styling.cssProperties.length > 0 ? `### Styling

${this.renderStylingSection(component.styling)}` : ''}

### Accessibility

${this.renderAccessibilitySection(component.accessibility)}

### Usage Patterns

${this.renderUsagePatterns(component.examples)}

${component.relatedComponents.length > 0 ? `### Related Components

${this.renderRelatedComponents(component.relatedComponents)}` : ''}
    `.trim();
  }

  /**
   * Render template optimized for organism components (complex forms, data tables, etc.)
   */
  renderOrganismTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Organism Component** - ${this.getOrganismDescription(component.metadata.name)}

${this.renderQuickUsage(component)}

### Architecture Overview

${this.renderArchitectureOverview(component)}

### Complete API Reference

${this.renderFullAPI(component.api)}

### Configuration

${this.renderConfigurationSection(component)}

### Theming & Customization

${this.renderThemingSection(component.styling)}

### Accessibility Features

${this.renderAccessibilitySection(component.accessibility)}

### Integration Examples

${this.renderIntegrationExamples(component.examples)}

### Performance Considerations

${this.renderPerformanceNotes(component)}

${component.relatedComponents.length > 0 ? `### Component Ecosystem

${this.renderRelatedComponents(component.relatedComponents)}` : ''}
    `.trim();
  }

  /**
   * Render template optimized for layout components
   */
  renderLayoutTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Layout Component** - ${this.getLayoutDescription(component.metadata.name)}

${this.renderQuickUsage(component)}

### Layout Properties

${this.renderLayoutProperties(component.api.props)}

### Responsive Behavior

${this.renderResponsiveBehavior(component)}

### Grid System Integration

${this.renderGridIntegration(component)}

### Examples

${this.renderLayoutExamples(component.examples)}

### Best Practices

${this.renderLayoutBestPractices(component)}
    `.trim();
  }

  /**
   * Render template optimized for utility components
   */
  renderUtilTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Utility Component** - ${this.getUtilDescription(component.metadata.name)}

${this.renderQuickUsage(component)}

### Purpose & Use Cases

${this.renderUtilPurpose(component)}

### API Reference

${this.renderFullAPI(component.api)}

### Implementation Examples

${this.renderUtilExamples(component.examples)}

### Integration Patterns

${this.renderUtilIntegrationPatterns(component)}
    `.trim();
  }

  /**
   * Render template optimized for hook components
   */
  renderHookTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Svelte 5 Hook** - ${this.getHookDescription(component.metadata.name)}

${this.renderHookUsage(component)}

### Hook API

${this.renderHookAPI(component.api)}

### State Management

${this.renderHookStateManagement(component)}

### Examples

${this.renderHookExamples(component.examples)}

### Integration with Components

${this.renderHookIntegration(component)}
    `.trim();
  }

  /**
   * Route to appropriate template based on component category
   */
  renderCategoryTemplate(component: ComponentDocumentation): string {
    switch (component.metadata.category) {
      case 'atom':
        return this.renderAtomTemplate(component);
      case 'molecule':
        return this.renderMoleculeTemplate(component);
      case 'organism':
        return this.renderOrganismTemplate(component);
      case 'layout':
        return this.renderLayoutTemplate(component);
      case 'util':
        return this.renderUtilTemplate(component);
      case 'hook':
        return this.renderHookTemplate(component);
      default:
        return this.renderComponentTemplate(component);
    }
  }

  private renderQuickUsage(component: ComponentDocumentation): string {
    const basicExample = component.examples.find(ex => ex.complexity === 'basic');
    if (!basicExample) return '';

    return this.template`
### Quick Start

\`\`\`svelte
${basicExample.code}
\`\`\`
    `.trim();
  }

  private renderComponentStructure(component: ComponentDocumentation): string {
    const hasSlots = component.api.slots.length > 0;
    const hasEvents = component.api.events.length > 0;
    
    return this.template`
This component is composed of:
- **Props**: ${component.api.props.length} configurable properties
${hasSlots ? `- **Slots**: ${component.api.slots.length} content areas` : ''}
${hasEvents ? `- **Events**: ${component.api.events.length} user interactions` : ''}
- **Styling**: ${component.styling.variants.length} variants available
    `.trim();
  }

  private renderFullAPI(api: any): string {
    return this.renderAPIReferenceTemplate(
      api.props || [],
      api.events || [],
      api.slots || [],
      api.methods || []
    );
  }

  private renderVariantsSection(variants: any[]): string {
    return variants.map(variant => this.template`
#### ${variant.name}

${variant.description}

\`\`\`css
${Object.entries(variant.properties).map(([key, value]) => `${key}: ${value};`).join('\n')}
\`\`\`
    `.trim()).join('\n\n');
  }

  private renderAccessibilitySection(accessibility: any): string {
    const sections: string[] = [];

    if (accessibility.ariaAttributes.length > 0) {
      sections.push('**ARIA Support:**');
      accessibility.ariaAttributes.forEach((attr: any) => {
        sections.push(`- \`${attr.name}\`: ${attr.description}`);
      });
    }

    if (accessibility.keyboardNavigation.length > 0) {
      sections.push('**Keyboard Navigation:**');
      accessibility.keyboardNavigation.forEach((nav: any) => {
        sections.push(`- **${nav.key}**: ${nav.description}`);
      });
    }

    return sections.join('\n');
  }

  private renderProgressiveExamples(examples: UsageExample[]): string {
    const basic = examples.filter(ex => ex.complexity === 'basic');
    const intermediate = examples.filter(ex => ex.complexity === 'intermediate');
    
    let result = '';
    
    if (basic.length > 0) {
      result += '#### Basic Usage\n\n';
      result += basic.map(ex => this.renderExample(ex)).join('\n\n');
    }
    
    if (intermediate.length > 0) {
      result += '\n\n#### Advanced Usage\n\n';
      result += intermediate.map(ex => this.renderExample(ex)).join('\n\n');
    }
    
    return result;
  }

  private renderExample(example: UsageExample): string {
    return this.template`
**${example.title}**

${example.description}

\`\`\`${example.language}
${example.code}
\`\`\`
    `.trim();
  }

  private renderImplementationNotes(component: ComponentDocumentation): string {
    return this.template`
### Implementation Notes

- **File**: \`${component.metadata.filePath}\`
- **Category**: ${component.metadata.category}
- **Last Updated**: ${component.metadata.lastUpdated.toDateString()}
${component.metadata.dependencies.length > 0 ? `- **Dependencies**: ${component.metadata.dependencies.join(', ')}` : ''}
    `.trim();
  }

  private renderStylingSection(styling: any): string {
    const sections: string[] = [];

    if (styling.cssProperties.length > 0) {
      sections.push('**CSS Custom Properties:**');
      styling.cssProperties.forEach((prop: any) => {
        sections.push(`- \`${prop.name}\`: ${prop.description} (default: \`${prop.defaultValue}\`)`);
      });
    }

    return sections.join('\n');
  }

  private renderUsagePatterns(examples: UsageExample[]): string {
    return examples.map(example => this.template`
#### ${example.title}

${example.description}

\`\`\`${example.language}
${example.code}
\`\`\`
    `.trim()).join('\n\n');
  }

  private renderRelatedComponents(relatedComponents: string[]): string {
    return relatedComponents.map(name => `- [${name}](#${this.slugify(name)})`).join('\n');
  }

  private renderArchitectureOverview(component: ComponentDocumentation): string {
    return this.template`
Complex component with ${component.api.props.length} props, ${component.api.events.length} events, and ${component.api.slots.length} slots.

**Key Features:**
${component.bestPractices.slice(0, 3).map(practice => `- ${practice.title}`).join('\n')}
    `.trim();
  }

  private renderConfigurationSection(component: ComponentDocumentation): string {
    const requiredProps = component.api.props.filter(prop => prop.required);
    const optionalProps = component.api.props.filter(prop => !prop.required);

    return this.template`
**Required Configuration:**
${requiredProps.map(prop => `- \`${prop.name}\`: ${prop.description}`).join('\n')}

**Optional Configuration:**
${optionalProps.slice(0, 5).map(prop => `- \`${prop.name}\`: ${prop.description}`).join('\n')}
    `.trim();
  }

  private renderThemingSection(styling: any): string {
    return this.template`
**Customizable Properties:**
${styling.cssProperties.map((prop: any) => `- \`${prop.name}\`: ${prop.description}`).join('\n')}

**Available Variants:**
${styling.variants.map((variant: any) => `- **${variant.name}**: ${variant.description}`).join('\n')}
    `.trim();
  }

  private renderIntegrationExamples(examples: UsageExample[]): string {
    const advanced = examples.filter(ex => ex.complexity === 'advanced');
    return advanced.map(ex => this.renderExample(ex)).join('\n\n');
  }

  private renderPerformanceNotes(component: ComponentDocumentation): string {
    return this.template`
**Performance Considerations:**
- Optimized for large datasets
- Implements virtual scrolling when applicable
- Lazy loading of complex sub-components
- Efficient event handling patterns
    `.trim();
  }

  // Helper methods for component descriptions
  private getAtomDescription(name: string): string {
    const descriptions: Record<string, string> = {
      'Button': 'Interactive element for user actions',
      'Input': 'Text input field with validation',
      'Text': 'Typography component with theme integration',
      'Icon': 'SVG icon with accessibility support'
    };
    return descriptions[name] || 'Fundamental UI building block';
  }

  private getMoleculeDescription(name: string): string {
    const descriptions: Record<string, string> = {
      'Card': 'Container component with glassmorphism styling',
      'Menu': 'Navigation component with keyboard support',
      'Alert': 'Notification component with accessibility features'
    };
    return descriptions[name] || 'Composed component combining multiple atoms';
  }

  private getOrganismDescription(name: string): string {
    const descriptions: Record<string, string> = {
      'DataTable': 'Complex data display with sorting and filtering',
      'Chat': 'Real-time messaging interface',
      'Form': 'Complete form solution with validation'
    };
    return descriptions[name] || 'Complex component with multiple features';
  }

  private getLayoutDescription(name: string): string {
    return 'Layout component for page structure and responsive design';
  }

  private getUtilDescription(name: string): string {
    return 'Utility component providing enhanced functionality';
  }

  private getHookDescription(name: string): string {
    return 'Svelte 5 rune-based hook for state management';
  }

  // Additional specialized rendering methods would continue here...
  private renderLayoutProperties(props: PropDefinition[]): string {
    return this.renderPropsTable(props);
  }

  private renderResponsiveBehavior(component: ComponentDocumentation): string {
    return 'Responsive behavior documentation would be rendered here based on component analysis.';
  }

  private renderGridIntegration(component: ComponentDocumentation): string {
    return 'Grid system integration details would be rendered here.';
  }

  private renderLayoutExamples(examples: UsageExample[]): string {
    return this.renderUsagePatterns(examples);
  }

  private renderLayoutBestPractices(component: ComponentDocumentation): string {
    return component.bestPractices.map(practice => `- ${practice.title}: ${practice.description}`).join('\n');
  }

  private renderUtilPurpose(component: ComponentDocumentation): string {
    return `Purpose and use cases for ${component.metadata.name} utility component.`;
  }

  private renderUtilExamples(examples: UsageExample[]): string {
    return this.renderUsagePatterns(examples);
  }

  private renderUtilIntegrationPatterns(component: ComponentDocumentation): string {
    return 'Integration patterns for utility components.';
  }

  private renderHookUsage(component: ComponentDocumentation): string {
    const basicExample = component.examples.find(ex => ex.complexity === 'basic');
    return basicExample ? this.template`
### Usage

\`\`\`typescript
${basicExample.code}
\`\`\`
    `.trim() : '';
  }

  private renderHookAPI(api: any): string {
    return this.renderFullAPI(api);
  }

  private renderHookStateManagement(component: ComponentDocumentation): string {
    return 'State management details for this hook.';
  }

  private renderHookExamples(examples: UsageExample[]): string {
    return this.renderUsagePatterns(examples);
  }

  private renderHookIntegration(component: ComponentDocumentation): string {
    return 'Integration patterns with other components.';
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
}