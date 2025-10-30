#!/usr/bin/env node

import { writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

const categories = {
  atoms: ['Audio', 'Avatar', 'Badge', 'Box', 'Button', 'Checkbox', 'Chip', 'Code', 
    'CopyButton', 'Divider', 'Flex', 'GlassCard', 'Heading', 'Icon', 'Image', 'Input', 
    'Label', 'Link', 'LoadingOverlay', 'Progress', 'Radio', 'Slider', 
    'Spinner', 'StatusDot', 'Switch', 'Text', 'Textarea', 'Video'],
  molecules: ['Accordion', 'Alert', 'Breadcrumb', 'ButtonGroup', 'Card', 'ColorPicker',
    'EmptyState', 'Menu', 'MenuItem', 'OTPInput', 'Pagination', 'Rating',
    'Skeleton', 'Snackbar', 'StaticCodeExample', 'StatsCard', 'TagInput', 'Toast', 'Tooltip'],
  organisms: {
    barcode: ['BarcodeButton', 'BarcodeDisplay', 'BarcodeInput', 'BarcodeModal', 'BarcodeScanner', 'QuickScan'],
    chat: ['Chat', 'ChatBubble', 'ChatHeader', 'ChatInput', 'ChatRoomList', 'ChatSearch', 
           'MessageAttachment', 'MessageDivider', 'MessageMenu', 'MessageQuote', 
           'MessageReaction', 'MessageStatus', 'OnlineUsersList', 'PinnedMessages', 
           'TypingIndicator', 'UserProfile', 'VoiceRecorder'],
    data: ['Carousel', 'Timeline', 'TreeView'],
    editor: ['CodeBlock', 'CodeEditor', 'LiveCodePreview', 'MarkdownEditor', 'RichTextEditor'],
    forms: ['DatePicker', 'DateRangePicker', 'FileUpload', 'MultiSelect', 'SearchField', 'Select'],
    interactive: ['CommandPalette', 'ConfirmDialog', 'ContextMenu', 'Drawer', 'Dropdown', 'FAB', 'Modal', 'MoneyCounter', 'Popover'],
    media: ['AudioButton', 'ImageCropper', 'ImageGallery', 'MediaGallery', 'Webcam'],
    navigation: ['BottomNavigation', 'Breadcrumbs', 'Navbar', 'Sidebar', 'Stepper', 'Tabs'],
    table: ['DataTable', 'SimpleTable', 'TableBulkActions', 'TableCard', 'TablePagination', 'TableRowActions', 'TableSkeleton', 'TableToolbar'],
    video: ['VideoButton', 'VideoCard', 'VideoPlaylist', 'VideoProgress']
  },
  layouts: ['Container', 'DraggableGrid', 'Grid', 'KanbanBoard', 'Stack'],
  utils: ['DragAndDrop', 'FocusTrap', 'InfiniteScroll', 'Portal', 'ScrollArea', 'VirtualList', 'VisuallyHidden'],
  theme: ['ThemeProvider']
};

function generateCategoryIndex(category, categoryComponents) {
  let exports = [];
  
  categoryComponents.forEach(componentName => {
    const componentPath = join(rootDir, 'src/lib/ui', category, componentName, `${componentName}.svelte`);
    if (existsSync(componentPath)) {
      exports.push(`export { default as ${componentName} } from './${category}/${componentName}/${componentName}.svelte';`);
    }
  });
  
  return exports.join('\n');
}

function generateOrganismSubcategoryIndex(subcategory, subcategoryComponents) {
  let exports = [];
  
  subcategoryComponents.forEach(componentName => {
    const componentPath = join(rootDir, 'src/lib/ui/organisms', subcategory, componentName, `${componentName}.svelte`);
    if (existsSync(componentPath)) {
      exports.push(`export { default as ${componentName} } from './organisms/${subcategory}/${componentName}/${componentName}.svelte';`);
    }
  });
  
  return exports.join('\n');
}

function updateMainIndex() {
  let content = '// ===== ATOMS - Basic Building Blocks =====\n';
  content += '// Form Controls\n';
  content += generateCategoryIndex('atoms', categories.atoms.filter(c => ['Button', 'Input', 'Textarea', 'Checkbox', 'Radio', 'Switch', 'Slider'].includes(c)));
  content += '\n\n// Display Elements\n';
  content += generateCategoryIndex('atoms', categories.atoms.filter(c => ['Badge', 'StatusDot', 'Divider', 'Avatar', 'Spinner', 'Progress'].includes(c)));
  content += '\n\n// Layout Primitives\n';
  content += generateCategoryIndex('atoms', categories.atoms.filter(c => ['Box', 'Flex', 'GlassCard'].includes(c)));
  content += '\n\n// Typography\n';
  content += generateCategoryIndex('atoms', categories.atoms.filter(c => ['Text', 'Heading', 'Label', 'Link', 'Code', 'Chip'].includes(c)));
  content += '\n\n// Media Elements\n';
  content += generateCategoryIndex('atoms', categories.atoms.filter(c => ['Icon', 'Image', 'Audio', 'Video'].includes(c)));
  content += '\n\n// Utility Elements\n';
  content += generateCategoryIndex('atoms', categories.atoms.filter(c => ['CopyButton', 'LoadingOverlay'].includes(c)));
  
  content += '\n\n// ===== MOLECULES - Simple Compositions =====\n';
  content += '// Form Groups\n';
  content += generateCategoryIndex('molecules', categories.molecules.filter(c => ['ButtonGroup', 'TagInput', 'OTPInput', 'ColorPicker', 'Rating'].includes(c)));
  content += '\n\n// Navigation Elements\n';
  content += generateCategoryIndex('molecules', categories.molecules.filter(c => ['Breadcrumb', 'Menu', 'MenuItem', 'Pagination'].includes(c)));
  content += '\n\n// Feedback Elements\n';
  content += generateCategoryIndex('molecules', categories.molecules.filter(c => ['Alert', 'Toast', 'Tooltip', 'Snackbar', 'Skeleton'].includes(c)));
  content += '\n\n// Content Elements\n';
  content += generateCategoryIndex('molecules', categories.molecules.filter(c => ['Card', 'StatsCard', 'EmptyState', 'Accordion', 'StaticCodeExample'].includes(c)));
  
  content += '\n\n// ===== ORGANISMS - Complex Components =====\n';
  content += '// Chat System\n';
  content += generateOrganismSubcategoryIndex('chat', categories.organisms.chat);
  content += '\n\n// Table System\n';
  content += generateOrganismSubcategoryIndex('table', categories.organisms.table);
  content += '\n\n// Video System\n';
  content += generateOrganismSubcategoryIndex('video', categories.organisms.video);
  content += '\n\n// Editor System\n';
  content += generateOrganismSubcategoryIndex('editor', categories.organisms.editor);
  content += '\n\n// Data Components\n';
  content += generateOrganismSubcategoryIndex('data', categories.organisms.data);
  content += '\n\n// Form Components\n';
  content += generateOrganismSubcategoryIndex('forms', categories.organisms.forms);
  content += '\n\n// Navigation Systems\n';
  content += generateOrganismSubcategoryIndex('navigation', categories.organisms.navigation);
  content += '\n\n// Interactive Systems\n';
  content += generateOrganismSubcategoryIndex('interactive', categories.organisms.interactive);
  content += '\n\n// Media Systems\n';
  content += generateOrganismSubcategoryIndex('media', categories.organisms.media);
  content += '\n\n// Barcode Systems\n';
  content += generateOrganismSubcategoryIndex('barcode', categories.organisms.barcode);
  
  content += '\n\n// ===== LAYOUTS - Structural Components =====\n';
  categories.layouts.forEach(componentName => {
    const componentPath = join(rootDir, 'src/lib/ui/layouts', componentName, `${componentName}.svelte`);
    if (existsSync(componentPath)) {
      content += `export { default as ${componentName} } from './layouts/${componentName}/${componentName}.svelte';\n`;
    }
  });
  
  content += '\n\n// ===== UTILS - Utility Components =====\n';
  categories.utils.forEach(componentName => {
    const componentPath = join(rootDir, 'src/lib/ui/utils', componentName, `${componentName}.svelte`);
    if (existsSync(componentPath)) {
      content += `export { default as ${componentName} } from './utils/${componentName}/${componentName}.svelte';\n`;
    }
  });
  
  content += '\n\n// ===== THEME =====\n';
  categories.theme.forEach(componentName => {
    const componentPath = join(rootDir, 'src/lib/ui/theme', componentName, `${componentName}.svelte`);
    if (existsSync(componentPath)) {
      content += `export { default as ${componentName} } from './theme/${componentName}/${componentName}.svelte';\n`;
    }
  });
  
  content += '\n\n// ===== HOOKS =====\n';
  content += 'export { useTheme } from \'./hooks/useTheme.svelte.js\';\n';
  content += 'export type { ThemeContext } from \'./hooks/useTheme.svelte.js\';\n';
  content += '\nexport { useMediaQuery } from \'./hooks/useMediaQuery.svelte.js\';\n';
  content += 'export { useLocalStorage } from \'./hooks/useLocalStorage.svelte.js\';\n';
  content += '\nexport { useToast, createToastContext } from \'./hooks/useToast.svelte.js\';\n';
  content += 'export type { Toast as ToastType, ToastContext } from \'./hooks/useToast.svelte.js\';\n';
  content += '\nexport { useDialog } from \'./hooks/useDialog.svelte.js\';\n';
  
  content += '\n\n// ===== TYPE EXPORTS =====\n';
  content += 'export type { TimelineItem } from \'./organisms/data/Timeline/Timeline.svelte\';\n';
  content += 'export type { CarouselItem } from \'./organisms/data/Carousel/Carousel.svelte\';\n';
  content += 'export type { TreeNode } from \'./organisms/data/TreeView/TreeView.svelte\';\n';
  content += 'export type { NavItem } from \'./organisms/navigation/BottomNavigation/BottomNavigation.svelte\';\n';
  content += 'export type { VideoItem } from \'./organisms/video/VideoPlaylist/VideoPlaylist.svelte\';\n';
  content += 'export type { Attachment } from \'./organisms/chat/MessageAttachment/MessageAttachment.svelte\';\n';
  content += 'export type { Column, Row } from \'./organisms/table/DataTable/DataTable.svelte\';\n';
  content += 'export type { MoneyCounterProps } from \'./organisms/interactive/MoneyCounter/MoneyCounter.svelte\';\n';
  
  const indexPath = join(rootDir, 'src/lib/ui/index.ts');
  writeFileSync(indexPath, content);
  console.log('✓ Updated src/lib/ui/index.ts');
}

updateMainIndex();

