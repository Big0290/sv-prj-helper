<script lang="ts">
  import { Input, Button, Card, Stack } from '$lib/ui'

  let email = $state('')
  let password = $state('')
  let isLoading = $state(false)

  function handleLogin() {
    isLoading = true
    console.log('Login:', { email, password })
    setTimeout(() => {
      isLoading = false
    }, 1000)
  }
</script>

<Card>
  <form
    onsubmit={(e) => {
      e.preventDefault()
      handleLogin()
    }}
  >
    <Stack gap="4">
      <Input bind:value={email} type="email" label="Email Address" placeholder="you@example.com" required />

      <Input bind:value={password} type="password" label="Password" placeholder="Enter your password" required />

      <div class="button-wrapper">
        <Button variant="primary" type="submit" disabled={isLoading}>
          {#if isLoading}
            Signing in...
          {:else}
            Sign In
          {/if}
        </Button>
      </div>
    </Stack>
  </form>
</Card>

<style>
  .button-wrapper {
    width: 100%;
  }

  .button-wrapper :global(button) {
    width: 100%;
  }
</style>
