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

### From GitHub Packages

First, configure npm to use GitHub Packages for the `@sv-prj-helper` scope:

```bash
# Create or update .npmrc in your project root
echo "@sv-prj-helper:registry=https://npm.pkg.github.com" >> .npmrc
```

Then install the package:

```bash
npm install @sv-prj-helper/ui
```

### Authentication

For private repositories, you'll need to authenticate with GitHub:

```bash
# Login to GitHub Packages
npm login --scope=@sv-prj-helper --registry=https://npm.pkg.github.com

# Or set your GitHub token
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

## Usage

Import the components and styles in your Svelte app:

```svelte
<script>
  import { Button, Input, Card } from '@sv-prj-helper/ui';
  import '@sv-prj-helper/ui/styles';
</script>

<Button variant="primary">Click Me</Button>
<Input label="Email" type="email" />
<Card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
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

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build

# Package for distribution
npm run package
```

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
