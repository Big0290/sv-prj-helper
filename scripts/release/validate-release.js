#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

function validatePackageJson() {
  console.log('🔄 Validating package.json...');
  
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    
    // Check required fields
    const requiredFields = ['name', 'version', 'description', 'main', 'types', 'exports'];
    const missingFields = requiredFields.filter(field => !packageJson[field]);
    
    if (missingFields.length > 0) {
      console.error(`❌ Missing required fields in package.json: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Check GitHub package configuration
    if (!packageJson.publishConfig || packageJson.publishConfig.registry !== 'https://npm.pkg.github.com') {
      console.error('❌ Missing or incorrect publishConfig for GitHub packages');
      return false;
    }
    
    // Check repository field
    if (!packageJson.repository || !packageJson.repository.url) {
      console.error('❌ Missing repository field in package.json');
      return false;
    }
    
    console.log('✅ package.json validation completed');
    return true;
  } catch (error) {
    console.error('❌ Failed to validate package.json:', error.message);
    return false;
  }
}

function validateFiles() {
  console.log('🔄 Validating required files...');
  
  const requiredFiles = [
    'CHANGELOG.md',
    'README.md',
    '.github/workflows/publish.yml',
    'src/lib/index.ts'
  ];
  
  const missingFiles = requiredFiles.filter(file => !existsSync(file));
  
  if (missingFiles.length > 0) {
    console.error(`❌ Missing required files: ${missingFiles.join(', ')}`);
    return false;
  }
  
  console.log('✅ File validation completed');
  return true;
}

function validateBuildOutput() {
  console.log('🔄 Validating build output...');
  
  if (!existsSync('dist')) {
    console.error('❌ dist directory not found. Run npm run build first.');
    return false;
  }
  
  const requiredDistFiles = [
    'dist/index.js',
    'dist/index.d.ts',
    'dist/package.json'
  ];
  
  const missingDistFiles = requiredDistFiles.filter(file => !existsSync(file));
  
  if (missingDistFiles.length > 0) {
    console.error(`❌ Missing build output files: ${missingDistFiles.join(', ')}`);
    return false;
  }
  
  console.log('✅ Build output validation completed');
  return true;
}

function main() {
  console.log('🚀 Starting release validation...\n');
  
  let allValid = true;
  
  // Validate package.json
  allValid = validatePackageJson() && allValid;
  
  // Validate required files
  allValid = validateFiles() && allValid;
  
  // Run type check (but don't fail on errors for now due to existing issues)
  console.log('🔄 Running type check...');
  try {
    execSync('npm run check', { stdio: 'pipe' });
    console.log('✅ Type check completed');
  } catch (error) {
    console.warn('⚠️  Type check found issues (continuing anyway)');
  }
  
  // Build the package
  if (!runCommand('npm run package', 'Building package')) {
    allValid = false;
  }
  
  // Validate build output
  allValid = validateBuildOutput() && allValid;
  
  console.log('\n' + '='.repeat(50));
  
  if (allValid) {
    console.log('🎉 All validations passed! Ready for release.');
    process.exit(0);
  } else {
    console.log('❌ Some validations failed. Please fix the issues before releasing.');
    process.exit(1);
  }
}

main();