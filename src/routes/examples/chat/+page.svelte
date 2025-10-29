<script lang="ts">
  import { Heading, Text, Container, Stack, Card, Flex, Button, StaticCodeExample, Badge, Grid } from '$lib/ui'
  import ChatExample from '$lib/examples/ChatExample.svelte'
  import '../../../lib/styles/theme.css'

  let activeTab = $state('preview')

  const componentsUsed = [
    { name: 'Chat', type: 'organism', description: 'Main chat container component' },
    { name: 'ChatBubble', type: 'organism', description: 'Individual message bubbles' },
    { name: 'ChatHeader', type: 'organism', description: 'Chat room header with title' },
    { name: 'ChatInput', type: 'organism', description: 'Message input field with actions' },
    { name: 'ChatRoomList', type: 'organism', description: 'List of chat rooms/conversations' },
    { name: 'ChatSearch', type: 'organism', description: 'Search conversations' },
    { name: 'MessageAttachment', type: 'organism', description: 'File and image attachments' },
    { name: 'MessageStatus', type: 'organism', description: 'Message delivery status indicators' },
    { name: 'Avatar', type: 'atom', description: 'User avatars with status' },
    { name: 'Badge', type: 'atom', description: 'Unread count badges' },
    { name: 'Stack', type: 'layout', description: 'Vertical layout with spacing' },
    { name: 'Flex', type: 'layout', description: 'Flexbox layout component' },
    { name: 'Heading', type: 'atom', description: 'Typography headings' },
    { name: 'Text', type: 'atom', description: 'Typography text' },
    { name: 'Divider', type: 'atom', description: 'Visual separators' },
    { name: 'Button', type: 'atom', description: 'Action buttons' },
  ]
</script>

<svelte:head>
  <title>Chat Application - SV Project Helper</title>
</svelte:head>

<Container maxWidth="full">
  <div class="chat-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a href="/">Home</a>
      <span>→</span>
      <a href="/examples">Examples</a>
      <span>→</span>
      <span>Chat Application</span>
    </nav>

    <!-- Header -->
    <header class="page-header">
      <Stack gap="3">
        <div>
          <Heading as="h1" size="1">Chat Application</Heading>
          <Text size="lg" color="var(--text-secondary)" style="margin-top: 0.5rem;">
            Real-time messaging app with rooms, file sharing, and message status indicators
          </Text>
        </div>
        <Flex gap="3" wrap>
          <Badge variant="warning" size="md">Intermediate</Badge>
          <Badge variant="info" size="md">Chat</Badge>
          <Badge variant="info" size="md">Real-time</Badge>
          <Badge variant="info" size="md">WebSocket</Badge>
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
        <ChatExample />
      </div>
    {:else if activeTab === 'code'}
      <div class="code-section">
        <Card>
          <Stack gap="3">
            <Heading as="h2" size="3">Implementation Highlights</Heading>
            <Text color="var(--text-secondary)">This chat application demonstrates:</Text>
            <ul style="padding-left: 1.5rem;">
              <li>
                <Text>Multi-room chat interface with sidebar navigation</Text>
              </li>
              <li>
                <Text>Real-time message display with avatar grouping</Text>
              </li>
              <li>
                <Text>Message status indicators (sent, delivered, read)</Text>
              </li>
              <li>
                <Text>File and image attachment support</Text>
              </li>
              <li>
                <Text>Online user status and presence indicators</Text>
              </li>
              <li>
                <Text>Search functionality for conversations</Text>
              </li>
              <li>
                <Text>Unread message count badges</Text>
              </li>
              <li>
                <Text>Typing indicator animation</Text>
              </li>
              <li>
                <Text>Enter key to send messages</Text>
              </li>
              <li>
                <Text>Responsive design with mobile support</Text>
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
              This chat template showcases 17 different components from the library
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
  .chat-page {
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
  }

  @media (max-width: 768px) {
    .chat-page {
      padding: 1rem 0 2rem;
    }

    .preview-section {
      height: auto;
      min-height: 500px;
    }
  }
</style>
