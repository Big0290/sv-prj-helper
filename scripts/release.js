#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const RELEASE_TYPES = ['patch', 'minor', 'major'];

function getCurrentVersion() {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

function validateReleaseType(type) {
  if (!RELEASE_TYPES.includes(type)) {
    console.error(`❌ Invalid release type: ${type}`);
    console.error(`Valid types: ${RELEASE_TYPES.join(', ')}`);
    process.exit(1);
  }
}

function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.error('❌ Working directory is not clean. Please commit or stash your changes.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Failed to check git status:', error.message);
    process.exit(1);
  }
}

function checkCurrentBranch() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    if (branch !== 'main') {
      console.error(`❌ You must be on the main branch to create a release. Current branch: ${branch}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Failed to check current branch:', error.message);
    process.exit(1);
  }
}

function main() {
  const releaseType = process.argv[2];
  
  if (!releaseType) {
    console.error('❌ Please specify a release type');
    console.error('Usage: npm run release:script <patch|minor|major>');
    process.exit(1);
  }

  validateReleaseType(releaseType);
  
  const currentVersion = getCurrentVersion();
  console.log(`📦 Current version: ${currentVersion}`);
  console.log(`🚀 Creating ${releaseType} release...`);

  // Pre-flight checks
  checkCurrentBranch();
  checkGitStatus();

  // Run tests
  runCommand('npm run check', 'Type checking');
  runCommand('npm run build', 'Building and packaging');

  // Generate changelog
  runCommand('npm run changelog', 'Generating changelog');

  // Bump version
  runCommand(`npm version ${releaseType} --no-git-tag-version`, 'Bumping version');

  const newVersion = getCurrentVersion();
  console.log(`📈 New version: ${newVersion}`);

  // Commit changes
  runCommand('git add .', 'Staging changes');
  runCommand(`git commit -m "chore(release): ${newVersion}"`, 'Committing changes');
  runCommand(`git tag v${newVersion}`, 'Creating git tag');

  // Push changes
  runCommand('git push origin main', 'Pushing changes');
  runCommand('git push origin --tags', 'Pushing tags');

  console.log('🎉 Release completed successfully!');
  console.log(`📋 Next steps:`);
  console.log(`   1. Check the GitHub Actions workflow`);
  console.log(`   2. Verify the package was published`);
  console.log(`   3. Create a GitHub release if needed`);
}

main();