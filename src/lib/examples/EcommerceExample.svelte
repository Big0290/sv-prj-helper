<script lang="ts">
  import {
    Card,
    Grid,
    Stack,
    Flex,
    Heading,
    Text,
    Badge,
    Avatar,
    Button,
    Icon,
    Input,
    Image,
    Container,
    Divider,
    Modal,
  } from '$lib/ui'

  // Shopping cart state
  interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }

  let cart = $state<CartItem[]>([])
  let cartOpen = $state(false)
  let searchQuery = $state('')
  let selectedProduct = $state<(typeof products)[0] | null>(null)
  let productModalOpen = $state(false)

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      category: 'Electronics',
      rating: 4.5,
      inStock: true,
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      category: 'Electronics',
      rating: 4.8,
      inStock: true,
    },
    {
      id: 3,
      name: 'Backpack Adventure',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      category: 'Accessories',
      rating: 4.3,
      inStock: true,
    },
    {
      id: 4,
      name: 'Sunglasses Classic',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop',
      category: 'Accessories',
      rating: 4.6,
      inStock: false,
    },
    {
      id: 5,
      name: 'Running Shoes',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      category: 'Footwear',
      rating: 4.7,
      inStock: true,
    },
    {
      id: 6,
      name: 'Laptop Sleeve',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
      category: 'Accessories',
      rating: 4.4,
      inStock: true,
    },
  ]

  const categories = ['All', 'Electronics', 'Accessories', 'Footwear']

  let selectedCategory = $state('All')

  function getFilteredProducts() {
    let filtered = products

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filtered
  }

  function addToCart(product: (typeof products)[0]) {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart = [...cart, { ...product, quantity: 1 }]
    }
    cartOpen = true
  }

  function openProductModal(product: (typeof products)[0]) {
    selectedProduct = product
    productModalOpen = true
  }

  function closeProductModal() {
    productModalOpen = false
    selectedProduct = null
  }

  function removeFromCart(productId: number) {
    cart = cart.filter((item) => item.id !== productId)
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = cart.find((item) => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  // Calculate cart totals - reactive computations using Svelte 5 runes
  const cartSubtotal = $derived(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))
  const shippingCost = $derived(cartSubtotal > 100 ? 0 : 9.99)
  const tax = $derived(cartSubtotal * 0.08) // 8% tax
  const cartTotal = $derived(cartSubtotal + shippingCost + tax)
  const cartItemCount = $derived(cart.reduce((sum, item) => sum + item.quantity, 0))

  // Navigation
  const navItems = [
    { label: 'Home', active: true },
    { label: 'Shop', active: false },
    { label: 'About', active: false },
    { label: 'Contact', active: false },
  ]

  // Icon SVG strings
  const cartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`
  const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`
</script>

<div class="ecommerce-container">
  <!-- Header -->
  <header class="header">
    <Container maxWidth="xl">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="4">ShopHub</Heading>

        <Flex gap="4" align="center">
          <div class="search-box">
            <Input type="search" placeholder="Search products..." bind:value={searchQuery} />
          </div>

          <button class="cart-button" onclick={() => (cartOpen = !cartOpen)} aria-label="Shopping cart">
            <Icon html={cartIcon} />
            {#if cartItemCount > 0}
              <Badge variant="error" size="sm">{cartItemCount}</Badge>
            {/if}
          </button>

          <Avatar initials="U" size="md" status="online" />
        </Flex>
      </Flex>
    </Container>
  </header>

  <!-- Navigation -->
  <nav class="navigation">
    <Container maxWidth="xl">
      <Flex gap="3">
        {#each navItems as item}
          <a href="#" class="nav-link" class:active={item.active}>{item.label}</a>
        {/each}
      </Flex>
    </Container>
  </nav>

  <!-- Main Content -->
  <main class="main-content">
    <Container maxWidth="xl">
      <!-- Hero Section -->
      <Card class="hero-card">
        <Stack gap="4" align="center">
          <Heading as="h2" size="2">Welcome to ShopHub</Heading>
          <Text size="lg" color="var(--text-secondary)" align="center">
            Discover amazing products at unbeatable prices
          </Text>
          <Button variant="primary" size="lg">Shop Now</Button>
        </Stack>
      </Card>

      <!-- Category Filters -->
      <Flex gap="2" class="category-filters">
        {#each categories as category}
          <Button
            variant={selectedCategory === category ? 'primary' : 'ghost'}
            onclick={() => (selectedCategory = category)}
          >
            {category}
          </Button>
        {/each}
      </Flex>

      <!-- Products Grid -->
      {#if getFilteredProducts().length === 0}
        <Card class="empty-state">
          <Stack gap="2" align="center">
            <Text size="lg">No products found</Text>
            <Text color="var(--text-secondary)">Try adjusting your search or category filter</Text>
          </Stack>
        </Card>
      {:else}
        <Grid cols="3" gap="6">
          {#each getFilteredProducts() as product}
            <div class="product-card" onclick={() => openProductModal(product)}>
              <Card>
                <Stack gap="3">
                  <div class="product-image">
                    <Image src={product.image} alt={product.name} width={400} height={300} />
                    {#if !product.inStock}
                      <div class="stock-badge">
                        <Badge variant="default">Out of Stock</Badge>
                      </div>
                    {/if}
                  </div>

                  <Stack gap="2">
                    <Flex justify="space-between" align="start">
                      <Heading as="h3" size="6">{product.name}</Heading>
                      <Text weight="bold" size="lg">${product.price}</Text>
                    </Flex>

                    <Flex justify="space-between" align="center">
                      <Text size="sm" color="var(--text-secondary)">{product.category}</Text>
                      <div class="rating">
                        <span>⭐</span>
                        <Text size="sm">{product.rating}</Text>
                      </div>
                    </Flex>

                    <div class="add-to-cart" onclick={(e) => e.stopPropagation()}>
                      <Button variant="primary" onclick={() => addToCart(product)} disabled={!product.inStock}>
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </Stack>
                </Stack>
              </Card>
            </div>
          {/each}
        </Grid>
      {/if}
    </Container>
  </main>

  <!-- Shopping Cart Sidebar -->
  {#if cartOpen}
    <div class="cart-overlay" onclick={() => (cartOpen = false)}></div>
    <div class="cart-sidebar">
      <Flex justify="space-between" align="center" class="cart-header">
        <Heading as="h2" size="4">Shopping Cart</Heading>
        <button class="close-button" onclick={() => (cartOpen = false)}>×</button>
      </Flex>

      {#if cart.length === 0}
        <div class="empty-cart">
          <Stack gap="3" align="center">
            <Text size="lg">Your cart is empty</Text>
            <Text color="var(--text-secondary)" align="center">Start adding products to your cart</Text>
            <Button variant="primary" onclick={() => (cartOpen = false)}>Continue Shopping</Button>
          </Stack>
        </div>
      {:else}
        <Stack gap="3">
          <div class="cart-items">
            {#each cart as item}
              <div class="cart-item-card">
                <Card variant="outlined">
                  <Flex gap="3" align="start">
                    <div class="cart-image-wrapper">
                      <Image src={item.image} alt={item.name} width={80} height={80} />
                    </div>

                    <div class="cart-item-info">
                      <Stack gap="2">
                        <Flex justify="space-between" align="start">
                          <Stack gap="1">
                            <Text weight="semibold" size="sm">{item.name}</Text>
                            <Text size="xs" color="var(--text-secondary)">${item.price.toFixed(2)} each</Text>
                          </Stack>
                          <Text weight="bold">${(item.price * item.quantity).toFixed(2)}</Text>
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <div class="quantity-controls">
                            <Button
                              variant="ghost"
                              size="sm"
                              onclick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              −
                            </Button>
                            <Text size="sm" weight="medium">{item.quantity}</Text>
                            <Button
                              variant="ghost"
                              size="sm"
                              onclick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <button
                            class="remove-btn"
                            onclick={() => removeFromCart(item.id)}
                            title="Remove item"
                            type="button"
                          >
                            <Icon html={deleteIcon} />
                          </button>
                        </Flex>
                      </Stack>
                    </div>
                  </Flex>
                </Card>
              </div>
            {/each}
          </div>

          <Card variant="outlined" class="cart-summary">
            <Stack gap="3">
              <Flex justify="space-between" align="center">
                <Text color="var(--text-secondary)">Subtotal:</Text>
                <Text>${cartSubtotal.toFixed(2)}</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text color="var(--text-secondary)">Shipping:</Text>
                <Text>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text color="var(--text-secondary)">Tax:</Text>
                <Text>${tax.toFixed(2)}</Text>
              </Flex>
              <Divider />
              <Flex justify="space-between" align="center">
                <Text weight="bold" size="lg">Total:</Text>
                <Text weight="bold" size="xl">${cartTotal.toFixed(2)}</Text>
              </Flex>
              {#if cartSubtotal < 100}
                <Badge variant="info" size="sm">
                  Add ${(100 - cartSubtotal).toFixed(2)} more for free shipping
                </Badge>
              {/if}
            </Stack>
          </Card>

          <div class="checkout-button">
            <Button variant="primary" size="lg">Checkout</Button>
          </div>
        </Stack>
      {/if}
    </div>
  {/if}

  <!-- Product Detail Modal -->
  {#if selectedProduct}
    <Modal bind:open={productModalOpen} title={selectedProduct.name} size="lg">
      <div class="product-modal-content">
        <Grid cols="2" gap="6">
          <div class="modal-image-container">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={500}
              height={400}
              class="modal-product-image"
            />
          </div>

          <Stack gap="4">
            <Stack gap="2">
              <Flex justify="space-between" align="start">
                <Heading as="h2" size="4">{selectedProduct.name}</Heading>
                <Text weight="bold" size="xl">${selectedProduct.price}</Text>
              </Flex>

              <Flex justify="space-between" align="center">
                <Badge variant="info" size="sm">{selectedProduct.category}</Badge>
                <div class="rating">
                  <span>⭐</span>
                  <Text size="lg" weight="semibold">{selectedProduct.rating}</Text>
                  <Text size="sm" color="var(--text-secondary)">(124 reviews)</Text>
                </div>
              </Flex>

              {#if !selectedProduct.inStock}
                <Badge variant="error" size="md">Out of Stock</Badge>
              {:else}
                <Badge variant="success" size="md">In Stock</Badge>
              {/if}
            </Stack>

            <Divider />

            <Stack gap="2">
              <Heading as="h3" size="6">Product Description</Heading>
              <Text color="var(--text-secondary)">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. This premium product features the latest technology and exceptional quality.
              </Text>
            </Stack>

            <Stack gap="2">
              <Text weight="semibold">Features:</Text>
              <Stack gap="2">
                {#each ['Premium Quality Materials', 'Fast Shipping', 'Easy Returns', '1 Year Warranty'] as feature}
                  <Flex gap="2" align="center">
                    <Text>✓</Text>
                    <Text size="sm" color="var(--text-secondary)">{feature}</Text>
                  </Flex>
                {/each}
              </Stack>
            </Stack>

            <Divider />

            <Flex gap="3">
              <div class="add-cart-btn">
                <Button
                  variant="primary"
                  size="lg"
                  onclick={() => {
                    if (selectedProduct) {
                      addToCart(selectedProduct)
                      closeProductModal()
                    }
                  }}
                  disabled={!selectedProduct.inStock}
                >
                  Add to Cart
                </Button>
              </div>
              <Button variant="ghost" size="lg">💔 Wishlist</Button>
            </Flex>
          </Stack>
        </Grid>
      </div>
    </Modal>
  {/if}
</div>

<style>
  .ecommerce-container {
    min-height: 100vh;
    background: var(--bg-primary);
  }

  .header {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border-bottom: 1px solid var(--glass-border);
    padding: 1.5rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .search-box {
    min-width: 300px;
  }

  .cart-button {
    position: relative;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-md);
    transition: background 0.2s ease;
  }

  .cart-button:hover {
    background: var(--glass-bg-hover);
  }

  .cart-button :global(.badge) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  .navigation {
    background: var(--bg-secondary);
    padding: 1rem 0;
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: var(--bg-tertiary);
  }

  .nav-link.active {
    color: var(--color-primary);
    background: var(--glass-bg);
  }

  .main-content {
    padding: 3rem 0;
  }

  .hero-card {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
  }

  .product-card {
    transition: transform 0.2s ease;
    cursor: pointer;
  }

  .product-card {
    cursor: pointer;
  }

  .product-card:hover {
    transform: translateY(-4px);
  }

  .product-image {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .stock-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .empty-state {
    padding: 3rem;
  }

  .category-filters {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .add-to-cart {
    width: 100%;
  }

  .cart-header {
    margin-bottom: 1.5rem;
  }

  .empty-cart {
    padding: 3rem 0;
  }

  .cart-image-wrapper {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-md);
    overflow: hidden;
    flex-shrink: 0;
    background: var(--bg-tertiary);
  }

  .cart-image-wrapper :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .cart-item-info {
    flex: 1;
  }

  .remove-btn {
    background: var(--bg-secondary);
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    min-width: 32px;
    min-height: 32px;
  }

  .remove-btn:hover {
    background: var(--bg-tertiary);
    color: var(--color-error);
    transform: scale(1.05);
  }

  .remove-btn :global(svg) {
    width: 16px;
    height: 16px;
  }

  .checkout-button {
    width: 100%;
  }

  .cart-item-card {
    margin-bottom: 0.75rem;
  }

  .cart-summary {
    background: var(--bg-tertiary);
    padding: 1.5rem;
  }

  .product-modal-content {
    padding: 1rem 0;
  }

  .modal-image-container {
    overflow: hidden;
    border-radius: var(--radius-lg);
  }

  .modal-product-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .modal-actions {
    display: flex;
    gap: 0.75rem;
  }

  .add-cart-btn {
    flex: 1;
  }

  .cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  .cart-sidebar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 420px;
    max-width: 90vw;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    padding: 2rem;
    overflow-y: auto;
    z-index: 1001;
    animation: slideIn 0.3s ease;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 2rem;
    line-height: 1;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }

  .cart-total {
    background: var(--bg-tertiary);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    .search-box {
      display: none;
    }

    .main-content {
      padding: 2rem 0;
    }

    .hero-card {
      padding: 2rem 1rem;
    }

    .cart-sidebar {
      width: 100vw;
      max-width: 100vw;
    }
  }
</style>
