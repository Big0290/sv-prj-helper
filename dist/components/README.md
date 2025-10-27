# Component Library Structure

This directory contains the reorganized component library structure as specified in the requirements. The new structure provides:

## Folder Organization

```
src/lib/components/
├── atoms/           # Basic building blocks
│   ├── Button/
│   │   ├── Button.svelte
│   │   ├── Button.types.ts
│   │   ├── README.md
│   │   └── index.ts
│   └── [other atoms...]
├── molecules/       # Composed components
├── organisms/       # Complex components
│   ├── barcode/
│   ├── chat/
│   ├── data/
│   ├── editor/
│   ├── forms/
│   ├── interactive/
│   ├── media/
│   ├── navigation/
│   ├── table/
│   └── video/
├── layouts/         # Layout components
├── utils/           # Utility components
├── theme/           # Theme components
├── hooks/           # Svelte 5 hooks
└── index.ts         # Main export file
```

## Component Structure Standard

Each component follows this standardized structure:

- `ComponentName.svelte` - The main component file
- `ComponentName.types.ts` - TypeScript type definitions
- `README.md` - Component documentation
- `index.ts` - Component exports

## Features Implemented

✅ **Standardized folder structure** - Each component category has clear hierarchy
✅ **Individual component folders** - Each component has its own dedicated folder
✅ **TypeScript type definitions** - Separate `.types.ts` files for each component
✅ **Component documentation** - README files with usage examples and API docs
✅ **Backward compatibility** - Existing import paths continue to work
✅ **Centralized exports** - Main index files for easy importing

## Usage

### New Structure (Recommended)
```typescript
import { Button } from '@sv-project-helper/ui/components/atoms/Button';
import type { ButtonProps } from '@sv-project-helper/ui/components/atoms/Button';
```

### Legacy Structure (Still Supported)
```typescript
import { Button } from '@sv-project-helper/ui';
```

## Migration Status

The component reorganization has been completed with:
- 28 atom components reorganized
- 18 molecule components reorganized  
- 95+ organism components reorganized across 10 subcategories
- 3 layout components reorganized
- 7 utility components reorganized
- 1 theme component reorganized
- 5 hooks reorganized

All components maintain backward compatibility while providing the new organized structure for future development.