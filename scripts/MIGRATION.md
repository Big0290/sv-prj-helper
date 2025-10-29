# Scripts Directory Migration

This document outlines the reorganization of the `/scripts` directory from a flat structure to an organized, purpose-driven structure.

## Before (Flat Structure)

```
scripts/
├── add-local-interfaces.js
├── add-remaining-interfaces.js
├── build-lib.js
├── component-generator.js
├── dev-tools.js
├── docs-cli.js
├── docs-generator/           # Only organized directory
├── docs-validator.js
├── fix-all-interface-imports.js
├── fix-import-paths.js
├── fix-line-clamp.js
├── fix-remaining-imports.js
├── fix-typescript-errors.js
├── generate-docs.js
├── optimize-package.js
├── release.js
├── reorganize-components.js
├── test-utils.js
├── validate-build.js
└── validate-release.js
```

## After (Organized Structure)

```
scripts/
├── README.md                 # Overview of all scripts
├── MIGRATION.md             # This migration guide
├── build/                   # 📦 Build & packaging
│   ├── README.md
│   ├── build-lib.js
│   ├── optimize-package.js
│   └── validate-build.js
├── dev/                     # 🛠️ Development tools
│   ├── README.md
│   ├── component-generator.js
│   ├── dev-tools.js
│   └── test-utils.js
├── docs/                    # 📚 Documentation (renamed from docs-generator)
│   ├── README.md
│   ├── cli.ts              # Modern LLM docs generator
│   ├── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── analyzers/
│   ├── config/
│   ├── core/
│   ├── documenters/
│   ├── generators/
│   ├── interfaces/
│   ├── types/
│   ├── utils/
│   ├── docs-cli.js         # Legacy docs CLI
│   ├── docs-validator.js   # Legacy docs validator
│   └── generate-docs.js    # Legacy docs generator
├── maintenance/             # 🔧 Code maintenance
│   ├── README.md
│   ├── add-local-interfaces.js
│   ├── add-remaining-interfaces.js
│   ├── fix-all-interface-imports.js
│   ├── fix-import-paths.js
│   ├── fix-line-clamp.js
│   ├── fix-remaining-imports.js
│   ├── fix-typescript-errors.js
│   └── reorganize-components.js
└── release/                 # 🚀 Release management
    ├── README.md
    ├── release.js
    └── validate-release.js
```

## Benefits

### 🎯 **Improved Discoverability**

- Scripts are now grouped by purpose
- Each directory has a README explaining its contents
- Clear separation between build, dev, docs, maintenance, and release

### 📚 **Better Documentation**

- Main README provides overview of all script categories
- Individual READMEs explain specific use cases
- Migration guide documents the changes

### 🔧 **Enhanced Maintainability**

- Related scripts are co-located
- Easier to find the right script for a task
- Clear ownership and responsibility boundaries

### 🚀 **Modern Documentation System**

- New TypeScript-based LLM documentation generator
- Legacy scripts preserved for compatibility
- Clear migration path from old to new systems

## Usage Updates

### Before

```bash
node scripts/build-lib.js
node scripts/docs-generator/cli.ts
```

### After

```bash
node scripts/build/build-lib.js
npx tsx scripts/docs/cli.ts
```

## Script Categories

### 📦 Build Scripts

- **Purpose**: Compile, optimize, and validate builds
- **When to use**: During CI/CD, before releases
- **Key scripts**: `build-lib.js`, `optimize-package.js`, `validate-build.js`

### 🛠️ Development Scripts  

- **Purpose**: Daily development workflow support
- **When to use**: During active development
- **Key scripts**: `component-generator.js`, `dev-tools.js`, `test-utils.js`

### 📚 Documentation Scripts

- **Purpose**: Generate and validate documentation
- **When to use**: Before releases, during documentation updates
- **Key scripts**: Modern `cli.ts`, legacy `generate-docs.js`

### 🔧 Maintenance Scripts

- **Purpose**: Code refactoring and cleanup
- **When to use**: During major refactors, maintenance cycles
- **Key scripts**: `fix-typescript-errors.js`, `reorganize-components.js`

### 🚀 Release Scripts

- **Purpose**: Release automation and validation
- **When to use**: During release process
- **Key scripts**: `release.js`, `validate-release.js`

## Migration Checklist

- ✅ Reorganized all scripts into purpose-driven directories
- ✅ Created comprehensive README files for each directory
- ✅ Preserved all existing functionality
- ✅ Tested modern documentation generator works with new paths
- ✅ Updated import paths where necessary
- ✅ Documented migration process

## Next Steps

1. **Update package.json scripts** to use new paths
2. **Update CI/CD pipelines** to reference new script locations
3. **Update team documentation** with new script organization
4. **Consider deprecating legacy scripts** in favor of modern alternatives
