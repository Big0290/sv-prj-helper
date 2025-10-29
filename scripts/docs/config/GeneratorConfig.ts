/**
 * Configuration for the LLM Documentation Generator
 */

export interface GeneratorConfig {
  /** Source directory to scan for components */
  sourceDirectory: string;
  
  /** Output file path for the generated LLM.md */
  outputPath: string;
  
  /** Component directories to analyze */
  componentDirectories: string[];
  
  /** File patterns to include */
  includePatterns: string[];
  
  /** File patterns to exclude */
  excludePatterns: string[];
  
  /** TypeScript configuration file path */
  tsConfigPath?: string;
  
  /** Theme CSS file path */
  themePath?: string;
  
  /** Enable verbose logging */
  verbose: boolean;
  
  /** Enable progress tracking */
  showProgress: boolean;
  
  /** Maximum file size to analyze (in bytes) */
  maxFileSize: number;
  
  /** Timeout for analysis operations (in ms) */
  analysisTimeout: number;
}

export const defaultConfig: GeneratorConfig = {
  sourceDirectory: 'src/lib',
  outputPath: 'LLM.md',
  componentDirectories: [
    'src/lib/ui/atoms',
    'src/lib/ui/molecules', 
    'src/lib/ui/organisms',
    'src/lib/ui/layouts',
    'src/lib/ui/utils',
    'src/lib/ui/hooks',
    'src/lib/ui/theme'
  ],
  includePatterns: [
    '**/*.svelte',
    '**/*.ts',
    '**/*.js',
    '**/*.css'
  ],
  excludePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.svelte-kit/**',
    '**/*.test.*',
    '**/*.spec.*'
  ],
  tsConfigPath: 'tsconfig.json',
  themePath: 'src/lib/styles/theme.css',
  verbose: false,
  showProgress: true,
  maxFileSize: 1024 * 1024, // 1MB
  analysisTimeout: 30000 // 30 seconds
};

export function createConfig(overrides: Partial<GeneratorConfig> = {}): GeneratorConfig {
  return {
    ...defaultConfig,
    ...overrides
  };
}