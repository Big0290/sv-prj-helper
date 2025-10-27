#!/usr/bin/env node

/**
 * Component Testing Utilities
 * 
 * Utilities for testing Svelte 5 components with accessibility and interaction testing
 * 
 * Usage:
 *   node scripts/test-utils.js generate <ComponentName>  # Generate test file
 *   node scripts/test-utils.js run [component]           # Run tests
 *   node scripts/test-utils.js a11y [component]          # Run accessibility tests
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join } from 'path';
import { spawn } from 'child_process';

const COMPONENTS_PATH = 'src/lib/components';

/**
 * Main testing utilities entry point
 */
async function main() {
  const [,, command, componentName, ...flags] = process.argv;

  try {
    switch (command) {
      case 'generate':
        if (!componentName) {
          throw new Error('Component name is required for generate command');
        }
        await generateTestFile(componentName);
        break;
      case 'run':
        await runTests(componentName, flags);
        break;
      case 'a11y':
        await runAccessibilityTests(componentName, flags);
        break;
      case 'coverage':
        await runCoverageReport(componentName, flags);
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
 * Generate comprehensive test file for a component
 */
async function generateTestFile(componentName) {
  console.log(`🧪 Generating test file for ${componentName}...`);
  
  const component = await findComponent(componentName);
  if (!component) {
    throw new Error(`Component "${componentName}" not found`);
  }
  
  // Read component files to understand structure
  const componentPath = join(component.path, `${componentName}.svelte`);
  const typesPath = join(component.path, `${componentName}.types.ts`);
  
  let componentContent = '';
  let typesContent = '';
  
  try {
    componentContent = await readFile(componentPath, 'utf-8');
    typesContent = await readFile(typesPath, 'utf-8');
  } catch (error) {
    console.warn('⚠️  Could not read component files, generating basic test template');
  }
  
  // Analyze component to generate appropriate tests
  const analysis = analyzeComponent(componentContent, typesContent);
  const testContent = generateTestContent(componentName, analysis);
  
  const testPath = join(component.path, `${componentName}.test.ts`);
  await writeFile(testPath, testContent);
  
  console.log(`✅ Generated test file: ${testPath}`);
  console.log(`📝 Test categories included:`);
  analysis.testCategories.forEach(category => {
    console.log(`   - ${category}`);
  });
}

/**
 * Analyze component to determine what tests to generate
 */
function analyzeComponent(componentContent, typesContent) {
  const analysis = {
    hasProps: false,
    hasEvents: false,
    hasSlots: false,
    hasAccessibility: false,
    hasKeyboardNav: false,
    hasVariants: false,
    hasStates: false,
    testCategories: ['Basic Rendering']
  };
  
  // Analyze props
  if (typesContent.includes('interface') && typesContent.includes('Props')) {
    analysis.hasProps = true;
    analysis.testCategories.push('Props Testing');
  }
  
  // Analyze events
  if (typesContent.includes('Events') || componentContent.includes('onclick') || componentContent.includes('dispatch')) {
    analysis.hasEvents = true;
    analysis.testCategories.push('Event Handling');
  }
  
  // Analyze slots
  if (componentContent.includes('{@render') || componentContent.includes('$$slots')) {
    analysis.hasSlots = true;
    analysis.testCategories.push('Slot Rendering');
  }
  
  // Analyze accessibility
  if (componentContent.includes('aria-') || componentContent.includes('role=') || componentContent.includes('tabindex')) {
    analysis.hasAccessibility = true;
    analysis.testCategories.push('Accessibility');
  }
  
  // Analyze keyboard navigation
  if (componentContent.includes('keydown') || componentContent.includes('keyup') || componentContent.includes('focus')) {
    analysis.hasKeyboardNav = true;
    analysis.testCategories.push('Keyboard Navigation');
  }
  
  // Analyze variants
  if (typesContent.includes('variant') || componentContent.includes('variant')) {
    analysis.hasVariants = true;
    analysis.testCategories.push('Variants');
  }
  
  // Analyze states
  if (componentContent.includes('disabled') || componentContent.includes('loading') || componentContent.includes('active')) {
    analysis.hasStates = true;
    analysis.testCategories.push('State Management');
  }
  
  return analysis;
}

/**
 * Generate test content based on component analysis
 */
function generateTestContent(componentName, analysis) {
  const imports = [
    `import { describe, it, expect, beforeEach, afterEach } from 'vitest';`,
    `import { render, screen, cleanup, fireEvent } from '@testing-library/svelte';`,
    `import { userEvent } from '@testing-library/user-event';`,
    `import ${componentName} from './${componentName}.svelte';`
  ];
  
  if (analysis.hasAccessibility) {
    imports.push(`import { axe, toHaveNoViolations } from 'jest-axe';`);
    imports.push(`expect.extend(toHaveNoViolations);`);
  }
  
  const testSections = [];
  
  // Basic rendering tests
  testSections.push(`
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(${componentName}, {
        props: {
          children: () => 'Test content'
        }
      });
      
      expect(container).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(${componentName}, {
        props: {
          children: () => 'Default test'
        }
      });
      
      expect(screen.getByText('Default test')).toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
      const { container } = render(${componentName}, {
        props: {
          children: () => 'Test content'
        }
      });
      
      const element = container.querySelector('.${componentName.toLowerCase()}');
      expect(element).toBeInTheDocument();
    });
  });`);
  
  // Props testing
  if (analysis.hasProps) {
    testSections.push(`
  describe('Props Testing', () => {
    it('accepts and applies custom props', () => {
      render(${componentName}, {
        props: {
          // Add specific props based on component
          children: () => 'Custom props test'
        }
      });
      
      // Add assertions for prop behavior
      expect(screen.getByText('Custom props test')).toBeInTheDocument();
    });

    it('handles prop changes reactively', async () => {
      const { component } = render(${componentName}, {
        props: {
          children: () => 'Initial'
        }
      });
      
      // Test prop updates
      // component.$set({ someProp: 'newValue' });
      // await tick();
      
      // Add assertions for reactive updates
    });
  });`);
  }
  
  // Event handling tests
  if (analysis.hasEvents) {
    testSections.push(`
  describe('Event Handling', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const mockHandler = vi.fn();
      
      render(${componentName}, {
        props: {
          onclick: mockHandler,
          children: () => 'Click me'
        }
      });
      
      const element = screen.getByText('Click me');
      await user.click(element);
      
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it('prevents events when disabled', async () => {
      const user = userEvent.setup();
      const mockHandler = vi.fn();
      
      render(${componentName}, {
        props: {
          disabled: true,
          onclick: mockHandler,
          children: () => 'Disabled button'
        }
      });
      
      const element = screen.getByText('Disabled button');
      await user.click(element);
      
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });`);
  }
  
  // Accessibility tests
  if (analysis.hasAccessibility) {
    testSections.push(`
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(${componentName}, {
        props: {
          children: () => 'Accessibility test'
        }
      });
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      render(${componentName}, {
        props: {
          ariaLabel: 'Screen reader label',
          children: () => 'Content'
        }
      });
      
      expect(screen.getByLabelText('Screen reader label')).toBeInTheDocument();
    });

    it('has proper focus management', async () => {
      const user = userEvent.setup();
      
      render(${componentName}, {
        props: {
          children: () => 'Focusable content'
        }
      });
      
      await user.tab();
      
      // Add focus assertions based on component behavior
      const focusedElement = document.activeElement;
      expect(focusedElement).toBeInTheDocument();
    });
  });`);
  }
  
  // Keyboard navigation tests
  if (analysis.hasKeyboardNav) {
    testSections.push(`
  describe('Keyboard Navigation', () => {
    it('responds to Enter key', async () => {
      const user = userEvent.setup();
      const mockHandler = vi.fn();
      
      render(${componentName}, {
        props: {
          onclick: mockHandler,
          children: () => 'Press Enter'
        }
      });
      
      const element = screen.getByText('Press Enter');
      element.focus();
      await user.keyboard('{Enter}');
      
      expect(mockHandler).toHaveBeenCalled();
    });

    it('responds to Space key', async () => {
      const user = userEvent.setup();
      const mockHandler = vi.fn();
      
      render(${componentName}, {
        props: {
          onclick: mockHandler,
          children: () => 'Press Space'
        }
      });
      
      const element = screen.getByText('Press Space');
      element.focus();
      await user.keyboard(' ');
      
      expect(mockHandler).toHaveBeenCalled();
    });

    it('handles Escape key appropriately', async () => {
      const user = userEvent.setup();
      
      render(${componentName}, {
        props: {
          children: () => 'Press Escape'
        }
      });
      
      await user.keyboard('{Escape}');
      
      // Add assertions for Escape key behavior
    });
  });`);
  }
  
  // Variants testing
  if (analysis.hasVariants) {
    testSections.push(`
  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      const { container } = render(${componentName}, {
        props: {
          variant: 'primary',
          children: () => 'Primary variant'
        }
      });
      
      expect(container.querySelector('.${componentName.toLowerCase()}-primary')).toBeInTheDocument();
    });

    it('renders secondary variant correctly', () => {
      const { container } = render(${componentName}, {
        props: {
          variant: 'secondary',
          children: () => 'Secondary variant'
        }
      });
      
      expect(container.querySelector('.${componentName.toLowerCase()}-secondary')).toBeInTheDocument();
    });
  });`);
  }
  
  const testFile = `${imports.join('\n')}

describe('${componentName}', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    cleanup();
  });
${testSections.join('\n')}
});
`;
  
  return testFile;
}

/**
 * Run tests for components
 */
async function runTests(componentName, flags) {
  console.log('🧪 Running component tests...\n');
  
  const testCommand = componentName 
    ? `vitest run --reporter=verbose ${componentName}`
    : 'vitest run --reporter=verbose';
    
  const options = {
    stdio: 'inherit',
    shell: true
  };
  
  if (flags.includes('--watch')) {
    console.log('👀 Running tests in watch mode...');
    return runCommand('vitest', options);
  }
  
  return runCommand(testCommand, options);
}

/**
 * Run accessibility tests
 */
async function runAccessibilityTests(componentName, flags) {
  console.log('♿ Running accessibility tests...\n');
  
  const components = componentName 
    ? [await findComponent(componentName)]
    : await findAllComponents();
    
  for (const component of components.filter(Boolean)) {
    console.log(`🔍 Testing ${component.name} for accessibility...`);
    
    // Run axe-core tests
    const testFile = join(component.path, `${component.name}.test.ts`);
    
    try {
      await stat(testFile);
      const testCommand = `vitest run ${testFile} --reporter=verbose`;
      await runCommand(testCommand, { stdio: 'inherit', shell: true });
    } catch (error) {
      console.log(`⚠️  No test file found for ${component.name}, skipping...`);
    }
  }
}

/**
 * Run coverage report
 */
async function runCoverageReport(componentName, flags) {
  console.log('📊 Generating test coverage report...\n');
  
  const coverageCommand = componentName
    ? `vitest run --coverage ${componentName}`
    : 'vitest run --coverage';
    
  return runCommand(coverageCommand, { stdio: 'inherit', shell: true });
}

/**
 * Find specific component
 */
async function findComponent(componentName) {
  const allComponents = await findAllComponents();
  return allComponents.find(c => c.name.toLowerCase() === componentName.toLowerCase());
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
 * Run shell command
 */
function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, [], { shell: true, ...options });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    child.on('error', reject);
  });
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
🧪 Component Testing Utilities

Generate and run tests for Svelte 5 components with accessibility support.

Usage:
  node scripts/test-utils.js <command> [options]

Commands:
  generate <ComponentName>  Generate comprehensive test file for component
  run [component]           Run tests (all components or specific component)
  a11y [component]          Run accessibility tests
  coverage [component]      Generate test coverage report
  help                      Show this help message

Options:
  --watch                   Run tests in watch mode
  --verbose                 Verbose test output

Examples:
  node scripts/test-utils.js generate Button
  node scripts/test-utils.js run Button
  node scripts/test-utils.js run --watch
  node scripts/test-utils.js a11y
  node scripts/test-utils.js coverage Button

Generated tests include:
  ✅ Basic rendering and props
  ✅ Event handling and interactions
  ✅ Accessibility compliance (axe-core)
  ✅ Keyboard navigation
  ✅ Variants and states
  ✅ Screen reader support
`);
}

// Run test utilities if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateTestFile, runTests, runAccessibilityTests };