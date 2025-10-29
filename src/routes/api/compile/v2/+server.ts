import { json, type RequestHandler } from '@sveltejs/kit'
import { getIframeThemeCSS } from '$lib/docs/theme-injector.js'

/**
 * Enhanced compilation API for Svelte 5 with iframe support
 *
 * This API:
 * 1. Takes Svelte component code
 * 2. Generates a smart HTML fallback preview
 * 3. Injects theme CSS
 * 4. Returns iframe-ready HTML
 *
 * Note: Full Svelte 5 compilation requires component bundling (future enhancement)
 */
export const POST: RequestHandler = async ({ request }) => {
  try {
    const { code } = await request.json()

    if (!code || typeof code !== 'string') {
      return json({ error: 'Invalid code provided' }, { status: 400 })
    }

    // Extract any $lib/ui imports to understand dependencies
    const uiImports = extractUIImports(code)

    // Generate smart HTML fallback with preserved structure
    const html = generateFallbackHTML(code, uiImports)

    return json({
      html,
      css: '',
      js: '',
      success: true,
      fallback: true,
      message:
        uiImports.length > 0
          ? `Preview: Static HTML fallback. UI components (${uiImports.join(
              ', '
            )}) require component bundling for full rendering.`
          : 'Preview: Using static HTML render (Svelte compilation coming soon)',
    })
  } catch (error) {
    console.error('Compilation error:', error)
    return json(
      {
        error: error instanceof Error ? error.message : 'Compilation failed',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

/**
 * Generate fallback HTML when compilation fails
 */
function generateFallbackHTML(code: string, imports: string[] = []): string {
  const themeCSS = getIframeThemeCSS()

  // Strip script blocks but keep the structure
  let htmlContent = code.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim()

  // Smart replacements to preserve more structure
  htmlContent = htmlContent
    // Replace {variable} with empty or placeholder
    .replace(/\{\s*[^}]+\s*\}/g, (match) => {
      // Try to be smart - if it looks like a string or number, keep the text
      const inner = match.slice(1, -1).trim()
      if (/^['"]/.test(inner)) {
        return inner.slice(1, -1) // Remove quotes for string literals
      }
      if (/^\d+$/.test(inner)) {
        return inner // Keep numbers
      }
      // For expressions, try to extract readable content
      if (inner.includes('?') && inner.includes(':')) {
        // Ternary operator - extract the display text
        return 'Preview'
      }
      if (inner.includes('+')) {
        // String concatenation - might have strings
        return inner
      }
      // Default: replace with placeholder
      return '[Preview]'
    })
    .replace(/\{@html\s+[^}]+\}/gi, '[HTML Content]')
    .replace(/\{@key[^}]+\}/gi, '')
    .trim()

  // Extract and inject style blocks
  const styleMatches = code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || []
  const customStyles = styleMatches.map((style) => style.replace(/<\/?style[^>]*>/gi, '')).join('\n')

  const importNote =
    imports.length > 0
      ? `<div style="color: var(--color-warning); font-size: 0.875rem; margin-bottom: 1rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: var(--radius-md); border-left: 3px solid var(--color-warning);">
        <div style="font-weight: 600; margin-bottom: 0.25rem;">⚠️ UI Library Imports Detected</div>
        <div style="font-size: 0.8125rem; opacity: 0.9;">Components: ${imports.join(', ')}</div>
        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.25rem;">Full Svelte 5 rendering with component bundling coming soon</div>
      </div>`
      : `<div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem; padding: 0.5rem; text-align: center; opacity: 0.8;">
        Showing static preview (Svelte compilation coming soon)
      </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Preview</title>
  <style>
    ${themeCSS}
    ${customStyles}
    .fallback-preview {
      padding: 1rem;
    }
  </style>
</head>
<body>
  <div class="fallback-preview">
    ${importNote}
    ${htmlContent}
  </div>
</body>
</html>`
}

/**
 * Extract $lib/ui imports from code
 */
function extractUIImports(code: string): string[] {
  const imports: string[] = []
  const importRegex = /import\s*{([^}]+)}\s*from\s*['"]\$lib\/ui['"]/g

  let match
  while ((match = importRegex.exec(code)) !== null) {
    const importedItems = match[1].split(',').map((item) => item.trim().split(' as ')[0].trim())
    imports.push(...importedItems)
  }

  return [...new Set(imports)]
}
