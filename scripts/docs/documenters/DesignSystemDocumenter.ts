import { CSSAnalyzer } from '../analyzers/CSSAnalyzer.js';
import type { CSSProperty, GlassmorphismPattern, ResponsiveBreakpoint } from '../analyzers/CSSAnalyzer.js';
import { Logger } from '../utils/Logger.js';

export interface ColorDefinition {
  name: string;
  value: string;
  hex: string | undefined;
  usage: string;
  category: 'primary' | 'neutral' | 'semantic';
}

export interface SpacingDefinition {
  name: string;
  value: string;
  pixels: number;
  usage: string;
}

export interface TypographyDefinition {
  name: string;
  value: string;
  category: 'font-family' | 'font-size' | 'font-weight' | 'line-height';
  usage: string;
}

export interface ThemeDocumentation {
  overview: string;
  colorSystem: ColorDefinition[];
  spacingSystem: SpacingDefinition[];
  typographySystem: TypographyDefinition[];
  customProperties: CSSProperty[];
}

export interface GlassmorphismGuide {
  overview: string;
  patterns: GlassmorphismPattern[];
  implementation: string;
  bestPractices: string[];
  examples: string[];
}

export interface ResponsiveGuide {
  overview: string;
  breakpoints: ResponsiveBreakpoint[];
  approach: string;
  patterns: string[];
  examples: string[];
}

export class DesignSystemDocumenter {
  private cssAnalyzer: CSSAnalyzer;
  private logger: Logger;

  constructor() {
    this.cssAnalyzer = new CSSAnalyzer();
    this.logger = new Logger(false, false);
  }

  /**
   * Generates comprehensive theme documentation
   */
  public generateThemeDocumentation(cssFilePath?: string): ThemeDocumentation {
    try {
      let analysis;
      if (cssFilePath) {
        analysis = this.cssAnalyzer.analyzeCSSFile(cssFilePath);
      } else {
        // Provide default analysis if no file path
        analysis = {
          customProperties: [],
          glassmorphismPatterns: [],
          responsiveBreakpoints: [],
          accessibilityPatterns: []
        };
      }
      
      return {
        overview: this.generateThemeOverview(),
        colorSystem: this.generateColorSystem(analysis.customProperties),
        spacingSystem: this.generateSpacingSystem(analysis.customProperties),
        typographySystem: this.generateTypographySystem(analysis.customProperties),
        customProperties: analysis.customProperties
      };
    } catch (error) {
      this.logger.error('Error generating theme documentation:', error);
      return this.getEmptyThemeDocumentation();
    }
  }

  /**
   * Generates glassmorphism implementation guide
   */
  public generateGlassmorphismGuide(cssFilePath?: string): GlassmorphismGuide {
    try {
      let analysis;
      if (cssFilePath) {
        analysis = this.cssAnalyzer.analyzeCSSFile(cssFilePath);
      } else {
        // Provide default analysis if no file path
        analysis = {
          customProperties: [],
          glassmorphismPatterns: [],
          responsiveBreakpoints: [],
          accessibilityPatterns: []
        };
      }
      
      return {
        overview: this.generateGlassmorphismOverview(),
        patterns: analysis.glassmorphismPatterns,
        implementation: this.generateGlassmorphismImplementation(),
        bestPractices: this.generateGlassmorphismBestPractices(),
        examples: this.generateGlassmorphismExamples()
      };
    } catch (error) {
      this.logger.error('Error generating glassmorphism guide:', error);
      return this.getEmptyGlassmorphismGuide();
    }
  }

  /**
   * Generates responsive design documentation
   */
  public generateResponsiveGuide(cssFilePath?: string): ResponsiveGuide {
    try {
      let analysis;
      if (cssFilePath) {
        analysis = this.cssAnalyzer.analyzeCSSFile(cssFilePath);
      } else {
        // Provide default analysis if no file path
        analysis = {
          customProperties: [],
          glassmorphismPatterns: [],
          responsiveBreakpoints: [],
          accessibilityPatterns: []
        };
      }
      
      return {
        overview: this.generateResponsiveOverview(),
        breakpoints: analysis.responsiveBreakpoints,
        approach: this.generateResponsiveApproach(),
        patterns: this.generateResponsivePatterns(),
        examples: this.generateResponsiveExamples()
      };
    } catch (error) {
      this.logger.error('Error generating responsive guide:', error);
      return this.getEmptyResponsiveGuide();
    }
  }

  /**
   * Private helper methods for generating documentation sections
   */
  private generateThemeOverview(): string {
    return `The SV Project Helper UI Library uses a comprehensive design system built on CSS custom properties (CSS variables). The theme system supports both light and dark modes with automatic system preference detection, and features a purple-based glassmorphism aesthetic inspired by iOS design principles.

Key Features:
- Purple-based color palette with semantic color tokens
- Glassmorphism effects with backdrop-blur and transparency
- Comprehensive spacing scale based on rem units
- Typography system with iOS-inspired font stacks
- Automatic dark mode with system preference detection
- Accessibility-first focus management and reduced motion support`;
  }

  private generateColorSystem(properties: CSSProperty[]): ColorDefinition[] {
    const colors: ColorDefinition[] = [];
    
    // Extract color properties
    const colorProperties = properties.filter(prop => 
      prop.category === 'color' && prop.name.includes('color')
    );

    // Group by color families
    const colorFamilies = this.groupColorsByFamily(colorProperties);

    for (const [family, props] of Object.entries(colorFamilies)) {
      props.forEach(prop => {
        const hex = this.extractHexFromValue(prop.value);
        colors.push({
          name: prop.name,
          value: prop.value,
          hex: hex,
          usage: this.generateColorUsage(prop.name, family),
          category: this.categorizeColor(family)
        });
      });
    }

    return colors;
  }

  private generateSpacingSystem(properties: CSSProperty[]): SpacingDefinition[] {
    const spacing: SpacingDefinition[] = [];
    
    const spacingProperties = properties.filter(prop => 
      prop.category === 'spacing' && prop.name.includes('spacing')
    );

    spacingProperties.forEach(prop => {
      const pixels = this.convertRemToPixels(prop.value);
      spacing.push({
        name: prop.name,
        value: prop.value,
        pixels: pixels,
        usage: this.generateSpacingUsage(prop.name, pixels)
      });
    });

    return spacing.sort((a, b) => a.pixels - b.pixels);
  }

  private generateTypographySystem(properties: CSSProperty[]): TypographyDefinition[] {
    const typography: TypographyDefinition[] = [];
    
    const typographyProperties = properties.filter(prop => 
      prop.category === 'typography'
    );

    typographyProperties.forEach(prop => {
      typography.push({
        name: prop.name,
        value: prop.value,
        category: this.categorizeTypography(prop.name),
        usage: this.generateTypographyUsage(prop.name)
      });
    });

    return typography;
  }

  private generateGlassmorphismOverview(): string {
    return `The glassmorphism design system creates depth and visual hierarchy through translucent surfaces with backdrop blur effects. This approach provides a modern, iOS-inspired aesthetic while maintaining excellent readability and accessibility.

The system uses CSS backdrop-filter with carefully calibrated transparency values to create the signature "frosted glass" effect. All glassmorphism components are designed to work seamlessly in both light and dark themes.`;
  }

  private generateGlassmorphismImplementation(): string {
    return `## Implementation

Glassmorphism effects are implemented using CSS custom properties and utility classes:

### CSS Custom Properties
- \`--glass-bg\`: Base background with transparency
- \`--glass-blur\`: Backdrop blur intensity (12px standard, 20px large)
- \`--glass-border\`: Subtle border with transparency
- \`--glass-shadow\`: Depth-creating shadow effects

### Utility Classes
- \`.glass\`: Standard glassmorphism effect
- \`.glass-lg\`: Enhanced effect with increased blur and shadow

### Browser Support
- Uses both \`backdrop-filter\` and \`-webkit-backdrop-filter\` for cross-browser compatibility
- Graceful degradation for browsers without backdrop-filter support`;
  }

  private generateGlassmorphismBestPractices(): string[] {
    return [
      'Use glassmorphism sparingly to maintain visual hierarchy',
      'Ensure sufficient contrast between glass elements and background',
      'Test readability in both light and dark themes',
      'Consider performance impact of backdrop-filter on mobile devices',
      'Provide fallback styles for browsers without backdrop-filter support',
      'Use semantic HTML elements with glass styling rather than purely decorative elements',
      'Maintain accessibility by ensuring focus indicators are visible on glass surfaces'
    ];
  }

  private generateGlassmorphismExamples(): string[] {
    return [
      `<!-- Standard glass card -->
<div class="glass" style="padding: var(--spacing-6); border-radius: var(--radius-lg);">
  <h3>Glass Card</h3>
  <p>Content with glassmorphism background</p>
</div>`,
      `<!-- Large glass modal -->
<div class="glass-lg" style="padding: var(--spacing-8); border-radius: var(--radius-xl);">
  <h2>Modal Title</h2>
  <p>Enhanced glass effect for prominent elements</p>
</div>`,
      `<!-- Custom glass implementation -->
<div style="
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
">
  Custom glass element
</div>`
    ];
  }

  private generateResponsiveOverview(): string {
    return `The responsive design system follows a mobile-first approach with carefully chosen breakpoints that accommodate the most common device sizes. The system uses CSS custom properties for breakpoint values, making it easy to maintain consistency across components.

The breakpoint system is designed to provide optimal user experiences across:
- Mobile devices (default, no media query needed)
- Tablets (sm: 640px and up)
- Small laptops (md: 768px and up)  
- Desktops (lg: 1024px and up)
- Large displays (xl: 1280px and up)`;
  }

  private generateResponsiveApproach(): string {
    return `## Mobile-First Approach

The design system uses a mobile-first responsive approach:

1. **Base Styles**: Designed for mobile devices (320px+)
2. **Progressive Enhancement**: Larger screens get enhanced layouts
3. **Breakpoint Strategy**: Min-width media queries for scaling up
4. **Flexible Units**: Rem-based spacing and typography for scalability
5. **Container Queries**: Future-ready with container query support where available`;
  }

  private generateResponsivePatterns(): string[] {
    return [
      'Fluid typography that scales with viewport size',
      'Flexible grid systems that adapt to screen size',
      'Touch-friendly interactive elements (44px minimum)',
      'Collapsible navigation for mobile devices',
      'Responsive spacing that increases on larger screens',
      'Adaptive component layouts (stack to row)',
      'Optimized glassmorphism effects for mobile performance'
    ];
  }

  private generateResponsiveExamples(): string[] {
    return [
      `/* Mobile-first responsive spacing */
.component {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-6);
  }
}`,
      `/* Responsive grid layout */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-6);
  }
}`,
      `/* Responsive typography */
.heading {
  font-size: var(--font-size-xl);
}

@media (min-width: 768px) {
  .heading {
    font-size: var(--font-size-2xl);
  }
}

@media (min-width: 1024px) {
  .heading {
    font-size: var(--font-size-3xl);
  }
}`
    ];
  }

  /**
   * Helper methods
   */
  private groupColorsByFamily(properties: CSSProperty[]): Record<string, CSSProperty[]> {
    const families: Record<string, CSSProperty[]> = {};
    
    properties.forEach(prop => {
      const familyMatch = prop.name.match(/--color-([a-z]+)/);
      if (familyMatch) {
        const family = familyMatch[1];
        if (!families[family]) {
          families[family] = [];
        }
        families[family].push(prop);
      }
    });

    return families;
  }

  private categorizeColor(family: string): ColorDefinition['category'] {
    if (family === 'primary') return 'primary';
    if (family === 'neutral') return 'neutral';
    return 'semantic';
  }

  private categorizeTypography(name: string): TypographyDefinition['category'] {
    if (name.includes('font-family') || name.includes('font-sans') || name.includes('font-mono')) {
      return 'font-family';
    }
    if (name.includes('font-size')) return 'font-size';
    if (name.includes('font-weight')) return 'font-weight';
    if (name.includes('line-height')) return 'line-height';
    return 'font-size';
  }

  private extractHexFromValue(value: string): string | undefined {
    const hexMatch = value.match(/#[0-9a-fA-F]{6}/);
    return hexMatch ? hexMatch[0] : undefined;
  }

  private convertRemToPixels(remValue: string): number {
    const remMatch = remValue.match(/([0-9.]+)rem/);
    if (remMatch) {
      return parseFloat(remMatch[1]) * 16; // Assuming 16px base font size
    }
    const pxMatch = remValue.match(/([0-9.]+)px/);
    if (pxMatch) {
      return parseFloat(pxMatch[1]);
    }
    return 0;
  }

  private generateColorUsage(name: string, family: string): string {
    const usageMap: Record<string, string> = {
      'primary': 'Brand colors for buttons, links, and primary actions',
      'neutral': 'Text, backgrounds, and subtle UI elements',
      'success': 'Success states, confirmations, and positive feedback',
      'warning': 'Warnings, cautions, and attention-needed states',
      'error': 'Error states, validation failures, and destructive actions',
      'info': 'Informational content and neutral notifications'
    };

    return usageMap[family] || `Color token for ${family} elements`;
  }

  private generateSpacingUsage(name: string, pixels: number): string {
    if (pixels <= 4) return 'Micro spacing for fine adjustments';
    if (pixels <= 12) return 'Small spacing for compact layouts';
    if (pixels <= 24) return 'Medium spacing for standard layouts';
    if (pixels <= 48) return 'Large spacing for generous layouts';
    return 'Extra large spacing for major sections';
  }

  private generateTypographyUsage(name: string): string {
    const usageMap: Record<string, string> = {
      'font-sans': 'Primary font family for UI text',
      'font-mono': 'Monospace font for code and technical content',
      'font-size-xs': 'Small text like captions and labels',
      'font-size-sm': 'Secondary text and metadata',
      'font-size-base': 'Body text and standard content',
      'font-size-lg': 'Emphasized text and small headings',
      'font-size-xl': 'Medium headings and important text',
      'font-size-2xl': 'Large headings and titles',
      'font-size-3xl': 'Display text and hero headings',
      'font-weight-normal': 'Regular body text',
      'font-weight-medium': 'Emphasized text and labels',
      'font-weight-semibold': 'Subheadings and important text',
      'font-weight-bold': 'Headings and strong emphasis',
      'line-height-tight': 'Compact text like headings',
      'line-height-normal': 'Standard body text',
      'line-height-relaxed': 'Comfortable reading for long content'
    };

    for (const [key, usage] of Object.entries(usageMap)) {
      if (name.includes(key)) {
        return usage;
      }
    }

    return `Typography token: ${name}`;
  }

  /**
   * Fallback methods for error cases
   */
  private getEmptyThemeDocumentation(): ThemeDocumentation {
    return {
      overview: 'Theme documentation could not be generated.',
      colorSystem: [],
      spacingSystem: [],
      typographySystem: [],
      customProperties: []
    };
  }

  private getEmptyGlassmorphismGuide(): GlassmorphismGuide {
    return {
      overview: 'Glassmorphism guide could not be generated.',
      patterns: [],
      implementation: '',
      bestPractices: [],
      examples: []
    };
  }

  private getEmptyResponsiveGuide(): ResponsiveGuide {
    return {
      overview: 'Responsive guide could not be generated.',
      breakpoints: [],
      approach: '',
      patterns: [],
      examples: []
    };
  }
}