#!/usr/bin/env node

/**
 * Developer Tools CLI
 * 
 * Unified CLI for all component development tools and utilities
 * 
 * Usage:
 *   node scripts/dev-tools.js <command> [options]
 *   
 * Commands:
 *   generate    Generate new components
 *   validate    Validate documentation
 *   test        Testing utilities
 *   docs        Documentation tools
 *   help        Show help information
 */

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Main CLI entry point
 */
async function main() {
  const [,, command, ...args] = process.argv;

  if (!command || command === 'help' || command === '--help') {
    showHelp();
    process.exit(0);
  }

  try {
    switch (command) {
      case 'generate':
      case 'gen':
        await runScript('component-generator.js', args);
        break;
      case 'validate':
      case 'val':
        await runScript('docs-validator.js', args);
        break;
      case 'test':
        await runScript('test-utils.js', args);
        break;
      case 'docs':
        await runScript('docs-cli.js', args);
        break;
      case 'status':
        await showProjectStatus();
        break;
      case 'setup':
        await setupDevelopmentEnvironment();
        break;
      default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('Run "node scripts/dev-tools.js help" for available commands');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Run a script with arguments
 */
async function runScript(scriptName, args) {
  const scriptPath = join(__dirname, scriptName);
  
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath, ...args], {
      stdio: 'inherit',
      shell: true
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script ${scriptName} failed with exit code ${code}`));
      }
    });
    
    child.on('error', reject);
  });
}

/**
 * Show project status
 */
async function showProjectStatus() {
  console.log('📊 SV Project Helper UI Library - Development Status\n');
  
  try {
    console.log('🔍 Running component validation...');
    await runScript('docs-validator.js', []);
    
    console.log('\n📋 Component inventory...');
    await runScript('docs-cli.js', ['list']);
    
  } catch (error) {
    console.error('⚠️  Could not generate full status report');
  }
}

/**
 * Setup development environment
 */
async function setupDevelopmentEnvironment() {
  console.log('🚀 Setting up development environment...\n');
  
  const steps = [
    {
      name: 'Install dependencies',
      command: 'npm install'
    },
    {
      name: 'Run type checking',
      command: 'npm run check'
    },
    {
      name: 'Validate documentation',
      script: 'docs-validator.js'
    },
    {
      name: 'Generate missing documentation',
      script: 'docs-cli.js',
      args: ['generate']
    }
  ];
  
  for (const step of steps) {
    console.log(`📝 ${step.name}...`);
    
    try {
      if (step.script) {
        await runScript(step.script, step.args || []);
      } else {
        await runCommand(step.command);
      }
      console.log(`✅ ${step.name} completed\n`);
    } catch (error) {
      console.log(`⚠️  ${step.name} had issues, continuing...\n`);
    }
  }
  
  console.log('🎉 Development environment setup complete!');
  console.log('\n📚 Next steps:');
  console.log('  - Run "npm run dev" to start development server');
  console.log('  - Use "node scripts/dev-tools.js generate <ComponentName>" to create new components');
  console.log('  - Use "node scripts/dev-tools.js validate" to check documentation');
}

/**
 * Run shell command
 */
function runCommand(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, [], { 
      stdio: 'inherit', 
      shell: true 
    });
    
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
🛠️  SV Project Helper UI Library - Developer Tools

Unified CLI for component development, documentation, and testing.

Usage:
  node scripts/dev-tools.js <command> [options]

Commands:
  generate, gen    Generate new components with proper structure
  validate, val    Validate component documentation
  test             Component testing utilities
  docs             Documentation generation and management
  status           Show project development status
  setup            Setup development environment
  help             Show this help message

Quick Examples:
  node scripts/dev-tools.js generate Modal molecules --with-tests
  node scripts/dev-tools.js validate Button
  node scripts/dev-tools.js test generate Button
  node scripts/dev-tools.js docs list
  node scripts/dev-tools.js status

Detailed Command Help:
  node scripts/dev-tools.js generate --help
  node scripts/dev-tools.js validate --help
  node scripts/dev-tools.js test --help
  node scripts/dev-tools.js docs --help

Development Workflow:
  1. Generate component: dev-tools.js generate MyComponent atoms
  2. Implement component logic in the generated files
  3. Validate documentation: dev-tools.js validate MyComponent
  4. Generate tests: dev-tools.js test generate MyComponent
  5. Run tests: dev-tools.js test run MyComponent

The tools support:
  ✅ Component generation with TypeScript and documentation
  ✅ Documentation validation and consistency checking
  ✅ Automated test generation with accessibility testing
  ✅ Development environment setup and status checking
`);
}

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runScript, showProjectStatus };