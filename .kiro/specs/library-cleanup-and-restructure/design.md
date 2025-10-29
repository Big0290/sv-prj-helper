# Design Document

## Overview

This design outlines the systematic transformation of the SV Project Helper UI Library from a development workspace into a clean, production-ready npm package. The cleanup involves removing demo content, consolidating duplicate structures, eliminating unnecessary files, and establishing proper library packaging configuration.

## Architecture

### Current State Analysis
- **Duplicate Structures**: Both `src/lib/components/` and `src/lib/ui/` contain components
- **Demo Content**: `src/routes/` contains SvelteKit app routes and `src/lib/examples/` contains demo components
- **Development Files**: 20+ markdown files in root directory containing development notes
- **Build Artifacts**: `.svelte-kit/` contains generated files that shouldn't be in source control
- **Mixed Purpose**: Project serves both as library and demo application

### Target State
- **Single Component Structure**: Unified component organization in `src/lib/ui/`
- **Library-Only Focus**: No demo routes, examples, or development artifacts
- **Clean Documentation**: Component-based API documentation and usage guides
- **Proper npm Package**: Configured for distribution with correct entry points and exports
- **Development Workflow**: Streamlined for library development and maintenance

## Components and Interfaces

### File Structure Cleanup

#### Files to Remove
```
Root Directory Cleanup:
- CHANGELOG.md (keep)
- COMPONENTS.md (remove - replace with generated docs)
- COMPONENT_API_REFERENCE.md (remove - replace with generated docs)
- CREATE_REMAINING_COMPONENTS.md (remove - development note)
- DEMO_STRUCTURE.md (remove - development note)
- EXAMPLES_MODAL_IMPLEMENTATION.md (remove - development note)
- EXTENSION_SUMMARY.md (remove - development note)
- GITHUB_PACKAGE_SETUP.md (remove - development note)
- IMPLEMENTATION_COMPLETE.md (remove - development note)
- INSTALLATION.md (remove - merge into README)
- KEYBOARD_NAVIGATION.md (remove - move to component docs)
- LIVEPREVIEW_IMPLEMENTATION.md (remove - development note)
- PROGRESS_SUMMARY.md (remove - development note)
- PUBLISHING.md (remove - development note)
- QUICKSTART.md (remove - merge into README)
- QUICK_START.md (remove - duplicate)
- README.md (keep - rewrite for library)
- RELEASE.md (remove - development note)
- STATIC_DOCS_IMPLEMENTATION.md (remove - development note)
- THEMING_PAGE_UPDATE.md (remove - development note)
- WARNINGS_TO_FIX.md (remove - development note)
- missing-components.md (remove - development note)

Directory Cleanup:
- src/routes/ (remove - demo application)
- src/lib/examples/ (remove - demo components)
- src/lib/components/ (remove - duplicate structure)
- .svelte-kit/ (keep in .gitignore, remove from repo)
- examples/ (remove - external examples)
```

#### Files to Keep and Modify
```
Essential Files:
- package.json (modify for library distribution)
- README.md (rewrite for library usage)
- CHANGELOG.md (keep for version history)
- tsconfig.json (modify for library build)
- svelte.config.js (modify for library packaging)
- vite.config.ts (modify for library build)
- .gitignore (update to exclude build artifacts)
```

### Component Structure Consolidation

#### Source of Truth: `src/lib/ui/`
The existing `src/lib/ui/` structure will be the single source of truth:
```
src/lib/ui/
├── atoms/          # Basic building blocks
├── molecules/      # Simple compositions  
├── organisms/      # Complex components
├── layouts/        # Layout components
├── utils/          # Utility components
├── hooks/          # Svelte 5 hooks
├── theme/          # Theme system
└── index.ts        # Main exports
```

#### Migration Strategy
1. **Audit Duplicates**: Compare `src/lib/components/` vs `src/lib/ui/` to identify duplicates
2. **Preserve Latest**: Keep the most recent/complete version of each component
3. **Merge Unique**: Move any unique components from `components/` to appropriate `ui/` folders
4. **Update Exports**: Consolidate all exports through `src/lib/ui/index.ts`

### Package Configuration

#### package.json Updates
```json
{
  "name": "@your-org/sv-ui-library",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles": "./dist/styles/theme.css"
  },
  "files": [
    "dist",
    "README.md",
    "CHANGELOG.md"
  ],
  "scripts": {
    "build": "svelte-kit sync && svelte-package",
    "dev": "vite dev",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "svelte": "^5.0.0"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^3.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/package": "^2.0.0",
    "svelte": "^5.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

#### Build Configuration
- **svelte.config.js**: Configure for library packaging with `@sveltejs/package`
- **vite.config.ts**: Optimize for library build, exclude demo-specific configurations
- **tsconfig.json**: Strict TypeScript configuration for library distribution

## Data Models

### Component Documentation Structure
```typescript
interface ComponentDoc {
  name: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'layouts' | 'utils';
  description: string;
  props: PropDoc[];
  events: EventDoc[];
  slots: SlotDoc[];
  examples: ExampleDoc[];
}

interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

interface ExampleDoc {
  title: string;
  code: string;
  description?: string;
}
```

### Library Export Structure
```typescript
// Main library exports
export * from './ui/atoms';
export * from './ui/molecules';
export * from './ui/organisms';
export * from './ui/layouts';
export * from './ui/utils';
export * from './ui/hooks';
export * from './ui/theme';

// Type exports
export type * from './types';
```

## Error Handling

### Migration Safety
- **Backup Strategy**: Create git branch before major deletions
- **Incremental Cleanup**: Remove files in logical groups to enable rollback
- **Build Validation**: Verify library builds successfully after each cleanup phase
- **Export Verification**: Ensure all components remain accessible after consolidation

### Dependency Management
- **Import Path Updates**: Update all internal imports to use consolidated structure
- **Peer Dependency Validation**: Ensure all required peer dependencies are declared
- **Type Export Verification**: Confirm all TypeScript interfaces are properly exported

## Testing Strategy

### Cleanup Validation
1. **Build Testing**: Verify library packages successfully after each cleanup phase
2. **Export Testing**: Ensure all components can be imported from the main package
3. **Type Testing**: Validate TypeScript declarations are complete and accurate
4. **Size Testing**: Monitor package size to ensure cleanup reduces bundle size

### Documentation Generation
1. **API Documentation**: Generate component API docs from TypeScript interfaces
2. **Usage Examples**: Create minimal, focused examples for each component
3. **Integration Testing**: Verify components work in a fresh project installation

### Quality Assurance
- **Automated Checks**: TypeScript strict mode, ESLint, Prettier
- **Manual Verification**: Component functionality and styling preservation
- **Performance Impact**: Monitor build times and bundle optimization
- **Developer Experience**: Test installation and usage workflow

## Documentation Strategy

### README Structure
```markdown
# SV Project Helper UI Library

## Installation
npm install @your-org/sv-ui-library

## Quick Start
Basic usage examples and setup instructions

## Components
Links to component documentation

## Theming
Theme customization guide

## Development
Contributor guidelines
```

### Component Documentation
- **Auto-generated**: Extract props, events, and slots from component source
- **Usage Examples**: Minimal, copy-paste ready examples
- **Accessibility Notes**: ARIA usage and keyboard navigation
- **Theming Guide**: CSS custom properties and customization options

### Migration from Development Notes

Key architectural decisions and patterns extracted from development files:

#### Component Documentation System
- **Static Code Examples**: Replaced complex interactive previews with reliable static examples using `StaticCodeExample` component
- **Auto-Discovery**: Maintains automatic component scanning and documentation generation
- **Performance Focus**: Eliminated REPL API dependencies for faster, more reliable documentation

#### Accessibility Implementation
- **WCAG 2.1 AA Compliance**: Comprehensive keyboard navigation, ARIA labels, and screen reader support
- **Focus Management**: Proper focus trapping in modals, visible focus indicators, logical tab order
- **Reduced Motion**: Respects `prefers-reduced-motion` for accessibility

#### GitHub Packages Integration
- **Authentication**: Requires GitHub Personal Access Token with `read:packages` permission
- **Registry Configuration**: Uses `@big0290:registry=https://npm.pkg.github.com` in `.npmrc`
- **Publishing Workflow**: Automated publishing via GitHub Actions on release creation

#### Theming Architecture
- **CSS Custom Properties**: Complete theme system using CSS variables for colors, spacing, effects
- **Glassmorphism Design**: Purple-based liquid glass effects with backdrop blur
- **Dark Mode**: Automatic detection via `prefers-color-scheme` media query
- **Custom Themes**: Extensible theme system allowing complete visual customization