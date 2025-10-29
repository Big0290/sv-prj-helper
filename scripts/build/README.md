# Build Scripts

Scripts for building and packaging the component library.

## Scripts

### `build-lib.js`
Main library build script that compiles the Svelte components and TypeScript code for distribution.

**Usage:**
```bash
node scripts/build/build-lib.js
```

### `optimize-package.js`
Optimizes the built package by removing unnecessary files, minifying assets, and preparing for distribution.

**Usage:**
```bash
node scripts/build/optimize-package.js
```

### `validate-build.js`
Validates the built package to ensure all components are properly exported and the build is ready for release.

**Usage:**
```bash
node scripts/build/validate-build.js
```

## Build Process

1. **Build** - Compile TypeScript and Svelte components
2. **Optimize** - Remove dev dependencies and optimize for production
3. **Validate** - Ensure build integrity and completeness

## Integration

These scripts are typically integrated into the main package.json build commands:

```json
{
  "scripts": {
    "build": "node scripts/build/build-lib.js",
    "build:optimize": "node scripts/build/optimize-package.js",
    "build:validate": "node scripts/build/validate-build.js"
  }
}
```