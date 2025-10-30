#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

// Hook mappings - which hooks should be copied to which component folders
const hookMappings = {
  'useCodeEditor.ts': [
    'src/lib/ui/organisms/editor/CodeEditor',
    'src/lib/ui/organisms/editor/MarkdownEditor',
    'src/lib/ui/organisms/editor/RichTextEditor',
    'src/lib/ui/organisms/editor/LiveCodePreview'
  ],
  'useToast.svelte.ts': [
    'src/lib/ui/molecules/Toast',
    'src/lib/ui/molecules/Snackbar'
  ],
  'useDialog.svelte.ts': [
    'src/lib/ui/organisms/interactive/Modal',
    'src/lib/ui/organisms/interactive/ConfirmDialog',
    'src/lib/ui/organisms/interactive/Drawer',
    'src/lib/ui/organisms/barcode/BarcodeModal'
  ],
  'useMediaQuery.svelte.ts': [
    'src/lib/ui/organisms/navigation/Sidebar',
    'src/lib/ui/organisms/navigation/Drawer',
    'src/lib/ui/organisms/interactive/Drawer'
  ],
  'useLocalStorage.svelte.ts': [
    'src/lib/ui/organisms/interactive/CommandPalette',
    'src/lib/ui/organisms/forms/MultiSelect',
    'src/lib/ui/organisms/navigation/Sidebar'
  ]
};

function duplicateHooks() {
  console.log('Duplicating shared hooks...\n');
  
  Object.entries(hookMappings).forEach(([hookFile, componentFolders]) => {
    let hookPath = join(rootDir, 'src/lib/hooks', hookFile);
    
    if (!existsSync(hookPath)) {
      // Try ui/hooks path
      const altHookPath = join(rootDir, 'src/lib/ui/hooks', hookFile);
      if (!existsSync(altHookPath)) {
        console.warn(`  ⚠ Hook not found: ${hookFile}`);
        return;
      }
      hookPath = altHookPath;
    }
    
    const hookContent = readFileSync(hookPath, 'utf8');
    
    componentFolders.forEach(componentFolder => {
      const targetFolder = join(rootDir, componentFolder);
      
      if (!existsSync(targetFolder)) {
        console.warn(`  ⚠ Component folder not found: ${componentFolder}`);
        return;
      }
      
      // Create hooks subdirectory if it doesn't exist
      const hooksDir = join(targetFolder, 'hooks');
      mkdirSync(hooksDir, { recursive: true });
      
      // Copy the hook file
      const targetPath = join(hooksDir, hookFile);
      writeFileSync(targetPath, hookContent);
      
      console.log(`  ✓ Copied ${hookFile} to ${componentFolder}/hooks/`);
    });
  });
  
  console.log('\n✅ Hook duplication complete!');
}

duplicateHooks();

