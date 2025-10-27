# Installation Guide

Complete guide to installing and configuring SV Project Helper UI Library.

## Prerequisites

Before installing, ensure you have:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (or yarn/pnpm equivalent)
- **Svelte**: Version 5.0.0 or higher
- **TypeScript**: Version 5.0.0 or higher (recommended)

Check your versions:

```bash
node --version    # Should be 18+
npm --version     # Should be 9+
```

## Installation Methods

### Method 1: GitHub Packages (Recommended)

This is the primary distribution method for the library.

#### Step 1: Configure npm for GitHub Packages

Create or update your `.npmrc` file in your project root:

```bash
# Create .npmrc file
touch .npmrc

# Add GitHub Packages configuration
echo "@big0290:registry=https://npm.pkg.github.com" >> .npmrc
```

#### Step 2: Set up Authentication

You need a GitHub Personal Access Token with `read:packages` permission.

##### Create GitHub Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "NPM Package Access")
4. Select the `read:packages` scope
5. Click "Generate token"
6. Copy the generated token (you won't see it again!)

##### Configure Authentication

Choose one of these methods:

**Option A: Add to .npmrc (Project-specific)**

```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc
```

**Option B: Global npm configuration**

```bash
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

**Option C: Environment variable**

```bash
# Add to your shell profile (.bashrc, .zshrc, etc.)
export NPM_TOKEN=YOUR_GITHUB_TOKEN

# Then in .npmrc
echo "//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}" >> .npmrc
```

#### Step 3: Install the Package

```bash
npm install @big0290/sv-prj-helper-ui
```

#### Step 4: Verify Installation

```bash
# Check if package is installed
npm list @big0290/sv-prj-helper-ui

# Should output something like:
# └── @big0290/sv-prj-helper-ui@0.1.0
```

### Method 2: Local Development

For contributing or local development:

```bash
# Clone the repository
git clone https://github.com/Big0290/sv-prj-helper.git
cd sv-prj-helper

# Install dependencies
npm install

# Build the library
npm run package

# Link for local development
npm link

# In your project
npm link @big0290/sv-prj-helper-ui
```

## Project Setup

### SvelteKit Project

If you're using SvelteKit, update your `vite.config.js`:

```javascript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['@big0290/sv-prj-helper-ui']
  },
  ssr: {
    noExternal: ['@big0290/sv-prj-helper-ui']
  }
});
```

### Vite + Svelte Project

For a standard Vite + Svelte setup:

```javascript
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: ['@big0290/sv-prj-helper-ui']
  }
});
```

### TypeScript Configuration

Update your `tsconfig.json` for optimal TypeScript support:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowJs": true,
    "checkJs": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "src/**/*",
    "node_modules/@big0290/sv-prj-helper-ui/**/*"
  ]
}
```

## Import Styles

The library requires CSS styles to be imported. Choose one method:

### Method 1: Import in Main Component

```svelte
<!-- App.svelte or +layout.svelte -->
<script>
  import '@big0290/sv-prj-helper-ui/styles';
</script>
```

### Method 2: Import in CSS

```css
/* app.css or global.css */
@import '@big0290/sv-prj-helper-ui/styles';
```

### Method 3: Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@big0290/sv-prj-helper-ui/styles';`
      }
    }
  }
});
```

## Verify Setup

Create a test component to verify everything works:

```svelte
<!-- Test.svelte -->
<script lang="ts">
  import { Button, Card } from '@big0290/sv-prj-helper-ui';
  import '@big0290/sv-prj-helper-ui/styles';
  
  let count = $state(0);
</script>

<Card>
  <h2>Installation Test</h2>
  <p>Count: {count}</p>
  <Button onclick={() => count++}>
    Increment
  </Button>
</Card>
```

If you see a styled card with a working button, you're all set! 🎉

## Troubleshooting

### Common Issues

#### 1. Authentication Failed (401)

```bash
npm ERR! 401 Unauthorized - GET https://npm.pkg.github.com/@big0290%2fsv-prj-helper-ui
```

**Solutions:**
- Verify your GitHub token has `read:packages` permission
- Check token hasn't expired
- Ensure token is correctly set in `.npmrc`

```bash
# Debug authentication
npm config get //npm.pkg.github.com/:_authToken
npm whoami --registry=https://npm.pkg.github.com
```

#### 2. Package Not Found (404)

```bash
npm ERR! 404 Not Found - GET https://npm.pkg.github.com/@big0290%2fsv-prj-helper-ui
```

**Solutions:**
- Verify package name: `@big0290/sv-prj-helper-ui`
- Check registry configuration: `npm config get @big0290:registry`
- Ensure you have repository access

#### 3. Module Resolution Issues

```bash
Cannot resolve module '@big0290/sv-prj-helper-ui'
```

**Solutions:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Vite configuration includes the package in `optimizeDeps`

#### 4. TypeScript Errors

```bash
Cannot find module '@big0290/sv-prj-helper-ui' or its corresponding type declarations
```

**Solutions:**
- Ensure TypeScript 5.0+ is installed
- Check `tsconfig.json` includes proper module resolution
- Restart TypeScript language server

#### 5. CSS Not Loading

If components appear unstyled:

**Solutions:**
- Ensure styles are imported: `import '@big0290/sv-prj-helper-ui/styles';`
- Check browser dev tools for CSS loading errors
- Verify Vite/bundler handles CSS imports correctly

### Getting Help

If you're still having issues:

1. **Check existing issues**: [GitHub Issues](https://github.com/Big0290/sv-prj-helper/issues)
2. **Create a new issue** with:
   - Your environment (Node.js, npm, Svelte versions)
   - Complete error messages
   - Steps to reproduce
   - Your configuration files

3. **Include debug information**:

```bash
# Gather debug info
npm --version
node --version
npm config get registry
npm config get @big0290:registry
npm list @big0290/sv-prj-helper-ui
```

## Next Steps

Once installed, check out:

- [Quick Start Guide](QUICK_START.md) - Get up and running fast
- [Component Documentation](README.md#components) - Explore available components
- [Examples](https://github.com/Big0290/sv-prj-helper/tree/main/examples) - See real usage examples
- [GitHub Package Setup](GITHUB_PACKAGE_SETUP.md) - Detailed GitHub Packages guide

---

**Happy coding!** 🚀