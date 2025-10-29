/**
 * Template registry for managing and organizing documentation templates
 */

import type {
  ComponentDocumentation,
  LLMDocumentation,
  ComponentCategory
} from '../types/index.ts';
import { MarkdownTemplateEngine, type TemplateOptions } from './MarkdownTemplateEngine.ts';
import { ComponentTemplates } from './ComponentTemplates.ts';

export interface TemplateRenderer {
  renderComponent(component: ComponentDocumentation): string;
  renderDocumentation(documentation: LLMDocumentation): string;
}

export class TemplateRegistry implements TemplateRenderer {
  private mainEngine: MarkdownTemplateEngine;
  private componentTemplates: ComponentTemplates;
  private customTemplates: Map<string, (data: any) => string>;

  constructor(options: TemplateOptions = {}) {
    this.mainEngine = new MarkdownTemplateEngine(options);
    this.componentTemplates = new ComponentTemplates(options);
    this.customTemplates = new Map();
    
    this.registerDefaultTemplates();
  }

  /**
   * Render a complete LLM documentation file
   */
  renderDocumentation(documentation: LLMDocumentation): string {
    return this.mainEngine.renderMainTemplate(documentation);
  }

  /**
   * Render individual component documentation using category-specific templates
   */
  renderComponent(component: ComponentDocumentation): string {
    return this.componentTemplates.renderCategoryTemplate(component);
  }

  /**
   * Render API reference section
   */
  renderAPIReference(component: ComponentDocumentation): string {
    return this.mainEngine.renderAPIReferenceTemplate(
      component.api.props,
      component.api.events,
      component.api.slots,
      component.api.methods
    );
  }

  /**
   * Render usage examples with progressive complexity
   */
  renderUsageExamples(component: ComponentDocumentation): string {
    return this.mainEngine.renderUsageExamplesTemplate(component.examples);
  }

  /**
   * Register a custom template for specific component names or patterns
   */
  registerTemplate(key: string, renderer: (data: any) => string): void {
    this.customTemplates.set(key, renderer);
  }

  /**
   * Get template for specific component or category
   */
  getTemplate(component: ComponentDocumentation): (data: any) => string {
    // Check for component-specific template first
    const componentTemplate = this.customTemplates.get(component.metadata.name);
    if (componentTemplate) {
      return componentTemplate;
    }

    // Check for category-specific template
    const categoryTemplate = this.customTemplates.get(component.metadata.category);
    if (categoryTemplate) {
      return categoryTemplate;
    }

    // Return default category template
    return (data: ComponentDocumentation) => this.componentTemplates.renderCategoryTemplate(data);
  }

  /**
   * Render component using the most appropriate template
   */
  renderWithBestTemplate(component: ComponentDocumentation): string {
    const template = this.getTemplate(component);
    return template(component);
  }

  /**
   * Register specialized templates for specific components
   */
  private registerDefaultTemplates(): void {
    // Register specialized templates for complex components
    this.registerTemplate('DataTable', (component: ComponentDocumentation) => {
      return this.renderDataTableTemplate(component);
    });

    this.registerTemplate('Chat', (component: ComponentDocumentation) => {
      return this.renderChatTemplate(component);
    });

    this.registerTemplate('CodeEditor', (component: ComponentDocumentation) => {
      return this.renderCodeEditorTemplate(component);
    });

    this.registerTemplate('BarcodeScanner', (component: ComponentDocumentation) => {
      return this.renderBarcodeScannerTemplate(component);
    });

    // Register category-specific enhancements
    this.registerTemplate('organism', (component: ComponentDocumentation) => {
      return this.componentTemplates.renderOrganismTemplate(component);
    });
  }

  /**
   * Specialized template for DataTable components
   */
  private renderDataTableTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Data Display Component** - Advanced table with sorting, filtering, and pagination

### Quick Start

\`\`\`svelte
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  
  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true }
  ];
</script>

<${component.metadata.name} {data} {columns} />
\`\`\`

### Data Management

${this.renderDataManagementSection(component)}

### Column Configuration

${this.renderColumnConfigurationSection(component)}

### Sorting & Filtering

${this.renderSortingFilteringSection(component)}

### Pagination

${this.renderPaginationSection(component)}

### Accessibility Features

${this.componentTemplates.renderAccessibilitySection(component.accessibility)}

### Performance Optimization

${this.renderPerformanceSection(component)}

### Complete API Reference

${this.mainEngine.renderAPIReferenceTemplate(
  component.api.props,
  component.api.events,
  component.api.slots,
  component.api.methods
)}
    `.trim();
  }

  /**
   * Specialized template for Chat components
   */
  private renderChatTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Real-time Communication Component** - Full-featured chat interface

### Quick Start

\`\`\`svelte
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  
  let messages = [];
  let currentUser = { id: 1, name: 'User' };
</script>

<${component.metadata.name} 
  {messages} 
  {currentUser}
  on:message={handleMessage}
  on:typing={handleTyping}
/>
\`\`\`

### Message Handling

${this.renderMessageHandlingSection(component)}

### Real-time Features

${this.renderRealtimeSection(component)}

### Media Support

${this.renderMediaSupportSection(component)}

### Accessibility & Screen Readers

${this.componentTemplates.renderAccessibilitySection(component.accessibility)}

### Complete API Reference

${this.mainEngine.renderAPIReferenceTemplate(
  component.api.props,
  component.api.events,
  component.api.slots,
  component.api.methods
)}
    `.trim();
  }

  /**
   * Specialized template for CodeEditor components
   */
  private renderCodeEditorTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Code Editing Component** - CodeMirror 6 integration with syntax highlighting

### Quick Start

\`\`\`svelte
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  
  let code = 'console.log("Hello, World!");';
</script>

<${component.metadata.name} 
  bind:value={code}
  language="javascript"
  theme="dark"
/>
\`\`\`

### Language Support

${this.renderLanguageSupportSection(component)}

### Themes & Styling

${this.renderThemeSection(component)}

### Extensions & Plugins

${this.renderExtensionsSection(component)}

### Accessibility Features

${this.componentTemplates.renderAccessibilitySection(component.accessibility)}

### Complete API Reference

${this.mainEngine.renderAPIReferenceTemplate(
  component.api.props,
  component.api.events,
  component.api.slots,
  component.api.methods
)}
    `.trim();
  }

  /**
   * Specialized template for BarcodeScanner components
   */
  private renderBarcodeScannerTemplate(component: ComponentDocumentation): string {
    return this.template`
## ${component.metadata.name}

> **Barcode/QR Code Scanner** - Camera-based scanning with ZXing integration

### Quick Start

\`\`\`svelte
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  
  function handleScan(event) {
    console.log('Scanned:', event.detail.value);
  }
</script>

<${component.metadata.name} 
  on:scan={handleScan}
  formats={['qr_code', 'code_128']}
/>
\`\`\`

### Supported Formats

${this.renderSupportedFormatsSection(component)}

### Camera Configuration

${this.renderCameraConfigSection(component)}

### Error Handling

${this.renderErrorHandlingSection(component)}

### Complete API Reference

${this.mainEngine.renderAPIReferenceTemplate(
  component.api.props,
  component.api.events,
  component.api.slots,
  component.api.methods
)}
    `.trim();
  }

  // Helper methods for specialized sections
  private renderDataManagementSection(component: ComponentDocumentation): string {
    return 'Data management features including sorting, filtering, and pagination.';
  }

  private renderColumnConfigurationSection(component: ComponentDocumentation): string {
    return 'Column configuration options for customizing table display.';
  }

  private renderSortingFilteringSection(component: ComponentDocumentation): string {
    return 'Sorting and filtering capabilities for data manipulation.';
  }

  private renderPaginationSection(component: ComponentDocumentation): string {
    return 'Pagination controls and configuration options.';
  }

  private renderPerformanceSection(component: ComponentDocumentation): string {
    return 'Performance optimization techniques for large datasets.';
  }

  private renderMessageHandlingSection(component: ComponentDocumentation): string {
    return 'Message handling and state management for chat functionality.';
  }

  private renderRealtimeSection(component: ComponentDocumentation): string {
    return 'Real-time features including typing indicators and live updates.';
  }

  private renderMediaSupportSection(component: ComponentDocumentation): string {
    return 'Media attachment support including images, files, and voice messages.';
  }

  private renderLanguageSupportSection(component: ComponentDocumentation): string {
    return 'Supported programming languages and syntax highlighting.';
  }

  private renderThemeSection(component: ComponentDocumentation): string {
    return 'Available themes and customization options.';
  }

  private renderExtensionsSection(component: ComponentDocumentation): string {
    return 'Available extensions and plugin integration.';
  }

  private renderSupportedFormatsSection(component: ComponentDocumentation): string {
    return 'Supported barcode and QR code formats.';
  }

  private renderCameraConfigSection(component: ComponentDocumentation): string {
    return 'Camera configuration and device selection options.';
  }

  private renderErrorHandlingSection(component: ComponentDocumentation): string {
    return 'Error handling and fallback mechanisms.';
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