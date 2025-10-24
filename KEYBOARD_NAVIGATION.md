# Keyboard Navigation Guide

This document outlines the keyboard shortcuts and navigation patterns implemented across all components in the SV Project Helper UI library.

## Universal Patterns

- **Tab**: Navigate between interactive elements
- **Shift + Tab**: Navigate backwards
- **Focus indicators**: All interactive elements have visible focus rings for accessibility

## Component-Specific Keyboard Controls

### Modal
- **Escape**: Close modal (if `closeOnEscape` is enabled)
- **Tab**: Focus trap keeps focus within modal
- **Auto-focus**: First focusable element receives focus on open
- **Return focus**: Focus returns to trigger element when closed

### Dropdown
- **Escape**: Close dropdown
- **Click outside**: Close dropdown (backdrop click)
- **Tab**: Navigate through dropdown items

### Accordion
- **Enter**: Toggle accordion open/closed
- **Space**: Toggle accordion open/closed
- **Click**: Toggle accordion open/closed

### Tooltip
- **Enter**: Toggle tooltip visibility
- **Space**: Toggle tooltip visibility
- **Escape**: Hide tooltip
- **Focus**: Show tooltip on keyboard focus
- **Blur**: Hide tooltip when focus leaves
- **Hover**: Show tooltip on mouse hover

### SearchField
- **Type**: Show suggestions
- **Arrow Down**: Navigate to next suggestion
- **Arrow Up**: Navigate to previous suggestion
- **Enter**: Select highlighted suggestion or trigger search
- **Escape**: Close suggestions list
- **Click suggestion**: Select suggestion

### DataTable
- **Click header**: Sort by column (toggle ascending/descending)
- **Space/Click checkbox**: Toggle row selection
- **Click header checkbox**: Select/deselect all rows

### Chat
- **Enter**: Send message
- **Type**: Auto-scroll to bottom on new messages

### BarcodeScanner
- **Escape**: Stop scanning (when scanner is active)
- **Tab**: Navigate to manual input field
- **Enter in input**: Submit manual barcode entry

### Tabs
- **Click tab**: Switch to tab panel
- **Role attributes**: Proper ARIA roles for screen readers

### Video Player
- **Click play/pause**: Toggle playback
- **Click progress bar**: Seek to position
- **Volume slider**: Adjust volume level

### Audio Player
- **Click play/pause**: Toggle playback
- **Click progress bar**: Seek to position
- **Volume control**: Adjust volume

### Slider
- **Arrow Left**: Decrease value
- **Arrow Right**: Increase value
- **Arrow Up**: Increase value
- **Arrow Down**: Decrease value
- **Home**: Set to minimum value
- **End**: Set to maximum value
- **Page Up**: Increase by large step
- **Page Down**: Decrease by large step

### FileUpload
- **Click**: Open file picker
- **Drag and drop**: Drop files onto component
- **Enter on file**: Remove file from list

### Forms (Input, Textarea, Select, Checkbox, Radio, Switch)
- **Tab**: Navigate between fields
- **Enter**: Submit form (in inputs)
- **Space**: Toggle checkbox/switch/radio
- **Arrow keys**: Navigate select options (when focused)

### Button
- **Enter**: Activate button
- **Space**: Activate button

## Accessibility Features

### Focus Management
- All interactive elements are keyboard accessible
- Focus indicators use high-contrast purple ring (3px solid)
- Focus is trapped in modals
- Focus returns to trigger after closing overlays

### ARIA Support
- Proper ARIA roles on all components
- `aria-expanded` on expandable components
- `aria-label` on icon-only buttons
- `aria-controls` and `aria-describedby` where appropriate
- `aria-selected` on selectable items

### Screen Reader Support
- Semantic HTML elements used throughout
- Role attributes for custom components
- Live regions for dynamic content (chat typing indicator)
- Label associations for all form controls

### Reduced Motion
- Animations respect `prefers-reduced-motion` media query
- Components remain functional without animations

### Dark Mode
- All components support dark mode
- High contrast maintained in both themes
- Focus indicators remain visible in both modes

## Best Practices

1. **Always provide keyboard alternatives** to mouse-only interactions
2. **Test with keyboard only** - navigate entire UI without mouse
3. **Ensure visible focus** - users should always know where they are
4. **Logical tab order** - follows visual layout and reading order
5. **No keyboard traps** - users can always escape with Tab or Escape
6. **Consistent patterns** - same keys do same things across components

## Testing Keyboard Navigation

To test keyboard navigation in your application:

1. **Tab through all elements** - ensure every interactive element is reachable
2. **Check focus visibility** - focus ring should be clearly visible
3. **Test escape sequences** - Escape should close overlays
4. **Test form navigation** - Enter/Space should work as expected
5. **Test with screen reader** - use VoiceOver (Mac) or NVDA (Windows)
6. **Test reduced motion** - enable in OS settings and verify animations

## Browser Support

Keyboard navigation is supported in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Resources

- [WCAG 2.1 Keyboard Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Keyboard Events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
