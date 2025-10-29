<script lang="ts">
  import { Container, Heading, Text, Card, Stack, Code, Alert, Button, Badge, StaticCodeExample } from '$lib/ui'
</script>

<svelte:head>
  <title>Quick Start - SV Project Helper</title>
  <meta name="description" content="Get up and running with SV Project Helper in minutes." />
</svelte:head>

<Container maxWidth="4xl">
  <Stack gap="8">
    <!-- Header -->
    <div class="page-header">
      <Badge variant="success">⚡ Quick Start</Badge>
      <Heading as="h1" size="1">Get Started in Minutes</Heading>
      <Text size="xl" color="var(--text-secondary)">Build your first component with SV Project Helper</Text>
    </div>

    <!-- Step 1 -->
    <Card>
      <Stack gap="4">
        <div class="step-header">
          <div class="step-number">1</div>
          <Heading as="h2" size="3">Create Your First Component</Heading>
        </div>

        <Text>Let's build a simple login form to demonstrate the basics:</Text>

        <StaticCodeExample
          language="svelte"
          code={`<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { 
    Button, 
    Card, 
    Input, 
    Stack, 
    Heading, 
    Alert 
  } from '@big0290/sv-prj-helper-ui';
  
  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let error = $state('');
  
  async function handleLogin() {
    loading = true;
    error = '';
    
    try {
      // Your login logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login attempt:', { email, password });
    } catch (err) {
      error = 'Login failed. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="login-container">
  <Card class="login-card">
    <Stack gap="6">
      <Heading as="h1" size="2" align="center">
        Welcome Back
      </Heading>
      
      {#if error}
        <Alert variant="error">
          {error}
        </Alert>
      {/if}
      
      <form onsubmit={handleLogin}>
        <Stack gap="4">
          <Input
            bind:value={email}
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            required
          />
          
          <Input
            bind:value={password}
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            {loading}
            disabled={!email || !password}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Stack>
      </form>
    </Stack>
  </Card>
</div>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
  }
  
  :global(.login-card) {
    width: 100%;
    max-width: 400px;
  }
</style>`}
          showCopyButton={true}
        />
      </Stack>
    </Card>

    <!-- Step 2 -->
    <Card>
      <Stack gap="4">
        <div class="step-header">
          <div class="step-number">2</div>
          <Heading as="h2" size="3">Add Navigation</Heading>
        </div>

        <Text>Create a navigation bar using the Navbar component:</Text>

        <StaticCodeExample
          language="svelte"
          code={`<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { ThemeProvider, Container, Navbar } from '@big0290/sv-prj-helper-ui';
  import '@big0290/sv-prj-helper-ui/styles';
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
</script>

<ThemeProvider>
  <Navbar 
    brand="My App"
    items={navItems}
    brandHref="/"
  />
  
  <main>
    <slot />
  </main>
</ThemeProvider>`}
          showCopyButton={true}
        />
      </Stack>
    </Card>

    <!-- Step 3 -->
    <Card>
      <Stack gap="4">
        <div class="step-header">
          <div class="step-number">3</div>
          <Heading as="h2" size="3">Build a Dashboard</Heading>
        </div>

        <Text>Create a dashboard with cards and data display:</Text>

        <StaticCodeExample
          language="svelte"
          code={`<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { 
    Container, 
    Grid, 
    Card, 
    StatsCard, 
    Button, 
    Badge,
    Stack,
    Heading,
    DataTable
  } from '@big0290/sv-prj-helper-ui';
  
  const stats = [
    { title: 'Total Users', value: '2,543', change: '+12%', trend: 'up' },
    { title: 'Revenue', value: '$45,210', change: '+8%', trend: 'up' },
    { title: 'Orders', value: '1,234', change: '-3%', trend: 'down' },
    { title: 'Conversion', value: '3.2%', change: '+0.5%', trend: 'up' }
  ];
  
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' }
  ];
  
  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'status', title: 'Status' }
  ];
</script>

<Container maxWidth="xl">
  <Stack gap="8">
    <div class="dashboard-header">
      <Heading as="h1" size="1">Dashboard</Heading>
      <Button variant="primary">
        Add New User
      </Button>
    </div>
    
    <!-- Stats Grid -->
    <Grid cols="4" gap="6">
      {#each stats as stat}
        <StatsCard
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
        />
      {/each}
    </Grid>
    
    <!-- Data Table -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Recent Users</Heading>
        <DataTable 
          data={tableData}
          {columns}
        />
      </Stack>
    </Card>
  </Stack>
</Container>

<style>
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>`}
          showCopyButton={true}
        />
      </Stack>
    </Card>

    <!-- Step 4 -->
    <Card>
      <Stack gap="4">
        <div class="step-header">
          <div class="step-number">4</div>
          <Heading as="h2" size="3">Add Interactivity</Heading>
        </div>

        <Text>Use hooks and interactive components for dynamic behavior:</Text>

        <StaticCodeExample
          language="svelte"
          code={`<script lang="ts">
  import { 
    Button, 
    Modal, 
    Toast, 
    useToast, 
    useTheme 
  } from '@big0290/sv-prj-helper-ui';
  
  let showModal = $state(false);
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  
  function handleSuccess() {
    addToast({
      type: 'success',
      title: 'Success!',
      message: 'Your action was completed successfully.'
    });
    showModal = false;
  }
</script>

<div class="interactive-demo">
  <Button onclick={() => showModal = true}>
    Open Modal
  </Button>
  
  <Button variant="ghost" onclick={toggleTheme}>
    Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
  </Button>
</div>

{#if showModal}
  <Modal
    title="Confirm Action"
    onClose={() => showModal = false}
  >
    <p>Are you sure you want to proceed?</p>
    
    <div slot="footer">
      <Button variant="ghost" onclick={() => showModal = false}>
        Cancel
      </Button>
      <Button variant="primary" onclick={handleSuccess}>
        Confirm
      </Button>
    </div>
  </Modal>
{/if}`}
          showCopyButton={true}
        />
      </Stack>
    </Card>

    <!-- Best Practices -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Best Practices</Heading>

        <Alert variant="info">
          <Stack gap="3">
            <Text weight="medium">Tips for Success</Text>
            <ul class="best-practices">
              <li><strong>Use TypeScript:</strong> Get full type safety and better IntelliSense</li>
              <li><strong>Consistent spacing:</strong> Use the Stack and Grid components for layout</li>
              <li><strong>Accessibility first:</strong> Components include ARIA labels and keyboard navigation</li>
              <li><strong>Theme customization:</strong> Use CSS custom properties to match your brand</li>
              <li><strong>Performance:</strong> Import only the components you need</li>
            </ul>
          </Stack>
        </Alert>
      </Stack>
    </Card>

    <!-- Next Steps -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">What's Next?</Heading>
        <Text>You're ready to build amazing UIs! Explore these resources to learn more:</Text>

        <div class="next-steps">
          <Button variant="primary" href="/demos">Browse All Components</Button>
          <Button variant="secondary" href="/docs/theming">Customize Theming</Button>
          <Button variant="ghost" href="/examples">View Examples</Button>
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

  .step-header {
    display: flex;
    align-items: center;
    gap: 1rem;
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

  .best-practices {
    margin: 0;
    padding-left: 1.5rem;
  }

  .best-practices li {
    margin: 0.5rem 0;
    color: var(--text-secondary);
  }

  .next-steps {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .step-header {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .next-steps {
      flex-direction: column;
    }
  }
</style>
