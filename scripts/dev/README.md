# Development Scripts

Utilities and tools for development workflow.

## Scripts

### `component-generator.js`
Generates new component scaffolding with proper TypeScript interfaces, Svelte 5 patterns, and accessibility features.

**Usage:**
```bash
node scripts/dev/component-generator.js <component-name> [category]
```

**Example:**
```bash
node scripts/dev/component-generator.js MyButton atom
```

### `dev-tools.js`
Collection of development utilities including file watchers, hot reload helpers, and development server utilities.

**Usage:**
```bash
node scripts/dev/dev-tools.js [command]
```

### `test-utils.js`
Testing utilities and helpers for component testing, including test data generation and mock utilities.

**Usage:**
```bash
node scripts/dev/test-utils.js [test-command]
```

## Development Workflow

These scripts support the daily development workflow:

1. **Generate** new components with proper structure
2. **Test** components with utilities and helpers
3. **Debug** with development tools and utilities

## Integration

Typically used during development:

```json
{
  "scripts": {
    "dev:generate": "node scripts/dev/component-generator.js",
    "dev:tools": "node scripts/dev/dev-tools.js",
    "test:utils": "node scripts/dev/test-utils.js"
  }
}
```