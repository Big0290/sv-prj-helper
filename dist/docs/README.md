# Component Documentation System

A comprehensive documentation system for the SV Project Helper UI Library that provides standardized templates, automated parsing, and interactive documentation generation.

## Features

- **Standardized Templates**: Consistent documentation structure across all components
- **Automated Parsing**: Extract component information from TypeScript interfaces
- **Interactive Examples**: Generate live code examples with proper syntax highlighting
- **Accessibility Documentation**: Comprehensive accessibility guidelines and features
- **CLI Tools**: Command-line interface for managing documentation
- **Validation**: Automated validation of documentation completeness and accuracy

## Quick Start

### Generate Documentation

```bash
# Generate documentation for all components
npm run docs:generate

# Generate documentation for a specific component
npm run docs:generate Button

# Or use the CLI directly
node scripts/docs-cli.js generate Button
```

### Validate Documentation

```bash
# Validate all component documentation
npm run docs:validate

# List all components
npm run docs:list
```

## Documentation Structure

Each component follows a standardized documentation structure:

```markdown
# ComponentName

Brief description of the component

**Category:** atoms | **Import:** `@sv-project-helper/ui`

## Overview
Detailed description and purpose

## Installation
Installation instructions

## Basic Usage
Simple usage example with import

## Props
Table of all component properties

## Events
Table of component events

## Slots
Table of component slots

## Accessibility
Comprehensive accessibility information

## Examples
Multiple usage examples with different scenarios
```

## API Reference

### Types

#### ComponentDocumentation
Main interface for component documentation metadata.

```typescript
interface ComponentDocumentation {
  name: string;
  description: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'layouts' | 'utils' | 'hooks' | 'theme';
  importPath: string;
  props: PropDefinition[];
  events: EventDefinition[];
  slots: SlotDefinition[];
  examples: CodeExample[];
  accessibility: AccessibilityInfo;
  version?: string;
  lastUpdated?: string;
}
```

#### PropDefinition
Interface for component property documentation.

```typescript
interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  required: boolean;
  description: string;
}
```

### Functions

#### generateComponentReadme(doc: ComponentDocumentation): string
Generates a complete README.md content from component documentation.

#### parsePropsFromInterface(interfaceContent: string): PropDefinition[]
Parses TypeScript interface to extract component props.

#### createComponentDocumentation(name, category, importPath, typeContent, componentContent): ComponentDocumentation
Creates complete documentation from component files.

## CLI Commands

### Generate Documentation

```bash
# Generate for all components
node scripts/docs-cli.js generate

# Generate for specific component
node scripts/docs-cli.js generate Button
```

### Validate Documentation

```bash
# Validate all documentation
node scripts/docs-cli.js validate
```

### List Components

```bash
# List all components by category
node scripts/docs-cli.js list
```

## Adding New Components

When adding a new component, follow these steps:

1. **Create Component Structure**:
   ```
   src/lib/components/category/ComponentName/
   ├── ComponentName.svelte
   ├── ComponentName.types.ts
   ├── index.ts
   └── README.md (generated)
   ```

2. **Define TypeScript Interfaces**:
   ```typescript
   // ComponentName.types.ts
   export interface ComponentNameProps {
     variant?: 'primary' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     children: Snippet;
   }

   export interface ComponentNameEvents {
     click: CustomEvent<MouseEvent>;
   }

   export interface ComponentNameSlots {
     default: {};
   }
   ```

3. **Generate Documentation**:
   ```bash
   npm run docs:generate ComponentName
   ```

4. **Validate Documentation**:
   ```bash
   npm run docs:validate
   ```

## Customizing Documentation

### Adding Custom Examples

You can add custom examples to the documentation by modifying the generated README or by extending the documentation generator:

```typescript
const customExamples: CodeExample[] = [
  {
    title: 'Advanced Usage',
    description: 'Complex example with multiple props',
    code: `<ComponentName variant="primary" size="lg">
  Advanced content
</ComponentName>`,
    language: 'svelte',
    category: 'advanced'
  }
];
```

### Extending Accessibility Information

Add comprehensive accessibility information:

```typescript
const accessibility: AccessibilityInfo = {
  keyboardNavigation: [
    'Tab - Focus the component',
    'Enter/Space - Activate',
    'Escape - Close/Cancel'
  ],
  ariaAttributes: [
    'aria-label - Accessible name',
    'aria-expanded - Expansion state',
    'role - Component role'
  ],
  screenReaderSupport: 'Full screen reader support with proper announcements',
  focusManagement: 'Proper focus management and visible focus indicators',
  guidelines: [
    'Always provide meaningful labels',
    'Ensure sufficient color contrast',
    'Support keyboard navigation'
  ]
};
```

## Best Practices

### Documentation Writing

1. **Clear Descriptions**: Write clear, concise descriptions that explain the component's purpose
2. **Complete Examples**: Provide examples for common use cases
3. **Accessibility First**: Always document accessibility features and guidelines
4. **Keep Updated**: Regenerate documentation when component APIs change

### Component Development

1. **TypeScript Interfaces**: Always define proper TypeScript interfaces for props, events, and slots
2. **Accessibility**: Include proper ARIA attributes and keyboard navigation
3. **Consistent Naming**: Follow consistent naming conventions across components
4. **Documentation Comments**: Add JSDoc comments to interfaces for better auto-generation

## Troubleshooting

### Common Issues

**Documentation not generating properly**
- Ensure TypeScript interfaces are properly defined
- Check that component files follow the expected structure
- Verify file paths and naming conventions

**Validation errors**
- Check that all required sections are present in README files
- Ensure proper markdown formatting
- Verify that examples compile correctly

**Missing accessibility information**
- Add proper ARIA attributes to components
- Include keyboard event handlers
- Document focus management

### Getting Help

For issues with the documentation system:

1. Check the CLI help: `node scripts/docs-cli.js help`
2. Validate your documentation: `npm run docs:validate`
3. Review existing working examples (like Button component)
4. Check the TypeScript interfaces for proper structure

## Contributing

When contributing to the documentation system:

1. Follow the existing code style and patterns
2. Add tests for new functionality
3. Update this README for new features
4. Ensure all existing documentation still validates

---

**Version:** 1.0.0 | **Last Updated:** 2025-10-27

Part of [SV Project Helper UI Library](../README.md)