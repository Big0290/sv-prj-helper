<script lang="ts">
  import {
    Heading,
    Text,
    Container,
    Stack,
    Card,
    Link,
    Badge,
    Grid,
  } from "$lib/ui";
  import "../../lib/styles/theme.css";

  const examples = [
    {
      title: "Dashboard Template",
      description:
        "Complete admin dashboard with sidebar navigation, data tables, and charts",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["Dashboard", "Admin", "Charts"],
      href: "/examples/dashboard",
      difficulty: "Intermediate",
    },
    {
      title: "E-commerce Store",
      description:
        "Product catalog, shopping cart, and checkout flow with payment integration",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      tags: ["E-commerce", "Shopping", "Payments"],
      href: "/examples/ecommerce",
      difficulty: "Advanced",
    },
    {
      title: "Chat Application",
      description:
        "Real-time messaging app with rooms, file sharing, and voice messages",
      image:
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=250&fit=crop",
      tags: ["Chat", "Real-time", "WebSocket"],
      href: "/examples/chat",
      difficulty: "Intermediate",
    },
    {
      title: "Landing Page",
      description:
        "Modern marketing website with hero section, features, and testimonials",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      tags: ["Marketing", "Landing", "Hero"],
      href: "/examples/landing",
      difficulty: "Beginner",
    },
    {
      title: "Blog Platform",
      description:
        "Content management system with rich text editor and comment system",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
      tags: ["Blog", "CMS", "Editor"],
      href: "/examples/blog",
      difficulty: "Intermediate",
    },
    {
      title: "Project Management",
      description:
        "Kanban board with drag-and-drop, task management, and team collaboration",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      tags: ["Kanban", "Tasks", "Collaboration"],
      href: "/examples/project-management",
      difficulty: "Advanced",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "error";
      default:
        return "default";
    }
  };
</script>

<svelte:head>
  <title>Examples - SV Project Helper</title>
</svelte:head>

<Container maxWidth="xl">
  <div class="examples-page">
    <header class="examples-header">
      <Stack gap="4" align="center">
        <Heading as="h1" size="1">Examples</Heading>
        <Text size="xl" color="var(--text-secondary)" align="center">
          Real-world applications built with SV Project Helper components
        </Text>
        <Text color="var(--text-secondary)" align="center">
          Explore complete examples to see how components work together in
          production applications
        </Text>
      </Stack>
    </header>

    <section class="examples-grid">
      <Grid cols="3" gap="6">
        {#each examples as example}
          <Card class="example-card">
            <div class="example-image">
              <img src={example.image} alt={example.title} />
              <div class="example-overlay">
                <a href={example.href} class="example-button"> View Example </a>
              </div>
            </div>

            <div class="example-content">
              <Stack gap="3">
                <div class="example-header">
                  <Heading as="h3" size="5">{example.title}</Heading>
                  <Badge
                    variant={getDifficultyColor(example.difficulty)}
                    size="sm"
                  >
                    {example.difficulty}
                  </Badge>
                </div>

                <Text color="var(--text-secondary)" size="sm">
                  {example.description}
                </Text>

                <div class="example-tags">
                  {#each example.tags as tag}
                    <Badge variant="default" size="sm">{tag}</Badge>
                  {/each}
                </div>

                <div class="example-actions">
                  <Link href={example.href}>View Example →</Link>
                  <Link href="{example.href}/code">View Code</Link>
                </div>
              </Stack>
            </div>
          </Card>
        {/each}
      </Grid>
    </section>

    <section class="cta-section">
      <Card class="cta-card">
        <Stack gap="4" align="center">
          <Heading as="h2" size="3">Want to Contribute an Example?</Heading>
          <Text align="center" color="var(--text-secondary)">
            Have you built something amazing with SV Project Helper? Share it
            with the community!
          </Text>
          <Stack direction="row" gap="3" wrap justify="center">
            <a
              href="https://github.com/yourusername/sv-project-helper/discussions"
              class="cta-button primary"
            >
              Share Your Example
            </a>
            <a href="/docs/contributing" class="cta-button secondary">
              Contributing Guide
            </a>
          </Stack>
        </Stack>
      </Card>
    </section>
  </div>
</Container>

<style>
  .examples-page {
    padding: 2rem 0 4rem;
  }

  .examples-header {
    text-align: center;
    padding: 2rem 0 4rem;
  }

  .examples-grid {
    margin-bottom: 4rem;
  }

  :global(.example-card) {
    height: 100%;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  :global(.example-card:hover) {
    transform: translateY(-4px);
  }

  .example-image {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
  }

  .example-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  :global(.example-card:hover) .example-image img {
    transform: scale(1.05);
  }

  .example-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  :global(.example-card:hover) .example-overlay {
    opacity: 1;
  }

  .example-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    background: var(--color-primary);
    color: white;
    text-decoration: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .example-button:hover {
    background: var(--color-primary-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  }

  .example-content {
    padding: 1.5rem;
  }

  .example-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .example-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .example-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
  }

  .cta-section {
    margin-top: 4rem;
  }

  :global(.cta-card) {
    text-align: center;
    padding: 3rem 2rem;
    background: linear-gradient(
      135deg,
      rgba(168, 85, 247, 0.05),
      rgba(59, 130, 246, 0.05)
    );
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .cta-button.primary {
    background: var(--color-primary);
    color: white;
  }

  .cta-button.primary:hover {
    background: var(--color-primary-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  }

  .cta-button.secondary {
    background: var(--glass-bg);
    color: var(--text-primary);
    border: 1px solid var(--glass-border);
  }

  .cta-button.secondary:hover {
    background: var(--glass-bg-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    .examples-page {
      padding: 1rem 0 2rem;
    }

    .examples-header {
      padding: 1rem 0 2rem;
    }

    .examples-grid :global(.grid) {
      grid-template-columns: 1fr;
    }

    :global(.cta-card) {
      padding: 2rem 1rem;
    }

    .example-actions {
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    .examples-grid :global(.grid) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
