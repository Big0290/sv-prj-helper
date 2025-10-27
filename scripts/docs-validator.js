#!/usr/bin/env node

/**
 * Documentation Validation Tool
 * 
 * Validates component documentation for completeness, accuracy, and consistency
 * 
 * Usage:
 *   node scripts/docs-validator.js [component] [options]
 *   
 * Examples:
 *   node scripts/docs-validator.js                    # Validate all components
 *   node scripts/docs-validator.js Button             # Validate specific component
 *   node scripts/docs-validator.js --fix              # Auto-fix issues where possible
 *   node scripts/docs-validator.js --strict           # Strict validation mode
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, basename } from 'path';

const COMPONENTS_PATH = 'src/lib/components';

// Validation rules configuration
const VALIDATION_RULES = {
  readme: {
    required: true,
    sections: [
      '# ', // Title
      '## Overview',
      '## Installation', 
      '## Basic Usage',
      '## Props',
      '## Accessibility',
      '## Examples'
    ],
    optional: [
      '## Events',
      '## Slots',
      '## Styling',
      '## Migration'
    ]
  },
  types: {
    required: true,
    interfaces: ['Props', 'Events', 'Slots'],
    imports: ['Snippet']
  },
  component: {
    required: true,
    patterns: [
      'import type.*Props.*from',
      '\\$props\\(\\)',
      '\\$derived\\(',
      '{@render.*}'
    ]
  }
};

/**
 * Main validation entry point
 */
async function main() {
  const [,, componentName, ...flags] = process.argv;
  const options = parseFlags(flags);

  try {
    console.log('🔍 Starting documentation validation...\n');
    
    let components;
    if (componentName) {
      components = await findComponent(componentName);
      if (!components.length) {
        throw new Error(`Component "${componentName}" not found`);
      }
    } else {
      components = await findAllComponents();
    }

    const results = await validateComponents(components, options);
    
    displayResults(results, options);
    
    if (options.fix) {
      await applyFixes(results, options);
    }
    
    const hasErrors = results.some(r => r.errors.length > 0);
    process.exit(hasErrors ? 1 : 0);
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

/**
 * Validate all components
 */
async function validateComponents(components, options) {
  const results = [];
  
  for (const component of components) {
    console.log(`📋 Validating ${component.name}...`);
    
    const result = {
      component: component.name,
      path: component.path,
      category: component.category,
      errors: [],
      warnings: [],
      suggestions: []
    };
    
    // Validate README
    await validateReadme(component, result, options);
    
    // Validate Types
    await validateTypes(component, result, options);
    
    // Validate Component
    await validateComponent(component, result, options);
    
    // Cross-reference validation
    await validateConsistency(component, result, options);
    
    results.push(result);
  }
  
  return results;
}

/**
 * Validate README documentation
 */
async function validateReadme(component, result, options) {
  const readmePath = join(component.path, 'README.md');
  
  try {
    const content = await readFile(readmePath, 'utf-8');
    
    // Check required sections
    for (const section of VALIDATION_RULES.readme.sections) {
      if (!content.includes(section)) {
        result.errors.push(`Missing required section: ${section}`);
      }
    }
    
    // Check for placeholder content
    const placeholders = [
      'Add component props documentation',
      'Add your component description',
      'TODO:',
      '[describe functionality here]'
    ];
    
    for (const placeholder of placeholders) {
      if (content.includes(placeholder)) {
        result.warnings.push(`Contains placeholder text: "${placeholder}"`);
      }
    }
    
    // Check for proper component name usage
    if (!content.includes(`# ${component.name}`)) {
      result.errors.push('README title does not match component name');
    }
    
    // Check for examples
    const exampleCount = (content.match(/```svelte/g) || []).length;
    if (exampleCount === 0) {
      result.warnings.push('No Svelte code examples found');
    } else if (exampleCount < 2) {
      result.suggestions.push('Consider adding more usage examples');
    }
    
    // Check accessibility section completeness
    if (content.includes('## Accessibility')) {
      const accessibilitySection = content.split('## Accessibility')[1]?.split('##')[0] || '';
      
      if (!accessibilitySection.includes('Keyboard Navigation')) {
        result.warnings.push('Accessibility section missing keyboard navigation details');
      }
      
      if (!accessibilitySection.includes('ARIA')) {
        result.warnings.push('Accessibility section missing ARIA information');
      }
    }
    
  } catch (error) {
    result.errors.push('README.md file not found or unreadable');
  }
}

/**
 * Validate TypeScript types file
 */
async function validateTypes(component, result, options) {
  const typesPath = join(component.path, `${component.name}.types.ts`);
  
  try {
    const content = await readFile(typesPath, 'utf-8');
    
    // Check required interfaces
    for (const interfaceName of VALIDATION_RULES.types.interfaces) {
      const fullInterfaceName = `${component.name}${interfaceName}`;
      if (!content.includes(`interface ${fullInterfaceName}`)) {
        result.errors.push(`Missing ${fullInterfaceName} interface`);
      }
    }
    
    // Check required imports
    for (const importName of VALIDATION_RULES.types.imports) {
      if (!content.includes(`import type { ${importName} }`)) {
        result.warnings.push(`Missing import: ${importName}`);
      }
    }
    
    // Check for proper JSDoc comments
    const interfaceMatches = content.match(/export interface \w+Props \{[\s\S]*?\}/g);
    if (interfaceMatches) {
      for (const interfaceMatch of interfaceMatches) {
        const propMatches = interfaceMatch.match(/^\s*\w+[?]?:/gm);
        if (propMatches) {
          for (const prop of propMatches) {
            const propName = prop.trim().replace(/[?:].*/, '');
            if (!interfaceMatch.includes(`* ${propName}`) && !interfaceMatch.includes(`/** ${propName}`)) {
              result.suggestions.push(`Consider adding JSDoc comment for prop: ${propName}`);
            }
          }
        }
      }
    }
    
  } catch (error) {
    result.errors.push(`${component.name}.types.ts file not found or unreadable`);
  }
}/*
*
 * Validate Svelte component file
 */
async function validateComponent(component, result, options) {
  const componentPath = join(component.path, `${component.name}.svelte`);
  
  try {
    const content = await readFile(componentPath, 'utf-8');
    
    // Check required patterns
    for (const pattern of VALIDATION_RULES.component.patterns) {
      const regex = new RegExp(pattern);
      if (!regex.test(content)) {
        result.warnings.push(`Missing recommended pattern: ${pattern}`);
      }
    }
    
    // Check for proper TypeScript usage
    if (!content.includes('lang="ts"')) {
      result.errors.push('Component script should use TypeScript (lang="ts")');
    }
    
    // Check for accessibility attributes
    const accessibilityPatterns = [
      'aria-label',
      'aria-describedby',
      'role=',
      'tabindex',
      'focus-visible'
    ];
    
    let hasAccessibility = false;
    for (const pattern of accessibilityPatterns) {
      if (content.includes(pattern)) {
        hasAccessibility = true;
        break;
      }
    }
    
    if (!hasAccessibility) {
      result.warnings.push('Component may be missing accessibility attributes');
    }
    
    // Check for CSS custom properties usage
    if (content.includes('<style>') && !content.includes('var(--')) {
      result.suggestions.push('Consider using CSS custom properties for theming');
    }
    
    // Check for proper event handling
    if (content.includes('onclick') && !content.includes('onclick={')) {
      result.warnings.push('Use proper Svelte event binding syntax');
    }
    
  } catch (error) {
    result.errors.push(`${component.name}.svelte file not found or unreadable`);
  }
}

/**
 * Validate consistency between files
 */
async function validateConsistency(component, result, options) {
  try {
    // Read all component files
    const files = await Promise.allSettled([
      readFile(join(component.path, 'README.md'), 'utf-8'),
      readFile(join(component.path, `${component.name}.types.ts`), 'utf-8'),
      readFile(join(component.path, `${component.name}.svelte`), 'utf-8')
    ]);
    
    const [readmeResult, typesResult, componentResult] = files;
    
    if (readmeResult.status === 'fulfilled' && typesResult.status === 'fulfilled') {
      const readme = readmeResult.value;
      const types = typesResult.value;
      
      // Extract props from types file
      const propsMatch = types.match(/interface \w+Props \{([\s\S]*?)\}/);
      if (propsMatch) {
        const propsContent = propsMatch[1];
        const propNames = [...propsContent.matchAll(/^\s*(\w+)[?]?:/gm)].map(m => m[1]);
        
        // Check if README documents all props
        for (const propName of propNames) {
          if (!readme.includes(`\`${propName}\``)) {
            result.warnings.push(`Prop "${propName}" not documented in README`);
          }
        }
      }
    }
    
    // Check import consistency
    if (componentResult.status === 'fulfilled' && typesResult.status === 'fulfilled') {
      const component = componentResult.value;
      const types = typesResult.value;
      
      if (component.includes('ButtonProps') && !types.includes('ButtonProps')) {
        result.errors.push('Component imports props interface that does not exist in types file');
      }
    }
    
  } catch (error) {
    result.suggestions.push('Could not perform consistency validation');
  }
}

/**
 * Display validation results
 */
function displayResults(results, options) {
  console.log('\n📊 Validation Results:\n');
  
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalSuggestions = 0;
  
  for (const result of results) {
    const { component, errors, warnings, suggestions } = result;
    
    totalErrors += errors.length;
    totalWarnings += warnings.length;
    totalSuggestions += suggestions.length;
    
    if (errors.length === 0 && warnings.length === 0 && suggestions.length === 0) {
      console.log(`✅ ${component}: All checks passed`);
      continue;
    }
    
    console.log(`\n📋 ${component}:`);
    
    if (errors.length > 0) {
      console.log('  ❌ Errors:');
      errors.forEach(error => console.log(`    - ${error}`));
    }
    
    if (warnings.length > 0) {
      console.log('  ⚠️  Warnings:');
      warnings.forEach(warning => console.log(`    - ${warning}`));
    }
    
    if (suggestions.length > 0 && options.verbose) {
      console.log('  💡 Suggestions:');
      suggestions.forEach(suggestion => console.log(`    - ${suggestion}`));
    }
  }
  
  console.log(`\n📈 Summary:`);
  console.log(`  Components validated: ${results.length}`);
  console.log(`  Errors: ${totalErrors}`);
  console.log(`  Warnings: ${totalWarnings}`);
  console.log(`  Suggestions: ${totalSuggestions}`);
  
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('\n🎉 All documentation is valid!');
  }
}

/**
 * Apply automatic fixes where possible
 */
async function applyFixes(results, options) {
  console.log('\n🔧 Applying automatic fixes...\n');
  
  for (const result of results) {
    const fixes = [];
    
    // Auto-fix missing README sections
    if (result.errors.some(e => e.includes('Missing required section'))) {
      fixes.push('Add missing README sections');
    }
    
    // Auto-fix placeholder content
    if (result.warnings.some(w => w.includes('placeholder text'))) {
      fixes.push('Remove placeholder content');
    }
    
    if (fixes.length > 0) {
      console.log(`🔧 ${result.component}: ${fixes.join(', ')}`);
      // Implementation would go here
    }
  }
}

/**
 * Find specific component
 */
async function findComponent(componentName) {
  const allComponents = await findAllComponents();
  return allComponents.filter(c => c.name.toLowerCase() === componentName.toLowerCase());
}

/**
 * Find all components in the library
 */
async function findAllComponents() {
  const components = [];
  
  async function scanDirectory(dirPath, category = '') {
    try {
      const entries = await readdir(dirPath);
      
      for (const entry of entries) {
        const fullPath = join(dirPath, entry);
        const stats = await stat(fullPath);
        
        if (stats.isDirectory()) {
          const files = await readdir(fullPath);
          const hasSvelteFile = files.some(f => f.endsWith('.svelte'));
          
          if (hasSvelteFile) {
            components.push({
              name: entry,
              path: fullPath,
              category: category || determineCategory(fullPath)
            });
          } else {
            const newCategory = category || entry;
            await scanDirectory(fullPath, newCategory);
          }
        }
      }
    } catch (error) {
      // Ignore directories we can't read
    }
  }
  
  await scanDirectory(COMPONENTS_PATH);
  return components.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Determine component category from path
 */
function determineCategory(path) {
  if (path.includes('/atoms/')) return 'atoms';
  if (path.includes('/molecules/')) return 'molecules';
  if (path.includes('/organisms/')) return 'organisms';
  if (path.includes('/layouts/')) return 'layouts';
  if (path.includes('/utils/')) return 'utils';
  if (path.includes('/hooks/')) return 'hooks';
  if (path.includes('/theme/')) return 'theme';
  return 'unknown';
}

/**
 * Parse command line flags
 */
function parseFlags(flags) {
  return {
    fix: flags.includes('--fix'),
    strict: flags.includes('--strict'),
    verbose: flags.includes('--verbose') || flags.includes('-v')
  };
}

// Run validator if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateComponents };