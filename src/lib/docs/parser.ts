/**
 * Parser to extract props from inline TypeScript interfaces in .svelte files
 */

import { readFile } from 'node:fs/promises'
import type { ComponentInfo } from './scanner'
import type { PropDefinition } from './types'

export interface ParsedComponent {
  name: string
  category: ComponentInfo['category']
  props: PropDefinition[]
  hasChildren: boolean
  importPath: string
}

/**
 * Parse interface Props from a .svelte file
 */
async function parsePropsInterface(content: string): Promise<PropDefinition[]> {
  const props: PropDefinition[] = []

  // Extract the interface Props definition
  const interfaceMatch = content.match(/interface\s+Props\s*\{([^}]+)\}/s)
  if (!interfaceMatch) return props

  const interfaceBody = interfaceMatch[1]

  // Extract individual properties
  // Handle multi-line properties and comments
  const propRegex = /(\w+)\??\s*:\s*([^;]+);/g
  let match

  while ((match = propRegex.exec(interfaceBody)) !== null) {
    const propName = match[1]
    const propType = match[2].trim()
    const isOptional = propName.includes('?')
    const name = propName.replace('?', '')

    // Skip children prop (we'll handle it separately)
    if (name === 'children') continue

    props.push({
      name,
      type: propType,
      defaultValue: undefined,
      required: !isOptional,
      description: inferDescription(name),
    })
  }

  return props
}

/**
 * Parse default values from $props() destructuring
 */
function parseDefaultValues(content: string, props: PropDefinition[]): void {
  // Extract the $props() destructuring
  const propsMatch = content.match(/\$props\(\)[^;]*;/s)
  if (!propsMatch) return

  const destructuring = propsMatch[0]

  // Match default value patterns: propName = 'value' or propName = someExpression
  for (const prop of props) {
    const regex = new RegExp(`${prop.name}\\s*=\\s*([^,}]+)`, 'g')
    const match = regex.exec(destructuring)

    if (match) {
      const defaultValue = match[1]
        .trim()
        .replace(/^['"]|['"]$/g, '') // Remove quotes
        .replace(/\n/g, '') // Remove newlines
        .trim()

      // Don't override if it's a complex expression
      if (!defaultValue.includes('{') && !defaultValue.includes('[')) {
        prop.defaultValue = defaultValue
      }
    }
  }
}

/**
 * Check if component has children (Snippet prop)
 */
function hasChildren(content: string): boolean {
  return content.includes('children: Snippet') || content.includes('children?: Snippet')
}

/**
 * Infer description from prop name
 */
function inferDescription(name: string): string {
  const descriptions: Record<string, string> = {
    variant: 'Visual style variant of the component',
    size: 'Size of the component',
    disabled: 'Whether the component is disabled',
    loading: 'Whether the component is in loading state',
    placeholder: 'Placeholder text',
    value: 'Current value',
    label: 'Label text',
    error: 'Error message to display',
    required: 'Whether the field is required',
    readonly: 'Whether the input is readonly',
    href: 'URL to navigate to',
    target: 'Link target attribute',
    type: 'HTML element type',
    onclick: 'Click event handler',
    oninput: 'Input event handler',
    onChange: 'Change event handler',
    ariaLabel: 'Accessible label for screen readers',
    interactive: 'Whether the component is interactive',
    padding: 'Internal padding',
    direction: 'Layout direction',
    gap: 'Spacing between items',
    align: 'Alignment of content',
    justify: 'Justification of content',
    wrap: 'Whether to wrap content',
    cols: 'Number of columns',
    maxWidth: 'Maximum width',
    rounded: 'Whether to apply rounded corners',
    outline: 'Whether to show outline style',
    weight: 'Font weight',
    color: 'Text color',
    truncate: 'Whether to truncate text',
  }

  return descriptions[name] || `Component property for ${name}`
}

/**
 * Parse a component file and extract its documentation
 */
export async function parseComponent(component: ComponentInfo): Promise<ParsedComponent | null> {
  try {
    const content = await readFile(component.path, 'utf-8')

    // Parse interface Props
    const props = await parsePropsInterface(content)

    // Extract default values
    parseDefaultValues(content, props)

    // Check for children
    const hasChildrenProp = hasChildren(content)

    // Determine import path
    const importPath = '@big0290/sv-prj-helper-ui'

    return {
      name: component.name,
      category: component.category,
      props,
      hasChildren: hasChildrenProp,
      importPath,
    }
  } catch (error) {
    console.error(`Failed to parse component ${component.name}:`, error)
    return null
  }
}

/**
 * Parse multiple components
 */
export async function parseComponents(components: ComponentInfo[]): Promise<ParsedComponent[]> {
  const parsed: ParsedComponent[] = []

  for (const component of components) {
    const parsedComponent = await parseComponent(component)
    if (parsedComponent) {
      parsed.push(parsedComponent)
    }
  }

  return parsed
}
