<script lang="ts">
  import {
    Container,
    Heading,
    Text,
    Stack,
    Card,
    Button,
    Badge,
    Link,
    Flex,
    Grid,
    StaticCodeExample,
    Input,
    Alert,
    Checkbox,
    Switch,
    Chip,
    Rating,
    Progress,
    Breadcrumb,
    Pagination,
  } from '$lib/ui'

  // Demo state
  let formEmail = $state('')
  let showAlert = $state(false)

  // Component categories
  const componentCategories = [
    {
      name: 'Form Controls',
      icon: '📝',
      description: 'Inputs, selects, checkboxes, and other form elements',
      count: '22',
      components: ['Input', 'Textarea', 'Checkbox', 'Radio', 'Switch', 'Select'],
      link: '/docs/components?category=forms',
    },
    {
      name: 'Navigation',
      icon: '🧭',
      description: 'Menus, breadcrumbs, tabs, and navigation patterns',
      count: '9',
      components: ['Breadcrumb', 'Menu', 'Tabs', 'Pagination', 'Navbar'],
      link: '/docs/components?category=navigation',
    },
    {
      name: 'Feedback',
      icon: '💬',
      description: 'Alerts, toasts, modals, and user notifications',
      count: '15',
      components: ['Alert', 'Toast', 'Modal', 'Snackbar', 'Tooltip'],
      link: '/docs/components?category=feedback',
    },
    {
      name: 'Data Display',
      icon: '📊',
      description: 'Tables, cards, badges, and data visualization',
      count: '18',
      components: ['Card', 'Badge', 'DataTable', 'TreeView', 'Timeline'],
      link: '/docs/components?category=data',
    },
  ]

  const quickStartCode = `<script lang="ts">
	import { Button, Card, Stack, Heading, Text } from '@big0290/sv-prj-helper-ui';
<\/script>

<Card>
	<Stack gap="4">
		<Heading as="h2" size="4">Welcome to SV Project Helper</Heading>
		<Text>A modern, accessible Svelte 5 component library.</Text>
		<Button variant="primary">Get Started</Button>
	</Stack>
</Card>`

  const features = [
    {
      icon: '🎨',
      title: 'Glassmorphism Design',
      description: 'Beautiful purple-themed glass effects with backdrop blur for a modern aesthetic',
    },
    {
      icon: '♿',
      title: 'Accessibility First',
      description: 'WCAG 2.1 AA compliant with ARIA labels, keyboard navigation, and screen reader support',
    },
    {
      icon: '⚡',
      title: 'Svelte 5 Native',
      description: 'Built with the latest Svelte 5 features including runes and snippets',
    },
    {
      icon: '🔧',
      title: 'TypeScript Ready',
      description: 'Complete type safety with exported interfaces and comprehensive type definitions',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Mobile-first approach with responsive components that work on all devices',
    },
    {
      icon: '🌙',
      title: 'Dark Mode Support',
      description: 'Automatic system preference detection with seamless theme switching',
    },
  ]

  const stats = [
    { label: 'Components', value: '50+', description: 'Ready-to-use components' },
    { label: 'Examples', value: '100+', description: 'Real-world usage examples' },
    { label: 'TypeScript', value: '100%', description: 'Fully typed codebase' },
    { label: 'Bundle Size', value: '<50kb', description: 'Optimized for performance' },
  ]
</script>

<svelte:head>
  <title>Documentation - SV Project Helper</title>
  <meta
    name="description"
    content="Modern, accessible Svelte 5 component library with glassmorphism design and comprehensive TypeScript support"
  />
</svelte:head>

<div class="docs-home">
  <Container maxWidth="xl">
    <!-- Hero Section -->
    <section class="hero-section">
      <Stack gap="6" align="center">
        <div class="hero-content">
          <Stack gap="4" align="center">
            <div class="hero-badge">
              <Badge variant="info" size="lg">v1.0.0 Available Now</Badge>
            </div>

            <div class="hero-text">
              <Heading as="h1" size="1" class="hero-title">SV Project Helper</Heading>
              <Text size="xl" color="var(--text-secondary)" class="hero-subtitle">
                A modern, accessible Svelte 5 component library featuring glassmorphism design
              </Text>
            </div>

            <div class="hero-actions">
              <Button variant="primary" size="lg" href="/docs/installation">Get Started</Button>
              <Button variant="ghost" size="lg" href="/docs/components">Browse Components</Button>
            </div>
          </Stack>
        </div>

        <!-- Quick Start Example -->
        <div class="hero-example">
          <StaticCodeExample
            title="Quick Start Example"
            description="Get started with SV Project Helper in minutes"
            code={quickStartCode}
            language="svelte"
            showCopyButton={true}
          />
        </div>
      </Stack>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-grid">
        {#each stats as stat}
          <Card class="stat-card">
            <Stack gap="2" align="center">
              <Heading as="h3" size="2" class="stat-value">{stat.value}</Heading>
              <Text weight="medium">{stat.label}</Text>
              <Text size="sm" color="var(--text-secondary)" class="stat-description">
                {stat.description}
              </Text>
            </Stack>
          </Card>
        {/each}
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <Stack gap="6">
        <div class="section-header">
          <Heading as="h2" size="2">Why Choose SV Project Helper?</Heading>
          <Text size="lg" color="var(--text-secondary)">
            Built with modern web standards and developer experience in mind
          </Text>
        </div>

        <div class="features-grid">
          {#each features as feature}
            <Card class="feature-card">
              <Stack gap="3">
                <div class="feature-icon">{feature.icon}</div>
                <div>
                  <Heading as="h3" size="4">{feature.title}</Heading>
                  <Text color="var(--text-secondary)">{feature.description}</Text>
                </div>
              </Stack>
            </Card>
          {/each}
        </div>
      </Stack>
    </section>

    <!-- Component Showcases -->
    <section class="showcases-section">
      <div class="section-header">
        <Heading as="h2" size="2">Component Showcases</Heading>
        <Text size="lg" color="var(--text-secondary)">See our components in action with interactive examples</Text>
      </div>

      <Grid cols="2" gap="6" style="margin-top: 3rem;">
        <!-- Forms Showcase -->
        <Card>
          <Stack gap="4">
            <Heading as="h3" size="4">Form Controls</Heading>
            <Text size="sm" color="var(--text-secondary)">Complete set of form components with validation</Text>

            <Stack gap="3">
              <Input bind:value={formEmail} type="email" label="Email" placeholder="your@email.com" required />
              <Checkbox checked={false}>Remember me</Checkbox>
              <Switch checked={true} label="Email notifications" />
            </Stack>

            <StaticCodeExample
              title="Usage Example"
              code={`<script lang="ts">
  import { Input, Checkbox, Switch } from '@big0290/sv-prj-helper-ui';
  
  let email = $state('');
  let rememberMe = $state(false);
</script>

<Input bind:value={email} type="email" label="Email" required />
<Checkbox bind:checked={rememberMe}>Remember me</Checkbox>
<Switch bind:checked={notifications} label="Notifications" />`}
              language="svelte"
              showCopyButton={true}
            />
          </Stack>
        </Card>

        <!-- Feedback Showcase -->
        <Card>
          <Stack gap="4">
            <Heading as="h3" size="4">Feedback & Display</Heading>
            <Text size="sm" color="var(--text-secondary)">Alerts, chips, ratings, and progress indicators</Text>

            <Stack gap="3">
              <Alert variant="info" dismissible>This is an informational alert</Alert>

              <Flex gap="2" wrap>
                <Chip>Default</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="success">Success</Chip>
              </Flex>

              <Flex gap="4" align="center">
                <Rating value={4} />
                <Progress value={75} />
              </Flex>
            </Stack>

            <StaticCodeExample
              title="Usage Example"
              code={`<script lang="ts">
  import { Alert, Chip, Rating, Progress } from '@big0290/sv-prj-helper-ui';
</script>

<Alert variant="info" dismissible>Info message</Alert>

<Chip>Default</Chip>
<Chip color="primary">Primary</Chip>

<Rating value={4} />
<Progress value={75} />`}
              language="svelte"
              showCopyButton={true}
            />
          </Stack>
        </Card>

        <!-- Navigation Showcase -->
        <Card>
          <Stack gap="4">
            <Heading as="h3" size="4">Navigation</Heading>
            <Text size="sm" color="var(--text-secondary)">Breadcrumbs and pagination for easy navigation</Text>

            <Stack gap="3">
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Documentation', href: '/docs' },
                  { label: 'Navigation' },
                ]}
              />

              <Pagination total={50} current={5} />
            </Stack>

            <StaticCodeExample
              title="Usage Example"
              code={`<script lang="ts">
  import { Breadcrumb, Pagination } from '@big0290/sv-prj-helper-ui';
</script>

<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
  { label: 'Current' }
]} />

<Pagination total={100} current={5} />`}
              language="svelte"
              showCopyButton={true}
            />
          </Stack>
        </Card>

        <!-- Data Display Showcase -->
        <Card>
          <Stack gap="4">
            <Heading as="h3" size="4">Data Display</Heading>
            <Text size="sm" color="var(--text-secondary)">Cards, badges, and stats for displaying data</Text>

            <Card variant="outlined">
              <Stack gap="2">
                <Flex justify="space-between">
                  <Text weight="bold">Total Users</Text>
                  <Badge variant="info">New</Badge>
                </Flex>
                <Text size="2xl" weight="bold">12,543</Text>
                <Text size="sm" color="var(--text-secondary)">+234 this week</Text>
              </Stack>
            </Card>

            <StaticCodeExample
              title="Usage Example"
              code={`<script lang="ts">
  import { Card, Badge, Stack, Flex, Text } from '@big0290/sv-prj-helper-ui';
</script>

<Card>
  <Stack gap="2">
    <Flex justify="space-between">
      <Text weight="bold">Title</Text>
      <Badge variant="info">New</Badge>
    </Flex>
    <Text>Content goes here</Text>
  </Stack>
</Card>`}
              language="svelte"
              showCopyButton={true}
            />
          </Stack>
        </Card>
      </Grid>
    </section>

    <!-- Component Categories -->
    <section class="categories-section">
      <div class="section-header">
        <Heading as="h2" size="2">Component Categories</Heading>
        <Text size="lg" color="var(--text-secondary)">Explore components organized by purpose and functionality</Text>
      </div>

      <Grid cols="2" gap="6" style="margin-top: 3rem;">
        {#each componentCategories as category}
          <Card class="category-card">
            <Link href={category.link} class="category-link">
              <Stack gap="4">
                <Flex gap="3" align="center">
                  <div class="category-icon">{category.icon}</div>
                  <div class="category-info">
                    <Heading as="h3" size="4">{category.name}</Heading>
                    <Text size="sm" color="var(--text-secondary)">{category.description}</Text>
                  </div>
                  <Badge variant="info" style="margin-left: auto;">{category.count}</Badge>
                </Flex>

                <div class="category-components">
                  {#each category.components as component}
                    <a href="/docs/components/{component.toLowerCase()}" class="component-tag">
                      {component}
                    </a>
                  {/each}
                </div>

                <Text size="xs" color="var(--color-primary)" style="font-weight: 500;">
                  Browse all {category.name.toLowerCase()} components →
                </Text>
              </Stack>
            </Link>
          </Card>
        {/each}
      </Grid>
    </section>

    <!-- Getting Started Section -->
    <section class="getting-started-section">
      <Card class="getting-started-card">
        <Stack gap="6">
          <div class="section-header">
            <Heading as="h2" size="3">Ready to Get Started?</Heading>
            <Text color="var(--text-secondary)">
              Follow our comprehensive guides to start building with SV Project Helper
            </Text>
          </div>

          <div class="getting-started-grid">
            <Link href="/docs/installation" class="getting-started-item">
              <Stack gap="2">
                <div class="step-number">1</div>
                <Heading as="h4" size="5">Installation</Heading>
                <Text size="sm" color="var(--text-secondary)">
                  Install the library and set up your development environment
                </Text>
              </Stack>
            </Link>

            <Link href="/docs/quick-start" class="getting-started-item">
              <Stack gap="2">
                <div class="step-number">2</div>
                <Heading as="h4" size="5">Quick Start</Heading>
                <Text size="sm" color="var(--text-secondary)">Learn the basics and create your first component</Text>
              </Stack>
            </Link>

            <Link href="/docs/components" class="getting-started-item">
              <Stack gap="2">
                <div class="step-number">3</div>
                <Heading as="h4" size="5">Explore Components</Heading>
                <Text size="sm" color="var(--text-secondary)">Browse our comprehensive component library</Text>
              </Stack>
            </Link>

            <Link href="/docs/examples" class="getting-started-item">
              <Stack gap="2">
                <div class="step-number">4</div>
                <Heading as="h4" size="5">View Examples</Heading>
                <Text size="sm" color="var(--text-secondary)">See real-world usage patterns and best practices</Text>
              </Stack>
            </Link>
          </div>
        </Stack>
      </Card>
    </section>

    <!-- Community Section -->
    <section class="community-section">
      <Stack gap="4" align="center">
        <div class="section-header">
          <Heading as="h2" size="3">Join Our Community</Heading>
          <Text color="var(--text-secondary)">Get help, share feedback, and contribute to the project</Text>
        </div>

        <div class="community-links">
          <Button variant="ghost" href="https://github.com/Big0290/sv-prj-helper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path>
            </svg>
            GitHub
          </Button>

          <Button variant="ghost" href="https://discord.gg/your-discord">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"
              />
            </svg>
            Discord
          </Button>

          <Button variant="ghost" href="https://twitter.com/your-twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
              ></path>
            </svg>
            Twitter
          </Button>
        </div>
      </Stack>
    </section>
  </Container>
</div>

<style>
  .docs-home {
    padding: 3rem 0 4rem;
  }

  /* Hero Section */
  .hero-section {
    padding: 2rem 0 4rem;
    text-align: center;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-badge {
    margin-bottom: 1rem;
  }

  .hero-title {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-example {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  /* Stats Section */
  .stats-section {
    padding: 3rem 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .stat-card {
    text-align: center;
    padding: 2rem 1rem;
    transition: transform 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
  }

  .stat-value {
    color: var(--color-primary);
    font-weight: 700;
  }

  .stat-description {
    text-align: center;
  }

  /* Features Section */
  .features-section {
    padding: 4rem 0;
  }

  /* Showcases Section */
  .showcases-section {
    padding: 4rem 0;
    border-top: 1px solid var(--border-color);
  }

  /* Categories Section */
  .categories-section {
    padding: 4rem 0;
    background: var(--glass-bg);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }

  .category-card {
    transition: all 0.2s ease;
    height: 100%;
  }

  .category-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .category-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .category-icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  .category-info {
    flex: 1;
  }

  .category-components {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .component-tag {
    padding: 0.375rem 0.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: 0.8125rem;
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.2s ease;
  }

  .component-tag:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  .section-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    padding: 2rem;
    transition: all 0.2s ease;
    border: 1px solid var(--border-color);
  }

  .feature-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary-light);
  }

  .feature-icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  /* Getting Started Section */
  .getting-started-section {
    padding: 4rem 0;
  }

  .getting-started-card {
    padding: 3rem 2rem;
  }

  .getting-started-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .getting-started-item {
    display: block;
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
    border: 1px solid var(--border-color);
  }

  .getting-started-item:hover {
    background: var(--bg-tertiary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .step-number {
    width: 32px;
    height: 32px;
    background: var(--color-primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
  }

  /* Community Section */
  .community-section {
    padding: 4rem 0;
    text-align: center;
  }

  .community-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .docs-home {
      padding: 2rem 0;
    }

    .hero-section {
      padding: 1rem 0 3rem;
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .showcases-section :global(.grid),
    .categories-section :global(.grid) {
      grid-template-columns: 1fr;
    }

    .getting-started-grid {
      grid-template-columns: 1fr;
    }

    .getting-started-card {
      padding: 2rem 1rem;
    }

    .feature-card {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .community-links {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
