# Scripts Directory

This directory contains various utility scripts organized by their purpose and use case.

## Directory Structure

### 📦 `build/`
Build and packaging related scripts:
- `build-lib.js` - Main library build script
- `optimize-package.js` - Package optimization utilities
- `validate-build.js` - Build validation and testing

### 🛠️ `dev/`
Development tools and utilities:
- `component-generator.js` - Generate new component scaffolding
- `dev-tools.js` - Development environment utilities
- `test-utils.js` - Testing utilities and helpers

### 📚 `docs/`
Documentation generation system:
- **LLM Documentation Generator** - Modern TypeScript-based system for generating comprehensive API documentation
- `docs-cli.js` - Legacy documentation CLI
- `docs-validator.js` - Documentation validation utilities
- `generate-docs.js` - Legacy documentation generator

### 🔧 `maintenance/`
Code maintenance and refactoring scripts:
- `add-local-interfaces.js` - Interface management utilities
- `add-remaining-interfaces.js` - Interface completion scripts
- `fix-all-interface-imports.js` - Import path fixing utilities
- `fix-import-paths.js` - General import path corrections
- `fix-line-clamp.js` - CSS line-clamp fixes
- `fix-remaining-imports.js` - Import cleanup utilities
- `fix-typescript-errors.js` - TypeScript error resolution
- `reorganize-components.js` - Component structure reorganization

### 🚀 `release/`
Release management and validation:
- `release.js` - Release automation script
- `validate-release.js` - Pre-release validation checks

## Usage

Each subdirectory contains its own README with specific usage instructions. Most scripts can be run directly with Node.js:

```bash
# Example: Run the build script
node scripts/build/build-lib.js

# Example: Generate documentation
npm run docs:generate
# or
npx tsx scripts/docs/cli.ts
```

## Migration Notes

This structure was reorganized from a flat directory structure to improve maintainability and discoverability. The new LLM Documentation Generator in `docs/` represents the modern approach to documentation generation, while legacy scripts are preserved for compatibility.