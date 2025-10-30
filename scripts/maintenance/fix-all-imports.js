#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

const ALL_COMPONENTS = {
  // Atoms
  Audio: 'src/lib/ui/atoms/Audio/Audio.svelte',
  Avatar: 'src/lib/ui/atoms/Avatar/Avatar.svelte',
  Badge: 'src/lib/ui/atoms/Badge/Badge.svelte',
  Box: 'src/lib/ui/atoms/Box/Box.svelte',
  Button: 'src/lib/ui/atoms/Button/Button.svelte',
  Checkbox: 'src/lib/ui/atoms/Checkbox/Checkbox.svelte',
  Chip: 'src/lib/ui/atoms/Chip/Chip.svelte',
  Code: 'src/lib/ui/atoms/Code/Code.svelte',
  CopyButton: 'src/lib/ui/atoms/CopyButton/CopyButton.svelte',
  Divider: 'src/lib/ui/atoms/Divider/Divider.svelte',
  Flex: 'src/lib/ui/atoms/Flex/Flex.svelte',
  GlassCard: 'src/lib/ui/atoms/GlassCard/GlassCard.svelte',
  Heading: 'src/lib/ui/atoms/Heading/Heading.svelte',
  Icon: 'src/lib/ui/atoms/Icon/Icon.svelte',
  Image: 'src/lib/ui/atoms/Image/Image.svelte',
  Input: 'src/lib/ui/atoms/Input/Input.svelte',
  Label: 'src/lib/ui/atoms/Label/Label.svelte',
  Link: 'src/lib/ui/atoms/Link/Link.svelte',
  LoadingOverlay: 'src/lib/ui/atoms/LoadingOverlay/LoadingOverlay.svelte',
  Progress: 'src/lib/ui/atoms/Progress/Progress.svelte',
  Radio: 'src/lib/ui/atoms/Radio/Radio.svelte',
  Slider: 'src/lib/ui/atoms/Slider/Slider.svelte',
  Spinner: 'src/lib/ui/atoms/Spinner/Spinner.svelte',
  StatusDot: 'src/lib/ui/atoms/StatusDot/StatusDot.svelte',
  Switch: 'src/lib/ui/atoms/Switch/Switch.svelte',
  Text: 'src/lib/ui/atoms/Text/Text.svelte',
  Textarea: 'src/lib/ui/atoms/Textarea/Textarea.svelte',
  Video: 'src/lib/ui/atoms/Video/Video.svelte',
  
  // Molecules
  Accordion: 'src/lib/ui/molecules/Accordion/Accordion.svelte',
  Alert: 'src/lib/ui/molecules/Alert/Alert.svelte',
  Breadcrumb: 'src/lib/ui/molecules/Breadcrumb/Breadcrumb.svelte',
  ButtonGroup: 'src/lib/ui/molecules/ButtonGroup/ButtonGroup.svelte',
  Card: 'src/lib/ui/molecules/Card/Card.svelte',
  ColorPicker: 'src/lib/ui/molecules/ColorPicker/ColorPicker.svelte',
  EmptyState: 'src/lib/ui/molecules/EmptyState/EmptyState.svelte',
  Menu: 'src/lib/ui/molecules/Menu/Menu.svelte',
  MenuItem: 'src/lib/ui/molecules/MenuItem/MenuItem.svelte',
  OTPInput: 'src/lib/ui/molecules/OTPInput/OTPInput.svelte',
  Pagination: 'src/lib/ui/molecules/Pagination/Pagination.svelte',
  Rating: 'src/lib/ui/molecules/Rating/Rating.svelte',
  Skeleton: 'src/lib/ui/molecules/Skeleton/Skeleton.svelte',
  Snackbar: 'src/lib/ui/molecules/Snackbar/Snackbar.svelte',
  StaticCodeExample: 'src/lib/ui/molecules/StaticCodeExample/StaticCodeExample.svelte',
  StatsCard: 'src/lib/ui/molecules/StatsCard/StatsCard.svelte',
  TagInput: 'src/lib/ui/molecules/TagInput/TagInput.svelte',
  Toast: 'src/lib/ui/molecules/Toast/Toast.svelte',
  Tooltip: 'src/lib/ui/molecules/Tooltip/Tooltip.svelte',
};

function processDirectory(dir, callback) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const path = join(dir, item);
    const stat = statSync(path);
    
    if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.svelte-kit')) {
      processDirectory(path, callback);
    } else if (stat.isFile() && item.endsWith('.svelte')) {
      callback(path);
    }
  }
}

function fixImportsInFile(filePath) {
  let content = readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix all component imports
  for (const [componentName, componentPath] of Object.entries(ALL_COMPONENTS)) {
    const oldImportPattern = new RegExp(`from ['"](.*?)${componentName}\\.svelte['"]`, 'g');
    
    content = content.replace(oldImportPattern, (match, prefix) => {
      modified = true;
      // Calculate relative path from current file to component
      const currentDir = dirname(filePath);
      const componentDir = join(rootDir, componentPath);
      
      // Simple relative path calculation
      let relative = join(currentDir, componentPath.replace('src/lib/ui/', ''));
      relative = relative.replace(filePath, '');
      
      return `from '${componentPath}'`;
    });
  }
  
  if (modified) {
    writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

function fixAllImports() {
  console.log('Fixing all component imports...\n');
  let count = 0;
  
  processDirectory(join(rootDir, 'src/lib/ui'), (filePath) => {
    if (fixImportsInFile(filePath)) {
      count++;
      console.log(`✓ Fixed ${filePath}`);
    }
  });
  
  console.log(`\n✓ Fixed ${count} files`);
}

fixAllImports();

