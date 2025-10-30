#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

// Component categories
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

function extractPropsFromComponent(componentContent) {
  const interfaceMatch = componentContent.match(/interface\s+Props\s*{([^}]*)}/s);
  if (!interfaceMatch) return null;
  
  return interfaceMatch[1].trim();
}

function generateStoryFile(componentName, category, title) {
  return `<script module>
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
`;
}

function generateDocsFile(componentName, category, propsContent) {
  return `# ${componentName}

## Description

${componentName} is a ${category} component that provides [purpose].

## API

### Props

${propsContent ? 'Component props extracted from the component file.' : 'No props documented yet.'}

## Usage Examples

\`\`\`svelte
<script>
  import { ${componentName} } from '@big0290/sv-prj-helper-ui';
</script>

<${componentName}>
  Example content
</${componentName}>
\`\`\`

## Best Practices

- Provide accessible labels and descriptions
- Use appropriate semantic HTML elements
- Consider keyboard navigation and screen readers
`;
}

function restructureComponent(category, subcategory, componentName) {
  const basePath = subcategory 
    ? join(rootDir, 'src/lib/ui', category, subcategory)
    : join(rootDir, 'src/lib/ui', category);
  
  const oldComponentPath = join(basePath, `${componentName}.svelte`);
  const newComponentDir = join(basePath, componentName);
  
  if (!existsSync(oldComponentPath)) {
    console.warn(`  ⚠ Component not found: ${oldComponentPath}`);
    return false;
  }
  
  // Skip if already restructured
  if (existsSync(newComponentDir) && existsSync(join(newComponentDir, `${componentName}.svelte`))) {
    console.log(`  ✓ ${componentName} already restructured`);
    return true;
  }
  
  // Create new directory
  mkdirSync(newComponentDir, { recursive: true });
  
  // Read old component
  const componentContent = readFileSync(oldComponentPath, 'utf8');
  
  // Extract props for documentation
  const propsContent = extractPropsFromComponent(componentContent);
  
  // Generate title for storybook
  const title = subcategory 
    ? `${category.charAt(0).toUpperCase() + category.slice(1)}/${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}/${componentName}`
    : `${category.charAt(0).toUpperCase() + category.slice(1)}/${componentName}`;
  
  // Copy component to new location
  writeFileSync(join(newComponentDir, `${componentName}.svelte`), componentContent);
  
  // Generate story file
  writeFileSync(join(newComponentDir, `${componentName}.stories.svelte`), generateStoryFile(componentName, category, title));
  
  // Generate docs file
  writeFileSync(join(newComponentDir, `${componentName}.md`), generateDocsFile(componentName, category, propsContent));
  
  console.log(`  ✓ Restructured ${componentName}`);
  return true;
}

function restructureAll() {
  console.log('Starting component folder restructuring...\n');
  
  // Process atoms
  console.log('Processing atoms...');
  categories.atoms.forEach(componentName => {
    restructureComponent('atoms', null, componentName);
  });
  
  // Process molecules
  console.log('\nProcessing molecules...');
  categories.molecules.forEach(componentName => {
    restructureComponent('molecules', null, componentName);
  });
  
  // Process organisms
  console.log('\nProcessing organisms...');
  Object.entries(categories.organisms).forEach(([subcategory, components]) => {
    console.log(`  ${subcategory}:`);
    components.forEach(componentName => {
      restructureComponent('organisms', subcategory, componentName);
    });
  });
  
  // Process layouts
  console.log('\nProcessing layouts...');
  categories.layouts.forEach(componentName => {
    restructureComponent('layouts', null, componentName);
  });
  
  // Process utils
  console.log('\nProcessing utils...');
  categories.utils.forEach(componentName => {
    restructureComponent('utils', null, componentName);
  });
  
  // Process theme
  console.log('\nProcessing theme...');
  categories.theme.forEach(componentName => {
    restructureComponent('theme', null, componentName);
  });
  
  console.log('\n✅ Component restructuring complete!');
  console.log('\nNext steps:');
  console.log('1. Update index.ts files to export from new structure');
  console.log('2. Delete old component files');
  console.log('3. Run npm run build to verify');
}

restructureAll();

