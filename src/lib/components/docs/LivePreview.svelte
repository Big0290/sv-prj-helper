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
  let isFallback = $state(false)

  onMount(() => {
    return () => {
      if (messageHandler) {
        window.removeEventListener('message', messageHandler)
      }
    }
  })

  let lastCode = $state('')

  /**
   * Compile Svelte code using our enhanced API
   */
  async function compileComponent(svelteCode: string): Promise<{ html: string; isFallback: boolean }> {
    try {
      const response = await fetch('/api/compile/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: svelteCode }),
      })

      if (!response.ok) {
        throw new Error(`Compilation failed: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.error && !result.html) {
        throw new Error(result.error)
      }

      return {
        html: result.html,
        isFallback: result.fallback || false,
      }
    } catch (err) {
      console.error('Compilation error:', err)
      throw err
    }
  }

  $effect(() => {
    if (!code.trim()) {
      error = null
      lastCode = ''
      isFallback = false
      if (previewContainer) {
        previewContainer.innerHTML = ''
      }
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
      isFallback = false

      try {
        const { html, isFallback: fallback } = await compileComponent(code)
        isFallback = fallback
        console.log('✅ Compiled successfully', { fallback })

        const iframe = document.createElement('iframe')
        iframe.style.width = '100%'
        iframe.style.height = '100%'
        iframe.style.border = 'none'
        iframe.style.background = '#ffffff'
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')
        iframe.setAttribute('title', 'Component Preview')

        let loaded = false

        iframe.onload = () => {
          if (!loaded) {
            loaded = true
            loading = false
            console.log('✅ Iframe loaded!')
          }
        }

        iframe.onerror = () => {
          loading = false
          error = 'Failed to load preview'
        }

        function handleIframeMessage(event: MessageEvent) {
          if (event.data?.type === 'preview-error') {
            error = event.data.message
          }
          if (event.data?.type === 'console') {
            console.log('[Preview Console]', event.data.level, event.data.message)
          }
        }

        if (messageHandler) {
          window.removeEventListener('message', messageHandler)
        }

        messageHandler = handleIframeMessage
        window.addEventListener('message', messageHandler)

        container.appendChild(iframe)
        iframe.srcdoc = html

        // Fallback timeout
        setTimeout(() => {
          if (!loaded) {
            loading = false
          }
        }, 3000)
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
      <Text size="sm" color="var(--text-secondary)">Compiling and rendering...</Text>
    </div>
  {:else if error && showError}
    <div class="preview-error">
      <Text size="sm" weight="medium" color="var(--color-error)">Preview Error:</Text>
      <Text size="xs" color="var(--text-secondary)">{error}</Text>
    </div>
  {:else if !code.trim()}
    <div class="preview-empty">
      <Text size="sm" color="var(--text-secondary)">No code to preview</Text>
    </div>
  {:else}
    <div class="preview-wrapper">
      {#if isFallback}
        <div class="fallback-banner">
          <Text size="xs" color="var(--color-warning)">
            ⚠️ Using HTML fallback preview (Svelte compilation unavailable)
          </Text>
        </div>
      {/if}
      <div bind:this={previewContainer} class="preview-container"></div>
    </div>
  {/if}
</div>

<style>
  .live-preview {
    width: 100%;
    height: 100%;
    min-height: 200px;
  }

  .preview-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .fallback-banner {
    padding: 0.5rem 1rem;
    background: rgba(245, 158, 11, 0.1);
    border-bottom: 1px solid rgba(245, 158, 11, 0.2);
    border-top-left-radius: var(--radius-md);
    border-top-right-radius: var(--radius-md);
    text-align: center;
  }

  .preview-container {
    flex: 1;
    width: 100%;
    height: 100%;
    min-height: 200px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: white;
    position: relative;
    overflow: hidden;
  }

  .preview-wrapper:has(.fallback-banner) .preview-container {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
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
