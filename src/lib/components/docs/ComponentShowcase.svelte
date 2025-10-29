<script lang="ts">
  import { Card, Stack, Heading, Text } from '$lib/ui'

  interface Props {
    componentName: string
    variants?: Array<{
      name: string
      props?: Record<string, any>
      content?: string
    }>
  }

  // Components that need special handling or shouldn't be statically displayed
  const INTERACTIVE_COMPONENTS = [
    'ContextMenu',
    'Modal',
    'Drawer',
    'Dropdown',
    'Popover',
    'Toast',
    'Snackbar',
    'CommandPalette',
    'ConfirmDialog',
  ]

  let { componentName, variants = [] }: Props = $props()

  // Dynamically import the component
  let Component: any = null
  let loading = $state(true)
  let error = $state<string | null>(null)

  // Check if this component should be displayed statically
  let shouldDisplay = $derived(!INTERACTIVE_COMPONENTS.includes(componentName))

  // Debug logging
  $effect(() => {
    if (!shouldDisplay) return
    console.log(`[ComponentShowcase] ${componentName}:`, {
      variantsCount: variants.length,
      variants,
      loading,
      error,
      hasComponent: !!Component,
    })
  })

  async function loadComponent() {
    if (!shouldDisplay) {
      loading = false
      return
    }

    try {
      // Try to import from the library
      const module = await import('$lib/ui')
      Component = (module as any)[componentName]

      if (!Component) {
        error = `Component ${componentName} not found`
      }
    } catch (err) {
      error = `Failed to load component: ${err}`
      console.error('Component loading error:', err)
    } finally {
      loading = false
    }
  }

  // Only load if component should be displayed
  if (shouldDisplay) {
    loadComponent()
  } else {
    loading = false
  }
</script>

{#if !shouldDisplay}
  <!-- Interactive component - show message instead -->
  <div class="interactive-component">
    <Text size="sm" color="var(--text-secondary)">
      💡 This is an interactive component. See the code example below to learn how to use it.
    </Text>
  </div>
{:else if loading}
  <div class="showcase-loading">
    <Text color="var(--text-secondary)" size="sm">Loading component...</Text>
  </div>
{:else if error}
  <div class="showcase-error">
    <Text color="var(--color-error)" size="sm">{error}</Text>
    <Text size="xs" color="var(--text-tertiary)">Component: {componentName}, Variants: {variants.length}</Text>
  </div>
{:else if Component && variants.length > 0}
  <Card class="component-showcase">
    <Stack gap="4">
      <Heading as="h3" size="4">{componentName} Variants</Heading>

      <div class="variants-grid">
        {#each variants as variant}
          <div class="variant-item">
            {#if variant.name}
              <Text size="sm" weight="medium" color="var(--text-secondary)">
                {variant.name}
              </Text>
            {/if}

            <div class="variant-preview">
              <svelte:component this={Component} {...variant.props || {}}>
                {variant.content || ''}
              </svelte:component>
            </div>
          </div>
        {/each}
      </div>
    </Stack>
  </Card>
{:else if Component && variants.length === 0}
  <div class="showcase-empty">
    <Text color="var(--text-secondary)" size="sm">No variants to display</Text>
  </div>
{/if}

<style>
  .showcase-loading,
  .showcase-error,
  .showcase-empty,
  .interactive-component {
    padding: 2rem;
    text-align: center;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    margin: 1rem 0;
  }

  .interactive-component {
    background: var(--bg-tertiary);
    border-color: var(--color-primary-light);
  }

  .component-showcase {
    margin: 1.5rem 0;
  }

  .variants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
  }

  .variant-item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }

  .variant-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .variants-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
</style>
