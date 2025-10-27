# Quick Start Guide

Get up and running with SV Project Helper UI in minutes!

## 🚀 Installation

### 1. Configure GitHub Packages

```bash
# Add to your .npmrc file
echo "@big0290:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc
```

### 2. Install the Package

```bash
npm install @big0290/sv-prj-helper-ui
```

## 🎨 Basic Usage

### Import Styles

Add this to your main Svelte file:

```svelte
<script>
  import '@big0290/sv-prj-helper-ui/styles';
</script>
```

### Your First Component

```svelte
<script lang="ts">
  import { Button, Card } from '@big0290/sv-prj-helper-ui';
  
  let count = $state(0);
</script>

<Card>
  <h2>Counter: {count}</h2>
  <Button onclick={() => count++}>
    Increment
  </Button>
</Card>
```

## 📝 Complete Example

Here's a full working example:

```svelte
<!-- App.svelte -->
<script lang="ts">
  import { 
    Button, 
    Input, 
    Card, 
    Alert, 
    Modal 
  } from '@big0290/sv-prj-helper-ui';
  import '@big0290/sv-prj-helper-ui/styles';
  
  let name = $state('');
  let email = $state('');
  let showSuccess = $state(false);
  let showModal = $state(false);
  
  function handleSubmit() {
    if (name && email) {
      showSuccess = true;
      showModal = false;
      // Reset form
      name = '';
      email = '';
    }
  }
</script>

<main>
  <h1>Welcome to SV Project Helper UI</h1>
  
  {#if showSuccess}
    <Alert variant="success">
      Form submitted successfully!
    </Alert>
  {/if}
  
  <Card>
    <h2>Get Started</h2>
    <p>Fill out the form below to see the components in action.</p>
    
    <Input 
      bind:value={name}
      label="Your Name"
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
    
    <Button 
      variant="primary" 
      onclick={() => showModal = true}
      disabled={!name || !email}
    >
      Submit
    </Button>
  </Card>
  
  <Modal bind:open={showModal} title="Confirm Submission">
    <p>Submit form with the following details?</p>
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
    </ul>
    
    {#snippet actions()}
      <Button variant="ghost" onclick={() => showModal = false}>
        Cancel
      </Button>
      <Button variant="primary" onclick={handleSubmit}>
        Confirm
      </Button>
    {/snippet}
  </Modal>
</main>

<style>
  main {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
```

## 🎯 Next Steps

### Explore Components

Try these popular components:

```svelte
<script>
  import { 
    Badge, 
    Progress, 
    Tabs, 
    DataTable,
    Dropdown 
  } from '@big0290/sv-prj-helper-ui';
</script>

<!-- Status Badge -->
<Badge variant="success">Active</Badge>

<!-- Progress Bar -->
<Progress value={75} max={100} />

<!-- Tabs -->
<Tabs>
  <Tab id="tab1" label="Overview">
    <p>Overview content</p>
  </Tab>
  <Tab id="tab2" label="Details">
    <p>Details content</p>
  </Tab>
</Tabs>
```

### TypeScript Support

Get full type safety:

```typescript
import type { ButtonProps, CardProps } from '@big0290/sv-prj-helper-ui';

const buttonConfig: ButtonProps = {
  variant: 'primary',
  size: 'lg',
  disabled: false
};
```

### Custom Theming

Override CSS custom properties:

```css
:root {
  --primary-color: #ef4444;  /* Red theme */
  --glass-bg: rgba(239, 68, 68, 0.1);
  --glass-border: rgba(239, 68, 68, 0.2);
}
```

## 📚 Learn More

- [Full Documentation](README.md)
- [Component Examples](https://github.com/Big0290/sv-prj-helper)
- [GitHub Repository](https://github.com/Big0290/sv-prj-helper)

## 🆘 Need Help?

- Check [Common Issues](README.md#troubleshooting)
- Open an [Issue](https://github.com/Big0290/sv-prj-helper/issues)
- Review [Examples](https://github.com/Big0290/sv-prj-helper/tree/main/examples)

---

**Happy coding!** 🎉