<script lang="ts">
  import { Breadcrumb } from '$lib/ui'
</script>

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptop' },
  ]}
/>
