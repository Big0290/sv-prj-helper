#!/usr/bin/env node

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * Validate the built package structure and exports
 */
function validateBuild() {
  console.log('🔍 Validating library build...\n');

  const distPath = './dist';
  const packageJsonPath = join(distPath, 'package.json');
  
  if (!existsSync(distPath)) {
    console.error('❌ Dist directory not found. Run npm run build:lib first.');
    process.exit(1);
  }

  if (!existsSync(packageJsonPath)) {
    console.error('❌ Package.json not found in dist directory.');
    process.exit(1);
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    // Validate essential fields
    const requiredFields = ['name', 'version', 'main', 'module', 'types', 'exports'];
    const missingFields = requiredFields.filter(field => !packageJson[field]);
    
    if (missingFields.length > 0) {
      console.error(`❌ Missing required fields: ${missingFields.join(', ')}`);
      process.exit(1);
    }

    // Validate exports
    const exports = packageJson.exports;
    const expectedExports = ['.', './ui', './docs', './hooks'];
    const missingExports = expectedExports.filter(exp => !exports[exp]);
    
    if (missingExports.length > 0) {
      console.error(`❌ Missing exports: ${missingExports.join(', ')}`);
      process.exit(1);
    }

    // Validate files exist
    const filesToCheck = [
      'index.js',
      'index.d.ts',
      'ui/index.js',
      'ui/index.d.ts',
      'docs/index.js',
      'docs/index.d.ts',
      'hooks/index.js',
      'hooks/index.d.ts'
    ];

    const missingFiles = filesToCheck.filter(file => !existsSync(join(distPath, file)));
    
    if (missingFiles.length > 0) {
      console.error(`❌ Missing files: ${missingFiles.join(', ')}`);
      process.exit(1);
    }

    // Validate CSS files
    if (exports['./styles'] && !existsSync(join(distPath, 'styles/theme.css'))) {
      console.error('❌ Missing styles/theme.css file');
      process.exit(1);
    }

    console.log('✅ All essential files present');
    console.log('✅ Package.json structure valid');
    console.log('✅ Exports configuration correct');
    console.log('✅ TypeScript definitions generated');
    
    if (exports['./styles']) {
      console.log('✅ CSS styles included');
    }

    console.log('\n📊 Build Summary:');
    console.log(`   Package: ${packageJson.name}@${packageJson.version}`);
    console.log(`   Main: ${packageJson.main}`);
    console.log(`   Types: ${packageJson.types}`);
    console.log(`   Exports: ${Object.keys(exports).length} paths`);
    console.log(`   Module Type: ${packageJson.type}`);
    console.log(`   Side Effects: ${JSON.stringify(packageJson.sideEffects)}`);

    console.log('\n🎉 Build validation successful!');
    console.log('📦 Package is ready for publishing');
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

validateBuild();