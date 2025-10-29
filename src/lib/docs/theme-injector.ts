/**
 * Theme CSS injection for iframe previews
 * Provides scoped theme CSS for Svelte component previews
 */

/**
 * Extract and scope theme CSS for iframe context
 */
export function getIframeThemeCSS(): string {
  return `
/* Theme CSS Variables */
:root {
  /* Purple Color Palette */
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c084fc;
  --color-primary-500: #a855f7;
  --color-primary-600: #9333ea;
  --color-primary-700: #7e22ce;
  --color-primary-800: #6b21a8;
  --color-primary-900: #581c87;

  /* Neutral Colors */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;

  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Glassmorphism */
  --glass-bg: rgba(168, 85, 247, 0.1);
  --glass-bg-hover: rgba(168, 85, 247, 0.15);
  --glass-bg-active: rgba(168, 85, 247, 0.2);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-shadow: 0 8px 32px 0 rgba(99, 33, 170, 0.25);
  --glass-shadow-lg: 0 16px 48px 0 rgba(99, 33, 170, 0.35);
  --glass-blur: 12px;
  --glass-blur-lg: 20px;

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-tooltip: 1070;

  /* Focus Ring */
  --focus-ring-color: var(--color-primary-500);
  --focus-ring-width: 3px;
  --focus-ring-offset: 2px;

  /* Light theme semantic colors */
  --bg-primary: var(--color-neutral-50);
  --bg-secondary: var(--color-neutral-100);
  --bg-tertiary: var(--color-neutral-200);
  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-600);
  --text-tertiary: var(--color-neutral-400);
  --border-color: var(--color-neutral-200);
  --border-color-hover: var(--color-neutral-300);
}

/* Dark theme variables */
[data-theme="dark"] {
  --glass-bg: rgba(168, 85, 247, 0.08);
  --glass-bg-hover: rgba(168, 85, 247, 0.12);
  --glass-bg-active: rgba(168, 85, 247, 0.18);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px 0 rgba(99, 33, 170, 0.4);
  --glass-shadow-lg: 0 16px 48px 0 rgba(99, 33, 170, 0.5);

  --bg-primary: var(--color-neutral-900);
  --bg-secondary: var(--color-neutral-800);
  --bg-tertiary: var(--color-neutral-700);
  --text-primary: var(--color-neutral-50);
  --text-secondary: var(--color-neutral-300);
  --text-tertiary: var(--color-neutral-500);
  --border-color: var(--color-neutral-700);
  --border-color-hover: var(--color-neutral-600);
}

/* Global Styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
  background: linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 1rem;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  border-radius: var(--radius-sm);
}

/* Glass utility classes */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.glass-lg {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-lg));
  -webkit-backdrop-filter: blur(var(--glass-blur-lg));
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow-lg);
}
  `.trim()
}

/**
 * Get base styles for iframe preview
 */
export function getBasePreviewCSS(): string {
  return `
body {
  padding: 1rem;
  font-family: system-ui, sans-serif;
}
  `.trim()
}
