# GlassCard

An enhanced glassmorphism card component with iOS26-inspired liquid glass effects, featuring customizable blur levels, opacity, and interactive states.

## Features

- **Multiple Variants**: Default, elevated, and subtle styles
- **Customizable Blur**: Small, medium, and large blur levels
- **Dynamic Opacity**: Adjustable background opacity (0-1)
- **Interactive States**: Smooth hover and focus transitions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive**: Mobile-optimized interactions and spacing
- **Dark Mode**: Automatic adaptation to system theme preferences

## Usage

```svelte
<script>
  import { GlassCard } from '$lib/components/atoms/GlassCard';
</script>

<!-- Basic glass card -->
<GlassCard>
  <h3>Basic Glass Card</h3>
  <p>Content with glassmorphism effect</p>
</GlassCard>

<!-- Elevated interactive card -->
<GlassCard 
  variant="elevated" 
  interactive 
  onclick={() => console.log('Clicked!')}
  ariaLabel="Interactive elevated card"
>
  <h3>Interactive Card</h3>
  <p>Click me!</p>
</GlassCard>

<!-- Custom opacity and blur -->
<GlassCard 
  opacity={0.15} 
  blur="lg" 
  shadow="lg"
  padding="xl"
>
  <h3>Custom Glass Effect</h3>
  <p>Enhanced glassmorphism with custom settings</p>
</GlassCard>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'subtle'` | `'default'` | Visual variant of the glass card |
| `blur` | `'sm' \| 'md' \| 'lg'` | `'md'` | Blur intensity level |
| `opacity` | `number` | `0.1` | Background opacity (0-1) |
| `border` | `boolean` | `true` | Whether to show glass border |
| `shadow` | `'sm' \| 'md' \| 'lg'` | `'md'` | Shadow intensity level |
| `interactive` | `boolean` | `false` | Whether the card is interactive |
| `padding` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Internal padding size |
| `onclick` | `(e: MouseEvent) => void` | - | Click handler for interactive cards |
| `ariaLabel` | `string` | - | Accessible label for interactive cards |
| `class` | `string` | `''` | Additional CSS classes |

## Accessibility

- Supports keyboard navigation with proper focus management
- Includes ARIA labels for interactive cards
- Respects `prefers-reduced-motion` for animations
- Maintains sufficient color contrast in all themes
- Screen reader compatible with semantic HTML structure

## Design System

The GlassCard component follows the iOS26 liquid glassmorphism design system with:

- **Purple-based color palette** with proper opacity variations
- **Smooth transitions** using cubic-bezier easing
- **Responsive behavior** with mobile-optimized interactions
- **Consistent spacing** using design system tokens
- **Accessibility-first** approach with WCAG 2.1 AA compliance