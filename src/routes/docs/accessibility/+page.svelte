<script lang="ts">
	import { Container, Heading, Text, Card, Stack, Code, Alert, Button, Badge } from '$lib/ui';
</script>

<svelte:head>
	<title>Accessibility - SV Project Helper</title>
	<meta name="description" content="Learn about the accessibility features built into SV Project Helper components." />
</svelte:head>

<Container maxWidth="4xl">
	<Stack gap="8">
		<!-- Header -->
		<div class="page-header">
			<Badge variant="success">♿ Accessibility</Badge>
			<Heading as="h1" size="1">Built for Everyone</Heading>
			<Text size="xl" color="var(--text-secondary)">
				SV Project Helper is designed with accessibility as a core principle, ensuring your applications work for all users
			</Text>
		</div>

		<!-- WCAG Compliance -->
		<Card>
			<Stack gap="4">
				<Heading as="h2" size="3">WCAG 2.1 AA Compliance</Heading>
				<Text>
					All components in SV Project Helper are designed to meet or exceed WCAG 2.1 AA standards, 
					providing a solid foundation for accessible web applications.
				</Text>
				
				<Alert variant="success">
					<Text>
						<strong>Accessibility First:</strong> Every component includes proper ARIA labels, 
						keyboard navigation, focus management, and screen reader support out of the box.
					</Text>
				</Alert>
			</Stack>
		</Card>

		<!-- Keyboard Navigation -->
		<Card>
			<Stack gap="6">
				<Heading as="h2" size="3">Keyboard Navigation</Heading>
				<Text>
					All interactive components support full keyboard navigation following standard conventions:
				</Text>
				
				<div class="keyboard-table">
					<div class="keyboard-row header">
						<div>Key</div>
						<div>Action</div>
						<div>Components</div>
					</div>
					<div class="keyboard-row">
						<div><kbd>Tab</kbd></div>
						<div>Move focus to next element</div>
						<div>All interactive components</div>
					</div>
					<div class="keyboard-row">
						<div><kbd>Shift + Tab</kbd></div>
						<div>Move focus to previous element</div>
						<div>All interactive components</div>
					</div>
					<div class="keyboard-row">
						<div><kbd>Enter</kbd></div>
						<div>Activate button or link</div>
						<div>Button, Link, MenuItem</div>
					</div>
					<div class="keyboard-row">
						<div><kbd>Space</kbd></div>
						<div>Activate button or toggle</div>
						<div>Button, Checkbox, Switch</div>
					</div>
					<div class="keyboard-row">
						<div><kbd>Arrow Keys</kbd></div>
						<div>Navigate between options</div>
						<div>Menu, Tabs, Radio Group</div>
					</div>
					<div class="keyboard-row">
						<div><kbd>Escape</kbd></div>
						<div>Close modal or dropdown</div>
						<div>Modal, Dropdown, Menu</div>
					</div>
				</div>
			</Stack>
		</Card>

		<!-- Screen Reader Support -->
		<Card>
			<Stack gap="6">
				<Heading as="h2" size="3">Screen Reader Support</Heading>
				<Text>
					Components include comprehensive ARIA attributes and semantic markup for screen readers:
				</Text>
				
				<div>
					<Heading as="h3" size="4">ARIA Labels and Descriptions</Heading>
					<Code language="svelte" code={`<!-- Buttons with descriptive labels -->
<Button ariaLabel="Close dialog">
  <CloseIcon />
</Button>

<!-- Form inputs with proper labeling -->
<Input 
  label="Email Address"
  ariaDescribedBy="email-help"
  required
/>
<Text id="email-help" size="sm">
  We'll never share your email address
</Text>

<!-- Status announcements -->
<Alert variant="success" role="status">
  Form submitted successfully
</Alert>`} />
				</div>

				<div>
					<Heading as="h3" size="4">Live Regions</Heading>
					<Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
						Dynamic content changes are announced to screen readers:
					</Text>
					<Code language="svelte" code={`<!-- Toast notifications -->
<Toast role="status" ariaLive="polite">
  Settings saved successfully
</Toast>

<!-- Loading states -->
<Button loading ariaLabel="Saving changes">
  Save Changes
</Button>

<!-- Error messages -->
<div role="alert" ariaLive="assertive">
  {#if error}
    <Text color="var(--color-error)">{error}</Text>
  {/if}
</div>`} />
				</div>
			</Stack>
		</Card>

		<!-- Focus Management -->
		<Card>
			<Stack gap="6">
				<Heading as="h2" size="3">Focus Management</Heading>
				<Text>
					Proper focus management ensures keyboard users can navigate efficiently:
				</Text>
				
				<div>
					<Heading as="h3" size="4">Focus Trapping</Heading>
					<Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
						Modals and dropdowns trap focus within their boundaries:
					</Text>
					<Code language="svelte" code={`<Modal title="Settings" onClose={closeModal}>
  <!-- Focus is trapped within the modal -->
  <Input label="Name" />
  <Button onclick={save}>Save</Button>
  <Button onclick={closeModal}>Cancel</Button>
</Modal>

<!-- Custom focus trap -->
<FocusTrap active={isOpen}>
  <div class="dropdown">
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
  </div>
</FocusTrap>`} />
				</div>

				<div>
					<Heading as="h3" size="4">Focus Indicators</Heading>
					<Text color="var(--text-secondary)" style="margin: 0.5rem 0 1rem;">
						Clear visual focus indicators for keyboard navigation:
					</Text>
					<Code language="css" code={`/* Built-in focus styles */
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Custom focus ring */
:root {
  --focus-ring-width: 2px;
  --focus-ring-color: var(--color-primary);
  --focus-ring-offset: 2px;
}`} />
				</div>
			</Stack>
		</Card>

		<!-- Color and Contrast -->
		<Card>
			<Stack gap="6">
				<Heading as="h2" size="3">Color and Contrast</Heading>
				<Text>
					All color combinations meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text):
				</Text>
				
				<div class="contrast-examples">
					<div class="contrast-item">
						<div class="color-sample primary">
							<Text color="white" weight="medium">Primary on White</Text>
							<Text size="sm" color="rgba(255,255,255,0.8)">Contrast: 7.2:1 ✓</Text>
						</div>
					</div>
					<div class="contrast-item">
						<div class="color-sample success">
							<Text color="white" weight="medium">Success on White</Text>
							<Text size="sm" color="rgba(255,255,255,0.8)">Contrast: 5.1:1 ✓</Text>
						</div>
					</div>
					<div class="contrast-item">
						<div class="color-sample error">
							<Text color="white" weight="medium">Error on White</Text>
							<Text size="sm" color="rgba(255,255,255,0.8)">Contrast: 6.8:1 ✓</Text>
						</div>
					</div>
				</div>

				<Alert variant="info">
					<Text>
						<strong>Color Independence:</strong> Information is never conveyed through color alone. 
						Icons, text labels, and patterns provide additional context.
					</Text>
				</Alert>
			</Stack>
		</Card>

		<!-- Motion and Animation -->
		<Card>
			<Stack gap="6">
				<Heading as="h2" size="3">Reduced Motion Support</Heading>
				<Text>
					Respects user preferences for reduced motion to prevent vestibular disorders:
				</Text>
				
				<Code language="css" code={`/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Component animations respect this setting */
.btn {
  transition: all var(--transition-base);
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}`} />
			</Stack>
		</Card>

		<!-- Form Accessibility -->
		<Card>
			<Stack gap="6">
				<Heading as="h2" size="3">Form Accessibility</Heading>
				<Text>
					Form components include proper labeling, validation, and error handling:
				</Text>
				
				<Code language="svelte" code={`<script lang="ts">
  let email = $state('');
  let emailError = $state('');
  
  function validateEmail() {
    if (!email.includes('@')) {
      emailError = 'Please enter a valid email address';
    } else {
      emailError = '';
    }
  }
</script>

<!-- Accessible form with proper labeling -->
<form>
  <Input
    bind:value={email}
    label="Email Address"
    type="email"
    required
    error={emailError}
    ariaDescribedBy="email-help"
    onblur={validateEmail}
  />
  
  <Text id="email-help" size="sm" color="var(--text-secondary)">
    We'll use this to send you important updates
  </Text>
  
  <!-- Error is announced to screen readers -->
  {#if emailError}
    <Text role="alert" color="var(--color-error)" size="sm">
      {emailError}
    </Text>
  {/if}
  
  <Button type="submit" disabled={!!emailError}>
    Subscribe
  </Button>
</form>`} />
			</Stack>
		</Card>

		<!-- Testing Tools -->
		<Card>
			<Stack gap="6">
				<Heading as="h2" size="3">Accessibility Testing</Heading>
				<Text>
					Use these tools to test and validate accessibility in your applications:
				</Text>
				
				<div class="testing-tools">
					<div class="tool-category">
						<Heading as="h4" size="5">Browser Extensions</Heading>
						<ul>
							<li><strong>axe DevTools:</strong> Comprehensive accessibility scanner</li>
							<li><strong>WAVE:</strong> Web accessibility evaluation tool</li>
							<li><strong>Lighthouse:</strong> Built into Chrome DevTools</li>
						</ul>
					</div>
					
					<div class="tool-category">
						<Heading as="h4" size="5">Screen Readers</Heading>
						<ul>
							<li><strong>NVDA:</strong> Free screen reader for Windows</li>
							<li><strong>VoiceOver:</strong> Built into macOS and iOS</li>
							<li><strong>JAWS:</strong> Popular commercial screen reader</li>
						</ul>
					</div>
					
					<div class="tool-category">
						<Heading as="h4" size="5">Automated Testing</Heading>
						<ul>
							<li><strong>@axe-core/playwright:</strong> Automated accessibility testing</li>
							<li><strong>jest-axe:</strong> Jest integration for accessibility tests</li>
							<li><strong>Pa11y:</strong> Command line accessibility tester</li>
						</ul>
					</div>
				</div>
			</Stack>
		</Card>

		<!-- Best Practices -->
		<Card>
			<Stack gap="4">
				<Heading as="h2" size="3">Accessibility Best Practices</Heading>
				
				<Alert variant="success">
					<Stack gap="3">
						<Text weight="medium">Guidelines for Accessible Development</Text>
						<ul class="best-practices">
							<li><strong>Semantic HTML:</strong> Use proper HTML elements for their intended purpose</li>
							<li><strong>Alt text:</strong> Provide descriptive alt text for all images</li>
							<li><strong>Headings:</strong> Use heading hierarchy (h1, h2, h3) logically</li>
							<li><strong>Labels:</strong> Every form input needs a proper label</li>
							<li><strong>Focus order:</strong> Ensure logical tab order through content</li>
							<li><strong>Error handling:</strong> Provide clear, actionable error messages</li>
							<li><strong>Testing:</strong> Test with keyboard navigation and screen readers</li>
						</ul>
					</Stack>
				</Alert>
			</Stack>
		</Card>

		<!-- Resources -->
		<Card>
			<Stack gap="4">
				<Heading as="h2" size="3">Additional Resources</Heading>
				<Text>
					Learn more about web accessibility:
				</Text>
				
				<div class="resources-list">
					<a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener">
						WCAG 2.1 Quick Reference
					</a>
					<a href="https://webaim.org/" target="_blank" rel="noopener">
						WebAIM - Web Accessibility Resources
					</a>
					<a href="https://a11y-101.com/" target="_blank" rel="noopener">
						A11Y 101 - Accessibility Fundamentals
					</a>
					<a href="https://inclusive-components.design/" target="_blank" rel="noopener">
						Inclusive Components
					</a>
				</div>
			</Stack>
		</Card>

		<!-- Next Steps -->
		<Card>
			<Stack gap="4">
				<Heading as="h2" size="3">Next Steps</Heading>
				<Text>
					Ready to build accessible applications? Here's what to do next:
				</Text>
				
				<div class="next-steps">
					<Button variant="primary" href="/demos">
						Try Accessible Components
					</Button>
					<Button variant="secondary" href="/docs/theming">
						Accessible Theming
					</Button>
					<Button variant="ghost" href="/examples">
						View Examples
					</Button>
				</div>
			</Stack>
		</Card>
	</Stack>
</Container>

<style>
	.page-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.keyboard-table {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.5rem 1rem;
		background: var(--bg-secondary);
		border-radius: var(--radius-lg);
		padding: 1rem;
	}

	.keyboard-row {
		display: contents;
	}

	.keyboard-row.header {
		font-weight: 600;
		color: var(--text-primary);
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 0.5rem;
	}

	.keyboard-row > div {
		padding: 0.5rem 0;
	}

	kbd {
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: 0.25rem 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.875rem;
	}

	.contrast-examples {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 1rem 0;
	}

	.color-sample {
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		text-align: center;
	}

	.color-sample.primary {
		background: var(--color-primary);
	}

	.color-sample.success {
		background: var(--color-success);
	}

	.color-sample.error {
		background: var(--color-error);
	}

	.testing-tools {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 1rem;
	}

	.tool-category ul {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
	}

	.tool-category li {
		margin: 0.5rem 0;
		color: var(--text-secondary);
	}

	.best-practices {
		margin: 0;
		padding-left: 1.5rem;
	}

	.best-practices li {
		margin: 0.5rem 0;
		color: var(--text-secondary);
	}

	.resources-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.resources-list a {
		color: var(--color-primary);
		text-decoration: none;
		padding: 0.5rem;
		border-radius: var(--radius-md);
		transition: background 0.2s ease;
	}

	.resources-list a:hover {
		background: var(--bg-secondary);
		text-decoration: underline;
	}

	.next-steps {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	@media (max-width: 768px) {
		.keyboard-table {
			grid-template-columns: 1fr;
		}

		.keyboard-row {
			display: block;
			border-bottom: 1px solid var(--border-color);
			padding-bottom: 0.5rem;
			margin-bottom: 0.5rem;
		}

		.keyboard-row:last-child {
			border-bottom: none;
			margin-bottom: 0;
		}

		.next-steps {
			flex-direction: column;
		}
	}
</style>