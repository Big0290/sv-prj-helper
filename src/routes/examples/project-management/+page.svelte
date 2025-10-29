<script lang="ts">
  import { Heading, Text, Container, Stack, Card, Flex, Button, StaticCodeExample, Badge, Grid } from '$lib/ui'
  import ProjectManagementExample from '$lib/examples/ProjectManagementExample.svelte'
  import '../../../lib/styles/theme.css'

  let activeTab = $state('preview')

  const componentsUsed = [
    { name: 'Card', type: 'molecule', description: 'Task cards and containers' },
    { name: 'Container', type: 'layout', description: 'Content container with max width' },
    { name: 'Grid', type: 'layout', description: 'Responsive grid layouts' },
    { name: 'Stack', type: 'layout', description: 'Vertical layout with spacing' },
    { name: 'Flex', type: 'layout', description: 'Flexbox layout component' },
    { name: 'Button', type: 'atom', description: 'Interactive buttons' },
    { name: 'Badge', type: 'atom', description: 'Priority and status badges' },
    { name: 'Avatar', type: 'atom', description: 'Team member avatars' },
    { name: 'Icon', type: 'atom', description: 'SVG icons' },
    { name: 'Divider', type: 'atom', description: 'Visual separators' },
    { name: 'Heading', type: 'atom', description: 'Typography headings' },
    { name: 'Text', type: 'atom', description: 'Typography text' },
    { name: 'Modal', type: 'organism', description: 'Task detail modal' },
    { name: 'Input', type: 'atom', description: 'Form inputs' },
    { name: 'Textarea', type: 'atom', description: 'Task description field' },
    { name: 'Select', type: 'organism', description: 'Dropdown selections' },
    { name: 'Menu', type: 'molecule', description: 'Task action menu' },
  ]
</script>

<svelte:head>
  <title>Project Management - SV Project Helper</title>
</svelte:head>

<Container maxWidth="full">
  <div class="project-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a href="/">Home</a>
      <span>→</span>
      <a href="/examples">Examples</a>
      <span>→</span>
      <span>Project Management</span>
    </nav>

    <!-- Header -->
    <header class="page-header">
      <Stack gap="3">
        <div>
          <Heading as="h1" size="1">Project Management</Heading>
          <Text size="lg" color="var(--text-secondary)" style="margin-top: 0.5rem;">
            Kanban board with drag-and-drop, task management, and team collaboration
          </Text>
        </div>
        <Flex gap="3" wrap>
          <Badge variant="error" size="md">Advanced</Badge>
          <Badge variant="info" size="md">Kanban</Badge>
          <Badge variant="info" size="md">Tasks</Badge>
          <Badge variant="info" size="md">Collaboration</Badge>
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
        <ProjectManagementExample />
      </div>
    {:else if activeTab === 'code'}
      <div class="code-section">
        <Card>
          <Stack gap="3">
            <Heading as="h2" size="3">Implementation Highlights</Heading>
            <Text color="var(--text-secondary)">This project management Kanban board demonstrates:</Text>
            <ul style="padding-left: 1.5rem;">
              <li>
                <Text>HTML5 drag-and-drop API for moving tasks between columns</Text>
              </li>
              <li>
                <Text>Five Kanban columns: Backlog, To Do, In Progress, Review, Done</Text>
              </li>
              <li>
                <Text>Task creation modal with full form including assignee selection</Text>
              </li>
              <li>
                <Text>Priority levels with color-coded badges (high, medium, low)</Text>
              </li>
              <li>
                <Text>Due date tracking with overdue warnings</Text>
              </li>
              <li>
                <Text>Team member assignment with avatars</Text>
              </li>
              <li>
                <Text>Task comment system for collaboration</Text>
              </li>
              <li>
                <Text>Task edit and delete functionality</Text>
              </li>
              <li>
                <Text>Task counter badges on each column</Text>
              </li>
              <li>
                <Text>Responsive design that adapts to different screen sizes</Text>
              </li>
              <li>
                <Text>Interactive task cards with hover effects</Text>
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
              This project management template showcases 18 different components from the library
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
  .project-page {
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
    .project-page {
      padding: 1rem 0 2rem;
    }

    .preview-section {
      height: auto;
      min-height: 500px;
    }
  }
</style>
