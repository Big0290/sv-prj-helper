# Installation Guide

## Quick Setup

### 1. Configure npm for GitHub Packages

Create a `.npmrc` file in your project root:

```bash
echo "@sv-prj-helper:registry=https://npm.pkg.github.com" >> .npmrc
```

### 2. Install the package

```bash
npm install @sv-prj-helper/ui
```

### 3. Import in your Svelte app

```svelte
<script>
  import { Button, Input, Card } from '@sv-prj-helper/ui';
  import '@sv-prj-helper/ui/styles';
</script>

<Button variant="primary">Hello World</Button>
```

## Authentication (for private repos)

If the repository is private, you'll need a GitHub Personal Access Token:

### Option 1: Login via npm
```bash
npm login --scope=@sv-prj-helper --registry=https://npm.pkg.github.com
```

### Option 2: Set token directly
```bash
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

### Option 3: Environment variable
```bash
export NPM_TOKEN=YOUR_GITHUB_TOKEN
echo "//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}" >> .npmrc
```

## Creating a GitHub Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `read:packages` (and `write:packages` if publishing)
4. Copy the token and use it in the authentication step above

## Troubleshooting

### 404 Not Found
- Ensure you're authenticated with GitHub
- Check that the package name matches exactly: `@sv-prj-helper/ui`
- Verify the registry is set correctly in `.npmrc`

### Permission Denied
- Make sure your GitHub token has `read:packages` scope
- Check that you have access to the repository

### Module Not Found
- Ensure you're importing from the correct path: `@sv-prj-helper/ui`
- Check that the package was installed successfully: `npm list @sv-prj-helper/ui`

## Example Project Setup

```bash
# Create new SvelteKit project
npm create svelte@latest my-app
cd my-app

# Configure for GitHub Packages
echo "@sv-prj-helper:registry=https://npm.pkg.github.com" >> .npmrc

# Install the UI library
npm install @sv-prj-helper/ui

# Install other dependencies
npm install
```

Then in your `src/app.html`, add the styles:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
</head>
<body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
</body>
</html>
```

And in your main layout (`src/routes/+layout.svelte`):

```svelte
<script>
  import '@sv-prj-helper/ui/styles';
</script>

<main>
  <slot />
</main>
```