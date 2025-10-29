# LLM Documentation Generator CLI

A comprehensive command-line interface for generating LLM-optimized documentation from the SV Project Helper UI Library.

## Installation

The CLI is included in the documentation generator package. No separate installation required.

## Quick Start

```bash
# Generate documentation with default settings
npm run generate

# Watch mode for automatic regeneration
npm run generate:watch

# Generate with validation
npm run generate:validate

# Preview what would be generated (dry run)
npm run generate:dry-run
```

## CLI Commands

### Basic Usage

```bash
# Using npm scripts (recommended)
npm run generate                    # Generate with defaults
npm run generate:watch             # Watch mode
npm run generate:validate          # Generate with validation
npm run generate:dry-run           # Dry run

# Using CLI directly
npx tsx cli.ts [options]
```

### Command Line Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--config` | `-c` | Configuration file path | - |
| `--output` | `-o` | Output file path | `LLM.md` |
| `--source` | `-s` | Source directory path | `src/lib` |
| `--watch` | `-w` | Watch mode for auto-regeneration | `false` |
| `--verbose` | `-v` | Verbose logging | `false` |
| `--validate` | - | Run validation after generation | `false` |
| `--dry-run` | - | Show what would be done | `false` |
| `--format` | - | Output format (markdown/json) | `markdown` |
| `--include` | - | Include patterns (comma-separated) | See config |
| `--exclude` | - | Exclude patterns (comma-separated) | See config |
| `--max-file-size` | - | Max file size in bytes | `1048576` |
| `--timeout` | - | Analysis timeout in ms | `30000` |
| `--help` | `-h` | Show help | - |
| `--version` | - | Show version | - |

## Configuration

### Configuration File

Create a `docs.config.json` file to customize generation settings:

```json
{
  "sourceDirectory": "src/lib",
  "outputPath": "LLM.md",
  "componentDirectories": [
    "src/lib/ui/atoms",
    "src/lib/ui/molecules",
    "src/lib/ui/organisms",
    "src/lib/ui/layouts",
    "src/lib/ui/utils",
    "src/lib/ui/hooks",
    "src/lib/ui/theme"
  ],
  "includePatterns": [
    "**/*.svelte",
    "**/*.ts",
    "**/*.js",
    "**/*.css"
  ],
  "excludePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/.svelte-kit/**",
    "**/*.test.*",
    "**/*.spec.*"
  ],
  "verbose": false,
  "showProgress": true,
  "maxFileSize": 1048576,
  "analysisTimeout": 30000
}
```

### Environment Variables

You can also use environment variables:

```bash
export LLM_DOCS_SOURCE="src/lib"
export LLM_DOCS_OUTPUT="docs/API.md"
export LLM_DOCS_VERBOSE="true"
```

## Usage Examples

### Basic Generation

```bash
# Generate documentation with default settings
npm run generate

# Generate with custom output path
npx tsx cli.ts --output docs/API.md

# Generate with verbose logging
npx tsx cli.ts --verbose
```

### Watch Mode

```bash
# Start watch mode
npm run generate:watch

# Watch mode with custom config
npx tsx cli.ts --watch --config custom.config.json

# Watch mode with validation
npx tsx cli.ts --watch --validate --verbose
```

### Advanced Usage

```bash
# Custom source and output
npx tsx cli.ts --source src/components --output components.md

# JSON output format
npx tsx cli.ts --format json --output api.json

# Custom include/exclude patterns
npx tsx cli.ts --include "**/*.svelte,**/*.ts" --exclude "**/*.test.*"

# Performance tuning
npx tsx cli.ts --max-file-size 2097152 --timeout 60000
```

### Validation and Quality Assurance

```bash
# Generate with comprehensive validation
npm run generate:validate

# Dry run to preview what would be generated
npm run generate:dry-run

# Validate existing documentation
npx tsx cli.ts --validate --dry-run
```

## Output Formats

### Markdown (Default)

Generates a comprehensive `LLM.md` file optimized for Large Language Model consumption with:

- Structured sections with clear headings
- Complete API documentation for all components
- Usage examples and best practices
- Accessibility guidelines
- Cross-references and navigation aids

### JSON

Generates a structured JSON file containing all documentation data:

```bash
npx tsx cli.ts --format json --output api.json
```

The JSON format includes the same comprehensive data as markdown but in a machine-readable format for integration with other tools.

## Watch Mode

Watch mode automatically regenerates documentation when source files change:

```bash
npm run generate:watch
```

Features:
- **File Watching**: Monitors all source files for changes
- **Debouncing**: Prevents excessive regeneration from rapid file changes
- **Error Recovery**: Continues watching even if generation fails
- **Progress Tracking**: Shows real-time generation progress

### Watch Mode Configuration

```json
{
  "watchMode": {
    "debounceMs": 500,
    "ignoreInitial": false,
    "followSymlinks": false
  }
}
```

## Validation

The CLI includes comprehensive validation to ensure documentation quality:

### Validation Checks

- **Completeness**: All components are documented
- **API Accuracy**: Props, events, and types match source code
- **Example Syntax**: Code examples are syntactically correct
- **Accessibility**: ARIA attributes and keyboard navigation
- **Cross-References**: Internal links are valid

### Validation Scores

- **Completeness Score**: 0-100% based on documented vs. total components
- **Quality Score**: Overall documentation quality rating
- **Error/Warning Counts**: Specific issues found

### Running Validation

```bash
# Generate with validation
npm run generate:validate

# Validation-only (no generation)
npx tsx cli.ts --validate --dry-run
```

## Troubleshooting

### Common Issues

**"Source directory does not exist"**
```bash
# Check your source path
npx tsx cli.ts --source src/lib --dry-run
```

**"Analysis timeout"**
```bash
# Increase timeout for large codebases
npx tsx cli.ts --timeout 60000
```

**"Memory issues with large files"**
```bash
# Reduce max file size
npx tsx cli.ts --max-file-size 512000
```

### Debug Mode

Enable verbose logging for detailed information:

```bash
npx tsx cli.ts --verbose --dry-run
```

### Performance Optimization

For large codebases:

```json
{
  "maxFileSize": 512000,
  "analysisTimeout": 60000,
  "excludePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/*.test.*",
    "**/*.spec.*",
    "**/*.d.ts"
  ]
}
```

## Integration

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Generate Documentation
  run: |
    cd scripts/docs
    npm install
    npm run generate:validate
    
- name: Upload Documentation
  uses: actions/upload-artifact@v3
  with:
    name: llm-documentation
    path: LLM.md
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "cd scripts/docs && npm run generate:validate"
    }
  }
}
```

### NPM Scripts Integration

Add to your main `package.json`:

```json
{
  "scripts": {
    "docs:generate": "cd scripts/docs && npm run generate",
    "docs:watch": "cd scripts/docs && npm run generate:watch",
    "docs:validate": "cd scripts/docs && npm run generate:validate"
  }
}
```

## API Reference

The CLI is built on top of the DocumentationGenerator class and provides a user-friendly interface to all its capabilities. For programmatic usage, you can import and use the classes directly:

```typescript
import { DocumentationGenerator } from './core/DocumentationGenerator.ts';
import { createConfig } from './config/GeneratorConfig.ts';

const config = createConfig({ verbose: true });
const generator = new DocumentationGenerator(config);
const docs = await generator.generateDocumentation('src/lib');
```