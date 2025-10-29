import { json, error, type RequestHandler } from '@sveltejs/kit'
import { getComponent } from '../../../../../lib/docs/scanner.js'
import { parseComponent } from '../../../../../lib/docs/parser.js'
import { generateExamples, generateAccessibilityInfo } from '../../../../../lib/docs/generator.js'
import type { ComponentDocumentation } from '../../../../../lib/docs/types.js'

export const GET: RequestHandler = async ({ params }) => {
  const componentName = params.component

  if (!componentName) {
    throw error(400, 'Component name is required')
  }

  try {
    // Find the component in src/lib/ui
    const componentInfo = await getComponent(componentName)

    if (!componentInfo) {
      throw error(404, `Component "${componentName}" not found`)
    }

    // Parse the component to extract props and info
    const parsedComponent = await parseComponent(componentInfo)

    if (!parsedComponent) {
      throw error(500, `Failed to parse component "${componentName}"`)
    }

    // Generate examples
    const examples = generateExamples(parsedComponent)

    // Generate accessibility info
    const accessibility = generateAccessibilityInfo(parsedComponent)

    // Build the documentation object
    const documentation: ComponentDocumentation = {
      name: parsedComponent.name,
      description: `${parsedComponent.name} component from the ${parsedComponent.category} category`,
      category: parsedComponent.category,
      importPath: parsedComponent.importPath,
      props: parsedComponent.props,
      events: [], // Will be enhanced later if needed
      slots: parsedComponent.hasChildren ? [{ name: 'default', description: 'Component content' }] : [],
      examples,
      accessibility,
      version: '1.0.0',
    }

    return json(documentation)
  } catch (err) {
    // If it's already a SvelteKit error, re-throw it
    if (err && typeof err === 'object' && 'status' in err) {
      throw err
    }

    // Otherwise, create a generic error
    throw error(
      500,
      `Error loading component "${componentName}": ${err instanceof Error ? err.message : 'Unknown error'}`
    )
  }
}
