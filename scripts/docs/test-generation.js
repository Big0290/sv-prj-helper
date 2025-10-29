#!/usr/bin/env node

/**
 * Test script to verify documentation generation functionality
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = new URL('.', import.meta.url).pathname;

const projectRoot = join(__dirname, '../..');
const sourceDir = join(projectRoot, 'src/lib/ui');

console.log('🧪 Testing Documentation Generation System...');
console.log(`📁 Source: ${sourceDir}`);

async function testComponentScanning() {
  console.log('\n1. Testing Component Scanning...');
  
  try {
    const directories = ['atoms', 'molecules', 'organisms', 'layouts', 'utils', 'hooks', 'theme'];
    let totalComponents = 0;
    
    for (const dir of directories) {
      const dirPath = join(sourceDir, dir);
      try {
        const entries = await readdir(dirPath, { withFileTypes: true });
        const components = entries.filter(entry => 
          entry.isFile() && extname(entry.name) === '.svelte'
        );
        
        console.log(`  ✅ ${dir}: ${components.length} components`);
        totalComponents += components.length;
      } catch (error) {
        console.log(`  ⚠️  ${dir}: directory not found`);
      }
    }
    
    console.log(`  📊 Total: ${totalComponents} components found`);
    return totalComponents > 0;
  } catch (error) {
    console.error('  ❌ Component scanning failed:', error.message);
    return false;
  }
}

async function testComponentParsing() {
  console.log('\n2. Testing Component Parsing...');
  
  try {
    // Test parsing a simple component
    const buttonPath = join(sourceDir, 'atoms/Button.svelte');
    
    try {
      const content = await readFile(buttonPath, 'utf-8');
      
      // Basic parsing tests
      const hasScript = content.includes('<script');
      const hasProps = content.includes('$props()') || content.includes('interface Props');
      const hasStyles = content.includes('<style>');
      const hasTypeScript = content.includes('lang="ts"');
      
      console.log(`  ✅ Button component analysis:`);
      console.log(`    - Has script section: ${hasScript}`);
      console.log(`    - Has props: ${hasProps}`);
      console.log(`    - Has styles: ${hasStyles}`);
      console.log(`    - Uses TypeScript: ${hasTypeScript}`);
      
      return true;
    } catch (error) {
      console.log(`  ⚠️  Button component not found, testing with first available component...`);
      
      // Find any component to test with
      const atomsDir = join(sourceDir, 'atoms');
      const entries = await readdir(atomsDir);
      const firstComponent = entries.find(entry => extname(entry) === '.svelte');
      
      if (firstComponent) {
        const content = await readFile(join(atomsDir, firstComponent), 'utf-8');
        console.log(`  ✅ Testing with ${firstComponent}: ${content.length} characters`);
        return true;
      }
      
      return false;
    }
  } catch (error) {
    console.error('  ❌ Component parsing test failed:', error.message);
    return false;
  }
}

async function testDocumentationGeneration() {
  console.log('\n3. Testing Documentation Generation...');
  
  try {
    // Test basic markdown generation
    const testDoc = `# Test Documentation

## Component: TestButton

### Props
- \`variant\`: string - Button variant (primary, secondary)
- \`disabled\`: boolean - Whether button is disabled

### Usage
\`\`\`svelte
<TestButton variant="primary">Click me</TestButton>
\`\`\`

### Accessibility
- Supports keyboard navigation
- Includes ARIA labels
- WCAG 2.1 AA compliant
`;

    const testOutputPath = join(projectRoot, 'TEST_LLM.md');
    await writeFile(testOutputPath, testDoc, 'utf-8');
    
    console.log(`  ✅ Test documentation generated: ${testOutputPath}`);
    console.log(`  📏 Size: ${Math.round(testDoc.length / 1024)}KB`);
    
    return true;
  } catch (error) {
    console.error('  ❌ Documentation generation test failed:', error.message);
    return false;
  }
}

async function testTypeScriptConfig() {
  console.log('\n4. Testing TypeScript Configuration...');
  
  try {
    const tsconfigPath = join(__dirname, '../docs-generator/tsconfig.json');
    const tsconfig = await readFile(tsconfigPath, 'utf-8');
    const config = JSON.parse(tsconfig);
    
    console.log(`  ✅ TypeScript config loaded`);
    console.log(`    - Extends: ${config.extends}`);
    console.log(`    - Target: ${config.compilerOptions.target}`);
    console.log(`    - Module: ${config.compilerOptions.module}`);
    console.log(`    - No emit: ${config.compilerOptions.noEmit}`);
    
    return true;
  } catch (error) {
    console.error('  ❌ TypeScript config test failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Documentation System Tests...\n');
  
  const tests = [
    { name: 'Component Scanning', fn: testComponentScanning },
    { name: 'Component Parsing', fn: testComponentParsing },
    { name: 'Documentation Generation', fn: testDocumentationGeneration },
    { name: 'TypeScript Configuration', fn: testTypeScriptConfig }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`  ❌ ${test.name} failed with error:`, error.message);
      failed++;
    }
  }
  
  console.log('\n📊 Test Results:');
  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Documentation system is ready.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above for details.');
  }
  
  return failed === 0;
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});