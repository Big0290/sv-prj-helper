#!/usr/bin/env node

/**
 * CLI tool for managing component documentation
 * 
 * Usage:
 *   node scripts/docs-cli.js generate [component-name]
 *   node scripts/docs-cli.js validate
 *   node scripts/docs-cli.js list
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, basename } from 'path';
import { generateButtonDocumentation } from './generate-docs.js';

const COMPONENTS_PATH = 'src/lib/components';

/**
 * Main CLI entry point
 */
async function main() {
  const [,, command, ...args] = process.argv;

  try {
    switch (command) {
      case 'generate':
        await handleGenerate(args[0]);
        break;
      case 'validate':
        await handleValidate();
        break;
      case 'list':
        await handleList();
        break;
      case 'help':
      default:
        showHelp();
        break;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Generate documentation for a specific component or all components
 */
async function handleGenerate(componentName) {
  if (componentName) {
    console.log(`📝 Generating documentation for ${componentName}...`);
    
    if (componentName.toLowerCase() === 'button') {
      await generateButtonDocumentation();
      console.log(`✅ Generated documentation for ${componentName}`);
    } else {
      console.log(`⚠️  Documentation generator for ${componentName} not yet implemented`);
      console.log('   Currently only Button component is supported');
    }
  } else {
    console.log('📚 Generating documentation for all components...');
    
    const components = await findAllComponents();
    let generated = 0;
    
    for (const component of components) {
      try {
        if (component.name === 'Button') {
          await generateButtonDocumentation();
          generated++;
          console.log(`✅ Generated: ${component.name}`);
        } else {
          console.log(`⏭️  Skipped: ${component.name} (generator not implemented)`);
        }
      } catch (error) {
        console.error(`❌ Failed: ${component.name} - ${error.message}`);
      }
    }
    
    console.log(`\n📊 Summary: ${generated}/${components.length} components documented`);
  }
}

/**
 * Validate existing documentation
 */
async function handleValidate() {
  console.log('🔍 Validating component documentation...');
  
  const components = await findAllComponents();
  const issues = [];
  
  for (const component of components) {
    try {
      const readmePath = join(component.path, 'README.md');
      const readmeContent = await readFile(readmePath, 'utf-8');
      
      // Check for required sections
      const requiredSections = [
        '## Overview',
        '## Installation', 
        '## Basic Usage',
        '## Props',
        '## Accessibility',
        '## Examples'
      ];
      
      const missingSections = requiredSections.filter(section => 
        !readmeContent.includes(section)
      );
      
      if (missingSections.length > 0) {
        issues.push({
          component: component.name,
          type: 'missing-sections',
          details: missingSections
        });
      }
      
      // Check if it's using the old template
      if (readmeContent.includes('Add component props documentation')) {
        issues.push({
          component: component.name,
          type: 'outdated-template',
          details: ['Using old documentation template']
        });
      }
      
      console.log(`✅ ${component.name}: Valid`);
      
    } catch (error) {
      issues.push({
        component: component.name,
        type: 'missing-readme',
        details: ['README.md not found or unreadable']
      });
      console.log(`❌ ${component.name}: No README found`);
    }
  }
  
  // Report issues
  if (issues.length > 0) {
    console.log('\n⚠️  Documentation Issues Found:');
    issues.forEach(issue => {
      console.log(`\n${issue.component}:`);
      issue.details.forEach(detail => {
        console.log(`  - ${detail}`);
      });
    });
    console.log(`\n📊 Total issues: ${issues.length}`);
  } else {
    console.log('\n🎉 All documentation is valid!');
  }
}

/**
 * List all components in the library
 */
async function handleList() {
  console.log('📋 Component Library Inventory:\n');
  
  const components = await findAllComponents();
  const categories = {};
  
  // Group by category
  components.forEach(component => {
    if (!categories[component.category]) {
      categories[component.category] = [];
    }
    categories[component.category].push(component);
  });
  
  // Display by category
  Object.entries(categories).forEach(([category, comps]) => {
    console.log(`${getCategoryIcon(category)} ${category.toUpperCase()} (${comps.length})`);
    comps.forEach(comp => {
      const hasReadme = comp.hasReadme ? '📄' : '❌';
      console.log(`  ${hasReadme} ${comp.name}`);
    });
    console.log('');
  });
  
  console.log(`📊 Total: ${components.length} components`);
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
          // Check if this is a component directory
          const files = await readdir(fullPath);
          const hasSvelteFile = files.some(f => f.endsWith('.svelte'));
          
          if (hasSvelteFile) {
            // This is a component
            const hasReadme = files.includes('README.md');
            const componentCategory = category || determineCategory(fullPath);
            
            components.push({
              name: entry,
              path: fullPath,
              category: componentCategory,
              hasReadme
            });
          } else {
            // Continue scanning subdirectories
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
 * Get emoji icon for category
 */
function getCategoryIcon(category) {
  const icons = {
    atoms: '⚛️',
    molecules: '🧬',
    organisms: '🦠',
    layouts: '📐',
    utils: '🔧',
    hooks: '🪝',
    theme: '🎨',
    unknown: '❓'
  };
  return icons[category] || icons.unknown;
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
📚 Component Documentation CLI

Usage:
  node scripts/docs-cli.js <command> [options]

Commands:
  generate [component]  Generate documentation for a component or all components
  validate             Validate existing documentation
  list                 List all components in the library
  help                 Show this help message

Examples:
  node scripts/docs-cli.js generate Button
  node scripts/docs-cli.js generate
  node scripts/docs-cli.js validate
  node scripts/docs-cli.js list
`);
}

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}