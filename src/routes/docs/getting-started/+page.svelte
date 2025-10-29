<script lang="ts">
  import { Container, Heading, Text, Card, Stack, Code, Alert, Button, Badge, Grid } from '$lib/ui'
</script>

<svelte:head>
  <title>Getting Started - SV Project Helper</title>
  <meta name="description" content="Complete guide to getting started with SV Project Helper UI library." />
</svelte:head>

<Container maxWidth="4xl">
  <Stack gap="8">
    <!-- Header -->
    <div class="page-header">
      <Badge variant="primary">🚀 Getting Started</Badge>
      <Heading as="h1" size="1">Welcome to SV Project Helper</Heading>
      <Text size="xl" color="var(--text-secondary)">
        Everything you need to know to start building beautiful UIs with our Svelte 5 component library
      </Text>
    </div>

    <!-- Quick Overview -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">What is SV Project Helper?</Heading>
        <Text>
          SV Project Helper is a comprehensive Svelte 5 component library featuring over 150 components with a beautiful
          glassmorphism design system. Built with accessibility, TypeScript, and developer experience as core
          principles.
        </Text>

        <Grid cols="3" gap="4">
          <div class="feature-highlight">
            <div class="feature-icon">🎨</div>
            <Text weight="medium">Glassmorphism Design</Text>
            <Text size="sm" color="var(--text-secondary)">Beautiful glass effects with purple gradients</Text>
          </div>
          <div class="feature-highlight">
            <div class="feature-icon">♿</div>
            <Text weight="medium">Accessibility First</Text>
            <Text size="sm" color="var(--text-secondary)">WCAG 2.1 AA compliant components</Text>
          </div>
          <div class="feature-highlight">
            <div class="feature-icon">⚡</div>
            <Text weight="medium">Svelte 5 Native</Text>
            <Text size="sm" color="var(--text-secondary)">Built with runes and modern features</Text>
          </div>
        </Grid>
      </Stack>
    </Card>

    <!-- Installation Steps -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Installation & Setup</Heading>

        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <Heading as="h3" size="4">Install the Package</Heading>
            <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
              Add SV Project Helper to your Svelte 5 project:
            </Text>
            <Code language="bash" code="npm install @big0290/sv-prj-helper-ui" />
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <Heading as="h3" size="4">Import Styles</Heading>
            <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
              Import the theme CSS in your root layout:
            </Text>
            <Code
              language="svelte"
              code={`<!-- src/routes/+layout.svelte -->
<script>
  import '@big0290/sv-prj-helper-ui/styles';
</script>`}
            />
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <Heading as="h3" size="4">Add Theme Provider</Heading>
            <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
              Wrap your app with the ThemeProvider:
            </Text>
            <Code
              language="svelte"
              code={`<script>
  import { ThemeProvider } from '@big0290/sv-prj-helper-ui';
</script>

<ThemeProvider>
  <slot />
</ThemeProvider>`}
            />
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">4</div>
          <div class="step-content">
            <Heading as="h3" size="4">Start Building</Heading>
            <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
              Import and use components in your pages:
            </Text>
            <Code
              language="svelte"
              code={`<script lang="ts">
  import { Button, Card, Input } from '@big0290/sv-prj-helper-ui';
</script>

<Card>
  <h1>Hello SV Project Helper!</h1>
  <Button variant="primary">Get Started</Button>
</Card>`}
            />
          </div>
        </div>
      </Stack>
    </Card>

    <!-- Component Categories -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Component Categories</Heading>
        <Text>Explore our comprehensive component library organized by atomic design principles:</Text>

        <Grid cols="2" gap="4">
          <div class="category-card">
            <Heading as="h4" size="5">🔹 Atoms</Heading>
            <Text size="sm" color="var(--text-secondary)" style="margin: 0.5rem 0;">Basic building blocks</Text>
            <ul class="component-list">
              <li>Button, Input, Badge</li>
              <li>Avatar, Icon, Text</li>
              <li>Checkbox, Radio, Switch</li>
            </ul>
            <Button variant="ghost" size="sm" href="/demos/atoms">View Atoms →</Button>
          </div>

          <div class="category-card">
            <Heading as="h4" size="5">🔸 Molecules</Heading>
            <Text size="sm" color="var(--text-secondary)" style="margin: 0.5rem 0;">Simple compositions</Text>
            <ul class="component-list">
              <li>Card, Alert, Toast</li>
              <li>Menu, Tooltip, Modal</li>
              <li>Breadcrumb, Pagination</li>
            </ul>
            <Button variant="ghost" size="sm" href="/demos/molecules">View Molecules →</Button>
          </div>

          <div class="category-card">
            <Heading as="h4" size="5">🔶 Organisms</Heading>
            <Text size="sm" color="var(--text-secondary)" style="margin: 0.5rem 0;">Complex components</Text>
            <ul class="component-list">
              <li>DataTable, Chat System</li>
              <li>Video Player, Code Editor</li>
              <li>Barcode Scanner, Forms</li>
            </ul>
            <Button variant="ghost" size="sm" href="/demos/organisms">View Organisms →</Button>
          </div>

          <div class="category-card">
            <Heading as="h4" size="5">📐 Layouts</Heading>
            <Text size="sm" color="var(--text-secondary)" style="margin: 0.5rem 0;">Structural components</Text>
            <ul class="component-list">
              <li>Container, Grid, Stack</li>
              <li>Navbar, Sidebar</li>
              <li>Responsive layouts</li>
            </ul>
            <Button variant="ghost" size="sm" href="/demos/layouts">View Layouts →</Button>
          </div>
        </Grid>
      </Stack>
    </Card>

    <!-- Key Features -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Key Features</Heading>

        <Grid cols="2" gap="6">
          <div>
            <Heading as="h3" size="4">🎯 TypeScript First</Heading>
            <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
              Full type safety with exported interfaces and comprehensive IntelliSense support.
            </Text>
            <Code
              language="typescript"
              code={`import type { ButtonProps } from '@big0290/sv-prj-helper-ui';

const buttonConfig: ButtonProps = {
  variant: 'primary',
  size: 'lg',
  disabled: false
};`}
            />
          </div>

          <div>
            <Heading as="h3" size="4">🌙 Dark Mode</Heading>
            <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
              Automatic dark mode support with system preference detection.
            </Text>
            <Code
              language="svelte"
              code={`<script>
  import { useTheme } from '@big0290/sv-prj-helper-ui';
  
  const { theme, toggleTheme } = useTheme();
</script>

<Button onclick={toggleTheme}>
  Toggle {theme} Mode
</Button>`}
            />
          </div>

          <div>
            <Heading as="h3" size="4">🎨 Customizable</Heading>
            <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
              Easy theming with CSS custom properties and design tokens.
            </Text>
            <Code
              language="css"
              code={`:root {
  --color-primary: #your-brand-color;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --radius-md: 0.5rem;
}`}
            />
          </div>

          <div>
            <Heading as="h3" size="4">📱 Responsive</Heading>
            <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
              Mobile-first design with responsive components and utilities.
            </Text>
            <Code
              language="svelte"
              code={`<Grid 
  cols="1" 
  colsMd="2" 
  colsLg="3" 
  gap="4"
>
  <Card>Responsive content</Card>
</Grid>`}
            />
          </div>
        </Grid>
      </Stack>
    </Card>

    <!-- Common Patterns -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Common Usage Patterns</Heading>

        <div>
          <Heading as="h3" size="4">Form Building</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
            Create accessible forms with validation and error handling:
          </Text>
          <Code
            language="svelte"
            code={`<script lang="ts">
  import { Card, Stack, Input, Button, Alert } from '@big0290/sv-prj-helper-ui';
  
  let formData = $state({
    name: '',
    email: '',
    message: ''
  });
  let errors = $state({});
  let loading = $state(false);
</script>

<Card>
  <Stack gap="4">
    <h2>Contact Form</h2>
    
    {#if errors.general}
      <Alert variant="error">{errors.general}</Alert>
    {/if}
    
    <Input
      bind:value={formData.name}
      label="Full Name"
      error={errors.name}
      required
    />
    
    <Input
      bind:value={formData.email}
      type="email"
      label="Email Address"
      error={errors.email}
      required
    />
    
    <Button 
      type="submit" 
      variant="primary"
      {loading}
      onclick={handleSubmit}
    >
      {loading ? 'Sending...' : 'Send Message'}
    </Button>
  </Stack>
</Card>`}
          />
        </div>

        <div>
          <Heading as="h3" size="4">Data Display</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
            Display data with tables, cards, and statistics:
          </Text>
          <Code
            language="svelte"
            code={`<script lang="ts">
  import { DataTable, StatsCard, Grid } from '@big0290/sv-prj-helper-ui';
  
  const stats = [
    { title: 'Users', value: '2,543', change: '+12%' },
    { title: 'Revenue', value: '$45,210', change: '+8%' }
  ];
  
  const tableData = [
    { id: 1, name: 'John Doe', status: 'Active' },
    { id: 2, name: 'Jane Smith', status: 'Pending' }
  ];
</script>

<Grid cols="2" gap="4">
  {#each stats as stat}
    <StatsCard {...stat} />
  {/each}
</Grid>

<DataTable 
  data={tableData}
  columns={[
    { key: 'name', title: 'Name' },
    { key: 'status', title: 'Status' }
  ]}
/>`}
          />
        </div>
      </Stack>
    </Card>

    <!-- Best Practices -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Best Practices</Heading>

        <Alert variant="success">
          <Stack gap="3">
            <Text weight="medium">Tips for Success</Text>
            <ul class="best-practices">
              <li><strong>Import selectively:</strong> Only import components you need for better tree-shaking</li>
              <li><strong>Use TypeScript:</strong> Take advantage of full type safety and IntelliSense</li>
              <li><strong>Follow atomic design:</strong> Compose complex UIs from simple components</li>
              <li><strong>Test accessibility:</strong> Use keyboard navigation and screen readers</li>
              <li><strong>Customize thoughtfully:</strong> Override CSS variables to match your brand</li>
              <li><strong>Stay consistent:</strong> Use the design system tokens for spacing and colors</li>
            </ul>
          </Stack>
        </Alert>
      </Stack>
    </Card>

    <!-- Troubleshooting -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Common Issues</Heading>

        <div class="troubleshooting-item">
          <Heading as="h4" size="5">Components not styled correctly</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0;">
            Make sure you've imported the theme CSS and wrapped your app with ThemeProvider.
          </Text>
        </div>

        <div class="troubleshooting-item">
          <Heading as="h4" size="5">TypeScript errors</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0;">
            Ensure you're using Svelte 5 and have proper TypeScript configuration for ES modules.
          </Text>
        </div>

        <div class="troubleshooting-item">
          <Heading as="h4" size="5">Build errors</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0;">
            Check that your bundler supports ES modules and Svelte 5. Update to the latest versions.
          </Text>
        </div>
      </Stack>
    </Card>

    <!-- Next Steps -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">What's Next?</Heading>
        <Text>You're ready to start building! Here are some recommended next steps:</Text>

        <div class="next-steps-grid">
          <Button variant="primary" href="/docs/quick-start">📚 Follow Quick Start Guide</Button>
          <Button variant="secondary" href="/demos">🧩 Browse All Components</Button>
          <Button variant="ghost" href="/docs/theming">🎨 Customize Theming</Button>
          <Button variant="ghost" href="/examples">💡 View Examples</Button>
          <Button variant="ghost" href="/docs/accessibility">♿ Learn Accessibility</Button>
          <Button variant="ghost" href="https://github.com/Big0290/sv-prj-helper" target="_blank">
            ⭐ Star on GitHub
          </Button>
        </div>
      </Stack>
    </Card>
  </Stack>
</Container>

<style>
  .page-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .feature-highlight {
    text-align: center;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    background: var(--bg-secondary);
  }

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .step-item {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--color-primary);
    color: white;
    border-radius: 50%;
    font-weight: 600;
    font-size: 1.125rem;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;
  }

  .category-card {
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    background: var(--bg-secondary);
  }

  .component-list {
    margin: 1rem 0;
    padding-left: 1rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .component-list li {
    margin: 0.25rem 0;
  }

  .best-practices {
    margin: 0;
    padding-left: 1.5rem;
  }

  .best-practices li {
    margin: 0.5rem 0;
    color: var(--text-secondary);
  }

  .troubleshooting-item {
    padding: 1rem;
    border-left: 4px solid var(--color-warning);
    background: rgba(245, 158, 11, 0.05);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  .next-steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .step-item {
      flex-direction: column;
      text-align: center;
    }

    .next-steps-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
