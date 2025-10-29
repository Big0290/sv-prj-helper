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

  onMount(() => {
    return () => {
      if (messageHandler) {
        window.removeEventListener('message', messageHandler)
      }
    }
  })

  let lastCode = $state('')

  async function compileWithSvelteREPL(svelteCode: string): Promise<string> {
    try {
      let componentCode = svelteCode.trim()

      // Wrap in component if needed
      if (componentCode.startsWith('<') && !componentCode.includes('<script')) {
        const scriptStartTag = '<scr' + 'ipt>'
        const scriptEndTag = '</scr' + 'ipt>'
        componentCode = scriptStartTag + '\nexport default {}\n' + scriptEndTag + '\n\n' + componentCode
      }

      console.log('Compiling with Svelte REPL...')

      const response = await fetch('https://svelte.dev/repl/api/compile.json', {
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

      const result = await response.json()

      const html =
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <style>' +
        '    * { margin: 0; padding: 0; box-sizing: border-box; }' +
        '    html, body { width: 100%; height: 100%; font-family: system-ui, sans-serif; }' +
        '    body { padding: 1rem; }' +
        '  </style>' +
        result.css +
        '</head>' +
        '<body>' +
        '  <div id="app"></div>' +
        '  <scr' +
        'ipt type="module">' +
        result.js +
        '  </scr' +
        'ipt>' +
        '</body>' +
        '</html>'

      return html
    } catch (err) {
      console.error('Svelte REPL failed:', err)
      throw err
    }
  }

  $effect(() => {
    if (!code.trim()) {
      error = null
      lastCode = ''
      return
    }

    if (!previewContainer) {
      return
    }

    if (code === lastCode) {
      return
    }

    lastCode = code
    const container = previewContainer
    container.innerHTML = ''
    ;(async () => {
      loading = true
      error = null

      try {
        const htmlContent = await compileWithSvelteREPL(code)
        console.log('Compiled successfully')

        const iframe = document.createElement('iframe')
        iframe.style.width = '100%'
        iframe.style.height = '200px'
        iframe.style.border = '1px solid #e5e7eb'
        iframe.style.background = '#ffffff'
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')

        iframe.onload = () => {
          loading = false
          console.log('✅ Iframe loaded!')
        }

        iframe.onerror = () => {
          loading = false
          error = 'Failed to load preview'
        }

        function handleIframeMessage(event: MessageEvent) {
          if (event.data.type === 'preview-error') {
            error = event.data.message
          }
        }

        if (messageHandler) {
          window.removeEventListener('message', messageHandler)
        }

        messageHandler = handleIframeMessage
        window.addEventListener('message', messageHandler)

        container.appendChild(iframe)
        iframe.srcdoc = htmlContent

        setTimeout(() => {
          loading = false
        }, 100)
      } catch (err) {
        loading = false
        error = err instanceof Error ? err.message : 'Failed to render preview'
        console.error('Preview error:', err)
      }
    })()
  })
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
