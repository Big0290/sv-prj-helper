# Technology Stack

## Core Technologies
- **Svelte 5**: Latest version with runes and snippets
- **TypeScript**: Full type safety with strict configuration
- **SvelteKit**: For development and packaging
- **Vite**: Build tool and dev server

## Key Dependencies
- **CodeMirror 6**: Code editor functionality
- **ZXing Library**: Barcode/QR code scanning
- **JSBarcode**: Barcode generation
- **QRCode**: QR code generation
- **Marked**: Markdown parsing
- **PrismJS**: Syntax highlighting

## Build System
- **Package Manager**: npm
- **Bundler**: Vite with SvelteKit
- **Output**: ES modules with TypeScript declarations
- **Packaging**: `@sveltejs/package` for library distribution

## Common Commands
```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run package          # Package library for distribution
npm run preview          # Preview built package

# Quality Assurance
npm run check            # Type checking with svelte-check
npm run check:watch      # Type checking in watch mode
```

## Configuration Files
- `svelte.config.js`: SvelteKit configuration with auto adapter
- `tsconfig.json`: TypeScript strict mode with bundler resolution
- `vite.config.ts`: Vite build configuration
- `package.json`: Library exports with dual ESM/types support

## Development Standards
- ES modules only (`"type": "module"`)
- Strict TypeScript configuration
- Svelte 5 runes for reactivity
- CSS custom properties for theming
- Accessibility-first development