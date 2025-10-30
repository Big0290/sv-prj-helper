#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
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

function fixStoryFile(filePath) {
  let content = readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Extract component name from path
  const fileName = filePath.split('/').slice(-2, -1)[0]; // Get folder name before .stories.svelte
  
  // Fix imports that are malformed (missing quotes or wrong paths)
  // Pattern 1: import Component from /folder/Component.svelte' (missing opening quote)
  const malformedPattern1 = new RegExp(`import ${fileName} from /`, 'g');
  if (malformedPattern1.test(content)) {
    content = content.replace(malformedPattern1, `import ${fileName} from './`);
    modified = true;
  }
  
  // Pattern 2: import Component from 'src/lib/...' (absolute paths in stories)
  const absolutePattern = new RegExp(`import ${fileName} from ['"]src/lib/`, 'g');
  if (absolutePattern.test(content)) {
    content = content.replace(absolutePattern, `import ${fileName} from './`);
    modified = true;
  }
  
  // Pattern 3: import Component from './folder/Component/Component.svelte' (correct to relative)
  const relativePattern = new RegExp(`import ${fileName} from ['"]\\.\\.\\/.*?\\/${fileName}\\/${fileName}\\.svelte['"]`, 'g');
  if (relativePattern.test(content)) {
    content = content.replace(relativePattern, `import ${fileName} from './${fileName}.svelte'`);
    modified = true;
  }
  
  // Pattern 4: Missing quote completely
  const missingQuotePattern = new RegExp(`import ${fileName} from (?!['"])`, 'g');
  
  // Fix Story blocks to not use children for components that don't accept children
  const storyBlockPattern = /<Story name="([^"]+)">\s*<(\w+)([^>]*)>([^<]+)<\/\2>\s*<\/Story>/g;
  content = content.replace(storyBlockPattern, (match, storyName, componentName, props, children) => {
    // For audio, use proper props
    if (componentName === 'Audio') {
      return `<Story name="${storyName}" args={{ src: '/audio/sample.mp3', title: 'Sample Audio' }} />`;
    }
    return match;
  });
  
  if (modified) {
    writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

function fixAllStories() {
  console.log('Fixing Storybook story imports...\n');
  let count = 0;
  
  processDirectory(join(rootDir, 'src/lib/ui'), (filePath) => {
    if (fixStoryFile(filePath)) {
      count++;
      console.log(`✓ Fixed ${filePath}`);
    }
  });
  
  console.log(`\n✓ Fixed ${count} story files`);
}

fixAllStories();

