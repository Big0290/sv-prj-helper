import { readFileSync, existsSync } from 'fs';
import { Logger } from '../utils/Logger.js';

export interface ARIAAttribute {
  name: string;
  value: string | boolean;
  purpose: string;
  wcagCriteria: string[];
}

export interface KeyboardPattern {
  keys: string[];
  action: string;
  context: string;
  implementation: string;
}

export interface FocusPattern {
  type: 'focus-ring' | 'focus-trap' | 'focus-restoration' | 'focus-management';
  implementation: string;
  description: string;
  wcagCriteria: string[];
}

export interface ScreenReaderFeature {
  type: 'live-region' | 'label' | 'description' | 'role' | 'state';
  implementation: string;
  purpose: string;
  wcagCriteria: string[];
}

export interface AccessibilityFeatures {
  ariaAttributes: ARIAAttribute[];
  keyboardPatterns: KeyboardPattern[];
  focusPatterns: FocusPattern[];
  screenReaderFeatures: ScreenReaderFeature[];
  wcagCompliance: string[];
}

export class AccessibilityAnalyzer {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(false, false);
  }

  /**
   * Analyzes a Svelte component for accessibility features
   */
  public analyzeComponent(filePath: string): AccessibilityFeatures {
    try {
      if (!existsSync(filePath)) {
        this.logger.warn(`Component file not found: ${filePath}`);
        return this.getEmptyAccessibilityFeatures();
      }

      const content = readFileSync(filePath, 'utf-8');
      
      return {
        ariaAttributes: this.extractARIAAttributes(content),
        keyboardPatterns: this.extractKeyboardPatterns(content),
        focusPatterns: this.extractFocusPatterns(content),
        screenReaderFeatures: this.extractScreenReaderFeatures(content),
        wcagCompliance: this.assessWCAGCompliance(content)
      };
    } catch (error) {
      this.logger.error(`Error analyzing accessibility features in ${filePath}:`, error);
      return this.getEmptyAccessibilityFeatures();
    }
  }

  /**
   * Analyzes CSS for accessibility patterns
   */
  public analyzeCSSAccessibility(cssContent: string): {
    focusPatterns: FocusPattern[];
    reducedMotionSupport: boolean;
    colorContrastFeatures: string[];
    ariaAttributes: ARIAAttribute[];
    keyboardNavigation: KeyboardPattern[];
  } {
    return {
      focusPatterns: this.extractCSSFocusPatterns(cssContent),
      reducedMotionSupport: this.hasReducedMotionSupport(cssContent),
      colorContrastFeatures: this.extractColorContrastFeatures(cssContent),
      ariaAttributes: [], // CSS doesn't contain ARIA attributes
      keyboardNavigation: [] // CSS doesn't contain keyboard navigation patterns
    };
  }

  /**
   * Extracts ARIA attributes from component content
   */
  private extractARIAAttributes(content: string): ARIAAttribute[] {
    const attributes: ARIAAttribute[] = [];
    
    // Match ARIA attributes in HTML/Svelte templates
    const ariaRegex = /aria-([a-z-]+)=["'{]([^"'}]+)["'}]/g;
    let match;

    while ((match = ariaRegex.exec(content)) !== null) {
      const [, attribute, value] = match;
      const ariaName = `aria-${attribute}`;
      
      attributes.push({
        name: ariaName,
        value: this.parseAriaValue(value),
        purpose: this.getAriaPurpose(ariaName),
        wcagCriteria: this.getAriaWCAGCriteria(ariaName)
      });
    }

    // Match role attributes
    const roleRegex = /role=["']([^"']+)["']/g;
    while ((match = roleRegex.exec(content)) !== null) {
      const [, role] = match;
      
      attributes.push({
        name: 'role',
        value: role,
        purpose: this.getRolePurpose(role),
        wcagCriteria: this.getRoleWCAGCriteria(role)
      });
    }

    return attributes;
  }

  /**
   * Extracts keyboard interaction patterns
   */
  private extractKeyboardPatterns(content: string): KeyboardPattern[] {
    const patterns: KeyboardPattern[] = [];

    // Look for keyboard event handlers
    const keyboardEvents = [
      { event: 'onkeydown', pattern: /onkeydown[=:]([^,}]+)/g },
      { event: 'onkeyup', pattern: /onkeyup[=:]([^,}]+)/g },
      { event: 'onkeypress', pattern: /onkeypress[=:]([^,}]+)/g }
    ];

    keyboardEvents.forEach(({ pattern }) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const handler = match[1];
        const keyPatterns = this.extractKeyPatternsFromHandler(handler, content);
        patterns.push(...keyPatterns);
      }
    });

    // Look for specific key handling patterns
    const commonPatterns = [
      {
        keys: ['Enter', 'Space'],
        action: 'Activate button/link',
        context: 'Interactive elements',
        pattern: /event\.key\s*===?\s*['"](?:Enter|Space)['"]/g
      },
      {
        keys: ['Escape'],
        action: 'Close modal/menu',
        context: 'Overlay components',
        pattern: /event\.key\s*===?\s*['"]Escape['"]/g
      },
      {
        keys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
        action: 'Navigate options',
        context: 'Menu/list navigation',
        pattern: /event\.key\s*===?\s*['"]Arrow(?:Up|Down|Left|Right)['"]/g
      },
      {
        keys: ['Tab'],
        action: 'Focus management',
        context: 'Focus trapping',
        pattern: /event\.key\s*===?\s*['"]Tab['"]/g
      }
    ];

    commonPatterns.forEach(({ keys, action, context, pattern }) => {
      if (pattern.test(content)) {
        patterns.push({
          keys,
          action,
          context,
          implementation: this.extractImplementationDetails(content, pattern)
        });
      }
    });

    return patterns;
  }

  /**
   * Extracts focus management patterns
   */
  private extractFocusPatterns(content: string): FocusPattern[] {
    const patterns: FocusPattern[] = [];

    // Focus ring patterns
    if (content.includes(':focus-visible') || content.includes('focus-ring')) {
      patterns.push({
        type: 'focus-ring',
        implementation: 'CSS :focus-visible with custom focus ring styles',
        description: 'Visible focus indicators for keyboard navigation',
        wcagCriteria: ['2.4.7 Focus Visible']
      });
    }

    // Focus trap patterns
    if (content.includes('focus()') || content.includes('focusTrap')) {
      patterns.push({
        type: 'focus-trap',
        implementation: 'JavaScript focus management with focus() calls',
        description: 'Traps focus within modal or dialog components',
        wcagCriteria: ['2.1.2 No Keyboard Trap', '2.4.3 Focus Order']
      });
    }

    // Focus restoration
    if (content.includes('previousFocus') || content.includes('restoreFocus')) {
      patterns.push({
        type: 'focus-restoration',
        implementation: 'Stores and restores focus position',
        description: 'Returns focus to triggering element after modal closes',
        wcagCriteria: ['2.4.3 Focus Order']
      });
    }

    // Programmatic focus management
    const focusCallRegex = /\.focus\(\)/g;
    if (focusCallRegex.test(content)) {
      patterns.push({
        type: 'focus-management',
        implementation: 'Programmatic focus control with .focus() method',
        description: 'Manages focus for dynamic content and interactions',
        wcagCriteria: ['2.4.3 Focus Order', '3.2.1 On Focus']
      });
    }

    return patterns;
  }

  /**
   * Extracts screen reader features
   */
  private extractScreenReaderFeatures(content: string): ScreenReaderFeature[] {
    const features: ScreenReaderFeature[] = [];

    // Live regions
    const liveRegionPatterns = [
      { pattern: /aria-live=["']([^"']+)["']/g, type: 'live-region' as const },
      { pattern: /role=["'](?:alert|status|log)["']/g, type: 'live-region' as const }
    ];

    liveRegionPatterns.forEach(({ pattern, type }) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        features.push({
          type,
          implementation: match[0],
          purpose: 'Announces dynamic content changes to screen readers',
          wcagCriteria: ['4.1.3 Status Messages']
        });
      }
    });

    // Labels and descriptions
    const labelPatterns = [
      { pattern: /aria-label=["']([^"']+)["']/g, type: 'label' as const },
      { pattern: /aria-labelledby=["']([^"']+)["']/g, type: 'label' as const },
      { pattern: /aria-describedby=["']([^"']+)["']/g, type: 'description' as const }
    ];

    labelPatterns.forEach(({ pattern, type }) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        features.push({
          type,
          implementation: match[0],
          purpose: type === 'label' ? 'Provides accessible name for element' : 'Provides additional description',
          wcagCriteria: ['1.3.1 Info and Relationships', '4.1.2 Name, Role, Value']
        });
      }
    });

    // State announcements
    const statePatterns = [
      /aria-expanded=["']([^"']+)["']/g,
      /aria-selected=["']([^"']+)["']/g,
      /aria-checked=["']([^"']+)["']/g,
      /aria-pressed=["']([^"']+)["']/g,
      /aria-busy=["']([^"']+)["']/g
    ];

    statePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        features.push({
          type: 'state',
          implementation: match[0],
          purpose: 'Communicates current state to assistive technologies',
          wcagCriteria: ['4.1.2 Name, Role, Value']
        });
      }
    });

    return features;
  }

  /**
   * Extracts CSS focus patterns
   */
  private extractCSSFocusPatterns(cssContent: string): FocusPattern[] {
    const patterns: FocusPattern[] = [];

    // Focus-visible patterns
    if (cssContent.includes(':focus-visible')) {
      patterns.push({
        type: 'focus-ring',
        implementation: 'CSS :focus-visible pseudo-class with outline styles',
        description: 'Modern focus indicators that only show for keyboard navigation',
        wcagCriteria: ['2.4.7 Focus Visible']
      });
    }

    // Custom focus ring patterns
    const focusRingRegex = /--focus-ring-([a-z-]+):\s*([^;]+);/g;
    let match;
    while ((match = focusRingRegex.exec(cssContent)) !== null) {
      patterns.push({
        type: 'focus-ring',
        implementation: `CSS custom property: ${match[0]}`,
        description: 'Customizable focus ring system using CSS variables',
        wcagCriteria: ['2.4.7 Focus Visible']
      });
    }

    return patterns;
  }

  /**
   * Checks for reduced motion support
   */
  private hasReducedMotionSupport(cssContent: string): boolean {
    return cssContent.includes('prefers-reduced-motion');
  }

  /**
   * Extracts color contrast features
   */
  private extractColorContrastFeatures(cssContent: string): string[] {
    const features: string[] = [];

    if (cssContent.includes('prefers-color-scheme')) {
      features.push('Automatic dark mode support based on system preferences');
    }

    if (cssContent.includes('--color-') && cssContent.includes('contrast')) {
      features.push('High contrast color tokens for improved readability');
    }

    // Look for semantic color usage
    const semanticColors = ['error', 'warning', 'success', 'info'];
    semanticColors.forEach(color => {
      if (cssContent.includes(`--color-${color}`)) {
        features.push(`Semantic ${color} colors for consistent meaning`);
      }
    });

    return features;
  }

  /**
   * Assesses WCAG compliance based on detected patterns
   */
  private assessWCAGCompliance(content: string): string[] {
    const compliance: string[] = [];

    // Check for keyboard accessibility
    if (content.includes('onkeydown') || content.includes('onkeyup')) {
      compliance.push('2.1.1 Keyboard - Keyboard accessible functionality');
    }

    // Check for focus management
    if (content.includes(':focus-visible') || content.includes('focus()')) {
      compliance.push('2.4.7 Focus Visible - Visible focus indicators');
      compliance.push('2.4.3 Focus Order - Logical focus sequence');
    }

    // Check for ARIA usage
    if (content.includes('aria-') || content.includes('role=')) {
      compliance.push('4.1.2 Name, Role, Value - Accessible names and roles');
      compliance.push('1.3.1 Info and Relationships - Programmatic relationships');
    }

    // Check for semantic HTML
    if (content.includes('<button') || content.includes('<input') || content.includes('<label')) {
      compliance.push('4.1.1 Parsing - Valid HTML structure');
    }

    // Check for error handling
    if (content.includes('aria-invalid') || content.includes('role="alert"')) {
      compliance.push('3.3.1 Error Identification - Clear error messages');
      compliance.push('4.1.3 Status Messages - Programmatic status updates');
    }

    return [...new Set(compliance)]; // Remove duplicates
  }

  /**
   * Helper methods
   */
  private parseAriaValue(value: string): string | boolean {
    if (value === 'true' || value === 'false') {
      return value === 'true';
    }
    return value;
  }

  private getAriaPurpose(ariaName: string): string {
    const purposes: Record<string, string> = {
      'aria-label': 'Provides accessible name when visible text is insufficient',
      'aria-labelledby': 'References other elements that describe this element',
      'aria-describedby': 'References elements that provide additional description',
      'aria-expanded': 'Indicates if collapsible element is expanded',
      'aria-selected': 'Indicates selection state in selectable elements',
      'aria-checked': 'Indicates checked state of checkboxes and radio buttons',
      'aria-pressed': 'Indicates pressed state of toggle buttons',
      'aria-busy': 'Indicates element is being modified and assistive technologies should wait',
      'aria-live': 'Indicates dynamic content that should be announced',
      'aria-hidden': 'Hides decorative content from assistive technologies',
      'aria-invalid': 'Indicates validation state of form controls',
      'aria-required': 'Indicates required form fields',
      'aria-haspopup': 'Indicates element triggers popup or menu'
    };

    return purposes[ariaName] || `ARIA attribute: ${ariaName}`;
  }

  private getRolePurpose(role: string): string {
    const purposes: Record<string, string> = {
      'button': 'Identifies element as clickable button',
      'menu': 'Identifies list of menu items',
      'menuitem': 'Identifies option in menu',
      'dialog': 'Identifies modal dialog',
      'alert': 'Identifies important message requiring immediate attention',
      'status': 'Identifies advisory information for user',
      'log': 'Identifies live region where new information is added',
      'banner': 'Identifies site header or main navigation',
      'main': 'Identifies primary content of page',
      'navigation': 'Identifies navigation links',
      'complementary': 'Identifies supporting content',
      'contentinfo': 'Identifies footer information'
    };

    return purposes[role] || `Semantic role: ${role}`;
  }

  private getAriaWCAGCriteria(ariaName: string): string[] {
    const criteria: Record<string, string[]> = {
      'aria-label': ['4.1.2 Name, Role, Value'],
      'aria-labelledby': ['4.1.2 Name, Role, Value', '1.3.1 Info and Relationships'],
      'aria-describedby': ['1.3.1 Info and Relationships'],
      'aria-expanded': ['4.1.2 Name, Role, Value'],
      'aria-selected': ['4.1.2 Name, Role, Value'],
      'aria-checked': ['4.1.2 Name, Role, Value'],
      'aria-pressed': ['4.1.2 Name, Role, Value'],
      'aria-busy': ['4.1.2 Name, Role, Value'],
      'aria-live': ['4.1.3 Status Messages'],
      'aria-hidden': ['1.3.1 Info and Relationships'],
      'aria-invalid': ['3.3.1 Error Identification', '4.1.2 Name, Role, Value'],
      'aria-required': ['3.3.2 Labels or Instructions'],
      'aria-haspopup': ['4.1.2 Name, Role, Value']
    };

    return criteria[ariaName] || ['4.1.2 Name, Role, Value'];
  }

  private getRoleWCAGCriteria(role: string): string[] {
    const criteria: Record<string, string[]> = {
      'button': ['4.1.2 Name, Role, Value', '2.1.1 Keyboard'],
      'menu': ['4.1.2 Name, Role, Value', '2.1.1 Keyboard'],
      'menuitem': ['4.1.2 Name, Role, Value', '2.1.1 Keyboard'],
      'dialog': ['4.1.2 Name, Role, Value', '2.4.3 Focus Order'],
      'alert': ['4.1.3 Status Messages'],
      'status': ['4.1.3 Status Messages'],
      'log': ['4.1.3 Status Messages'],
      'banner': ['1.3.1 Info and Relationships'],
      'main': ['1.3.1 Info and Relationships'],
      'navigation': ['1.3.1 Info and Relationships'],
      'complementary': ['1.3.1 Info and Relationships'],
      'contentinfo': ['1.3.1 Info and Relationships']
    };

    return criteria[role] || ['4.1.2 Name, Role, Value'];
  }

  private extractKeyPatternsFromHandler(handler: string, _content: string): KeyboardPattern[] {
    const patterns: KeyboardPattern[] = [];
    
    // This is a simplified extraction - in a real implementation,
    // you might want to parse the JavaScript more thoroughly
    const keyChecks = handler.match(/event\.key\s*===?\s*['"]([^'"]+)['"]/g);
    
    if (keyChecks) {
      keyChecks.forEach(check => {
        const keyMatch = check.match(/['"]([^'"]+)['"]/);
        if (keyMatch) {
          const key = keyMatch[1];
          patterns.push({
            keys: [key],
            action: this.inferActionFromKey(key),
            context: 'Component interaction',
            implementation: `Keyboard event handler: ${check}`
          });
        }
      });
    }

    return patterns;
  }

  private inferActionFromKey(key: string): string {
    const actions: Record<string, string> = {
      'Enter': 'Activate element',
      'Space': 'Activate element',
      'Escape': 'Close/cancel',
      'ArrowUp': 'Navigate up',
      'ArrowDown': 'Navigate down',
      'ArrowLeft': 'Navigate left',
      'ArrowRight': 'Navigate right',
      'Tab': 'Move focus',
      'Home': 'Go to first item',
      'End': 'Go to last item'
    };

    return actions[key] || `Handle ${key} key`;
  }

  private extractImplementationDetails(content: string, pattern: RegExp): string {
    const match = content.match(pattern);
    return match ? match[0] : 'Keyboard event handling implementation';
  }

  private getEmptyAccessibilityFeatures(): AccessibilityFeatures {
    return {
      ariaAttributes: [],
      keyboardPatterns: [],
      focusPatterns: [],
      screenReaderFeatures: [],
      wcagCompliance: []
    };
  }
}