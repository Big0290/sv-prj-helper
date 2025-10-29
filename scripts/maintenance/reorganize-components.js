#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Component categories and their mappings
const componentCategories = {
  atoms: [
    'Audio', 'Avatar', 'Badge', 'Box', 'Button', 'Checkbox', 'Chip', 'Code', 
    'CopyButton', 'Divider', 'Flex', 'Heading', 'Icon', 'Image', 'Input', 
    'Label', 'Link', 'LoadingOverlay', 'Progress', 'Radio', 'Slider', 
    'Spinner', 'StatusDot', 'Switch', 'Text', 'Textarea', 'Video'
  ],
  molecules: [
    'Accordion', 'Alert', 'Breadcrumb', 'ButtonGroup', 'Card', 'ColorPicker',
    'EmptyState', 'Menu', 'MenuItem', 'OTPInput', 'Pagination', 'Rating',
    'Skeleton', 'Snackbar', 'StatsCard', 'TagInput', 'Toast', 'Tooltip'
  ],
  organisms: {
    barcode: ['BarcodeButton', 'BarcodeDisplay', 'BarcodeInput', 'BarcodeModal', 'BarcodeScanner', 'QuickScan'],
    chat: ['Chat', 'ChatBubble', 'ChatHeader', 'ChatInput', 'ChatRoomList', 'ChatSearch', 
           'MessageAttachment', 'MessageDivider', 'MessageMenu', 'MessageQuote', 
           'MessageReaction', 'MessageStatus', 'OnlineUsersList', 'PinnedMessages', 
           'TypingIndicator', 'UserProfile', 'VoiceRecorder'],
    data: ['Carousel', 'Timeline', 'TreeView'],
    editor: ['CodeBlock', 'CodeEditor', 'LiveCodePreview', 'MarkdownEditor', 'RichTextEditor'],
    forms: ['DatePicker', 'DateRangePicker', 'FileUpload', 'MultiSelect', 'SearchField', 'Select'],
    interactive: ['CommandPalette', 'ConfirmDialog', 'ContextMenu', 'Drawer', 'Dropdown', 'FAB', 'Modal', 'Popover'],
    media: ['AudioButton', 'ImageCropper', 'ImageGallery', 'MediaGallery', 'Webcam'],
    navigation: ['BottomNavigation', 'Breadcrumbs', 'Navbar', 'Sidebar', 'Stepper', 'Tabs'],
    table: ['DataTable', 'SimpleTable', 'TableBulkActions', 'TableCard', 'TablePagination', 'TableRowActions', 'TableSkeleton', 'TableToolbar'],
    video: ['VideoButton', 'VideoCard', 'VideoPlaylist', 'VideoProgress']
  },
  layouts: ['Container', 'Grid', 'Stack'],
  utils: ['DragAndDrop', 'FocusTrap', 'InfiniteScroll', 'Portal', 'ScrollArea', 'VirtualList', 'VisuallyHidden'],
  theme: ['ThemeProvider']
};

function createComponentFolder(category, subcategory, componentName) {
  const basePath = subcategory 
    ? join(rootDir, 'src/lib/components', category, subcategory, componentName)
    : join(rootDir, 'src/lib/components', category, componentName);
  
  if (!existsSync(basePath)) {
    mkdirSync(basePath, { recursive: true });
  }
  
  return basePath;
}

function extractPropsFromComponent(componentContent) {
  // Simple regex to extract interface Props from component
  const interfaceMatch = componentContent.match(/interface\s+Props\s*{([^}]*)}/s);
  if (!interfaceMatch) return null;
  
  return interfaceMatch[1].trim();
}

function generateTypesFile(componentName, propsContent) {
  return `import type { Snippet } from 'svelte';

export interface ${componentName}Props {
${propsContent || '  // Add component props here'}
}

export interface ${componentName}Events {
  // Add component events here
}

export interface ${componentName}Slots {
  default: {};
}`;
}

function generateReadmeFile(componentName, category) {
  return `# ${componentName}

A ${category} component from the SV Project Helper UI library.

## Usage

\`\`\`svelte
<script>
  import { ${componentName} } from '@sv-project-helper/ui';
</script>

<${componentName}>
  <!-- Component content -->
</${componentName}>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| - | - | - | Add component props documentation |

## Events

| Event | Type | Description |
|-------|------|-------------|
| - | - | Add component events documentation |

## Accessibility

- Add accessibility features and guidelines
- Include keyboard navigation details
- Document ARIA attributes

## Examples

\`\`\`svelte
<!-- Add usage examples -->
<${componentName}>
  Example content
</${componentName}>
\`\`\``;
}

function generateIndexFile(componentName) {
  return `export { default as ${componentName} } from './${componentName}.svelte';
export type { ${componentName}Props, ${componentName}Events, ${componentName}Slots } from './${componentName}.types.js';`;
}

function copyAndUpdateComponent(oldPath, newPath, componentName) {
  if (!existsSync(oldPath)) {
    console.warn(`Component not found: ${oldPath}`);
    return;
  }
  
  const content = readFileSync(oldPath, 'utf8');
  
  // Extract props for types file
  const propsContent = extractPropsFromComponent(content);
  
  // Update component to use types import
  const updatedContent = content.replace(
    /interface\s+Props\s*{[^}]*}/s,
    `import type { ${componentName}Props } from './${componentName}.types.js';`
  ).replace(
    /let\s*{\s*([^}]*)\s*}:\s*Props\s*=\s*\$props\(\);/s,
    `let { $1 }: ${componentName}Props = $props();`
  );
  
  // Write updated component
  writeFileSync(join(newPath, `${componentName}.svelte`), updatedContent);
  
  // Generate types file
  writeFileSync(join(newPath, `${componentName}.types.ts`), generateTypesFile(componentName, propsContent));
  
  // Generate README
  writeFileSync(join(newPath, 'README.md'), generateReadmeFile(componentName, 'component'));
  
  // Generate index file
  writeFileSync(join(newPath, 'index.ts'), generateIndexFile(componentName));
  
  console.log(`✓ Reorganized ${componentName}`);
}

function reorganizeComponents() {
  console.log('Starting component reorganization...\n');
  
  // Process atoms
  componentCategories.atoms.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/atoms', `${componentName}.svelte`);
    const newPath = createComponentFolder('atoms', null, componentName);
    copyAndUpdateComponent(oldPath, newPath, componentName);
  });
  
  // Process molecules
  componentCategories.molecules.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/molecules', `${componentName}.svelte`);
    const newPath = createComponentFolder('molecules', null, componentName);
    copyAndUpdateComponent(oldPath, newPath, componentName);
  });
  
  // Process organisms (with subcategories)
  Object.entries(componentCategories.organisms).forEach(([subcategory, components]) => {
    components.forEach(componentName => {
      const oldPath = join(rootDir, 'src/lib/ui/organisms', subcategory, `${componentName}.svelte`);
      const newPath = createComponentFolder('organisms', subcategory, componentName);
      copyAndUpdateComponent(oldPath, newPath, componentName);
    });
  });
  
  // Process layouts
  componentCategories.layouts.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/layouts', `${componentName}.svelte`);
    const newPath = createComponentFolder('layouts', null, componentName);
    copyAndUpdateComponent(oldPath, newPath, componentName);
  });
  
  // Process utils
  componentCategories.utils.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/utils', `${componentName}.svelte`);
    const newPath = createComponentFolder('utils', null, componentName);
    copyAndUpdateComponent(oldPath, newPath, componentName);
  });
  
  // Process theme
  componentCategories.theme.forEach(componentName => {
    const oldPath = join(rootDir, 'src/lib/ui/theme', `${componentName}.svelte`);
    const newPath = createComponentFolder('theme', null, componentName);
    copyAndUpdateComponent(oldPath, newPath, componentName);
  });
  
  console.log('\n✅ Component reorganization complete!');
}

// Run the reorganization
reorganizeComponents();