#!/usr/bin/env node

/**
 * CLI for LLM Documentation Generator
 * Provides command-line interface with watch mode and configuration options
 */

import { DocumentationGenerator } from './core/DocumentationGenerator.ts';
import { createConfig, type GeneratorConfig } from './config/GeneratorConfig.ts';
import { Logger } from './utils/Logger.ts';
import { FileUtils } from './utils/FileUtils.ts';
import { readFileSync, existsSync, watchFile, unwatchFile } from 'fs';
import { join, resolve } from 'path';

interface CLIOptions {
  config?: string;
  output?: string;
  source?: string;
  watch?: boolean;
  verbose?: boolean;
  help?: boolean;
  version?: boolean;
  validate?: boolean;
  dryRun?: boolean;
  format?: 'markdown' | 'json';
  includePatterns?: string[];
  excludePatterns?: string[];
  maxFileSize?: number;
  timeout?: number;
}

interface WatchContext {
  generator: DocumentationGenerator;
  config: GeneratorConfig;
  logger: Logger;
  isGenerating: boolean;
  lastGeneration: Date;
  debounceTimeout?: NodeJS.Timeout;
}

class LLMDocsCLI {
  private logger: Logger;
  private watchContext?: WatchContext;

  constructor() {
    this.logger = new Logger(false); // Will be updated based on options
  }

  /**
   * Main CLI entry point
   */
  async run(args: string[]): Promise<void> {
    try {
      const options = this.parseArguments(args);
      
      if (options.help) {
        this.showHelp();
        return;
      }

      if (options.version) {
        this.showVersion();
        return;
      }

      // Update logger verbosity
      this.logger = new Logger(options.verbose || false);

      // Load configuration
      const config = await this.loadConfiguration(options);
      
      // Validate configuration
      this.validateConfiguration(config);

      if (options.dryRun) {
        await this.performDryRun(config);
        return;
      }

      if (options.watch) {
        await this.startWatchMode(config);
      } else {
        await this.generateOnce(config, options);
      }

    } catch (error) {
      this.logger.error(`CLI error: ${error}`);
      process.exit(1);
    }
  }

  /**
   * Parse command line arguments
   */
  private parseArguments(args: string[]): CLIOptions {
    const options: CLIOptions = {};
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      const nextArg = args[i + 1];

      switch (arg) {
        case '--config':
        case '-c':
          options.config = nextArg;
          i++;
          break;
        case '--output':
        case '-o':
          options.output = nextArg;
          i++;
          break;
        case '--source':
        case '-s':
          options.source = nextArg;
          i++;
          break;
        case '--watch':
        case '-w':
          options.watch = true;
          break;
        case '--verbose':
        case '-v':
          options.verbose = true;
          break;
        case '--help':
        case '-h':
          options.help = true;
          break;
        case '--version':
          options.version = true;
          break;
        case '--validate':
          options.validate = true;
          break;
        case '--dry-run':
          options.dryRun = true;
          break;
        case '--format':
          options.format = nextArg as 'markdown' | 'json';
          i++;
          break;
        case '--include':
          options.includePatterns = nextArg.split(',');
          i++;
          break;
        case '--exclude':
          options.excludePatterns = nextArg.split(',');
          i++;
          break;
        case '--max-file-size':
          options.maxFileSize = parseInt(nextArg);
          i++;
          break;
        case '--timeout':
          options.timeout = parseInt(nextArg);
          i++;
          break;
        default:
          if (arg.startsWith('-')) {
            throw new Error(`Unknown option: ${arg}`);
          }
          break;
      }
    }

    return options;
  }

  /**
   * Load configuration from file or create default
   */
  private async loadConfiguration(options: CLIOptions): Promise<GeneratorConfig> {
    let baseConfig = createConfig();

    // Load from config file if specified
    if (options.config) {
      const configPath = resolve(options.config);
      if (!existsSync(configPath)) {
        throw new Error(`Configuration file not found: ${configPath}`);
      }

      try {
        const configContent = readFileSync(configPath, 'utf-8');
        const fileConfig = JSON.parse(configContent);
        baseConfig = createConfig(fileConfig);
        this.logger.info(`Loaded configuration from ${configPath}`);
      } catch (error) {
        throw new Error(`Failed to load configuration: ${error}`);
      }
    }

    // Override with CLI options
    const config = createConfig({
      ...baseConfig,
      ...(options.output && { outputPath: options.output }),
      ...(options.source && { sourceDirectory: options.source }),
      ...(options.verbose && { verbose: options.verbose }),
      ...(options.includePatterns && { includePatterns: options.includePatterns }),
      ...(options.excludePatterns && { excludePatterns: options.excludePatterns }),
      ...(options.maxFileSize && { maxFileSize: options.maxFileSize }),
      ...(options.timeout && { analysisTimeout: options.timeout })
    });

    return config;
  }

  /**
   * Validate configuration
   */
  private validateConfiguration(config: GeneratorConfig): void {
    if (!existsSync(config.sourceDirectory)) {
      throw new Error(`Source directory does not exist: ${config.sourceDirectory}`);
    }

    if (config.maxFileSize <= 0) {
      throw new Error('Max file size must be positive');
    }

    if (config.analysisTimeout <= 0) {
      throw new Error('Analysis timeout must be positive');
    }

    this.logger.info('Configuration validated successfully');
  }

  /**
   * Perform dry run (validate configuration and show what would be done)
   */
  private async performDryRun(config: GeneratorConfig): Promise<void> {
    this.logger.info('Performing dry run...');
    
    const generator = new DocumentationGenerator(config);
    
    // Scan components without full analysis
    const scanResult = await generator.scanComponents(config.sourceDirectory);
    
    this.logger.info(`Dry run results:`);
    this.logger.info(`  - Source directory: ${config.sourceDirectory}`);
    this.logger.info(`  - Output path: ${config.outputPath}`);
    this.logger.info(`  - Components found: ${scanResult.length}`);
    this.logger.info(`  - Component directories: ${config.componentDirectories.length}`);
    this.logger.info(`  - Include patterns: ${config.includePatterns.join(', ')}`);
    this.logger.info(`  - Exclude patterns: ${config.excludePatterns.join(', ')}`);
    this.logger.info(`  - Max file size: ${config.maxFileSize} bytes`);
    this.logger.info(`  - Analysis timeout: ${config.analysisTimeout}ms`);
    
    this.logger.success('Dry run completed successfully');
  }

  /**
   * Generate documentation once
   */
  private async generateOnce(config: GeneratorConfig, options: CLIOptions): Promise<void> {
    this.logger.info('Starting documentation generation...');
    
    const startTime = Date.now();
    const generator = new DocumentationGenerator(config);
    
    // Set up progress tracking
    generator.onProgress((progress) => {
      this.logger.progress(
        progress.current,
        progress.total,
        `${progress.stage}: ${progress.message}`
      );
    });

    try {
      // Generate documentation
      const documentation = await generator.generateDocumentation(config.sourceDirectory);
      
      // Output based on format
      if (options.format === 'json') {
        await this.outputJSON(documentation, config.outputPath.replace('.md', '.json'));
      } else {
        await generator.generateLLMMarkdown(documentation, config.outputPath);
      }

      const duration = Date.now() - startTime;
      this.logger.success(`Documentation generated successfully in ${duration}ms`);
      
      if (options.validate) {
        this.logger.info('Running post-generation validation...');
        const validation = await generator.validateDocumentation(documentation);
        
        if (validation.valid) {
          this.logger.success('Documentation validation passed');
        } else {
          this.logger.warn(`Validation found ${validation.errors.length} errors and ${validation.warnings.length} warnings`);
          
          if (options.verbose) {
            validation.errors.forEach(error => {
              this.logger.error(`  Error: ${error.message}`);
            });
            validation.warnings.forEach(warning => {
              this.logger.warn(`  Warning: ${warning.message}`);
            });
          }
        }
      }

    } catch (error) {
      this.logger.error(`Generation failed: ${error}`);
      throw error;
    }
  }

  /**
   * Start watch mode for automatic regeneration
   */
  private async startWatchMode(config: GeneratorConfig): Promise<void> {
    this.logger.info('Starting watch mode...');
    
    const generator = new DocumentationGenerator(config);
    
    this.watchContext = {
      generator,
      config,
      logger: this.logger,
      isGenerating: false,
      lastGeneration: new Date(0)
    };

    // Set up progress tracking
    generator.onProgress((progress) => {
      this.logger.progress(
        progress.current,
        progress.total,
        `${progress.stage}: ${progress.message}`
      );
    });

    // Initial generation
    await this.triggerGeneration();

    // Watch source directories
    await this.setupFileWatchers();

    this.logger.info('Watch mode active. Press Ctrl+C to stop.');
    
    // Keep process alive
    process.on('SIGINT', () => {
      this.stopWatchMode();
      process.exit(0);
    });

    // Prevent process from exiting
    setInterval(() => {}, 1000);
  }

  /**
   * Set up file watchers for source directories
   */
  private async setupFileWatchers(): Promise<void> {
    if (!this.watchContext) return;

    const { config, logger } = this.watchContext;
    const fileUtils = new FileUtils(config);

    for (const directory of config.componentDirectories) {
      try {
        const files = await fileUtils.scanDirectory(directory);
        
        for (const file of files) {
          if (this.shouldWatchFile(file, config)) {
            watchFile(file, { interval: 1000 }, () => {
              this.onFileChange(file);
            });
          }
        }
        
        logger.info(`Watching ${files.length} files in ${directory}`);
      } catch (error) {
        logger.warn(`Failed to watch directory ${directory}: ${error}`);
      }
    }
  }

  /**
   * Check if file should be watched
   */
  private shouldWatchFile(filePath: string, config: GeneratorConfig): boolean {
    // Check include patterns
    const included = config.includePatterns.some(pattern => 
      this.matchesPattern(filePath, pattern)
    );
    
    if (!included) return false;

    // Check exclude patterns
    const excluded = config.excludePatterns.some(pattern => 
      this.matchesPattern(filePath, pattern)
    );
    
    return !excluded;
  }

  /**
   * Simple pattern matching (supports * wildcards)
   */
  private matchesPattern(filePath: string, pattern: string): boolean {
    const regex = new RegExp(
      pattern.replace(/\*/g, '.*').replace(/\?/g, '.'),
      'i'
    );
    return regex.test(filePath);
  }

  /**
   * Handle file change events
   */
  private onFileChange(filePath: string): void {
    if (!this.watchContext) return;

    const { logger } = this.watchContext;
    
    logger.info(`File changed: ${filePath}`);
    
    // Debounce multiple rapid changes
    if (this.watchContext.debounceTimeout) {
      clearTimeout(this.watchContext.debounceTimeout);
    }

    this.watchContext.debounceTimeout = setTimeout(() => {
      this.triggerGeneration();
    }, 500); // 500ms debounce
  }

  /**
   * Trigger documentation generation
   */
  private async triggerGeneration(): Promise<void> {
    if (!this.watchContext || this.watchContext.isGenerating) return;

    const { generator, config, logger } = this.watchContext;
    
    // Prevent concurrent generations
    this.watchContext.isGenerating = true;
    
    try {
      logger.info('Regenerating documentation...');
      const startTime = Date.now();
      
      const documentation = await generator.generateDocumentation(config.sourceDirectory);
      await generator.generateLLMMarkdown(documentation, config.outputPath);
      
      const duration = Date.now() - startTime;
      this.watchContext.lastGeneration = new Date();
      
      logger.success(`Documentation regenerated in ${duration}ms`);
      
    } catch (error) {
      logger.error(`Regeneration failed: ${error}`);
    } finally {
      this.watchContext.isGenerating = false;
    }
  }

  /**
   * Stop watch mode and clean up
   */
  private stopWatchMode(): void {
    if (!this.watchContext) return;

    this.logger.info('Stopping watch mode...');
    
    // Clear debounce timeout
    if (this.watchContext.debounceTimeout) {
      clearTimeout(this.watchContext.debounceTimeout);
    }

    // Unwatch all files (simplified - in production you'd track watched files)
    // unwatchFile() calls would go here

    this.watchContext = undefined;
    this.logger.info('Watch mode stopped');
  }

  /**
   * Output documentation as JSON
   */
  private async outputJSON(documentation: any, outputPath: string): Promise<void> {
    const fileUtils = new FileUtils(createConfig());
    const jsonContent = JSON.stringify(documentation, null, 2);
    await fileUtils.writeFile(outputPath, jsonContent);
    this.logger.info(`JSON documentation written to ${outputPath}`);
  }

  /**
   * Show help information
   */
  private showHelp(): void {
    console.log(`
LLM Documentation Generator CLI

USAGE:
  generate-llm-docs [OPTIONS]

OPTIONS:
  -c, --config <path>        Configuration file path
  -o, --output <path>        Output file path (default: LLM.md)
  -s, --source <path>        Source directory path (default: src/lib)
  -w, --watch               Watch mode for automatic regeneration
  -v, --verbose             Verbose logging
  --validate                Run validation after generation
  --dry-run                 Show what would be done without generating
  --format <format>         Output format: markdown (default) or json
  --include <patterns>      Comma-separated include patterns
  --exclude <patterns>      Comma-separated exclude patterns
  --max-file-size <bytes>   Maximum file size to analyze
  --timeout <ms>            Analysis timeout in milliseconds
  -h, --help                Show this help
  --version                 Show version

EXAMPLES:
  generate-llm-docs                           # Generate with defaults
  generate-llm-docs --watch --verbose         # Watch mode with verbose output
  generate-llm-docs --config ./docs.config.json  # Use custom config
  generate-llm-docs --output ./docs/API.md    # Custom output path
  generate-llm-docs --dry-run                 # Preview what would be done
  generate-llm-docs --format json             # Output as JSON

CONFIGURATION FILE:
  {
    "sourceDirectory": "src/lib",
    "outputPath": "LLM.md",
    "componentDirectories": ["src/lib/ui/atoms", "src/lib/ui/molecules"],
    "includePatterns": ["**/*.svelte", "**/*.ts"],
    "excludePatterns": ["**/*.test.*", "**/node_modules/**"],
    "verbose": false,
    "showProgress": true,
    "maxFileSize": 1048576,
    "analysisTimeout": 30000
  }
`);
  }

  /**
   * Show version information
   */
  private showVersion(): void {
    try {
      const packagePath = join(__dirname, 'package.json');
      const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
      console.log(`LLM Documentation Generator v${packageJson.version}`);
    } catch (error) {
      console.log('LLM Documentation Generator v1.0.0');
    }
  }
}

// Main execution
async function main() {
  const cli = new LLMDocsCLI();
  await cli.run(process.argv.slice(2));
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('CLI execution failed:', error);
    process.exit(1);
  });
}

export { LLMDocsCLI };