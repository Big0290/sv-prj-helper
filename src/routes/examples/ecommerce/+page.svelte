<script lang="ts">
  import { Heading, Text, Container, Stack, Card, Flex, Button, StaticCodeExample, Badge, Grid } from '$lib/ui'
  import EcommerceExample from '$lib/examples/EcommerceExample.svelte'
  import '../../../lib/styles/theme.css'

  let activeTab = $state('preview')

  const componentsUsed = [
    { name: 'Card', type: 'molecule', description: 'Product and content cards' },
    { name: 'Grid', type: 'layout', description: 'Product grid layout system' },
    { name: 'Stack', type: 'layout', description: 'Vertical layout with spacing' },
    { name: 'Flex', type: 'layout', description: 'Flexbox layout component' },
    { name: 'Button', type: 'atom', description: 'Interactive buttons and actions' },
    { name: 'Input', type: 'atom', description: 'Search input field' },
    { name: 'Image', type: 'atom', description: 'Product images' },
    { name: 'Badge', type: 'atom', description: 'Status badges and notifications' },
    { name: 'Avatar', type: 'atom', description: 'User avatar' },
    { name: 'Icon', type: 'atom', description: 'SVG icons' },
    { name: 'Heading', type: 'atom', description: 'Typography headings' },
    { name: 'Text', type: 'atom', description: 'Typography text' },
    { name: 'Container', type: 'layout', description: 'Content container' },
  ]
</script>

<svelte:head>
  <title>E-commerce Store - SV Project Helper</title>
</svelte:head>

<Container maxWidth="full">
  <div class="ecommerce-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a href="/">Home</a>
      <span>→</span>
      <a href="/examples">Examples</a>
      <span>→</span>
      <span>E-commerce Store</span>
    </nav>

    <!-- Header -->
    <header class="page-header">
      <Stack gap="3">
        <div>
          <Heading as="h1" size="1">E-commerce Store</Heading>
          <Text size="lg" color="var(--text-secondary)" style="margin-top: 0.5rem;">
            Product catalog, shopping cart, and checkout flow with payment integration
          </Text>
        </div>
        <Flex gap="3" wrap>
          <Badge variant="error" size="md">Advanced</Badge>
          <Badge variant="info" size="md">E-commerce</Badge>
          <Badge variant="info" size="md">Shopping</Badge>
          <Badge variant="info" size="md">Payments</Badge>
        </Flex>
      </Stack>
    </header>

    <!-- Tabs -->
    <div class="tabs">
      <button onclick={() => (activeTab = 'preview')} class="tab" class:active={activeTab === 'preview'}>
        Preview
      </button>
      <button onclick={() => (activeTab = 'code')} class="tab" class:active={activeTab === 'code'}> Code </button>
      <button onclick={() => (activeTab = 'components')} class="tab" class:active={activeTab === 'components'}>
        Components
      </button>
    </div>

    <!-- Tab Content -->
    {#if activeTab === 'preview'}
      <div class="preview-section">
        <EcommerceExample />
      </div>
    {:else if activeTab === 'code'}
      <div class="code-section">
        <Card>
          <Stack gap="3">
            <Heading as="h2" size="3">Implementation Highlights</Heading>
            <Text color="var(--text-secondary)">This e-commerce example demonstrates:</Text>
            <ul style="padding-left: 1.5rem;">
              <li>
                <Text>Product catalog with category filtering and search</Text>
              </li>
              <li>
                <Text>Clickable product cards with detail modal</Text>
              </li>
              <li>
                <Text>Shopping cart with reactive totals (subtotal, shipping, tax)</Text>
              </li>
              <li>
                <Text>Free shipping badge when order exceeds $100</Text>
              </li>
              <li>
                <Text>Quantity controls with add/remove/update items</Text>
              </li>
              <li>
                <Text>Responsive sidebar cart with scrollable items</Text>
              </li>
              <li>
                <Text>State management with Svelte 5 runes ($derived)</Text>
              </li>
              <li>
                <Text>Product grid with hover effects and modal integration</Text>
              </li>
            </ul>
            <Button variant="primary" href="https://github.com/Big0290/sv-prj-helper">
              View Full Source Code on GitHub
            </Button>
          </Stack>
        </Card>
      </div>
    {:else if activeTab === 'components'}
      <div class="components-section">
        <Stack gap="4">
          <div>
            <Heading as="h2" size="3">Components Used</Heading>
            <Text color="var(--text-secondary)">
              This e-commerce template showcases 13 different components from the library
            </Text>
          </div>

          <Grid cols="3" gap="4">
            {#each componentsUsed as component}
              <Card>
                <Stack gap="3">
                  <Flex justify="space-between" align="center">
                    <Heading as="h3" size="6">{component.name}</Heading>
                    <Badge variant="info" size="sm">{component.type}</Badge>
                  </Flex>
                  <Text size="sm" color="var(--text-secondary)">{component.description}</Text>
                </Stack>
              </Card>
            {/each}
          </Grid>
        </Stack>
      </div>
    {/if}
  </div>
</Container>

<style>
  .ecommerce-page {
    padding: 2rem 0 4rem;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .breadcrumb a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    padding: 0.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--glass-border);
    margin-bottom: 2rem;
  }

  .tab {
    flex: 1;
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: var(--radius-md);
  }

  .tab:hover {
    color: var(--color-primary);
    background: var(--glass-bg-hover);
  }

  .tab.active {
    background: var(--color-primary);
    color: white;
    box-shadow: var(--shadow-sm);
  }

  .preview-section,
  .code-section,
  .components-section {
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .ecommerce-page {
      padding: 1rem 0 2rem;
    }
  }
</style>
