# Design Document

## Overview

This design outlines the systematic reorganization of the SV Project Helper UI Library component structure, migrating all components from `src/lib/components/` to the appropriate folders within the `src/lib/ui/` system. The reorganization follows atomic design principles and creates a more maintainable, scalable architecture.

## Architecture

### Current State
- **Legacy Location**: `src/lib/components/` contains 100+ components in a flat structure
- **UI System**: `src/lib/ui/` contains organized folders (atoms, molecules, organisms, layouts, utils, hooks, theme)
- **Export System**: Two separate index files managing exports

### Target State
- **Unified Structure**: All components organized within `src/lib/ui/` following atomic design
- **Clear Hierarchy**: Components categorized by complexity and purpose
- **Single Export System**: Consolidated exports through `src/lib/ui/index.ts`
- **Backward Compatibility**: Main `src/lib/index.ts` re-exports from UI system

## Components and Interfaces

### Component Categorization Strategy

#### Atoms (Basic Building Blocks)
**Criteria**: Single-purpose, no internal components, minimal props
- **Form Controls**: Button, Input, Textarea, Checkbox, Radio, Switch, Slider
- **Display Elements**: Badge, StatusDot, Divider, Avatar, Spinner, Progress
- **Media Elements**: Image (existing), Icon (existing), Audio, Video
- **Utility Elements**: CopyButton, LoadingOverlay

#### Molecules (Simple Compositions)
**Criteria**: Combine atoms, single responsibility, reusable patterns
- **Form Groups**: ButtonGroup, TagInput, OTPInput, ColorPicker, Rating
- **Navigation Elements**: Breadcrumb, MenuItem (existing), Pagination
- **Feedback Elements**: Alert, Toast, Tooltip, Snackbar, Skeleton
- **Content Elements**: Card, StatsCard, EmptyState, Accordion

#### Organisms (Complex Components)
**Criteria**: Multiple molecules/atoms, specific business logic, feature-complete
- **Data Components**: DataTable, SimpleTable, TableCard, TreeView, Timeline, Carousel
- **Form Components**: FileUpload, MultiSelect, DatePicker, DateRangePicker, SearchField
- **Navigation Systems**: Navbar, Sidebar, Tabs, Breadcrumbs, BottomNavigation, Stepper
- **Interactive Systems**: Modal, Drawer, ConfirmDialog, Dropdown, Popover, ContextMenu, CommandPalette
- **Media Systems**: ImageGallery, ImageCropper, Webcam, MediaGallery
- **Barcode Systems**: BarcodeScanner, BarcodeModal, BarcodeInput, BarcodeButton, BarcodeDisplay, QuickScan

#### Layouts (Structural Components)
**Criteria**: Define page/section structure, manage spacing and positioning
- **Containers**: Container, Grid, Stack, Box (existing), Flex (existing)
- **Specialized Layouts**: Chat system components, Video components, Table components

#### Utils (Utility Components)
**Criteria**: Provide functionality, not visual, enhance other components
- **Existing**: Portal, ScrollArea, FocusTrap, VisuallyHidden
- **New**: DragAndDrop, InfiniteScroll, VirtualList

### Specialized Component Groups

#### Chat System (organisms/chat/)
Complex interconnected components forming a complete chat system:
- Chat, ChatBubble, ChatInput, ChatHeader, ChatRoomList, ChatSearch
- MessageAttachment, MessageStatus, MessageReaction, MessageDivider, MessageQuote, MessageMenu
- UserProfile, OnlineUsersList, TypingIndicator, PinnedMessages, VoiceRecorder

#### Table System (organisms/table/)
Comprehensive data table functionality:
- DataTable, SimpleTable, TableCard, TablePagination, TableToolbar
- TableBulkActions, TableSkeleton, TableRowActions

#### Video System (organisms/video/)
Complete video management and playback:
- Video, VideoButton, VideoCard, VideoProgress, VideoPlaylist

#### Rich Text System (organisms/editor/)
Advanced text editing capabilities:
- RichTextEditor, MarkdownEditor, CodeEditor, CodeBlock, LiveCodePreview

## Data Models

### Migration Mapping
```typescript
interface ComponentMigration {
  source: string;           // Current path in components/
  target: string;           // New path in ui/
  category: 'atoms' | 'molecules' | 'organisms' | 'layouts' | 'utils';
  subFolder?: string;       // Optional subfolder for grouped components
  dependencies: string[];   // Other components this depends on
  dependents: string[];     // Components that depend on this
}
```

### Export Structure
```typescript
interface ExportStructure {
  component: string;        // Component name
  types?: string[];         // Associated type exports
  path: string;            // New import path
  alias?: string;          // Export alias if needed
}
```

## Error Handling

### Migration Validation
- **Dependency Checking**: Verify all component dependencies are resolved after migration
- **Import Path Validation**: Ensure all relative imports are updated correctly
- **Type Export Verification**: Confirm all TypeScript interfaces are properly exported
- **Build Verification**: Validate that the library builds successfully after each migration batch

### Rollback Strategy
- **Incremental Migration**: Move components in logical groups to enable partial rollback
- **Backup Preservation**: Keep original components until full migration is verified
- **Export Compatibility**: Maintain dual exports during transition period

## Testing Strategy

### Validation Approach
- **Build Testing**: Verify TypeScript compilation after each migration phase
- **Import Testing**: Test component imports from both old and new paths
- **Functionality Testing**: Ensure component behavior remains unchanged
- **Demo Page Testing**: Verify all demo routes continue to work

### Migration Phases
1. **Phase 1**: Atoms (simple, minimal dependencies)
2. **Phase 2**: Molecules (moderate complexity)
3. **Phase 3**: Organisms (complex, grouped by system)
4. **Phase 4**: Layouts and Utils
5. **Phase 5**: Export consolidation and cleanup

### Quality Assurance
- **Automated Checks**: TypeScript strict mode validation
- **Manual Verification**: Component functionality and styling
- **Documentation Updates**: Ensure all references are updated
- **Performance Impact**: Monitor bundle size and build times