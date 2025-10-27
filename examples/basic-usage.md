# Basic Usage Examples

Simple examples to get you started with SV Project Helper UI components.

## Setup

First, make sure you have the library installed and styles imported:

```svelte
<script>
  import '@big0290/sv-prj-helper-ui/styles';
</script>
```

## Button Examples

### Basic Buttons

```svelte
<script lang="ts">
  import { Button } from '@big0290/sv-prj-helper-ui';
  
  function handleClick() {
    alert('Button clicked!');
  }
</script>

<!-- Primary button -->
<Button variant="primary" onclick={handleClick}>
  Primary Button
</Button>

<!-- Secondary button -->
<Button variant="secondary" onclick={handleClick}>
  Secondary Button
</Button>

<!-- Ghost button -->
<Button variant="ghost" onclick={handleClick}>
  Ghost Button
</Button>

<!-- Danger button -->
<Button variant="danger" onclick={handleClick}>
  Danger Button
</Button>
```

### Button Sizes

```svelte
<script lang="ts">
  import { Button } from '@big0290/sv-prj-helper-ui';
</script>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Button States

```svelte
<script lang="ts">
  import { Button } from '@big0290/sv-prj-helper-ui';
  
  let loading = $state(false);
  
  async function handleAsyncAction() {
    loading = true;
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    loading = false;
  }
</script>

<!-- Disabled button -->
<Button disabled>Disabled</Button>

<!-- Loading button -->
<Button {loading} onclick={handleAsyncAction}>
  {loading ? 'Loading...' : 'Click me'}
</Button>
```

## Input Examples

### Basic Input

```svelte
<script lang="ts">
  import { Input } from '@big0290/sv-prj-helper-ui';
  
  let name = $state('');
  let email = $state('');
</script>

<Input 
  bind:value={name}
  label="Full Name"
  placeholder="Enter your name"
/>

<Input 
  bind:value={email}
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
/>
```

### Input with Validation

```svelte
<script lang="ts">
  import { Input } from '@big0290/sv-prj-helper-ui';
  
  let password = $state('');
  let confirmPassword = $state('');
  
  $: passwordError = password.length > 0 && password.length < 8 
    ? 'Password must be at least 8 characters' 
    : '';
    
  $: confirmError = confirmPassword.length > 0 && password !== confirmPassword 
    ? 'Passwords do not match' 
    : '';
</script>

<Input 
  bind:value={password}
  label="Password"
  type="password"
  error={passwordError}
  helperText="Must be at least 8 characters"
/>

<Input 
  bind:value={confirmPassword}
  label="Confirm Password"
  type="password"
  error={confirmError}
/>
```

## Card Examples

### Basic Card

```svelte
<script lang="ts">
  import { Card, Button } from '@big0290/sv-prj-helper-ui';
</script>

<Card>
  <h3>Welcome</h3>
  <p>This is a basic card with some content.</p>
  <Button variant="primary">Get Started</Button>
</Card>
```

### Card Variants

```svelte
<script lang="ts">
  import { Card } from '@big0290/sv-prj-helper-ui';
</script>

<!-- Default card -->
<Card>
  <h3>Default Card</h3>
  <p>Standard glassmorphic card.</p>
</Card>

<!-- Elevated card -->
<Card variant="elevated">
  <h3>Elevated Card</h3>
  <p>Card with more prominent shadow.</p>
</Card>

<!-- Outlined card -->
<Card variant="outlined">
  <h3>Outlined Card</h3>
  <p>Card with visible border.</p>
</Card>
```

## Alert Examples

### Alert Variants

```svelte
<script lang="ts">
  import { Alert } from '@big0290/sv-prj-helper-ui';
</script>

<Alert variant="info">
  This is an informational message.
</Alert>

<Alert variant="success">
  Operation completed successfully!
</Alert>

<Alert variant="warning">
  Please review your input.
</Alert>

<Alert variant="error">
  An error occurred. Please try again.
</Alert>
```

### Dismissible Alert

```svelte
<script lang="ts">
  import { Alert } from '@big0290/sv-prj-helper-ui';
  
  let showAlert = $state(true);
</script>

{#if showAlert}
  <Alert 
    variant="success" 
    dismissible
    onDismiss={() => showAlert = false}
  >
    This alert can be dismissed!
  </Alert>
{/if}
```

## Badge Examples

```svelte
<script lang="ts">
  import { Badge } from '@big0290/sv-prj-helper-ui';
</script>

<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>

<!-- Different sizes -->
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

## Progress Examples

```svelte
<script lang="ts">
  import { Progress } from '@big0290/sv-prj-helper-ui';
  
  let progress = $state(0);
  
  // Simulate progress
  function startProgress() {
    progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  }
</script>

<!-- Basic progress bar -->
<Progress value={75} max={100} />

<!-- Animated progress -->
<Progress value={progress} max={100} />
<Button onclick={startProgress}>Start Progress</Button>

<!-- Different variants -->
<Progress value={60} variant="success" />
<Progress value={80} variant="warning" />
<Progress value={40} variant="error" />
```

## Complete Example

Here's a complete example combining multiple components:

```svelte
<script lang="ts">
  import { 
    Card, 
    Input, 
    Button, 
    Alert, 
    Badge, 
    Progress 
  } from '@big0290/sv-prj-helper-ui';
  import '@big0290/sv-prj-helper-ui/styles';
  
  let name = $state('');
  let email = $state('');
  let submitted = $state(false);
  let loading = $state(false);
  let progress = $state(0);
  
  async function handleSubmit() {
    loading = true;
    progress = 0;
    
    // Simulate form submission with progress
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        loading = false;
        submitted = true;
      }
    }, 300);
  }
  
  $: isValid = name.length > 0 && email.includes('@');
</script>

<main>
  <Card>
    <div class="header">
      <h2>User Registration</h2>
      <Badge variant={isValid ? 'success' : 'warning'}>
        {isValid ? 'Valid' : 'Incomplete'}
      </Badge>
    </div>
    
    {#if submitted}
      <Alert variant="success">
        Registration completed successfully!
      </Alert>
    {:else}
      <form onsubmit|preventDefault={handleSubmit}>
        <Input 
          bind:value={name}
          label="Full Name"
          placeholder="Enter your name"
          required
        />
        
        <Input 
          bind:value={email}
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />
        
        {#if loading}
          <Progress value={progress} max={100} />
        {/if}
        
        <Button 
          type="submit" 
          variant="primary" 
          disabled={!isValid || loading}
          {loading}
        >
          {loading ? 'Submitting...' : 'Register'}
        </Button>
      </form>
    {/if}
  </Card>
</main>

<style>
  main {
    max-width: 500px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
```

This example demonstrates:
- Form handling with Svelte 5 runes
- Component composition
- State management
- Conditional rendering
- Progress indication
- Form validation
- Responsive design

## Next Steps

- Explore [Form Examples](form-example.md) for more complex forms
- Check out [Modal Examples](modal-example.md) for dialog patterns
- See [Data Display](data-display.md) for tables and lists