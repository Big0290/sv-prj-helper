import { readFileSync, existsSync } from 'fs';
import { Logger } from '../utils/Logger.js';

export interface CSSProperty {
  name: string;
  value: string;
  description: string;
  category: 'color' | 'spacing' | 'typography' | 'effect' | 'layout' | 'animation' | 'accessibility';
  context: 'root' | 'dark-theme' | 'media-query' | 'utility-class';
  selector?: string;
}

export interface GlassmorphismPattern {
  name: string;
  background: string;
  backdropFilter: string;
  border: string;
  boxShadow: string;
  description: string;
}

export interface ResponsiveBreakpoint {
  name: string;
  value: string;
  pixels: number;
  description: string;
}

export interface AccessibilityPattern {
  type: 'focus-ring' | 'reduced-motion' | 'screen-reader' | 'color-scheme';
  selector: string;
  properties: Record<string, string>;
  description: string;
}

export class CSSAnalyzer {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(false, false);
  }

  /**
   * Analyzes CSS styles from content and file path
   */
  async analyzeStyles(content: string, filePath: string): Promise<{
    customProperties: CSSProperty[];
    glassmorphismEffects: GlassmorphismPattern[];
  }> {
    try {
      const customProperties = this.extractCustomProperties(content);
      const glassmorphismEffects = this.extractGlassmorphismPatterns(content);
      
      return {
        customProperties,
        glassmorphismEffects
      };
    } catch (error) {
      this.logger.error(`Error analyzing styles for ${filePath}:`, error);
      return {
        customProperties: [],
        glassmorphismEffects: []
      };
    }
  }

  /**
   * Analyzes CSS files for custom properties, glassmorphism patterns, and responsive breakpoints
   */
  public analyzeCSSFile(filePath: string): {
    customProperties: CSSProperty[];
    glassmorphismPatterns: GlassmorphismPattern[];
    responsiveBreakpoints: ResponsiveBreakpoint[];
    accessibilityPatterns: AccessibilityPattern[];
  } {
    try {
      if (!existsSync(filePath)) {
        this.logger.warn(`CSS file not found: ${filePath}`);
        return {
          customProperties: [],
          glassmorphismPatterns: [],
          responsiveBreakpoints: [],
          accessibilityPatterns: []
        };
      }

      const cssContent = readFileSync(filePath, 'utf-8');
      
      return {
        customProperties: this.extractCustomProperties(cssContent),
        glassmorphismPatterns: this.extractGlassmorphismPatterns(cssContent),
        responsiveBreakpoints: this.extractResponsiveBreakpoints(cssContent),
        accessibilityPatterns: this.extractAccessibilityPatterns(cssContent)
      };
    } catch (error) {
      this.logger.error(`Error analyzing CSS file ${filePath}:`, error);
      return {
        customProperties: [],
        glassmorphismPatterns: [],
        responsiveBreakpoints: [],
        accessibilityPatterns: []
      };
    }
  }

  /**
   * Extracts CSS custom properties (CSS variables) from CSS content
   */
  private extractCustomProperties(cssContent: string): CSSProperty[] {
    const properties: CSSProperty[] = [];
    
    // Match CSS custom properties with their contexts
    const customPropertyRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
    const contextRegex = /:root\s*{([^}]+)}/gs;
    const darkThemeRegex = /\[data-theme="dark"\]\s*{([^}]+)}/gs;
    const mediaQueryRegex = /@media\s*\([^)]+\)\s*{[^{]*:root[^{]*{([^}]+)}/gs;

    // Extract properties from :root context
    let match;
    while ((match = contextRegex.exec(cssContent)) !== null) {
      const rootContent = match[1];
      let propMatch;
      while ((propMatch = customPropertyRegex.exec(rootContent)) !== null) {
        const [, name, value] = propMatch;
        properties.push({
          name: `--${name}`,
          value: value.trim(),
          description: this.generatePropertyDescription(name, value.trim()),
          category: this.categorizeProperty(name),
          context: 'root'
        });
      }
    }

    // Reset regex
    customPropertyRegex.lastIndex = 0;

    // Extract properties from dark theme context
    while ((match = darkThemeRegex.exec(cssContent)) !== null) {
      const darkContent = match[1];
      let propMatch;
      while ((propMatch = customPropertyRegex.exec(darkContent)) !== null) {
        const [, name, value] = propMatch;
        properties.push({
          name: `--${name}`,
          value: value.trim(),
          description: this.generatePropertyDescription(name, value.trim()),
          category: this.categorizeProperty(name),
          context: 'dark-theme',
          selector: '[data-theme="dark"]'
        });
      }
    }

    // Reset regex
    customPropertyRegex.lastIndex = 0;

    // Extract properties from media queries
    while ((match = mediaQueryRegex.exec(cssContent)) !== null) {
      const mediaContent = match[1];
      let propMatch;
      while ((propMatch = customPropertyRegex.exec(mediaContent)) !== null) {
        const [, name, value] = propMatch;
        properties.push({
          name: `--${name}`,
          value: value.trim(),
          description: this.generatePropertyDescription(name, value.trim()),
          category: this.categorizeProperty(name),
          context: 'media-query',
          selector: '@media (prefers-color-scheme: dark)'
        });
      }
    }

    return properties;
  }

  /**
   * Extracts glassmorphism patterns from CSS content
   */
  private extractGlassmorphismPatterns(cssContent: string): GlassmorphismPattern[] {
    const patterns: GlassmorphismPattern[] = [];

    // Extract glass utility classes
    const glassClassRegex = /\.glass(-\w+)?\s*{([^}]+)}/g;
    let match;

    while ((match = glassClassRegex.exec(cssContent)) !== null) {
      const [, variant, content] = match;
      const className = variant ? `glass${variant}` : 'glass';
      
      const background = this.extractCSSProperty(content, 'background');
      const backdropFilter = this.extractCSSProperty(content, 'backdrop-filter') || 
                           this.extractCSSProperty(content, '-webkit-backdrop-filter');
      const border = this.extractCSSProperty(content, 'border');
      const boxShadow = this.extractCSSProperty(content, 'box-shadow');

      if (background || backdropFilter) {
        patterns.push({
          name: className,
          background: background || '',
          backdropFilter: backdropFilter || '',
          border: border || '',
          boxShadow: boxShadow || '',
          description: this.generateGlassDescription(className, variant)
        });
      }
    }

    // Extract glassmorphism custom properties
    const glassVarRegex = /--glass-([a-zA-Z0-9-]+):\s*([^;]+);/g;
    while ((match = glassVarRegex.exec(cssContent)) !== null) {
      const [, property, value] = match;
      
      // Group related glass properties
      if (!patterns.find(p => p.name === 'glass-variables')) {
        patterns.push({
          name: 'glass-variables',
          background: '',
          backdropFilter: '',
          border: '',
          boxShadow: '',
          description: 'CSS custom properties for glassmorphism effects'
        });
      }
    }

    return patterns;
  }

  /**
   * Extracts responsive breakpoints from CSS content
   */
  private extractResponsiveBreakpoints(cssContent: string): ResponsiveBreakpoint[] {
    const breakpoints: ResponsiveBreakpoint[] = [];

    // Extract breakpoint custom properties
    const breakpointRegex = /--breakpoint-(\w+):\s*(\d+px);/g;
    let match;

    while ((match = breakpointRegex.exec(cssContent)) !== null) {
      const [, name, value] = match;
      const pixels = parseInt(value.replace('px', ''));
      
      breakpoints.push({
        name: name,
        value: value,
        pixels: pixels,
        description: this.generateBreakpointDescription(name, pixels)
      });
    }

    // Extract media queries
    const mediaQueryRegex = /@media\s*\(([^)]+)\)/g;
    while ((match = mediaQueryRegex.exec(cssContent)) !== null) {
      const [, condition] = match;
      
      // Parse media query conditions
      const minWidthMatch = condition.match(/min-width:\s*(\d+px)/);
      const maxWidthMatch = condition.match(/max-width:\s*(\d+px)/);
      const preferenceMatch = condition.match(/prefers-([a-z-]+):\s*(\w+)/);

      if (minWidthMatch) {
        const pixels = parseInt(minWidthMatch[1].replace('px', ''));
        const name = this.getBreakpointNameFromPixels(pixels);
        if (name && !breakpoints.find(b => b.name === name)) {
          breakpoints.push({
            name: name,
            value: minWidthMatch[1],
            pixels: pixels,
            description: `Media query breakpoint for ${name} screens and up`
          });
        }
      }
    }

    return breakpoints.sort((a, b) => a.pixels - b.pixels);
  }

  /**
   * Extracts accessibility patterns from CSS content
   */
  private extractAccessibilityPatterns(cssContent: string): AccessibilityPattern[] {
    const patterns: AccessibilityPattern[] = [];

    // Extract focus-visible styles
    const focusRegex = /\*:focus-visible\s*{([^}]+)}/g;
    let match;

    while ((match = focusRegex.exec(cssContent)) !== null) {
      const [, content] = match;
      const properties = this.parseCSSProperties(content);
      
      patterns.push({
        type: 'focus-ring',
        selector: '*:focus-visible',
        properties: properties,
        description: 'Global focus ring styles for keyboard navigation accessibility'
      });
    }

    // Extract reduced motion preferences
    const reducedMotionRegex = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{([^}]+)}/gs;
    while ((match = reducedMotionRegex.exec(cssContent)) !== null) {
      const [, content] = match;
      const properties = this.parseCSSProperties(content);
      
      patterns.push({
        type: 'reduced-motion',
        selector: '@media (prefers-reduced-motion: reduce)',
        properties: properties,
        description: 'Reduced motion styles for users who prefer minimal animations'
      });
    }

    // Extract screen reader utilities
    const srOnlyRegex = /\.sr-only\s*{([^}]+)}/g;
    while ((match = srOnlyRegex.exec(cssContent)) !== null) {
      const [, content] = match;
      const properties = this.parseCSSProperties(content);
      
      patterns.push({
        type: 'screen-reader',
        selector: '.sr-only',
        properties: properties,
        description: 'Screen reader only utility class for accessible content'
      });
    }

    // Extract color scheme preferences
    const colorSchemeRegex = /@media\s*\(prefers-color-scheme:\s*dark\)/g;
    while ((match = colorSchemeRegex.exec(cssContent)) !== null) {
      patterns.push({
        type: 'color-scheme',
        selector: '@media (prefers-color-scheme: dark)',
        properties: {},
        description: 'Automatic dark mode support based on system preferences'
      });
    }

    return patterns;
  }

  /**
   * Helper methods
   */
  private categorizeProperty(name: string): CSSProperty['category'] {
    if (name.includes('color') || name.includes('bg') || name.includes('text') || name.includes('border')) {
      return 'color';
    }
    if (name.includes('spacing') || name.includes('margin') || name.includes('padding')) {
      return 'spacing';
    }
    if (name.includes('font') || name.includes('line-height') || name.includes('text')) {
      return 'typography';
    }
    if (name.includes('glass') || name.includes('shadow') || name.includes('blur') || name.includes('radius')) {
      return 'effect';
    }
    if (name.includes('breakpoint') || name.includes('z-')) {
      return 'layout';
    }
    if (name.includes('transition') || name.includes('animation')) {
      return 'animation';
    }
    if (name.includes('focus') || name.includes('sr-')) {
      return 'accessibility';
    }
    return 'layout';
  }

  private generatePropertyDescription(name: string, value: string): string {
    const descriptions: Record<string, string> = {
      'color-primary': 'Primary brand color palette',
      'color-neutral': 'Neutral color palette for text and backgrounds',
      'glass-bg': 'Glassmorphism background with transparency',
      'glass-blur': 'Backdrop blur intensity for glass effects',
      'font-sans': 'Primary sans-serif font stack',
      'spacing': 'Consistent spacing scale',
      'radius': 'Border radius values with iOS-inspired curves',
      'breakpoint': 'Responsive design breakpoints',
      'transition': 'Animation timing and easing functions',
      'focus-ring': 'Accessibility focus indicator styles'
    };

    for (const [key, desc] of Object.entries(descriptions)) {
      if (name.includes(key)) {
        return desc;
      }
    }

    return `CSS custom property: ${name}`;
  }

  private generateGlassDescription(className: string, variant?: string): string {
    if (variant === '-lg') {
      return 'Large glassmorphism effect with increased blur and shadow';
    }
    return 'Standard glassmorphism effect with backdrop blur and transparency';
  }

  private generateBreakpointDescription(name: string, pixels: number): string {
    const descriptions: Record<string, string> = {
      'sm': 'Small screens (tablets)',
      'md': 'Medium screens (small laptops)',
      'lg': 'Large screens (desktops)',
      'xl': 'Extra large screens (large desktops)'
    };

    return descriptions[name] || `Breakpoint at ${pixels}px`;
  }

  private getBreakpointNameFromPixels(pixels: number): string | null {
    const breakpoints: Record<number, string> = {
      640: 'sm',
      768: 'md',
      1024: 'lg',
      1280: 'xl'
    };

    return breakpoints[pixels] || null;
  }

  private extractCSSProperty(content: string, property: string): string | null {
    const regex = new RegExp(`${property}:\\s*([^;]+);`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  }

  private parseCSSProperties(content: string): Record<string, string> {
    const properties: Record<string, string> = {};
    const propertyRegex = /([a-zA-Z-]+):\s*([^;]+);/g;
    let match;

    while ((match = propertyRegex.exec(content)) !== null) {
      const [, property, value] = match;
      properties[property.trim()] = value.trim();
    }

    return properties;
  }
}