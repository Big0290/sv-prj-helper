import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Library mode: no adapter needed for package distribution
  preprocess: vitePreprocess(),

  kit: {
    // Removed adapter for library packaging
    // Using svelte-package for library builds (configured in vite.config.ts)
  },
}

export default config
