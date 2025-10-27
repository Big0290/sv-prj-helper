# SV Project Helper - UI Library

A modern, accessible Svelte 5 UI component library with purpleish iOS26-inspired liquid glassmorphism design.

## Features

- ✨ **Modern Glassmorphism Design** - Beautiful purple-themed liquid glass effects
- ♿ **Full Accessibility** - WCAG compliant with ARIA labels, keyboard navigation, and screen reader support
- 📱 **Responsive** - Mobile-first design that works on all devices
- 🎨 **Svelte 5 Native** - Built with latest Svelte 5 features (runes, snippets)
- 🌗 **Dark Mode Support** - Automatic dark mode based on system preferences
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 🔧 **Extensible** - Easy to customize and extend

## Installation

### Prerequisites

- Node.js 18+ and npm 9+
- Svelte 5.0+
- TypeScript 5.0+ (recommended)

### Step 1: Configure GitHub Packages

Create or update your `.npmrc` file in your project root:

```bash
# For project-specific configuration
echo "@big0290:registry=https://npm.pkg.github.com" >> .npmrc
```

Or configure globally:

```bash
# For global configuration
npm config set @big0290:registry https://npm.pkg.github.com
```

### Step 2: Authentication

You need a GitHub Personal Access Token with `read:packages` permission:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `read:packages` scope
3. Configure npm with your token:

```bash
# Method 1: Add to .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc

# Method 2: Use npm config
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN

# Method 3: Login interactively
npm login --scope=@big0290 --registry=https://npm.pkg.github.com
```

### Step 3: Install the Package

```bash
npm install @big0290/sv-prj-helper-ui
```

### Verify Installation

```bash
npm list @big0290/sv-prj-helper-ui
```

## Quick Start

### Basic Setup

1. **Import styles** in your main app file or `app.html`:

```svelte
<!-- In your main App.svelte or +layout.svelte -->
<script>
  import '@big0290/sv-prj-helper-ui/styles';
</script>
```

2. **Import and use components**:

```svelte
<script lang="ts">
  import { Button, Input, Card } from '@big0290/sv-prj-helper-ui';
  
  let email = $state('');
  let showModal = $state(false);
</script>

<Card>
  <h2>Welcome to SV Project Helper UI</h2>
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
```

### TypeScript Setup

For full TypeScript support, import types:

```typescript
import type { ButtonProps, InputProps } from '@big0290/sv-prj-helper-ui';
import { Button, Input } from '@big0290/sv-prj-helper-ui';

// Type-safe component usage
const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'lg',
  disabled: false
};
```

### SvelteKit Integration

In your `vite.config.js`:

```javascript
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['@big0290/sv-prj-helper-ui']
  }
};
```

### Import Patterns

```javascript
// Import all components
import { Button, Input, Card, Modal } from '@big0290/sv-prj-helper-ui';

// Import from specific modules
import { Button } from '@big0290/sv-prj-helper-ui/ui';
import { useTheme } from '@big0290/sv-prj-helper-ui/hooks';
import { CodeEditor } from '@big0290/sv-prj-helper-ui/docs';

// Import styles
import '@big0290/sv-prj-helper-ui/styles';
```

## Usage Examples

### Form Example

```svelte
<script lang="ts">
  import { Card, Input, Button, Checkbox, Alert } from '@big0290/sv-prj-helper-ui';
  
  let formData = $state({
    name: '',
    email: '',
    subscribe: false
  });
  let submitted = $state(false);
  
  function handleSubmit() {
    submitted = true;
    // Handle form submission
  }
</script>

<Card>
  <h2>Contact Form</h2>
  
  {#if submitted}
    <Alert variant="success">Form submitted successfully!</Alert>
  {/if}
  
  <form onsubmit={handleSubmit}>
    <Input 
      bind:value={formData.name}
      label="Full Name"
      required
    />
    
    <Input 
      bind:value={formData.email}
      label="Email"
      type="email"
      required
    />
    
    <Checkbox 
      bind:checked={formData.subscribe}
      label="Subscribe to newsletter"
    />
    
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </form>
</Card>
```

### Modal Example

```svelte
<script lang="ts">
  import { Button, Modal } from '@big0290/sv-prj-helper-ui';
  
  let showModal = $state(false);
</script>

<Button onclick={() => showModal = true}>
  Open Modal
</Button>

<Modal bind:open={showModal} title="Confirmation">
  <p>Are you sure you want to continue?</p>
  
  {#snippet actions()}
    <Button variant="ghost" onclick={() => showModal = false}>
      Cancel
    </Button>
    <Button variant="primary" onclick={() => showModal = false}>
      Confirm
    </Button>
  {/snippet}
</Modal>
```

### Data Table Example

```svelte
<script lang="ts">
  import { DataTable } from '@big0290/sv-prj-helper-ui';
  
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' }
  ];
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];
</script>

<DataTable 
  {columns} 
  {data} 
  selectable
  searchable
  pagination
/>
```

## Components

### Core Components
- **Button** - Variants: primary, secondary, ghost, danger | Sizes: sm, md, lg
- **Input** - Full form input with labels, errors, and helper text
- **Card** - Glassmorphic card container with variants
- **Modal** - Accessible modal with focus trapping
- **Dropdown** - Dropdown menu component
- **Alert** - Alert messages with variants: info, success, warning, error

### Form Components
- **Checkbox** - Checkbox with indeterminate state support
- **Radio** - Radio button groups
- **Switch** - Toggle switch
- **Select** - Styled select dropdown
- **Textarea** - Multi-line text input

### Layout Components
- **Container** - Responsive container with max-widths
- **Grid** - CSS Grid layout system
- **Stack** - Flexbox stack layout
- **Divider** - Visual separator

### Navigation Components
- **Navbar** - Top navigation bar
- **Sidebar** - Side navigation panel
- **Tabs** - Tab navigation
- **Breadcrumbs** - Breadcrumb navigation

### Feedback Components
- **Spinner** - Loading spinner
- **Progress** - Progress bar with variants
- **Badge** - Status badges
- **Tooltip** - Hover tooltips

## Troubleshooting

### Common Issues

#### Authentication Errors

```bash
# Error: 401 Unauthorized
npm ERR! 401 Unauthorized - GET https://npm.pkg.github.com/@big0290%2fsv-prj-helper-ui
```

**Solution**: Verify your GitHub token has `read:packages` permission and is correctly configured:

```bash
# Check current configuration
npm config get @big0290:registry
npm config get //npm.pkg.github.com/:_authToken

# Reconfigure if needed
npm config set @big0290:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

#### Package Not Found

```bash
# Error: 404 Not Found
npm ERR! 404 Not Found - GET https://npm.pkg.github.com/@big0290%2fsv-prj-helper-ui
```

**Solution**: Ensure you have access to the repository and the package name is correct.

#### TypeScript Errors

If you encounter TypeScript issues:

1. Ensure TypeScript 5.0+ is installed
2. Check your `tsconfig.json` includes proper module resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "isolatedModules": true
  }
}
```

#### Build Issues

For Vite/SvelteKit build issues:

```javascript
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@big0290/sv-prj-helper-ui']
  },
  ssr: {
    noExternal: ['@big0290/sv-prj-helper-ui']
  }
};
```

### Getting Help

1. Check the [GitHub Issues](https://github.com/Big0290/sv-prj-helper/issues)
2. Review the [documentation](https://github.com/Big0290/sv-prj-helper)
3. Create a new issue with:
   - Your environment details (Node.js, npm, Svelte versions)
   - Steps to reproduce the problem
   - Expected vs actual behavior

## Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/Big0290/sv-prj-helper.git
cd sv-prj-helper

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Building

```bash
# Build the library for distribution
npm run package

# Validate the build
npm run validate:release

# Run type checking
npm run check
```

### Testing

```bash
# Run all checks
npm run check

# Build and validate
npm run package
npm run validate:release
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run check`
5. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Design System

### Colors
The library uses a purple-based color palette with glassmorphism effects:
- Primary: Purple gradient (#a855f7 to #9333ea)
- Neutral: Grayscale palette
- Semantic: Success (green), Warning (orange), Error (red), Info (blue)

### Spacing
CSS custom properties for consistent spacing:
- Base unit: 0.25rem (4px)
- Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16

### Border Radius
iOS-inspired rounded corners:
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px

### Typography
System font stack with support for:
- Sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- Sizes: xs, sm, base, lg, xl, 2xl, 3xl

## Accessibility

All components follow WCAG 2.1 AA standards:
- ✓ Keyboard navigation
- ✓ Focus indicators
- ✓ ARIA labels and roles
- ✓ Screen reader support
- ✓ Reduced motion support
- ✓ Color contrast compliance

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
