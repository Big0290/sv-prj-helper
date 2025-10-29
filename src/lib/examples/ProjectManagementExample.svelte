<script lang="ts">
  import {
    Button,
    Card,
    Container,
    Grid,
    Stack,
    Flex,
    Heading,
    Text,
    Badge,
    Avatar,
    Icon,
    Divider,
    ButtonGroup,
    Modal,
    Input,
    Textarea,
    Select,
    Chip,
    Menu,
    MenuItem,
  } from '$lib/ui'

  // Task interface
  interface Task {
    id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'
    assignee?: TeamMember
    dueDate?: Date
    comments: Comment[]
  }

  interface TeamMember {
    id: string
    name: string
    avatar: string
    role: string
  }

  interface Comment {
    id: string
    author: string
    content: string
    createdAt: Date
    avatar: string
  }

  // Team members
  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Sarah Johnson', avatar: 'SJ', role: 'Product Manager' },
    { id: '2', name: 'Michael Chen', avatar: 'MC', role: 'Developer' },
    { id: '3', name: 'Emily Rodriguez', avatar: 'ER', role: 'Designer' },
    { id: '4', name: 'David Kim', avatar: 'DK', role: 'QA Engineer' },
  ]

  // Initial tasks
  let tasks = $state<Task[]>([
    {
      id: '1',
      title: 'Design new dashboard UI',
      description: 'Create mockups for the new dashboard interface with improved user experience',
      priority: 'high',
      status: 'in-progress',
      assignee: teamMembers[2],
      dueDate: new Date(Date.now() + 5 * 24 * 3600000),
      comments: [],
    },
    {
      id: '2',
      title: 'Implement authentication system',
      description: 'Set up JWT-based authentication with refresh tokens',
      priority: 'high',
      status: 'todo',
      assignee: teamMembers[1],
      dueDate: new Date(Date.now() + 7 * 24 * 3600000),
      comments: [],
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all REST endpoints with examples and usage instructions',
      priority: 'medium',
      status: 'backlog',
      comments: [],
    },
    {
      id: '4',
      title: 'Fix responsive layout bugs',
      description: 'Address mobile responsiveness issues in checkout flow',
      priority: 'medium',
      status: 'review',
      assignee: teamMembers[3],
      dueDate: new Date(Date.now() + 2 * 24 * 3600000),
      comments: [
        {
          id: '1',
          author: 'Sarah Johnson',
          content: 'Great work on the mobile fixes!',
          createdAt: new Date(Date.now() - 3 * 3600000),
          avatar: 'SJ',
        },
      ],
    },
    {
      id: '5',
      title: 'Add dark mode support',
      description: 'Implement theme switching and dark mode styles',
      priority: 'low',
      status: 'done',
      assignee: teamMembers[1],
      comments: [],
    },
    {
      id: '6',
      title: 'Optimize database queries',
      description: 'Review and optimize slow database queries in the user module',
      priority: 'medium',
      status: 'in-progress',
      assignee: teamMembers[1],
      comments: [],
    },
  ])

  const columns = [
    { id: 'backlog', title: 'Backlog', color: '#64748b' },
    { id: 'todo', title: 'To Do', color: '#3b82f6' },
    { id: 'in-progress', title: 'In Progress', color: '#f59e0b' },
    { id: 'review', title: 'Review', color: '#8b5cf6' },
    { id: 'done', title: 'Done', color: '#10b981' },
  ]

  let selectedTask = $state<Task | null>(null)
  let taskModalOpen = $state(false)
  let draggedTaskId = $state<string | null>(null)

  // New task form
  let newTask = $state({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'todo' as Task['status'],
    assigneeId: '',
    dueDate: '',
  })

  function getTasksByStatus(status: Task['status']) {
    return tasks.filter((task) => task.status === status)
  }

  function handleDragStart(e: DragEvent, taskId: string) {
    draggedTaskId = taskId
    e.dataTransfer!.effectAllowed = 'move'
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    e.dataTransfer!.dropEffect = 'move'
  }

  function handleDrop(e: DragEvent, targetStatus: Task['status']) {
    e.preventDefault()
    if (draggedTaskId) {
      const task = tasks.find((t) => t.id === draggedTaskId)
      if (task) {
        task.status = targetStatus
      }
      draggedTaskId = null
    }
  }

  function openTaskModal(task?: Task) {
    if (task) {
      selectedTask = task
    } else {
      selectedTask = null
      newTask = {
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        assigneeId: '',
        dueDate: '',
      }
    }
    taskModalOpen = true
  }

  function closeTaskModal() {
    taskModalOpen = false
    selectedTask = null
  }

  function createTask() {
    if (!newTask.title.trim()) return

    const assignee = newTask.assigneeId ? teamMembers.find((m) => m.id === newTask.assigneeId) : undefined

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: newTask.status,
      assignee,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
      comments: [],
    }

    tasks.push(task)
    closeTaskModal()
  }

  function updateTask() {
    if (!selectedTask || !selectedTask.title.trim()) return
    closeTaskModal()
  }

  function deleteTask(taskId: string) {
    tasks = tasks.filter((t) => t.id !== taskId)
    if (selectedTask?.id === taskId) {
      closeTaskModal()
    }
  }

  function getPriorityColor(priority: Task['priority']) {
    switch (priority) {
      case 'high':
        return 'error'
      case 'medium':
        return 'warning'
      case 'low':
        return 'success'
    }
  }

  function formatDate(date?: Date) {
    if (!date) return ''
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / 86400000)

    if (diffDays < 0) return 'Overdue'
    if (diffDays === 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    return `Due in ${diffDays} days`
  }

  function getTaskCount(status: Task['status']) {
    return tasks.filter((t) => t.status === status).length
  }

  // Icons
  const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
  const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`
  const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`
  const commentsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`
</script>

<div class="project-management">
  <!-- Header -->
  <header class="pm-header">
    <Container maxWidth="full">
      <Flex justify="space-between" align="center">
        <div>
          <Heading as="h1" size="3">Project Management</Heading>
          <Text size="sm" color="var(--text-secondary)">Kanban Board - Sprint 2024 Q1</Text>
        </div>
        <Button variant="primary" onclick={() => openTaskModal()}>
          <Icon html={plusIcon} /> Create Task
        </Button>
      </Flex>
    </Container>
  </header>

  <!-- Kanban Board -->
  <main class="kanban-board">
    <Container maxWidth="full">
      <div class="kanban-columns">
        {#each columns as column}
          <div
            class="kanban-column"
            ondragover={handleDragOver}
            ondrop={(e) => handleDrop(e, column.id as Task['status'])}
            role="region"
          >
            <div class="column-header">
              <Heading as="h3" size="6">{column.title}</Heading>
              <Badge variant="info" size="sm">{getTaskCount(column.id as Task['status'])}</Badge>
            </div>

            <div class="column-tasks">
              {#each getTasksByStatus(column.id as Task['status']) as task}
                <div
                  class="task-card"
                  draggable="true"
                  ondragstart={(e: DragEvent) => handleDragStart(e, task.id)}
                  onclick={() => openTaskModal(task)}
                  onkeydown={(e) => e.key === 'Enter' && openTaskModal(task)}
                  role="button"
                  tabindex="0"
                >
                  <Card>
                    <Stack gap="2">
                      <Flex justify="space-between" align="start">
                        <Badge variant={getPriorityColor(task.priority)} size="sm">
                          {task.priority}
                        </Badge>
                        <button type="button" onclick={(e) => e.stopPropagation()} aria-label="Task options">⋯</button>
                      </Flex>

                      <Heading as="h4" size="6">{task.title}</Heading>
                      <Text size="xs" color="var(--text-secondary)">{task.description}</Text>

                      {#if task.dueDate}
                        <Text
                          size="xs"
                          color={task.dueDate < new Date() ? 'var(--color-error)' : 'var(--color-warning)'}
                        >
                          {formatDate(task.dueDate)}
                        </Text>
                      {/if}

                      <Flex justify="space-between" align="center">
                        {#if task.assignee}
                          <Avatar initials={task.assignee.avatar} size="sm" />
                        {/if}
                        {#if task.comments.length > 0}
                          <Flex gap="1" align="center">
                            <Icon html={commentsIcon} />
                            <Text size="xs">{task.comments.length}</Text>
                          </Flex>
                        {/if}
                      </Flex>
                    </Stack>
                  </Card>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </Container>
  </main>

  <!-- Task Detail Modal -->
  <Modal bind:open={taskModalOpen} title={selectedTask ? 'Task Details' : 'Create New Task'} size="lg">
    <Stack gap="4">
      {#if selectedTask}
        <!-- View/Edit Mode -->
        <div>
          <Text weight="semibold" size="sm">Title</Text>
          <div style="margin-top: 0.5rem; width: 100%;">
            <Input bind:value={selectedTask.title} placeholder="Task title..." />
          </div>
        </div>

        <div>
          <Text weight="semibold" size="sm">Description</Text>
          <div style="margin-top: 0.5rem; width: 100%;">
            <Textarea bind:value={selectedTask.description} placeholder="Task description..." rows={4} />
          </div>
        </div>

        <Grid cols="2" gap="4">
          <div>
            <Text weight="semibold" size="sm">Priority</Text>
            <div style="margin-top: 0.5rem; width: 100%;">
              <Select
                value={selectedTask?.priority}
                options={[
                  { label: 'Low', value: 'low' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'High', value: 'high' },
                ]}
              />
            </div>
          </div>

          <div>
            <Text weight="semibold" size="sm">Status</Text>
            <div style="margin-top: 0.5rem; width: 100%;">
              <Select
                value={selectedTask?.status}
                options={columns.map((col) => ({ label: col.title, value: col.id }))}
              />
            </div>
          </div>
        </Grid>

        <Divider />
      {:else}
        <!-- Create Mode -->
        <div>
          <Text weight="semibold" size="sm">Title</Text>
          <div style="margin-top: 0.5rem; width: 100%;">
            <Input bind:value={newTask.title} placeholder="Task title..." />
          </div>
        </div>

        <div>
          <Text weight="semibold" size="sm">Description</Text>
          <div style="margin-top: 0.5rem; width: 100%;">
            <Textarea bind:value={newTask.description} placeholder="Task description..." rows={4} />
          </div>
        </div>

        <Grid cols="2" gap="4">
          <div>
            <Text weight="semibold" size="sm">Priority</Text>
            <div style="margin-top: 0.5rem; width: 100%;">
              <Select
                bind:value={newTask.priority}
                options={[
                  { label: 'Low', value: 'low' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'High', value: 'high' },
                ]}
              />
            </div>
          </div>

          <div>
            <Text weight="semibold" size="sm">Due Date</Text>
            <div style="margin-top: 0.5rem; width: 100%;">
              <input type="date" bind:value={newTask.dueDate} style="width: 100%;" />
            </div>
          </div>
        </Grid>

        <div>
          <Text weight="semibold" size="sm">Assign To</Text>
          <div style="margin-top: 0.5rem; width: 100%;">
            <Select
              bind:value={newTask.assigneeId}
              options={[
                { label: 'Unassigned', value: '' },
                ...teamMembers.map((member) => ({ label: member.name, value: member.id })),
              ]}
            />
          </div>
        </div>
      {/if}

      <Divider />

      <Flex justify="end" gap="2">
        <Button variant="ghost" onclick={closeTaskModal}>Cancel</Button>
        {#if selectedTask}
          <Button variant="primary" onclick={updateTask}>Save Changes</Button>
        {:else}
          <Button variant="primary" onclick={createTask} disabled={!newTask.title.trim()}>Create Task</Button>
        {/if}
      </Flex>
    </Stack>
  </Modal>

  <!-- Team Members Sidebar -->
  <aside class="team-sidebar">
    <Card variant="outlined">
      <Stack gap="3">
        <Heading as="h3" size="5">Team</Heading>
        <Divider />
        {#each teamMembers as member}
          <Flex gap="2" align="center">
            <Avatar initials={member.avatar} size="md" />
            <div>
              <Text weight="semibold" size="sm">{member.name}</Text>
              <Text size="xs" color="var(--text-secondary)">{member.role}</Text>
            </div>
          </Flex>
        {/each}
      </Stack>
    </Card>
  </aside>
</div>

<style>
  .project-management {
    min-height: 100vh;
    background: var(--bg-primary);
  }

  .pm-header {
    padding: 2rem 0;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border-bottom: 1px solid var(--glass-border);
    margin-bottom: 2rem;
  }

  .kanban-board {
    position: relative;
  }

  .kanban-columns {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
    padding-bottom: 4rem;
  }

  .kanban-column {
    min-height: 600px;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--glass-border);
  }

  .column-tasks {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 500px;
  }

  .task-card {
    cursor: move;
    transition: all 0.2s ease;
    padding: 1rem;
  }

  .task-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .task-card:active {
    cursor: grabbing;
  }

  .team-sidebar {
    position: fixed;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
  }

  @media (max-width: 1400px) {
    .team-sidebar {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    .kanban-columns {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .kanban-columns {
      grid-template-columns: 1fr;
    }

    .kanban-column {
      min-height: 300px;
      padding: 1rem;
      overflow-x: auto;
      overflow-y: visible;
    }

    .column-tasks {
      min-height: 200px;
    }
  }
</style>
