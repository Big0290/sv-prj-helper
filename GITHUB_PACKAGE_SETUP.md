# GitHub Package Setup Guide

This guide explains how to set up and use the SV Project Helper UI Library as a GitHub Package.

## Package Information

- **Package Name**: `@big0290/sv-prj-helper-ui`
- **Registry**: GitHub Package Registry
- **Repository**: https://github.com/Big0290/sv-prj-helper

## Installation

### Prerequisites

1. **GitHub Personal Access Token**: You need a GitHub Personal Access Token with `read:packages` permission.
2. **NPM Configuration**: Configure npm to use GitHub Package Registry for this scope.

### Step 1: Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select the following scopes:
   - `read:packages` (to download packages)
   - `write:packages` (if you need to publish)
4. Copy the generated token

### Step 2: Configure NPM

Create or update your `.npmrc` file in your project root or home directory:

```bash
# For project-specific configuration (.npmrc in project root)
@big0290:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN

# For global configuration (~/.npmrc)
@big0290:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Replace `YOUR_GITHUB_TOKEN` with your actual GitHub Personal Access Token.

### Step 3: Install the Package

```bash
npm install @big0290/sv-prj-helper-ui
```

## Usage

### Basic Import

```javascript
// Import all components
import { Button, Input, Card } from '@big0290/sv-prj-helper-ui';

// Import styles
import '@big0290/sv-prj-helper-ui/styles';
```

### TypeScript Support

The package includes full TypeScript definitions:

```typescript
import type { ButtonProps } from '@big0290/sv-prj-helper-ui';
import { Button } from '@big0290/sv-prj-helper-ui';

const MyComponent = () => {
  const buttonProps: ButtonProps = {
    variant: 'primary',
    size: 'md'
  };
  
  return <Button {...buttonProps}>Click me</Button>;
};
```

### Svelte 5 Usage

```svelte
<script lang="ts">
  import { Button, Input, Card } from '@big0290/sv-prj-helper-ui';
  import '@big0290/sv-prj-helper-ui/styles';
  
  let inputValue = $state('');
</script>

<Card>
  <Input bind:value={inputValue} placeholder="Enter text" />
  <Button onclick={() => console.log(inputValue)}>
    Submit
  </Button>
</Card>
```

## Available Exports

### Components

```javascript
// Atoms
import { 
  Button, Input, Text, Heading, Badge, Avatar, 
  Checkbox, Radio, Switch, Slider, Progress 
} from '@big0290/sv-prj-helper-ui';

// Molecules  
import { 
  Card, Alert, Tooltip, Menu, Accordion, 
  Breadcrumb, Pagination, Rating 
} from '@big0290/sv-prj-helper-ui';

// Organisms
import { 
  DataTable, Chat, Webcam, BarcodeScanner,
  VideoPlayer, MediaGallery 
} from '@big0290/sv-prj-helper-ui';
```

### UI System

```javascript
// Import from UI system
import { Button, Text, Card } from '@big0290/sv-prj-helper-ui/ui';
```

### Hooks

```javascript
// Import hooks
import { useTheme, useToast, useDialog } from '@big0290/sv-prj-helper-ui/hooks';
```

### Documentation Tools

```javascript
// Import documentation components
import { 
  CodeEditor, LivePreview, ComponentPlayground 
} from '@big0290/sv-prj-helper-ui/docs';
```

## Styling

### CSS Custom Properties

The library uses CSS custom properties for theming:

```css
:root {
  --primary-color: #8b5cf6;
  --secondary-color: #06b6d4;
  --background-color: #ffffff;
  --text-color: #1f2937;
  /* ... more variables */
}
```

### Dark Mode

Dark mode is automatically detected using `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #111827;
    --text-color: #f9fafb;
    /* ... dark mode variables */
  }
}
```

### Custom Themes

You can override the default theme by defining your own CSS custom properties:

```css
/* Your custom theme */
:root {
  --primary-color: #ef4444;  /* Red theme */
  --glass-bg: rgba(239, 68, 68, 0.1);
  --glass-border: rgba(239, 68, 68, 0.2);
}
```

## Troubleshooting

### Authentication Issues

If you get authentication errors:

1. Verify your GitHub token has the correct permissions
2. Check that your `.npmrc` file is correctly configured
3. Ensure the token hasn't expired

### Package Not Found

If npm can't find the package:

1. Verify the package name and scope: `@big0290/sv-prj-helper-ui`
2. Check that the registry is correctly set for the `@big0290` scope
3. Ensure you have access to the repository

### TypeScript Issues

If you encounter TypeScript issues:

1. Ensure you're using TypeScript 5.0 or later
2. Check that your `tsconfig.json` includes the package types
3. Import types explicitly when needed

### Build Issues

If the package doesn't work in your build:

1. Ensure your bundler supports ES modules
2. Check that Svelte 5 is properly configured
3. Verify that CSS imports are handled correctly

## Version Management

### Checking Versions

```bash
# Check installed version
npm list @big0290/sv-prj-helper-ui

# Check available versions
npm view @big0290/sv-prj-helper-ui versions --json
```

### Updating

```bash
# Update to latest version
npm update @big0290/sv-prj-helper-ui

# Install specific version
npm install @big0290/sv-prj-helper-ui@1.2.3
```

## Development

### Local Development

To work with the package locally:

```bash
# Clone the repository
git clone https://github.com/Big0290/sv-prj-helper.git
cd sv-prj-helper

# Install dependencies
npm install

# Start development server
npm run dev

# Build the package
npm run build
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## Support

For issues and questions:

1. Check the [GitHub Issues](https://github.com/Big0290/sv-prj-helper/issues)
2. Review the documentation
3. Create a new issue if needed

## License

This package is licensed under the MIT License. See the LICENSE file for details.