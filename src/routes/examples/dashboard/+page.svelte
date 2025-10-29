<script lang="ts">
  import { Heading, Text, Container, Stack, Card, Flex, Button, StaticCodeExample, Badge, Grid } from '$lib/ui'
  import DashboardExample from '$lib/examples/DashboardExample.svelte'
  import '../../../lib/styles/theme.css'

  let activeTab = $state('preview')

  const dashboardCode = `import {
    Sidebar,
    Navbar,
    StatsCard,
    DataTable,
    Card,
    Grid,
    Stack,
    Flex,
    Heading,
    Text,
    Badge,
    Avatar,
    Button,
    Icon,
    Box
  } from '@big0290/sv-prj-helper-ui'
  import { onMount } from 'svelte'
  import { Chart, registerables } from 'chart.js'

  // Register Chart.js components
  Chart.register(...registerables)

  // Mobile sidebar state
  let isMobileSidebarOpen = $state(false)

  // Mock user data
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status' }
  ]

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active' }
  ]

  let selectedRows = $state<(string | number)[]>([])

  function handleRowSelect(selectedIds: (string | number)[]) {
    selectedRows = selectedIds
  }

  function handleSort(key: string, direction: 'asc' | 'desc') {
    console.log('Sorting by:', key, direction)
  }

  // Chart refs
  let revenueChartCanvas: HTMLCanvasElement
  let ordersChartCanvas: HTMLCanvasElement
  let usersChartCanvas: HTMLCanvasElement

  onMount(() => {
    // Initialize charts with Chart.js
    // ... chart initialization code ...
  })

<Sidebar bind:isOpen={isMobileSidebarOpen} position="left" width="280px">
  <Stack gap="6">
    <!-- Logo -->
    <Flex align="center" gap="3">
      <Box style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #a855f7, #3b82f6);">
        SV
      </Box>
      <Stack gap="0">
        <Heading as="h2" size="6">Dashboard</Heading>
        <Text size="xs" color="var(--text-secondary)">Admin Panel</Text>
      </Stack>
    </Flex>

    <!-- Navigation items -->
  </Stack>
</Sidebar>

<main>
  <Navbar>
    <!-- Top bar content -->
  </Navbar>

  <div class="content">
    <!-- Stats Cards -->
    <Grid cols="4" gap="6">
      <StatsCard label="Total Users" value="2,458" trend={12.5} variant="success" />
      <StatsCard label="Revenue" value="$67,234" trend={8.2} variant="default" />
      <StatsCard label="Orders" value="1,234" trend={-3.5} variant="warning" />
      <StatsCard label="Active Users" value="892" trend={15.3} variant="success" />
    </Grid>

    <!-- Charts -->
    <!-- Data Table -->
    <Card>
      <DataTable
        columns={columns}
        rows={users}
        selectable
        bind:selectedRows
        onRowSelect={handleRowSelect}
        onSort={handleSort}
      />
    </Card>
  </div>
</main>
`

  const componentsUsed = [
    { name: 'Sidebar', type: 'organism', description: 'Collapsible sidebar navigation component' },
    { name: 'Navbar', type: 'organism', description: 'Top navigation bar with user profile' },
    { name: 'StatsCard', type: 'molecule', description: 'Card component displaying statistics with trends' },
    { name: 'DataTable', type: 'organism', description: 'Sortable and filterable data table' },
    { name: 'Card', type: 'molecule', description: 'Container component for grouping content' },
    { name: 'Grid', type: 'layout', description: 'CSS Grid layout system' },
    { name: 'Stack', type: 'layout', description: 'Vertical layout with consistent spacing' },
    { name: 'Flex', type: 'layout', description: 'Flexbox layout component' },
    { name: 'Avatar', type: 'atom', description: 'User avatar with status indicator' },
    { name: 'Button', type: 'atom', description: 'Interactive button component' },
    { name: 'Badge', type: 'atom', description: 'Status badge indicators' },
    { name: 'Heading', type: 'atom', description: 'Semantic heading component' },
    { name: 'Text', type: 'atom', description: 'Text typography component' },
    { name: 'Icon', type: 'atom', description: 'SVG icon renderer' },
    { name: 'Box', type: 'atom', description: 'Generic container component' },
  ]
</script>

<svelte:head>
  <title>Dashboard Template - SV Project Helper</title>
</svelte:head>

<Container maxWidth="full">
  <div class="dashboard-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a href="/">Home</a>
      <span>→</span>
      <a href="/examples">Examples</a>
      <span>→</span>
      <span>Dashboard Template</span>
    </nav>

    <!-- Header -->
    <header class="page-header">
      <Stack gap="3">
        <div>
          <Heading as="h1" size="1">Dashboard Template</Heading>
          <Text size="lg" color="var(--text-secondary)" style="margin-top: 0.5rem;">
            Complete admin dashboard with sidebar navigation, data tables, and charts
          </Text>
        </div>
        <Flex gap="3" wrap>
          <Badge variant="warning" size="md">Intermediate</Badge>
          <Badge variant="info" size="md">Dashboard</Badge>
          <Badge variant="info" size="md">Admin</Badge>
          <Badge variant="info" size="md">Charts</Badge>
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
        <Card>
          <DashboardExample />
        </Card>
      </div>
    {:else if activeTab === 'code'}
      <div class="code-section">
        <StaticCodeExample
          title="Dashboard Template Code"
          description="Complete dashboard implementation using SV Project Helper components"
          code={dashboardCode}
          language="svelte"
          showCopyButton={true}
        />
      </div>
    {:else if activeTab === 'components'}
      <div class="components-section">
        <Stack gap="4">
          <div>
            <Heading as="h2" size="3">Components Used</Heading>
            <Text color="var(--text-secondary)">
              This dashboard template showcases 15 different components from the library
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
                  <Text size="sm" color="var(--text-secondary)">
                    {component.description}
                  </Text>
                  <a href="/docs/components/{component.name.toLowerCase()}" class="component-link">
                    View Documentation →
                  </a>
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
  .dashboard-page {
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

  .preview-section,
  .code-section,
  .components-section {
    margin-top: 2rem;
  }

  .component-link {
    color: var(--color-primary);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: opacity 0.2s ease;
  }

  .component-link:hover {
    opacity: 0.8;
    text-decoration: underline;
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

  @media (max-width: 768px) {
    .dashboard-page {
      padding: 1rem 0 2rem;
    }
  }
</style>
