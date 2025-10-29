<script lang="ts">
  import { onMount } from 'svelte'
  import { Container, Heading, Text, Stack, Card, Input, Button, Badge, Link, Spinner } from '$lib/ui'
  import { page } from '$app/stores'

  let searchQuery = $state('')
  let selectedCategory = $state('all')
  let components = $state<any[]>([])
  let categories = $state<any[]>([])
  let loading = $state(true)

  // Handle URL parameters
  $effect(() => {
    const categoryParam = $page.url.searchParams.get('category')
    if (categoryParam) {
      selectedCategory = categoryParam
    }
  })

  // Fetch components from API
  async function loadComponents() {
    try {
      loading = true
      const response = await fetch('/api/docs/components')
      const data = await response.json()

      components = data.components || []

      // Group by category
      const categoryMap: Record<string, any[]> = {}
      components.forEach((comp) => {
        if (!categoryMap[comp.category]) {
          categoryMap[comp.category] = []
        }
        categoryMap[comp.category].push(comp)
      })

      categories = Object.entries(categoryMap).map(([name, comps]) => ({
        name,
        count: comps.length,
      }))
    } catch (error) {
      console.error('Failed to load components:', error)
      components = []
      categories = []
    } finally {
      loading = false
    }
  }

  // Load components on mount
  onMount(() => {
    loadComponents()
  })

  const filteredComponents = $derived(() => {
    if (loading) return []

    return components.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  })

  const totalComponents = $derived(components.length)
</script>

<svelte:head>
  <title>Component Documentation - SV Project Helper</title>
</svelte:head>

<Container maxWidth="xl">
  <div class="docs-components-page">
    <!-- Breadcrumb -->
    <nav class="page-breadcrumb">
      <a href="/">Home</a>
      <span>→</span>
      <a href="/docs">Documentation</a>
      <span>→</span>
      <span>Components</span>
    </nav>

    <header class="page-header">
      <Stack gap="4">
        <div class="header-intro">
          <Heading as="h1" size="1" class="page-title">Component Library</Heading>
          <Text size="xl" color="var(--text-secondary)" class="page-subtitle">
            Comprehensive documentation with real-world examples, visualizations, and interactive demos
          </Text>
          <Text size="sm" color="var(--text-secondary)" style="margin-top: 0.5rem;">
            Browse {totalComponents} components organized by category. Each component includes usage examples, API documentation,
            and accessibility guidelines.
          </Text>
        </div>

        <div class="header-badges">
          <Badge variant="info" size="lg">{totalComponents}+ Components</Badge>
          <Badge variant="success" size="lg">{categories.length} Categories</Badge>
          <Badge variant="default" size="lg">TypeScript Ready</Badge>
        </div>
      </Stack>
    </header>

    <div class="docs-content">
      <!-- Search and Filters -->
      <Card class="search-filters">
        <Stack gap="4">
          <Input bind:value={searchQuery} placeholder="Search components..." type="search" />

          <div class="category-filters">
            <button
              class="category-btn"
              class:active={selectedCategory === 'all'}
              onclick={() => (selectedCategory = 'all')}
            >
              All ({totalComponents})
            </button>
            {#each categories as category}
              <button
                class="category-btn"
                class:active={selectedCategory === category.name}
                onclick={() => (selectedCategory = category.name)}
              >
                {category.name} ({category.count})
              </button>
            {/each}
          </div>
        </Stack>
      </Card>

      <!-- Component Grid -->
      {#if loading}
        <Card class="loading-state">
          <Stack gap="4" align="center">
            <Spinner size="lg" />
            <Text color="var(--text-secondary)">Loading components...</Text>
          </Stack>
        </Card>
      {:else if filteredComponents().length === 0}
        <Card class="no-results">
          <Stack gap="4" align="center">
            <Text size="lg">No components found</Text>
            <Text color="var(--text-secondary)">Try adjusting your search or filter criteria</Text>
            <Button
              variant="ghost"
              onclick={() => {
                searchQuery = ''
                selectedCategory = 'all'
              }}
            >
              Clear Filters
            </Button>
          </Stack>
        </Card>
      {:else}
        <div class="components-grid">
          {#each filteredComponents() as component}
            <Card class="component-card">
              <Stack gap="4">
                <div class="component-header">
                  <div class="component-title">
                    <Heading as="h3" size="4">{component.name}</Heading>
                    <Badge variant="default" size="sm">{component.category}</Badge>
                  </div>
                  <Link href="/docs/components/{component.name.toLowerCase()}" class="view-docs-btn">View Docs →</Link>
                </div>

                <Text color="var(--text-secondary)" size="sm" style="line-height: 1.6;">
                  {component.description}
                </Text>

                <div class="component-footer">
                  <div class="meta-badges">
                    {#if component.props > 0}
                      <Badge variant="info" size="sm">{component.props} Props</Badge>
                    {/if}
                    <Badge variant="default" size="sm">{component.category}</Badge>
                  </div>
                </div>
              </Stack>
            </Card>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</Container>

<style>
  .docs-components-page {
    padding: 2rem 0 4rem;
  }

  .page-breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .page-breadcrumb a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .page-breadcrumb a:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }

  .page-header {
    margin-bottom: 3rem;
  }

  .header-intro {
    max-width: 800px;
  }

  .page-title {
    margin-bottom: 0.75rem;
  }

  .page-subtitle {
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }

  :global(.no-results) {
    margin: 3rem 0;
    text-align: center;
  }

  .docs-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  :global(.search-filters) {
    position: sticky;
    top: 80px;
    z-index: 10;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
  }

  .category-filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .category-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    text-transform: capitalize;
  }

  .category-btn:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }

  .category-btn.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  :global(.component-card) {
    height: 100%;
    transition: all 0.2s ease;
    border: 1px solid var(--border-color);
  }

  :global(.component-card:hover) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary-light);
  }

  .header-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .component-header {
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .component-title {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .meta-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  :global(.view-docs-btn) {
    font-size: 0.875rem;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  :global(.view-docs-btn:hover) {
    color: var(--color-primary-dark);
  }

  .component-footer {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  :global(.component-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
  }

  :global(.component-card:hover) {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 768px) {
    .docs-components-page {
      padding: 1rem 0 2rem;
    }

    .components-grid {
      grid-template-columns: 1fr;
    }

    .category-filters {
      justify-content: center;
    }

    :global(.search-filters) {
      position: static;
    }
  }
</style>
