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
    Input,
    Textarea,
    Chip,
    Modal,
    RichTextEditor,
    Select,
  } from '$lib/ui'

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Modern Web Development',
      excerpt:
        'A comprehensive guide to building fast, scalable web applications using the latest technologies and best practices.',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face',
      },
      publishedAt: new Date(Date.now() - 2 * 24 * 3600000),
      readTime: '8 min read',
      category: 'Development',
      tags: ['Web Development', 'JavaScript', 'Svelte'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      content: `In today's fast-paced digital world, web development has evolved tremendously. Modern frameworks and tools have made it easier than ever to build powerful, scalable applications. In this comprehensive guide, we'll explore the key concepts and technologies that every developer should know.`,
      likes: 42,
      comments: 12,
    },
    {
      id: 2,
      title: 'The Art of UI/UX Design in 2024',
      excerpt:
        'Explore the latest trends and principles in user interface and user experience design that are shaping the digital landscape.',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      },
      publishedAt: new Date(Date.now() - 5 * 24 * 3600000),
      readTime: '6 min read',
      category: 'Design',
      tags: ['Design', 'UI/UX', 'Figma'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      content: `Good design is invisible. When done right, users don't notice the design - they just notice how easy it is to use. Join us as we dive into the principles of modern UI/UX design and the tools that make it possible.`,
      likes: 38,
      comments: 8,
    },
    {
      id: 3,
      title: 'Building Scalable APIs with GraphQL',
      excerpt: 'Learn how to design and implement robust API solutions that can grow with your application needs.',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
      },
      publishedAt: new Date(Date.now() - 7 * 24 * 3600000),
      readTime: '10 min read',
      category: 'Backend',
      tags: ['GraphQL', 'API', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      content: `APIs are the backbone of modern applications. In this deep dive, we'll explore GraphQL as a powerful alternative to REST APIs and how it can simplify your data fetching logic.`,
      likes: 29,
      comments: 15,
    },
  ]

  // Comments data
  const comments = [
    {
      id: 1,
      postId: 1,
      author: 'John Doe',
      avatar: 'JD',
      createdAt: new Date(Date.now() - 24 * 3600000),
      content: 'Excellent article! The examples were really helpful for understanding the concepts.',
      likes: 5,
    },
    {
      id: 2,
      postId: 1,
      author: 'Jane Smith',
      avatar: 'JS',
      createdAt: new Date(Date.now() - 12 * 3600000),
      content: 'I agree with the approach. However, I think there might be additional considerations for larger teams.',
      likes: 3,
    },
  ]

  let selectedPost = $state<(typeof blogPosts)[0] | null>(null)
  let searchQuery = $state('')
  let selectedCategory = $state('All')
  let commentText = $state('')
  let replyTo = $state<number | null>(null)

  // Modal state
  let createPostModalOpen = $state(false)
  let newPostTitle = $state('')
  let newPostExcerpt = $state('')
  let newPostContent = $state('')
  let newPostCategory = $state('Development')
  let newPostTags = $state('')
  let newPostImage = $state('')

  const categories = ['All', 'Development', 'Design', 'Backend', 'Frontend']

  function openPost(post: (typeof blogPosts)[0]) {
    selectedPost = post
  }

  function closePost() {
    selectedPost = null
  }

  function addComment() {
    if (!commentText.trim() || !selectedPost) return

    const newComment = {
      id: comments.length + 1,
      postId: selectedPost.id,
      author: 'You',
      avatar: 'U',
      createdAt: new Date(),
      content: commentText,
      likes: 0,
    }

    comments.push(newComment)
    commentText = ''
    replyTo = null
  }

  function createPost() {
    if (!newPostTitle.trim()) return

    const newPost = {
      id: blogPosts.length + 1,
      title: newPostTitle,
      excerpt: newPostExcerpt,
      author: { name: 'You', avatar: 'U' },
      publishedAt: new Date(),
      readTime: `${Math.ceil(newPostContent.length / 1000)} min read`,
      category: newPostCategory,
      tags: newPostTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      image: newPostImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
      content: newPostContent,
      likes: 0,
      comments: 0,
    }

    blogPosts.unshift(newPost)

    // Reset form
    newPostTitle = ''
    newPostExcerpt = ''
    newPostContent = ''
    newPostCategory = 'Development'
    newPostTags = ''
    newPostImage = ''
    createPostModalOpen = false

    alert('Blog post created successfully!')
  }

  function openCreateModal() {
    createPostModalOpen = true
  }

  function closeCreateModal() {
    createPostModalOpen = false
  }

  function formatDate(date: Date) {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (hours < 24) return `${hours}h ago`
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  const filteredPosts = $derived(
    blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  )

  const postComments = $derived(selectedPost ? comments.filter((c) => c.postId === selectedPost.id) : [])

  // Icons
  const heartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
  const commentIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`
  const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>`
  const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`
</script>

<div class="blog-platform">
  <!-- Header -->
  <header class="blog-header">
    <Container maxWidth="lg">
      <Flex justify="space-between" align="center">
        <div>
          <Heading as="h1" size="3">Blog Platform</Heading>
          <Text size="sm" color="var(--text-secondary)">Share knowledge, inspire others</Text>
        </div>
        <Button variant="primary" onclick={openCreateModal}>
          <Icon html={editIcon} /> Write Article
        </Button>
      </Flex>
    </Container>
  </header>

  <!-- Main Content -->
  <Container maxWidth="lg">
    <div class="blog-main">
      <!-- Sidebar -->
      <aside class="blog-sidebar">
        <Stack gap="4">
          <!-- Search -->
          <Card variant="outlined" class="search-card">
            <Stack gap="2">
              <Text weight="semibold" size="sm">Search Posts</Text>
              <Flex gap="2" align="center">
                <Icon html={searchIcon} />
                <Input bind:value={searchQuery} placeholder="Search..." type="search" />
              </Flex>
            </Stack>
          </Card>

          <!-- Categories -->
          <Card variant="outlined">
            <Stack gap="3">
              <Text weight="semibold" size="sm">Categories</Text>
              <Stack gap="2">
                {#each categories as category}
                  <button
                    class="category-btn"
                    class:active={selectedCategory === category}
                    onclick={() => (selectedCategory = category)}
                  >
                    {category}
                  </button>
                {/each}
              </Stack>
            </Stack>
          </Card>

          <!-- Popular Tags -->
          <Card variant="outlined">
            <Stack gap="3">
              <Text weight="semibold" size="sm">Popular Tags</Text>
              <Flex gap="2" wrap="wrap">
                {#each ['JavaScript', 'Svelte', 'Design', 'API', 'React', 'Node.js', 'CSS'] as tag}
                  <Chip size="sm">{tag}</Chip>
                {/each}
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </aside>

      <!-- Blog Posts -->
      <main class="blog-content">
        {#if selectedPost}
          <!-- Post Detail View -->
          <Card class="post-detail">
            <Button variant="ghost" size="sm" onclick={closePost}>← Back to posts</Button>

            <div style="margin-top: 1rem;">
              <Stack gap="4">
                <div class="post-header">
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    width={800}
                    height={400}
                    class="post-hero-image"
                  />

                  <Stack gap="3" style="margin-top: 2rem;">
                    <Flex gap="2" align="center">
                      <Badge variant="info" size="sm">{selectedPost.category}</Badge>
                      <Text size="sm" color="var(--text-secondary)">{selectedPost.readTime}</Text>
                      <Text size="sm" color="var(--text-secondary)">•</Text>
                      <Text size="sm" color="var(--text-secondary)">{formatDate(selectedPost.publishedAt)}</Text>
                    </Flex>

                    <Heading as="h1" size="2">{selectedPost.title}</Heading>

                    <Flex gap="2" align="center">
                      <Avatar src={selectedPost.author.avatar} alt={selectedPost.author.name} size="sm" />
                      <Text weight="medium">{selectedPost.author.name}</Text>
                    </Flex>
                  </Stack>
                </div>

                <Divider />

                <div class="post-content">
                  <Text style="line-height: 1.8; font-size: 1.125rem;">
                    {selectedPost.content}
                  </Text>
                </div>

                <Divider />

                <!-- Tags -->
                <div class="post-tags">
                  <Flex gap="2" wrap="wrap" align="center">
                    <Text weight="semibold" size="sm">Tags:</Text>
                    {#each selectedPost.tags as tag}
                      <Chip size="sm">{tag}</Chip>
                    {/each}
                  </Flex>
                </div>

                <!-- Actions -->
                <Flex gap="3" align="center">
                  <Button variant="ghost" size="sm">
                    <Icon html={heartIcon} />
                    {selectedPost.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon html={commentIcon} />
                    {selectedPost.comments}
                  </Button>
                </Flex>

                <Divider />

                <!-- Comments Section -->
                <div class="comments-section">
                  <Heading as="h3" size="5">Comments ({postComments.length})</Heading>

                  <!-- Comment Form -->
                  <Card variant="outlined" class="comment-form">
                    <Stack gap="3">
                      <Textarea
                        bind:value={commentText}
                        placeholder="Write a comment..."
                        rows="4"
                        class="comment-input"
                      />
                      <Flex justify="end" gap="2">
                        <Button
                          variant="ghost"
                          onclick={() => {
                            commentText = ''
                            replyTo = null
                          }}
                        >
                          Cancel
                        </Button>
                        <Button variant="primary" onclick={addComment}>Post Comment</Button>
                      </Flex>
                    </Stack>
                  </Card>

                  <!-- Comments List -->
                  <Stack gap="3" class="comments-list">
                    {#each postComments as comment}
                      <Card variant="outlined" class="comment-card">
                        <Flex gap="3" align="start">
                          <Avatar initials={comment.avatar} size="md" />
                          <div style="flex: 1;">
                            <Stack gap="2">
                              <Flex justify="space-between" align="center">
                                <Text weight="semibold" size="sm">{comment.author}</Text>
                                <Text size="xs" color="var(--text-secondary)">{formatDate(comment.createdAt)}</Text>
                              </Flex>
                              <Text size="sm">{comment.content}</Text>
                              <Button variant="ghost" size="sm" style="width: fit-content;">
                                <Icon html={heartIcon} />
                                {comment.likes}
                              </Button>
                            </Stack>
                          </div>
                        </Flex>
                      </Card>
                    {/each}
                  </Stack>
                </div>
              </Stack>
            </div></Card
          >
        {:else}
          <!-- Posts Grid -->
          <Stack gap="4">
            <Heading as="h2" size="3">
              {selectedCategory === 'All' ? 'Latest Posts' : selectedCategory + ' Posts'}
            </Heading>

            <Grid cols="1" gap="6">
              {#each filteredPosts as post}
                <Card class="post-card" onclick={() => openPost(post)}>
                  <Grid cols="3" gap="4">
                    <div class="post-image">
                      <Image src={post.image} alt={post.title} width={400} height={250} class="post-thumbnail" />
                    </div>

                    <div style="grid-column: span 2;">
                      <Stack gap="3">
                        <Flex gap="2" align="center">
                          <Badge variant="info" size="sm">{post.category}</Badge>
                          <Text size="xs" color="var(--text-secondary)">{formatDate(post.publishedAt)}</Text>
                        </Flex>

                        <Heading as="h3" size="4">{post.title}</Heading>
                        <Text color="var(--text-secondary)">{post.excerpt}</Text>

                        <Flex justify="space-between" align="center" style="margin-top: auto;">
                          <Flex gap="2" align="center">
                            <Avatar src={post.author.avatar} alt={post.author.name} size="sm" />
                            <Text size="sm">{post.author.name}</Text>
                            <Text size="xs" color="var(--text-secondary)">• {post.readTime}</Text>
                          </Flex>

                          <Flex gap="3">
                            <Button variant="ghost" size="sm" onclick={(e) => e.stopPropagation()}>
                              <Icon html={heartIcon} />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" onclick={(e) => e.stopPropagation()}>
                              <Icon html={commentIcon} />
                              {post.comments}
                            </Button>
                          </Flex>
                        </Flex>
                      </Stack>
                    </div>
                  </Grid>
                </Card>
              {/each}
            </Grid>

            {#if filteredPosts.length === 0}
              <Card>
                <Stack gap="3" align="center" style="padding: 3rem;">
                  <Heading as="h3" size="5">No posts found</Heading>
                  <Text color="var(--text-secondary)" align="center">Try adjusting your search or category filter</Text>
                </Stack>
              </Card>
            {/if}
          </Stack>
        {/if}
      </main>
    </div>
  </Container>

  <!-- Create Post Modal -->
  <Modal bind:open={createPostModalOpen} title="Create New Blog Post" size="xl" onclose={closeCreateModal}>
    <Stack gap="4">
      <div>
        <label>
          <Text weight="semibold" size="sm">Post Title</Text>
        </label>
        <Input
          bind:value={newPostTitle}
          placeholder="Enter your post title..."
          style="margin-top: 0.5rem; width: 100%;"
        />
      </div>

      <div>
        <label>
          <Text weight="semibold" size="sm">Excerpt</Text>
        </label>
        <Textarea
          bind:value={newPostExcerpt}
          placeholder="Brief description of your post..."
          rows="2"
          style="margin-top: 0.5rem; width: 100%;"
        />
      </div>

      <Grid cols="2" gap="4">
        <div>
          <label>
            <Text weight="semibold" size="sm">Category</Text>
          </label>
          <Select
            bind:value={newPostCategory}
            options={[
              { label: 'Development', value: 'Development' },
              { label: 'Design', value: 'Design' },
              { label: 'Backend', value: 'Backend' },
              { label: 'Frontend', value: 'Frontend' },
            ]}
            style="margin-top: 0.5rem; width: 100%;"
          />
        </div>

        <div>
          <label>
            <Text weight="semibold" size="sm">Featured Image URL</Text>
          </label>
          <Input
            bind:value={newPostImage}
            placeholder="https://..."
            type="url"
            style="margin-top: 0.5rem; width: 100%;"
          />
        </div>
      </Grid>

      <div>
        <label>
          <Text weight="semibold" size="sm">Tags</Text>
        </label>
        <Input
          bind:value={newPostTags}
          placeholder="JavaScript, Svelte, Web Development (comma separated)"
          style="margin-top: 0.5rem; width: 100%;"
        />
      </div>

      <div>
        <label>
          <Text weight="semibold" size="sm">Content</Text>
        </label>
        <div style="margin-top: 0.5rem;">
          <RichTextEditor
            bind:value={newPostContent}
            placeholder="Write your blog post content here..."
            minHeight="300px"
          />
        </div>
      </div>

      <Divider />

      <Flex justify="end" gap="2">
        <Button variant="ghost" onclick={closeCreateModal}>Cancel</Button>
        <Button variant="primary" onclick={createPost} disabled={!newPostTitle.trim()}>Publish Post</Button>
      </Flex>
    </Stack>
  </Modal>
</div>

<style>
  .blog-platform {
    min-height: 100vh;
    background: var(--bg-primary);
  }

  .blog-header {
    padding: 2rem 0;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border-bottom: 1px solid var(--glass-border);
    margin-bottom: 3rem;
  }

  .blog-main {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 3rem;
    padding-bottom: 4rem;
  }

  .blog-sidebar {
    position: sticky;
    top: 2rem;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .search-card :global(.flex) {
    align-items: center;
  }

  .category-btn {
    width: 100%;
    padding: 0.5rem 1rem;
    background: transparent;
    border: none;
    text-align: left;
    color: var(--text-secondary);
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .category-btn:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  .category-btn.active {
    background: var(--color-primary);
    color: white;
  }

  .post-card {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .post-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .post-image {
    width: 100%;
    height: 100%;
    min-height: 250px;
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .post-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .post-detail {
    padding: 2rem;
  }

  .post-hero-image {
    width: 100%;
    border-radius: var(--radius-lg);
    margin-top: 1rem;
  }

  .post-content {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--text-primary);
  }

  .post-tags {
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
  }

  .comments-section {
    padding-top: 2rem;
  }

  .comment-form {
    margin: 1.5rem 0;
    padding: 1.5rem;
  }

  .comment-input {
    width: 100%;
    padding: 0.875rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: inherit;
    resize: vertical;
  }

  .comment-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
  }

  .comments-list {
    margin-top: 1.5rem;
  }

  .comment-card {
    padding: 1rem;
    transition: all 0.2s ease;
  }

  .comment-card:hover {
    background: var(--bg-secondary);
  }

  @media (max-width: 1024px) {
    .blog-main {
      grid-template-columns: 1fr;
    }

    .blog-sidebar {
      position: static;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .post-card :global(.grid) {
      grid-template-columns: 1fr !important;
    }

    .post-image {
      min-height: 200px;
    }

    .blog-header {
      padding: 1.5rem 0;
    }

    .post-detail {
      padding: 1.5rem;
    }
  }
</style>
