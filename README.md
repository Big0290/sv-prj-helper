# SV Project Helper UI Library

A modern, accessible Svelte 5 component library with glassmorphism design and comprehensive component collection.

## Features

- ✨ **45+ Components** - Complete UI toolkit from atoms to complex organisms
- 🎨 **Glassmorphism Design** - Purple-themed liquid glass effects with backdrop blur
- ♿ **WCAG 2.1 AA Compliant** - Full accessibility with ARIA labels, keyboard navigation, and screen reader support
- 📱 **Mobile-First Responsive** - Touch-friendly design that works on all devices
- 🚀 **Svelte 5 Native** - Built with latest Svelte 5 runes, snippets, and modern patterns
- 🌗 **Automatic Dark Mode** - System preference detection with optimized contrast
- 🎯 **Full TypeScript** - Complete type safety with exported interfaces
- 🎪 **Zero Dependencies** - Self-contained with no external runtime dependencies

## Installation

```bash
npm install @big0290/sv-prj-helper-ui
```

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Svelte** 5.0+
- **TypeScript** 5.0+ (recommended)

### GitHub Packages Setup

This package is published to GitHub Packages. Configure your `.npmrc`:

```bash
echo "@big0290:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc
```

Get your GitHub token with `read:packages` permission from [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens).

## Quick Start

### 1. Import Styles

Add the theme CSS to your main layout:

```svelte
<!-- src/app.html or +layout.svelte -->
<script>
  import '@big0290/sv-prj-helper-ui/styles';
</script>
```

### 2. Use Components

```svelte
<script lang="ts">
  import { Button, Input, Card, Modal } from '@big0290/sv-prj-helper-ui';

  let email = $state('');
  let showModal = $state(false);
</script>

<Card>
  <h2>Welcome to SV UI Library</h2>
  <Input
    bind:value={email}
    label="Email Address"
    type="email"
    placeholder="Enter your email"
  />
  <Button
    variant="primary"
    onclick={() => showModal = true}
  >
    Get Started
  </Button>
</Card>

<Modal bind:open={showModal} title="Welcome">
  <p>Thanks for trying our UI library!</p>
</Modal>
```

### 3. TypeScript Support

Import component types for full type safety:

```typescript
import type { ButtonProps, InputProps, CardProps } from '@big0290/sv-prj-helper-ui'
```

### 4. SvelteKit Configuration

Add to your `vite.config.js` for optimal bundling:

```javascript
import { sveltekit } from '@sveltejs/kit/vite'

export default {
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['@big0290/sv-prj-helper-ui'],
  },
}
```

## Component Examples

### Form Components

```svelte
<script lang="ts">
  import { Card, Input, Button, Checkbox, Select, Alert } from '@big0290/sv-prj-helper-ui';

  let formData = $state({
    name: '',
    email: '',
    role: '',
    subscribe: false
  });
  let submitted = $state(false);

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' }
  ];
</script>

<Card>
  <h2>User Registration</h2>

  {#if submitted}
    <Alert variant="success">Registration successful!</Alert>
  {/if}

  <Input
    bind:value={formData.name}
    label="Full Name"
    placeholder="Enter your name"
    required
  />

  <Input
    bind:value={formData.email}
    label="Email"
    type="email"
    placeholder="Enter your email"
    required
  />

  <Select
    bind:value={formData.role}
    options={roleOptions}
    label="Role"
    placeholder="Select a role"
  />

  <Checkbox
    bind:checked={formData.subscribe}
    label="Subscribe to newsletter"
  />

  <Button
    variant="primary"
    onclick={() => submitted = true}
  >
    Register
  </Button>
</Card>
```

### Data Display

```svelte
<script lang="ts">
  import { DataTable, Badge, Avatar } from '@big0290/sv-prj-helper-ui';

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'role', label: 'Role', sortable: true }
  ];

  const users = [
    {
      id: 1,
      user: { name: 'John Doe', avatar: '/avatars/john.jpg' },
      email: 'john@example.com',
      status: 'active',
      role: 'Admin'
    },
    {
      id: 2,
      user: { name: 'Jane Smith', avatar: null },
      email: 'jane@example.com',
      status: 'inactive',
      role: 'User'
    }
  ];
</script>

<DataTable {columns} rows={users} selectable>
  {#snippet user(row)}
    <div class="flex items-center gap-3">
      <Avatar
        src={row.user.avatar}
        initials={row.user.name.split(' ').map(n => n[0]).join('')}
        size="sm"
      />
      <span>{row.user.name}</span>
    </div>
  {/snippet}

  {#snippet status(row)}
    <Badge variant={row.status === 'active' ? 'success' : 'warning'}>
      {row.status}
    </Badge>
  {/snippet}
</DataTable>
```

### Interactive Components

```svelte
<script lang="ts">
  import { Chat, BarcodeScanner, Modal, Button } from '@big0290/sv-prj-helper-ui';

  let messages = $state([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'other',
      timestamp: new Date(),
      senderName: 'Support',
      avatar: '/support-avatar.jpg'
    }
  ]);

  let showScanner = $state(false);

  function handleSendMessage(content: string) {
    messages.push({
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    });
  }

  function handleBarcodeScan(code: string) {
    console.log('Scanned:', code);
    showScanner = false;
  }
</script>

<!-- Chat Interface -->
<Chat
  {messages}
  onSend={handleSendMessage}
  height="400px"
  placeholder="Type your message..."
/>

<!-- Barcode Scanner -->
<Button onclick={() => showScanner = true}>
  Scan Barcode
</Button>

<Modal bind:open={showScanner} title="Barcode Scanner">
  <BarcodeScanner onScan={handleBarcodeScan} />
</Modal>
```

## Component Library

### 🎯 Core Components (6)

- **Button** - Multiple variants (primary, secondary, ghost, danger), sizes, loading states
- **Input** - Text inputs with labels, validation, helper text
- **Card** - Glassmorphic containers with variants (default, elevated, outlined)
- **Modal** - Accessible dialogs with focus trapping and keyboard navigation
- **Alert** - Dismissible alerts (info, success, warning, error)
- **Badge** - Status indicators with multiple variants and sizes

### 📝 Form Components (8)

- **Checkbox** - With indeterminate state support
- **Radio** - Radio button groups with proper binding
- **Switch** - Toggle switches with smooth animations
- **Select** - Styled select dropdowns with search
- **Textarea** - Multi-line text input with auto-resize
- **FileUpload** - Drag-and-drop file upload with preview
- **Slider** - Range sliders with customizable steps
- **TagInput** - Multi-tag input with autocomplete

### 📐 Layout Components (6)

- **Container** - Responsive containers with max-widths
- **Grid** - CSS Grid system with responsive columns
- **Stack** - Flexbox stack layouts (row/column)
- **Flex** - Flexible layout container
- **Box** - Generic container with spacing utilities
- **Divider** - Visual separators (horizontal/vertical)

### 🧭 Navigation Components (5)

- **Navbar** - Top navigation bar with responsive design
- **Sidebar** - Side navigation panel with collapsible sections
- **Tabs** - Tab navigation with keyboard support
- **Breadcrumbs** - Breadcrumb navigation with separators
- **Menu** - Dropdown and context menus

### 📊 Data Display (4)

- **DataTable** - Sortable, selectable tables with pagination
- **Avatar** - User avatars with status indicators and fallbacks
- **Accordion** - Collapsible content sections
- **Tooltip** - Contextual help with multiple placements

### 💬 Communication (3)

- **Chat** - Full chat interface with typing indicators and avatars
- **Video** - Video player with custom controls
- **Audio** - Audio player with waveform-style progress

### 🔍 Interactive (2)

- **BarcodeScanner** - Camera-based barcode/QR scanner with manual input
- **SearchField** - Search with autocomplete and suggestions

### 🎨 Feedback (4)

- **Spinner** - Loading indicators with multiple styles
- **Progress** - Progress bars with variants and labels
- **Toast** - Notification toasts with auto-dismiss
- **LoadingOverlay** - Full-screen loading states

### 🔧 Utilities (8)

- **Portal** - Render content outside component tree
- **FocusTrap** - Trap focus within components
- **ScrollArea** - Custom scrollbars with smooth scrolling
- **VirtualList** - Virtualized lists for large datasets
- **InfiniteScroll** - Infinite scrolling with loading states
- **DragAndDrop** - Drag and drop functionality
- **ThemeProvider** - Theme context and switching
- **VisuallyHidden** - Screen reader only content

**Total: 45+ Components** | **Fully Typed** | **Accessible** | **Responsive**

## Theming & Customization

### CSS Custom Properties

The library uses CSS custom properties for complete theme customization:

```css
:root {
  /* Primary Colors */
  --sv-primary-50: #faf5ff;
  --sv-primary-500: #a855f7;
  --sv-primary-900: #581c87;

  /* Glassmorphism */
  --sv-glass-bg: rgba(255, 255, 255, 0.1);
  --sv-glass-border: rgba(255, 255, 255, 0.2);
  --sv-backdrop-blur: blur(12px);

  /* Spacing */
  --sv-spacing-xs: 0.25rem;
  --sv-spacing-sm: 0.5rem;
  --sv-spacing-md: 1rem;
  --sv-spacing-lg: 1.5rem;
  --sv-spacing-xl: 2rem;
}
```

### Dark Mode

Automatic dark mode based on system preferences:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --sv-bg-primary: #0f0f23;
    --sv-text-primary: #e2e8f0;
    --sv-glass-bg: rgba(0, 0, 0, 0.2);
  }
}
```

### Custom Themes

Create custom themes by overriding CSS variables:

```css
/* Ocean Theme */
.theme-ocean {
  --sv-primary-500: #0ea5e9;
  --sv-primary-600: #0284c7;
  --sv-accent-500: #06b6d4;
}

/* Forest Theme */
.theme-forest {
  --sv-primary-500: #10b981;
  --sv-primary-600: #059669;
  --sv-accent-500: #34d399;
}
```

Apply themes using the `ThemeProvider`:

```svelte
<script>
  import { ThemeProvider } from '@big0290/sv-prj-helper-ui';
</script>

<ThemeProvider theme="ocean">
  <!-- Your app content -->
</ThemeProvider>
```

## Accessibility

### WCAG 2.1 AA Compliance

All components meet accessibility standards:

- ✅ **Keyboard Navigation** - Full keyboard support with logical tab order
- ✅ **Screen Reader Support** - Proper ARIA labels, roles, and live regions
- ✅ **Focus Management** - Visible focus indicators and focus trapping
- ✅ **Color Contrast** - Minimum 4.5:1 contrast ratio for text
- ✅ **Reduced Motion** - Respects `prefers-reduced-motion` setting
- ✅ **Touch Targets** - Minimum 44px touch targets for mobile

### Keyboard Shortcuts

| Component | Key           | Action               |
| --------- | ------------- | -------------------- |
| Modal     | `Escape`      | Close modal          |
| Dropdown  | `Escape`      | Close dropdown       |
| Tabs      | `Arrow Keys`  | Navigate tabs        |
| DataTable | `Space`       | Toggle row selection |
| Button    | `Enter/Space` | Activate button      |
| Accordion | `Enter/Space` | Toggle section       |

## Peer Dependencies

```json
{
  "peerDependencies": {
    "svelte": "^5.0.0"
  }
}
```

## Browser Support

- **Chrome/Edge** 90+
- **Firefox** 88+
- **Safari** 14+
- **Mobile** iOS Safari 14+, Chrome Mobile 90+

## Troubleshooting

### GitHub Packages Authentication

If you get 401 errors, verify your GitHub token:

```bash
npm config get @big0290:registry
npm config get //npm.pkg.github.com/:_authToken
```

### TypeScript Configuration

Ensure proper module resolution in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true
  }
}
```

### Build Configuration

For SvelteKit projects, add to `vite.config.js`:

```javascript
export default {
  optimizeDeps: {
    include: ['@big0290/sv-prj-helper-ui'],
  },
}
```

## Development

### Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/sv-prj-helper.git
   cd sv-prj-helper
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start development server**:

   ```bash
   npm run dev
   ```

5. **Make your changes** following our guidelines:

   - Use Svelte 5 runes (`$state`, `$derived`, `$props`)
   - Follow TypeScript strict mode
   - Ensure accessibility compliance
   - Add proper ARIA labels and keyboard navigation
   - Test with screen readers

6. **Run checks**:

   ```bash
   npm run check        # TypeScript validation
   npm run build        # Build library
   ```

7. **Commit using conventional commits**:

   ```bash
   git commit -m "feat: add new component"
   git commit -m "fix: resolve accessibility issue"
   git commit -m "docs: update component examples"
   ```

8. **Push and create Pull Request**

### Component Guidelines

When creating new components:

- **Use TypeScript interfaces** for all props
- **Export component types** for consumer use
- **Include comprehensive accessibility** features
- **Follow atomic design** principles (atoms → molecules → organisms)
- **Use CSS custom properties** for theming
- **Test keyboard navigation** thoroughly
- **Add proper documentation** with examples

### Code Style

```svelte
<script lang="ts">
  // Always define Props interface
  interface Props {
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    children?: Snippet;
  }

  // Use $props() with defaults
  let { variant = 'primary', disabled = false, children }: Props = $props();

  // Use $derived for computed values
  const classes = $derived(`btn btn--${variant} ${disabled ? 'btn--disabled' : ''}`);
</script>

<!-- Use snippets for content projection -->
{@render children?.()}

<style>
  .btn {
    /* Use CSS custom properties */
    background: var(--sv-primary-500);
    color: var(--sv-text-on-primary);
  }
</style>
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📖 **Documentation**: [GitHub Repository](https://github.com/Big0290/sv-prj-helper)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Big0290/sv-prj-helper/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Big0290/sv-prj-helper/discussions)
- 🤝 **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines
- 📧 **Contact**: Create an issue for questions and support

---

**Built with ❤️ using Svelte 5, TypeScript, and modern web standards.**
