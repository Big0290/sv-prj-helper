import { DesignSystemDocumenter, ThemeDocumentation, GlassmorphismGuide, ResponsiveGuide } from '../documenters/DesignSystemDocumenter.js';
import { CSSAnalyzer } from '../analyzers/CSSAnalyzer.js';
import type { CSSProperty, GlassmorphismPattern, ResponsiveBreakpoint } from '../analyzers/CSSAnalyzer.js';
import { Logger } from '../utils/Logger.js';
import { ComponentInfo } from '../types/index.js';

export interface DesignSystemIntegrationDocumentation {
  themingSystem: ThemingSystemGuide;
  glassmorphismImplementation: GlassmorphismImplementationGuide;
  responsiveDesign: ResponsiveDesignGuide;
  componentIntegration: ComponentIntegrationGuide;
  customizationGuide: CustomizationGuide;
  migrationGuide: MigrationGuide;
}

export interface ThemingSystemGuide {
  overview: string;
  cssCustomProperties: CSSCustomPropertyGuide[];
  themeStructure: ThemeStructure;
  darkModeImplementation: DarkModeGuide;
  colorTokens: ColorTokenGuide;
  spacingTokens: SpacingTokenGuide;
  typographyTokens: TypographyTokenGuide;
  implementationExamples: ThemingExample[];
}

export interface CSSCustomPropertyGuide {
  property: string;
  category: 'color' | 'spacing' | 'typography' | 'effect' | 'layout';
  lightValue: string;
  darkValue?: string;
  usage: string;
  components: string[];
  examples: string[];
}

export interface ThemeStructure {
  layers: ThemeLayer[];
  inheritance: string;
  customization: string;
  validation: string;
}

export interface ThemeLayer {
  name: string;
  purpose: string;
  properties: string[];
  priority: number;
}

export interface DarkModeGuide {
  detection: string;
  implementation: string;
  colorAdjustments: ColorAdjustment[];
  testingStrategy: string;
  fallbacks: string[];
}

export interface ColorAdjustment {
  lightColor: string;
  darkColor: string;
  rationale: string;
  contrastRatio: number;
}

export interface ColorTokenGuide {
  semantic: SemanticColorToken[];
  primitive: PrimitiveColorToken[];
  usage: ColorUsagePattern[];
  accessibility: ColorAccessibilityGuide;
}

export interface SemanticColorToken {
  name: string;
  purpose: string;
  lightValue: string;
  darkValue: string;
  usage: string[];
  wcagCompliance: string;
}

export interface PrimitiveColorToken {
  name: string;
  hex: string;
  hsl: string;
  usage: string;
  variations: string[];
}

export interface ColorUsagePattern {
  pattern: string;
  description: string;
  implementation: string;
  examples: string[];
}

export interface ColorAccessibilityGuide {
  contrastRequirements: ContrastRequirement[];
  colorBlindnessConsiderations: string[];
  testingMethods: string[];
}

export interface ContrastRequirement {
  context: string;
  minimumRatio: number;
  wcagLevel: 'AA' | 'AAA';
  implementation: string;
}

export interface SpacingTokenGuide {
  scale: SpacingScale;
  usage: SpacingUsagePattern[];
  responsive: ResponsiveSpacingGuide;
  implementation: SpacingImplementation;
}

export interface SpacingScale {
  base: number;
  multiplier: number;
  tokens: SpacingToken[];
}

export interface SpacingToken {
  name: string;
  value: string;
  pixels: number;
  usage: string[];
  components: string[];
}

export interface SpacingUsagePattern {
  pattern: string;
  description: string;
  implementation: string;
  examples: string[];
}

export interface ResponsiveSpacingGuide {
  approach: string;
  breakpoints: ResponsiveSpacingBreakpoint[];
  implementation: string;
}

export interface ResponsiveSpacingBreakpoint {
  breakpoint: string;
  adjustments: SpacingAdjustment[];
}

export interface SpacingAdjustment {
  token: string;
  mobileValue: string;
  desktopValue: string;
  rationale: string;
}

export interface SpacingImplementation {
  cssProperties: string[];
  utilities: string[];
  components: string[];
}

export interface TypographyTokenGuide {
  typeScale: TypeScale;
  fontFamilies: FontFamilyGuide[];
  fontWeights: FontWeightGuide[];
  lineHeights: LineHeightGuide[];
  responsive: ResponsiveTypographyGuide;
}

export interface TypeScale {
  base: number;
  ratio: number;
  sizes: TypographySize[];
}

export interface TypographySize {
  name: string;
  value: string;
  pixels: number;
  usage: string[];
  lineHeight: string;
}

export interface FontFamilyGuide {
  name: string;
  stack: string[];
  usage: string;
  fallbacks: string[];
}

export interface FontWeightGuide {
  name: string;
  value: number;
  usage: string[];
  availability: string[];
}

export interface LineHeightGuide {
  name: string;
  value: string;
  usage: string;
  calculation: string;
}

export interface ResponsiveTypographyGuide {
  approach: string;
  fluidTypography: boolean;
  breakpointAdjustments: TypographyBreakpointAdjustment[];
}

export interface TypographyBreakpointAdjustment {
  breakpoint: string;
  adjustments: TypographyAdjustment[];
}

export interface TypographyAdjustment {
  size: string;
  mobileValue: string;
  desktopValue: string;
  rationale: string;
}

export interface ThemingExample {
  title: string;
  description: string;
  code: string;
  explanation: string;
}

export interface GlassmorphismImplementationGuide {
  overview: string;
  coreProperties: GlassmorphismProperty[];
  patterns: GlassmorphismPatternGuide[];
  performance: PerformanceGuide;
  accessibility: GlassmorphismAccessibilityGuide;
  browserSupport: BrowserSupportGuide;
  implementation: GlassmorphismImplementation;
}

export interface GlassmorphismProperty {
  property: string;
  purpose: string;
  values: string[];
  usage: string;
  performance: string;
}

export interface GlassmorphismPatternGuide {
  name: string;
  description: string;
  cssClass: string;
  properties: Record<string, string>;
  usage: string[];
  examples: string[];
}

export interface PerformanceGuide {
  considerations: string[];
  optimizations: string[];
  fallbacks: string[];
  testing: string[];
}

export interface GlassmorphismAccessibilityGuide {
  contrastConsiderations: string[];
  focusIndicators: string[];
  reducedMotion: string[];
  testing: string[];
}

export interface BrowserSupportGuide {
  supported: BrowserSupport[];
  fallbacks: FallbackStrategy[];
  detection: string;
}

export interface BrowserSupport {
  browser: string;
  version: string;
  support: 'full' | 'partial' | 'none';
  notes: string;
}

export interface FallbackStrategy {
  condition: string;
  fallback: string;
  implementation: string;
}

export interface GlassmorphismImplementation {
  utilities: UtilityClass[];
  mixins: CSSMixin[];
  components: ComponentGlassImplementation[];
}

export interface UtilityClass {
  className: string;
  properties: Record<string, string>;
  usage: string;
  variations: string[];
}

export interface CSSMixin {
  name: string;
  parameters: string[];
  implementation: string;
  usage: string;
}

export interface ComponentGlassImplementation {
  component: string;
  implementation: string;
  customization: string[];
}

export interface ResponsiveDesignGuide {
  philosophy: string;
  breakpointSystem: BreakpointSystemGuide;
  layoutPatterns: LayoutPattern[];
  componentAdaptation: ComponentAdaptationGuide;
  performance: ResponsivePerformanceGuide;
  testing: ResponsiveTestingGuide;
}

export interface BreakpointSystemGuide {
  approach: 'mobile-first' | 'desktop-first';
  breakpoints: BreakpointGuide[];
  naming: string;
  customization: string;
}

export interface BreakpointGuide {
  name: string;
  value: string;
  pixels: number;
  targetDevices: string[];
  usage: string;
}

export interface LayoutPattern {
  name: string;
  description: string;
  implementation: string;
  breakpointBehavior: BreakpointBehavior[];
  examples: string[];
}

export interface BreakpointBehavior {
  breakpoint: string;
  behavior: string;
  implementation: string;
}

export interface ComponentAdaptationGuide {
  strategies: AdaptationStrategy[];
  patterns: ComponentAdaptationPattern[];
  examples: ComponentAdaptationExample[];
}

export interface AdaptationStrategy {
  name: string;
  description: string;
  when: string;
  implementation: string;
}

export interface ComponentAdaptationPattern {
  component: string;
  adaptations: ComponentAdaptation[];
}

export interface ComponentAdaptation {
  breakpoint: string;
  changes: string[];
  rationale: string;
}

export interface ComponentAdaptationExample {
  component: string;
  code: string;
  explanation: string;
}

export interface ResponsivePerformanceGuide {
  considerations: string[];
  optimizations: string[];
  monitoring: string[];
}

export interface ResponsiveTestingGuide {
  devices: TestDevice[];
  tools: TestingTool[];
  checklist: TestingChecklistItem[];
}

export interface TestDevice {
  name: string;
  viewport: string;
  considerations: string[];
}

export interface TestingTool {
  name: string;
  purpose: string;
  usage: string;
}

export interface TestingChecklistItem {
  item: string;
  description: string;
  method: string;
}

export interface ComponentIntegrationGuide {
  overview: string;
  themeIntegration: ComponentThemeIntegration[];
  customization: ComponentCustomizationGuide[];
  composition: ComponentCompositionGuide;
  bestPractices: IntegrationBestPractice[];
}

export interface ComponentThemeIntegration {
  component: string;
  themeProperties: string[];
  customization: string[];
  examples: string[];
}

export interface ComponentCustomizationGuide {
  component: string;
  customizationPoints: CustomizationPoint[];
  examples: CustomizationExample[];
}

export interface CustomizationPoint {
  property: string;
  type: 'color' | 'spacing' | 'typography' | 'effect';
  description: string;
  values: string[];
}

export interface CustomizationExample {
  title: string;
  description: string;
  code: string;
  result: string;
}

export interface ComponentCompositionGuide {
  principles: string[];
  patterns: CompositionPattern[];
  examples: CompositionExample[];
}

export interface CompositionPattern {
  name: string;
  description: string;
  components: string[];
  implementation: string;
}

export interface CompositionExample {
  title: string;
  components: string[];
  code: string;
  explanation: string;
}

export interface IntegrationBestPractice {
  practice: string;
  description: string;
  rationale: string;
  examples: string[];
}

export interface CustomizationGuide {
  overview: string;
  approaches: CustomizationApproach[];
  examples: CustomizationScenario[];
  tooling: CustomizationTool[];
}

export interface CustomizationApproach {
  name: string;
  description: string;
  complexity: 'simple' | 'moderate' | 'advanced';
  implementation: string;
  pros: string[];
  cons: string[];
}

export interface CustomizationScenario {
  scenario: string;
  approach: string;
  implementation: string;
  considerations: string[];
}

export interface CustomizationTool {
  name: string;
  purpose: string;
  usage: string;
  examples: string[];
}

export interface MigrationGuide {
  overview: string;
  versions: VersionMigration[];
  breakingChanges: BreakingChange[];
  automatedMigration: AutomatedMigrationTool[];
}

export interface VersionMigration {
  from: string;
  to: string;
  changes: MigrationChange[];
  timeline: string;
}

export interface MigrationChange {
  type: 'property-rename' | 'value-change' | 'structure-change' | 'removal';
  description: string;
  before: string;
  after: string;
  impact: 'low' | 'medium' | 'high';
}

export interface BreakingChange {
  version: string;
  change: string;
  impact: string;
  migration: string;
  timeline: string;
}

export interface AutomatedMigrationTool {
  name: string;
  purpose: string;
  usage: string;
  limitations: string[];
}

export class DesignSystemIntegrationDocumenter {
  private designSystemDocumenter: DesignSystemDocumenter;
  private cssAnalyzer: CSSAnalyzer;
  private logger: Logger;

  constructor() {
    this.designSystemDocumenter = new DesignSystemDocumenter();
    this.cssAnalyzer = new CSSAnalyzer();
    this.logger = new Logger(false, false);
  }

  /**
   * Generates comprehensive design system integration documentation
   */
  public generateDesignSystemIntegrationDocumentation(
    cssFilePath: string,
    components: ComponentInfo[]
  ): DesignSystemIntegrationDocumentation {
    try {
      this.logger.info('Generating design system integration documentation...');

      const themeDoc = this.designSystemDocumenter.generateThemeDocumentation(cssFilePath);
      const glassDoc = this.designSystemDocumenter.generateGlassmorphismGuide(cssFilePath);
      const responsiveDoc = this.designSystemDocumenter.generateResponsiveGuide(cssFilePath);

      return {
        themingSystem: this.generateThemingSystemGuide(themeDoc, cssFilePath),
        glassmorphismImplementation: this.generateGlassmorphismImplementationGuide(glassDoc, cssFilePath),
        responsiveDesign: this.generateResponsiveDesignGuide(responsiveDoc, cssFilePath),
        componentIntegration: this.generateComponentIntegrationGuide(components, themeDoc),
        customizationGuide: this.generateCustomizationGuide(themeDoc),
        migrationGuide: this.generateMigrationGuide()
      };
    } catch (error) {
      this.logger.error('Error generating design system integration documentation:', error);
      throw error;
    }
  }

  /**
   * Generates comprehensive theming system guide
   */
  private generateThemingSystemGuide(themeDoc: ThemeDocumentation, cssFilePath: string): ThemingSystemGuide {
    const cssProperties = this.generateCSSCustomPropertyGuides(themeDoc.customProperties);
    const themeStructure = this.generateThemeStructure();
    const darkModeGuide = this.generateDarkModeGuide(cssFilePath);
    const colorTokens = this.generateColorTokenGuide(themeDoc.colorSystem);
    const spacingTokens = this.generateSpacingTokenGuide(themeDoc.spacingSystem);
    const typographyTokens = this.generateTypographyTokenGuide(themeDoc.typographySystem);
    const examples = this.generateThemingExamples();

    return {
      overview: `The SV Project Helper UI Library theming system is built on CSS custom properties (CSS variables) that provide a flexible, maintainable approach to design tokens. The system supports automatic dark mode detection, semantic color tokens, and comprehensive customization options.

Key Features:
- CSS custom properties for all design tokens
- Automatic light/dark theme switching
- Semantic color system with accessibility compliance
- Modular spacing and typography scales
- Component-level theme integration
- Performance-optimized glassmorphism effects`,
      cssCustomProperties: cssProperties,
      themeStructure,
      darkModeImplementation: darkModeGuide,
      colorTokens,
      spacingTokens,
      typographyTokens,
      implementationExamples: examples
    };
  }

  /**
   * Generates glassmorphism implementation guide
   */
  private generateGlassmorphismImplementationGuide(
    glassDoc: GlassmorphismGuide,
    cssFilePath: string
  ): GlassmorphismImplementationGuide {
    const coreProperties = this.generateGlassmorphismProperties();
    const patterns = this.generateGlassmorphismPatternGuides(glassDoc.patterns);
    const performance = this.generatePerformanceGuide();
    const accessibility = this.generateGlassmorphismAccessibilityGuide();
    const browserSupport = this.generateBrowserSupportGuide();
    const implementation = this.generateGlassmorphismImplementation();

    return {
      overview: `Glassmorphism in the SV Project Helper UI Library creates depth and visual hierarchy through translucent surfaces with backdrop blur effects. The implementation is optimized for performance, accessibility, and cross-browser compatibility while maintaining the signature iOS-inspired aesthetic.

The system uses CSS backdrop-filter with carefully calibrated transparency values and fallback strategies for browsers without support. All glassmorphism effects are designed to maintain WCAG 2.1 AA compliance and work seamlessly across light and dark themes.`,
      coreProperties,
      patterns,
      performance,
      accessibility,
      browserSupport,
      implementation
    };
  }

  /**
   * Generates responsive design guide
   */
  private generateResponsiveDesignGuide(
    responsiveDoc: ResponsiveGuide,
    cssFilePath: string
  ): ResponsiveDesignGuide {
    const breakpointSystem = this.generateBreakpointSystemGuide(responsiveDoc.breakpoints);
    const layoutPatterns = this.generateLayoutPatterns();
    const componentAdaptation = this.generateComponentAdaptationGuide();
    const performance = this.generateResponsivePerformanceGuide();
    const testing = this.generateResponsiveTestingGuide();

    return {
      philosophy: `The responsive design philosophy follows a mobile-first approach that progressively enhances the experience for larger screens. This ensures optimal performance on mobile devices while providing rich experiences on desktop.

Core Principles:
- Mobile-first design and development
- Progressive enhancement for larger screens
- Touch-friendly interaction targets (44px minimum)
- Flexible layouts that adapt to content
- Performance-conscious image and asset loading
- Accessibility across all device sizes`,
      breakpointSystem,
      layoutPatterns,
      componentAdaptation,
      performance,
      testing
    };
  }

  /**
   * Generates component integration guide
   */
  private generateComponentIntegrationGuide(
    components: ComponentInfo[],
    themeDoc: ThemeDocumentation
  ): ComponentIntegrationGuide {
    const themeIntegration = this.generateComponentThemeIntegration(components, themeDoc);
    const customization = this.generateComponentCustomizationGuides(components);
    const composition = this.generateComponentCompositionGuide(components);
    const bestPractices = this.generateIntegrationBestPractices();

    return {
      overview: `Component integration with the design system ensures consistent theming, spacing, and behavior across all UI elements. Each component is designed to work seamlessly with the theme system while providing customization options for specific use cases.

Integration Features:
- Automatic theme property inheritance
- Consistent spacing and typography
- Glassmorphism effect integration
- Responsive behavior patterns
- Accessibility compliance
- Composition-friendly architecture`,
      themeIntegration,
      customization,
      composition,
      bestPractices
    };
  }

  /**
   * Generates customization guide
   */
  private generateCustomizationGuide(themeDoc: ThemeDocumentation): CustomizationGuide {
    const approaches = this.generateCustomizationApproaches();
    const examples = this.generateCustomizationScenarios();
    const tooling = this.generateCustomizationTools();

    return {
      overview: `The design system provides multiple levels of customization, from simple CSS custom property overrides to complete theme replacements. The system is designed to be flexible while maintaining design consistency and accessibility standards.

Customization Levels:
1. Token-level customization (colors, spacing, typography)
2. Component-level styling overrides
3. Theme-level modifications
4. Complete design system replacement`,
      approaches,
      examples,
      tooling
    };
  }

  /**
   * Generates migration guide
   */
  private generateMigrationGuide(): MigrationGuide {
    const versions = this.generateVersionMigrations();
    const breakingChanges = this.generateBreakingChanges();
    const automatedTools = this.generateAutomatedMigrationTools();

    return {
      overview: `Migration guides help developers upgrade between versions of the design system while minimizing breaking changes and providing clear upgrade paths. The system follows semantic versioning with clear communication about breaking changes.`,
      versions,
      breakingChanges,
      automatedMigration: automatedTools
    };
  }

  /**
   * Helper methods for generating specific documentation sections
   */
  private generateCSSCustomPropertyGuides(properties: CSSProperty[]): CSSCustomPropertyGuide[] {
    return properties.map(prop => ({
      property: prop.name,
      category: prop.category as CSSCustomPropertyGuide['category'],
      lightValue: prop.value,
      darkValue: this.inferDarkValue(prop),
      usage: prop.description,
      components: this.findComponentsUsingProperty(prop.name),
      examples: this.generatePropertyExamples(prop)
    }));
  }

  private generateThemeStructure(): ThemeStructure {
    return {
      layers: [
        {
          name: 'Base Layer',
          purpose: 'Fundamental design tokens (colors, spacing, typography)',
          properties: ['--color-*', '--spacing-*', '--font-*'],
          priority: 1
        },
        {
          name: 'Semantic Layer',
          purpose: 'Contextual tokens (primary, success, error)',
          properties: ['--color-primary', '--color-success', '--color-error'],
          priority: 2
        },
        {
          name: 'Component Layer',
          purpose: 'Component-specific customizations',
          properties: ['--button-*', '--card-*', '--modal-*'],
          priority: 3
        }
      ],
      inheritance: 'CSS custom properties cascade naturally with CSS specificity rules',
      customization: 'Override properties at any layer for targeted customization',
      validation: 'Use CSS @supports for feature detection and fallbacks'
    };
  }

  private generateDarkModeGuide(cssFilePath: string): DarkModeGuide {
    return {
      detection: 'Automatic detection using CSS prefers-color-scheme media query',
      implementation: `
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a1a1a;
    --color-text: #ffffff;
    /* Additional dark mode overrides */
  }
}`,
      colorAdjustments: [
        {
          lightColor: '#ffffff',
          darkColor: '#1a1a1a',
          rationale: 'High contrast background for readability',
          contrastRatio: 21
        },
        {
          lightColor: '#000000',
          darkColor: '#ffffff',
          rationale: 'Primary text color with maximum contrast',
          contrastRatio: 21
        }
      ],
      testingStrategy: 'Test both themes in browser dev tools and system settings',
      fallbacks: [
        'Light theme as default for unsupported browsers',
        'Manual theme toggle for user preference override'
      ]
    };
  }

  private generateColorTokenGuide(colorSystem: any[]): ColorTokenGuide {
    const semantic: SemanticColorToken[] = [
      {
        name: '--color-primary',
        purpose: 'Primary brand color for buttons and links',
        lightValue: '#8b5cf6',
        darkValue: '#a78bfa',
        usage: ['Primary buttons', 'Active states', 'Brand elements'],
        wcagCompliance: 'AA compliant with white text'
      },
      {
        name: '--color-success',
        purpose: 'Success states and positive feedback',
        lightValue: '#10b981',
        darkValue: '#34d399',
        usage: ['Success messages', 'Confirmation states', 'Valid inputs'],
        wcagCompliance: 'AA compliant contrast ratios'
      }
    ];

    const primitive: PrimitiveColorToken[] = [
      {
        name: '--purple-500',
        hex: '#8b5cf6',
        hsl: 'hsl(262, 83%, 58%)',
        usage: 'Base purple color for primary elements',
        variations: ['--purple-400', '--purple-600', '--purple-700']
      }
    ];

    const usage: ColorUsagePattern[] = [
      {
        pattern: 'Semantic Color Usage',
        description: 'Use semantic tokens for consistent meaning across components',
        implementation: 'color: var(--color-primary);',
        examples: ['Primary buttons', 'Active navigation items', 'Focus indicators']
      }
    ];

    const accessibility: ColorAccessibilityGuide = {
      contrastRequirements: [
        {
          context: 'Normal text',
          minimumRatio: 4.5,
          wcagLevel: 'AA',
          implementation: 'Ensure text colors meet contrast requirements'
        }
      ],
      colorBlindnessConsiderations: [
        'Use patterns and icons alongside color',
        'Test with color blindness simulators',
        'Provide alternative indicators for color-coded information'
      ],
      testingMethods: [
        'Automated contrast checking tools',
        'Manual testing with color blindness simulators',
        'Screen reader testing for color-dependent information'
      ]
    };

    return {
      semantic,
      primitive,
      usage,
      accessibility
    };
  }

  private generateSpacingTokenGuide(spacingSystem: any[]): SpacingTokenGuide {
    const scale: SpacingScale = {
      base: 16,
      multiplier: 1.5,
      tokens: spacingSystem.map(spacing => ({
        name: spacing.name,
        value: spacing.value,
        pixels: spacing.pixels,
        usage: [spacing.usage],
        components: ['Button', 'Card', 'Modal'] // Simplified
      }))
    };

    const usage: SpacingUsagePattern[] = [
      {
        pattern: 'Consistent Spacing',
        description: 'Use spacing tokens for consistent visual rhythm',
        implementation: 'padding: var(--spacing-4);',
        examples: ['Component padding', 'Margin between elements', 'Grid gaps']
      }
    ];

    const responsive: ResponsiveSpacingGuide = {
      approach: 'Mobile-first with progressive enhancement',
      breakpoints: [
        {
          breakpoint: 'md',
          adjustments: [
            {
              token: '--spacing-section',
              mobileValue: '2rem',
              desktopValue: '4rem',
              rationale: 'More generous spacing on larger screens'
            }
          ]
        }
      ],
      implementation: 'CSS custom properties with media query overrides'
    };

    const implementation: SpacingImplementation = {
      cssProperties: ['--spacing-*', '--gap-*', '--inset-*'],
      utilities: ['.p-4', '.m-6', '.gap-8'],
      components: ['All components use spacing tokens for consistency']
    };

    return {
      scale,
      usage,
      responsive,
      implementation
    };
  }

  private generateTypographyTokenGuide(typographySystem: any[]): TypographyTokenGuide {
    const typeScale: TypeScale = {
      base: 16,
      ratio: 1.25,
      sizes: [
        {
          name: '--font-size-sm',
          value: '0.875rem',
          pixels: 14,
          usage: ['Captions', 'Labels', 'Metadata'],
          lineHeight: '1.25'
        },
        {
          name: '--font-size-base',
          value: '1rem',
          pixels: 16,
          usage: ['Body text', 'Paragraphs', 'Default text'],
          lineHeight: '1.5'
        }
      ]
    };

    const fontFamilies: FontFamilyGuide[] = [
      {
        name: '--font-sans',
        stack: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        usage: 'Primary font for UI and body text',
        fallbacks: ['System fonts for optimal performance and familiarity']
      }
    ];

    const fontWeights: FontWeightGuide[] = [
      {
        name: '--font-weight-normal',
        value: 400,
        usage: ['Body text', 'Regular content'],
        availability: ['All font families']
      },
      {
        name: '--font-weight-semibold',
        value: 600,
        usage: ['Headings', 'Emphasized text'],
        availability: ['System fonts', 'Web fonts']
      }
    ];

    const lineHeights: LineHeightGuide[] = [
      {
        name: '--line-height-tight',
        value: '1.25',
        usage: 'Headings and compact text',
        calculation: 'Font size × 1.25'
      },
      {
        name: '--line-height-normal',
        value: '1.5',
        usage: 'Body text and readable content',
        calculation: 'Font size × 1.5'
      }
    ];

    const responsive: ResponsiveTypographyGuide = {
      approach: 'Fluid typography with breakpoint adjustments',
      fluidTypography: true,
      breakpointAdjustments: [
        {
          breakpoint: 'md',
          adjustments: [
            {
              size: '--font-size-xl',
              mobileValue: '1.25rem',
              desktopValue: '1.5rem',
              rationale: 'Larger headings on desktop for visual hierarchy'
            }
          ]
        }
      ]
    };

    return {
      typeScale,
      fontFamilies,
      fontWeights,
      lineHeights,
      responsive
    };
  }

  private generateThemingExamples(): ThemingExample[] {
    return [
      {
        title: 'Basic Theme Customization',
        description: 'Override primary color for brand customization',
        code: `:root {
  --color-primary: #3b82f6; /* Custom blue */
  --color-primary-hover: #2563eb;
}`,
        explanation: 'This changes the primary color throughout the entire design system'
      },
      {
        title: 'Component-Specific Theming',
        description: 'Customize button appearance without affecting other components',
        code: `.custom-button {
  --button-bg: var(--color-success);
  --button-text: white;
  --button-border-radius: 0.5rem;
}`,
        explanation: 'Component-level CSS custom properties allow targeted customization'
      },
      {
        title: 'Dark Theme Override',
        description: 'Create custom dark theme colors',
        code: `@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --glass-bg: rgba(30, 41, 59, 0.8);
  }
}`,
        explanation: 'Override dark mode colors while maintaining the overall theme structure'
      }
    ];
  }

  private generateGlassmorphismProperties(): GlassmorphismProperty[] {
    return [
      {
        property: 'backdrop-filter',
        purpose: 'Creates the blur effect behind the element',
        values: ['blur(12px)', 'blur(20px)', 'blur(8px)'],
        usage: 'Apply to glass elements for frosted glass effect',
        performance: 'Can impact performance on mobile devices'
      },
      {
        property: '--glass-bg',
        purpose: 'Semi-transparent background color',
        values: ['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)'],
        usage: 'Base background for glass elements',
        performance: 'Minimal performance impact'
      },
      {
        property: '--glass-border',
        purpose: 'Subtle border to define glass edges',
        values: ['rgba(255, 255, 255, 0.2)', 'rgba(0, 0, 0, 0.1)'],
        usage: 'Enhance glass element definition',
        performance: 'No significant performance impact'
      }
    ];
  }

  private generateGlassmorphismPatternGuides(patterns: GlassmorphismPattern[]): GlassmorphismPatternGuide[] {
    return [
      {
        name: 'Standard Glass',
        description: 'Default glassmorphism effect for cards and panels',
        cssClass: '.glass',
        properties: {
          'background': 'var(--glass-bg)',
          'backdrop-filter': 'blur(var(--glass-blur))',
          'border': '1px solid var(--glass-border)',
          'box-shadow': 'var(--glass-shadow)'
        },
        usage: ['Cards', 'Panels', 'Overlays'],
        examples: [
          '<div class="glass">Standard glass card</div>',
          '<section class="glass">Glass panel content</section>'
        ]
      },
      {
        name: 'Enhanced Glass',
        description: 'Stronger glassmorphism effect for prominent elements',
        cssClass: '.glass-lg',
        properties: {
          'background': 'var(--glass-bg-strong)',
          'backdrop-filter': 'blur(var(--glass-blur-lg))',
          'border': '1px solid var(--glass-border-strong)',
          'box-shadow': 'var(--glass-shadow-lg)'
        },
        usage: ['Modals', 'Hero sections', 'Feature cards'],
        examples: [
          '<div class="glass-lg">Enhanced glass modal</div>',
          '<header class="glass-lg">Hero section with strong glass effect</header>'
        ]
      }
    ];
  }

  private generatePerformanceGuide(): PerformanceGuide {
    return {
      considerations: [
        'backdrop-filter can be expensive on mobile devices',
        'Use transform3d to enable hardware acceleration',
        'Limit the number of glass elements on a single page',
        'Consider reduced motion preferences'
      ],
      optimizations: [
        'Use will-change: backdrop-filter for animated glass elements',
        'Implement intersection observer for off-screen glass elements',
        'Provide fallback styles for browsers without backdrop-filter support',
        'Use CSS containment for better rendering performance'
      ],
      fallbacks: [
        'Solid background colors for unsupported browsers',
        'Border and shadow effects to maintain visual hierarchy',
        'Progressive enhancement approach'
      ],
      testing: [
        'Test on various mobile devices',
        'Monitor frame rates during animations',
        'Use browser performance tools',
        'Test with reduced motion preferences enabled'
      ]
    };
  }

  private generateGlassmorphismAccessibilityGuide(): GlassmorphismAccessibilityGuide {
    return {
      contrastConsiderations: [
        'Ensure sufficient contrast between text and glass backgrounds',
        'Test readability in both light and dark themes',
        'Provide high contrast alternatives when needed',
        'Consider users with visual impairments'
      ],
      focusIndicators: [
        'Ensure focus rings are visible on glass surfaces',
        'Use high contrast colors for focus indicators',
        'Test focus visibility in various lighting conditions',
        'Provide alternative focus styles if needed'
      ],
      reducedMotion: [
        'Respect prefers-reduced-motion settings',
        'Provide static alternatives to animated glass effects',
        'Reduce or eliminate blur effects for motion-sensitive users',
        'Maintain visual hierarchy without relying on motion'
      ],
      testing: [
        'Test with screen readers',
        'Verify keyboard navigation visibility',
        'Check contrast ratios with automated tools',
        'Manual testing with various accessibility tools'
      ]
    };
  }

  private generateBrowserSupportGuide(): BrowserSupportGuide {
    return {
      supported: [
        {
          browser: 'Chrome',
          version: '76+',
          support: 'full',
          notes: 'Full backdrop-filter support'
        },
        {
          browser: 'Safari',
          version: '14+',
          support: 'full',
          notes: 'Requires -webkit-backdrop-filter prefix'
        },
        {
          browser: 'Firefox',
          version: '103+',
          support: 'full',
          notes: 'Recent support addition'
        },
        {
          browser: 'Edge',
          version: '79+',
          support: 'full',
          notes: 'Chromium-based Edge'
        }
      ],
      fallbacks: [
        {
          condition: 'No backdrop-filter support',
          fallback: 'Solid background with opacity',
          implementation: '@supports not (backdrop-filter: blur(1px)) { /* fallback styles */ }'
        }
      ],
      detection: 'Use CSS @supports for feature detection and progressive enhancement'
    };
  }

  private generateGlassmorphismImplementation(): GlassmorphismImplementation {
    return {
      utilities: [
        {
          className: '.glass',
          properties: {
            'background': 'var(--glass-bg)',
            'backdrop-filter': 'blur(var(--glass-blur))',
            '-webkit-backdrop-filter': 'blur(var(--glass-blur))'
          },
          usage: 'Apply standard glassmorphism effect',
          variations: ['.glass-sm', '.glass-lg', '.glass-xl']
        }
      ],
      mixins: [
        {
          name: 'glass-effect',
          parameters: ['$blur: 12px', '$opacity: 0.1'],
          implementation: `@mixin glass-effect($blur: 12px, $opacity: 0.1) {
  background: rgba(255, 255, 255, $opacity);
  backdrop-filter: blur($blur);
  -webkit-backdrop-filter: blur($blur);
}`,
          usage: 'Sass mixin for customizable glass effects'
        }
      ],
      components: [
        {
          component: 'Card',
          implementation: 'Built-in glass variant with .glass modifier class',
          customization: ['Background opacity', 'Blur intensity', 'Border styling']
        }
      ]
    };
  }

  private generateBreakpointSystemGuide(breakpoints: ResponsiveBreakpoint[]): BreakpointSystemGuide {
    return {
      approach: 'mobile-first',
      breakpoints: breakpoints.map(bp => ({
        name: bp.name,
        value: bp.value,
        pixels: parseInt(bp.value),
        targetDevices: this.getTargetDevices(bp.name),
        usage: `Styles for ${bp.name} screens and up`
      })),
      naming: 'Semantic names (sm, md, lg, xl) for clarity and consistency',
      customization: 'Override CSS custom properties to adjust breakpoint values'
    };
  }

  private generateLayoutPatterns(): LayoutPattern[] {
    return [
      {
        name: 'Responsive Grid',
        description: 'CSS Grid that adapts from single column to multi-column',
        implementation: `
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);
}

@media (min-width: 640px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-6);
  }
}`,
        breakpointBehavior: [
          {
            breakpoint: 'mobile',
            behavior: 'Single column layout',
            implementation: 'grid-template-columns: 1fr'
          },
          {
            breakpoint: 'tablet',
            behavior: 'Two column layout',
            implementation: 'grid-template-columns: repeat(2, 1fr)'
          }
        ],
        examples: ['Product grids', 'Card layouts', 'Feature sections']
      }
    ];
  }

  private generateComponentAdaptationGuide(): ComponentAdaptationGuide {
    return {
      strategies: [
        {
          name: 'Layout Transformation',
          description: 'Change component layout based on screen size',
          when: 'Component becomes too cramped on small screens',
          implementation: 'CSS Grid or Flexbox with responsive properties'
        },
        {
          name: 'Content Prioritization',
          description: 'Show/hide content based on available space',
          when: 'Too much content for small screens',
          implementation: 'CSS display properties with media queries'
        }
      ],
      patterns: [
        {
          component: 'Navigation',
          adaptations: [
            {
              breakpoint: 'mobile',
              changes: ['Hamburger menu', 'Vertical layout', 'Collapsible sections'],
              rationale: 'Limited horizontal space requires vertical navigation'
            },
            {
              breakpoint: 'desktop',
              changes: ['Horizontal menu bar', 'Always visible', 'Dropdown menus'],
              rationale: 'Ample space allows for persistent navigation'
            }
          ]
        }
      ],
      examples: [
        {
          component: 'Card',
          code: `
.card {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .card {
    padding: var(--spacing-6);
    display: flex;
    align-items: center;
  }
}`,
          explanation: 'Card adapts from vertical stack to horizontal layout on larger screens'
        }
      ]
    };
  }

  private generateResponsivePerformanceGuide(): ResponsivePerformanceGuide {
    return {
      considerations: [
        'Mobile devices have limited processing power',
        'Network conditions vary significantly on mobile',
        'Touch interactions require different optimization',
        'Battery life is a concern for mobile users'
      ],
      optimizations: [
        'Use CSS containment for better rendering performance',
        'Implement lazy loading for off-screen content',
        'Optimize images with responsive image techniques',
        'Minimize layout shifts during responsive changes'
      ],
      monitoring: [
        'Core Web Vitals tracking',
        'Real User Monitoring (RUM)',
        'Lighthouse performance audits',
        'Device-specific performance testing'
      ]
    };
  }

  private generateResponsiveTestingGuide(): ResponsiveTestingGuide {
    return {
      devices: [
        {
          name: 'iPhone SE',
          viewport: '375x667',
          considerations: ['Small screen', 'Touch interactions', 'Portrait orientation']
        },
        {
          name: 'iPad',
          viewport: '768x1024',
          considerations: ['Medium screen', 'Both orientations', 'Touch and keyboard']
        },
        {
          name: 'Desktop',
          viewport: '1920x1080',
          considerations: ['Large screen', 'Mouse interactions', 'Keyboard navigation']
        }
      ],
      tools: [
        {
          name: 'Browser DevTools',
          purpose: 'Device simulation and responsive testing',
          usage: 'Built-in responsive design mode'
        },
        {
          name: 'BrowserStack',
          purpose: 'Real device testing',
          usage: 'Cross-browser and cross-device testing'
        }
      ],
      checklist: [
        {
          item: 'Touch targets are at least 44px',
          description: 'Ensure interactive elements are large enough for touch',
          method: 'Visual inspection and measurement'
        },
        {
          item: 'Content is readable without zooming',
          description: 'Text should be legible at default zoom level',
          method: 'Manual testing on actual devices'
        }
      ]
    };
  }

  private generateComponentThemeIntegration(
    components: ComponentInfo[],
    themeDoc: ThemeDocumentation
  ): ComponentThemeIntegration[] {
    return components.slice(0, 5).map(component => ({
      component: component.name,
      themeProperties: this.extractThemeProperties(component),
      customization: this.getCustomizationOptions(component),
      examples: this.generateComponentThemeExamples(component)
    }));
  }

  private generateComponentCustomizationGuides(components: ComponentInfo[]): ComponentCustomizationGuide[] {
    return components.slice(0, 3).map(component => ({
      component: component.name,
      customizationPoints: [
        {
          property: '--button-bg',
          type: 'color',
          description: 'Background color of the button',
          values: ['Any valid CSS color', 'CSS custom property reference']
        }
      ],
      examples: [
        {
          title: `Custom ${component.name} Styling`,
          description: `Customize the appearance of ${component.name}`,
          code: `.custom-${component.name.toLowerCase()} {
  --primary-color: #3b82f6;
  --border-radius: 0.5rem;
}`,
          result: `${component.name} with custom blue color and rounded corners`
        }
      ]
    }));
  }

  private generateComponentCompositionGuide(components: ComponentInfo[]): ComponentCompositionGuide {
    return {
      principles: [
        'Components should be composable and reusable',
        'Use consistent spacing and theming across compositions',
        'Maintain accessibility when combining components',
        'Follow semantic HTML structure in compositions'
      ],
      patterns: [
        {
          name: 'Card with Actions',
          description: 'Combine Card, Button, and Text components',
          components: ['Card', 'Button', 'Text'],
          implementation: 'Nest components within Card container with proper spacing'
        }
      ],
      examples: [
        {
          title: 'Modal with Form',
          components: ['Modal', 'Form', 'Input', 'Button'],
          code: `<Modal>
  <Form>
    <Input label="Email" />
    <Button type="submit">Submit</Button>
  </Form>
</Modal>`,
          explanation: 'Compose modal dialog with form elements for user input'
        }
      ]
    };
  }

  private generateIntegrationBestPractices(): IntegrationBestPractice[] {
    return [
      {
        practice: 'Use CSS Custom Properties',
        description: 'Leverage CSS custom properties for consistent theming',
        rationale: 'Enables runtime theme switching and easy customization',
        examples: ['color: var(--color-primary)', 'padding: var(--spacing-4)']
      },
      {
        practice: 'Follow Semantic HTML',
        description: 'Use appropriate HTML elements for accessibility',
        rationale: 'Ensures screen reader compatibility and keyboard navigation',
        examples: ['<button> for actions', '<nav> for navigation', '<main> for content']
      }
    ];
  }

  private generateCustomizationApproaches(): CustomizationApproach[] {
    return [
      {
        name: 'CSS Custom Property Override',
        description: 'Override design tokens using CSS custom properties',
        complexity: 'simple',
        implementation: ':root { --color-primary: #3b82f6; }',
        pros: ['Easy to implement', 'Runtime theme switching', 'No build process needed'],
        cons: ['Limited to predefined tokens', 'CSS-only customization']
      },
      {
        name: 'Component Class Override',
        description: 'Create custom CSS classes for component variants',
        complexity: 'moderate',
        implementation: '.custom-button { /* custom styles */ }',
        pros: ['Full styling control', 'Component-specific customization'],
        cons: ['Requires CSS knowledge', 'Potential specificity issues']
      }
    ];
  }

  private generateCustomizationScenarios(): CustomizationScenario[] {
    return [
      {
        scenario: 'Brand Color Customization',
        approach: 'CSS Custom Property Override',
        implementation: ':root { --color-primary: #your-brand-color; }',
        considerations: ['Ensure sufficient contrast', 'Test in both light and dark themes']
      },
      {
        scenario: 'Component Size Variants',
        approach: 'Component Class Override',
        implementation: '.button-large { padding: var(--spacing-6); font-size: var(--font-size-lg); }',
        considerations: ['Maintain touch target sizes', 'Keep consistent with design system']
      }
    ];
  }

  private generateCustomizationTools(): CustomizationTool[] {
    return [
      {
        name: 'CSS Custom Properties',
        purpose: 'Runtime theme customization',
        usage: 'Override design tokens in CSS',
        examples: [':root { --color-primary: #blue; }']
      },
      {
        name: 'CSS Classes',
        purpose: 'Component-specific styling',
        usage: 'Create custom component variants',
        examples: ['.custom-button { /* styles */ }']
      }
    ];
  }

  private generateVersionMigrations(): VersionMigration[] {
    return [
      {
        from: '1.0.0',
        to: '2.0.0',
        changes: [
          {
            type: 'property-rename',
            description: 'Primary color token renamed',
            before: '--primary-color',
            after: '--color-primary',
            impact: 'medium'
          }
        ],
        timeline: '6 months deprecation period'
      }
    ];
  }

  private generateBreakingChanges(): BreakingChange[] {
    return [
      {
        version: '2.0.0',
        change: 'CSS custom property naming convention updated',
        impact: 'All custom property overrides need updating',
        migration: 'Use find-and-replace to update property names',
        timeline: 'Deprecated in 1.5.0, removed in 2.0.0'
      }
    ];
  }

  private generateAutomatedMigrationTools(): AutomatedMigrationTool[] {
    return [
      {
        name: 'CSS Property Migrator',
        purpose: 'Automatically update CSS custom property names',
        usage: 'Run script to find and replace deprecated properties',
        limitations: ['Cannot handle dynamic property usage', 'Requires manual review']
      }
    ];
  }

  /**
   * Helper methods
   */
  private inferDarkValue(prop: CSSProperty): string | undefined {
    // Simplified dark value inference
    if (prop.name.includes('background') && prop.value.includes('#fff')) {
      return '#1a1a1a';
    }
    if (prop.name.includes('text') && prop.value.includes('#000')) {
      return '#ffffff';
    }
    return undefined;
  }

  private findComponentsUsingProperty(propertyName: string): string[] {
    // Simplified - in practice, you'd scan component files
    return ['Button', 'Card', 'Modal'];
  }

  private generatePropertyExamples(prop: CSSProperty): string[] {
    return [
      `color: var(${prop.name});`,
      `.custom-element { ${prop.name}: custom-value; }`
    ];
  }

  private getTargetDevices(breakpointName: string): string[] {
    const deviceMap: Record<string, string[]> = {
      'sm': ['Large phones', 'Small tablets'],
      'md': ['Tablets', 'Small laptops'],
      'lg': ['Laptops', 'Desktops'],
      'xl': ['Large desktops', 'Wide monitors']
    };
    return deviceMap[breakpointName] || ['Unknown devices'];
  }

  private extractThemeProperties(component: ComponentInfo): string[] {
    // Simplified extraction - in practice, analyze component source
    return ['--color-primary', '--spacing-4', '--border-radius'];
  }

  private getCustomizationOptions(component: ComponentInfo): string[] {
    return ['Color variants', 'Size variants', 'Border radius', 'Spacing adjustments'];
  }

  private generateComponentThemeExamples(component: ComponentInfo): string[] {
    return [
      `<${component.name} class="custom-theme" />`,
      `.custom-theme { --primary-color: #custom; }`
    ];
  }
}