#!/usr/bin/env node

import { unlinkSync, existsSync, readdirSync } from 'fs';
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

function cleanupOldFiles() {
  console.log('Cleaning up old component files...\n');
  let count = 0;
  
  // Clean atoms
  categories.atoms.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/atoms', `${componentName}.svelte`);
    if (existsSync(oldPath)) {
      unlinkSync(oldPath);
      count++;
    }
  });
  
  // Clean molecules
  categories.molecules.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/molecules', `${componentName}.svelte`);
    if (existsSync(oldPath)) {
      unlinkSync(oldPath);
      count++;
    }
  });
  
  // Clean organisms
  Object.entries(categories.organisms).forEach(([subcategory, components]) => {
    components.forEach(componentName => {
      const oldPath = join(rootDir, 'src/lib/ui/organisms', subcategory, `${componentName}.svelte`);
      if (existsSync(oldPath)) {
        unlinkSync(oldPath);
        count++;
      }
    });
  });
  
  // Clean layouts
  categories.layouts.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/layouts', `${componentName}.svelte`);
    if (existsSync(oldPath)) {
      unlinkSync(oldPath);
      count++;
    }
  });
  
  // Clean utils
  categories.utils.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/utils', `${componentName}.svelte`);
    if (existsSync(oldPath)) {
      unlinkSync(oldPath);
      count++;
    }
  });
  
  // Clean theme
  categories.theme.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/theme', `${componentName}.svelte`);
    if (existsSync(oldPath)) {
      unlinkSync(oldPath);
      count++;
    }
  });
  
  // Clean MoneyCounter.stories.svelte from old location
  const oldStoryPath = join(rootDir, 'src/lib/ui/organisms/interactive', 'MoneyCounter.stories.svelte');
  if (existsSync(oldStoryPath)) {
    unlinkSync(oldStoryPath);
    count++;
  }
  
  console.log(`✓ Deleted ${count} old files`);
}

cleanupOldFiles();

