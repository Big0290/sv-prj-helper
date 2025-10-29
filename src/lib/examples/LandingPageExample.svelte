<script lang="ts">
  import {
    Button,
    Card,
    Container,
    Grid,
    Stack,
    Flex,
    Heading,
    Text,
    Badge,
    Avatar,
    Icon,
    Image,
    Divider,
    Link,
    Box,
  } from '$lib/ui'

  // Features data
  const features = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`,
      title: 'Fast & Reliable',
      description: 'Lightning-fast performance with 99.9% uptime guarantee',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
      title: 'Secure by Default',
      description: 'Enterprise-grade security with end-to-end encryption',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
      title: 'Easy to Use',
      description: 'Intuitive interface that anyone can master in minutes',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`,
      title: '24/7 Support',
      description: 'Our team is always here to help you succeed',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
      title: 'Scalable',
      description: 'Grows with your business from startup to enterprise',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
      title: 'Great Communication',
      description: 'Stay connected with your team wherever they are',
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      quote:
        'This platform transformed how we manage our team. The intuitive interface and powerful features saved us countless hours.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CTO, CloudSync',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      quote: 'Best investment we made this year. The ROI was immediate and our team productivity increased by 40%.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, GrowthCo',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      quote: 'Outstanding customer support and a product that just works. Highly recommend to any growing business.',
      rating: 5,
    },
  ]

  // Stats data
  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '150+', label: 'Countries' },
    { value: '24/7', label: 'Support' },
  ]

  // Pricing tiers
  const pricingTiers = [
    {
      name: 'Starter',
      price: '$29',
      period: 'per month',
      description: 'Perfect for individuals and small teams',
      features: ['Up to 10 users', '50GB storage', 'Basic analytics', 'Email support'],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      description: 'Best for growing businesses',
      features: ['Up to 50 users', '500GB storage', 'Advanced analytics', 'Priority support', 'Custom integrations'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: ['Unlimited users', 'Unlimited storage', 'White-label solution', 'Dedicated support', 'SLA guarantee'],
      popular: false,
    },
  ]

  let email = $state('')

  function handleSubmit() {
    console.log('Newsletter signup:', email)
    alert('Thanks for signing up!')
    email = ''
  }

  const starIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
</script>

<div class="landing-page">
  <!-- Hero Section -->
  <section class="hero">
    <Container maxWidth="lg">
      <div class="hero-content">
        <Stack gap="6" align="center">
          <div class="hero-badge">
            <Badge variant="info" size="lg">✨ Trusted by over 50,000 businesses worldwide</Badge>
          </div>

          <div class="hero-title">
            <Heading as="h1" size="1" align="center">
              Build Something
              <span class="gradient-text">Amazing</span>
              with Us
            </Heading>
          </div>

          <div class="hero-description">
            <Text size="xl" align="center" color="var(--text-secondary)">
              The all-in-one platform that helps you manage your business, connect with your team, and grow faster than
              ever before.
            </Text>
          </div>

          <div class="hero-actions">
            <Flex gap="3" wrap="wrap" justify="center">
              <Button variant="primary" size="lg" onclick={() => alert('Get Started clicked!')}>
                Get Started Free
              </Button>
              <Button variant="ghost" size="lg" onclick={() => alert('View Demo clicked!')}>Watch Demo</Button>
            </Flex>
          </div>

          <div class="hero-image">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
              alt="Dashboard preview"
              width={1200}
              height={600}
              class="dashboard-preview"
            />
          </div>
        </Stack>
      </div>
    </Container>
  </section>

  <!-- Stats Section -->
  <section class="stats-section">
    <Container maxWidth="lg">
      <Grid cols="4" gap="6">
        {#each stats as stat}
          <Stack align="center" gap="1">
            <Heading as="h3" size="2" class="stat-value">{stat.value}</Heading>
            <Text color="var(--text-secondary)">{stat.label}</Text>
          </Stack>
        {/each}
      </Grid>
    </Container>
  </section>

  <!-- Features Section -->
  <section class="features-section">
    <Container maxWidth="lg">
      <Stack gap="8" align="center">
        <Stack gap="4" align="center">
          <Badge variant="success" size="md">Features</Badge>
          <Heading as="h2" size="2" align="center">Everything You Need to Succeed</Heading>
          <Text size="lg" align="center" color="var(--text-secondary)">
            Powerful features designed to help you work smarter, not harder
          </Text>
        </Stack>

        <Grid cols="3" gap="6">
          {#each features as feature}
            <Card variant="outlined" class="feature-card">
              <Stack gap="3">
                <div class="feature-icon">
                  <Icon html={feature.icon} />
                </div>
                <Heading as="h3" size="5">{feature.title}</Heading>
                <Text color="var(--text-secondary)">{feature.description}</Text>
              </Stack>
            </Card>
          {/each}
        </Grid>
      </Stack>
    </Container>
  </section>

  <!-- Pricing Section -->
  <section class="pricing-section">
    <Container maxWidth="lg">
      <Stack gap="8" align="center">
        <Stack gap="4" align="center">
          <Badge variant="warning" size="md">Pricing</Badge>
          <Heading as="h2" size="2" align="center">Choose Your Plan</Heading>
          <Text size="lg" align="center" color="var(--text-secondary)">
            Simple, transparent pricing that scales with you
          </Text>
        </Stack>

        <Grid cols="3" gap="6">
          {#each pricingTiers as tier}
            <Card class={tier.popular ? 'pricing-card popular' : 'pricing-card'}>
              {#if tier.popular}
                <div class="popular-badge">
                  <Badge variant="info" size="sm">Most Popular</Badge>
                </div>
              {/if}
              <Stack gap="4">
                <Stack gap="2">
                  <Heading as="h3" size="4">{tier.name}</Heading>
                  <div class="pricing-amount">
                    <Text size="xl" weight="bold" style="font-size: 2.5rem;">{tier.price}</Text>
                    {#if tier.period}
                      <Text size="lg" color="var(--text-secondary)">/{tier.period}</Text>
                    {/if}
                  </div>
                  <Text color="var(--text-secondary)">{tier.description}</Text>
                </Stack>

                <Divider />

                <Stack gap="2">
                  <style>
                    :global(.feature-list) {
                      flex: 1;
                    }
                  </style>
                  <div class="feature-list">
                    {#each tier.features as feature}
                      <Flex gap="2" align="center">
                        <Text color="var(--color-success)" size="lg">✓</Text>
                        <Text size="sm">{feature}</Text>
                      </Flex>
                    {/each}
                  </div>
                </Stack>

                <div style="width: 100%">
                  <Button variant={tier.popular ? 'primary' : 'ghost'} size="lg">
                    {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              </Stack>
            </Card>
          {/each}
        </Grid>
      </Stack>
    </Container>
  </section>

  <!-- Testimonials Section -->
  <section class="testimonials-section">
    <Container maxWidth="lg">
      <Stack gap="8" align="center">
        <Stack gap="4" align="center">
          <Badge variant="error" size="md">Testimonials</Badge>
          <Heading as="h2" size="2" align="center">Loved by Teams Worldwide</Heading>
          <Text size="lg" align="center" color="var(--text-secondary)">
            See what our customers have to say about us
          </Text>
        </Stack>

        <Grid cols="3" gap="6">
          {#each testimonials as testimonial}
            <Card variant="outlined" class="testimonial-card">
              <Stack gap="4">
                <div class="stars">
                  {#each Array(testimonial.rating) as _}
                    <Icon html={starIcon} />
                  {/each}
                </div>

                <Text size="base" style="font-style: italic; line-height: 1.7;">
                  "{testimonial.quote}"
                </Text>

                <Flex gap="3" align="center">
                  <Avatar src={testimonial.avatar} alt={testimonial.name} size="md" />
                  <Stack gap="1">
                    <Text weight="semibold" size="sm">{testimonial.name}</Text>
                    <Text size="xs" color="var(--text-secondary)">{testimonial.role}</Text>
                  </Stack>
                </Flex>
              </Stack>
            </Card>
          {/each}
        </Grid>
      </Stack>
    </Container>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <Container maxWidth="md">
      <Card class="cta-card">
        <Stack gap="6" align="center">
          <Stack gap="3" align="center">
            <Heading as="h2" size="2" align="center">Ready to Get Started?</Heading>
            <Text size="lg" align="center" color="var(--text-secondary)">
              Join thousands of teams already using our platform to accelerate their growth.
            </Text>
          </Stack>

          <Flex gap="2" wrap="wrap" justify="center" class="cta-form">
            <input
              type="email"
              bind:value={email}
              placeholder="Enter your email"
              class="email-input"
              onkeydown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button variant="primary" size="lg" onclick={handleSubmit}>Get Started Free</Button>
          </Flex>

          <Text size="xs" color="var(--text-secondary)" align="center">
            Free 14-day trial • No credit card required • Cancel anytime
          </Text>
        </Stack>
      </Card>
    </Container>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <Container maxWidth="lg">
      <Divider />
      <div class="footer-content">
        <Grid cols="4" gap="6">
          <Stack gap="3">
            <Heading as="h3" size="5">SV Helper</Heading>
            <Text size="sm" color="var(--text-secondary)">The all-in-one platform for modern teams</Text>
          </Stack>

          <Stack gap="2">
            <Text weight="semibold" size="sm">Product</Text>
            <Link href="#" size="sm" color="var(--text-secondary)">Features</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">Pricing</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">Security</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">Changelog</Link>
          </Stack>

          <Stack gap="2">
            <Text weight="semibold" size="sm">Company</Text>
            <Link href="#" size="sm" color="var(--text-secondary)">About</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">Blog</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">Careers</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">Contact</Link>
          </Stack>

          <Stack gap="2">
            <Text weight="semibold" size="sm">Resources</Text>
            <Link href="#" size="sm" color="var(--text-secondary)">Documentation</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">Help Center</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">API Reference</Link>
            <Link href="#" size="sm" color="var(--text-secondary)">Community</Link>
          </Stack>
        </Grid>
      </div>

      <Divider />

      <Flex justify="space-between" align="center" class="footer-bottom">
        <Text size="sm" color="var(--text-secondary)">© 2024 SV Helper. All rights reserved.</Text>
        <Flex gap="4">
          <Link href="#" size="sm" color="var(--text-secondary)">Privacy</Link>
          <Link href="#" size="sm" color="var(--text-secondary)">Terms</Link>
          <Link href="#" size="sm" color="var(--text-secondary)">Cookies</Link>
        </Flex>
      </Flex>
    </Container>
  </footer>
</div>

<style>
  .landing-page {
    min-height: 100vh;
    background: var(--bg-primary);
  }

  /* Hero Section */
  .hero {
    padding: 6rem 0 8rem;
    background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  .hero-badge {
    animation: fadeInUp 0.6s ease-out;
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    animation: fadeInUp 0.6s ease-out 0.2s both;
  }

  .gradient-text {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-info) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    max-width: 600px;
    animation: fadeInUp 0.6s ease-out 0.4s both;
  }

  .hero-actions {
    animation: fadeInUp 0.6s ease-out 0.6s both;
  }

  .hero-image {
    margin-top: 3rem;
    animation: fadeInUp 0.8s ease-out 0.8s both;
    max-width: 1200px;
    width: 100%;
  }

  .dashboard-preview {
    width: 100%;
    height: auto;
    border-radius: var(--radius-xl);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  /* Stats Section */
  .stats-section {
    padding: 4rem 0;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
  }

  .stat-value {
    font-size: clamp(2rem, 4vw, 3rem);
    background: linear-gradient(135deg, var(--color-primary), var(--color-info));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Features Section */
  .features-section {
    padding: 6rem 0;
  }

  .feature-card {
    transition: all 0.3s ease;
    cursor: pointer;
    height: 100%;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .feature-icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
    border-radius: var(--radius-lg);
    color: var(--color-primary);
  }

  /* Pricing Section */
  .pricing-section {
    padding: 6rem 0;
    background: var(--bg-secondary);
  }

  .pricing-card {
    position: relative;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .pricing-card:hover {
    transform: translateY(-4px);
  }

  .pricing-card.popular {
    border: 2px solid var(--color-primary);
  }

  .popular-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .pricing-amount {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .feature-list {
    display: contents;
  }

  /* Testimonials Section */
  .testimonials-section {
    padding: 6rem 0;
  }

  .testimonial-card {
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .stars {
    display: flex;
    gap: 0.25rem;
    color: var(--color-warning);
  }

  /* CTA Section */
  .cta-section {
    padding: 6rem 0;
    background: var(--bg-secondary);
  }

  .cta-card {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
    border: 2px solid var(--color-primary-light);
  }

  .cta-form {
    width: 100%;
    max-width: 500px;
  }

  .email-input {
    flex: 1;
    min-width: 200px;
    padding: 0.875rem 1rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: var(--font-size-base);
    transition: all 0.2s ease;
  }

  .email-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
  }

  .email-input::placeholder {
    color: var(--text-secondary);
  }

  /* Footer */
  .footer {
    padding: 4rem 0 2rem;
    background: var(--bg-primary);
  }

  .footer-content {
    margin: 3rem 0;
  }

  .footer-bottom {
    margin-top: 2rem;
    padding-top: 2rem;
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .hero {
      padding: 4rem 0 6rem;
    }

    .features-section,
    .pricing-section,
    .testimonials-section {
      padding: 4rem 0;
    }

    .cta-form {
      flex-direction: column;
    }

    .email-input {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 3rem 0 4rem;
    }

    .stats-section {
      padding: 3rem 0;
    }

    .hero-image {
      margin-top: 2rem;
    }

    .footer-content {
      grid-template-columns: 1fr !important;
      gap: 3rem;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
</style>
