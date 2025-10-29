/**
 * API Reference Generator - Creates structured API documentation for components
 */

import type {
  ComponentDocumentation,
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  MethodDefinition,
  ComponentAPI,
  TypeDefinition,
  ResolvedType
} from '../types/index.ts';

export interface APIReferenceOptions {
  includeInternalProps?: boolean;
  includeDeprecated?: boolean;
  includeExamples?: boolean;
  sortAlphabetically?: boolean;
  includeTypeDefinitions?: boolean;
}

export interface APIReferenceSection {
  title: string;
  content: string;
  anchor: string;
}

export interface GeneratedAPIReference {
  sections: APIReferenceSection[];
  tableOfContents: string;
  fullContent: string;
  metadata: {
    componentName: string;
    propsCount: number;
    eventsCount: number;
    slotsCount: number;
    methodsCount: number;
    generatedAt: Date;
  };
}

export class APIReferenceGenerator {
  private readonly defaultOptions: APIReferenceOptions = {
    includeInternalProps: false,
    includeDeprecated: true,
    includeExamples: true,
    sortAlphabetically: true,
    includeTypeDefinitions: true
  };

  constructor(private options: APIReferenceOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  /**
   * Generate complete API reference for a component
   */
  generateAPIReference(component: ComponentDocumentation): GeneratedAPIReference {
    const sections: APIReferenceSection[] = [];
    
    // Generate props section
    if (component.api.props.length > 0) {
      sections.push(this.generatePropsSection(component.api.props, component.metadata.name));
    }

    // Generate events section
    if (component.api.events.length > 0) {
      sections.push(this.generateEventsSection(component.api.events, component.metadata.name));
    }

    // Generate slots section
    if (component.api.slots.length > 0) {
      sections.push(this.generateSlotsSection(component.api.slots, component.metadata.name));
    }

    // Generate methods section
    if (component.api.methods.length > 0) {
      sections.push(this.generateMethodsSection(component.api.methods, component.metadata.name));
    }

    // Generate type definitions section
    if (this.options.includeTypeDefinitions) {
      sections.push(this.generateTypeDefinitionsSection(component));
    }

    const tableOfContents = this.generateTableOfContents(sections);
    const fullContent = this.combineAllSections(sections, component.metadata.name);

    return {
      sections,
      tableOfContents,
      fullContent,
      metadata: {
        componentName: component.metadata.name,
        propsCount: component.api.props.length,
        eventsCount: component.api.events.length,
        slotsCount: component.api.slots.length,
        methodsCount: component.api.methods.length,
        generatedAt: new Date()
      }
    };
  }

  /**
   * Generate props documentation section
   */
  generatePropsSection(props: PropDefinition[], componentName: string): APIReferenceSection {
    const filteredProps = this.filterProps(props);
    const sortedProps = this.options.sortAlphabetically 
      ? filteredProps.sort((a, b) => a.name.localeCompare(b.name))
      : filteredProps;

    const content = this.template`
### Props

${this.generatePropsTable(sortedProps)}

${this.generatePropsDetails(sortedProps)}
    `.trim();

    return {
      title: 'Props',
      content,
      anchor: 'props'
    };
  }

  /**
   * Generate events documentation section
   */
  generateEventsSection(events: EventDefinition[], componentName: string): APIReferenceSection {
    const sortedEvents = this.options.sortAlphabetically
      ? events.sort((a, b) => a.name.localeCompare(b.name))
      : events;

    const content = this.template`
### Events

${this.generateEventsTable(sortedEvents)}

${this.generateEventsDetails(sortedEvents)}
    `.trim();

    return {
      title: 'Events',
      content,
      anchor: 'events'
    };
  }

  /**
   * Generate slots documentation section
   */
  generateSlotsSection(slots: SlotDefinition[], componentName: string): APIReferenceSection {
    const sortedSlots = this.options.sortAlphabetically
      ? slots.sort((a, b) => a.name.localeCompare(b.name))
      : slots;

    const content = this.template`
### Slots

${this.generateSlotsTable(sortedSlots)}

${this.generateSlotsDetails(sortedSlots)}
    `.trim();

    return {
      title: 'Slots',
      content,
      anchor: 'slots'
    };
  }

  /**
   * Generate methods documentation section
   */
  generateMethodsSection(methods: MethodDefinition[], componentName: string): APIReferenceSection {
    const sortedMethods = this.options.sortAlphabetically
      ? methods.sort((a, b) => a.name.localeCompare(b.name))
      : methods;

    const content = this.template`
### Methods

${this.generateMethodsTable(sortedMethods)}

${this.generateMethodsDetails(sortedMethods)}
    `.trim();

    return {
      title: 'Methods',
      content,
      anchor: 'methods'
    };
  }

  /**
   * Generate type definitions section
   */
  generateTypeDefinitionsSection(component: ComponentDocumentation): APIReferenceSection {
    const content = this.template`
### Type Definitions

\`\`\`typescript
// Props interface for ${component.metadata.name}
interface ${component.metadata.name}Props {
${component.api.props.map(prop => 
  `  ${prop.name}${prop.required ? '' : '?'}: ${prop.type};${prop.description ? ` // ${prop.description}` : ''}`
).join('\n')}
}

${component.api.events.length > 0 ? `// Event types for ${component.metadata.name}
${component.api.events.map(event => 
  `type ${component.metadata.name}${this.capitalize(event.name)}Event = CustomEvent<${event.payload || 'any'}>;`
).join('\n')}` : ''}

${component.api.slots.length > 0 ? `// Slot prop types for ${component.metadata.name}
${component.api.slots.map(slot => 
  slot.props ? `interface ${component.metadata.name}${this.capitalize(slot.name)}SlotProps {
${Object.entries(slot.props).map(([key, value]) => `  ${key}: ${value};`).join('\n')}
}` : ''
).filter(Boolean).join('\n\n')}` : ''}
\`\`\`
    `.trim();

    return {
      title: 'Type Definitions',
      content,
      anchor: 'type-definitions'
    };
  }

  /**
   * Generate comprehensive props table
   */
  private generatePropsTable(props: PropDefinition[]): string {
    if (props.length === 0) return '';

    const headers = ['Name', 'Type', 'Required', 'Default', 'Description'];
    const rows = props.map(prop => [
      `\`${prop.name}\`${prop.deprecated ? ' ⚠️' : ''}`,
      `\`${this.formatType(prop.type)}\``,
      prop.required ? '✓' : '',
      prop.defaultValue !== undefined ? `\`${this.formatDefaultValue(prop.defaultValue)}\`` : '',
      prop.description + (prop.deprecated ? ' *(Deprecated)*' : '')
    ]);

    return this.generateMarkdownTable(headers, rows);
  }

  /**
   * Generate detailed props documentation
   */
  private generatePropsDetails(props: PropDefinition[]): string {
    if (props.length === 0 || !this.options.includeExamples) return '';

    return props.map(prop => this.template`
#### \`${prop.name}\`

${prop.description}

- **Type:** \`${prop.type}\`
- **Required:** ${prop.required ? 'Yes' : 'No'}
${prop.defaultValue !== undefined ? `- **Default:** \`${this.formatDefaultValue(prop.defaultValue)}\`` : ''}
${prop.deprecated ? '- **Status:** ⚠️ Deprecated' : ''}

${this.generatePropExample(prop)}
    `.trim()).join('\n\n');
  }

  /**
   * Generate events table
   */
  private generateEventsTable(events: EventDefinition[]): string {
    if (events.length === 0) return '';

    const headers = ['Event', 'Type', 'Description', 'Payload'];
    const rows = events.map(event => [
      `\`${event.name}\``,
      `\`${event.type}\``,
      event.description,
      event.payload ? `\`${event.payload}\`` : ''
    ]);

    return this.generateMarkdownTable(headers, rows);
  }

  /**
   * Generate detailed events documentation
   */
  private generateEventsDetails(events: EventDefinition[]): string {
    if (events.length === 0 || !this.options.includeExamples) return '';

    return events.map(event => this.template`
#### \`${event.name}\`

${event.description}

- **Type:** \`${event.type}\`
${event.payload ? `- **Payload:** \`${event.payload}\`` : ''}

${this.generateEventExample(event)}
    `.trim()).join('\n\n');
  }

  /**
   * Generate slots table
   */
  private generateSlotsTable(slots: SlotDefinition[]): string {
    if (slots.length === 0) return '';

    const headers = ['Slot', 'Description', 'Props'];
    const rows = slots.map(slot => [
      `\`${slot.name}\``,
      slot.description,
      slot.props ? Object.entries(slot.props).map(([key, value]) => `${key}: \`${value}\``).join('<br>') : ''
    ]);

    return this.generateMarkdownTable(headers, rows);
  }

  /**
   * Generate detailed slots documentation
   */
  private generateSlotsDetails(slots: SlotDefinition[]): string {
    if (slots.length === 0 || !this.options.includeExamples) return '';

    return slots.map(slot => this.template`
#### \`${slot.name}\`

${slot.description}

${slot.props ? `**Available Props:**
${Object.entries(slot.props).map(([key, value]) => `- \`${key}\`: \`${value}\``).join('\n')}` : ''}

${this.generateSlotExample(slot)}
    `.trim()).join('\n\n');
  }

  /**
   * Generate methods table
   */
  private generateMethodsTable(methods: MethodDefinition[]): string {
    if (methods.length === 0) return '';

    const headers = ['Method', 'Parameters', 'Return Type', 'Description'];
    const rows = methods.map(method => [
      `\`${method.name}\``,
      method.parameters.map(p => `${p.name}: \`${p.type}\``).join('<br>'),
      `\`${method.returnType}\``,
      method.description
    ]);

    return this.generateMarkdownTable(headers, rows);
  }

  /**
   * Generate detailed methods documentation
   */
  private generateMethodsDetails(methods: MethodDefinition[]): string {
    if (methods.length === 0 || !this.options.includeExamples) return '';

    return methods.map(method => this.template`
#### \`${method.name}\`

${method.description}

**Parameters:**
${method.parameters.map(param => 
  `- \`${param.name}\` (\`${param.type}\`)${param.required ? ' *required*' : ''}: ${param.description}`
).join('\n')}

**Returns:** \`${method.returnType}\`

${this.generateMethodExample(method)}
    `.trim()).join('\n\n');
  }

  /**
   * Generate table of contents for API sections
   */
  private generateTableOfContents(sections: APIReferenceSection[]): string {
    return sections.map(section => 
      `- [${section.title}](#${section.anchor})`
    ).join('\n');
  }

  /**
   * Combine all sections into full content
   */
  private combineAllSections(sections: APIReferenceSection[], componentName: string): string {
    return this.template`
## ${componentName} API Reference

${sections.map(section => section.content).join('\n\n')}
    `.trim();
  }

  /**
   * Filter props based on options
   */
  private filterProps(props: PropDefinition[]): PropDefinition[] {
    let filtered = props;

    if (!this.options.includeInternalProps) {
      filtered = filtered.filter(prop => !prop.name.startsWith('_'));
    }

    if (!this.options.includeDeprecated) {
      filtered = filtered.filter(prop => !prop.deprecated);
    }

    return filtered;
  }

  /**
   * Generate markdown table from headers and rows
   */
  private generateMarkdownTable(headers: string[], rows: string[][]): string {
    const headerRow = `| ${headers.join(' | ')} |`;
    const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
    const dataRows = rows.map(row => `| ${row.join(' | ')} |`);

    return [headerRow, separatorRow, ...dataRows].join('\n');
  }

  /**
   * Format type for display
   */
  private formatType(type: string): string {
    // Simplify complex union types for readability
    if (type.length > 50) {
      return type.substring(0, 47) + '...';
    }
    return type;
  }

  /**
   * Format default value for display
   */
  private formatDefaultValue(value: any): string {
    if (typeof value === 'string') {
      return `"${value}"`;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  /**
   * Generate example for a prop
   */
  private generatePropExample(prop: PropDefinition): string {
    return this.template`
**Example:**
\`\`\`svelte
<Component ${prop.name}={${this.generateExampleValue(prop.type)}} />
\`\`\`
    `.trim();
  }

  /**
   * Generate example for an event
   */
  private generateEventExample(event: EventDefinition): string {
    return this.template`
**Example:**
\`\`\`svelte
<Component on:${event.name}={handleEvent} />

<script>
  function handleEvent(event) {
    console.log('${event.name}:', event.detail);
  }
</script>
\`\`\`
    `.trim();
  }

  /**
   * Generate example for a slot
   */
  private generateSlotExample(slot: SlotDefinition): string {
    const slotContent = slot.props 
      ? `{#snippet ${slot.name}(${Object.keys(slot.props).join(', ')})}\n  <!-- Your content here -->\n{/snippet}`
      : `{#snippet ${slot.name}()}\n  <!-- Your content here -->\n{/snippet}`;

    return this.template`
**Example:**
\`\`\`svelte
<Component>
  ${slotContent}
</Component>
\`\`\`
    `.trim();
  }

  /**
   * Generate example for a method
   */
  private generateMethodExample(method: MethodDefinition): string {
    const params = method.parameters.map(p => this.generateExampleValue(p.type)).join(', ');
    
    return this.template`
**Example:**
\`\`\`svelte
<script>
  let componentRef;
  
  function callMethod() {
    const result = componentRef.${method.name}(${params});
    console.log('Result:', result);
  }
</script>

<Component bind:this={componentRef} />
<button on:click={callMethod}>Call ${method.name}</button>
\`\`\`
    `.trim();
  }

  /**
   * Generate example value based on type
   */
  private generateExampleValue(type: string): string {
    const typeMap: Record<string, string> = {
      'string': '"example"',
      'number': '42',
      'boolean': 'true',
      'array': '[]',
      'object': '{}',
      'function': '() => {}',
      'Date': 'new Date()',
      'Promise': 'Promise.resolve()'
    };

    // Handle union types
    if (type.includes('|')) {
      const firstType = type.split('|')[0].trim();
      return typeMap[firstType] || `/* ${firstType} */`;
    }

    // Handle array types
    if (type.endsWith('[]')) {
      return '[]';
    }

    // Handle generic types
    if (type.includes('<')) {
      const baseType = type.split('<')[0];
      return typeMap[baseType] || `/* ${type} */`;
    }

    return typeMap[type] || `/* ${type} */`;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
}