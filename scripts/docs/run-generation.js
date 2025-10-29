#!/usr/bin/env node

/**
 * Simple script to run documentation generation
 * Bypasses TypeScript compilation issues by running directly
 */

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting LLM Documentation Generation...');
console.log('Source directory: ../../src/lib');
console.log('Output: ../../LLM.md');

// Get absolute paths
const projectRoot = join(__dirname, '../..');
const sourceDir = join(projectRoot, 'src/lib/ui');
const outputPath = join(projectRoot, 'LLM.md');

console.log(`Project root: ${projectRoot}`);
console.log(`Source directory: ${sourceDir}`);
console.log(`Output path: ${outputPath}`);

// Run the CLI with tsx, ignoring TypeScript errors
const child = spawn('npx', ['tsx', '--tsconfig', './tsconfig.json', 'cli.ts', '--config', './docs.config.json'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    TS_NODE_TRANSPILE_ONLY: 'true',
    TS_NODE_IGNORE_DIAGNOSTICS: 'true'
  }
});

child.on('error', (error) => {
  console.error('Failed to start documentation generator:', error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  if (code === 0) {
    console.log('\n✅ Documentation generation completed successfully!');
    console.log('📄 Output file: LLM.md');
  } else {
    console.error(`\n❌ Documentation generation failed with exit code ${code}`);
  }
  process.exit(code || 0);
});