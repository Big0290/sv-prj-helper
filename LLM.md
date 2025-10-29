<!-- LLM_DOCUMENT_START -->
<!-- DOCUMENT_TYPE: Component Library API Reference -->
<!-- FRAMEWORK: Svelte 5 -->
<!-- LANGUAGE: TypeScript -->

# SV Project Helper UI Library - LLM Documentation

> **Version:** 1.0.0  
> **Generated:** 2025-10-29T18:31:59.266Z  
> **Description:** Comprehensive API reference for the SV Project Helper UI Library

<!-- LLM_CONTEXT_START -->
**🤖 LLM Usage Instructions:**
This documentation is structured for optimal LLM consumption. Each section contains:
- Strategic markers for navigation (<!-- SECTION_TYPE:name -->)
- Component type indicators (<!-- COMPONENT_TYPE:atom/molecule/organism -->)
- Code block language hints (<!-- CODE_BLOCK:svelte/typescript -->)
- Cross-reference anchors for related content
<!-- LLM_CONTEXT_END -->

## About This Documentation

This comprehensive reference guide is optimized for Large Language Model (LLM) consumption and provides complete API documentation, usage patterns, and implementation guidance for the SV Project Helper UI Library.

## Overview <!-- OVERVIEW_SECTION -->

This is a comprehensive API reference for the SV Project Helper UI Library, a modern Svelte 5 component library with purple-themed glassmorphism design system.

### Key Features <!-- FEATURES_SECTION -->

- **Svelte 5 Native**: Built with latest Svelte 5 features including runes and snippets
- **TypeScript First**: Fully typed with strict TypeScript configuration
- **Glassmorphism Design**: Purple iOS26-inspired liquid glass effects
- **Accessibility Focused**: WCAG 2.1 AA compliant with comprehensive keyboard navigation
- **Mobile First**: Responsive design approach starting from mobile breakpoints
- **Dark Mode**: Automatic system preference detection

### Library Architecture <!-- ARCHITECTURE_SECTION -->

The component library follows atomic design principles with strict TypeScript typing:

- **atoms/**: Core primitives (Button, Input, Text, Icon)
- **molecules/**: Composed components (Card, Alert, Menu)
- **organisms/**: Complex components (DataTable, Chat, Forms)
- **layouts/**: Page-level layouts (Container, Grid, Sidebar)
- **utils/**: Utility components (Portal, FocusTrap, ScrollArea)
- **hooks/**: Svelte 5 runes-based hooks
- **theme/**: Theme provider and utilities

### Development Standards <!-- STANDARDS_SECTION -->

- **ES Modules Only**: No CommonJS support (`"type": "module"`)
- **Svelte 5 Runes**: Use `$props()`, `$derived()`, `$state()` over legacy reactivity
- **Snippets**: Use `{@render children?.()}` for content projection
- **CSS Variables**: All theming through custom properties, never hardcoded values
- **Accessibility**: ARIA labels, keyboard navigation, focus management required

## Component Reference <!-- COMPONENTS_SECTION -->

### Summary

Total components analyzed: 128

### Atoms (28 components) <!-- COMPONENT_TYPE:atoms -->

<!-- COMPONENT_START:audio -->
#### Audio <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 17KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Audio.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Audio } from 'sv-project-helper';
</script>

<Audio />
```

<!-- COMPONENT_END:audio -->

---

<!-- COMPONENT_START:avatar -->
#### Avatar <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Avatar.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Avatar } from 'sv-project-helper';
</script>

<Avatar />
```

<!-- COMPONENT_END:avatar -->

---

<!-- COMPONENT_START:badge -->
#### Badge <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Badge.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Badge } from 'sv-project-helper';
</script>

<Badge />
```

<!-- COMPONENT_END:badge -->

---

<!-- COMPONENT_START:box -->
#### Box <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Box.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Box } from 'sv-project-helper';
</script>

<Box />
```

<!-- COMPONENT_END:box -->

---

<!-- COMPONENT_START:button -->
#### Button <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Button.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Button } from 'sv-project-helper';
</script>

<Button />
```

<!-- COMPONENT_END:button -->

---

<!-- COMPONENT_START:checkbox -->
#### Checkbox <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Checkbox.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Checkbox } from 'sv-project-helper';
</script>

<Checkbox />
```

<!-- COMPONENT_END:checkbox -->

---

<!-- COMPONENT_START:chip -->
#### Chip <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Chip.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Chip } from 'sv-project-helper';
</script>

<Chip />
```

<!-- COMPONENT_END:chip -->

---

<!-- COMPONENT_START:code -->
#### Code <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Code.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Code } from 'sv-project-helper';
</script>

<Code />
```

<!-- COMPONENT_END:code -->

---

<!-- COMPONENT_START:copybutton -->
#### CopyButton <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/CopyButton.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { CopyButton } from 'sv-project-helper';
</script>

<CopyButton />
```

<!-- COMPONENT_END:copybutton -->

---

<!-- COMPONENT_START:divider -->
#### Divider <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Divider.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Divider } from 'sv-project-helper';
</script>

<Divider />
```

<!-- COMPONENT_END:divider -->

---

<!-- COMPONENT_START:flex -->
#### Flex <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Flex.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Flex } from 'sv-project-helper';
</script>

<Flex />
```

<!-- COMPONENT_END:flex -->

---

<!-- COMPONENT_START:glasscard -->
#### GlassCard <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/GlassCard.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { GlassCard } from 'sv-project-helper';
</script>

<GlassCard />
```

<!-- COMPONENT_END:glasscard -->

---

<!-- COMPONENT_START:heading -->
#### Heading <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Heading.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Heading } from 'sv-project-helper';
</script>

<Heading />
```

<!-- COMPONENT_END:heading -->

---

<!-- COMPONENT_START:icon -->
#### Icon <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Icon.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Icon } from 'sv-project-helper';
</script>

<Icon />
```

<!-- COMPONENT_END:icon -->

---

<!-- COMPONENT_START:image -->
#### Image <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Image.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Image } from 'sv-project-helper';
</script>

<Image />
```

<!-- COMPONENT_END:image -->

---

<!-- COMPONENT_START:input -->
#### Input <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Input.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Input } from 'sv-project-helper';
</script>

<Input />
```

<!-- COMPONENT_END:input -->

---

<!-- COMPONENT_START:label -->
#### Label <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Label.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Label } from 'sv-project-helper';
</script>

<Label />
```

<!-- COMPONENT_END:label -->

---

<!-- COMPONENT_START:link -->
#### Link <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Link.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Link } from 'sv-project-helper';
</script>

<Link />
```

<!-- COMPONENT_END:link -->

---

<!-- COMPONENT_START:loadingoverlay -->
#### LoadingOverlay <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/LoadingOverlay.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { LoadingOverlay } from 'sv-project-helper';
</script>

<LoadingOverlay />
```

<!-- COMPONENT_END:loadingoverlay -->

---

<!-- COMPONENT_START:progress -->
#### Progress <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Progress.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Progress } from 'sv-project-helper';
</script>

<Progress />
```

<!-- COMPONENT_END:progress -->

---

<!-- COMPONENT_START:radio -->
#### Radio <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Radio.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Radio } from 'sv-project-helper';
</script>

<Radio />
```

<!-- COMPONENT_END:radio -->

---

<!-- COMPONENT_START:slider -->
#### Slider <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Slider.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Slider } from 'sv-project-helper';
</script>

<Slider />
```

<!-- COMPONENT_END:slider -->

---

<!-- COMPONENT_START:spinner -->
#### Spinner <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Spinner.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Spinner } from 'sv-project-helper';
</script>

<Spinner />
```

<!-- COMPONENT_END:spinner -->

---

<!-- COMPONENT_START:statusdot -->
#### StatusDot <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/StatusDot.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { StatusDot } from 'sv-project-helper';
</script>

<StatusDot />
```

<!-- COMPONENT_END:statusdot -->

---

<!-- COMPONENT_START:switch -->
#### Switch <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Switch.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Switch } from 'sv-project-helper';
</script>

<Switch />
```

<!-- COMPONENT_END:switch -->

---

<!-- COMPONENT_START:text -->
#### Text <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Text.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Text } from 'sv-project-helper';
</script>

<Text />
```

<!-- COMPONENT_END:text -->

---

<!-- COMPONENT_START:textarea -->
#### Textarea <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Textarea.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Textarea } from 'sv-project-helper';
</script>

<Textarea />
```

<!-- COMPONENT_END:textarea -->

---

<!-- COMPONENT_START:video -->
#### Video <!-- COMPONENT_TYPE:atoms -->

**Category**: atoms | **Size**: 8KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/atoms/Video.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Video } from 'sv-project-helper';
</script>

<Video />
```

<!-- COMPONENT_END:video -->

---

### Molecules (19 components) <!-- COMPONENT_TYPE:molecules -->

<!-- COMPONENT_START:accordion -->
#### Accordion <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Accordion.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Accordion } from 'sv-project-helper';
</script>

<Accordion />
```

<!-- COMPONENT_END:accordion -->

---

<!-- COMPONENT_START:alert -->
#### Alert <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Alert.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Alert } from 'sv-project-helper';
</script>

<Alert />
```

<!-- COMPONENT_END:alert -->

---

<!-- COMPONENT_START:breadcrumb -->
#### Breadcrumb <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Breadcrumb.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Breadcrumb } from 'sv-project-helper';
</script>

<Breadcrumb />
```

<!-- COMPONENT_END:breadcrumb -->

---

<!-- COMPONENT_START:buttongroup -->
#### ButtonGroup <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/ButtonGroup.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ButtonGroup } from 'sv-project-helper';
</script>

<ButtonGroup />
```

<!-- COMPONENT_END:buttongroup -->

---

<!-- COMPONENT_START:card -->
#### Card <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Card.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Card } from 'sv-project-helper';
</script>

<Card />
```

<!-- COMPONENT_END:card -->

---

<!-- COMPONENT_START:colorpicker -->
#### ColorPicker <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/ColorPicker.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ColorPicker } from 'sv-project-helper';
</script>

<ColorPicker />
```

<!-- COMPONENT_END:colorpicker -->

---

<!-- COMPONENT_START:emptystate -->
#### EmptyState <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/EmptyState.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { EmptyState } from 'sv-project-helper';
</script>

<EmptyState />
```

<!-- COMPONENT_END:emptystate -->

---

<!-- COMPONENT_START:menu -->
#### Menu <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Menu.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Menu } from 'sv-project-helper';
</script>

<Menu />
```

<!-- COMPONENT_END:menu -->

---

<!-- COMPONENT_START:menuitem -->
#### MenuItem <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/MenuItem.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MenuItem } from 'sv-project-helper';
</script>

<MenuItem />
```

<!-- COMPONENT_END:menuitem -->

---

<!-- COMPONENT_START:otpinput -->
#### OTPInput <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/OTPInput.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { OTPInput } from 'sv-project-helper';
</script>

<OTPInput />
```

<!-- COMPONENT_END:otpinput -->

---

<!-- COMPONENT_START:pagination -->
#### Pagination <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Pagination.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Pagination } from 'sv-project-helper';
</script>

<Pagination />
```

<!-- COMPONENT_END:pagination -->

---

<!-- COMPONENT_START:rating -->
#### Rating <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Rating.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Rating } from 'sv-project-helper';
</script>

<Rating />
```

<!-- COMPONENT_END:rating -->

---

<!-- COMPONENT_START:skeleton -->
#### Skeleton <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Skeleton.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Skeleton } from 'sv-project-helper';
</script>

<Skeleton />
```

<!-- COMPONENT_END:skeleton -->

---

<!-- COMPONENT_START:snackbar -->
#### Snackbar <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Snackbar.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Snackbar } from 'sv-project-helper';
</script>

<Snackbar />
```

<!-- COMPONENT_END:snackbar -->

---

<!-- COMPONENT_START:staticcodeexample -->
#### StaticCodeExample <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/StaticCodeExample.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { StaticCodeExample } from 'sv-project-helper';
</script>

<StaticCodeExample />
```

<!-- COMPONENT_END:staticcodeexample -->

---

<!-- COMPONENT_START:statscard -->
#### StatsCard <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/StatsCard.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { StatsCard } from 'sv-project-helper';
</script>

<StatsCard />
```

<!-- COMPONENT_END:statscard -->

---

<!-- COMPONENT_START:taginput -->
#### TagInput <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/TagInput.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TagInput } from 'sv-project-helper';
</script>

<TagInput />
```

<!-- COMPONENT_END:taginput -->

---

<!-- COMPONENT_START:toast -->
#### Toast <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Toast.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Toast } from 'sv-project-helper';
</script>

<Toast />
```

<!-- COMPONENT_END:toast -->

---

<!-- COMPONENT_START:tooltip -->
#### Tooltip <!-- COMPONENT_TYPE:molecules -->

**Category**: molecules | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/molecules/Tooltip.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Tooltip } from 'sv-project-helper';
</script>

<Tooltip />
```

<!-- COMPONENT_END:tooltip -->

---

### Barcode (6 components) <!-- COMPONENT_TYPE:barcode -->

<!-- COMPONENT_START:barcodebutton -->
#### BarcodeButton <!-- COMPONENT_TYPE:barcode -->

**Category**: barcode | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/barcode/BarcodeButton.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { BarcodeButton } from 'sv-project-helper';
</script>

<BarcodeButton />
```

<!-- COMPONENT_END:barcodebutton -->

---

<!-- COMPONENT_START:barcodedisplay -->
#### BarcodeDisplay <!-- COMPONENT_TYPE:barcode -->

**Category**: barcode | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/barcode/BarcodeDisplay.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { BarcodeDisplay } from 'sv-project-helper';
</script>

<BarcodeDisplay />
```

<!-- COMPONENT_END:barcodedisplay -->

---

<!-- COMPONENT_START:barcodeinput -->
#### BarcodeInput <!-- COMPONENT_TYPE:barcode -->

**Category**: barcode | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/barcode/BarcodeInput.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { BarcodeInput } from 'sv-project-helper';
</script>

<BarcodeInput />
```

<!-- COMPONENT_END:barcodeinput -->

---

<!-- COMPONENT_START:barcodemodal -->
#### BarcodeModal <!-- COMPONENT_TYPE:barcode -->

**Category**: barcode | **Size**: 11KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/barcode/BarcodeModal.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { BarcodeModal } from 'sv-project-helper';
</script>

<BarcodeModal />
```

<!-- COMPONENT_END:barcodemodal -->

---

<!-- COMPONENT_START:barcodescanner -->
#### BarcodeScanner <!-- COMPONENT_TYPE:barcode -->

**Category**: barcode | **Size**: 35KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/barcode/BarcodeScanner.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { BarcodeScanner } from 'sv-project-helper';
</script>

<BarcodeScanner />
```

<!-- COMPONENT_END:barcodescanner -->

---

<!-- COMPONENT_START:quickscan -->
#### QuickScan <!-- COMPONENT_TYPE:barcode -->

**Category**: barcode | **Size**: 8KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/barcode/QuickScan.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { QuickScan } from 'sv-project-helper';
</script>

<QuickScan />
```

<!-- COMPONENT_END:quickscan -->

---

### Chat (17 components) <!-- COMPONENT_TYPE:chat -->

<!-- COMPONENT_START:chat -->
#### Chat <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/Chat.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Chat } from 'sv-project-helper';
</script>

<Chat />
```

<!-- COMPONENT_END:chat -->

---

<!-- COMPONENT_START:chatbubble -->
#### ChatBubble <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/ChatBubble.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ChatBubble } from 'sv-project-helper';
</script>

<ChatBubble />
```

<!-- COMPONENT_END:chatbubble -->

---

<!-- COMPONENT_START:chatheader -->
#### ChatHeader <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/ChatHeader.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ChatHeader } from 'sv-project-helper';
</script>

<ChatHeader />
```

<!-- COMPONENT_END:chatheader -->

---

<!-- COMPONENT_START:chatinput -->
#### ChatInput <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/ChatInput.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ChatInput } from 'sv-project-helper';
</script>

<ChatInput />
```

<!-- COMPONENT_END:chatinput -->

---

<!-- COMPONENT_START:chatroomlist -->
#### ChatRoomList <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 8KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/ChatRoomList.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ChatRoomList } from 'sv-project-helper';
</script>

<ChatRoomList />
```

<!-- COMPONENT_END:chatroomlist -->

---

<!-- COMPONENT_START:chatsearch -->
#### ChatSearch <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 9KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/ChatSearch.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ChatSearch } from 'sv-project-helper';
</script>

<ChatSearch />
```

<!-- COMPONENT_END:chatsearch -->

---

<!-- COMPONENT_START:messageattachment -->
#### MessageAttachment <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/MessageAttachment.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MessageAttachment } from 'sv-project-helper';
</script>

<MessageAttachment />
```

<!-- COMPONENT_END:messageattachment -->

---

<!-- COMPONENT_START:messagedivider -->
#### MessageDivider <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/MessageDivider.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MessageDivider } from 'sv-project-helper';
</script>

<MessageDivider />
```

<!-- COMPONENT_END:messagedivider -->

---

<!-- COMPONENT_START:messagemenu -->
#### MessageMenu <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/MessageMenu.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MessageMenu } from 'sv-project-helper';
</script>

<MessageMenu />
```

<!-- COMPONENT_END:messagemenu -->

---

<!-- COMPONENT_START:messagequote -->
#### MessageQuote <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/MessageQuote.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MessageQuote } from 'sv-project-helper';
</script>

<MessageQuote />
```

<!-- COMPONENT_END:messagequote -->

---

<!-- COMPONENT_START:messagereaction -->
#### MessageReaction <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/MessageReaction.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MessageReaction } from 'sv-project-helper';
</script>

<MessageReaction />
```

<!-- COMPONENT_END:messagereaction -->

---

<!-- COMPONENT_START:messagestatus -->
#### MessageStatus <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/MessageStatus.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MessageStatus } from 'sv-project-helper';
</script>

<MessageStatus />
```

<!-- COMPONENT_END:messagestatus -->

---

<!-- COMPONENT_START:onlineuserslist -->
#### OnlineUsersList <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/OnlineUsersList.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { OnlineUsersList } from 'sv-project-helper';
</script>

<OnlineUsersList />
```

<!-- COMPONENT_END:onlineuserslist -->

---

<!-- COMPONENT_START:pinnedmessages -->
#### PinnedMessages <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/PinnedMessages.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { PinnedMessages } from 'sv-project-helper';
</script>

<PinnedMessages />
```

<!-- COMPONENT_END:pinnedmessages -->

---

<!-- COMPONENT_START:typingindicator -->
#### TypingIndicator <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/TypingIndicator.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TypingIndicator } from 'sv-project-helper';
</script>

<TypingIndicator />
```

<!-- COMPONENT_END:typingindicator -->

---

<!-- COMPONENT_START:userprofile -->
#### UserProfile <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 8KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/UserProfile.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { UserProfile } from 'sv-project-helper';
</script>

<UserProfile />
```

<!-- COMPONENT_END:userprofile -->

---

<!-- COMPONENT_START:voicerecorder -->
#### VoiceRecorder <!-- COMPONENT_TYPE:chat -->

**Category**: chat | **Size**: 9KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/chat/VoiceRecorder.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { VoiceRecorder } from 'sv-project-helper';
</script>

<VoiceRecorder />
```

<!-- COMPONENT_END:voicerecorder -->

---

### Data (3 components) <!-- COMPONENT_TYPE:data -->

<!-- COMPONENT_START:carousel -->
#### Carousel <!-- COMPONENT_TYPE:data -->

**Category**: data | **Size**: 8KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/data/Carousel.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Carousel } from 'sv-project-helper';
</script>

<Carousel />
```

<!-- COMPONENT_END:carousel -->

---

<!-- COMPONENT_START:timeline -->
#### Timeline <!-- COMPONENT_TYPE:data -->

**Category**: data | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/data/Timeline.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Timeline } from 'sv-project-helper';
</script>

<Timeline />
```

<!-- COMPONENT_END:timeline -->

---

<!-- COMPONENT_START:treeview -->
#### TreeView <!-- COMPONENT_TYPE:data -->

**Category**: data | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/data/TreeView.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TreeView } from 'sv-project-helper';
</script>

<TreeView />
```

<!-- COMPONENT_END:treeview -->

---

### Editor (5 components) <!-- COMPONENT_TYPE:editor -->

<!-- COMPONENT_START:codeblock -->
#### CodeBlock <!-- COMPONENT_TYPE:editor -->

**Category**: editor | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/editor/CodeBlock.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { CodeBlock } from 'sv-project-helper';
</script>

<CodeBlock />
```

<!-- COMPONENT_END:codeblock -->

---

<!-- COMPONENT_START:codeeditor -->
#### CodeEditor <!-- COMPONENT_TYPE:editor -->

**Category**: editor | **Size**: 10KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/editor/CodeEditor.svelte`

**Features**: <!-- FEATURES_LIST -->
- ❌ No props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { CodeEditor } from 'sv-project-helper';
</script>

<CodeEditor />
```

<!-- COMPONENT_END:codeeditor -->

---

<!-- COMPONENT_START:livecodepreview -->
#### LiveCodePreview <!-- COMPONENT_TYPE:editor -->

**Category**: editor | **Size**: 11KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/editor/LiveCodePreview.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { LiveCodePreview } from 'sv-project-helper';
</script>

<LiveCodePreview />
```

<!-- COMPONENT_END:livecodepreview -->

---

<!-- COMPONENT_START:markdowneditor -->
#### MarkdownEditor <!-- COMPONENT_TYPE:editor -->

**Category**: editor | **Size**: 14KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/editor/MarkdownEditor.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MarkdownEditor } from 'sv-project-helper';
</script>

<MarkdownEditor />
```

<!-- COMPONENT_END:markdowneditor -->

---

<!-- COMPONENT_START:richtexteditor -->
#### RichTextEditor <!-- COMPONENT_TYPE:editor -->

**Category**: editor | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/editor/RichTextEditor.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { RichTextEditor } from 'sv-project-helper';
</script>

<RichTextEditor />
```

<!-- COMPONENT_END:richtexteditor -->

---

### Forms (6 components) <!-- COMPONENT_TYPE:forms -->

<!-- COMPONENT_START:datepicker -->
#### DatePicker <!-- COMPONENT_TYPE:forms -->

**Category**: forms | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/forms/DatePicker.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { DatePicker } from 'sv-project-helper';
</script>

<DatePicker />
```

<!-- COMPONENT_END:datepicker -->

---

<!-- COMPONENT_START:daterangepicker -->
#### DateRangePicker <!-- COMPONENT_TYPE:forms -->

**Category**: forms | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/forms/DateRangePicker.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { DateRangePicker } from 'sv-project-helper';
</script>

<DateRangePicker />
```

<!-- COMPONENT_END:daterangepicker -->

---

<!-- COMPONENT_START:fileupload -->
#### FileUpload <!-- COMPONENT_TYPE:forms -->

**Category**: forms | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/forms/FileUpload.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { FileUpload } from 'sv-project-helper';
</script>

<FileUpload />
```

<!-- COMPONENT_END:fileupload -->

---

<!-- COMPONENT_START:multiselect -->
#### MultiSelect <!-- COMPONENT_TYPE:forms -->

**Category**: forms | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/forms/MultiSelect.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MultiSelect } from 'sv-project-helper';
</script>

<MultiSelect />
```

<!-- COMPONENT_END:multiselect -->

---

<!-- COMPONENT_START:searchfield -->
#### SearchField <!-- COMPONENT_TYPE:forms -->

**Category**: forms | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/forms/SearchField.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { SearchField } from 'sv-project-helper';
</script>

<SearchField />
```

<!-- COMPONENT_END:searchfield -->

---

<!-- COMPONENT_START:select -->
#### Select <!-- COMPONENT_TYPE:forms -->

**Category**: forms | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/forms/Select.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Select } from 'sv-project-helper';
</script>

<Select />
```

<!-- COMPONENT_END:select -->

---

### Interactive (8 components) <!-- COMPONENT_TYPE:interactive -->

<!-- COMPONENT_START:commandpalette -->
#### CommandPalette <!-- COMPONENT_TYPE:interactive -->

**Category**: interactive | **Size**: 9KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/interactive/CommandPalette.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { CommandPalette } from 'sv-project-helper';
</script>

<CommandPalette />
```

<!-- COMPONENT_END:commandpalette -->

---

<!-- COMPONENT_START:confirmdialog -->
#### ConfirmDialog <!-- COMPONENT_TYPE:interactive -->

**Category**: interactive | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/interactive/ConfirmDialog.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ConfirmDialog } from 'sv-project-helper';
</script>

<ConfirmDialog />
```

<!-- COMPONENT_END:confirmdialog -->

---

<!-- COMPONENT_START:contextmenu -->
#### ContextMenu <!-- COMPONENT_TYPE:interactive -->

**Category**: interactive | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/interactive/ContextMenu.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ContextMenu } from 'sv-project-helper';
</script>

<ContextMenu />
```

<!-- COMPONENT_END:contextmenu -->

---

<!-- COMPONENT_START:drawer -->
#### Drawer <!-- COMPONENT_TYPE:interactive -->

**Category**: interactive | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/interactive/Drawer.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Drawer } from 'sv-project-helper';
</script>

<Drawer />
```

<!-- COMPONENT_END:drawer -->

---

<!-- COMPONENT_START:dropdown -->
#### Dropdown <!-- COMPONENT_TYPE:interactive -->

**Category**: interactive | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/interactive/Dropdown.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Dropdown } from 'sv-project-helper';
</script>

<Dropdown />
```

<!-- COMPONENT_END:dropdown -->

---

<!-- COMPONENT_START:fab -->
#### FAB <!-- COMPONENT_TYPE:interactive -->

**Category**: interactive | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/interactive/FAB.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { FAB } from 'sv-project-helper';
</script>

<FAB />
```

<!-- COMPONENT_END:fab -->

---

<!-- COMPONENT_START:modal -->
#### Modal <!-- COMPONENT_TYPE:interactive -->

**Category**: interactive | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/interactive/Modal.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Modal } from 'sv-project-helper';
</script>

<Modal />
```

<!-- COMPONENT_END:modal -->

---

<!-- COMPONENT_START:popover -->
#### Popover <!-- COMPONENT_TYPE:interactive -->

**Category**: interactive | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/interactive/Popover.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Popover } from 'sv-project-helper';
</script>

<Popover />
```

<!-- COMPONENT_END:popover -->

---

### Media (5 components) <!-- COMPONENT_TYPE:media -->

<!-- COMPONENT_START:audiobutton -->
#### AudioButton <!-- COMPONENT_TYPE:media -->

**Category**: media | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/media/AudioButton.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { AudioButton } from 'sv-project-helper';
</script>

<AudioButton />
```

<!-- COMPONENT_END:audiobutton -->

---

<!-- COMPONENT_START:imagecropper -->
#### ImageCropper <!-- COMPONENT_TYPE:media -->

**Category**: media | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/media/ImageCropper.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ImageCropper } from 'sv-project-helper';
</script>

<ImageCropper />
```

<!-- COMPONENT_END:imagecropper -->

---

<!-- COMPONENT_START:imagegallery -->
#### ImageGallery <!-- COMPONENT_TYPE:media -->

**Category**: media | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/media/ImageGallery.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ImageGallery } from 'sv-project-helper';
</script>

<ImageGallery />
```

<!-- COMPONENT_END:imagegallery -->

---

<!-- COMPONENT_START:mediagallery -->
#### MediaGallery <!-- COMPONENT_TYPE:media -->

**Category**: media | **Size**: 10KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/media/MediaGallery.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { MediaGallery } from 'sv-project-helper';
</script>

<MediaGallery />
```

<!-- COMPONENT_END:mediagallery -->

---

<!-- COMPONENT_START:webcam -->
#### Webcam <!-- COMPONENT_TYPE:media -->

**Category**: media | **Size**: 9KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/media/Webcam.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Webcam } from 'sv-project-helper';
</script>

<Webcam />
```

<!-- COMPONENT_END:webcam -->

---

### Navigation (6 components) <!-- COMPONENT_TYPE:navigation -->

<!-- COMPONENT_START:bottomnavigation -->
#### BottomNavigation <!-- COMPONENT_TYPE:navigation -->

**Category**: navigation | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/navigation/BottomNavigation.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { BottomNavigation } from 'sv-project-helper';
</script>

<BottomNavigation />
```

<!-- COMPONENT_END:bottomnavigation -->

---

<!-- COMPONENT_START:breadcrumbs -->
#### Breadcrumbs <!-- COMPONENT_TYPE:navigation -->

**Category**: navigation | **Size**: 0KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/navigation/Breadcrumbs.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Breadcrumbs } from 'sv-project-helper';
</script>

<Breadcrumbs />
```

<!-- COMPONENT_END:breadcrumbs -->

---

<!-- COMPONENT_START:navbar -->
#### Navbar <!-- COMPONENT_TYPE:navigation -->

**Category**: navigation | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/navigation/Navbar.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Navbar } from 'sv-project-helper';
</script>

<Navbar />
```

<!-- COMPONENT_END:navbar -->

---

<!-- COMPONENT_START:sidebar -->
#### Sidebar <!-- COMPONENT_TYPE:navigation -->

**Category**: navigation | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/navigation/Sidebar.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Sidebar } from 'sv-project-helper';
</script>

<Sidebar />
```

<!-- COMPONENT_END:sidebar -->

---

<!-- COMPONENT_START:stepper -->
#### Stepper <!-- COMPONENT_TYPE:navigation -->

**Category**: navigation | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/navigation/Stepper.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Stepper } from 'sv-project-helper';
</script>

<Stepper />
```

<!-- COMPONENT_END:stepper -->

---

<!-- COMPONENT_START:tabs -->
#### Tabs <!-- COMPONENT_TYPE:navigation -->

**Category**: navigation | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/navigation/Tabs.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Tabs } from 'sv-project-helper';
</script>

<Tabs />
```

<!-- COMPONENT_END:tabs -->

---

### Table (8 components) <!-- COMPONENT_TYPE:table -->

<!-- COMPONENT_START:datatable -->
#### DataTable <!-- COMPONENT_TYPE:table -->

**Category**: table | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/table/DataTable.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { DataTable } from 'sv-project-helper';
</script>

<DataTable />
```

<!-- COMPONENT_END:datatable -->

---

<!-- COMPONENT_START:simpletable -->
#### SimpleTable <!-- COMPONENT_TYPE:table -->

**Category**: table | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/table/SimpleTable.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { SimpleTable } from 'sv-project-helper';
</script>

<SimpleTable />
```

<!-- COMPONENT_END:simpletable -->

---

<!-- COMPONENT_START:tablebulkactions -->
#### TableBulkActions <!-- COMPONENT_TYPE:table -->

**Category**: table | **Size**: 4KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/table/TableBulkActions.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TableBulkActions } from 'sv-project-helper';
</script>

<TableBulkActions />
```

<!-- COMPONENT_END:tablebulkactions -->

---

<!-- COMPONENT_START:tablecard -->
#### TableCard <!-- COMPONENT_TYPE:table -->

**Category**: table | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/table/TableCard.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TableCard } from 'sv-project-helper';
</script>

<TableCard />
```

<!-- COMPONENT_END:tablecard -->

---

<!-- COMPONENT_START:tablepagination -->
#### TablePagination <!-- COMPONENT_TYPE:table -->

**Category**: table | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/table/TablePagination.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TablePagination } from 'sv-project-helper';
</script>

<TablePagination />
```

<!-- COMPONENT_END:tablepagination -->

---

<!-- COMPONENT_START:tablerowactions -->
#### TableRowActions <!-- COMPONENT_TYPE:table -->

**Category**: table | **Size**: 3KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/table/TableRowActions.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TableRowActions } from 'sv-project-helper';
</script>

<TableRowActions />
```

<!-- COMPONENT_END:tablerowactions -->

---

<!-- COMPONENT_START:tableskeleton -->
#### TableSkeleton <!-- COMPONENT_TYPE:table -->

**Category**: table | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/table/TableSkeleton.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TableSkeleton } from 'sv-project-helper';
</script>

<TableSkeleton />
```

<!-- COMPONENT_END:tableskeleton -->

---

<!-- COMPONENT_START:tabletoolbar -->
#### TableToolbar <!-- COMPONENT_TYPE:table -->

**Category**: table | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/table/TableToolbar.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { TableToolbar } from 'sv-project-helper';
</script>

<TableToolbar />
```

<!-- COMPONENT_END:tabletoolbar -->

---

### Video (4 components) <!-- COMPONENT_TYPE:video -->

<!-- COMPONENT_START:videobutton -->
#### VideoButton <!-- COMPONENT_TYPE:video -->

**Category**: video | **Size**: 9KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/video/VideoButton.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { VideoButton } from 'sv-project-helper';
</script>

<VideoButton />
```

<!-- COMPONENT_END:videobutton -->

---

<!-- COMPONENT_START:videocard -->
#### VideoCard <!-- COMPONENT_TYPE:video -->

**Category**: video | **Size**: 7KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/video/VideoCard.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { VideoCard } from 'sv-project-helper';
</script>

<VideoCard />
```

<!-- COMPONENT_END:videocard -->

---

<!-- COMPONENT_START:videoplaylist -->
#### VideoPlaylist <!-- COMPONENT_TYPE:video -->

**Category**: video | **Size**: 11KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/video/VideoPlaylist.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { VideoPlaylist } from 'sv-project-helper';
</script>

<VideoPlaylist />
```

<!-- COMPONENT_END:videoplaylist -->

---

<!-- COMPONENT_START:videoprogress -->
#### VideoProgress <!-- COMPONENT_TYPE:video -->

**Category**: video | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/organisms/video/VideoProgress.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { VideoProgress } from 'sv-project-helper';
</script>

<VideoProgress />
```

<!-- COMPONENT_END:videoprogress -->

---

### Layouts (5 components) <!-- COMPONENT_TYPE:layouts -->

<!-- COMPONENT_START:container -->
#### Container <!-- COMPONENT_TYPE:layouts -->

**Category**: layouts | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/layouts/Container.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Container } from 'sv-project-helper';
</script>

<Container />
```

<!-- COMPONENT_END:container -->

---

<!-- COMPONENT_START:draggablegrid -->
#### DraggableGrid <!-- COMPONENT_TYPE:layouts -->

**Category**: layouts | **Size**: 6KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/layouts/DraggableGrid.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ✅ Event handling
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { DraggableGrid } from 'sv-project-helper';
</script>

<DraggableGrid />
```

<!-- COMPONENT_END:draggablegrid -->

---

<!-- COMPONENT_START:grid -->
#### Grid <!-- COMPONENT_TYPE:layouts -->

**Category**: layouts | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/layouts/Grid.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Grid } from 'sv-project-helper';
</script>

<Grid />
```

<!-- COMPONENT_END:grid -->

---

<!-- COMPONENT_START:kanbanboard -->
#### KanbanBoard <!-- COMPONENT_TYPE:layouts -->

**Category**: layouts | **Size**: 9KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/layouts/KanbanBoard.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ✅ Event handling
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { KanbanBoard } from 'sv-project-helper';
</script>

<KanbanBoard />
```

<!-- COMPONENT_END:kanbanboard -->

---

<!-- COMPONENT_START:stack -->
#### Stack <!-- COMPONENT_TYPE:layouts -->

**Category**: layouts | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/layouts/Stack.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Stack } from 'sv-project-helper';
</script>

<Stack />
```

<!-- COMPONENT_END:stack -->

---

### Utils (7 components) <!-- COMPONENT_TYPE:utils -->

<!-- COMPONENT_START:draganddrop -->
#### DragAndDrop <!-- COMPONENT_TYPE:utils -->

**Category**: utils | **Size**: 5KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/utils/DragAndDrop.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { DragAndDrop } from 'sv-project-helper';
</script>

<DragAndDrop />
```

<!-- COMPONENT_END:draganddrop -->

---

<!-- COMPONENT_START:focustrap -->
#### FocusTrap <!-- COMPONENT_TYPE:utils -->

**Category**: utils | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/utils/FocusTrap.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { FocusTrap } from 'sv-project-helper';
</script>

<FocusTrap />
```

<!-- COMPONENT_END:focustrap -->

---

<!-- COMPONENT_START:infinitescroll -->
#### InfiniteScroll <!-- COMPONENT_TYPE:utils -->

**Category**: utils | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/utils/InfiniteScroll.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { InfiniteScroll } from 'sv-project-helper';
</script>

<InfiniteScroll />
```

<!-- COMPONENT_END:infinitescroll -->

---

<!-- COMPONENT_START:portal -->
#### Portal <!-- COMPONENT_TYPE:utils -->

**Category**: utils | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/utils/Portal.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { Portal } from 'sv-project-helper';
</script>

<Portal />
```

<!-- COMPONENT_END:portal -->

---

<!-- COMPONENT_START:scrollarea -->
#### ScrollArea <!-- COMPONENT_TYPE:utils -->

**Category**: utils | **Size**: 2KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/utils/ScrollArea.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ScrollArea } from 'sv-project-helper';
</script>

<ScrollArea />
```

<!-- COMPONENT_END:scrollarea -->

---

<!-- COMPONENT_START:virtuallist -->
#### VirtualList <!-- COMPONENT_TYPE:utils -->

**Category**: utils | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/utils/VirtualList.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { VirtualList } from 'sv-project-helper';
</script>

<VirtualList />
```

<!-- COMPONENT_END:virtuallist -->

---

<!-- COMPONENT_START:visuallyhidden -->
#### VisuallyHidden <!-- COMPONENT_TYPE:utils -->

**Category**: utils | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/utils/VisuallyHidden.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ✅ Content slots
- ✅ Component styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { VisuallyHidden } from 'sv-project-helper';
</script>

<VisuallyHidden />
```

<!-- COMPONENT_END:visuallyhidden -->

---

### Theme (1 components) <!-- COMPONENT_TYPE:theme -->

<!-- COMPONENT_START:themeprovider -->
#### ThemeProvider <!-- COMPONENT_TYPE:theme -->

**Category**: theme | **Size**: 1KB <!-- COMPONENT_STATS -->  
**File**: `./src/lib/ui/theme/ThemeProvider.svelte`

**Features**: <!-- FEATURES_LIST -->
- ✅ Props interface
- ❌ No events
- ❌ No slots
- ❌ No styles

**Basic Usage**: <!-- USAGE_EXAMPLE -->
```svelte <!-- CODE_BLOCK:svelte -->
<script>
  import { ThemeProvider } from 'sv-project-helper';
</script>

<ThemeProvider />
```

<!-- COMPONENT_END:themeprovider -->

---


## Design System

### CSS Custom Properties

The library uses CSS custom properties for theming. Key variables include:

- `--sv-color-primary`: Primary brand color (purple-based)
- `--sv-color-surface`: Surface background color
- `--sv-glass-bg`: Glassmorphism background
- `--sv-glass-border`: Glassmorphism border
- `--sv-backdrop-blur`: Backdrop filter blur amount

### Glassmorphism Effects

Components use consistent glassmorphism effects:

```css
.glass-effect {
  background: var(--sv-glass-bg);
  backdrop-filter: blur(var(--sv-backdrop-blur));
  border: 1px solid var(--sv-glass-border);
}
```

### Responsive Design

Mobile-first approach with breakpoints:

- Mobile: 0-768px
- Tablet: 768px-1024px  
- Desktop: 1024px+

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support
- Reduced motion support

## Usage Patterns

### Basic Component Usage

```svelte
<script>
  import { Button, Card, Text } from 'sv-project-helper';
</script>

<Card>
  <Text>Hello World</Text>
  <Button variant="primary">Click me</Button>
</Card>
```

### With TypeScript

```svelte
<script lang="ts">
  import { Button, type ButtonProps } from 'sv-project-helper';
  
  interface Props {
    variant?: ButtonProps['variant'];
  }
  
  let { variant = 'primary' }: Props = $props();
</script>

<Button {variant}>Typed Button</Button>
```

### Theming

```svelte
<script>
  import { ThemeProvider } from 'sv-project-helper';
</script>

<ThemeProvider theme="dark">
  <!-- Your app content -->
</ThemeProvider>
```

## Best Practices

1. **Always use TypeScript**: Define Props interfaces for type safety
2. **Leverage Svelte 5 runes**: Use `$props()`, `$derived()`, `$state()`
3. **Implement accessibility**: Include ARIA labels and keyboard navigation
4. **Use CSS custom properties**: Never hardcode colors or spacing
5. **Follow atomic design**: Compose molecules from atoms, organisms from molecules
6. **Test responsively**: Ensure components work on all screen sizes

## Troubleshooting

### Common Issues

1. **TypeScript errors**: Ensure all Props interfaces are properly defined
2. **Styling issues**: Check CSS custom property values and glassmorphism effects
3. **Accessibility warnings**: Verify ARIA labels and keyboard navigation
4. **Import errors**: Use correct import paths from 'sv-project-helper'

### Performance Tips

1. Use lazy loading for large components
2. Implement virtual scrolling for long lists
3. Optimize images and media assets
4. Use CSS containment for complex layouts

---

## Document Information <!-- DOCUMENT_META -->

<!-- LLM_OPTIMIZATION_STATS -->
- **Total Sections**: 8
- **Total Components**: 128
- **Total Words**: 6,400
- **Estimated Tokens**: 8,320
- **Generated**: 2025-10-29T18:31:59.266Z
- **Version**: 1.0.0

### LLM Usage Guidelines <!-- LLM_GUIDELINES -->

**For optimal LLM interaction with this documentation:**

1. **Navigation**: Use section markers (<!-- SECTION_TYPE:name -->) to jump to specific content
2. **Component Search**: Look for <!-- COMPONENT_TYPE:category --> markers to find components by type
3. **Code Examples**: All code blocks are marked with <!-- CODE_BLOCK:language --> for context
4. **API Reference**: Component features are marked with <!-- FEATURES_LIST --> for easy identification
5. **Cross-References**: Related components are linked with anchor tags for navigation

### Content Structure <!-- CONTENT_STRUCTURE -->

- **Header**: Library overview and architecture
- **Development Standards**: TypeScript, Svelte 5, and accessibility requirements
- **Component Reference**: Complete API reference organized by atomic design categories
- **Design System**: Theming, colors, and glassmorphism effects
- **Usage Patterns**: Common implementation patterns and best practices
- **Accessibility**: WCAG compliance guidelines and keyboard navigation
- **Troubleshooting**: Common issues and solutions

### Token Optimization <!-- TOKEN_OPTIMIZATION -->

This documentation is optimized for LLM context windows:
- Sections are structured for efficient parsing
- Strategic markers enable efficient content navigation
- Code examples are concise but functional
- Cross-references provide context without redundancy

*This documentation is optimized for Large Language Model consumption and provides comprehensive API reference for the SV Project Helper UI Library.*

<!-- LLM_DOCUMENT_END -->
