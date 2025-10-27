#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs';
import { join } from 'path';

/**
 * Optimize the packaged library for better tree-shaking and distribution
 */
function optimizePackage() {
  const distPath = './dist';
  const rootPackageJsonPath = './package.json';
  const distPackageJsonPath = join(distPath, 'package.json');
  
  try {
    // Copy and modify the root package.json for distribution
    if (!existsSync(rootPackageJsonPath)) {
      console.error('❌ No package.json found in root directory');
      process.exit(1);
    }

    // Read the root package.json
    const rootPackageJson = JSON.parse(readFileSync(rootPackageJsonPath, 'utf-8'));
    
    // Create optimized package.json for distribution
    const distPackageJson = {
      name: rootPackageJson.name,
      version: rootPackageJson.version,
      description: rootPackageJson.description,
      repository: rootPackageJson.repository,
      publishConfig: rootPackageJson.publishConfig,
      type: "module",
      main: "./index.js",
      module: "./index.js",
      types: "./index.d.ts",
      svelte: "./index.js",
      sideEffects: ["*.css", "*.scss"],
      keywords: rootPackageJson.keywords,
      license: rootPackageJson.license,
      peerDependencies: {
        svelte: "^5.0.0"
      },
      dependencies: rootPackageJson.dependencies
    };

    // Build optimized exports
    const exports = {
      ".": {
        "types": "./index.d.ts",
        "svelte": "./index.js",
        "import": "./index.js",
        "default": "./index.js"
      },
      "./package.json": "./package.json"
    };

    // Add styles export if theme.css exists
    const themeCssPath = join(distPath, 'styles', 'theme.css');
    if (existsSync(themeCssPath)) {
      exports["./styles"] = {
        "import": "./styles/theme.css",
        "default": "./styles/theme.css"
      };
    }

    // Add UI exports if ui directory exists
    const uiIndexPath = join(distPath, 'ui', 'index.js');
    if (existsSync(uiIndexPath)) {
      exports["./ui"] = {
        "types": "./ui/index.d.ts",
        "svelte": "./ui/index.js",
        "import": "./ui/index.js",
        "default": "./ui/index.js"
      };
    }

    // Add docs exports if docs directory exists
    const docsIndexPath = join(distPath, 'docs', 'index.js');
    if (existsSync(docsIndexPath)) {
      exports["./docs"] = {
        "types": "./docs/index.d.ts",
        "import": "./docs/index.js",
        "default": "./docs/index.js"
      };
    }

    // Add hooks exports if hooks directory exists
    const hooksIndexPath = join(distPath, 'hooks', 'index.js');
    if (existsSync(hooksIndexPath)) {
      exports["./hooks"] = {
        "types": "./hooks/index.d.ts",
        "import": "./hooks/index.js",
        "default": "./hooks/index.js"
      };
    }

    distPackageJson.exports = exports;
    
    // Write optimized package.json to dist
    writeFileSync(distPackageJsonPath, JSON.stringify(distPackageJson, null, 2));
    
    console.log('✅ Package optimized for tree-shaking and ES modules');
    console.log('📦 Exports configured for proper module resolution');
    console.log(`📋 Generated ${Object.keys(exports).length} export paths`);
    
    // Log export paths for verification
    Object.keys(exports).forEach(exportPath => {
      console.log(`   - ${exportPath}`);
    });
    
  } catch (error) {
    console.error('❌ Failed to optimize package:', error.message);
    process.exit(1);
  }
}

optimizePackage();