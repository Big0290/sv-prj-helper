import { json, type RequestHandler } from '@sveltejs/kit'
import { scanComponents } from '../../../../lib/docs/scanner.js'
import { parseComponent } from '../../../../lib/docs/parser.js'

export const GET: RequestHandler = async () => {
  try {
    // Scan all components from src/lib/ui
    const components = await scanComponents()

    // Parse component info
    const componentList = await Promise.all(
      components.map(async (comp) => {
        const parsed = await parseComponent(comp)
        return {
          name: comp.name,
          category: comp.category,
          description: `${comp.name} component`,
          props: parsed?.props.length || 0,
        }
      })
    )

    return json({
      components: componentList,
      total: componentList.length,
    })
  } catch (err) {
    return json({
      components: [],
      total: 0,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }
}
