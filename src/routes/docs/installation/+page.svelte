<script lang="ts">
  import { Container, Heading, Text, Card, Stack, Code, Alert, Button, Divider, StaticCodeExample } from '$lib/ui'
</script>

<svelte:head>
  <title>Installation - SV Project Helper</title>
  <meta name="description" content="Learn how to install and set up SV Project Helper in your Svelte project." />
</svelte:head>

<Container maxWidth="4xl">
  <Stack gap="8">
    <!-- Header -->
    <div class="page-header">
      <Heading as="h1" size="1">Installation</Heading>
      <Text size="xl" color="var(--text-secondary)">Get started with SV Project Helper in your Svelte 5 project</Text>
    </div>

    <!-- Prerequisites -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Prerequisites</Heading>
        <Text>Before installing SV Project Helper, make sure you have:</Text>
        <ul class="requirements-list">
          <li><strong>Svelte 5</strong> - This library is built specifically for Svelte 5</li>
          <li><strong>TypeScript</strong> - Recommended for the best development experience</li>
          <li><strong>Node.js 18+</strong> - Required for the build tools</li>
        </ul>
      </Stack>
    </Card>

    <!-- Installation Methods -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Installation from GitHub Packages</Heading>

        <Alert variant="info">
          <Text>
            SV Project Helper is published to GitHub Packages. You'll need to authenticate with GitHub to install it.
          </Text>
        </Alert>

        <div>
          <Heading as="h3" size="4">1. Configure GitHub Authentication</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
            Create a <Code inline>.npmrc</Code> file in your project root:
          </Text>
          <StaticCodeExample
            code="@big0290:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE"
            language="text"
            showCopyButton={true}
          />
          <Text color="var(--text-secondary)" style="margin-top: 1rem;">
            Then create a GitHub Personal Access Token with <code>read:packages</code> permission and set it as an environment
            variable.
          </Text>
        </div>

        <Divider />

        <div>
          <Heading as="h3" size="4">2. Install the Package</Heading>

          <div>
            <Text weight="medium" style="margin-bottom: 0.5rem;">Using NPM:</Text>
            <Code language="bash" code="npm install @big0290/sv-prj-helper-ui@0.3.0" />
          </div>

          <div style="margin-top: 1.5rem;">
            <Text weight="medium" style="margin-bottom: 0.5rem;">Using Yarn:</Text>
            <Code language="bash" code="yarn add @big0290/sv-prj-helper-ui@0.3.0" />
          </div>

          <div style="margin-top: 1.5rem;">
            <Text weight="medium" style="margin-bottom: 0.5rem;">Using PNPM:</Text>
            <Code language="bash" code="pnpm add @big0290/sv-prj-helper-ui@0.3.0" />
          </div>
        </div>

        <Divider />

        <div>
          <Heading as="h3" size="4">Repository</Heading>
          <Text color="var(--text-secondary)" style="margin-bottom: 0.5rem;">
            Source code and issues: <code>git@github.com:Big0290/sv-prj-helper.git</code>
          </Text>
        </div>
      </Stack>
    </Card>

    <!-- Setup -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Setup</Heading>

        <div>
          <Heading as="h3" size="4">1. Import Styles</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
            Import the CSS theme in your app's root layout or main CSS file:
          </Text>
          <StaticCodeExample
            code={`<!-- src/app.html or src/routes/+layout.svelte -->
<script>
  import '@big0290/sv-prj-helper-ui/styles';
</script>`}
            language="svelte"
            showCopyButton={true}
          />
        </div>

        <div>
          <Heading as="h3" size="4">2. Add Theme Provider</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
            Wrap your app with the ThemeProvider component:
          </Text>
          <StaticCodeExample
            code={`<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { ThemeProvider } from '@big0290/sv-prj-helper-ui';
</script>

<ThemeProvider>
  <slot />
</ThemeProvider>`}
            language="svelte"
            showCopyButton={true}
          />
        </div>

        <div>
          <Heading as="h3" size="4">3. Start Using Components</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
            Import and use components in your Svelte files:
          </Text>
          <StaticCodeExample
            code={`<script lang="ts">
  import { Button, Card, Input, Stack } from '@big0290/sv-prj-helper-ui';
  
  let email = $state('');
</script>

<Card>
  <Stack gap="4">
    <h2>Welcome to SV Project Helper!</h2>
    <Input 
      bind:value={email}
      type="email"
      label="Email Address"
      placeholder="Enter your email"
    />
    <Button variant="primary">
      Get Started
    </Button>
  </Stack>
</Card>`}
            language="svelte"
            showCopyButton={true}
          />
        </div>
      </Stack>
    </Card>

    <!-- TypeScript Setup -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">TypeScript Configuration</Heading>
        <Text>
          SV Project Helper includes full TypeScript support. Make sure your <Code inline>tsconfig.json</Code> includes:
        </Text>
        <StaticCodeExample
          code={`{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "strict": true,
    "skipLibCheck": true
  }
}`}
          language="json"
          showCopyButton={true}
        />
      </Stack>
    </Card>

    <!-- Verification -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Verify Installation</Heading>
        <Text>Create a simple test component to verify everything is working:</Text>
        <StaticCodeExample
          code={`<!-- src/routes/test/+page.svelte -->
<script lang="ts">
  import { Button, Alert } from '@big0290/sv-prj-helper-ui';
  
  let showAlert = $state(false);
</script>

{#if showAlert}
  <Alert variant="success">
    🎉 SV Project Helper is working correctly!
  </Alert>
{/if}

<Button 
  variant="primary" 
  onclick={() => showAlert = !showAlert}
>
  Test Installation
</Button>`}
          language="svelte"
          showCopyButton={true}
        />
      </Stack>
    </Card>

    <!-- Troubleshooting -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Troubleshooting</Heading>

        <Alert variant="info">
          <Stack gap="2">
            <Text weight="medium">Common Issues</Text>
            <ul class="troubleshooting-list">
              <li><strong>CSS not loading:</strong> Make sure you've imported the theme CSS file</li>
              <li><strong>Components not styled:</strong> Ensure ThemeProvider wraps your app</li>
              <li>
                <strong>TypeScript errors:</strong> Check that you're using Svelte 5 and have proper TypeScript configuration
              </li>
              <li><strong>Build errors:</strong> Verify your bundler supports ES modules and Svelte 5</li>
            </ul>
          </Stack>
        </Alert>
      </Stack>
    </Card>

    <!-- Next Steps -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Next Steps</Heading>
        <Text>Now that you have SV Project Helper installed, explore these resources:</Text>

        <div class="next-steps">
          <Button variant="primary" href="/docs/quick-start">Quick Start Guide →</Button>
          <Button variant="secondary" href="/demos">Browse Components</Button>
          <Button variant="ghost" href="/docs/theming">Customize Theming</Button>
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

  .requirements-list,
  .troubleshooting-list {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .requirements-list li,
  .troubleshooting-list li {
    margin: 0.5rem 0;
    color: var(--text-secondary);
  }

  .next-steps {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .next-steps {
      flex-direction: column;
    }
  }
</style>
