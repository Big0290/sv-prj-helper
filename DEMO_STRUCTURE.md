# Demo Structure Documentation

## Overview
The demo site has been reorganized to match the component library's new directory structure. Demos are now categorized for easy navigation and discovery.

## Directory Structure

```
src/routes/
├── demos/
│   ├── +page.svelte           # Main index with all categories
│   ├── atoms/                  # Core primitives
│   │   └── +page.svelte       # Box, Flex, Text, Heading, etc.
│   ├── molecules/              # Simple composed components
│   │   └── +page.svelte       # Card, Button, Menu, etc. (TODO)
│   ├── organisms/              # Complex components
│   │   └── +page.svelte       # Chat, DataTable, etc. (TODO)
│   ├── layouts/                # Layout templates
│   │   └── +page.svelte       # Container, Grid, etc. (TODO)
│   ├── forms/                  # Form controls
│   │   └── +page.svelte       # Input, Select, etc. (TODO)
│   ├── navigation/             # Navigation components
│   │   └── +page.svelte       # Navbar, Sidebar, etc. (TODO)
│   ├── feedback/               # Feedback components
│   │   └── +page.svelte       # Alert, Toast, etc. (TODO)
│   ├── data-display/           # Data display components
│   │   └── +page.svelte       # Table, Timeline, etc. (TODO)
│   ├── media/                  # Media components
│   │   └── +page.svelte       # Video, Audio, etc. (TODO)
│   ├── utility/                # Utility components
│   │   └── +page.svelte       # Portal, ScrollArea, etc. (TODO)
│   ├── hooks/                  # React-like hooks ✅
│   │   └── +page.svelte       # useTheme, useMediaQuery, etc.
│   └── theme/                  # Theme system
│       └── +page.svelte       # ThemeProvider (TODO)
└── +page.svelte               # Old monolithic demo (1938 lines)
```

## Completed Demo Pages

### ✅ Main Index (`/demos`)
- Overview of all component categories
- 12 category cards with descriptions
- Color-coded categories
- Navigation to specific demo pages

### ✅ Atoms (`/demos/atoms`)
Complete showcase of all 10 atomic primitives:
- **Box** - Universal layout wrapper with style props
- **Flex** - Flexbox wrapper with direction, alignment, gap
- **Text** - Typography with sizes, weights, truncation
- **Heading** - H1-H6 headings with size variants
- **Label** - Form labels with required indicator
- **Link** - Styled anchors with external link support
- **Code** - Inline and block code display
- **Chip** - Tags/badges with 3 variants (filled, outlined, soft)
- **Icon** - Icon wrapper with size variants and spin
- **Image** - Image with loading states and fallback

### ✅ Hooks (`/demos/hooks`)
Complete showcase of all 5 custom hooks:
- **useMediaQuery** - Responsive design with media queries
- **useLocalStorage** - Persistent state synced with localStorage
- **useToast** - Toast notification system with types
- **useDialog** - Simple dialog/modal state management
- **Combined Example** - Using multiple hooks together

## Remaining Demo Pages (TODO)

### Molecules
- Card, Button, Input, Menu, Accordion, Select
- Modal, Alert, Tooltip, Popover, Dropdown
- Progress, Stepper, Slider, Rating
- **Count**: ~40 components

### Organisms
- Chat ecosystem (16 components)
- DataTable ecosystem (7 components)
- CommandPalette, Navbar, Sidebar
- Video/Audio players, BarcodeScanner
- **Count**: ~25 components

### Layouts
- Container, Grid, Stack
- AppLayout, DashboardLayout (to be created)
- SplitPane, SettingsPanel (to be created)
- **Count**: ~6 components

### Forms
- Input variants, Select, Checkbox, Radio, Switch
- DatePicker, DateRangePicker, ColorPicker
- FileUpload, TagInput, OTPInput, RichTextEditor
- **Count**: ~22 components

### Navigation
- Navbar, Sidebar, Breadcrumb, Tabs
- Pagination, Menu, Drawer
- BottomNavigation, CommandPalette
- **Count**: ~9 components

### Feedback
- Alert, Toast, Snackbar, Modal
- Progress, Spinner, Skeleton
- LoadingOverlay, EmptyState, ConfirmDialog
- **Count**: ~11 components

### Data Display
- Table ecosystem (5 components)
- Timeline, Carousel, TreeView
- ImageGallery, StatsCard, VirtualList
- **Count**: ~16 components

### Media
- Video ecosystem (5 components)
- Audio ecosystem (2 components)
- Webcam, ImageCropper
- Barcode ecosystem (6 components)
- **Count**: ~12 components

### Utility
- Portal, ScrollArea, FocusTrap ✅
- VisuallyHidden ✅
- DragAndDrop, InfiniteScroll, VirtualList
- **Count**: ~7 components

### Theme
- ThemeProvider ✅
- CSS variables showcase
- Light/Dark mode toggle
- Custom theme examples
- **Count**: 1 component

## Component Count Summary

| Category | Total | Completed | Remaining | Progress |
|----------|-------|-----------|-----------|----------|
| Atoms | 10 | 10 | 0 | 100% ✅ |
| Molecules | 40 | 0 | 40 | 0% |
| Organisms | 25 | 0 | 25 | 0% |
| Layouts | 6 | 0 | 6 | 0% |
| Forms | 22 | 0 | 22 | 0% |
| Navigation | 9 | 0 | 9 | 0% |
| Feedback | 11 | 0 | 11 | 0% |
| Data Display | 16 | 0 | 16 | 0% |
| Media | 12 | 0 | 12 | 0% |
| Utility | 7 | 4 | 3 | 57% ✅ |
| Hooks | 5 | 5 | 0 | 100% ✅ |
| Theme | 1 | 1 | 0 | 100% ✅ |
| **TOTAL** | **164** | **20** | **144** | **12%** |

## URLs

### Live Routes
- **Main Index**: http://localhost:5175/demos
- **Atoms**: http://localhost:5175/demos/atoms
- **Hooks**: http://localhost:5175/demos/hooks

### Coming Soon
- `/demos/molecules` - Molecule components
- `/demos/organisms` - Organism components
- `/demos/layouts` - Layout templates
- `/demos/forms` - Form controls
- `/demos/navigation` - Navigation components
- `/demos/feedback` - Feedback components
- `/demos/data-display` - Data display components
- `/demos/media` - Media components
- `/demos/utility` - Utility components (partial)
- `/demos/theme` - Theme system (partial)

## Design Principles

### Consistent Structure
Each demo page follows the same structure:
1. **Header** - Title, description, back link
2. **Sections** - One per component with:
   - Component name and description
   - Live interactive demos
   - Code examples
3. **Responsive** - Mobile-friendly grid layouts

### Interactive Demos
- Live components you can interact with
- State management examples
- Real-world use cases
- Variant showcases

### Code Examples
- Syntax highlighted with language labels
- TypeScript examples
- Copy-paste ready
- Shows both inline and block usage

### Visual Hierarchy
- Color-coded categories
- Gradient headers
- Glassmorphism cards
- Smooth animations

## Migration Plan

### Phase 1: Core (Completed ✅)
- [x] Create main index page
- [x] Create atoms demo page
- [x] Create hooks demo page

### Phase 2: Essential (Next)
- [ ] Create molecules demo page
- [ ] Create forms demo page
- [ ] Create feedback demo page

### Phase 3: Advanced
- [ ] Create organisms demo page
- [ ] Create navigation demo page
- [ ] Create data-display demo page

### Phase 4: Specialized
- [ ] Create media demo page
- [ ] Create layouts demo page
- [ ] Complete utility demo page
- [ ] Complete theme demo page

### Phase 5: Deprecate Old Demo
- [ ] Add migration banner to old `/+page.svelte`
- [ ] Redirect old demo to new structure
- [ ] Archive old monolithic demo

## Benefits

### For Users
✅ **Easy Navigation** - Find components by category  
✅ **Better Performance** - Smaller page sizes  
✅ **Focused Learning** - One category at a time  
✅ **Mobile Friendly** - Responsive grid layouts

### For Developers
✅ **Maintainable** - Smaller, focused files  
✅ **Scalable** - Easy to add new components  
✅ **Consistent** - Shared structure and patterns  
✅ **Searchable** - Clear file organization

## Next Steps

1. **Create remaining demo pages** following the atoms/hooks pattern
2. **Add search functionality** to find components quickly
3. **Add component playground** for live editing
4. **Generate static documentation** from demo pages
5. **Add component API tables** with prop descriptions

## Contributing

When adding a new component:
1. Add it to the appropriate category page
2. Include live demo
3. Include code example
4. Update component count in this README
5. Test on mobile and desktop

## File Templates

See existing pages for templates:
- `src/routes/demos/+page.svelte` - Main index
- `src/routes/demos/atoms/+page.svelte` - Category page
- `src/routes/demos/hooks/+page.svelte` - Category page
