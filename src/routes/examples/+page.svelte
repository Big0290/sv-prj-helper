<script lang="ts">
  import {
    Heading,
    Text,
    Container,
    Stack,
    Card,
    Link,
    Badge,
    Grid,
    StaticCodeExample,
    Flex,
    Button,
    Modal,
  } from '$lib/ui'
  import '../../lib/styles/theme.css'

  // Import example components
  import * as Examples from '$lib/examples'

  const examples = [
    {
      title: 'Dashboard Template',
      description: 'Complete admin dashboard with sidebar navigation, data tables, and charts',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      tags: ['Dashboard', 'Admin', 'Charts'],
      href: '/examples/dashboard',
      difficulty: 'Intermediate',
    },
    {
      title: 'E-commerce Store',
      description: 'Product catalog, shopping cart, and checkout flow with payment integration',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      tags: ['E-commerce', 'Shopping', 'Payments'],
      href: '/examples/ecommerce',
      difficulty: 'Advanced',
    },
    {
      title: 'Chat Application',
      description: 'Real-time messaging app with rooms, file sharing, and voice messages',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=250&fit=crop',
      tags: ['Chat', 'Real-time', 'WebSocket'],
      href: '/examples/chat',
      difficulty: 'Intermediate',
    },
    {
      title: 'Landing Page',
      description: 'Modern marketing website with hero section, features, and testimonials',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      tags: ['Marketing', 'Landing', 'Hero'],
      href: '/examples/landing',
      difficulty: 'Beginner',
    },
    {
      title: 'Blog Platform',
      description: 'Content management system with rich text editor and comment system',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
      tags: ['Blog', 'CMS', 'Editor'],
      href: '/examples/blog',
      difficulty: 'Intermediate',
    },
    {
      title: 'Project Management',
      description: 'Kanban board with drag-and-drop, task management, and team collaboration',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
      tags: ['Kanban', 'Tasks', 'Collaboration'],
      href: '/examples/project-management',
      difficulty: 'Advanced',
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success'
      case 'Intermediate':
        return 'warning'
      case 'Advanced':
        return 'error'
      default:
        return 'default'
    }
  }

  // Modal state for live demos
  let selectedExample = $state<{ name: string } | null>(null)
  let showModal = $state(false)

  // Example component mapping
  const exampleComponents = {
    'Login Form': Examples.LoginFormExample,
    'Card with Badge': Examples.CardWithBadgeExample,
    'Navigation Breadcrumb': Examples.BreadcrumbExample,
    'Alert Messages': Examples.AlertExample,
  }

  let Component = $derived(selectedExample ? exampleComponents[selectedExample.name] : null)

  function openExample(exampleName: string) {
    if (exampleComponents[exampleName]) {
      selectedExample = { name: exampleName }
      showModal = true
    }
  }

  function closeModal() {
    showModal = false
    selectedExample = null
  }

  // Step-by-step tutorial for login form
  const loginFormSteps = [
    {
      step: 1,
      title: 'Import Components',
      code: `import { Input, Button, Card, Stack } from '@big0290/sv-prj-helper-ui';`,
      description: 'Start by importing the necessary components',
    },
    {
      step: 2,
      title: 'Create State Variables',
      code: `let email = $state('');
let password = $state('');`,
      description: 'Declare reactive state variables for form data',
    },
    {
      step: 3,
      title: 'Add Form Handler',
      code: `function handleLogin() {
  console.log('Login:', { email, password });
}`,
      description: 'Create a function to handle form submission',
    },
    {
      step: 4,
      title: 'Build UI',
      code: `<Card>
  <form on:submit={handleLogin}>
    <Stack gap="4">
      <Input bind:value={email} type="email" label="Email" required />
      <Input bind:value={password} type="password" label="Password" required />
      <Button variant="primary" type="submit">Sign In</Button>
    </Stack>
  </form>
</Card>`,
      description: 'Put it all together with the complete form UI',
    },
  ]
</script>

<svelte:head>
  <title>Examples - SV Project Helper</title>
</svelte:head>

<Container maxWidth="xl">
  <div class="examples-page">
    <!-- Breadcrumb -->
    <nav class="page-breadcrumb">
      <a href="/">Home</a>
      <span>→</span>
      <a href="/docs">Documentation</a>
      <span>→</span>
      <span>Examples</span>
    </nav>

    <header class="examples-header">
      <Stack gap="4" align="center">
        <Heading as="h1" size="1">Examples</Heading>
        <Text size="xl" color="var(--text-secondary)" align="center">
          Real-world applications built with SV Project Helper components
        </Text>
        <Text color="var(--text-secondary)" align="center">
          Explore complete examples to see how components work together in production applications
        </Text>
      </Stack>
    </header>

    <!-- Quick Examples Section -->
    <section class="quick-examples">
      <div class="section-header">
        <Heading as="h2" size="2">Quick Examples</Heading>
        <Text size="lg" color="var(--text-secondary)">Copy-paste ready code snippets for common use cases</Text>
      </div>

      <Grid cols="2" gap="6" style="margin-top: 2rem;">
        <Card>
          <Stack gap="3">
            <div>
              <Heading as="h3" size="4">Simple Login Form</Heading>
              <Text size="xs" color="var(--text-secondary)" style="margin-top: 0.25rem; margin-bottom: 0.5rem;">
                Real-world login form with email validation
              </Text>
              <div style="display: flex; gap: 0.375rem; flex-wrap: wrap;">
                <a href="/docs/components/input"><Badge variant="info" size="sm">Input</Badge></a>
                <a href="/docs/components/button"><Badge variant="info" size="sm">Button</Badge></a>
                <a href="/docs/components/card"><Badge variant="info" size="sm">Card</Badge></a>
                <a href="/docs/components/stack"><Badge variant="info" size="sm">Stack</Badge></a>
              </div>
            </div>
            <StaticCodeExample
              title="Login Form Example"
              description="Complete login form with email and password"
              code={`<script lang="ts">
  import { Input, Button, Card, Stack } from '@big0290/sv-prj-helper-ui';
  
  let email = $state('');
  let password = $state('');
  
  function handleLogin() {
    console.log('Login:', { email, password });
  }
</script>

<Card>
  <form on:submit={handleLogin}>
    <Stack gap="4">
      <Input bind:value={email} type="email" label="Email" required />
      <Input bind:value={password} type="password" label="Password" required />
      <Button variant="primary" type="submit">Sign In</Button>
    </Stack>
  </form>
</Card>`}
              language="svelte"
              showCopyButton={true}
            />
            <Button variant="primary" style="width: 100%" onclick={() => openExample('Login Form')}>
              View Live Demo →
            </Button>
          </Stack>
        </Card>

        <Card>
          <Stack gap="3">
            <div>
              <Heading as="h3" size="4">Card with Badge</Heading>
              <Text size="xs" color="var(--text-secondary)" style="margin-top: 0.25rem; margin-bottom: 0.5rem;">
                Display data with status badges and statistics
              </Text>
              <div style="display: flex; gap: 0.375rem; flex-wrap: wrap;">
                <a href="/docs/components/card"><Badge variant="info" size="sm">Card</Badge></a>
                <a href="/docs/components/badge"><Badge variant="info" size="sm">Badge</Badge></a>
                <a href="/docs/components/stack"><Badge variant="info" size="sm">Stack</Badge></a>
                <a href="/docs/components/text"><Badge variant="info" size="sm">Text</Badge></a>
              </div>
            </div>
            <StaticCodeExample
              title="Card Component Example"
              description="Card with badges and statistics"
              code={`<script lang="ts">
  import { Card, Badge, Stack, Text, Flex } from '@big0290/sv-prj-helper-ui';
</script>

<Card>
  <Stack gap="2">
    <Flex justify="space-between" align="center">
      <Text weight="bold">Total Revenue</Text>
      <Badge variant="success">Active</Badge>
    </Flex>
    <Text size="2xl" weight="bold">$45,231</Text>
    <Text size="sm" color="var(--text-secondary)">
      +20.1% from last month
    </Text>
  </Stack>
</Card>`}
              language="svelte"
              showCopyButton={true}
            />
            <Button variant="primary" style="width: 100%" onclick={() => openExample('Card with Badge')}>
              View Live Demo →
            </Button>
          </Stack>
        </Card>

        <Card>
          <Stack gap="3">
            <div>
              <Heading as="h3" size="4">Navigation Breadcrumb</Heading>
              <Text size="xs" color="var(--text-secondary)" style="margin-top: 0.25rem; margin-bottom: 0.5rem;">
                Navigate through hierarchical content with breadcrumbs
              </Text>
              <div style="display: flex; gap: 0.375rem; flex-wrap: wrap;">
                <a href="/docs/components/breadcrumb"><Badge variant="info" size="sm">Breadcrumb</Badge></a>
              </div>
            </div>
            <StaticCodeExample
              title="Breadcrumb Example"
              description="Simple breadcrumb navigation"
              code={`<script lang="ts">
  import { Breadcrumb } from '@big0290/sv-prj-helper-ui';
</script>

<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptop' }
]} />`}
              language="svelte"
              showCopyButton={true}
            />
            <Button variant="primary" style="width: 100%" onclick={() => openExample('Navigation Breadcrumb')}>
              View Live Demo →
            </Button>
          </Stack>
        </Card>

        <Card>
          <Stack gap="3">
            <div>
              <Heading as="h3" size="4">Alert Messages</Heading>
              <Text size="xs" color="var(--text-secondary)" style="margin-top: 0.25rem; margin-bottom: 0.5rem;">
                Provide user feedback with dismissible alerts
              </Text>
              <div style="display: flex; gap: 0.375rem; flex-wrap: wrap;">
                <a href="/docs/components/alert"><Badge variant="info" size="sm">Alert</Badge></a>
              </div>
            </div>
            <StaticCodeExample
              title="Alert Example"
              description="Dismissible alerts for user feedback"
              code={`<script lang="ts">
  import { Alert } from '@big0290/sv-prj-helper-ui';
</script>

<Alert variant="success" dismissible>
  Profile updated successfully!
</Alert>

<Alert variant="error" dismissible>
  Failed to save changes. Please try again.
</Alert>

<Alert variant="info">
  New features are available in the latest update.
</Alert>`}
              language="svelte"
              showCopyButton={true}
            />
            <Button variant="primary" style="width: 100%" onclick={() => openExample('Alert Messages')}>
              View Live Demo →
            </Button>
          </Stack>
        </Card>
      </Grid>
    </section>

    <!-- Build It Yourself Tutorial -->
    <section class="tutorial-section">
      <div class="section-header">
        <Heading as="h2" size="2">Build It Yourself</Heading>
        <Text size="lg" color="var(--text-secondary)">Learn step-by-step how to build a complete login form</Text>
      </div>

      <Card class="tutorial-card">
        <Stack gap="4">
          <div class="tutorial-header">
            <Heading as="h3" size="3">Login Form Tutorial</Heading>
            <Text color="var(--text-secondary)">Follow these simple steps to create your first form</Text>
          </div>

          <div class="steps-list">
            {#each loginFormSteps as tutorialStep}
              <Card class="step-card">
                <Stack gap="3">
                  <Flex gap="2" align="center">
                    <Badge variant="primary" size="lg">{tutorialStep.step}</Badge>
                    <Heading as="h4" size="5">{tutorialStep.title}</Heading>
                  </Flex>
                  <Text size="sm" color="var(--text-secondary)">{tutorialStep.description}</Text>
                  <StaticCodeExample code={tutorialStep.code} language="svelte" showCopyButton={true} />
                </Stack>
              </Card>
            {/each}
          </div>

          <Card variant="outlined" class="tutorial-result">
            <Stack gap="2">
              <Heading as="h4" size="5">Complete Result</Heading>
              <Text size="sm" color="var(--text-secondary)">Here's what you'll have after completing all steps</Text>
              <StaticCodeExample
                code={`<script lang="ts">
  import { Input, Button, Card, Stack } from '@big0290/sv-prj-helper-ui';
  
  let email = $state('');
  let password = $state('');
  
  function handleLogin() {
    console.log('Login:', { email, password });
  }
</script>

<Card>
  <form on:submit={handleLogin}>
    <Stack gap="4">
      <Input bind:value={email} type="email" label="Email" required />
      <Input bind:value={password} type="password" label="Password" required />
      <Button variant="primary" type="submit">Sign In</Button>
    </Stack>
  </form>
</Card>`}
                language="svelte"
                showCopyButton={true}
              />
            </Stack>
          </Card>
        </Stack>
      </Card>
    </section>

    <!-- Full Example Templates -->
    <section class="examples-grid">
      <div class="section-header">
        <Heading as="h2" size="2">Complete Example Templates</Heading>
        <Text size="lg" color="var(--text-secondary)">Production-ready templates built with our components</Text>
      </div>

      <Grid cols="3" gap="6" style="margin-top: 3rem;">
        {#each examples as example}
          <Card class="example-card">
            <div class="example-image">
              <img src={example.image} alt={example.title} />
              <div class="example-overlay">
                <a href={example.href} class="example-button"> View Example </a>
              </div>
            </div>

            <div class="example-content">
              <Stack gap="3">
                <div class="example-header">
                  <Heading as="h3" size="5">{example.title}</Heading>
                  <Badge variant={getDifficultyColor(example.difficulty)} size="sm">
                    {example.difficulty}
                  </Badge>
                </div>

                <Text color="var(--text-secondary)" size="sm" style="line-height: 1.6;">
                  {example.description}
                </Text>

                <div class="example-tags">
                  {#each example.tags as tag}
                    <Badge variant="default" size="sm">{tag}</Badge>
                  {/each}
                </div>

                <Text size="xs" color="var(--text-secondary)" style="margin-top: 0.5rem;">
                  Includes: {example.tags.join(', ')} components
                </Text>

                <div class="example-actions">
                  <Link href={example.href}>View Example →</Link>
                  <Link href="{example.href}/code">View Code</Link>
                </div>
              </Stack>
            </div>
          </Card>
        {/each}
      </Grid>
    </section>

    <section class="cta-section">
      <Card class="cta-card">
        <Stack gap="4" align="center">
          <Heading as="h2" size="3">Want to Contribute an Example?</Heading>
          <Text align="center" color="var(--text-secondary)">
            Have you built something amazing with SV Project Helper? Share it with the community!
          </Text>
          <Stack direction="row" gap="3" wrap justify="center">
            <a href="https://github.com/Big0290/sv-prj-helper/discussions" class="cta-button primary">
              Share Your Example
            </a>
            <a href="/docs/contributing" class="cta-button secondary"> Contributing Guide </a>
          </Stack>
        </Stack>
      </Card>
    </section>
  </div>

  <!-- Live Demo Modal -->
  <Modal bind:open={showModal} title={selectedExample?.name || 'Live Demo'} size="lg">
    <div class="modal-content">
      {#if Component}
        {@const ExampleComponent = Component}
        <ExampleComponent />
      {/if}
    </div>
  </Modal>
</Container>

<style>
  .examples-page {
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

  .examples-header {
    text-align: center;
    padding: 2rem 0 4rem;
  }

  .examples-grid {
    margin-bottom: 4rem;
  }

  .quick-examples {
    padding: 3rem 0;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 4rem;
  }

  .tutorial-section {
    padding: 4rem 0;
    background: var(--glass-bg);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    margin: 4rem 0;
  }

  .tutorial-card {
    max-width: 900px;
    margin: 0 auto;
  }

  .tutorial-header {
    text-align: center;
    padding: 1rem 0;
  }

  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .step-card {
    border-left: 4px solid var(--color-primary);
    transition: all 0.2s ease;
  }

  .step-card:hover {
    background: var(--bg-secondary);
    transform: translateX(4px);
  }

  .tutorial-result {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05));
    border: 2px solid var(--color-primary-light);
  }

  .section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 2rem;
  }

  :global(.example-card) {
    height: 100%;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  :global(.example-card:hover) {
    transform: translateY(-4px);
  }

  .example-image {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
  }

  .example-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  :global(.example-card:hover) .example-image img {
    transform: scale(1.05);
  }

  .example-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  :global(.example-card:hover) .example-overlay {
    opacity: 1;
  }

  .example-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    background: var(--color-primary);
    color: white;
    text-decoration: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .example-button:hover {
    background: var(--color-primary-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  }

  .example-content {
    padding: 1.5rem;
  }

  .example-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .example-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .example-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
  }

  .cta-section {
    margin-top: 4rem;
  }

  :global(.cta-card) {
    text-align: center;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05));
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .cta-button.primary {
    background: var(--color-primary);
    color: white;
  }

  .cta-button.primary:hover {
    background: var(--color-primary-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  }

  .cta-button.secondary {
    background: var(--glass-bg);
    color: var(--text-primary);
    border: 1px solid var(--glass-border);
  }

  .cta-button.secondary:hover {
    background: var(--glass-bg-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    .examples-page {
      padding: 1rem 0 2rem;
    }

    .examples-header {
      padding: 1rem 0 2rem;
    }

    .quick-examples :global(.grid),
    .examples-grid :global(.grid) {
      grid-template-columns: 1fr;
    }

    :global(.cta-card) {
      padding: 2rem 1rem;
    }

    .example-actions {
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    .examples-grid :global(.grid) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Clickable badge links */
  a :global(.badge) {
    transition: all 0.2s ease;
    cursor: pointer;
  }

  a:hover :global(.badge) {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
  }

  .modal-content {
    padding: 1rem 0;
  }
</style>
