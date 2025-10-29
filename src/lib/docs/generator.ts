/**
 * Generate code examples from component props and variants
 */

import type { PropDefinition, CodeExample } from './types'
import type { ParsedComponent } from './parser'

/**
 * Extract union type variants from a prop type
 */
function extractUnionVariants(type: string): string[] {
  // Match union types like 'primary' | 'secondary' | 'ghost'
  const match = type.match(/'([^']+)'(\s*\|\s*'([^']+)')+/g)
  if (!match) return []

  const variants: string[] = []
  const allMatches = type.match(/'([^']+)'/g)
  if (allMatches) {
    allMatches.forEach((m) => {
      const variant = m.replace(/'/g, '')
      if (variant) variants.push(variant)
    })
  }

  return variants
}

/**
 * Check if a prop represents a variant
 */
function isVariantProp(prop: PropDefinition): boolean {
  return prop.name === 'variant' && prop.type.includes('|')
}

/**
 * Check if a prop represents a size
 */
function isSizeProp(prop: PropDefinition): boolean {
  return prop.name === 'size' && prop.type.includes('|')
}

/**
 * Check if a prop represents a type (like input type)
 */
function isTypeProp(prop: PropDefinition): boolean {
  return prop.name === 'type' && prop.type.includes('|')
}

/**
 * Generate basic usage example
 */
function generateBasicExample(component: ParsedComponent): CodeExample {
  const props = component.hasChildren
    ? '<' + component.name + '>Default Content</' + component.name + '>'
    : '<' + component.name + ' />'

  const importLine = `import { ${component.name} } from '@big0290/sv-prj-helper-ui';`
  const fullCode = `<script>\n  ${importLine}\n</script>\n\n${props}`

  return {
    title: 'Basic Usage',
    description: `Simple ${component.name} component with default props`,
    code: fullCode,
    language: 'svelte',
  }
}

/**
 * Generate variant examples
 */
function generateVariantExamples(component: ParsedComponent): CodeExample[] {
  const examples: CodeExample[] = []

  const variantProp = component.props.find(isVariantProp)
  if (!variantProp) return examples

  const variants = extractUnionVariants(variantProp.type)
  if (variants.length === 0) return examples

  // Single variant example
  if (variants.length <= 4) {
    const importLine = `import { ${component.name} } from '@big0290/sv-prj-helper-ui';`
    const variantExamples = variants
      .map((v) => {
        const content = component.hasChildren ? `${v.charAt(0).toUpperCase() + v.slice(1)} Variant` : ''
        return `<${component.name} variant="${v}">${content}</${component.name}>`
      })
      .join('\n')

    examples.push({
      title: 'Variants',
      description: `All available ${component.name} variants`,
      code: `<script>\n  ${importLine}\n</script>\n\n${variantExamples}`,
      language: 'svelte',
    })
  } else {
    // Show first few variants as example
    const importLine = `import { ${component.name} } from '@big0290/sv-prj-helper-ui';`
    const sampleVariants = variants.slice(0, 3)
    const variantExamples = sampleVariants
      .map((v) => {
        const content = component.hasChildren ? `${v.charAt(0).toUpperCase() + v.slice(1)} Variant` : ''
        return `<${component.name} variant="${v}">${content}</${component.name}>`
      })
      .join('\n')

    examples.push({
      title: 'Variants',
      description: `Available ${component.name} variants`,
      code: `<script>\n  ${importLine}\n</script>\n\n${variantExamples}`,
      language: 'svelte',
    })
  }

  return examples
}

/**
 * Generate size examples
 */
function generateSizeExamples(component: ParsedComponent): CodeExample[] {
  const examples: CodeExample[] = []

  const sizeProp = component.props.find(isSizeProp)
  if (!sizeProp) return examples

  const sizes = extractUnionVariants(sizeProp.type)
  if (sizes.length === 0) return examples

  const importLine = `import { ${component.name} } from '@big0290/sv-prj-helper-ui';`
  const sizeExamples = sizes
    .map((s) => {
      const content = component.hasChildren ? `${s.charAt(0).toUpperCase() + s.slice(1)} Size` : ''
      return `<${component.name} size="${s}">${content}</${component.name}>`
    })
    .join('\n')

  examples.push({
    title: 'Sizes',
    description: `Different sizes for ${component.name}`,
    code: `<script>\n  ${importLine}\n</script>\n\n${sizeExamples}`,
    language: 'svelte',
  })

  return examples
}

/**
 * Generate type examples (like input types)
 */
function generateTypeExamples(component: ParsedComponent): CodeExample[] {
  const examples: CodeExample[] = []

  const typeProp = component.props.find(isTypeProp)
  if (!typeProp) return examples

  const types = extractUnionVariants(typeProp.type)
  if (types.length === 0) return examples

  // Only generate for HTML-like types (not button types)
  const htmlTypeComponents = ['Input', 'Textarea']
  if (!htmlTypeComponents.includes(component.name)) return examples

  const importLine = `import { ${component.name} } from '@big0290/sv-prj-helper-ui';`
  const typeExamples = types
    .map((t) => {
      const placeholder = `Enter ${t}`
      return `<${component.name} type="${t}" placeholder="${placeholder}" />`
    })
    .join('\n')

  examples.push({
    title: 'Types',
    description: `Different types for ${component.name}`,
    code: `<script>\n  ${importLine}\n</script>\n\n${typeExamples}`,
    language: 'svelte',
  })

  return examples
}

/**
 * Generate state examples (disabled, loading, etc.)
 */
function generateStateExamples(component: ParsedComponent): CodeExample[] {
  const examples: CodeExample[] = []
  const states: PropDefinition[] = []

  if (component.props.find((p) => p.name === 'disabled')) {
    states.push({ name: 'disabled', type: 'boolean', defaultValue: 'false', required: false, description: '' })
  }
  if (component.props.find((p) => p.name === 'loading')) {
    states.push({ name: 'loading', type: 'boolean', defaultValue: 'false', required: false, description: '' })
  }

  if (states.length === 0) return examples

  const importLine = `import { ${component.name} } from '@big0290/sv-prj-helper-ui';`
  const stateExamples = states
    .map((state) => {
      const content = component.hasChildren ? `${state.name.charAt(0).toUpperCase() + state.name.slice(1)} State` : ''
      const attrs = state.name === 'loading' ? `${state.name}` : `${state.name}={true}`
      return `<${component.name} ${attrs}>${content}</${component.name}>`
    })
    .join('\n')

  examples.push({
    title: 'States',
    description: `Different states for ${component.name}`,
    code: `<script>\n  ${importLine}\n</script>\n\n${stateExamples}`,
    language: 'svelte',
  })

  return examples
}

/**
 * Generate examples for a component
 */
export function generateExamples(component: ParsedComponent): CodeExample[] {
  const examples: CodeExample[] = []

  // Basic usage
  const basicExample = generateBasicExample(component)
  examples.push(basicExample)

  // Variants
  const variantExamples = generateVariantExamples(component)
  examples.push(...variantExamples)

  // Sizes
  const sizeExamples = generateSizeExamples(component)
  examples.push(...sizeExamples)

  // Types (like input types: text, password, number, etc.)
  const typeExamples = generateTypeExamples(component)
  examples.push(...typeExamples)

  // States
  const stateExamples = generateStateExamples(component)
  examples.push(...stateExamples)

  return examples
}

/**
 * Generate accessibility info from component props
 */
export function generateAccessibilityInfo(component: ParsedComponent) {
  const ariaLabel = component.props.find((p) => p.name === 'ariaLabel')
  const disabled = component.props.find((p) => p.name === 'disabled')
  const loading = component.props.find((p) => p.name === 'loading')

  const info: any = {
    keyboardNavigation: [],
    ariaAttributes: [],
    focusManagement: 'Component receives focus with visible indicators',
    guidelines: [],
  }

  if (ariaLabel) {
    info.ariaAttributes.push('aria-label for screen reader support')
    info.guidelines.push('Provide meaningful aria-label for screen readers')
  }

  if (disabled) {
    info.ariaAttributes.push('aria-disabled when disabled')
    info.guidelines.push('Ensure disabled state is properly announced')
  }

  if (loading) {
    info.ariaAttributes.push('aria-busy when loading')
  }

  // Default keyboard navigation for interactive components
  if (component.props.find((p) => p.name === 'onclick')) {
    info.keyboardNavigation.push('Tab to focus the component')
    info.keyboardNavigation.push('Enter or Space to activate')
  }

  return info
}
