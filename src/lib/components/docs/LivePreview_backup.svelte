<script lang="ts">
  import { onMount } from 'svelte'
  import { Text } from '$lib/ui'

  interface Props {
    code: string
    showError?: boolean
  }

  let { code, showError = true }: Props = $props()

  let previewContainer: HTMLDivElement | undefined = $state()
  let error: string | null = $state(null)
  let loading = $state(false)
  let messageHandler: ((event: MessageEvent) => void) | null = $state(null)

  // Cleanup message listener on unmount
  onMount(() => {
    return () => {
      if (messageHandler) {
        window.removeEventListener('message', messageHandler)
      }
    }
  })

  let lastCode = $state('')

  // Move the function definition before $effect
  const compileWithSvelteREPL = async (svelteCode: string): Promise<string> => {
    try {
      // Wrap the component code
      let componentCode = svelteCode.trim()

      // If it's just tags without a script tag, wrap it
      if (componentCode.startsWith('<') && !componentCode.includes('<script')) {
        const scriptStart = '<scr' + 'ipt>'
        const scriptEnd = '</scr' + 'ipt>'
        componentCode =
          scriptStart + '\nexport default {\n  // Component wrapper\n};\n' + scriptEnd + '\n\n' + componentCode
      }

      // Call Svelte REPL's compile endpoint
      const response = await fetch('https://svelte.dev/repl/repl.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: {
            'App.svelte': componentCode,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Svelte REPL compilation failed')
      }

      const compiled = await response.json()

      // Generate iframe HTML with the compiled code
      const scriptStart = '<scr' + 'ipt type="module">'
      const scriptEnd = '</scr' + 'ipt>'
      const html =
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <style>' +
        '    * { margin: 0; padding: 0; box-sizing: border-box; }' +
        '    html, body { width: 100%; height: 100%; margin: 0; padding: 0; font-family: system-ui, sans-serif; }' +
        '    body { padding: 1rem; }' +
        '  </style>' +
        compiled.css.code +
        '</head>' +
        '<body>' +
        '  <div id="app"></div>' +
        scriptStart +
        compiled.js.code +
        scriptEnd +
        '</body>' +
        '</html>'

      return html
    } catch (err) {
      console.error('LivePreview: Svelte REPL compilation failed:', err)
      // Fallback to HTML preview
      return await createPreviewHTML(svelteCode)
    }
  }

  // Helper function for converting Svelte tags to HTML placeholders (used as fallback)
  const createPreviewHTML = async (svelteCode: string): Promise<string> => {
    let html = '<!DOCTYPE html><html><head>'
    html += '<meta charset="utf-8">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1">'
    html += '<style>'
    html += '* { margin: 0; padding: 0; box-sizing: border-box; }'
    html +=
      'html, body { width: 100%; height: 100%; margin: 0; padding: 0; font-family: system-ui, sans-serif; overflow: auto; }'
    html += ':root {'
    html += '  --color-primary: #a855f7;'
    html += '  --color-primary-600: #9333ea;'
    html += '  --color-secondary: #3b82f6;'
    html += '  --color-success: #10b981;'
    html += '  --color-warning: #f59e0b;'
    html += '  --color-error: #ef4444;'
    html += '  --color-info: #3b82f6;'
    html += '  --text-primary: #1a1a1a;'
    html += '  --text-secondary: #6b7280;'
    html += '  --bg-primary: #ffffff;'
    html += '  --bg-secondary: #f9fafb;'
    html += '  --border-color: #e5e7eb;'
    html += '  --radius-md: 0.375rem;'
    html += '  --radius-sm: 0.25rem;'
    html += '}'
    html += 'body { padding: 1rem; }'
    html += '</style>'
    html += '</head><body>'

    // Find all component tags
    const componentPattern = /<([A-Z][a-zA-Z]*)([^>]*?)>(.*?)<\/\1>/gs
    const selfClosingPattern = /<([A-Z][a-zA-Z]*)([^>]*?)\/>/gs

    const allMatches: RegExpMatchArray[] = []
    let match

    while ((match = componentPattern.exec(svelteCode)) !== null) {
      allMatches.push(match)
    }
    while ((match = selfClosingPattern.exec(svelteCode)) !== null) {
      allMatches.push(match)
    }

    let hasContent = false

    console.log('LivePreview: Found', allMatches.length, 'component matches')

    for (const match of allMatches) {
      const tagName = match[1]
      const attrs = match[2] || ''
      const content = match[3] || ''

      console.log('LivePreview: Processing component:', tagName, 'attrs:', attrs, 'content:', content)
      const displayHTML = convertSvelteToHTML(tagName, attrs, content?.trim() || '')
      html += displayHTML
      hasContent = true
    }

    if (!hasContent) {
      console.log('LivePreview: No components found, showing placeholder')
      html += '<div style="padding: 2rem; text-align: center; color: #6b7280;">No components found</div>'
    }

    html += '</body></html>'

    return html
  }

  // Render preview when code changes
  $effect(() => {
    if (!code.trim()) {
      error = null
      lastCode = ''
      return
    }

    if (!previewContainer) {
      return
    }

    // Skip if code hasn't changed
    if (code === lastCode) {
      return
    }

    lastCode = code
    const container = previewContainer

    // Clear previous content
    container.innerHTML = ''

    // Render new content
    ;(async () => {
      loading = true
      error = null

      try {
        // Use HTML preview for now (true Svelte compilation needs more setup)
        const htmlContent = await createPreviewHTML(code)
        console.log('LivePreview: HTML preview generated')

        // Create iframe
        const iframe = document.createElement('iframe')
        iframe.style.width = '100%'
        iframe.style.height = '200px'
        iframe.style.minHeight = '200px'
        iframe.style.border = '1px solid #e5e7eb'
        iframe.style.background = '#ffffff'
        iframe.style.display = 'block'
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')

        // Set load handler BEFORE appending or setting srcdoc
        iframe.onload = () => {
          console.log('LivePreview: ✅ Iframe loaded!')
          loading = false
        }

        iframe.addEventListener('load', () => {
          console.log('LivePreview: ✅ AddEventListener load fired!')
        })

        iframe.onerror = () => {
          console.error('LivePreview: Iframe error fired')
          loading = false
          error = 'Failed to load preview'
        }

        // Setup message handler
        function handleIframeMessage(event: MessageEvent) {
          if (event.source === iframe.contentWindow && event.data.type === 'preview-error') {
            error = event.data.message
          }
        }

        if (messageHandler) {
          window.removeEventListener('message', messageHandler)
        }

        messageHandler = handleIframeMessage
        window.addEventListener('message', messageHandler)

        // Append iframe to DOM first
        console.log('LivePreview: Appending iframe to container')
        container.appendChild(iframe)

        // Set content AFTER appending
        console.log('LivePreview: Setting srcdoc')
        iframe.srcdoc = htmlContent

        // Debug: Log first 500 chars of HTML to verify structure
        console.log('LivePreview: Generated HTML preview:', htmlContent.substring(0, 500))

        // Note: srcdoc iframes may not fire onload in some browsers reliably
        // Set loading to false after a small delay to allow rendering
        setTimeout(() => {
          console.log('LivePreview: Content set, hiding loading after delay')
          loading = false
        }, 100)
      } catch (err) {
        loading = false
        error = err instanceof Error ? err.message : 'Failed to render preview'
        console.error('Preview error:', err)
      }
    })()
  })

  // REMOVED DUPLICATE FUNCTION - using the one defined earlier in the file
  async function REMOVED_DUPLICATE_createPreviewHTML(svelteCode: string): Promise<string> {
    // This function is unused and should not be called
    let html = '<!DOCTYPE html><html><head>'
    html += '<meta charset="utf-8">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1">'
    html += '<style>'
    html += '* { margin: 0; padding: 0; box-sizing: border-box; }'
    html +=
      'html, body { width: 100%; height: 100%; margin: 0; padding: 0; font-family: system-ui, sans-serif; overflow: auto; }'
    html += ':root {'
    html += '  --color-primary: #a855f7;'
    html += '  --color-primary-600: #9333ea;'
    html += '  --color-secondary: #3b82f6;'
    html += '  --color-success: #10b981;'
    html += '  --color-warning: #f59e0b;'
    html += '  --color-error: #ef4444;'
    html += '  --color-info: #3b82f6;'
    html += '  --text-primary: #1a1a1a;'
    html += '  --text-secondary: #6b7280;'
    html += '  --bg-primary: #ffffff;'
    html += '  --bg-secondary: #f9fafb;'
    html += '  --border-color: #e5e7eb;'
    html += '  --radius-md: 0.375rem;'
    html += '  --radius-sm: 0.25rem;'
    html += '}'
    html += 'body { padding: 1rem; }'
    html += '</style>'
    html += '</head><body>'

    // Find all component tags
    const componentPattern = /<([A-Z][a-zA-Z]*)([^>]*?)>(.*?)<\/\1>/gs
    const selfClosingPattern = /<([A-Z][a-zA-Z]*)([^>]*?)\/>/gs

    const allMatches: RegExpMatchArray[] = []
    let match

    while ((match = componentPattern.exec(svelteCode)) !== null) {
      allMatches.push(match)
    }
    while ((match = selfClosingPattern.exec(svelteCode)) !== null) {
      allMatches.push(match)
    }

    let hasContent = false

    console.log('LivePreview: Found', allMatches.length, 'component matches')

    for (const match of allMatches) {
      const tagName = match[1]
      const attrs = match[2] || ''
      const content = match[3] || ''

      console.log('LivePreview: Processing component:', tagName, 'attrs:', attrs, 'content:', content)
      const displayHTML = convertSvelteToHTML(tagName, attrs, content?.trim() || '')
      html += displayHTML
      hasContent = true
    }

    if (!hasContent) {
      console.log('LivePreview: No components found, showing placeholder')
      html += '<div style="padding: 2rem; text-align: center; color: #6b7280;">No components found</div>'
    }

    html += '</body></html>'

    return html
  }

  function convertSvelteToHTML(tagName: string, attrs: string, content: string): string {
    console.log('LivePreview: convertSvelteToHTML called for:', tagName, 'attrs:', attrs)

    const attrMap: Record<string, string> = {}
    const attrRegex = /(\w+)="([^"]*)"/g
    let match
    while ((match = attrRegex.exec(attrs)) !== null) {
      attrMap[match[1]] = match[2]
    }

    switch (tagName) {
      case 'Avatar':
        const avatarSize = attrMap['size'] || 'md'
        const avatarName = attrMap['name'] || 'JD'
        const avatarSrc = attrMap['src'] || ''

        let avatarStyles = `
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 600;
          font-family: system-ui, sans-serif;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          color: white;
        `

        switch (avatarSize) {
          case 'sm':
            avatarStyles += 'width: 2rem; height: 2rem; font-size: 0.75rem;'
            break
          case 'md':
            avatarStyles += 'width: 3rem; height: 3rem; font-size: 0.875rem;'
            break
          case 'lg':
            avatarStyles += 'width: 4rem; height: 4rem; font-size: 1rem;'
            break
          case 'xl':
            avatarStyles += 'width: 5rem; height: 5rem; font-size: 1.25rem;'
            break
          default:
            avatarStyles += 'width: 3rem; height: 3rem; font-size: 0.875rem;'
        }

        if (avatarSrc) {
          return `<img src="${avatarSrc}" style="${avatarStyles}" alt="${avatarName}" />`
        }

        return `<div style="${avatarStyles}">${avatarName}</div>`
      case 'Audio':
        return `
          <div style="background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); padding: 1.5rem; border-radius: var(--radius-md); border: 2px dashed var(--color-primary); display: inline-flex; flex-direction: column; align-items: center; gap: 0.75rem;">
            <div style="font-size: 2.5rem;">🎵</div>
            <div style="font-weight: 500;">Audio</div>
          </div>
        `

      case 'Button':
        const variant = attrMap['variant'] || 'primary'
        const size = attrMap['size'] || 'md'
        const disabled = attrMap['disabled'] === 'true'
        const busy = attrMap['aria-busy'] === 'true'

        let buttonStyles = `
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.625rem 1.25rem;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: system-ui, sans-serif;
        `

        switch (variant) {
          case 'primary':
            buttonStyles += 'background: var(--color-primary); color: white;'
            break
          case 'secondary':
            buttonStyles += 'background: var(--color-secondary); color: white;'
            break
          case 'ghost':
            buttonStyles +=
              'background: transparent; border: 1px solid var(--border-color); color: var(--text-primary);'
            break
          case 'danger':
            buttonStyles += 'background: var(--color-error); color: white;'
            break
          default:
            buttonStyles += 'background: var(--color-primary); color: white;'
        }

        if (disabled) {
          buttonStyles += 'opacity: 0.5; cursor: not-allowed;'
        }

        return `<button style="${buttonStyles}" ${disabled ? 'disabled' : ''} ${busy ? 'aria-busy="true"' : ''}>${content || 'Button'}</button>`

      case 'Badge':
        const badgeVariant = attrMap['variant'] || 'default'
        const badgeSize = attrMap['size'] || 'md'

        let badgeStyles = `
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.625rem;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 500;
          font-family: system-ui, sans-serif;
        `

        switch (badgeVariant) {
          case 'primary':
            badgeStyles += 'background: rgba(168, 85, 247, 0.1); color: var(--color-primary);'
            break
          case 'success':
            badgeStyles += 'background: rgba(16, 185, 129, 0.1); color: var(--color-success);'
            break
          case 'warning':
            badgeStyles += 'background: rgba(245, 158, 11, 0.1); color: var(--color-warning);'
            break
          case 'error':
            badgeStyles += 'background: rgba(239, 68, 68, 0.1); color: var(--color-error);'
            break
          default:
            badgeStyles += 'background: var(--bg-secondary); color: var(--text-secondary);'
        }

        return `<span style="${badgeStyles}">${content || 'Badge'}</span>`

      default:
        // Generic component rendering
        const propCount = Object.keys(attrMap).length
        return `
          <div style="background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); padding: 1.5rem; border-radius: var(--radius-md); border: 2px dashed var(--color-primary); display: inline-flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="font-size: 2rem; font-weight: 600;">${tagName.substring(0, 2)}</div>
            <div style="font-weight: 500; font-size: 0.875rem;">${tagName}</div>
            ${propCount > 0 ? `<div style="font-size: 0.75rem; color: var(--text-secondary);">${propCount} props</div>` : ''}
          </div>
        `
    }
  }
</script>

<div class="live-preview">
  {#if loading}
    <div class="preview-loading">
      <div class="spinner"></div>
      <Text size="sm" color="var(--text-secondary)">Rendering preview...</Text>
    </div>
  {:else if error && showError}
    <div class="preview-error">
      <Text size="sm" color="var(--color-error)">Preview Error:</Text>
      <Text size="xs" color="var(--text-secondary)">{error}</Text>
    </div>
  {:else if !code.trim()}
    <div class="preview-empty">
      <Text size="sm" color="var(--text-secondary)">No code to preview</Text>
    </div>
  {:else}
    <div bind:this={previewContainer} class="preview-container"></div>
  {/if}
</div>

<style>
  .live-preview {
    width: 100%;
    height: 100%;
    min-height: 200px;
  }

  .preview-container {
    width: 100%;
    height: 100%;
    min-height: 200px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: white;
    position: relative;
    overflow: hidden;
  }

  :global(.preview-container iframe) {
    width: 100%;
    height: 100%;
    border: none;
  }

  .preview-loading,
  .preview-error,
  .preview-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 2rem;
    text-align: center;
  }

  .preview-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: var(--radius-md);
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--border-color);
    border-top: 2px solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
