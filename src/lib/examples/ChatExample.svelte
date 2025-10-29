<script lang="ts">
  import {
    ChatBubble,
    ChatInput,
    ChatSearch,
    MessageAttachment,
    MessageStatus,
    Avatar,
    Badge,
    Icon,
    Flex,
    Stack,
    Heading,
    Text,
    Divider,
    Button,
    Tooltip,
  } from '$lib/ui'

  // Message interface
  interface Message {
    id: string
    sender: string
    senderId: string
    content: string
    timestamp: Date
    status: 'sent' | 'delivered' | 'read'
    isOwnMessage?: boolean
    avatar?: string
    attachments?: Array<{ id: string; name: string; type: string; url: string; size: number }>
  }

  // Chat rooms
  const rooms = [
    {
      id: 'general',
      name: 'General',
      lastMessage: "Hey everyone! How's the project going?",
      timestamp: new Date(Date.now() - 5 * 60000),
      unread: 3,
      online: 8,
    },
    {
      id: 'developers',
      name: 'Developers',
      lastMessage: 'The new API is ready for testing',
      timestamp: new Date(Date.now() - 15 * 60000),
      unread: 0,
      online: 5,
    },
    {
      id: 'design',
      name: 'Design Team',
      lastMessage: 'Check out the new mockups',
      timestamp: new Date(Date.now() - 30 * 60000),
      unread: 2,
      online: 4,
    },
    {
      id: 'support',
      name: 'Customer Support',
      lastMessage: 'Thanks for your help with the issue!',
      timestamp: new Date(Date.now() - 45 * 60000),
      unread: 0,
      online: 2,
    },
  ]

  // Mock messages
  let messages = $state<Message[]>([
    {
      id: '1',
      sender: 'Alex Johnson',
      senderId: 'alex',
      content: 'Hey team! I just wanted to share some updates on our project timeline.',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      status: 'read',
      avatar: 'AJ',
      isOwnMessage: false,
    },
    {
      id: '2',
      sender: 'Sarah Chen',
      senderId: 'sarah',
      content: 'Perfect timing! I have the design mockups ready. Should I share them now?',
      timestamp: new Date(Date.now() - 90 * 60000),
      status: 'read',
      avatar: 'SC',
      isOwnMessage: false,
    },
    {
      id: '3',
      sender: 'You',
      senderId: 'me',
      content: 'Yes please! Looking forward to seeing them.',
      timestamp: new Date(Date.now() - 85 * 60000),
      status: 'read',
      avatar: 'Y',
      isOwnMessage: true,
    },
    {
      id: '4',
      sender: 'Sarah Chen',
      senderId: 'sarah',
      content: 'Here are the updated designs. Let me know what you think!',
      timestamp: new Date(Date.now() - 80 * 60000),
      status: 'read',
      avatar: 'SC',
      isOwnMessage: false,
      attachments: [
        {
          id: 'att1',
          type: 'image/png',
          url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop',
          name: 'design-mockup-1.png',
          size: 245000,
        },
        {
          id: 'att2',
          type: 'image/png',
          url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
          name: 'design-mockup-2.png',
          size: 189000,
        },
      ],
    },
    {
      id: '5',
      sender: 'Mike Rodriguez',
      senderId: 'mike',
      content: 'These look amazing! I especially love the color palette.',
      timestamp: new Date(Date.now() - 70 * 60000),
      status: 'read',
      avatar: 'MR',
      isOwnMessage: false,
    },
    {
      id: '6',
      sender: 'You',
      senderId: 'me',
      content: 'Agreed! The new design system is really coming together. Great work Sarah!',
      timestamp: new Date(Date.now() - 65 * 60000),
      status: 'delivered',
      avatar: 'Y',
      isOwnMessage: true,
    },
    {
      id: '7',
      sender: 'Alex Johnson',
      senderId: 'alex',
      content: 'Has anyone had a chance to review the API documentation yet?',
      timestamp: new Date(Date.now() - 10 * 60000),
      status: 'read',
      avatar: 'AJ',
      isOwnMessage: false,
    },
    {
      id: '8',
      sender: 'You',
      senderId: 'me',
      content: 'I was just about to start on that. Should I prioritize it?',
      timestamp: new Date(Date.now() - 5 * 60000),
      status: 'read',
      avatar: 'Y',
      isOwnMessage: true,
    },
  ])

  let currentRoom = $state('general')
  let searchQuery = $state('')

  // Online users
  const onlineUsers = [
    { id: 'alex', name: 'Alex Johnson', avatar: 'AJ', status: 'online' },
    { id: 'sarah', name: 'Sarah Chen', avatar: 'SC', status: 'online' },
    { id: 'mike', name: 'Mike Rodriguez', avatar: 'MR', status: 'online' },
    { id: 'emma', name: 'Emma Wilson', avatar: 'EW', status: 'away' },
    { id: 'david', name: 'David Kim', avatar: 'DK', status: 'online' },
  ]

  function handleSend(message: string) {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      senderId: 'me',
      content: message,
      timestamp: new Date(),
      status: 'sent',
      avatar: 'Y',
      isOwnMessage: true,
    }

    messages = [...messages, newMessage]

    // Simulate message being sent
    setTimeout(() => {
      const updatedMessages = messages.map((msg) =>
        msg.id === newMessage.id ? { ...msg, status: 'delivered' as const } : msg
      )
      messages = updatedMessages
    }, 1000)

    setTimeout(() => {
      const finalUpdated = messages.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'read' as const } : msg))
      messages = finalUpdated
    }, 3000)
  }

  function formatTimestamp(date: Date) {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  // Icon SVGs
  const attachIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`
</script>

<div class="chat-container">
  <!-- Sidebar with Room List -->
  <aside class="chat-sidebar">
    <Stack gap="3">
      <!-- Header -->
      <div class="sidebar-header">
        <Heading as="h2" size="4">Chat</Heading>
        <Badge variant="info" size="sm">{onlineUsers.filter((u) => u.status === 'online').length} Online</Badge>
      </div>

      <Divider />

      <!-- Search -->
      <ChatSearch bind:query={searchQuery} placeholder="Search conversations..." />

      <!-- Room List -->
      <div class="room-list">
        {#each rooms.filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()) || room.lastMessage
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) as room}
          <button
            type="button"
            class="room-item"
            class:active={currentRoom === room.id}
            onclick={() => (currentRoom = room.id)}
          >
            <Flex gap="3" align="center">
              <Avatar initials={room.name[0]} size="md" status="online" />
              <div class="room-content">
                <Flex justify="space-between" align="center">
                  <Text weight="semibold" size="sm">{room.name}</Text>
                  <Text size="xs" color="var(--text-secondary)">{formatTimestamp(room.timestamp)}</Text>
                </Flex>
                <Flex justify="space-between" align="center" style="margin-top: 0.25rem;">
                  <Text size="xs" color="var(--text-secondary)" class="last-message">
                    {room.lastMessage}
                  </Text>
                  {#if room.unread > 0}
                    <Badge variant="info" size="sm">{room.unread}</Badge>
                  {/if}
                </Flex>
              </div>
            </Flex>
          </button>
        {/each}
      </div>

      <!-- Online Users -->
      <Divider />

      <div class="online-section">
        <Text weight="semibold" size="sm">Online Now</Text>
        <div class="online-users">
          {#each onlineUsers.filter((u) => u.status === 'online') as user}
            <Tooltip content={user.name}>
              <div class="avatar-wrapper">
                <Avatar initials={user.avatar} size="sm" status="online" />
              </div>
            </Tooltip>
          {/each}
          {#if onlineUsers.filter((u) => u.status === 'online').length > 5}
            <Badge variant="default" size="sm">+{onlineUsers.filter((u) => u.status === 'online').length - 5}</Badge>
          {/if}
        </div>
      </div>
    </Stack>
  </aside>

  <!-- Main Chat Area -->
  <main class="chat-main">
    {#if currentRoom}
      {@const currentRoomData = rooms.find((r) => r.id === currentRoom)}

      <!-- Chat Header -->
      <header class="custom-chat-header">
        <Flex gap="3" align="center">
          <Avatar initials={currentRoomData?.name[0] || 'G'} size="md" status="online" />
          <div>
            <Heading as="h3" size="5">{currentRoomData?.name}</Heading>
            <Text size="xs" color="var(--text-secondary)">{currentRoomData?.online} members online</Text>
          </div>
        </Flex>
      </header>

      <Divider />

      <!-- Messages -->
      <div class="messages-container" role="log">
        {#each messages as message, index}
          {@const prevMessage = index > 0 ? messages[index - 1] : null}
          {@const showAvatar =
            !prevMessage ||
            prevMessage.senderId !== message.senderId ||
            message.timestamp.getTime() - prevMessage.timestamp.getTime() > 300000}

          <div class="message-wrapper" class:own={message.isOwnMessage}>
            <ChatBubble
              message={message.content}
              sender={message.isOwnMessage ? 'user' : 'other'}
              senderName={message.sender}
              timestamp={message.timestamp}
              avatar={message.avatar}
              showAvatar={showAvatar && !message.isOwnMessage}
            />

            {#if message.attachments && message.attachments.length > 0}
              <div class="attachments">
                {#each message.attachments as attachment}
                  <MessageAttachment {attachment} />
                {/each}
              </div>
            {/if}

            {#if message.isOwnMessage}
              <div class="message-status-wrapper">
                <MessageStatus status={message.status} />
              </div>
            {/if}
          </div>
        {/each}

        <!-- Typing Indicator -->
        <div class="typing-indicator">
          <Avatar initials="SC" size="sm" />
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <Divider />

      <!-- Message Input -->
      <div class="chat-input-wrapper">
        <ChatInput onSend={handleSend} placeholder="Type a message..." />
      </div>
    {/if}
  </main>
</div>

<style>
  .chat-container {
    display: grid;
    grid-template-columns: 320px 1fr;
    height: 100vh;
    background: var(--bg-primary);
  }

  .chat-sidebar {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border-right: 1px solid var(--glass-border);
    padding: 1.5rem;
    overflow-y: auto;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .room-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .room-item {
    background: transparent;
    border: none;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .room-item:hover {
    background: var(--glass-bg-hover);
  }

  .room-item.active {
    background: var(--color-primary);
    color: white;
  }

  .room-item.active :global(.text) {
    color: white;
  }

  .room-content {
    flex: 1;
    min-width: 0;
  }

  .online-section {
    margin-top: 1rem;
  }

  .online-users {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-top: 0.75rem;
    flex-wrap: wrap;
  }

  .avatar-wrapper {
    display: inline-block;
  }

  .chat-main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--bg-secondary);
  }

  .custom-chat-header {
    padding: 1rem 1.5rem;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border-bottom: 1px solid var(--glass-border);
  }

  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .message-wrapper.own {
    align-items: flex-end;
  }

  .message-status-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-right: 0.5rem;
    margin-top: -0.5rem;
  }

  .attachments {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
    max-width: 500px;
  }

  .message-wrapper.own .attachments {
    margin-left: auto;
  }

  .chat-input-wrapper {
    padding: 1rem 1.5rem;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--glass-bg);
    border-radius: var(--radius-lg);
    width: fit-content;
  }

  .typing-dots {
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem 0;
  }

  .typing-dots span {
    width: 6px;
    height: 6px;
    background: var(--text-secondary);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
  }

  .typing-dots span:nth-child(1) {
    animation-delay: 0s;
  }

  .typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.7;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }

  /* Scrollbar styling */
  .chat-sidebar::-webkit-scrollbar,
  .messages-container::-webkit-scrollbar {
    width: 6px;
  }

  .chat-sidebar::-webkit-scrollbar-track,
  .messages-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-sidebar::-webkit-scrollbar-thumb,
  .messages-container::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
  }

  .chat-sidebar::-webkit-scrollbar-thumb:hover,
  .messages-container::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
  }

  @media (max-width: 768px) {
    .chat-container {
      grid-template-columns: 1fr;
    }

    .chat-sidebar {
      display: none;
    }

    .messages-container {
      padding: 1rem;
    }

    .attachments {
      grid-template-columns: 1fr;
    }
  }
</style>
