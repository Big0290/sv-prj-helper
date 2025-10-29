# LLM Documentation Generator

A comprehensive documentation generation system for the SV Project Helper UI Library, optimized for Large Language Model (LLM) consumption.

## Overview

This system automatically analyzes Svelte 5 components and generates structured markdown documentation that is optimized for LLM understanding and usage. The generated documentation includes component APIs, usage patterns, accessibility guidelines, and comprehensive examples.

## Features

- **Svelte 5 Native**: Full support for Svelte 5 runes, snippets, and modern patterns
- **TypeScript Analysis**: Extracts type information from TypeScript interfaces and props
- **Accessibility Focus**: WCAG 2.1 AA compliance analysis and documentation
- **LLM Optimized**: Strategic markers and structure for optimal LLM consumption
- **Comprehensive Coverage**: Analyzes atoms, molecules, organisms, layouts, utils, hooks, and themes
- **Error Recovery**: Graceful handling of parsing errors with fallback documentation

## Quick Start

### Simple Generation

For quick documentation generation, use the simple generator:

```bash
node scripts/docs/simple-generate.js
```

This will:
- Scan all components in `src/lib/ui/`
- Generate basic documentation for each component
- Output to `LLM.md` in the project root

### Advanced Generation

For full-featured documentation with TypeScript analysis:

```bash
# Note: Requires TypeScript compilation or ts-node
npx ts-node scripts/docs/cli.ts
```

### Testing the System

Run the test suite to verify everything is working:

```bash
node scripts/docs/test-generation.js
```

## Architecture

### Core Components

- **DocumentationGenerator**: Main orchestrator that coordinates all analysis modules
- **ComponentScanner**: Discovers and categorizes components across the library
- **SvelteComponentParser**: Parses Svelte components to extract API information
- **TypeScriptExtractor**: Analyzes TypeScript interfaces and type definitions
- **CSSAnalyzer**: Extracts styling information and glassmorphism patterns
- **AccessibilityAnalyzer**: Analyzes accessibility features and WCAG compliance
- **LLMMarkdownAssembler**: Combines all documentation into LLM-optimized markdown

### Analysis Modules

- **ExampleGenerator**: Creates usage examples and code samples
- **UsagePatternGenerator**: Generates common implementation patterns
- **AccessibilityDocumentationGenerator**: Creates comprehensive accessibility guides
- **DesignSystemDocumenter**: Documents theme system and design patterns

### Utilities

- **FileUtils**: File system operations with pattern matching
- **Logger**: Structured logging with progress tracking
- **ValidationSystem**: Quality assurance and completeness checking

## Configuration

The system uses `GeneratorConfig` for configuration:

```typescript
{
  sourceDirectory: 'src/lib',
  outputPath: 'LLM.md',
  componentDirectories: [
    'src/lib/ui/atoms',
    'src/lib/ui/molecules',
    'src/lib/ui/organisms',
    'src/lib/ui/layouts',
    'src/lib/ui/utils',
    'src/lib/ui/hooks',
    'src/lib/ui/theme'
  ],
  includePatterns: ['**/*.svelte', '**/*.ts', '**/*.js'],
  excludePatterns: ['**/*.test.*', '**/*.spec.*'],
  verbose: false,
  maxFileSize: 1048576, // 1MB
  analysisTimeout: 30000 // 30 seconds
}
```

## Generated Documentation Structure

The generated `LLM.md` includes:

### Header Section
- Library overview and architecture
- Key features and development standards
- LLM usage instructions and navigation markers

### Quick Reference
- Installation instructions
- Basic usage patterns
- Common troubleshooting tips

### Design System
- Theme system documentation
- Color, spacing, and typography scales
- Glassmorphism effects and implementation
- Responsive design patterns

### Component Reference
Organized by atomic design categories:
- **Atoms**: Basic building blocks (Button, Input, Text)
- **Molecules**: Composed components (Card, Alert, Menu)
- **Organisms**: Complex components (DataTable, Forms)
- **Layouts**: Page-level layouts and containers
- **Utils**: Utility components (Portal, FocusTrap)
- **Hooks**: Svelte 5 rune-based hooks
- **Theme**: Theme providers and utilities

### Accessibility Guide
- WCAG 2.1 AA compliance information
- Keyboard navigation patterns
- Screen reader support
- Focus management guidelines

### Troubleshooting
- Common issues and solutions
- FAQ section
- Support resources

## LLM Optimization Features

The generated documentation includes strategic markers for LLM navigation:

- `<!-- SECTION_TYPE:name -->` - Section navigation markers
- `<!-- COMPONENT_TYPE:category -->` - Component type indicators
- `<!-- CODE_BLOCK:language -->` - Code block language hints
- `<!-- API_SECTION -->` - API reference markers
- `<!-- EXAMPLES_SECTION -->` - Usage example markers
- `<!-- A11Y_SECTION -->` - Accessibility information markers

## Component Analysis

For each component, the system extracts:

### API Information
- Props with types, defaults, and descriptions
- Events with payload types
- Slots with descriptions
- Methods with parameters and return types

### Styling Information
- CSS custom properties
- Variant classes
- Theme integration
- Glassmorphism effects

### Accessibility Features
- ARIA attributes and roles
- Keyboard navigation patterns
- Focus management
- Screen reader support
- WCAG compliance level

### Usage Examples
- Basic usage patterns
- Advanced configurations
- Event handling examples
- Accessibility implementations

## Error Handling

The system includes comprehensive error recovery:

- **Parse Errors**: Creates fallback documentation when component parsing fails
- **Type Errors**: Graceful handling of TypeScript analysis failures
- **File Errors**: Continues processing when individual files can't be read
- **Timeout Protection**: Prevents hanging on complex analysis operations

## Development

### Adding New Analyzers

To add a new analysis module:

1. Create the analyzer class in `analyzers/`
2. Implement the required interface methods
3. Add to `DocumentationGenerator` constructor
4. Integrate into the analysis pipeline

### Extending Documentation

To add new documentation sections:

1. Create generator in `generators/`
2. Add to `LLMMarkdownAssembler`
3. Update the documentation structure types
4. Add LLM optimization markers

### Testing

Run the test suite to verify changes:

```bash
node scripts/docs/test-generation.js
```

## Performance

The system is optimized for performance:

- **Parallel Processing**: Components analyzed concurrently
- **Timeout Protection**: Prevents hanging on complex files
- **Memory Management**: Streaming file processing for large codebases
- **Caching**: Results cached to avoid redundant analysis

## Output Statistics

The generated documentation typically includes:

- **Components**: 100+ components analyzed
- **Size**: 50-100KB of structured markdown
- **Tokens**: ~50,000-100,000 estimated tokens for LLM consumption
- **Sections**: 8-12 major sections with subsections
- **Examples**: 200+ code examples and usage patterns

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure TypeScript configuration is correct
2. **Missing Components**: Check include/exclude patterns
3. **Parse Failures**: Review component syntax and structure
4. **Performance Issues**: Adjust timeout and file size limits

### Debug Mode

Enable verbose logging for detailed analysis:

```javascript
const config = {
  verbose: true,
  showProgress: true
};
```

## Contributing

When contributing to the documentation system:

1. Follow TypeScript strict mode requirements
2. Add comprehensive error handling
3. Include progress tracking for long operations
4. Update tests for new functionality
5. Maintain LLM optimization features

## License

This documentation system is part of the SV Project Helper UI Library and follows the same license terms.