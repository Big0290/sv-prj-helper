# Publishing Guide

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **GitHub Token**: Create a Personal Access Token with `write:packages` scope
3. **Repository Access**: Make sure you have write access to the repository

## Publishing Steps

### 1. Manual Publishing

```bash
# Build the library
npm run build

# Login to GitHub Packages (one-time setup)
npm login --scope=@big0290 --registry=https://npm.pkg.github.com

# Publish
npm publish
```

### 2. Automated Publishing via GitHub Actions

The repository includes a GitHub Actions workflow that automatically publishes when you create a release.

#### Create a Release:

1. **Via GitHub Web Interface:**
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Tag version: `v0.1.0` (or your desired version)
   - Release title: `v0.1.0`
   - Click "Publish release"

2. **Via Command Line:**
   ```bash
   # Update version and create git tag
   npm run release
   
   # Or manually:
   npm version patch  # or minor/major
   git push origin main --tags
   ```

3. **Create GitHub Release:**
   ```bash
   # Using GitHub CLI (if installed)
   gh release create v0.1.0 --title "v0.1.0" --notes "Initial release"
   ```

### 3. Version Management

```bash
# Patch version (0.1.0 → 0.1.1)
npm version patch

# Minor version (0.1.0 → 0.2.0)
npm version minor

# Major version (0.1.0 → 1.0.0)
npm version major

# Push tags
git push --tags
```

## Verification

After publishing, verify your package:

```bash
# Check if package exists
npm view @big0290/sv-prj-helper-ui

# Install in a test project
npm install @big0290/sv-prj-helper-ui
```

## Troubleshooting

### Authentication Issues
```bash
# Check current registry
npm config get registry

# Check GitHub Packages registry
npm config get @big0290:registry

# Re-authenticate
npm logout --scope=@big0290 --registry=https://npm.pkg.github.com
npm login --scope=@big0290 --registry=https://npm.pkg.github.com
```

### Permission Denied
- Ensure your GitHub token has `write:packages` scope
- Verify you have write access to the repository
- Check that the package name matches your GitHub username/organization

### Package Not Found
- Verify the package was published: check GitHub → Packages tab
- Ensure consumers have the correct `.npmrc` configuration
- Check that the package name is exactly `@big0290/sv-prj-helper-ui`

## Package Information

- **Name**: `@big0290/sv-prj-helper-ui`
- **Registry**: `https://npm.pkg.github.com`
- **Scope**: `@big0290`
- **Current Version**: `0.1.0`

## Next Steps

1. **Push to GitHub**: Make sure all files are committed and pushed
2. **Create Release**: Use GitHub's release feature or command line
3. **Test Installation**: Try installing in a separate project
4. **Update Documentation**: Keep README.md updated with latest features

## Example Consumer Setup

For users installing your package:

```bash
# In their project root
echo "@big0290:registry=https://npm.pkg.github.com" >> .npmrc
npm install @big0290/sv-prj-helper-ui
```

```svelte
<!-- In their Svelte component -->
<script>
  import { Button, Card, Input } from '@big0290/sv-prj-helper-ui';
  import '@big0290/sv-prj-helper-ui/styles';
</script>

<Card>
  <Input label="Email" type="email" />
  <Button variant="primary">Submit</Button>
</Card>
```