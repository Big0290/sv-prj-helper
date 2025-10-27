import type { ComponentDocumentation, PropDefinition, EventDefinition, SlotDefinition, CodeExample, AccessibilityInfo } from './types.js';

/**
 * Parse component TypeScript interface to extract prop definitions
 */
export function parsePropsFromInterface(interfaceContent: string): PropDefinition[] {
  const props: PropDefinition[] = [];
  
  // Extract interface content between braces
  const interfaceMatch = interfaceContent.match(/interface\s+\w+Props\s*{([^}]+)}/s);
  if (!interfaceMatch) return props;

  const interfaceBody = interfaceMatch[1];
  
  // Parse each property line
  const propertyLines = interfaceBody.split('\n').filter(line => line.trim());
  
  for (const line of propertyLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

    // Match property definition: name?: type; or name: type;
    const propMatch = trimmed.match(/^(\w+)(\?)?:\s*([^;]+);?\s*(?:\/\/\s*(.+))?$/);
    if (propMatch) {
      const [, name, optional, type, comment] = propMatch;
      
      props.push({
        name,
        type: type.trim(),
        required: !optional,
        description: comment?.trim() || `${name} property`,
        defaultValue: extractDefaultValue(type.trim())
      });
    }
  }

  return props;
}

/**
 * Parse component events from TypeScript interface
 */
export function parseEventsFromInterface(interfaceContent: string): EventDefinition[] {
  const events: EventDefinition[] = [];
  
  const interfaceMatch = interfaceContent.match(/interface\s+\w+Events\s*{([^}]+)}/s);
  if (!interfaceMatch) return events;

  const interfaceBody = interfaceMatch[1];
  const eventLines = interfaceBody.split('\n').filter(line => line.trim());
  
  for (const line of eventLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

    const eventMatch = trimmed.match(/^(\w+):\s*([^;]+);?\s*(?:\/\/\s*(.+))?$/);
    if (eventMatch) {
      const [, name, type, comment] = eventMatch;
      
      events.push({
        name,
        type: type.trim(),
        description: comment?.trim() || `${name} event`,
        detail: extractEventDetail(type.trim())
      });
    }
  }

  return events;
}

/**
 * Parse component slots from TypeScript interface
 */
export function parseSlotsFromInterface(interfaceContent: string): SlotDefinition[] {
  const slots: SlotDefinition[] = [];
  
  const interfaceMatch = interfaceContent.match(/interface\s+\w+Slots\s*{([^}]+)}/s);
  if (!interfaceMatch) return slots;

  const interfaceBody = interfaceMatch[1];
  const slotLines = interfaceBody.split('\n').filter(line => line.trim());
  
  for (const line of slotLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

    const slotMatch = trimmed.match(/^(\w+):\s*{([^}]*)};?\s*(?:\/\/\s*(.+))?$/);
    if (slotMatch) {
      const [, name, propsStr, comment] = slotMatch;
      
      const props: Record<string, string> = {};
      if (propsStr.trim()) {
        // Parse slot props if any
        const propMatches = propsStr.matchAll(/(\w+):\s*([^,;]+)/g);
        for (const [, propName, propType] of propMatches) {
          props[propName] = propType.trim();
        }
      }
      
      slots.push({
        name,
        props: Object.keys(props).length > 0 ? props : undefined,
        description: comment?.trim() || `${name} slot`
      });
    }
  }

  return slots;
}

/**
 * Extract accessibility information from component comments and code
 */
export function parseAccessibilityInfo(componentContent: string): AccessibilityInfo {
  const accessibility: AccessibilityInfo = {};
  
  // Look for ARIA attributes in the component
  const ariaMatches = componentContent.matchAll(/aria-(\w+)=/g);
  const ariaAttributes = Array.from(new Set(Array.from(ariaMatches, m => `aria-${m[1]}`)));
  
  if (ariaAttributes.length > 0) {
    accessibility.ariaAttributes = ariaAttributes;
  }

  // Look for keyboard event handlers
  const keyboardEvents = [];
  if (componentContent.includes('onkeydown') || componentContent.includes('keydown')) {
    keyboardEvents.push('Arrow keys for navigation');
  }
  if (componentContent.includes('Enter') || componentContent.includes('Space')) {
    keyboardEvents.push('Enter/Space for activation');
  }
  if (componentContent.includes('Escape')) {
    keyboardEvents.push('Escape to close/cancel');
  }
  if (componentContent.includes('Tab')) {
    keyboardEvents.push('Tab for focus navigation');
  }

  if (keyboardEvents.length > 0) {
    accessibility.keyboardNavigation = keyboardEvents;
  }

  // Check for focus management
  if (componentContent.includes('focus()') || componentContent.includes('autofocus')) {
    accessibility.focusManagement = 'Component manages focus appropriately';
  }

  return accessibility;
}

/**
 * Generate basic code examples for a component
 */
export function generateBasicExamples(componentName: string, props: PropDefinition[]): CodeExample[] {
  const examples: CodeExample[] = [];

  // Basic usage example
  examples.push({
    title: 'Basic Usage',
    description: `Simple ${componentName} with default settings`,
    code: `<${componentName}>
  Default content
</${componentName}>`,
    language: 'svelte',
    category: 'basic'
  });

  // Props example if component has props
  if (props.length > 0) {
    const exampleProps = props
      .filter(prop => !prop.required || prop.defaultValue)
      .slice(0, 3)
      .map(prop => {
        const value = getExampleValue(prop.type, prop.defaultValue);
        return `${prop.name}=${value}`;
      })
      .join('\n  ');

    if (exampleProps) {
      examples.push({
        title: 'With Props',
        description: `${componentName} with custom properties`,
        code: `<${componentName}
  ${exampleProps}
>
  Custom content
</${componentName}>`,
        language: 'svelte',
        category: 'basic'
      });
    }
  }

  return examples;
}

/**
 * Create complete component documentation from parsed information
 */
export function createComponentDocumentation(
  name: string,
  category: ComponentDocumentation['category'],
  importPath: string,
  typeContent: string,
  componentContent: string,
  description?: string
): ComponentDocumentation {
  const props = parsePropsFromInterface(typeContent);
  const events = parseEventsFromInterface(typeContent);
  const slots = parseSlotsFromInterface(typeContent);
  const accessibility = parseAccessibilityInfo(componentContent);
  const examples = generateBasicExamples(name, props);

  return {
    name,
    description: description || `${name} component from the SV Project Helper UI library`,
    category,
    importPath,
    props,
    events,
    slots,
    examples,
    accessibility,
    lastUpdated: new Date().toISOString().split('T')[0]
  };
}

// Helper functions

function extractDefaultValue(type: string): string | undefined {
  // Extract default values from union types like 'primary' | 'secondary'
  const unionMatch = type.match(/^'([^']+)'/);
  if (unionMatch) {
    return unionMatch[1];
  }
  
  // Common defaults based on type
  if (type === 'boolean') return 'false';
  if (type === 'string') return undefined;
  if (type === 'number') return '0';
  
  return undefined;
}

function extractEventDetail(type: string): string | undefined {
  const customEventMatch = type.match(/CustomEvent<(.+)>/);
  if (customEventMatch) {
    return customEventMatch[1];
  }
  return undefined;
}

function getExampleValue(type: string, defaultValue?: string): string {
  if (defaultValue) return `"${defaultValue}"`;
  
  if (type.includes('boolean')) return '{true}';
  if (type.includes('number')) return '{42}';
  if (type.includes('string')) return '"example"';
  if (type.includes('|')) {
    // Union type - pick first option
    const firstOption = type.split('|')[0].trim().replace(/['"]/g, '');
    return `"${firstOption}"`;
  }
  
  return '"value"';
}