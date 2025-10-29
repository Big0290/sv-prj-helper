<script lang="ts">
  import { Heading, Text, Container, Stack, Card, Flex, Button, StaticCodeExample, Badge, Grid } from '$lib/ui'
  import BlogPlatformExample from '$lib/examples/BlogPlatformExample.svelte'
  import '../../../lib/styles/theme.css'

  let activeTab = $state('preview')

  const componentsUsed = [
    { name: 'Button', type: 'atom', description: 'Interactive buttons and actions' },
    { name: 'Card', type: 'molecule', description: 'Post cards and containers' },
    { name: 'Container', type: 'layout', description: 'Content container with max width' },
    { name: 'Grid', type: 'layout', description: 'Responsive grid layouts' },
    { name: 'Stack', type: 'layout', description: 'Vertical layout with spacing' },
    { name: 'Flex', type: 'layout', description: 'Flexbox layout component' },
    { name: 'Heading', type: 'atom', description: 'Typography headings' },
    { name: 'Text', type: 'atom', description: 'Typography text elements' },
    { name: 'Badge', type: 'atom', description: 'Category and status badges' },
    { name: 'Avatar', type: 'atom', description: 'Author avatars' },
    { name: 'Icon', type: 'atom', description: 'SVG icons for actions' },
    { name: 'Image', type: 'atom', description: 'Post images' },
    { name: 'Divider', type: 'atom', description: 'Visual separators' },
    { name: 'Link', type: 'atom', description: 'Navigation links' },
    { name: 'Input', type: 'atom', description: 'Search input field' },
    { name: 'Textarea', type: 'atom', description: 'Comment input field' },
    { name: 'Chip', type: 'atom', description: 'Tag chips' },
  ]
</script>

<svelte:head>
  <title>Blog Platform - SV Project Helper</title>
</svelte:head>

<Container maxWidth="full">
  <div class="blog-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a href="/">Home</a>
      <span>→</span>
      <a href="/examples">Examples</a>
      <span>→</span>
      <span>Blog Platform</span>
    </nav>

    <!-- Header -->
    <header class="page-header">
      <Stack gap="3">
        <div>
          <Heading as="h1" size="1">Blog Platform</Heading>
          <Text size="lg" color="var(--text-secondary)" style="margin-top: 0.5rem;">
            Content management system with rich text editor and comment system
          </Text>
        </div>
        <Flex gap="3" wrap>
          <Badge variant="warning" size="md">Intermediate</Badge>
          <Badge variant="info" size="md">Blog</Badge>
          <Badge variant="info" size="md">CMS</Badge>
          <Badge variant="info" size="md">Editor</Badge>
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
        <BlogPlatformExample />
      </div>
    {:else if activeTab === 'code'}
      <div class="code-section">
        <Card>
          <Stack gap="3">
            <Heading as="h2" size="3">Implementation Highlights</Heading>
            <Text color="var(--text-secondary)">This blog platform demonstrates:</Text>
            <ul style="padding-left: 1.5rem;">
              <li>
                <Text>Blog post listing with card-based grid layout</Text>
              </li>
              <li>
                <Text>Search functionality to filter posts by title or content</Text>
              </li>
              <li>
                <Text>Category filtering with active state highlighting</Text>
              </li>
              <li>
                <Text>Post detail view with full content display</Text>
              </li>
              <li>
                <Text>Rich text content with formatted displays</Text>
              </li>
              <li>
                <Text>Comment system with user avatars and timestamps</Text>
              </li>
              <li>
                <Text>Like and comment counters for engagement metrics</Text>
              </li>
              <li>
                <Text>Tag/category chips for content organization</Text>
              </li>
              <li>
                <Text>Author profile display with avatars</Text>
              </li>
              <li>
                <Text>Responsive sidebar with sticky positioning</Text>
              </li>
              <li>
                <Text>Create post button for new content</Text>
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
              This blog platform template showcases 17 different components from the library
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
  .blog-page {
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
    .blog-page {
      padding: 1rem 0 2rem;
    }

    .preview-section {
      height: auto;
      min-height: 500px;
    }
  }
</style>
