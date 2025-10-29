<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { Container, Heading, Text, Stack, Card, Badge, Button, Code, Alert, Flex, Box, Chip } from '$lib/ui'
  import { StaticCodeExample } from '$lib/ui'
  import { ComponentShowcase } from '$lib/components/docs'

  // Component relationship mapping
  const componentRelationships: Record<string, string[]> = {
    Button: ['ButtonGroup', 'Link', 'Badge', 'Card'],
    Card: ['Stack', 'Heading', 'Text', 'Badge', 'Avatar'],
    Input: ['Label', 'Button', 'Form', 'Card'],
    Modal: ['Button', 'Alert', 'Stack'],
    Toast: ['Button', 'Alert', 'Form'],
    Breadcrumb: ['Navigation', 'Link', 'Container'],
    Pagination: ['DataTable', 'Container'],
    Checkbox: ['Label', 'Form', 'Input'],
    Switch: ['Label', 'Form'],
    Rating: ['Text', 'Card'],
    Progress: ['Text', 'Card'],
    Alert: ['Button', 'Modal', 'Card'],
    Chip: ['Badge', 'Button', 'Card'],
  }

  let componentName = $derived($page.params.component)
  let documentation = $state<any>(null)
  let loading = $state(true)
  let error = $state<string | null>(null)

  // Extract variants from code for showcase
  function extractVariantsFromCode(code: string): any[] {
    try {
      const variants: any[] = []

      // Extract component usage from code - support self-closing and regular tags
      const regex = /<(\w+)([^/>]*)(?:\s*\/>|>([^<]*)<\/\1>)/g
      let match

      while ((match = regex.exec(code)) !== null) {
        const [, , attributes, content = ''] = match

        // Parse attributes - handle both key="value" and {key} patterns
        const props: Record<string, any> = {}
        const attrRegex = /(\w+)=(?:"([^"]+)"|{([^}]+)})/g
        let attrMatch

        while ((attrMatch = attrRegex.exec(attributes)) !== null) {
          const [, key, stringValue, expValue] = attrMatch
          const value = stringValue || expValue

          // Convert boolean strings and handle expressions
          if (value === 'true' || value === 'true') props[key] = true
          else if (value === 'false' || value === 'false') props[key] = false
          else props[key] = value
        }

        // Extract slot content if exists
        let slotContent = content.trim()

        // Extract label/text from content
        if (slotContent && slotContent.length > 0) {
          slotContent = slotContent
        }

        // Generate variant name
        let name = 'Default'
        if (props.variant) {
          name = props.variant
        } else if (props.size) {
          name = props.size
        } else if (props.disabled) {
          name = 'Disabled'
        } else if (props.loading) {
          name = 'Loading'
        }

        variants.push({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          props,
          content: slotContent || '',
        })
      }

      return variants
    } catch (err) {
      console.error('Error extracting variants:', err)
      return []
    }
  }

  // Fetch component documentation from API
  async function loadComponentDocs(name: string) {
    try {
      loading = true
      error = null

      const response = await fetch(`/api/docs/components/${name}`)

      if (!response.ok) {
        throw new Error(`Failed to load component: ${response.statusText}`)
      }

      documentation = await response.json()
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error loading component:', err)
    } finally {
      loading = false
    }
  }

  // Load documentation when component name changes
  $effect(() => {
    if (componentName) {
      loadComponentDocs(componentName)
    }
  })

  // Get related components
  const relatedComponents = $derived(() => {
    if (!componentName || !componentRelationships[componentName]) return []
    return componentRelationships[componentName]
  })
</script>

<svelte:head>
  <title>{componentName ? `${componentName} Component` : 'Component'} - SV Project Helper</title>
</svelte:head>

<Container maxWidth="xl">
  <div class="component-docs-page">
    {#if loading}
      <Card>
        <Stack gap="4" align="center">
          <Text>Loading component documentation...</Text>
        </Stack>
      </Card>
    {:else if error}
      <div class="error-state">
        <Card>
          <Stack gap="4" align="center">
            <Text size="lg" color="var(--color-error)">Component Not Found</Text>
            <Text color="var(--text-secondary)">{error}</Text>
            <Button variant="primary" href="/docs/components">← Back to Components</Button>
          </Stack>
        </Card>
      </div>
    {:else if documentation}
      <!-- Component Header -->
      <header class="component-header">
        <Stack gap="4">
          <div class="breadcrumb">
            <a href="/docs">Documentation</a>
            <span>→</span>
            <a href="/docs/components">Components</a>
            <span>→</span>
            <span>{documentation.name}</span>
          </div>

          <div class="header-content">
            <div class="header-text">
              <Heading as="h1" size="1" class="component-title">{documentation.name}</Heading>
              <Text size="lg" color="var(--text-secondary)" class="component-description">
                {documentation.description}
              </Text>
            </div>

            <div class="header-badges">
              <Badge variant="info">{documentation.category}</Badge>
              <Badge variant="default">v{documentation.version}</Badge>
            </div>
          </div>

          <!-- Quick Start Preview -->
          {#if documentation.examples && documentation.examples.length > 0}
            <Card id="quick-start" class="quick-start-preview">
              <Stack gap="3">
                <Heading as="h3" size="4" class="section-title">Quick Start</Heading>
                <Text size="sm" color="var(--text-secondary)">
                  Get started with this component in seconds. Copy the code below and start building.
                </Text>

                {#if documentation.examples[0]}
                  {@const firstExample = documentation.examples[0]}
                  <StaticCodeExample
                    title="Basic Usage"
                    description={firstExample.description}
                    code={firstExample.code}
                    language={firstExample.language || 'svelte'}
                    showCopyButton={true}
                  />
                {/if}
              </Stack>
            </Card>
          {/if}
        </Stack>
      </header>

      <div class="docs-layout">
        <!-- Main Content -->
        <main class="docs-main">
          <!-- Installation -->
          <section id="installation" class="installation-section">
            <Card class="info-card">
              <Stack gap="4">
                <Heading as="h2" size="3" class="section-title">Installation & Usage</Heading>
                <Text color="var(--text-secondary)">
                  Follow these steps to install and use the {documentation.name} component in your project.
                </Text>

                <div class="install-step">
                  <Heading as="h4" size="5" style="margin-bottom: 0.5rem;">1. Install the Package</Heading>
                  <Text size="sm" color="var(--text-secondary)" style="margin-bottom: 0.75rem;">
                    Add the component library to your project dependencies.
                  </Text>
                  <StaticCodeExample
                    code="npm install @big0290/sv-prj-helper-ui@0.3.0"
                    language="bash"
                    showCopyButton={true}
                  />
                </div>

                <div class="install-step">
                  <Heading as="h4" size="5" style="margin-bottom: 0.5rem;">2. Import the Component</Heading>
                  <Text size="sm" color="var(--text-secondary)" style="margin-bottom: 0.75rem;">
                    Import the {documentation.name} component in your Svelte file.
                  </Text>
                  <StaticCodeExample
                    code={`import { ${documentation.name} } from '@big0290/sv-prj-helper-ui';`}
                    language="javascript"
                    showCopyButton={true}
                  />
                </div>
              </Stack>
            </Card>
          </section>

          <!-- When to Use -->
          <section id="when-to-use" class="when-to-use-section">
            <Card class="info-card">
              <Stack gap="4">
                <Heading as="h2" size="3" class="section-title">When to Use</Heading>
                <Text color="var(--text-secondary)">
                  Use the {documentation.name} component when:
                </Text>
                <ul class="use-cases">
                  <li>You need to {documentation.description.toLowerCase()}</li>
                  <li>Building {documentation.category}-focused interfaces</li>
                  <li>Creating consistent, accessible {documentation.name.toLowerCase()} patterns</li>
                  <li>Following design system guidelines for {documentation.category.toLowerCase()} components</li>
                </ul>
              </Stack>
            </Card>
          </section>

          <!-- Examples -->
          {#if documentation.examples && documentation.examples.length > 0}
            <section id="examples" class="examples-section">
              <div>
                <Heading as="h2" size="3">Examples</Heading>
                <Text size="sm" color="var(--text-secondary)">
                  Showing {documentation.examples.length} example{documentation.examples.length > 1 ? 's' : ''}
                </Text>
              </div>

              {#each documentation.examples as example, index}
                <div class="example-item">
                  {#if index > 0}
                    <hr style="margin: 2rem 0; border: none; border-top: 1px solid var(--border-color);" />
                  {/if}

                  <!-- Show visual component examples for variant, size, type, and state showcases -->
                  {#if example.title.toLowerCase().includes('variant') || example.title
                      .toLowerCase()
                      .includes('size') || example.title.toLowerCase().includes('type') || example.title
                      .toLowerCase()
                      .includes('state')}
                    {@const variants = extractVariantsFromCode(example.code)}
                    {#if variants && variants.length > 0}
                      <ComponentShowcase componentName={documentation.name} {variants} />
                    {/if}
                  {/if}

                  <StaticCodeExample
                    title={example.title}
                    description={example.description}
                    code={example.code}
                    language={example.language || 'svelte'}
                    showCopyButton={true}
                  />
                </div>
              {/each}
            </section>
          {/if}

          <!-- API Reference -->
          <section id="api" class="api-section">
            <Card>
              <Stack gap="6">
                <Heading as="h2" size="3">API Reference</Heading>

                <!-- Props -->
                <div>
                  <Heading as="h3" size="4">Props</Heading>
                  {#if documentation.props.length > 0}
                    <div class="api-table">
                      <div class="api-table-header">
                        <div>Name</div>
                        <div>Type</div>
                        <div>Default</div>
                        <div>Description</div>
                      </div>
                      {#each documentation.props as prop}
                        <div class="api-table-row">
                          <div class="prop-name">
                            <code>{prop.name}</code>
                            {#if prop.required}<span class="required">*</span>{/if}
                          </div>
                          <div class="prop-type"><code>{prop.type}</code></div>
                          <div class="prop-default"><code>{prop.defaultValue}</code></div>
                          <div class="prop-description">{prop.description}</div>
                        </div>
                      {/each}
                    </div>
                  {:else}
                    <Text color="var(--text-secondary)">This component does not accept any props.</Text>
                  {/if}
                </div>

                <!-- Events -->
                <div>
                  <Heading as="h3" size="4">Events</Heading>
                  {#if documentation.events.length > 0}
                    <div class="api-table">
                      <div class="api-table-header">
                        <div>Name</div>
                        <div>Type</div>
                        <div>Description</div>
                      </div>
                      {#each documentation.events as event}
                        <div class="api-table-row">
                          <div class="prop-name"><code>{event.name}</code></div>
                          <div class="prop-type"><code>{event.type}</code></div>
                          <div class="prop-description">{event.description}</div>
                        </div>
                      {/each}
                    </div>
                  {:else}
                    <Text color="var(--text-secondary)">This component does not emit any custom events.</Text>
                  {/if}
                </div>

                <!-- Slots -->
                <div>
                  <Heading as="h3" size="4">Slots</Heading>
                  {#if documentation.slots.length > 0}
                    <div class="api-table">
                      <div class="api-table-header">
                        <div>Name</div>
                        <div>Description</div>
                      </div>
                      {#each documentation.slots as slot}
                        <div class="api-table-row">
                          <div class="prop-name"><code>{slot.name}</code></div>
                          <div class="prop-description">{slot.description}</div>
                        </div>
                      {/each}
                    </div>
                  {:else}
                    <Text color="var(--text-secondary)">This component does not provide any slots.</Text>
                  {/if}
                </div>
              </Stack>
            </Card>
          </section>

          <!-- Accessibility -->
          <section id="accessibility" class="accessibility-section">
            <Card>
              <Stack gap="4">
                <Heading as="h2" size="3">Accessibility</Heading>

                {#if documentation.accessibility.keyboardNavigation?.length}
                  <div>
                    <Heading as="h4" size="5">Keyboard Navigation</Heading>
                    <ul class="accessibility-list">
                      {#each documentation.accessibility.keyboardNavigation as item}
                        <li>{item}</li>
                      {/each}
                    </ul>
                  </div>
                {/if}

                {#if documentation.accessibility.ariaAttributes?.length}
                  <div>
                    <Heading as="h4" size="5">ARIA Attributes</Heading>
                    <ul class="accessibility-list">
                      {#each documentation.accessibility.ariaAttributes as attr}
                        <li><code>{attr}</code></li>
                      {/each}
                    </ul>
                  </div>
                {/if}

                {#if documentation.accessibility.focusManagement}
                  <div>
                    <Heading as="h4" size="5">Focus Management</Heading>
                    <Text>{documentation.accessibility.focusManagement}</Text>
                  </div>
                {/if}

                {#if documentation.accessibility.guidelines?.length}
                  <div>
                    <Heading as="h4" size="5">Guidelines</Heading>
                    <ul class="accessibility-list">
                      {#each documentation.accessibility.guidelines as guideline}
                        <li>{guideline}</li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </Stack>
            </Card>
          </section>

          <!-- Next Steps -->
          {#if relatedComponents().length > 0}
            <section class="next-steps-section">
              <Card class="next-steps-card">
                <Stack gap="4">
                  <Heading as="h2" size="3" class="section-title">Next Steps</Heading>
                  <Text color="var(--text-secondary)">
                    Explore related components to build complete interfaces with {documentation.name}.
                  </Text>
                  <div class="next-steps-grid">
                    {#each relatedComponents().slice(0, 4) as related}
                      <a href="/docs/components/{related.toLowerCase()}" class="next-step-item">
                        <Stack gap="2">
                          <Heading as="h4" size="6">{related}</Heading>
                          <Text size="sm" color="var(--text-secondary)">
                            Works great with {documentation.name}
                          </Text>
                          <Text size="xs" color="var(--color-primary)">View Component →</Text>
                        </Stack>
                      </a>
                    {/each}
                  </div>
                </Stack>
              </Card>
            </section>
          {/if}
        </main>

        <!-- Sidebar -->
        <aside class="docs-sidebar">
          <Card class="sidebar-nav">
            <Stack gap="4">
              <Heading as="h3" size="5">On This Page</Heading>
              <nav class="page-nav">
                <a href="#quick-start">Quick Start</a>
                <a href="#when-to-use">When to Use</a>
                <a href="#installation">Installation</a>
                {#if documentation.examples && documentation.examples.length > 0}
                  <a href="#examples">Examples</a>
                {/if}
                <a href="#api">API Reference</a>
                <a href="#accessibility">Accessibility</a>
              </nav>
            </Stack>
          </Card>

          <!-- Related Components -->
          {#if relatedComponents().length > 0}
            <Card class="related-components">
              <Stack gap="4">
                <div>
                  <Heading as="h4" size="5">Related Components</Heading>
                  <Text size="xs" color="var(--text-secondary)">
                    Components that work well with {documentation.name}
                  </Text>
                </div>
                <div class="related-list">
                  {#each relatedComponents() as related}
                    <a href="/docs/components/{related.toLowerCase()}" class="related-link">
                      <Flex justify="space-between" align="center">
                        <Text size="sm" weight="medium">{related}</Text>
                        <Text size="xs" color="var(--text-secondary)">→</Text>
                      </Flex>
                    </a>
                  {/each}
                </div>
              </Stack>
            </Card>
          {/if}

          <!-- Common Patterns -->
          <Card class="common-patterns">
            <Stack gap="4">
              <Heading as="h4" size="5">Common Patterns</Heading>
              <Text size="sm" color="var(--text-secondary)">Frequently used together with:</Text>
              <div class="patterns-list">
                {#each relatedComponents().slice(0, 3) as related}
                  <Chip size="sm">{related}</Chip>
                {/each}
              </div>
            </Stack>
          </Card>
        </aside>
      </div>
    {/if}
  </div>
</Container>

<style>
  .component-docs-page {
    padding: 2rem 0 4rem;
  }

  .error-state {
    margin: 3rem 0;
    text-align: center;
  }

  .component-header {
    margin-bottom: 3rem;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .header-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    flex-shrink: 0;
  }

  .docs-layout {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 3rem;
    align-items: start;
  }

  .docs-main {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .docs-sidebar {
    position: sticky;
    top: 100px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .page-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .page-nav a {
    color: var(--text-secondary);
    text-decoration: none;
    padding: 0.5rem 0;
    border-left: 2px solid transparent;
    padding-left: 1rem;
    transition: all 0.2s ease;
    font-size: 0.875rem;
  }

  .page-nav a:hover {
    color: var(--text-primary);
    border-left-color: var(--color-primary-light);
  }

  .related-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .related-list a {
    font-size: 0.875rem;
    color: var(--color-primary);
    text-decoration: none;
  }

  .related-list a:hover {
    text-decoration: underline;
  }

  .example-item {
    scroll-margin-top: 100px;
    margin-bottom: 3rem;
  }

  .examples-section {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .accessibility-list {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .accessibility-list li {
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
  }

  .accessibility-list code {
    background: var(--bg-secondary);
    padding: 0.125rem 0.25rem;
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
  }

  /* API Table Styles */
  .api-table {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin: 1rem 0;
  }

  .api-table-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    background: var(--bg-secondary);
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--text-primary);
  }

  .api-table-header > div {
    padding: 0.75rem 1rem;
    border-right: 1px solid var(--border-color);
  }

  .api-table-header > div:last-child {
    border-right: none;
  }

  .api-table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    border-top: 1px solid var(--border-color);
  }

  .api-table-row > div {
    padding: 0.75rem 1rem;
    border-right: 1px solid var(--border-color);
    font-size: 0.875rem;
  }

  .api-table-row > div:last-child {
    border-right: none;
  }

  .prop-name code {
    color: var(--color-primary);
    font-weight: 500;
  }

  .prop-type code {
    color: var(--color-secondary);
    font-size: 0.8rem;
  }

  .prop-default code {
    color: var(--text-secondary);
    font-size: 0.8rem;
  }

  .required {
    color: var(--color-error);
    font-weight: bold;
    margin-left: 0.25rem;
  }

  .prop-description {
    color: var(--text-secondary);
  }

  /* Events table has different columns */
  .api-table-row:has(.prop-name + .prop-type + .prop-description) {
    grid-template-columns: 1fr 1fr 2fr;
  }

  .api-table-header:has(div:nth-child(3):last-child) {
    grid-template-columns: 1fr 1fr 2fr;
  }

  /* Slots table has different columns */
  .api-table-row:has(.prop-name + .prop-description:last-child) {
    grid-template-columns: 1fr 2fr;
  }

  .api-table-header:has(div:nth-child(2):last-child) {
    grid-template-columns: 1fr 2fr;
  }

  /* Add scroll margin for anchor links */
  .installation-section,
  .examples-section,
  .api-section,
  .accessibility-section {
    scroll-margin-top: 100px;
  }

  @media (max-width: 1024px) {
    .docs-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .docs-sidebar {
      position: static;
      order: -1;
    }
  }

  @media (max-width: 768px) {
    .component-docs-page {
      padding: 1rem 0 2rem;
    }

    .docs-main {
      gap: 2rem;
    }

    .header-content {
      flex-direction: column;
      gap: 1rem;
    }

    .header-badges {
      align-self: flex-start;
    }
  }

  /* Enhanced Readability Styles */
  .component-title {
    margin-bottom: 1rem;
  }

  .component-description {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .section-title {
    margin-bottom: 1rem;
  }

  .quick-start-preview {
    margin-top: 2rem;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05));
    border: 1px solid rgba(168, 85, 247, 0.2);
  }

  .when-to-use-section {
    margin: 2rem 0;
  }

  .use-cases {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  .use-cases li {
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    background: var(--bg-secondary);
    border-left: 3px solid var(--color-primary);
    border-radius: var(--radius-md);
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .related-link {
    display: block;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .related-link:hover {
    background: var(--bg-tertiary);
    transform: translateX(4px);
  }

  .patterns-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .info-card {
    border: 1px solid var(--color-primary-light);
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.03), rgba(59, 130, 246, 0.03));
  }

  .install-step {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
  }

  .install-step + .install-step {
    margin-top: 1.5rem;
  }

  .next-steps-section {
    margin: 3rem 0;
  }

  .next-steps-card {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05));
    border: 1px solid var(--border-color);
  }

  .next-steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .next-step-item {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .next-step-item:hover {
    background: var(--bg-tertiary);
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    .next-steps-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
