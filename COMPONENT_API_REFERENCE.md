# Component API Reference

This document tracks the actual component APIs for creating accurate demos.

## Status
✅ **Molecules** - Fixed
✅ **Organisms** - Fixed
✅ **Forms** - Verified (onsubmit fixed, all props correct)
✅ **Navigation** - Fixed (Sidebar isOpen corrected)
⏳ **Feedback** - Pending
⏳ **Data Display** - Pending
⏳ **Media** - Pending
⏳ **Layouts** - Pending
⏳ **Utility** - Pending
⏳ **Theme** - Pending

## Molecules

### Button
- Props: `variant?: 'primary' | 'secondary' | 'ghost' | 'danger'`, `size?: 'sm' | 'md' | 'lg'`, `disabled?: boolean`, `loading?: boolean`, `type?: 'button' | 'submit' | 'reset'`
- Usage: `<Button variant="primary" size="md">Click me</Button>`

### Modal
- Props: `open?: boolean` (bindable), `title?: string`, `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'`, `onclose?: () => void`, `closeOnBackdrop?: boolean`, `closeOnEscape?: boolean`
- Usage: `<Modal bind:open={isOpen} title="My Modal" size="md">content</Modal>`

### Accordion
- Props: `title: string`, `open?: boolean` (bindable)
- Usage: `<Accordion title="Section 1" bind:open={isOpen}>content</Accordion>`

### Select
- Props: `value?: string` (bindable), `options: Array<{ value: string; label: string; disabled?: boolean }>`, `disabled?: boolean`, `placeholder?: string`, `label?: string`, `error?: string`
- Usage: `<Select bind:value={selected} options={opts} placeholder="Choose..." />`

### Tooltip
- Props: `content: string`, `placement?: 'top' | 'bottom' | 'left' | 'right'`
- Usage: `<Tooltip content="Help text" placement="top"><Button>Hover</Button></Tooltip>`

### Progress
- Props: `value: number`, `max?: number`, `variant?: 'default' | 'success' | 'warning' | 'error'`, `label?: string`
- Usage: `<Progress value={50} max={100} variant="success" />`

