import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    dedupe: ['svelte'],
  },
  build: {
    // Optimize for library distribution
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: [
        'svelte',
        'svelte/internal',
        '@codemirror/autocomplete',
        '@codemirror/basic-setup',
        '@codemirror/commands',
        '@codemirror/lang-css',
        '@codemirror/lang-html',
        '@codemirror/lang-javascript',
        '@codemirror/lang-json',
        '@codemirror/lang-markdown',
        '@codemirror/lang-python',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/theme-one-dark',
        '@codemirror/view',
        '@zxing/library',
        'jsbarcode',
        'jsqr',
        'marked',
        'prismjs',
        'qrcode',
        'svelte-dnd-action',
      ],
      output: {
        // Preserve module structure for better tree-shaking
        preserveModules: true,
        preserveModulesRoot: 'src/lib',
        // Use ES modules format
        format: 'es',
        // Generate source maps
        sourcemap: true,
        // Optimize chunk naming
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        // Ensure proper exports
        exports: 'named',
      },
    },
  },
  optimizeDeps: {
    exclude: ['svelte'],
  },
})
