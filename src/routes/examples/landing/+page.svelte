<script lang="ts">
  import { Heading, Text, Container, Stack, Card, Flex, Button, StaticCodeExample, Badge, Grid } from '$lib/ui'
  import LandingPageExample from '$lib/examples/LandingPageExample.svelte'
  import '../../../lib/styles/theme.css'

  let activeTab = $state('preview')

  const componentsUsed = [
    { name: 'Button', type: 'atom', description: 'Call-to-action buttons' },
    { name: 'Card', type: 'molecule', description: 'Feature and pricing cards' },
    { name: 'Container', type: 'layout', description: 'Content container with max width' },
    { name: 'Grid', type: 'layout', description: 'Responsive grid layouts' },
    { name: 'Stack', type: 'layout', description: 'Vertical layout with spacing' },
    { name: 'Flex', type: 'layout', description: 'Flexbox layout component' },
    { name: 'Heading', type: 'atom', description: 'Typography headings' },
    { name: 'Text', type: 'atom', description: 'Typography text elements' },
    { name: 'Badge', type: 'atom', description: 'Status badges and labels' },
    { name: 'Avatar', type: 'atom', description: 'User avatars in testimonials' },
    { name: 'Icon', type: 'atom', description: 'SVG icons for features' },
    { name: 'Image', type: 'atom', description: 'Hero section images' },
    { name: 'Divider', type: 'atom', description: 'Visual separators' },
    { name: 'Link', type: 'atom', description: 'Footer navigation links' },
    { name: 'Box', type: 'atom', description: 'Layout wrapper component' },
  ]
</script>

<svelte:head>
  <title>Landing Page - SV Project Helper</title>
</svelte:head>

<Container maxWidth="full">
  <div class="landing-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a href="/">Home</a>
      <span>→</span>
      <a href="/examples">Examples</a>
      <span>→</span>
      <span>Landing Page</span>
    </nav>

    <!-- Header -->
    <header class="page-header">
      <Stack gap="3">
        <div>
          <Heading as="h1" size="1">Landing Page</Heading>
          <Text size="lg" color="var(--text-secondary)" style="margin-top: 0.5rem;">
            Modern marketing website with hero section, features, and testimonials
          </Text>
        </div>
        <Flex gap="3" wrap>
          <Badge variant="success" size="md">Beginner</Badge>
          <Badge variant="info" size="md">Marketing</Badge>
          <Badge variant="info" size="md">Landing</Badge>
          <Badge variant="info" size="md">Hero</Badge>
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
        <LandingPageExample />
      </div>
    {:else if activeTab === 'code'}
      <div class="code-section">
        <Card>
          <Stack gap="3">
            <Heading as="h2" size="3">Implementation Highlights</Heading>
            <Text color="var(--text-secondary)">This landing page demonstrates:</Text>
            <ul style="padding-left: 1.5rem;">
              <li>
                <Text>Hero section with gradient text and call-to-action buttons</Text>
              </li>
              <li>
                <Text>Statistics section displaying key metrics</Text>
              </li>
              <li>
                <Text>Features grid with icon cards and hover effects</Text>
              </li>
              <li>
                <Text>Pricing tiers with popular badge highlighting</Text>
              </li>
              <li>
                <Text>Customer testimonials with avatar and star ratings</Text>
              </li>
              <li>
                <Text>Newsletter signup form in CTA section</Text>
              </li>
              <li>
                <Text>Footer with navigation links and company info</Text>
              </li>
              <li>
                <Text>Responsive design with mobile-first approach</Text>
              </li>
              <li>
                <Text>Smooth animations and hover effects</Text>
              </li>
              <li>
                <Text>Glass-morphism design patterns</Text>
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
              This landing page template showcases 16 different components from the library
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
  .landing-page {
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

  .preview-section {
    height: calc(100vh - 300px);
    min-height: 600px;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .landing-page {
      padding: 1rem 0 2rem;
    }

    .preview-section {
      height: auto;
      min-height: 500px;
    }
  }
</style>
