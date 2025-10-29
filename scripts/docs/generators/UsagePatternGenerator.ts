/**
 * Usage Pattern Generator - Creates practical code examples and integration patterns
 */

import type {
  ComponentDocumentation,
  UsageExample,
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  ComponentCategory,
  UsagePattern
} from '../types/index.ts';

export interface UsagePatternOptions {
  includeBasicExamples?: boolean;
  includeAdvancedExamples?: boolean;
  includeIntegrationPatterns?: boolean;
  includeCompositionExamples?: boolean;
  includeEventHandling?: boolean;
  includeAccessibilityExamples?: boolean;
  maxExampleLength?: number;
}

export interface GeneratedPattern {
  name: string;
  description: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  category: 'usage' | 'integration' | 'composition' | 'accessibility';
  code: string;
  language: 'svelte' | 'typescript' | 'javascript';
  notes?: string[];
  relatedPatterns?: string[];
}

export interface PatternCollection {
  basic: GeneratedPattern[];
  intermediate: GeneratedPattern[];
  advanced: GeneratedPattern[];
  integration: GeneratedPattern[];
  composition: GeneratedPattern[];
  accessibility: GeneratedPattern[];
}

export class UsagePatternGenerator {
  private readonly defaultOptions: UsagePatternOptions = {
    includeBasicExamples: true,
    includeAdvancedExamples: true,
    includeIntegrationPatterns: true,
    includeCompositionExamples: true,
    includeEventHandling: true,
    includeAccessibilityExamples: true,
    maxExampleLength: 500
  };

  constructor(private options: UsagePatternOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  /**
   * Generate usage patterns (simplified interface for DocumentationGenerator)
   */
  generateUsagePatterns(component: ComponentDocumentation): UsagePattern[] {
    return [
      {
        name: 'Basic Usage',
        description: `Standard implementation of ${component.metadata.name}`,
        components: [component.metadata.name],
        example: `<${component.metadata.name}>\n  Content\n</${component.metadata.name}>`,
        bestPractices: [
          'Use semantic HTML structure',
          'Include proper ARIA labels',
          'Handle keyboard navigation'
        ]
      }
    ];
  }
    includeEventHandling: true,
    includeAccessibilityExamples: true,
    maxExampleLength: 1000
  };

  constructor(private options: UsagePatternOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  /**
   * Generate comprehensive usage patterns for a component
   */
  generateUsagePatterns(component: ComponentDocumentation): PatternCollection {
    const patterns: PatternCollection = {
      basic: [],
      intermediate: [],
      advanced: [],
      integration: [],
      composition: [],
      accessibility: []
    };

    // Generate basic usage patterns
    if (this.options.includeBasicExamples) {
      patterns.basic = this.generateBasicPatterns(component);
    }

    // Generate intermediate patterns
    patterns.intermediate = this.generateIntermediatePatterns(component);

    // Generate advanced patterns
    if (this.options.includeAdvancedExamples) {
      patterns.advanced = this.generateAdvancedPatterns(component);
    }

    // Generate integration patterns
    if (this.options.includeIntegrationPatterns) {
      patterns.integration = this.generateIntegrationPatterns(component);
    }

    // Generate composition patterns
    if (this.options.includeCompositionExamples) {
      patterns.composition = this.generateCompositionPatterns(component);
    }

    // Generate accessibility patterns
    if (this.options.includeAccessibilityExamples) {
      patterns.accessibility = this.generateAccessibilityPatterns(component);
    }

    return patterns;
  }

  /**
   * Generate progressive examples from basic to advanced
   */
  generateProgressiveExamples(component: ComponentDocumentation): UsageExample[] {
    const examples: UsageExample[] = [];

    // Basic usage
    examples.push(...this.createBasicUsageExamples(component));

    // Intermediate usage with props and events
    examples.push(...this.createIntermediateUsageExamples(component));

    // Advanced usage with complex scenarios
    examples.push(...this.createAdvancedUsageExamples(component));

    return examples;
  }

  /**
   * Generate component composition patterns
   */
  generateCompositionPatterns(component: ComponentDocumentation): GeneratedPattern[] {
    const patterns: GeneratedPattern[] = [];

    // Parent-child composition
    if (component.api.slots.length > 0) {
      patterns.push(this.createSlotCompositionPattern(component));
    }

    // Event-driven composition
    if (component.api.events.length > 0) {
      patterns.push(this.createEventCompositionPattern(component));
    }

    // State sharing composition
    patterns.push(this.createStateCompositionPattern(component));

    // Layout composition
    if (component.metadata.category === 'layout') {
      patterns.push(this.createLayoutCompositionPattern(component));
    }

    return patterns;
  }

  /**
   * Generate integration patterns with other components
   */
  generateIntegrationPatterns(component: ComponentDocumentation): GeneratedPattern[] {
    const patterns: GeneratedPattern[] = [];

    // Form integration
    if (this.isFormComponent(component)) {
      patterns.push(this.createFormIntegrationPattern(component));
    }

    // Data integration
    if (this.isDataComponent(component)) {
      patterns.push(this.createDataIntegrationPattern(component));
    }

    // Navigation integration
    if (this.isNavigationComponent(component)) {
      patterns.push(this.createNavigationIntegrationPattern(component));
    }

    // Theme integration
    patterns.push(this.createThemeIntegrationPattern(component));

    return patterns;
  }

  /**
   * Generate basic usage patterns
   */
  private generateBasicPatterns(component: ComponentDocumentation): GeneratedPattern[] {
    const patterns: GeneratedPattern[] = [];

    // Minimal usage
    patterns.push({
      name: 'Minimal Usage',
      description: `Basic ${component.metadata.name} with minimal configuration`,
      complexity: 'basic',
      category: 'usage',
      code: this.generateMinimalUsage(component),
      language: 'svelte',
      notes: ['This is the simplest way to use the component', 'All props use their default values']
    });

    // With required props
    const requiredProps = component.api.props.filter(prop => prop.required);
    if (requiredProps.length > 0) {
      patterns.push({
        name: 'With Required Props',
        description: `${component.metadata.name} with all required properties`,
        complexity: 'basic',
        category: 'usage',
        code: this.generateRequiredPropsUsage(component, requiredProps),
        language: 'svelte',
        notes: [`Includes ${requiredProps.length} required props`]
      });
    }

    // With common props
    patterns.push({
      name: 'Common Configuration',
      description: `${component.metadata.name} with commonly used properties`,
      complexity: 'basic',
      category: 'usage',
      code: this.generateCommonUsage(component),
      language: 'svelte',
      notes: ['Shows typical real-world usage']
    });

    return patterns;
  }

  /**
   * Generate intermediate usage patterns
   */
  private generateIntermediatePatterns(component: ComponentDocumentation): GeneratedPattern[] {
    const patterns: GeneratedPattern[] = [];

    // Event handling
    if (component.api.events.length > 0) {
      patterns.push({
        name: 'Event Handling',
        description: `Handling ${component.metadata.name} events`,
        complexity: 'intermediate',
        category: 'usage',
        code: this.generateEventHandlingExample(component),
        language: 'svelte',
        notes: ['Shows how to handle component events', 'Includes event payload usage']
      });
    }

    // Reactive binding
    patterns.push({
      name: 'Reactive Binding',
      description: `Two-way binding with ${component.metadata.name}`,
      complexity: 'intermediate',
      category: 'usage',
      code: this.generateReactiveBindingExample(component),
      language: 'svelte',
      notes: ['Demonstrates reactive state management', 'Shows prop binding patterns']
    });

    // Conditional rendering
    patterns.push({
      name: 'Conditional Rendering',
      description: `Conditional ${component.metadata.name} rendering`,
      complexity: 'intermediate',
      category: 'usage',
      code: this.generateConditionalRenderingExample(component),
      language: 'svelte',
      notes: ['Shows conditional component usage', 'Includes loading and error states']
    });

    return patterns;
  }

  /**
   * Generate advanced usage patterns
   */
  private generateAdvancedPatterns(component: ComponentDocumentation): GeneratedPattern[] {
    const patterns: GeneratedPattern[] = [];

    // Dynamic configuration
    patterns.push({
      name: 'Dynamic Configuration',
      description: `Dynamic ${component.metadata.name} configuration`,
      complexity: 'advanced',
      category: 'usage',
      code: this.generateDynamicConfigExample(component),
      language: 'svelte',
      notes: ['Runtime configuration changes', 'Advanced prop manipulation']
    });

    // Performance optimization
    patterns.push({
      name: 'Performance Optimization',
      description: `Optimized ${component.metadata.name} usage`,
      complexity: 'advanced',
      category: 'usage',
      code: this.generatePerformanceOptimizedExample(component),
      language: 'svelte',
      notes: ['Includes performance best practices', 'Memory leak prevention']
    });

    // Custom styling
    patterns.push({
      name: 'Custom Styling',
      description: `Custom styling for ${component.metadata.name}`,
      complexity: 'advanced',
      category: 'usage',
      code: this.generateCustomStylingExample(component),
      language: 'svelte',
      notes: ['CSS custom property overrides', 'Theme customization']
    });

    return patterns;
  }

  /**
   * Generate accessibility patterns
   */
  private generateAccessibilityPatterns(component: ComponentDocumentation): GeneratedPattern[] {
    const patterns: GeneratedPattern[] = [];

    // ARIA attributes
    if (component.accessibility.ariaAttributes.length > 0) {
      patterns.push({
        name: 'ARIA Attributes',
        description: `Accessibility features for ${component.metadata.name}`,
        complexity: 'intermediate',
        category: 'accessibility',
        code: this.generateARIAExample(component),
        language: 'svelte',
        notes: ['WCAG 2.1 AA compliant', 'Screen reader optimized']
      });
    }

    // Keyboard navigation
    if (component.accessibility.keyboardNavigation.length > 0) {
      patterns.push({
        name: 'Keyboard Navigation',
        description: `Keyboard navigation for ${component.metadata.name}`,
        complexity: 'intermediate',
        category: 'accessibility',
        code: this.generateKeyboardNavigationExample(component),
        language: 'svelte',
        notes: ['Full keyboard support', 'Focus management']
      });
    }

    return patterns;
  }

  /**
   * Create basic usage examples
   */
  private createBasicUsageExamples(component: ComponentDocumentation): UsageExample[] {
    return [
      {
        title: 'Basic Usage',
        description: `Simple ${component.metadata.name} implementation`,
        code: this.generateMinimalUsage(component),
        language: 'svelte',
        complexity: 'basic'
      }
    ];
  }

  /**
   * Create intermediate usage examples
   */
  private createIntermediateUsageExamples(component: ComponentDocumentation): UsageExample[] {
    const examples: UsageExample[] = [];

    if (component.api.events.length > 0) {
      examples.push({
        title: 'With Event Handling',
        description: `${component.metadata.name} with event listeners`,
        code: this.generateEventHandlingExample(component),
        language: 'svelte',
        complexity: 'intermediate'
      });
    }

    return examples;
  }

  /**
   * Create advanced usage examples
   */
  private createAdvancedUsageExamples(component: ComponentDocumentation): UsageExample[] {
    return [
      {
        title: 'Advanced Configuration',
        description: `Complex ${component.metadata.name} setup`,
        code: this.generateDynamicConfigExample(component),
        language: 'svelte',
        complexity: 'advanced'
      }
    ];
  }

  /**
   * Generate minimal usage code
   */
  private generateMinimalUsage(component: ComponentDocumentation): string {
    const requiredProps = component.api.props.filter(prop => prop.required);
    const propsString = requiredProps.length > 0 
      ? ' ' + requiredProps.map(prop => `${prop.name}={${this.generateExampleValue(prop.type)}}`).join(' ')
      : '';

    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
</script>

<${component.metadata.name}${propsString} />
    `.trim();
  }

  /**
   * Generate required props usage
   */
  private generateRequiredPropsUsage(component: ComponentDocumentation, requiredProps: PropDefinition[]): string {
    const propsString = requiredProps.map(prop => 
      `${prop.name}={${this.generateExampleValue(prop.type)}}`
    ).join('\n  ');

    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
</script>

<${component.metadata.name}
  ${propsString}
/>
    `.trim();
  }

  /**
   * Generate common usage example
   */
  private generateCommonUsage(component: ComponentDocumentation): string {
    const commonProps = component.api.props.slice(0, 3); // First 3 props as common
    const propsString = commonProps.map(prop => 
      `${prop.name}={${this.generateExampleValue(prop.type)}}`
    ).join('\n  ');

    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
</script>

<${component.metadata.name}
  ${propsString}
/>
    `.trim();
  }

  /**
   * Generate event handling example
   */
  private generateEventHandlingExample(component: ComponentDocumentation): string {
    const events = component.api.events.slice(0, 2); // First 2 events
    const eventHandlers = events.map(event => 
      `on:${event.name}={handle${this.capitalize(event.name)}}`
    ).join('\n  ');

    const handlerFunctions = events.map(event => this.template`
  function handle${this.capitalize(event.name)}(event) {
    console.log('${event.name}:', event.detail);
  }
    `.trim()).join('\n\n  ');

    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  ${handlerFunctions}
</script>

<${component.metadata.name}
  ${eventHandlers}
/>
    `.trim();
  }

  /**
   * Generate reactive binding example
   */
  private generateReactiveBindingExample(component: ComponentDocumentation): string {
    const bindableProps = component.api.props.filter(prop => !prop.required).slice(0, 2);
    const bindings = bindableProps.map(prop => 
      `bind:${prop.name}={${prop.name}Value}`
    ).join('\n  ');

    const variables = bindableProps.map(prop => 
      `let ${prop.name}Value = ${this.generateExampleValue(prop.type)};`
    ).join('\n  ');

    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  ${variables}
</script>

<${component.metadata.name}
  ${bindings}
/>

<p>Current values: {JSON.stringify({ ${bindableProps.map(p => `${p.name}: ${p.name}Value`).join(', ')} })}</p>
    `.trim();
  }

  /**
   * Generate conditional rendering example
   */
  private generateConditionalRenderingExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  let isVisible = true;
  let isLoading = false;
</script>

{#if isLoading}
  <p>Loading...</p>
{:else if isVisible}
  <${component.metadata.name} />
{:else}
  <p>Component is hidden</p>
{/if}

<button on:click={() => isVisible = !isVisible}>
  {isVisible ? 'Hide' : 'Show'} Component
</button>
    `.trim();
  }

  /**
   * Generate dynamic configuration example
   */
  private generateDynamicConfigExample(component: ComponentDocumentation): string {
    const configurableProps = component.api.props.slice(0, 3);
    
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  let config = {
${configurableProps.map(prop => `    ${prop.name}: ${this.generateExampleValue(prop.type)}`).join(',\n')}
  };

  function updateConfig(key, value) {
    config = { ...config, [key]: value };
  }
</script>

<${component.metadata.name} {...config} />

<div class="controls">
${configurableProps.map(prop => this.template`
  <label>
    ${prop.name}:
    <input 
      type="${this.getInputType(prop.type)}"
      bind:value={config.${prop.name}}
    />
  </label>
`.trim()).join('\n  ')}
</div>
    `.trim();
  }

  /**
   * Generate performance optimized example
   */
  private generatePerformanceOptimizedExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  import { onMount, onDestroy } from 'svelte';

  let componentRef;
  let isVisible = false;

  onMount(() => {
    // Lazy load component
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isVisible = true;
        observer.disconnect();
      }
    });
    
    observer.observe(document.querySelector('.component-container'));
    
    return () => observer.disconnect();
  });

  onDestroy(() => {
    // Cleanup if needed
    if (componentRef?.cleanup) {
      componentRef.cleanup();
    }
  });
</script>

<div class="component-container">
  {#if isVisible}
    <${component.metadata.name} bind:this={componentRef} />
  {:else}
    <div class="placeholder">Loading...</div>
  {/if}
</div>
    `.trim();
  }

  /**
   * Generate custom styling example
   */
  private generateCustomStylingExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
</script>

<div class="custom-theme">
  <${component.metadata.name} />
</div>

<style>
  .custom-theme {
    /* Custom CSS properties */
    --primary-color: #6366f1;
    --background-color: rgba(255, 255, 255, 0.1);
    --border-radius: 12px;
    --backdrop-blur: blur(20px);
  }

  .custom-theme :global(.${component.metadata.name.toLowerCase()}) {
    /* Component-specific overrides */
    border-radius: var(--border-radius);
    backdrop-filter: var(--backdrop-blur);
  }
</style>
    `.trim();
  }

  /**
   * Generate ARIA example
   */
  private generateARIAExample(component: ComponentDocumentation): string {
    const ariaAttrs = component.accessibility.ariaAttributes.slice(0, 3);
    const ariaString = ariaAttrs.map(attr => 
      `aria-${attr.name}="${attr.value}"`
    ).join('\n  ');

    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
</script>

<${component.metadata.name}
  ${ariaString}
  role="button"
  tabindex="0"
/>
    `.trim();
  }

  /**
   * Generate keyboard navigation example
   */
  private generateKeyboardNavigationExample(component: ComponentDocumentation): string {
    const shortcuts = component.accessibility.keyboardNavigation.slice(0, 2);
    
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  function handleKeydown(event) {
    switch (event.key) {
${shortcuts.map(shortcut => this.template`
      case '${shortcut.key}':
        // ${shortcut.description}
        event.preventDefault();
        break;
`.trim()).join('\n      ')}
    }
  }
</script>

<${component.metadata.name}
  on:keydown={handleKeydown}
  tabindex="0"
/>
    `.trim();
  }

  // Pattern creation methods
  private createSlotCompositionPattern(component: ComponentDocumentation): GeneratedPattern {
    const slots = component.api.slots.slice(0, 2);
    
    return {
      name: 'Slot Composition',
      description: `Using ${component.metadata.name} with custom content`,
      complexity: 'intermediate',
      category: 'composition',
      code: this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
</script>

<${component.metadata.name}>
${slots.map(slot => this.template`
  {#snippet ${slot.name}()}
    <p>Custom ${slot.name} content</p>
  {/snippet}
`.trim()).join('\n  ')}
</${component.metadata.name}>
      `.trim(),
      language: 'svelte',
      notes: ['Shows slot usage patterns', 'Custom content injection']
    };
  }

  private createEventCompositionPattern(component: ComponentDocumentation): GeneratedPattern {
    return {
      name: 'Event Composition',
      description: `Composing multiple ${component.metadata.name} components with shared events`,
      complexity: 'advanced',
      category: 'composition',
      code: this.generateEventCompositionCode(component),
      language: 'svelte',
      notes: ['Event bubbling and handling', 'Component communication']
    };
  }

  private createStateCompositionPattern(component: ComponentDocumentation): GeneratedPattern {
    return {
      name: 'State Composition',
      description: `Shared state management with ${component.metadata.name}`,
      complexity: 'advanced',
      category: 'composition',
      code: this.generateStateCompositionCode(component),
      language: 'svelte',
      notes: ['Shared state patterns', 'Component synchronization']
    };
  }

  private createLayoutCompositionPattern(component: ComponentDocumentation): GeneratedPattern {
    return {
      name: 'Layout Composition',
      description: `Layout patterns with ${component.metadata.name}`,
      complexity: 'intermediate',
      category: 'composition',
      code: this.generateLayoutCompositionCode(component),
      language: 'svelte',
      notes: ['Responsive layout patterns', 'Grid and flexbox integration']
    };
  }

  private createFormIntegrationPattern(component: ComponentDocumentation): GeneratedPattern {
    return {
      name: 'Form Integration',
      description: `Integrating ${component.metadata.name} with forms`,
      complexity: 'intermediate',
      category: 'integration',
      code: this.generateFormIntegrationCode(component),
      language: 'svelte',
      notes: ['Form validation', 'Data binding']
    };
  }

  private createDataIntegrationPattern(component: ComponentDocumentation): GeneratedPattern {
    return {
      name: 'Data Integration',
      description: `Data binding with ${component.metadata.name}`,
      complexity: 'intermediate',
      category: 'integration',
      code: this.generateDataIntegrationCode(component),
      language: 'svelte',
      notes: ['API integration', 'Data fetching patterns']
    };
  }

  private createNavigationIntegrationPattern(component: ComponentDocumentation): GeneratedPattern {
    return {
      name: 'Navigation Integration',
      description: `Navigation patterns with ${component.metadata.name}`,
      complexity: 'intermediate',
      category: 'integration',
      code: this.generateNavigationIntegrationCode(component),
      language: 'svelte',
      notes: ['Routing integration', 'Navigation state management']
    };
  }

  private createThemeIntegrationPattern(component: ComponentDocumentation): GeneratedPattern {
    return {
      name: 'Theme Integration',
      description: `Theme system integration with ${component.metadata.name}`,
      complexity: 'intermediate',
      category: 'integration',
      code: this.generateThemeIntegrationCode(component),
      language: 'svelte',
      notes: ['Dark mode support', 'Custom theme variables']
    };
  }

  // Helper methods for generating specific code patterns
  private generateEventCompositionCode(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  
  let sharedState = {};
  
  function handleSharedEvent(event) {
    sharedState = { ...sharedState, ...event.detail };
  }
</script>

<${component.metadata.name} on:change={handleSharedEvent} />
<${component.metadata.name} on:change={handleSharedEvent} />

<p>Shared state: {JSON.stringify(sharedState)}</p>
    `.trim();
  }

  private generateStateCompositionCode(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  import { writable } from 'svelte/store';
  
  const sharedStore = writable({});
</script>

<${component.metadata.name} bind:value={$sharedStore} />
<${component.metadata.name} bind:value={$sharedStore} />
    `.trim();
  }

  private generateLayoutCompositionCode(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
</script>

<div class="layout-grid">
  <${component.metadata.name} />
  <${component.metadata.name} />
  <${component.metadata.name} />
</div>

<style>
  .layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }
</style>
    `.trim();
  }

  private generateFormIntegrationCode(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  
  let formData = {};
  
  function handleSubmit() {
    console.log('Form data:', formData);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <${component.metadata.name} bind:value={formData.field} />
  <button type="submit">Submit</button>
</form>
    `.trim();
  }

  private generateDataIntegrationCode(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  import { onMount } from 'svelte';
  
  let data = [];
  let loading = true;
  
  onMount(async () => {
    try {
      const response = await fetch('/api/data');
      data = await response.json();
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <${component.metadata.name} {data} />
{/if}
    `.trim();
  }

  private generateNavigationIntegrationCode(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  import { page } from '$app/stores';
  
  $: currentPath = $page.url.pathname;
</script>

<${component.metadata.name} 
  active={currentPath === '/current'}
  href="/target"
/>
    `.trim();
  }

  private generateThemeIntegrationCode(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  import { ThemeProvider } from 'sv-project-helper';
  
  let darkMode = false;
</script>

<ThemeProvider theme={darkMode ? 'dark' : 'light'}>
  <${component.metadata.name} />
</ThemeProvider>

<button on:click={() => darkMode = !darkMode}>
  Toggle Theme
</button>
    `.trim();
  }

  // Utility methods
  private isFormComponent(component: ComponentDocumentation): boolean {
    const formComponents = ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch'];
    return formComponents.includes(component.metadata.name);
  }

  private isDataComponent(component: ComponentDocumentation): boolean {
    const dataComponents = ['DataTable', 'List', 'Grid', 'Chart'];
    return dataComponents.includes(component.metadata.name);
  }

  private isNavigationComponent(component: ComponentDocumentation): boolean {
    const navComponents = ['Menu', 'Navbar', 'Breadcrumb', 'Tabs', 'Link'];
    return navComponents.includes(component.metadata.name);
  }

  private generateExampleValue(type: string): string {
    const typeMap: Record<string, string> = {
      'string': '"example"',
      'number': '42',
      'boolean': 'true',
      'Date': 'new Date()',
      'Array': '[]',
      'Object': '{}'
    };

    if (type.includes('|')) {
      const firstType = type.split('|')[0].trim();
      return typeMap[firstType] || `"${firstType.toLowerCase()}"`;
    }

    return typeMap[type] || `"${type.toLowerCase()}"`;
  }

  private getInputType(propType: string): string {
    if (propType.includes('number')) return 'number';
    if (propType.includes('boolean')) return 'checkbox';
    if (propType.includes('Date')) return 'date';
    return 'text';
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