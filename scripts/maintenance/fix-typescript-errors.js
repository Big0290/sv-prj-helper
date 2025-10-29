#!/usr/bin/env node

/**
 * TypeScript Error Fix Script
 * 
 * Systematically fixes common TypeScript errors in the codebase
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join } from 'path';

const COMPONENTS_PATH = 'src/lib';

/**
 * Main fix entry point
 */
async function main() {
  console.log('🔧 Starting TypeScript error fixes...\n');
  
  const fixes = [
    fixEventHandlerTypes,
    fixTimeoutTypes,
    fixInterfaceExports,
    fixCSSLineClamp,
    fixMissingInterfaces,
    fixNullChecks
  ];
  
  for (const fix of fixes) {
    await fix();
  }
  
  console.log('\n✅ TypeScript error fixes completed!');
}

/**
 * Fix event handler type issues
 */
async function fixEventHandlerTypes() {
  console.log('🎯 Fixing event handler types...');
  
  const files = await findSvelteFiles();
  let fixCount = 0;
  
  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      let modified = false;
      
      // Fix e.target.value
      if (content.includes('e.target.value')) {
        content = content.replace(
          /e\.target\.value/g,
          '(e.target as HTMLInputElement).value'
        );
        modified = true;
      }
      
      // Fix e.target.checked
      if (content.includes('e.target.checked')) {
        content = content.replace(
          /e\.target\.checked/g,
          '(e.target as HTMLInputElement).checked'
        );
        modified = true;
      }
      
      if (modified) {
        await writeFile(file, content);
        fixCount++;
      }
    } catch (error) {
      console.warn(`⚠️  Could not fix ${file}: ${error.message}`);
    }
  }
  
  console.log(`   Fixed ${fixCount} files with event handler issues`);
}

/**
 * Fix timeout type issues
 */
async function fixTimeoutTypes() {
  console.log('⏰ Fixing timeout types...');
  
  const files = await findSvelteFiles();
  let fixCount = 0;
  
  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      let modified = false;
      
      // Fix timeout variable declarations
      if (content.includes('let ') && content.includes('Timeout')) {
        // Look for patterns like: let hoverTimeout: number;
        content = content.replace(
          /let\s+(\w*[Tt]imeout\w*)\s*:\s*number/g,
          'let $1: NodeJS.Timeout | undefined'
        );
        modified = true;
      }
      
      if (modified) {
        await writeFile(file, content);
        fixCount++;
      }
    } catch (error) {
      console.warn(`⚠️  Could not fix ${file}: ${error.message}`);
    }
  }
  
  console.log(`   Fixed ${fixCount} files with timeout type issues`);
}

/**
 * Fix interface export issues
 */
async function fixInterfaceExports() {
  console.log('📝 Fixing interface exports...');
  
  const files = await findSvelteFiles();
  let fixCount = 0;
  
  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      let modified = false;
      
      // Move export interface to script context="module"
      const exportInterfaceRegex = /export interface (\w+) \{[^}]*\}/g;
      const matches = content.match(exportInterfaceRegex);
      
      if (matches) {
        // Remove export interfaces from main script
        content = content.replace(exportInterfaceRegex, '');
        
        // Add script context="module" if not exists
        if (!content.includes('<script context="module"')) {
          const moduleScript = `<script context="module" lang="ts">
${matches.join('\n\n')}
</script>

`;
          content = moduleScript + content;
        }
        
        modified = true;
      }
      
      if (modified) {
        await writeFile(file, content);
        fixCount++;
      }
    } catch (error) {
      console.warn(`⚠️  Could not fix ${file}: ${error.message}`);
    }
  }
  
  console.log(`   Fixed ${fixCount} files with interface export issues`);
}

/**
 * Fix CSS line-clamp compatibility
 */
async function fixCSSLineClamp() {
  console.log('🎨 Fixing CSS line-clamp compatibility...');
  
  const files = await findSvelteFiles();
  let fixCount = 0;
  
  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      let modified = false;
      
      // Add standard line-clamp alongside webkit version
      if (content.includes('-webkit-line-clamp:') && !content.includes('line-clamp:')) {
        content = content.replace(
          /-webkit-line-clamp:\s*([^;]+);/g,
          '-webkit-line-clamp: $1;\n\t\tline-clamp: $1;'
        );
        modified = true;
      }
      
      if (modified) {
        await writeFile(file, content);
        fixCount++;
      }
    } catch (error) {
      console.warn(`⚠️  Could not fix ${file}: ${error.message}`);
    }
  }
  
  console.log(`   Fixed ${fixCount} files with CSS line-clamp issues`);
}

/**
 * Create missing interface files
 */
async function fixMissingInterfaces() {
  console.log('🔗 Creating missing interfaces...');
  
  const missingInterfaces = [
    'BreadcrumbItem',
    'Message', 
    'ChatRoom',
    'SearchResult',
    'Attachment',
    'Reaction',
    'User',
    'PinnedMessage',
    'CarouselItem',
    'TimelineItem',
    'TreeNode',
    'CommandItem',
    'ContextMenuItem',
    'MediaItem',
    'NavItem',
    'Step',
    'Tab',
    'Column',
    'Row',
    'Action',
    'VideoItem'
  ];
  
  // Create a shared types file
  const sharedTypesContent = `// Shared interface definitions
export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
}

export interface Message {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'file';
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: Message;
  unreadCount?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
}

export interface PinnedMessage {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
}

export interface CarouselItem {
  id: string;
  title?: string;
  content: string;
  image?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  type?: string;
}

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  expanded?: boolean;
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  action: () => void;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  action?: () => void;
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'file';
  title?: string;
  thumbnail?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
}

export interface Step {
  label: string;
  description?: string;
  completed?: boolean;
  disabled?: boolean;
}

export interface Tab {
  id: string;
  label: string;
  content?: string;
  disabled?: boolean;
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface Row {
  [key: string]: any;
}

export interface Action {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  action: () => void;
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  duration?: number;
}
`;
  
  await writeFile('src/lib/types/shared.ts', sharedTypesContent);
  console.log('   Created shared types file');
}

/**
 * Fix null checks and undefined issues
 */
async function fixNullChecks() {
  console.log('🛡️  Adding null checks...');
  
  const files = await findSvelteFiles();
  let fixCount = 0;
  
  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      let modified = false;
      
      // Fix common null check patterns
      if (content.includes('videoEl.')) {
        content = content.replace(
          /videoEl\.(\w+)/g,
          'videoEl?.$1'
        );
        modified = true;
      }
      
      if (content.includes('textareaEl.')) {
        content = content.replace(
          /textareaEl\.(\w+)/g,
          'textareaEl?.$1'
        );
        modified = true;
      }
      
      if (modified) {
        await writeFile(file, content);
        fixCount++;
      }
    } catch (error) {
      console.warn(`⚠️  Could not fix ${file}: ${error.message}`);
    }
  }
  
  console.log(`   Fixed ${fixCount} files with null check issues`);
}

/**
 * Find all Svelte files
 */
async function findSvelteFiles() {
  const files = [];
  
  async function scanDirectory(dirPath) {
    try {
      const entries = await readdir(dirPath);
      
      for (const entry of entries) {
        const fullPath = join(dirPath, entry);
        const stats = await stat(fullPath);
        
        if (stats.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (entry.endsWith('.svelte')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore directories we can't read
    }
  }
  
  await scanDirectory(COMPONENTS_PATH);
  return files;
}

// Run fixes if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as fixTypeScriptErrors };