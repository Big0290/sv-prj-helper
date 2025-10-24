# Svelte 5 Warnings Tracker

**Total Warnings**: ~45 unique warnings across 20+ components

## Summary by Type

| Type | Count | Priority |
|------|-------|----------|
| Non-reactive updates (`$state`) | 15 | 🔴 High |
| Missing ARIA roles | 8 | 🟡 Medium |
| Missing keyboard handlers | 6 | 🟡 Medium |
| Missing form labels | 6 | 🟡 Medium |
| Accessibility issues | 10 | 🟠 Medium-High |

---

## 🔴 High Priority: Non-reactive Updates

These prevent proper reactivity and should be fixed first:

### ✅ Fixed (15/15 - All Complete!)
- [x] `Webcam.svelte:24` - videoEl, canvasEl
- [x] `BarcodeScanner.svelte:46-47` - qrCanvas, barcodeCanvas
- [x] `BarcodeDisplay.svelte:28` - canvas
- [x] `TagInput.svelte:23` - inputElement
- [x] `VideoButton.svelte:24` - previewVideoElement
- [x] `VideoCard.svelte:28` - videoElement
- [x] `VoiceRecorder.svelte:24` - audioElement
- [x] `CommandPalette.svelte:30` - inputEl
- [x] `ContextMenu.svelte:25` - menuEl
- [x] `Popover.svelte:31` - popoverEl, triggerEl
- [x] `InfiniteScroll.svelte:16` - sentinel

### 🔧 To Fix (0 remaining!)

1. **BarcodeScanner.svelte** (lines 46-47)
   ```typescript
   // Current
   let qrCanvas: HTMLCanvasElement;
   let barcodeCanvas: HTMLCanvasElement;
   
   // Fix
   let qrCanvas = $state<HTMLCanvasElement>();
   let barcodeCanvas = $state<HTMLCanvasElement>();
   ```

2. **BarcodeDisplay.svelte** (line 28)
   ```typescript
   let canvas = $state<HTMLCanvasElement>();
   ```

3. **TagInput.svelte** (line 23)
   ```typescript
   let inputElement = $state<HTMLInputElement>();
   ```

4. **VideoButton.svelte** (line 24)
   ```typescript
   let previewVideoElement = $state<HTMLVideoElement>();
   ```

5. **VideoCard.svelte** (line 28)
   ```typescript
   let videoElement = $state<HTMLVideoElement>();
   ```

6. **VoiceRecorder.svelte** (line 24)
   ```typescript
   let audioElement = $state<HTMLAudioElement>();
   ```

7. **CommandPalette.svelte** (line 30)
   ```typescript
   let inputEl = $state<HTMLInputElement>();
   ```

8. **ContextMenu.svelte** (line 25)
   ```typescript
   let menuEl = $state<HTMLDivElement>();
   ```

9. **Popover.svelte** (line 31)
   ```typescript
   let popoverEl = $state<HTMLDivElement>();
   ```

10. **InfiniteScroll.svelte** (line 16)
    ```typescript
    let sentinel = $state<HTMLDivElement>();
    ```

---

## 🟡 Medium Priority: Accessibility Issues

### ARIA Roles Missing

1. **+page.svelte:1628** - `<div>` with contextmenu handler
   ```svelte
   <div role="menu" oncontextmenu={handler}>
   ```

2. **Sidebar.svelte:22** - `<div>` with click handler
   ```svelte
   <div role="button" tabindex="0" onclick={handler} onkeydown={handleKey}>
   ```

3. **MultiSelect.svelte:66** - `<div>` with click handler
   ```svelte
   <div role="button" tabindex="0" onclick={handler} onkeydown={handleKey}>
   ```

4. **ContextMenu.svelte:80** - `<div>` with contextmenu handler
   ```svelte
   <div role="menu" oncontextmenu={handler}>
   ```

### Missing Keyboard Handlers

Add keyboard event handlers for click events:

```typescript
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // trigger click action
  }
}
```

1. **Sidebar.svelte:22** - Add onkeydown
2. **Popover.svelte:137** - Add onkeydown  
3. **MultiSelect.svelte:66** - Add onkeydown
4. **DragAndDrop.svelte:108** - Add onkeydown
5. **ConfirmDialog.svelte:48** - Add onkeydown + tabindex
6. **CommandPalette.svelte:106** - Add onkeydown + tabindex

### Form Labels Need Association

Add `id` to inputs and `for` to labels:

```svelte
<label for="input-id">Label</label>
<input id="input-id" />
```

1. **BarcodeScanner.svelte:457, 553**
2. **DatePicker.svelte:56**
3. **MultiSelect.svelte:64**
4. **DateRangePicker.svelte:29**
5. **ColorPicker.svelte:33**

### Other Accessibility Issues

1. **ConfirmDialog.svelte:48** - Add tabindex to dialog role
   ```svelte
   <div role="dialog" tabindex="-1">
   ```

2. **CommandPalette.svelte:106** - Add tabindex to dialog role
   ```svelte
   <div role="dialog" tabindex="-1">
   ```

3. **TableCard.svelte:28** - Remove tabindex from non-interactive
   ```svelte
   <!-- Remove tabindex="0" from non-interactive div -->
   ```

4. **VideoButton.svelte:149** - Use button instead of div
   ```svelte
   <button type="button" onclick={handler}>
   ```

5. **VideoCard.svelte:86** - Add keyboard handler to article
   ```svelte
   <article onclick={handler} onkeydown={handleKey}>
   ```

6. **ColorPicker.svelte:41** - Add aria-label to button
   ```svelte
   <button aria-label="Pick color">
   ```

7. **BottomNavigation.svelte:29** - Remove redundant role
   ```svelte
   <!-- nav already has navigation role, remove role="navigation" -->
   <nav>
   ```

8. **TreeView.svelte:38** - Replace svelte:self
   ```svelte
   <script>
   import TreeView from './TreeView.svelte';
   </script>
   <!-- Use TreeView instead of svelte:self -->
   ```

---

## Quick Fix Script

Run this to fix all `$state` issues at once:

```bash
# Find all files with non-reactive element bindings
grep -r "let.*Element:" src/lib/components/ | grep -v "$state"

# Example fix command for a single file:
sed -i '' 's/let \(.*Element\): HTML/let \1 = $state<HTML/g' src/lib/components/Component.svelte
```

---

## Automated Fix Order

1. **Phase 1**: Fix all `$state` declarations (15 files)
2. **Phase 2**: Add ARIA roles to interactive elements (8 files)
3. **Phase 3**: Add keyboard handlers (6 files)
4. **Phase 4**: Fix form label associations (6 files)
5. **Phase 5**: Fix remaining accessibility issues (10 files)

---

## Verification

After fixes, run:
```bash
npm run dev
```

Check console - should see fewer warnings!

---

## Notes

- These are **warnings**, not errors - code still works
- Fixing improves:
  - ✅ Reactivity (Svelte 5 runes)
  - ✅ Accessibility (WCAG compliance)
  - ✅ Keyboard navigation
  - ✅ Screen reader support

Would you like me to create an automated fix script or fix them one by one?
