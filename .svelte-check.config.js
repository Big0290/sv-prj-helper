/** @type {import('@sveltejs/check').Config} */
export default {
  // Ignore known Storybook + Svelte 5 snippet type inference issues
  ignoreFiles: [
    '**/EmptyState.stories.svelte',
    '**/MenuItem.stories.svelte',
    '**/StatsCard.stories.svelte'
  ]
};

