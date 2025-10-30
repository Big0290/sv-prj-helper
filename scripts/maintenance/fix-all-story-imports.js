#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

function processDirectory(dir, callback) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const path = join(dir, item);
    const stat = statSync(path);
    
    if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.svelte-kit')) {
      processDirectory(path, callback);
    } else if (stat.isFile() && item.endsWith('.stories.svelte')) {
      callback(path);
    }
  }
}

function fixStoryImports(filePath) {
  let content = readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Extract component name and directory
  const pathParts = filePath.split('/');
  const componentName = pathParts[pathParts.length - 1].replace('.stories.svelte', '');
  const storyDir = dirname(filePath);
  const componentFile = join(storyDir, `${componentName}.svelte`);
  
  // Fix all import patterns
  const patterns = [
    // Pattern: import Component from './folder/Component/Component.svelte'
    new RegExp(`import ${componentName} from ['"]\\.\\/[^/]+\\/${componentName}\\/${componentName}\\.svelte['"]`, 'g'),
    // Pattern: import Component from 'atoms/Component/Component.svelte' or similar
    new RegExp(`import ${componentName} from ['"][^/]+\\/${componentName}\\/${componentName}\\.svelte['"]`, 'g'),
    // Pattern: import Component from './folder/Component.svelte' (correct)
    new RegExp(`import ${componentName} from ['"]\\.\\/[^/]+\\/${componentName}\\.svelte['"]`, 'g'),
  ];
  
  for (const pattern of patterns) {
    const oldContent = content;
    content = content.replace(pattern, `import ${componentName} from './${componentName}.svelte'`);
    if (oldContent !== content) {
      modified = true;
    }
  }
  
  // Also fix for any component files with absolute imports
  content = content.replace(/from ['"]src\/lib\/ui/g, 'from \'./');
  
  if (modified) {
    writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

function fixAllStories() {
  console.log('Fixing all Storybook story imports...\n');
  let count = 0;
  
  processDirectory(join(rootDir, 'src/lib/ui'), (filePath) => {
    if (fixStoryImports(filePath)) {
      count++;
      console.log(`✓ Fixed ${filePath}`);
    }
  });
  
  console.log(`\n✓ Fixed ${count} story files`);
}

fixAllStories();

