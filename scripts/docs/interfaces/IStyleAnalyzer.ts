/**
 * Interface for CSS and style analysis functionality
 */

import type {
  CSSProperty,
  GlassEffect,
  Breakpoint,
  ThemeDocumentation,
  GlassmorphismEffect
} from '../types/index.ts';

export interface IStyleAnalyzer {
  /**
   * Extracts CSS custom properties from stylesheets
   */
  extractCSSCustomProperties(filePath: string): Promise<CSSProperty[]>;

  /**
   * Analyzes glassmorphism patterns in CSS
   */
  analyzeGlassmorphismPatterns(cssContent: string): Promise<GlassEffect[]>;

  /**
   * Extracts responsive breakpoints from CSS
   */
  extractResponsiveBreakpoints(cssContent: string): Promise<Breakpoint[]>;

  /**
   * Analyzes component-specific styling
   */
  analyzeComponentStyles(componentPath: string): Promise<{
    cssProperties: CSSProperty[];
    glassmorphism?: GlassmorphismEffect;
    variants: string[];
  }>;

  /**
   * Generates comprehensive theme documentation
   */
  generateThemeDocumentation(themePath: string): Promise<ThemeDocumentation>;

  /**
   * Extracts dark mode and color scheme patterns
   */
  analyzeDarkModePatterns(cssContent: string): Promise<{
    darkModeSupport: boolean;
    colorSchemeVariables: CSSProperty[];
    mediaQueries: string[];
  }>;
}