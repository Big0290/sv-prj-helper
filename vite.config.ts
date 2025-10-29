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
    target: 'es2020',
    lib: {
      entry: 'src/lib/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: [
        'svelte',
        'svelte/internal',
        'svelte/store',
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
        'chart.js'
      ]
    }
  },
  optimizeDeps: {
    exclude: ['svelte'],
  }
})
