#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
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

function generateStory(category, subcategory, componentName) {
  const basePath = subcategory 
    ? join(rootDir, 'src/lib/ui', category, subcategory, componentName)
    : join(rootDir, 'src/lib/ui', category, componentName);
  
  const storyPath = join(basePath, `${componentName}.stories.svelte`);
  
  // Skip if we've already created enhanced stories (Button, Input, etc.)
  const skipList = ['Button', 'Audio', 'Video', 'Input', 'Checkbox', 'Switch', 'Slider', 'Textarea', 'Badge', 'Avatar', 'Card', 'Rating', 'Modal'];
  if (skipList.includes(componentName)) {
    return false;
  }
  
  // Build title path
  let title = category.charAt(0).toUpperCase() + category.slice(1);
  if (subcategory) {
    title += `/${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`;
  }
  title += `/${componentName}`;
  
  const story = `<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ${componentName} from './${componentName}.svelte';

  const { Story } = defineMeta({
    title: '${title}',
    component: ${componentName},
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ${componentName} component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <${componentName}>Default ${componentName}</${componentName}>
</Story>

<Story name="Variation 1">
  <${componentName}>Variation 1</${componentName}>
</Story>

<Story name="Variation 2">
  <${componentName}>Variation 2</${componentName}>
</Story>
`;
  
  writeFileSync(storyPath, story);
  return true;
}

function generateAllStories() {
  console.log('Generating stories for all components...\n');
  let count = 0;
  
  // Process atoms
  categories.atoms.forEach(componentName => {
    if (generateStory('atoms', null, componentName)) {
      count++;
    }
  });
  
  // Process molecules
  categories.molecules.forEach(componentName => {
    if (generateStory('molecules', null, componentName)) {
      count++;
    }
  });
  
  // Process organisms
  Object.entries(categories.organisms).forEach(([subcategory, components]) => {
    components.forEach(componentName => {
      if (generateStory('organisms', subcategory, componentName)) {
        count++;
      }
    });
  });
  
  // Process layouts
  categories.layouts.forEach(componentName => {
    if (generateStory('layouts', null, componentName)) {
      count++;
    }
  });
  
  // Process utils
  categories.utils.forEach(componentName => {
    if (generateStory('utils', null, componentName)) {
      count++;
    }
  });
  
  // Process theme
  categories.theme.forEach(componentName => {
    if (generateStory('theme', null, componentName)) {
      count++;
    }
  });
  
  console.log(`✓ Generated ${count} new story files`);
}

generateAllStories();

