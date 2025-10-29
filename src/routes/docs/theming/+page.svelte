<script lang="ts">
  import { Container, Heading, Text, Card, Stack, Code, Alert, Button, Badge, Grid, StaticCodeExample } from '$lib/ui'
</script>

<svelte:head>
  <title>Theming - SV Project Helper</title>
  <meta name="description" content="Learn how to customize the theme and styling of SV Project Helper components." />
</svelte:head>

<Container maxWidth="4xl">
  <Stack gap="8">
    <!-- Header -->
    <div class="page-header">
      <Badge variant="info">🎨 Theming</Badge>
      <Heading as="h1" size="1">Customize Your Design</Heading>
      <Text size="xl" color="var(--text-secondary)">
        Make SV Project Helper match your brand with powerful theming options
      </Text>
    </div>

    <!-- CSS Custom Properties -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">CSS Custom Properties</Heading>
        <Text>
          SV Project Helper uses CSS custom properties (CSS variables) for theming. This allows you to customize colors,
          spacing, typography, and more without modifying component code.
        </Text>

        <div>
          <Heading as="h3" size="4">Color System</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
            Override these variables to customize the color palette:
          </Text>
          <StaticCodeExample
            title="Color System Variables"
            description="Primary, secondary, status, and neutral colors"
            code={`:root {
  /* Primary Colors */
  --color-primary: #8b5cf6;
  --color-primary-50: #f3f4f6;
  --color-primary-100: #e5e7eb;
  --color-primary-200: #d1d5db;
  --color-primary-300: #9ca3af;
  --color-primary-400: #6b7280;
  --color-primary-500: #8b5cf6;
  --color-primary-600: #7c3aed;
  --color-primary-700: #6d28d9;
  --color-primary-800: #5b21b6;
  --color-primary-900: #4c1d95;
  
  /* Secondary Colors */
  --color-secondary: #06b6d4;
  --color-secondary-light: #67e8f9;
  --color-secondary-dark: #0891b2;
  
  /* Status Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Neutral Colors */
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
}`}
            language="css"
            showCopyButton={true}
          />
        </div>

        <div>
          <Heading as="h3" size="4">Background & Text</Heading>
          <StaticCodeExample
            title="Background and Text Variables"
            description="Background colors, text colors, and border colors"
            code={`:root {
  /* Backgrounds */
  --bg-primary: var(--color-neutral-50);
  --bg-secondary: var(--color-neutral-100);
  --bg-tertiary: var(--color-neutral-200);
  
  /* Text Colors */
  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-600);
  --text-tertiary: var(--color-neutral-400);
  
  /* Border Colors */
  --border-color: var(--color-neutral-200);
  --border-color-hover: var(--color-neutral-300);
}`}
            language="css"
            showCopyButton={true}
          />
        </div>
      </Stack>
    </Card>

    <!-- Glassmorphism Theme -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Glassmorphism Effects</Heading>
        <Text>The signature glassmorphism design uses backdrop blur and transparency effects:</Text>

        <StaticCodeExample
          title="Glassmorphism Variables"
          description="Glassmorphism effects and backdrop filters"
          code={`:root {
  /* Glass Effects */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-bg-hover: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-blur: 20px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  --glass-shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  /* Backdrop Filter Support */
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}`}
          language="css"
          showCopyButton={true}
        />

        <Alert variant="info">
          <Text>
            <strong>Browser Support:</strong> Glassmorphism effects require modern browsers that support
            <Code inline>backdrop-filter</Code>. The components gracefully degrade in older browsers.
          </Text>
        </Alert>
      </Stack>
    </Card>

    <!-- Typography -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Typography System</Heading>
        <Text>Customize fonts, sizes, and spacing for consistent typography:</Text>

        <StaticCodeExample
          title="Typography Variables"
          description="Font families, sizes, weights, and line heights"
          code={`:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}`}
          language="css"
          showCopyButton={true}
        />
      </Stack>
    </Card>

    <!-- Spacing & Layout -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Spacing & Layout</Heading>
        <Text>Consistent spacing system based on a 4px grid:</Text>

        <StaticCodeExample
          title="Spacing and Layout Variables"
          description="Spacing scale, border radius, and shadows"
          code={`:root {
  /* Spacing Scale */
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
  --spacing-20: 5rem;    /* 80px */
  
  /* Border Radius */
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.375rem; /* 6px */
  --radius-lg: 0.5rem;   /* 8px */
  --radius-xl: 0.75rem;  /* 12px */
  --radius-2xl: 1rem;    /* 16px */
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
}`}
          language="css"
          showCopyButton={true}
        />
      </Stack>
    </Card>

    <!-- Dark Mode -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Dark Mode Support</Heading>
        <Text>SV Project Helper includes automatic dark mode support using CSS media queries:</Text>

        <StaticCodeExample
          title="Dark Mode CSS"
          description="Automatic and manual dark mode theming"
          code={`/* Light mode (default) */
:root {
  --bg-primary: var(--color-neutral-50);
  --text-primary: var(--color-neutral-900);
  --glass-bg: rgba(255, 255, 255, 0.1);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--color-neutral-900);
    --text-primary: var(--color-neutral-50);
    --glass-bg: rgba(0, 0, 0, 0.2);
    --glass-border: rgba(255, 255, 255, 0.1);
  }
}

/* Manual dark mode class */
[data-theme="dark"] {
  --bg-primary: var(--color-neutral-900);
  --text-primary: var(--color-neutral-50);
  --glass-bg: rgba(0, 0, 0, 0.2);
}`}
          language="css"
          showCopyButton={true}
        />

        <div>
          <Heading as="h3" size="4">Using the Theme Hook</Heading>
          <Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
            Control theme programmatically with the useTheme hook:
          </Text>
          <StaticCodeExample
            title="Theme Hook Example"
            description="Programmatic theme control with useTheme"
            code={`<script lang="ts">
  import { useTheme } from '@big0290/sv-prj-helper-ui';
  
  const { theme, setTheme, toggleTheme } = useTheme();
</script>

<button onclick={toggleTheme}>
  Current theme: {theme}
</button>

<button onclick={() => setTheme('dark')}>
  Force Dark Mode
</button>

<button onclick={() => setTheme('light')}>
  Force Light Mode
</button>

<button onclick={() => setTheme('system')}>
  Use System Preference
</button>`}
            language="svelte"
            showCopyButton={true}
          />
        </div>
      </Stack>
    </Card>

    <!-- Custom Theme Example -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Creating a Custom Theme</Heading>
        <Text>Here's an example of creating a custom brand theme:</Text>

        <StaticCodeExample
          title="Custom Theme CSS"
          description="Example custom theme with brand colors and typography"
          code={`/* custom-theme.css */
:root {
  /* Brand Colors */
  --color-primary: #ff6b6b;
  --color-primary-light: #ff8e8e;
  --color-primary-dark: #ff4757;
  
  --color-secondary: #4ecdc4;
  --color-secondary-light: #7ed6cc;
  --color-secondary-dark: #26d0ce;
  
  /* Custom Glassmorphism */
  --glass-bg: rgba(255, 107, 107, 0.1);
  --glass-border: rgba(255, 107, 107, 0.2);
  --glass-shadow: 0 8px 32px rgba(255, 107, 107, 0.15);
  
  /* Custom Typography */
  --font-sans: 'Poppins', sans-serif;
  --font-weight-semibold: 600;
  
  /* Custom Spacing */
  --radius-md: 1rem; /* More rounded corners */
}`}
          language="css"
          showCopyButton={true}
        />

        <div>
          <Heading as="h3" size="4">Applying Your Custom Theme</Heading>
          <StaticCodeExample
            title="Import Theme in Layout"
            description="How to apply custom theme in your app"
            code={`<!-- src/routes/+layout.svelte -->
<script>
  import '@big0290/sv-prj-helper-ui/styles';
  import './custom-theme.css'; // Your custom overrides
</script>`}
            language="svelte"
            showCopyButton={true}
          />
        </div>
      </Stack>
    </Card>

    <!-- Theme Examples -->
    <Card>
      <Stack gap="6">
        <Heading as="h2" size="3">Pre-built Theme Examples</Heading>
        <Text>Try these ready-made theme configurations:</Text>

        <Grid cols="2" gap="4">
          <div class="theme-example">
            <Heading as="h4" size="5">Ocean Theme</Heading>
            <Code
              language="css"
              code={`:root {
  --color-primary: #0ea5e9;
  --color-secondary: #06b6d4;
  --glass-bg: rgba(14, 165, 233, 0.1);
}`}
            />
          </div>

          <div class="theme-example">
            <Heading as="h4" size="5">Forest Theme</Heading>
            <Code
              language="css"
              code={`:root {
  --color-primary: #059669;
  --color-secondary: #10b981;
  --glass-bg: rgba(5, 150, 105, 0.1);
}`}
            />
          </div>

          <div class="theme-example">
            <Heading as="h4" size="5">Sunset Theme</Heading>
            <Code
              language="css"
              code={`:root {
  --color-primary: #f59e0b;
  --color-secondary: #f97316;
  --glass-bg: rgba(245, 158, 11, 0.1);
}`}
            />
          </div>

          <div class="theme-example">
            <Heading as="h4" size="5">Midnight Theme</Heading>
            <Code
              language="css"
              code={`:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
}`}
            />
          </div>
        </Grid>
      </Stack>
    </Card>

    <!-- Best Practices -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Theming Best Practices</Heading>

        <Alert variant="success">
          <Stack gap="3">
            <Text weight="medium">Tips for Effective Theming</Text>
            <ul class="best-practices">
              <li>
                <strong>Start small:</strong> Override a few key colors first, then expand
              </li>
              <li>
                <strong>Test accessibility:</strong> Ensure sufficient color contrast ratios
              </li>
              <li>
                <strong>Use semantic naming:</strong> Stick to the existing variable naming convention
              </li>
              <li>
                <strong>Test dark mode:</strong> Verify your theme works in both light and dark modes
              </li>
              <li>
                <strong>Document changes:</strong> Keep track of your customizations
              </li>
              <li>
                <strong>Progressive enhancement:</strong> Ensure fallbacks for unsupported features
              </li>
            </ul>
          </Stack>
        </Alert>
      </Stack>
    </Card>

    <!-- Tools & Resources -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Tools & Resources</Heading>
        <Text>Helpful tools for creating and testing your custom themes:</Text>

        <div class="resources-grid">
          <div class="resource-item">
            <Heading as="h4" size="6">Color Tools</Heading>
            <ul>
              <li>
                <a href="https://coolors.co" target="_blank" rel="noopener">Coolors.co</a> - Color palette generator
              </li>
              <li>
                <a href="https://contrast-ratio.com" target="_blank" rel="noopener">Contrast Ratio</a> - Accessibility checker
              </li>
            </ul>
          </div>

          <div class="resource-item">
            <Heading as="h4" size="6">Typography</Heading>
            <ul>
              <li>
                <a href="https://fonts.google.com" target="_blank" rel="noopener">Google Fonts</a> - Web font library
              </li>
              <li>
                <a href="https://type-scale.com" target="_blank" rel="noopener">Type Scale</a> - Typography calculator
              </li>
            </ul>
          </div>
        </div>
      </Stack>
    </Card>

    <!-- Next Steps -->
    <Card>
      <Stack gap="4">
        <Heading as="h2" size="3">Next Steps</Heading>
        <Text>Ready to customize your theme? Here's what to do next:</Text>

        <div class="next-steps">
          <Button variant="primary" href="/demos">Test Your Theme</Button>
          <Button variant="secondary" href="/docs/accessibility">Accessibility Guide</Button>
          <Button variant="ghost" href="/examples">View Examples</Button>
        </div>
      </Stack>
    </Card>
  </Stack>
</Container>

<style>
  .page-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .theme-example {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    background: var(--bg-secondary);
  }

  .best-practices {
    margin: 0;
    padding-left: 1.5rem;
  }

  .best-practices li {
    margin: 0.5rem 0;
    color: var(--text-secondary);
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
  }

  .resource-item ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  .resource-item li {
    margin: 0.25rem 0;
  }

  .resource-item a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .resource-item a:hover {
    text-decoration: underline;
  }

  .next-steps {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .next-steps {
      flex-direction: column;
    }
  }
</style>
