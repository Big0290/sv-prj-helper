/**
 * Comprehensive Example Generator - Creates minimal working code samples and performance examples
 */

import type {
  ComponentDocumentation,
  UsageExample,
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  ComponentCategory
} from '../types/index.ts';

export interface ExampleOptions {
  includeMinimalExamples?: boolean;
  includeEventHandling?: boolean;
  includePerformanceExamples?: boolean;
  includeErrorHandling?: boolean;
  includeTestingExamples?: boolean;
  maxCodeLength?: number;
  includeComments?: boolean;
}

export interface GeneratedExample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: 'svelte' | 'typescript' | 'javascript';
  complexity: 'basic' | 'intermediate' | 'advanced';
  category: 'minimal' | 'events' | 'performance' | 'error-handling' | 'testing';
  dependencies?: string[];
  notes?: string[];
  relatedExamples?: string[];
}

export interface ExampleCollection {
  minimal: GeneratedExample[];
  eventHandling: GeneratedExample[];
  performance: GeneratedExample[];
  errorHandling: GeneratedExample[];
  testing: GeneratedExample[];
  complete: GeneratedExample[];
}

export class ExampleGenerator {
  private readonly defaultOptions: ExampleOptions = {
    includeMinimalExamples: true,
    includeEventHandling: true,
    includePerformanceExamples: true,
    includeErrorHandling: true,
    includeTestingExamples: false,
    maxCodeLength: 800,
    includeComments: true
  };

  constructor(private options: ExampleOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  /**
   * Generate component examples (simplified interface for DocumentationGenerator)
   */
  async generateComponentExamples(component: any): Promise<UsageExample[]> {
    const examples: UsageExample[] = [];
    
    // Basic usage example
    examples.push({
      title: 'Basic Usage',
      description: `Basic usage of ${component.name}`,
      code: `<${component.name}>\n  Content\n</${component.name}>`,
      language: 'svelte',
      complexity: 'basic'
    });

    // Props example if component has props
    if (component.props && component.props.length > 0) {
      const propsExample = component.props
        .filter((p: any) => p.required)
        .map((p: any) => `${p.name}="${p.type === 'string' ? 'value' : '{value}'}"`)
        .join(' ');
      
      examples.push({
        title: 'With Props',
        description: `${component.name} with required props`,
        code: `<${component.name}${propsExample ? ' ' + propsExample : ''}>\n  Content\n</${component.name}>`,
        language: 'svelte',
        complexity: 'intermediate'
      });
    }

    return examples;
  }

  /**
   * Generate comprehensive example collection for a component
   */
  generateExampleCollection(component: ComponentDocumentation): ExampleCollection {
    const collection: ExampleCollection = {
      minimal: [],
      eventHandling: [],
      performance: [],
      errorHandling: [],
      testing: [],
      complete: []
    };

    // Generate minimal working examples
    if (this.options.includeMinimalExamples) {
      collection.minimal = this.generateMinimalExamples(component);
    }

    // Generate event handling examples
    if (this.options.includeEventHandling && component.api.events.length > 0) {
      collection.eventHandling = this.generateEventHandlingExamples(component);
    }

    // Generate performance optimization examples
    if (this.options.includePerformanceExamples) {
      collection.performance = this.generatePerformanceExamples(component);
    }

    // Generate error handling examples
    if (this.options.includeErrorHandling) {
      collection.errorHandling = this.generateErrorHandlingExamples(component);
    }

    // Generate testing examples
    if (this.options.includeTestingExamples) {
      collection.testing = this.generateTestingExamples(component);
    }

    // Generate complete integration examples
    collection.complete = this.generateCompleteExamples(component);

    return collection;
  }

  /**
   * Generate minimal working code samples
   */
  generateMinimalExamples(component: ComponentDocumentation): GeneratedExample[] {
    const examples: GeneratedExample[] = [];

    // Absolute minimal example
    examples.push({
      id: `${component.metadata.name}-minimal`,
      title: 'Minimal Usage',
      description: `The simplest way to use ${component.metadata.name}`,
      code: this.generateAbsoluteMinimal(component),
      language: 'svelte',
      complexity: 'basic',
      category: 'minimal',
      notes: ['No configuration required', 'Uses all default values']
    });

    // Minimal with required props
    const requiredProps = component.api.props.filter(prop => prop.required);
    if (requiredProps.length > 0) {
      examples.push({
        id: `${component.metadata.name}-minimal-required`,
        title: 'Minimal with Required Props',
        description: `${component.metadata.name} with only required properties`,
        code: this.generateMinimalWithRequired(component, requiredProps),
        language: 'svelte',
        complexity: 'basic',
        category: 'minimal',
        notes: [`Includes ${requiredProps.length} required props`]
      });
    }

    // Minimal with common props
    examples.push({
      id: `${component.metadata.name}-minimal-common`,
      title: 'Common Configuration',
      description: `${component.metadata.name} with typical settings`,
      code: this.generateMinimalWithCommon(component),
      language: 'svelte',
      complexity: 'basic',
      category: 'minimal',
      notes: ['Real-world usage example']
    });

    return examples;
  }

  /**
   * Generate event handling examples with callbacks
   */
  generateEventHandlingExamples(component: ComponentDocumentation): GeneratedExample[] {
    const examples: GeneratedExample[] = [];

    // Single event handling
    if (component.api.events.length > 0) {
      const primaryEvent = component.api.events[0];
      examples.push({
        id: `${component.metadata.name}-single-event`,
        title: `Handling ${primaryEvent.name} Event`,
        description: `Basic event handling for ${component.metadata.name}`,
        code: this.generateSingleEventExample(component, primaryEvent),
        language: 'svelte',
        complexity: 'basic',
        category: 'events',
        notes: ['Shows event payload usage', 'Basic event handling pattern']
      });
    }

    // Multiple event handling
    if (component.api.events.length > 1) {
      examples.push({
        id: `${component.metadata.name}-multiple-events`,
        title: 'Multiple Event Handling',
        description: `Handling multiple ${component.metadata.name} events`,
        code: this.generateMultipleEventsExample(component),
        language: 'svelte',
        complexity: 'intermediate',
        category: 'events',
        notes: ['Comprehensive event handling', 'Event coordination patterns']
      });
    }

    // Event with state management
    examples.push({
      id: `${component.metadata.name}-event-state`,
      title: 'Event-Driven State Management',
      description: `State management with ${component.metadata.name} events`,
      code: this.generateEventStateExample(component),
      language: 'svelte',
      complexity: 'intermediate',
      category: 'events',
      notes: ['Reactive state updates', 'Event-driven architecture']
    });

    return examples;
  }

  /**
   * Generate performance optimization examples
   */
  generatePerformanceExamples(component: ComponentDocumentation): GeneratedExample[] {
    const examples: GeneratedExample[] = [];

    // Lazy loading example
    examples.push({
      id: `${component.metadata.name}-lazy-loading`,
      title: 'Lazy Loading',
      description: `Lazy loading ${component.metadata.name} for better performance`,
      code: this.generateLazyLoadingExample(component),
      language: 'svelte',
      complexity: 'advanced',
      category: 'performance',
      notes: ['Intersection Observer usage', 'Memory optimization']
    });

    // Memoization example
    examples.push({
      id: `${component.metadata.name}-memoization`,
      title: 'Memoized Props',
      description: `Optimizing ${component.metadata.name} with memoization`,
      code: this.generateMemoizationExample(component),
      language: 'svelte',
      complexity: 'advanced',
      category: 'performance',
      notes: ['Prevents unnecessary re-renders', 'Computed values optimization']
    });

    // Virtual scrolling (for list-like components)
    if (this.isListComponent(component)) {
      examples.push({
        id: `${component.metadata.name}-virtual-scroll`,
        title: 'Virtual Scrolling',
        description: `Virtual scrolling with ${component.metadata.name}`,
        code: this.generateVirtualScrollExample(component),
        language: 'svelte',
        complexity: 'advanced',
        category: 'performance',
        notes: ['Handles large datasets', 'Constant memory usage']
      });
    }

    return examples;
  }

  /**
   * Generate error handling examples
   */
  generateErrorHandlingExamples(component: ComponentDocumentation): GeneratedExample[] {
    const examples: GeneratedExample[] = [];

    // Basic error boundaries
    examples.push({
      id: `${component.metadata.name}-error-boundary`,
      title: 'Error Boundary',
      description: `Error handling for ${component.metadata.name}`,
      code: this.generateErrorBoundaryExample(component),
      language: 'svelte',
      complexity: 'intermediate',
      category: 'error-handling',
      notes: ['Graceful error handling', 'User-friendly error messages']
    });

    // Async error handling
    examples.push({
      id: `${component.metadata.name}-async-errors`,
      title: 'Async Error Handling',
      description: `Handling async errors in ${component.metadata.name}`,
      code: this.generateAsyncErrorExample(component),
      language: 'svelte',
      complexity: 'intermediate',
      category: 'error-handling',
      notes: ['Promise error handling', 'Loading states']
    });

    // Validation errors
    if (this.isFormComponent(component)) {
      examples.push({
        id: `${component.metadata.name}-validation-errors`,
        title: 'Validation Error Handling',
        description: `Form validation with ${component.metadata.name}`,
        code: this.generateValidationErrorExample(component),
        language: 'svelte',
        complexity: 'intermediate',
        category: 'error-handling',
        notes: ['Input validation', 'Error message display']
      });
    }

    return examples;
  }

  /**
   * Generate testing examples
   */
  generateTestingExamples(component: ComponentDocumentation): GeneratedExample[] {
    const examples: GeneratedExample[] = [];

    // Unit test example
    examples.push({
      id: `${component.metadata.name}-unit-test`,
      title: 'Unit Testing',
      description: `Unit tests for ${component.metadata.name}`,
      code: this.generateUnitTestExample(component),
      language: 'javascript',
      complexity: 'intermediate',
      category: 'testing',
      dependencies: ['@testing-library/svelte', 'vitest'],
      notes: ['Component testing', 'Props and events testing']
    });

    // Integration test example
    examples.push({
      id: `${component.metadata.name}-integration-test`,
      title: 'Integration Testing',
      description: `Integration tests for ${component.metadata.name}`,
      code: this.generateIntegrationTestExample(component),
      language: 'javascript',
      complexity: 'advanced',
      category: 'testing',
      dependencies: ['@testing-library/svelte', 'vitest'],
      notes: ['User interaction testing', 'Component integration']
    });

    return examples;
  }

  /**
   * Generate complete integration examples
   */
  generateCompleteExamples(component: ComponentDocumentation): GeneratedExample[] {
    const examples: GeneratedExample[] = [];

    // Real-world usage example
    examples.push({
      id: `${component.metadata.name}-real-world`,
      title: 'Real-World Usage',
      description: `Complete ${component.metadata.name} implementation`,
      code: this.generateRealWorldExample(component),
      language: 'svelte',
      complexity: 'advanced',
      category: 'minimal',
      notes: ['Production-ready example', 'Best practices included']
    });

    // Full-featured example
    examples.push({
      id: `${component.metadata.name}-full-featured`,
      title: 'Full-Featured Implementation',
      description: `${component.metadata.name} with all features`,
      code: this.generateFullFeaturedExample(component),
      language: 'svelte',
      complexity: 'advanced',
      category: 'minimal',
      notes: ['All props and events', 'Complete functionality']
    });

    return examples;
  }

  // Code generation methods
  private generateAbsoluteMinimal(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
</script>

<${component.metadata.name} />
    `.trim();
  }

  private generateMinimalWithRequired(component: ComponentDocumentation, requiredProps: PropDefinition[]): string {
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

  private generateMinimalWithCommon(component: ComponentDocumentation): string {
    const commonProps = component.api.props.slice(0, 3);
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

  private generateSingleEventExample(component: ComponentDocumentation, event: EventDefinition): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  function handle${this.capitalize(event.name)}(event) {
    console.log('${event.name} triggered:', event.detail);
    ${this.options.includeComments ? '// Handle the event here' : ''}
  }
</script>

<${component.metadata.name} on:${event.name}={handle${this.capitalize(event.name)}} />
    `.trim();
  }

  private generateMultipleEventsExample(component: ComponentDocumentation): string {
    const events = component.api.events.slice(0, 3);
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

  private generateEventStateExample(component: ComponentDocumentation): string {
    const primaryEvent = component.api.events[0];
    
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  let state = {
    count: 0,
    lastEvent: null
  };

  function handleEvent(event) {
    state = {
      ...state,
      count: state.count + 1,
      lastEvent: event.detail
    };
  }
</script>

<${component.metadata.name} on:${primaryEvent?.name || 'change'}={handleEvent} />

<div class="state-display">
  <p>Event count: {state.count}</p>
  <p>Last event: {JSON.stringify(state.lastEvent)}</p>
</div>
    `.trim();
  }

  private generateLazyLoadingExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  import { onMount } from 'svelte';

  let isVisible = false;
  let containerRef;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef) {
      observer.observe(containerRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={containerRef} class="lazy-container">
  {#if isVisible}
    <${component.metadata.name} />
  {:else}
    <div class="placeholder">Loading...</div>
  {/if}
</div>

<style>
  .lazy-container {
    min-height: 200px;
  }
  
  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    background: var(--surface-color);
    border-radius: var(--border-radius);
  }
</style>
    `.trim();
  }

  private generateMemoizationExample(component: ComponentDocumentation): string {
    const expensiveProps = component.api.props.slice(0, 2);
    
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  let rawData = [];
  
  ${this.options.includeComments ? '// Memoized computed values to prevent unnecessary recalculations' : ''}
  $: processedData = rawData.map(item => ({
    ...item,
    computed: expensiveComputation(item)
  }));

  $: memoizedProps = {
${expensiveProps.map(prop => `    ${prop.name}: processedData`).join(',\n')}
  };

  function expensiveComputation(item) {
    ${this.options.includeComments ? '// Simulate expensive computation' : ''}
    return item.value * Math.random();
  }
</script>

<${component.metadata.name} {...memoizedProps} />
    `.trim();
  }

  private generateVirtualScrollExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  import { VirtualList } from 'sv-project-helper';

  let items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: \`Item \${i}\`,
    value: Math.random()
  }));

  let visibleItems = [];
  let startIndex = 0;
  let endIndex = 50;

  $: visibleItems = items.slice(startIndex, endIndex);

  function handleScroll(event) {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const itemHeight = 50;
    
    startIndex = Math.floor(scrollTop / itemHeight);
    endIndex = Math.min(
      startIndex + Math.ceil(clientHeight / itemHeight) + 5,
      items.length
    );
  }
</script>

<div class="virtual-container" on:scroll={handleScroll}>
  <div style="height: {items.length * 50}px; position: relative;">
    <div style="transform: translateY({startIndex * 50}px);">
      {#each visibleItems as item (item.id)}
        <${component.metadata.name} data={item} />
      {/each}
    </div>
  </div>
</div>

<style>
  .virtual-container {
    height: 400px;
    overflow-y: auto;
  }
</style>
    `.trim();
  }

  private generateErrorBoundaryExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  let hasError = false;
  let errorMessage = '';

  function handleError(error) {
    hasError = true;
    errorMessage = error.message || 'An unexpected error occurred';
    console.error('Component error:', error);
  }

  function retry() {
    hasError = false;
    errorMessage = '';
  }
</script>

{#if hasError}
  <div class="error-boundary">
    <h3>Something went wrong</h3>
    <p>{errorMessage}</p>
    <button on:click={retry}>Try Again</button>
  </div>
{:else}
  <${component.metadata.name} 
    on:error={handleError}
    ${this.options.includeComments ? '<!-- Component props here -->' : ''}
  />
{/if}

<style>
  .error-boundary {
    padding: 1rem;
    border: 1px solid var(--error-color);
    border-radius: var(--border-radius);
    background: var(--error-background);
    color: var(--error-text);
  }
</style>
    `.trim();
  }

  private generateAsyncErrorExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  let loading = false;
  let error = null;
  let data = null;

  async function loadData() {
    loading = true;
    error = null;
    
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      data = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <div class="loading">Loading...</div>
{:else if error}
  <div class="error">
    <p>Error: {error}</p>
    <button on:click={loadData}>Retry</button>
  </div>
{:else if data}
  <${component.metadata.name} {data} />
{:else}
  <button on:click={loadData}>Load Data</button>
{/if}
    `.trim();
  }

  private generateValidationErrorExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  let value = '';
  let errors = [];

  function validateInput(inputValue) {
    const newErrors = [];
    
    if (!inputValue) {
      newErrors.push('This field is required');
    } else if (inputValue.length < 3) {
      newErrors.push('Must be at least 3 characters');
    }
    
    errors = newErrors;
    return newErrors.length === 0;
  }

  function handleInput(event) {
    value = event.target.value;
    validateInput(value);
  }

  function handleSubmit() {
    if (validateInput(value)) {
      console.log('Valid input:', value);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <${component.metadata.name}
    bind:value
    on:input={handleInput}
    class:error={errors.length > 0}
  />
  
  {#if errors.length > 0}
    <div class="error-messages">
      {#each errors as error}
        <p class="error-message">{error}</p>
      {/each}
    </div>
  {/if}
  
  <button type="submit" disabled={errors.length > 0}>
    Submit
  </button>
</form>

<style>
  .error-messages {
    margin-top: 0.5rem;
  }
  
  .error-message {
    color: var(--error-color);
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }
</style>
    `.trim();
  }

  private generateUnitTestExample(component: ComponentDocumentation): string {
    const firstProp = component.api.props[0];
    const firstEvent = component.api.events[0];
    
    return this.template`
import { render, fireEvent } from '@testing-library/svelte';
import { ${component.metadata.name} } from '../${component.metadata.name}.svelte';

describe('${component.metadata.name}', () => {
  test('renders with default props', () => {
    const { getByRole } = render(${component.metadata.name});
    expect(getByRole('${this.getDefaultRole(component)}')).toBeInTheDocument();
  });

${firstProp ? `  test('accepts ${firstProp.name} prop', () => {
    const testValue = ${this.generateExampleValue(firstProp.type)};
    const { container } = render(${component.metadata.name}, {
      props: { ${firstProp.name}: testValue }
    });
    
    ${this.options.includeComments ? '// Add assertions based on prop behavior' : ''}
    expect(container.firstChild).toHaveAttribute('data-${firstProp.name}', String(testValue));
  });` : ''}

${firstEvent ? `  test('emits ${firstEvent.name} event', async () => {
    const mockHandler = vi.fn();
    const { getByRole } = render(${component.metadata.name});
    
    const component = getByRole('${this.getDefaultRole(component)}');
    component.addEventListener('${firstEvent.name}', mockHandler);
    
    await fireEvent.click(component);
    
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });` : ''}

  test('handles accessibility attributes', () => {
    const { getByRole } = render(${component.metadata.name}, {
      props: { 'aria-label': 'Test label' }
    });
    
    expect(getByRole('${this.getDefaultRole(component)}')).toHaveAttribute('aria-label', 'Test label');
  });
});
    `.trim();
  }

  private generateIntegrationTestExample(component: ComponentDocumentation): string {
    return this.template`
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import TestApp from './TestApp.svelte';

describe('${component.metadata.name} Integration', () => {
  test('integrates with form submission', async () => {
    const user = userEvent.setup();
    const { getByRole, getByLabelText } = render(TestApp);
    
    const input = getByLabelText('${component.metadata.name} Input');
    const submitButton = getByRole('button', { name: /submit/i });
    
    await user.type(input, 'test value');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(getByRole('alert')).toHaveTextContent('Form submitted successfully');
    });
  });

  test('handles user interactions correctly', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(TestApp);
    
    const component = getByRole('${this.getDefaultRole(component)}');
    
    ${this.options.includeComments ? '// Test keyboard navigation' : ''}
    await user.tab();
    expect(component).toHaveFocus();
    
    await user.keyboard('{Enter}');
    ${this.options.includeComments ? '// Assert expected behavior' : ''}
  });

  test('responds to external state changes', async () => {
    const { getByRole, getByText } = render(TestApp);
    
    const toggleButton = getByText('Toggle State');
    await fireEvent.click(toggleButton);
    
    await waitFor(() => {
      const component = getByRole('${this.getDefaultRole(component)}');
      expect(component).toHaveClass('active');
    });
  });
});
    `.trim();
  }

  private generateRealWorldExample(component: ComponentDocumentation): string {
    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  ${this.options.includeComments ? '// Real-world state management' : ''}
  const state = writable({
    loading: false,
    error: null,
    data: null
  });

  let unsubscribe;

  onMount(() => {
    ${this.options.includeComments ? '// Initialize component with real data' : ''}
    loadInitialData();
    
    unsubscribe = state.subscribe(value => {
      if (value.error) {
        console.error('Component error:', value.error);
      }
    });
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  async function loadInitialData() {
    state.update(s => ({ ...s, loading: true, error: null }));
    
    try {
      const response = await fetch('/api/${component.metadata.name.toLowerCase()}');
      const data = await response.json();
      
      state.update(s => ({ ...s, data, loading: false }));
    } catch (error) {
      state.update(s => ({ ...s, error: error.message, loading: false }));
    }
  }

  function handleUserAction(event) {
    ${this.options.includeComments ? '// Handle user interactions with proper error handling' : ''}
    try {
      ${this.options.includeComments ? '// Process user action' : ''}
      console.log('User action:', event.detail);
    } catch (error) {
      state.update(s => ({ ...s, error: error.message }));
    }
  }
</script>

{#if $state.loading}
  <div class="loading-state">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
{:else if $state.error}
  <div class="error-state">
    <h3>Something went wrong</h3>
    <p>{$state.error}</p>
    <button on:click={loadInitialData}>Try Again</button>
  </div>
{:else}
  <${component.metadata.name}
    data={$state.data}
    on:action={handleUserAction}
    ${this.options.includeComments ? '<!-- Production-ready configuration -->' : ''}
  />
{/if}

<style>
  .loading-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }

  .spinner {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--border-color);
    border-top: 2px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
    `.trim();
  }

  private generateFullFeaturedExample(component: ComponentDocumentation): string {
    const allProps = component.api.props.slice(0, 5);
    const allEvents = component.api.events.slice(0, 3);
    
    const propsString = allProps.map(prop => 
      `${prop.name}={${prop.name}Value}`
    ).join('\n    ');

    const eventHandlers = allEvents.map(event => 
      `on:${event.name}={handle${this.capitalize(event.name)}}`
    ).join('\n    ');

    const propVariables = allProps.map(prop => 
      `let ${prop.name}Value = ${this.generateExampleValue(prop.type)};`
    ).join('\n  ');

    const eventFunctions = allEvents.map(event => this.template`
  function handle${this.capitalize(event.name)}(event) {
    console.log('${event.name}:', event.detail);
    ${this.options.includeComments ? '// Handle ' + event.name + ' event' : ''}
  }
    `.trim()).join('\n\n  ');

    return this.template`
<script>
  import { ${component.metadata.name} } from 'sv-project-helper';

  ${this.options.includeComments ? '// All available props' : ''}
  ${propVariables}

  ${this.options.includeComments ? '// Event handlers' : ''}
  ${eventFunctions}
</script>

<${component.metadata.name}
    ${propsString}
    ${eventHandlers}
>
  ${component.api.slots.length > 0 ? component.api.slots.map(slot => `
  {#snippet ${slot.name}()}
    <p>Custom ${slot.name} content</p>
  {/snippet}`).join('') : ''}
</${component.metadata.name}>

${this.options.includeComments ? '<!-- Debug information -->' : ''}
<details>
  <summary>Component State</summary>
  <pre>{JSON.stringify({
${allProps.map(prop => `    ${prop.name}: ${prop.name}Value`).join(',\n')}
  }, null, 2)}</pre>
</details>
    `.trim();
  }

  // Utility methods
  private isListComponent(component: ComponentDocumentation): boolean {
    const listComponents = ['DataTable', 'List', 'VirtualList', 'Grid'];
    return listComponents.includes(component.metadata.name);
  }

  private isFormComponent(component: ComponentDocumentation): boolean {
    const formComponents = ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch'];
    return formComponents.includes(component.metadata.name);
  }

  private getDefaultRole(component: ComponentDocumentation): string {
    const roleMap: Record<string, string> = {
      'Button': 'button',
      'Input': 'textbox',
      'Checkbox': 'checkbox',
      'Radio': 'radio',
      'Select': 'combobox',
      'Link': 'link'
    };
    return roleMap[component.metadata.name] || 'generic';
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