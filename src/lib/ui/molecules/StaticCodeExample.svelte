<script lang="ts">
  import Code from '../atoms/Code.svelte'
  import Button from '../atoms/Button.svelte'
  import Card from './Card.svelte'
  import Text from '../atoms/Text.svelte'

  interface Props {
    code: string
    language?: 'svelte' | 'typescript' | 'javascript' | 'html' | 'css' | 'bash'
    description?: string
    title?: string
    showCopyButton?: boolean
    showLineNumbers?: boolean
  }

  let {
    code,
    language = 'svelte',
    description,
    title,
    showCopyButton = true,
    showLineNumbers = false,
  }: Props = $props()

  let copied = $state(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      copied = true
      setTimeout(() => {
        copied = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }
</script>

<div class="code-example">
  {#if title}
    <div class="code-header">
      <Text size="sm" weight="medium">{title}</Text>
    </div>
  {/if}

  {#if description}
    <div class="code-description">
      <Text size="sm" color="var(--text-secondary)">{description}</Text>
    </div>
  {/if}

  <Card>
    <div class="code-wrapper">
      <div class="code-toolbar">
        {#if showCopyButton}
          <Button size="sm" variant="ghost" onclick={copyCode}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        {/if}
      </div>
      <Code inline={false} {language}>
        {code}
      </Code>
    </div>
  </Card>
</div>

<style>
  .code-example {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  .code-header {
    padding: 0 0.25rem;
  }

  .code-description {
    padding: 0 0.25rem;
  }

  .code-wrapper {
    position: relative;
    padding-top: 2.5rem; /* Space for the copy button */
  }

  .code-toolbar {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 10;
  }

  :global(.code-wrapper pre) {
    margin: 0;
    background: transparent !important;
  }

  :global(.code-wrapper code) {
    display: block;
    white-space: pre-wrap;
    word-break: normal;
    overflow: visible;
  }
</style>
