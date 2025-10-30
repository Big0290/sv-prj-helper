#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

const componentCategories = [
  { base: 'atoms', components: ['Audio', 'Avatar', 'Badge', 'Box', 'Button', 'Checkbox', 'Chip', 'Code', 'CopyButton', 'Divider', 'Flex', 'GlassCard', 'Heading', 'Icon', 'Image', 'Input', 'Label', 'Link', 'LoadingOverlay', 'Progress', 'Radio', 'Slider', 'Spinner', 'StatusDot', 'Switch', 'Text', 'Textarea', 'Video'] },
  { base: 'molecules', components: ['Accordion', 'Alert', 'Breadcrumb', 'ButtonGroup', 'Card', 'ColorPicker', 'EmptyState', 'Menu', 'MenuItem', 'OTPInput', 'Pagination', 'Rating', 'Skeleton', 'Snackbar', 'StaticCodeExample', 'StatsCard', 'TagInput', 'Toast', 'Tooltip'] },
  { base: 'organisms/barcode', components: ['BarcodeButton', 'BarcodeDisplay', 'BarcodeInput', 'BarcodeModal', 'BarcodeScanner', 'QuickScan'] },
  { base: 'organisms/chat', components: ['Chat', 'ChatBubble', 'ChatHeader', 'ChatInput', 'ChatRoomList', 'ChatSearch', 'MessageAttachment', 'MessageDivider', 'MessageMenu', 'MessageQuote', 'MessageReaction', 'MessageStatus', 'OnlineUsersList', 'PinnedMessages', 'TypingIndicator', 'UserProfile', 'VoiceRecorder'] },
  { base: 'organisms/data', components: ['Carousel', 'Timeline', 'TreeView'] },
  { base: 'organisms/editor', components: ['CodeBlock', 'CodeEditor', 'LiveCodePreview', 'MarkdownEditor', 'RichTextEditor'] },
  { base: 'organisms/forms', components: ['DatePicker', 'DateRangePicker', 'FileUpload', 'MultiSelect', 'SearchField', 'Select'] },
  { base: 'organisms/interactive', components: ['CommandPalette', 'ConfirmDialog', 'ContextMenu', 'Drawer', 'Dropdown', 'FAB', 'Modal', 'MoneyCounter', 'Popover'] },
  { base: 'organisms/media', components: ['AudioButton', 'ImageCropper', 'ImageGallery', 'MediaGallery', 'Webcam'] },
  { base: 'organisms/navigation', components: ['BottomNavigation', 'Breadcrumbs', 'Navbar', 'Sidebar', 'Stepper', 'Tabs'] },
  { base: 'organisms/table', components: ['DataTable', 'SimpleTable', 'TableBulkActions', 'TableCard', 'TablePagination', 'TableRowActions', 'TableSkeleton', 'TableToolbar'] },
  { base: 'organisms/video', components: ['VideoButton', 'VideoCard', 'VideoPlaylist', 'VideoProgress'] },
  { base: 'layouts', components: ['Container', 'DraggableGrid', 'Grid', 'KanbanBoard', 'Stack'] },
  { base: 'utils', components: ['DragAndDrop', 'FocusTrap', 'InfiniteScroll', 'Portal', 'ScrollArea', 'VirtualList', 'VisuallyHidden'] },
  { base: 'theme', components: ['ThemeProvider'] }
];

function getAllComponentPaths() {
  const componentsMap = {};
  
  componentCategories.forEach(category => {
    category.components.forEach(componentName => {
      componentsMap[componentName] = {
        category: category.base,
        path: join('src/lib/ui', category.base, componentName, `${componentName}.svelte`)
      };
    });
  });
  
  return componentsMap;
}

function fixImportsInFile(filePath, componentsMap) {
  let content = readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix relative imports that reference old structure
  // Pattern: import X from '../atoms/X.svelte' or '../molecules/X.svelte'
  Object.entries(componentsMap).forEach(([componentName, info]) => {
    const oldPatterns = [
      new RegExp(`from\s+['"](\.\./)+${info.category.replace('organisms/', '')}/${componentName}\\.svelte['"]`, 'g'),
      new RegExp(`from\s+['"]\.\./${componentName}\\.svelte['"]`, 'g'),
      new RegExp(`from\s+['"]\./${componentName}\\.svelte['"]`, 'g')
    ];
    
    oldPatterns.forEach(pattern => {
      const oldContent = content;
      content = content.replace(pattern, `from '${info.path}'`);
      if (oldContent !== content) {
        modified = true;
      }
    });
  });
  
  if (modified) {
    writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function processDirectory(dirPath, componentsMap) {
  let fixedCount = 0;
  
  try {
    const items = readdirSync(dirPath);
    
    items.forEach(item => {
      const itemPath = join(dirPath, item);
      const stat = statSync(itemPath);
      
      if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.svelte-kit')) {
        fixedCount += processDirectory(itemPath, componentsMap);
      } else if (stat.isFile() && item.endsWith('.svelte')) {
        if (fixImportsInFile(itemPath, componentsMap)) {
          fixedCount++;
        }
      }
    });
  } catch (err) {
    // Skip if directory doesn't exist
  }
  
  return fixedCount;
}

function fixAllImports() {
  console.log('Fixing component imports...\n');
  
  const componentsMap = getAllComponentPaths();
  const uiLibPath = join(rootDir, 'src/lib/ui');
  
  const fixedCount = processDirectory(uiLibPath, componentsMap);
  
  console.log(`✓ Fixed imports in ${fixedCount} files`);
}

fixAllImports();

