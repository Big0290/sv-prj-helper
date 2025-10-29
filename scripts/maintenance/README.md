# Maintenance Scripts

Code maintenance, refactoring, and cleanup utilities.

## Scripts

### Interface Management
- `add-local-interfaces.js` - Adds missing local TypeScript interfaces
- `add-remaining-interfaces.js` - Completes interface definitions across components

### Import Management
- `fix-all-interface-imports.js` - Fixes interface import paths
- `fix-import-paths.js` - General import path corrections
- `fix-remaining-imports.js` - Cleanup remaining import issues

### Code Fixes
- `fix-typescript-errors.js` - Automated TypeScript error resolution
- `fix-line-clamp.js` - Fixes CSS line-clamp implementations

### Structure Management
- `reorganize-components.js` - Reorganizes component directory structure

## Usage

These scripts are typically run as one-off maintenance tasks:

```bash
# Fix TypeScript errors
node scripts/maintenance/fix-typescript-errors.js

# Reorganize component structure
node scripts/maintenance/reorganize-components.js

# Fix import paths
node scripts/maintenance/fix-import-paths.js
```

## Safety

⚠️ **Important**: These scripts modify source code. Always:
1. Commit your changes before running maintenance scripts
2. Review the changes after running
3. Test the application after modifications

## Automation

Some maintenance tasks can be automated in CI/CD:

```json
{
  "scripts": {
    "maintenance:imports": "node scripts/maintenance/fix-import-paths.js",
    "maintenance:interfaces": "node scripts/maintenance/add-local-interfaces.js",
    "maintenance:typescript": "node scripts/maintenance/fix-typescript-errors.js"
  }
}
```