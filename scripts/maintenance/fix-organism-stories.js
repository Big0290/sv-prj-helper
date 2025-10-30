#!/usr/bin/env node

/**
 * Script to fix organism stories that incorrectly pass children to components that don't accept them
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

// List of organisms that don't accept children and need to be fixed
const componentsToFix = [
	// Barcode
	'BarcodeDisplay', 'BarcodeInput', 'BarcodeModal', 'BarcodeScanner', 'QuickScan',
	// Chat
	'Chat', 'ChatHeader', 'ChatInput', 'ChatRoomList', 'ChatSearch',
	'MessageDivider', 'PinnedMessages', 'UserProfile', 'VoiceRecorder',
	// Data
	'Carousel', 'Timeline', 'TreeView',
	// Editor
	'CodeBlock', 'CodeEditor', 'LiveCodePreview', 'MarkdownEditor', 'RichTextEditor',
	// Interactive
	'CommandPalette', 'ConfirmDialog', 'ContextMenu', 'Dropdown', 'Popover',
	// Media
	'AudioButton', 'ImageCropper', 'ImageGallery', 'MediaGallery', 'Webcam',
	// Navigation
	'BottomNavigation', 'Stepper', 'Tabs',
	// Table
	'DataTable', 'SimpleTable', 'TableBulkActions', 'TableCard', 'TablePagination',
	'TableRowActions', 'TableSkeleton', 'TableToolbar',
	// Utils
	'DragAndDrop', 'VirtualList'
];

async function fixStoryFile(filePath) {
	try {
		let content = readFileSync(filePath, 'utf-8');
		
		// Check if this is a placeholder story with children
		const hasPlaceholderPattern = /<Story name="(Default|Variation \d+)">\s*<(\w+)>.*?<\/\2>\s*<\/Story>/gs;
		
		if (!hasPlaceholderPattern.test(content)) {
			return false; // Not a placeholder story, skip
		}
		
		// Extract component name from import
		const importMatch = content.match(/import (\w+) from/);
		if (!importMatch) return false;
		
		const componentName = importMatch[1];
		
		// Replace placeholder stories with proper args-based stories
		content = content.replace(
			/<Story name="Default">\s*<\w+>.*?<\/\w+>\s*<\/Story>/gs,
			`<Story name="Default" args={{}} />`
		);
		
		content = content.replace(
			/<Story name="(Variation \d+)">\s*<\w+>.*?<\/\w+>\s*<\/Story>/gs,
			`<Story name="$1" args={{}} />`
		);
		
		writeFileSync(filePath, content, 'utf-8');
		console.log(`✓ Fixed: ${filePath}`);
		return true;
	} catch (error) {
		console.error(`✗ Error fixing ${filePath}:`, error.message);
		return false;
	}
}

async function main() {
	console.log('Finding organism story files...\n');
	
	// Find all organism story files
	const storyFiles = await glob('src/lib/ui/organisms/**/*.stories.svelte', {
		cwd: rootDir,
		absolute: true
	});
	
	console.log(`Found ${storyFiles.length} organism story files\n`);
	
	let fixedCount = 0;
	
	for (const file of storyFiles) {
		const wasFixed = await fixStoryFile(file);
		if (wasFixed) fixedCount++;
	}
	
	console.log(`\n✓ Fixed ${fixedCount} out of ${storyFiles.length} files`);
}

main().catch(console.error);

