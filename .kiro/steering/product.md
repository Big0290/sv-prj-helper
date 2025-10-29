---
inclusion: always
---

# SV Project Helper UI Library

A modern, accessible Svelte 5 component library with purple-themed glassmorphism design system.

## Design System Requirements

- **Glassmorphism Theme**: Use purple iOS26-inspired liquid glass effects with `backdrop-filter: blur()`
- **CSS Custom Properties**: All theming through CSS variables, never hardcoded colors
- **Accessibility First**: WCAG 2.1 AA compliance is mandatory - include ARIA labels, keyboard navigation, focus management
- **Mobile First**: Responsive design approach starting from mobile breakpoints
- **Dark Mode**: Automatic system preference detection via `prefers-color-scheme`

## Component Architecture

### Atomic Design Structure

- **atoms/**: Core primitives (Button, Input, Text, Icon)
- **molecules/**: Composed components (Card, Alert, Menu)
- **organisms/**: Complex components (DataTable, Chat, Forms)
- **layouts/**: Page-level layouts (Container, Grid, Sidebar)
- **utils/**: Utility components (Portal, FocusTrap, ScrollArea)

### Required Patterns

- Export component Props interfaces for type safety
- Use Svelte 5 runes (`$props`, `$derived`, `$state`) over legacy reactivity
- Implement snippets with `{@render children?.()}` for content projection
- Include comprehensive keyboard navigation and screen reader support

## Development Standards

### Code Quality

- **TypeScript Strict**: All components must be fully typed with Props interfaces
- **ES Modules Only**: No CommonJS support (`"type": "module"`)
- **Svelte 5 Native**: Use latest features including runes and snippets
- **Consistent Exports**: Centralize through `src/lib/index.ts` and `src/lib/ui/index.ts`

### Accessibility Requirements

- ARIA labels and roles for all interactive elements
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Focus management and visible focus indicators
- Screen reader announcements for dynamic content
- Reduced motion support via `prefers-reduced-motion`

### Visual Design

- Purple-based color palette with glassmorphic effects
- Consistent spacing using CSS custom properties
- Smooth animations with accessibility considerations
- High contrast ratios for text readability

## Component Categories

**Core Components**: Button, Input, Card, Modal, Alert, Badge, Chip
**Form Components**: Checkbox, Radio, Switch, Select, Textarea, FileUpload
**Layout Components**: Container, Grid, Flex, Stack, Navbar, Sidebar
**Data Components**: DataTable, Timeline, Carousel, TreeView, Pagination
**Advanced Components**: Chat system, Media players, Barcode/QR scanning
**Utility Components**: Portal, FocusTrap, ScrollArea, ThemeProvider, VirtualList

## Key Dependencies

- **CodeMirror 6**: For code editor components
- **ZXing/JSBarcode**: For barcode and QR code functionality
- **Marked/PrismJS**: For markdown rendering and syntax highlighting
