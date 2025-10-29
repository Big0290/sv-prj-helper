#!/usr/bin/env node

/**
 * Simple automation script for npm scripts
 * Provides easy access to documentation generation without TypeScript compilation
 */

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Run the TypeScript CLI with tsx
 */
function runCLI(args = []) {
  const cliPath = join(__dirname, 'cli.ts');
  
  // Use tsx to run TypeScript directly
  const child = spawn('npx', ['tsx', cliPath, ...args], {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  child.on('error', (error) => {
    console.error('Failed to start documentation generator:', error.message);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code || 0);
  });
}

/**
 * Parse command line arguments and run appropriate command
 */
function main() {
  const args = process.argv.slice(2);
  
  // Handle special npm script commands
  if (args.length === 0 || args[0] === 'generate') {
    // Default generation
    runCLI(['--verbose']);
  } else if (args[0] === 'watch') {
    // Watch mode
    runCLI(['--watch', '--verbose']);
  } else if (args[0] === 'validate') {
    // Generate with validation
    runCLI(['--validate', '--verbose']);
  } else if (args[0] === 'dry-run') {
    // Dry run
    runCLI(['--dry-run', '--verbose']);
  } else {
    // Pass through all arguments
    runCLI(args);
  }
}

main();