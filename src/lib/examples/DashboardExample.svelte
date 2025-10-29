<script lang="ts">
  import {
    Sidebar,
    Navbar,
    StatsCard,
    DataTable,
    Card,
    Grid,
    Stack,
    Flex,
    Heading,
    Text,
    Badge,
    Avatar,
    Button,
    Icon,
    Box,
  } from '$lib/ui'
  import { onMount } from 'svelte'
  import { Chart, registerables } from 'chart.js'

  // Mobile sidebar state
  let isMobileSidebarOpen = $state(false)

  // Sidebar navigation items
  interface NavItem {
    label: string
    icon: string
    active?: boolean
  }

  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'home', active: true },
    { label: 'Users', icon: 'users' },
    { label: 'Orders', icon: 'shopping-cart' },
    { label: 'Analytics', icon: 'bar-chart' },
    { label: 'Settings', icon: 'settings' },
  ]

  // Mock user data
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status' },
  ]

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active' },
  ]

  // Selected rows state
  let selectedRows = $state<(string | number)[]>([])

  function handleRowSelect(selectedIds: (string | number)[]) {
    selectedRows = selectedIds
  }

  function handleSort(key: string, direction: 'asc' | 'desc') {
    console.log('Sorting by:', key, direction)
  }

  // Chart refs
  let revenueChartCanvas: HTMLCanvasElement
  let ordersChartCanvas: HTMLCanvasElement
  let usersChartCanvas: HTMLCanvasElement

  onMount(() => {
    // Register Chart.js components
    Chart.register(...registerables)

    // Initialize charts
    if (revenueChartCanvas) {
      new Chart(revenueChartCanvas, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Revenue',
              data: [45000, 52000, 48000, 61000, 55000, 67000],
              borderColor: 'rgb(168, 85, 247)',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: function (value) {
                  return '$' + value.toLocaleString()
                },
              },
            },
          },
        },
      })
    }

    if (ordersChartCanvas) {
      new Chart(ordersChartCanvas, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Orders',
              data: [120, 150, 140, 180, 160, 200],
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }

    if (usersChartCanvas) {
      new Chart(usersChartCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Active', 'Inactive', 'Pending'],
          datasets: [
            {
              data: [245, 82, 31],
              backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)', 'rgba(245, 158, 11, 0.8)'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
          },
        },
      })
    }
  })

  // Icon HTML strings
  const iconHTML: Record<string, string> = {
    home: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    users:
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    'shopping-cart':
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
    'bar-chart':
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
    settings:
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6"></path><path d="m21 12-1.5-1.5m0 3L21 12m-9 0l-1.5 1.5m0-3L12 12"></path></svg>',
    dollar:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    active:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    notification:
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',
    help: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
  }
</script>

<div class="dashboard-container">
  <!-- Mobile Sidebar Toggle -->
  <div class="sidebar-toggle-mobile">
    <Button variant="ghost" onclick={() => (isMobileSidebarOpen = !isMobileSidebarOpen)}>
      <Icon html={iconHTML.home} />
    </Button>
  </div>

  <!-- Sidebar -->
  <div class="sidebar-wrapper">
    <Sidebar bind:isOpen={isMobileSidebarOpen} position="left" width="280px">
      <Stack gap="6">
        <!-- Logo -->
        <Flex align="center" gap="3" class="logo-section">
          <Box class="logo-box">SV</Box>
          <Stack gap="0">
            <Heading as="h2" size="6" class="logo-title">Dashboard</Heading>
            <Text size="xs" color="var(--text-secondary)">Admin Panel</Text>
          </Stack>
        </Flex>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          {#each navItems as item}
            <button type="button" class="nav-item" class:active={item.active}>
              <Icon html={iconHTML[item.icon]} />
              <span>{item.label}</span>
            </button>
          {/each}
        </nav>

        <!-- User Section -->
        <div class="sidebar-footer">
          <Card>
            <Flex align="center" gap="3">
              <Avatar initials="JD" size="md" status="online" />
              <Stack gap="0">
                <Text weight="semibold" size="sm">John Doe</Text>
                <Text size="xs" color="var(--text-secondary)">Administrator</Text>
              </Stack>
            </Flex>
          </Card>
        </div>
      </Stack>
    </Sidebar>
  </div>

  <!-- Main Content -->
  <main class="main-content">
    <!-- Top Navbar -->
    <Navbar>
      <Flex justify="space-between" align="center" class="navbar-content">
        <Heading as="h1" size="4">Welcome back, John!</Heading>
        <Flex gap="3" align="center">
          <Button variant="ghost" size="sm">
            <Icon html={iconHTML.notification} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon html={iconHTML.help} />
          </Button>
          <Avatar initials="JD" size="md" status="online" />
        </Flex>
      </Flex>
    </Navbar>

    <div class="content-wrapper">
      <!-- Stats Cards -->
      <Grid cols="4" gap="6">
        <StatsCard label="Total Users" value="2,458" trend={12.5} variant="success" />

        <StatsCard label="Revenue" value="$67,234" trend={8.2} variant="default" />

        <StatsCard label="Orders" value="1,234" trend={-3.5} variant="warning" />

        <StatsCard label="Active Users" value="892" trend={15.3} variant="success" />
      </Grid>

      <!-- Charts Section -->
      <div class="charts-grid">
        <div class="chart-card-large">
          <Card>
            <Stack gap="4">
              <Heading as="h3" size="5">Revenue Overview</Heading>
              <div class="chart-container">
                <canvas bind:this={revenueChartCanvas}></canvas>
              </div>
            </Stack>
          </Card>
        </div>

        <div class="chart-card">
          <Card>
            <Stack gap="4">
              <Heading as="h3" size="5">User Distribution</Heading>
              <div class="chart-container">
                <canvas bind:this={usersChartCanvas}></canvas>
              </div>
            </Stack>
          </Card>
        </div>
      </div>

      <!-- Orders Chart -->
      <div class="chart-card-full" style="margin-top: 2rem;">
        <Card>
          <Stack gap="4">
            <Heading as="h3" size="5">Monthly Orders</Heading>
            <div class="chart-container">
              <canvas bind:this={ordersChartCanvas}></canvas>
            </div>
          </Stack>
        </Card>
      </div>

      <!-- Users Table -->
      <div class="table-card" style="margin-top: 2rem;">
        <Card>
          <Stack gap="4">
            <Flex justify="space-between" align="center">
              <Heading as="h3" size="5">Recent Users</Heading>
              <Button variant="primary" size="sm">Export</Button>
            </Flex>

            <DataTable
              {columns}
              rows={users}
              selectable
              bind:selectedRows
              onRowSelect={handleRowSelect}
              onSort={handleSort}
            />
          </Stack>
        </Card>
      </div>
    </div>
  </main>
</div>

<style>
  .dashboard-container {
    display: flex;
    min-height: 100vh;
    background: var(--bg-primary);
    position: relative;
  }

  .sidebar-toggle-mobile {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000;
    display: none;
  }

  .content-wrapper {
    padding: 2rem;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
  }

  .main-content {
    flex: 1;
    margin-left: 280px;
    transition: margin-left 0.3s ease;
    min-height: 100vh;
    background: var(--bg-primary);
  }

  .sidebar-wrapper {
    position: fixed;
    height: 100vh;
  }

  .logo-section {
    padding: 1rem 0;
  }

  .logo-box {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #a855f7, #3b82f6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
  }

  .logo-title {
    margin: 0;
  }

  .navbar-content {
    width: 100%;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
    font-size: 0.875rem;
  }

  .nav-item:hover {
    background: var(--glass-bg);
    color: var(--text-primary);
  }

  .nav-item.active {
    background: var(--glass-bg);
    color: var(--color-primary);
    font-weight: 600;
  }

  .nav-item :global(svg) {
    width: 20px;
    height: 20px;
  }

  .sidebar-footer {
    margin-top: auto;
  }

  .chart-container {
    height: 300px;
    position: relative;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .chart-card-large {
    grid-column: span 2;
  }

  @media (max-width: 1024px) {
    .main-content {
      margin-left: 0;
    }

    .sidebar-toggle-mobile {
      display: block;
    }

    .charts-grid {
      grid-template-columns: 1fr;
    }

    .chart-card-large {
      grid-column: span 1;
    }
  }

  @media (max-width: 768px) {
    .content-wrapper {
      padding: 1rem;
    }

    .chart-container {
      height: 250px;
    }
  }
</style>
