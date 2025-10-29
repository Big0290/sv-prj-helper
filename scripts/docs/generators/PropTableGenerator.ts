/**
 * Specialized generator for creating comprehensive prop tables and type documentation
 */

import type {
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  MethodDefinition,
  TypeDefinition,
  ComponentDocumentation
} from '../types/index.ts';

export interface PropTableOptions {
  includeDefaults?: boolean;
  includeExamples?: boolean;
  includeTypeLinks?: boolean;
  compactMode?: boolean;
  showDeprecated?: boolean;
}

export interface TableColumn {
  header: string;
  accessor: (item: any) => string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export class PropTableGenerator {
  private readonly defaultOptions: PropTableOptions = {
    includeDefaults: true,
    includeExamples: false,
    includeTypeLinks: true,
    compactMode: false,
    showDeprecated: true
  };

  constructor(private options: PropTableOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  /**
   * Generate comprehensive props table with enhanced formatting
   */
  generatePropsTable(props: PropDefinition[]): string {
    if (props.length === 0) return '';

    const filteredProps = this.filterProps(props);
    const columns = this.getPropsColumns();
    
    return this.generateTable(columns, filteredProps, 'Props');
  }

  /**
   * Generate events table with payload information
   */
  generateEventsTable(events: EventDefinition[]): string {
    if (events.length === 0) return '';

    const columns = this.getEventsColumns();
    
    return this.generateTable(columns, events, 'Events');
  }

  /**
   * Generate slots table with prop information
   */
  generateSlotsTable(slots: SlotDefinition[]): string {
    if (slots.length === 0) return '';

    const columns = this.getSlotsColumns();
    
    return this.generateTable(columns, slots, 'Slots');
  }

  /**
   * Generate methods table with parameters and return types
   */
  generateMethodsTable(methods: MethodDefinition[]): string {
    if (methods.length === 0) return '';

    const columns = this.getMethodsColumns();
    
    return this.generateTable(columns, methods, 'Methods');
  }

  /**
   * Generate type definitions table for complex types
   */
  generateTypeDefinitionsTable(types: TypeDefinition[]): string {
    if (types.length === 0) return '';

    const columns = this.getTypeDefinitionsColumns();
    
    return this.generateTable(columns, types, 'Type Definitions');
  }

  /**
   * Generate comprehensive API summary table
   */
  generateAPISummaryTable(component: ComponentDocumentation): string {
    const summary = [
      { category: 'Props', count: component.api.props.length, required: component.api.props.filter(p => p.required).length },
      { category: 'Events', count: component.api.events.length, required: 0 },
      { category: 'Slots', count: component.api.slots.length, required: 0 },
      { category: 'Methods', count: component.api.methods.length, required: 0 }
    ];

    const columns: TableColumn[] = [
      { header: 'API Category', accessor: (item: any) => `**${item.category}**` },
      { header: 'Total', accessor: (item: any) => item.count.toString(), align: 'center' },
      { header: 'Required', accessor: (item: any) => item.required > 0 ? item.required.toString() : '-', align: 'center' }
    ];

    return this.generateTable(columns, summary, 'API Summary');
  }

  /**
   * Generate detailed prop information with examples
   */
  generateDetailedPropsDocumentation(props: PropDefinition[]): string {
    if (props.length === 0) return '';

    const filteredProps = this.filterProps(props);
    
    return filteredProps.map(prop => this.template`
### \`${prop.name}\`

${prop.description}

${this.generatePropMetadata(prop)}

${this.options.includeExamples ? this.generatePropExamples(prop) : ''}

${prop.deprecated ? this.generateDeprecationNotice(prop) : ''}
    `.trim()).join('\n\n---\n\n');
  }

  /**
   * Generate prop metadata section
   */
  private generatePropMetadata(prop: PropDefinition): string {
    const metadata: string[] = [];
    
    metadata.push(`**Type:** \`${prop.type}\``);
    metadata.push(`**Required:** ${prop.required ? 'Yes' : 'No'}`);
    
    if (prop.defaultValue !== undefined) {
      metadata.push(`**Default:** \`${this.formatValue(prop.defaultValue)}\``);
    }
    
    if (prop.deprecated) {
      metadata.push(`**Status:** ⚠️ Deprecated`);
    }

    return metadata.join('  \n');
  }

  /**
   * Generate examples for a prop
   */
  private generatePropExamples(prop: PropDefinition): string {
    const examples = this.generatePropUsageExamples(prop);
    
    return this.template`
#### Examples

${examples.map(example => this.template`
**${example.title}:**
\`\`\`svelte
${example.code}
\`\`\`
    `.trim()).join('\n\n')}
    `.trim();
  }

  /**
   * Generate usage examples for a prop
   */
  private generatePropUsageExamples(prop: PropDefinition): Array<{title: string, code: string}> {
    const examples: Array<{title: string, code: string}> = [];
    
    // Basic usage
    examples.push({
      title: 'Basic Usage',
      code: `<Component ${prop.name}={${this.generateExampleValue(prop.type)}} />`
    });

    // Reactive usage
    if (prop.type !== 'boolean') {
      examples.push({
        title: 'Reactive Binding',
        code: this.template`
<script>
  let ${prop.name}Value = ${this.generateExampleValue(prop.type)};
</script>

<Component bind:${prop.name}={${prop.name}Value} />
        `.trim()
      });
    }

    // Conditional usage
    if (prop.type === 'boolean' || prop.type.includes('undefined')) {
      examples.push({
        title: 'Conditional Usage',
        code: this.template`
<script>
  let showFeature = true;
</script>

{#if showFeature}
  <Component ${prop.name}={${this.generateExampleValue(prop.type)}} />
{/if}
        `.trim()
      });
    }

    return examples;
  }

  /**
   * Generate deprecation notice
   */
  private generateDeprecationNotice(prop: PropDefinition): string {
    return this.template`
> ⚠️ **Deprecated**: This prop is deprecated and will be removed in a future version. Please use alternative approaches.
    `.trim();
  }

  /**
   * Get columns configuration for props table
   */
  private getPropsColumns(): TableColumn[] {
    const columns: TableColumn[] = [
      { header: 'Name', accessor: (prop: PropDefinition) => `\`${prop.name}\`${prop.deprecated ? ' ⚠️' : ''}` },
      { header: 'Type', accessor: (prop: PropDefinition) => `\`${this.formatType(prop.type)}\`` },
      { header: 'Required', accessor: (prop: PropDefinition) => prop.required ? '✓' : '', align: 'center' }
    ];

    if (this.options.includeDefaults) {
      columns.push({
        header: 'Default',
        accessor: (prop: PropDefinition) => prop.defaultValue !== undefined ? `\`${this.formatValue(prop.defaultValue)}\`` : ''
      });
    }

    columns.push({
      header: 'Description',
      accessor: (prop: PropDefinition) => prop.description + (prop.deprecated ? ' *(Deprecated)*' : '')
    });

    return columns;
  }

  /**
   * Get columns configuration for events table
   */
  private getEventsColumns(): TableColumn[] {
    return [
      { header: 'Event', accessor: (event: EventDefinition) => `\`${event.name}\`` },
      { header: 'Type', accessor: (event: EventDefinition) => `\`${event.type}\`` },
      { header: 'Payload', accessor: (event: EventDefinition) => event.payload ? `\`${event.payload}\`` : '' },
      { header: 'Description', accessor: (event: EventDefinition) => event.description }
    ];
  }

  /**
   * Get columns configuration for slots table
   */
  private getSlotsColumns(): TableColumn[] {
    return [
      { header: 'Slot', accessor: (slot: SlotDefinition) => `\`${slot.name}\`` },
      { header: 'Description', accessor: (slot: SlotDefinition) => slot.description },
      { 
        header: 'Props', 
        accessor: (slot: SlotDefinition) => slot.props 
          ? Object.entries(slot.props).map(([key, value]) => `${key}: \`${value}\``).join('<br>')
          : ''
      }
    ];
  }

  /**
   * Get columns configuration for methods table
   */
  private getMethodsColumns(): TableColumn[] {
    return [
      { header: 'Method', accessor: (method: MethodDefinition) => `\`${method.name}\`` },
      { 
        header: 'Parameters', 
        accessor: (method: MethodDefinition) => method.parameters.length > 0
          ? method.parameters.map(p => `${p.name}: \`${p.type}\``).join('<br>')
          : ''
      },
      { header: 'Returns', accessor: (method: MethodDefinition) => `\`${method.returnType}\`` },
      { header: 'Description', accessor: (method: MethodDefinition) => method.description }
    ];
  }

  /**
   * Get columns configuration for type definitions table
   */
  private getTypeDefinitionsColumns(): TableColumn[] {
    return [
      { header: 'Type', accessor: (type: TypeDefinition) => `\`${type.name}\`` },
      { header: 'Kind', accessor: (type: TypeDefinition) => type.type },
      { header: 'Description', accessor: (type: TypeDefinition) => type.description }
    ];
  }

  /**
   * Generate markdown table from columns and data
   */
  private generateTable(columns: TableColumn[], data: any[], title?: string): string {
    if (data.length === 0) return '';

    const headers = columns.map(col => col.header);
    const alignments = columns.map(col => {
      switch (col.align) {
        case 'center': return ':---:';
        case 'right': return '---:';
        default: return '---';
      }
    });
    const rows = data.map(item => columns.map(col => col.accessor(item)));

    const headerRow = `| ${headers.join(' | ')} |`;
    const separatorRow = `| ${alignments.join(' | ')} |`;
    const dataRows = rows.map(row => `| ${row.join(' | ')} |`);

    const table = [headerRow, separatorRow, ...dataRows].join('\n');
    
    return title ? `#### ${title}\n\n${table}` : table;
  }

  /**
   * Filter props based on options
   */
  private filterProps(props: PropDefinition[]): PropDefinition[] {
    let filtered = props;

    if (!this.options.showDeprecated) {
      filtered = filtered.filter(prop => !prop.deprecated);
    }

    return filtered;
  }

  /**
   * Format type for display
   */
  private formatType(type: string): string {
    // Handle long union types
    if (type.length > 40 && type.includes('|')) {
      const types = type.split('|').map(t => t.trim());
      if (types.length > 3) {
        return `${types.slice(0, 2).join(' | ')} | ...`;
      }
    }

    // Handle generic types
    if (type.includes('<') && type.length > 30) {
      const baseType = type.split('<')[0];
      return `${baseType}<...>`;
    }

    return type;
  }

  /**
   * Format value for display
   */
  private formatValue(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') {
      const str = JSON.stringify(value);
      return str.length > 30 ? `${str.substring(0, 27)}...` : str;
    }
    return String(value);
  }

  /**
   * Generate example value based on type
   */
  private generateExampleValue(type: string): string {
    const typeMap: Record<string, string> = {
      'string': '"example"',
      'number': '42',
      'boolean': 'true',
      'Date': 'new Date()',
      'Array': '[]',
      'Object': '{}',
      'Function': '() => {}'
    };

    // Handle union types - use first type
    if (type.includes('|')) {
      const firstType = type.split('|')[0].trim();
      return typeMap[firstType] || `"${firstType.toLowerCase()}"`;
    }

    // Handle array types
    if (type.endsWith('[]')) {
      return '[]';
    }

    // Handle optional types
    if (type.includes('undefined')) {
      const nonUndefinedType = type.replace(/\s*\|\s*undefined/, '').replace(/undefined\s*\|\s*/, '');
      return this.generateExampleValue(nonUndefinedType);
    }

    return typeMap[type] || `"${type.toLowerCase()}"`;
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