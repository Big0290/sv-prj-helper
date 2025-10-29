/**
 * Component scanner to discover all components in src/lib/ui
 */

import { readdir } from 'node:fs/promises'
import { join, basename } from 'node:path'

export interface ComponentInfo {
  name: string
  path: string
  category: 'atoms' | 'molecules' | 'organisms' | 'layouts' | 'utils' | 'hooks' | 'theme'
  relativePath: string
}

const UIBASE_PATH = 'src/lib/ui'

/**
 * Recursively find all .svelte files in a directory
 */
async function findSvelteFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files: string[] = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await findSvelteFiles(fullPath, baseDir)))
    } else if (entry.isFile() && entry.name.endsWith('.svelte')) {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Determine component category from file path
 */
function getCategoryFromPath(filePath: string): ComponentInfo['category'] {
  if (filePath.includes('/atoms/')) return 'atoms'
  if (filePath.includes('/molecules/')) return 'molecules'
  if (filePath.includes('/organisms/')) return 'organisms'
  if (filePath.includes('/layouts/')) return 'layouts'
  if (filePath.includes('/utils/')) return 'utils'
  if (filePath.includes('/hooks/')) return 'hooks'
  if (filePath.includes('/theme/')) return 'theme'
  return 'atoms' // default
}

/**
 * Get component name from file path
 */
function getComponentName(filePath: string): string {
  const fileName = basename(filePath, '.svelte')
  return fileName
}

/**
 * Scan all components in src/lib/ui
 */
export async function scanComponents(): Promise<ComponentInfo[]> {
  const baseDir = UIBASE_PATH
  const files = await findSvelteFiles(baseDir)

  const components: ComponentInfo[] = files.map((filePath) => ({
    name: getComponentName(filePath),
    path: filePath,
    category: getCategoryFromPath(filePath),
    relativePath: filePath.replace(baseDir, ''),
  }))

  return components.sort((a, b) => {
    // Sort by category first, then by name
    const categoryOrder = ['atoms', 'molecules', 'organisms', 'layouts', 'utils', 'hooks', 'theme']
    const categoryDiff = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
    if (categoryDiff !== 0) return categoryDiff
    return a.name.localeCompare(b.name)
  })
}

/**
 * Get component by name
 */
export async function getComponent(name: string): Promise<ComponentInfo | null> {
  const components = await scanComponents()
  return components.find((c) => c.name.toLowerCase() === name.toLowerCase()) || null
}

/**
 * Get components by category
 */
export async function getComponentsByCategory(category: ComponentInfo['category']): Promise<ComponentInfo[]> {
  const components = await scanComponents()
  return components.filter((c) => c.category === category)
}
