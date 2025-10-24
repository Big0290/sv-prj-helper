<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link, Code,
		Input, Textarea, Select, MultiSelect, Checkbox, Radio, Switch, Slider,
		DatePicker, DateRangePicker, ColorPicker, OTPInput, TagInput, SearchField,
		RichTextEditor, MarkdownEditor, CodeEditor, CodeBlock
	} from '$lib/ui';
	import { LiveCodePreview, Button } from '$lib/ui';
import '../../../lib/styles/theme.css';

	// State
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let country = $state('');
	let languages = $state<string[]>([]);
	let newsletter = $state(false);
	let notifications = $state(true);
	let plan = $state('free');
	let volume = $state(50);
	let startDate = $state('');
	let dateRange = $state({ start: '', end: '' });
	let color = $state('#3b82f6');
	let otp = $state('');
	let tags = $state<string[]>(['svelte', 'typescript']);
	let searchQuery = $state('');
	let richText = $state('');
	let markdown = $state('# Hello Markdown\n\nWrite your **markdown** here...');
	let jsCode = $state(`function greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));`);
	let pythonCode = $state(`def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`);
	let selectedLanguage = $state<'javascript' | 'python' | 'html' | 'css'>('javascript');

	const countryOptions = [
		{ value: 'us', label: 'United States' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'ca', label: 'Canada' }
	];

	const languageOptions = [
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Spanish' },
		{ value: 'fr', label: 'French' },
		{ value: 'de', label: 'German' }
	];

	function handleSubmit() {
		console.log('Form submitted:', {
			name, email, message, country, languages, newsletter, 
			notifications, plan, volume, startDate, dateRange, color, otp, tags
		});
	}
</script>

<div class="forms-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Forms</Heading>
				<Text color="var(--text-secondary)">Form controls and inputs</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Text Inputs -->
		<section class="demo-section">
			<Heading as="h2" size="3">Text Inputs</Heading>
			<Text>Basic text input fields</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={16}>
					<div>
						<label for="name"><Text weight="medium">Name</Text></label>
						<Input 
							id="name"
							bind:value={name} 
							placeholder="Enter your name"
						/>
					</div>
					<div>
						<label for="email"><Text weight="medium">Email</Text></label>
						<Input 
							id="email"
							type="email"
							bind:value={email} 
							placeholder="your@email.com"
						/>
					</div>
					<div>
						<label for="search"><Text weight="medium">Search</Text></label>
						<SearchField 
							bind:value={searchQuery}
							placeholder="Search..."
						/>
					</div>
				</Flex>
			</Box>
		</section>

		<!-- Textarea -->
		<section class="demo-section">
			<Heading as="h2" size="3">Textarea</Heading>
			<Text>Multi-line text input</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<label for="message"><Text weight="medium">Message</Text></label>
				<Textarea 
					id="message"
					bind:value={message}
					placeholder="Enter your message..."
					rows={5}
				/>
			</Box>
		</section>

		<!-- Select & MultiSelect -->
		<section class="demo-section">
			<Heading as="h2" size="3">Select</Heading>
			<Text>Dropdown selection inputs</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<label><Text weight="medium">Country</Text></label>
					<Select 
						bind:value={country}
						options={countryOptions}
						placeholder="Select country"
					/>
					<Text size="sm" color="var(--text-secondary)" style="margin-top: 8px;">
						Selected: {country || 'None'}
					</Text>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<label><Text weight="medium">Languages</Text></label>
					<MultiSelect 
						bind:value={languages}
						options={languageOptions}
						placeholder="Select languages"
					/>
					<Text size="sm" color="var(--text-secondary)" style="margin-top: 8px;">
						Selected: {languages.join(', ') || 'None'}
					</Text>
				</Box>
			</div>
		</section>

		<!-- Checkboxes & Radio -->
		<section class="demo-section">
			<Heading as="h2" size="3">Checkbox & Radio</Heading>
			<Text>Selection controls</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Text weight="medium" style="margin-bottom: 12px;">Preferences</Text>
					<Flex direction="column" gap={12}>
						<Checkbox bind:checked={newsletter} label="Subscribe to newsletter" />
						<Checkbox bind:checked={notifications} label="Enable notifications" />
					</Flex>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Text weight="medium" style="margin-bottom: 12px;">Plan</Text>
					<Flex direction="column" gap={12}>
						<Radio bind:group={plan} value="free" label="Free" />
						<Radio bind:group={plan} value="pro" label="Pro" />
						<Radio bind:group={plan} value="enterprise" label="Enterprise" />
					</Flex>
				</Box>
			</div>
		</section>

		<!-- Switch & Slider -->
		<section class="demo-section">
			<Heading as="h2" size="3">Switch & Slider</Heading>
			<Text>Toggle and range controls</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Text weight="medium" style="margin-bottom: 12px;">Toggle</Text>
					<Flex direction="column" gap={12}>
						<Switch bind:checked={notifications} label="Push notifications" />
						<Switch bind:checked={newsletter} label="Email updates" />
					</Flex>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Text weight="medium" style="margin-bottom: 12px;">Volume: {volume}%</Text>
					<Slider bind:value={volume} min={0} max={100} />
				</Box>
			</div>
		</section>

		<!-- Date Pickers -->
		<section class="demo-section">
			<Heading as="h2" size="3">Date Pickers</Heading>
			<Text>Date and range selection</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<label><Text weight="medium">Start Date</Text></label>
					<DatePicker bind:value={startDate} />
					<Text size="sm" color="var(--text-secondary)" style="margin-top: 8px;">
						Selected: {startDate || 'None'}
					</Text>
				</Box>

				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<label><Text weight="medium">Date Range</Text></label>
					<DateRangePicker bind:value={dateRange} />
					<Text size="sm" color="var(--text-secondary)" style="margin-top: 8px;">
						Range: {dateRange.start && dateRange.end ? `${dateRange.start} - ${dateRange.end}` : 'None'}
					</Text>
				</Box>
			</div>
		</section>

		<!-- Color Picker -->
		<section class="demo-section">
			<Heading as="h2" size="3">ColorPicker</Heading>
			<Text>Color selection input</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<label><Text weight="medium">Theme Color</Text></label>
				<Flex gap={16} align="center">
					<ColorPicker bind:value={color} />
					<Text>Selected: {color}</Text>
				</Flex>
			</Box>
		</section>

		<!-- OTP Input -->
		<section class="demo-section">
			<Heading as="h2" size="3">OTP Input</Heading>
			<Text>One-time password input</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<label><Text weight="medium">Enter verification code</Text></label>
				<OTPInput bind:value={otp} length={6} />
				<Text size="sm" color="var(--text-secondary)" style="margin-top: 8px;">
					Code: {otp}
				</Text>
			</Box>
		</section>

		<!-- Tag Input -->
		<section class="demo-section">
			<Heading as="h2" size="3">TagInput</Heading>
			<Text>Multiple tag entry</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<label><Text weight="medium">Skills</Text></label>
				<TagInput bind:tags={tags} placeholder="Add a skill..." />
			</Box>
		</section>

		<!-- Rich Text Editor -->
		<section class="demo-section">
			<Heading as="h2" size="3">RichTextEditor</Heading>
			<Text>WYSIWYG text editor with formatting toolbar</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<RichTextEditor bind:value={richText} />
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Markdown Editor -->
		<section class="demo-section">
			<Heading as="h2" size="3">MarkdownEditor</Heading>
			<Text>Markdown editor with live preview - supports side-by-side and tab modes</Text>
			
			<Flex direction="column" gap={16}>
				<Box padding="0" bg="var(--glass-bg)" borderRadius="8px" style="overflow: hidden;">
					<MarkdownEditor 
						bind:value={markdown} 
						showPreview={true}
						previewMode="side"
						minHeight="400px"
					/>
				</Box>

				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px">
					<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
						[Code example - see component docs]
					</Text>
				</Box>

				<Box padding="16px" bg="rgba(59, 130, 246, 0.1)" borderRadius="8px">
					<Text size="sm" weight="medium" style="margin-bottom: 8px;">Features:</Text>
					<Text size="sm" color="var(--text-secondary)">
						• Markdown toolbar with common formatting options<br />
						• Live preview (side-by-side or tabs)<br />
						• GFM (GitHub Flavored Markdown) support<br />
						• Code blocks, tables, task lists, and more<br />
						• Keyboard shortcuts and text selection wrapping
					</Text>
				</Box>
			</Flex>
		</section>

		<!-- Code Editor -->
		<section class="demo-section">
			<Heading as="h2" size="3">CodeEditor</Heading>
			<Text>Professional code editor with syntax highlighting powered by CodeMirror 6</Text>
			
			<Flex direction="column" gap={16}>
				<!-- Language Selector -->
				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px">
					<Flex gap={12} align="center" wrap="wrap">
						<Text weight="medium">Language:</Text>
						<Flex gap={8}>
							<Button 
								size="sm" 
								variant={selectedLanguage === 'javascript' ? 'primary' : 'ghost'}
								onclick={() => selectedLanguage = 'javascript'}
							>
								JavaScript
							</Button>
							<Button 
								size="sm" 
								variant={selectedLanguage === 'python' ? 'primary' : 'ghost'}
								onclick={() => selectedLanguage = 'python'}
							>
								Python
							</Button>
							<Button 
								size="sm" 
								variant={selectedLanguage === 'html' ? 'primary' : 'ghost'}
								onclick={() => selectedLanguage = 'html'}
							>
								HTML
							</Button>
							<Button 
								size="sm" 
								variant={selectedLanguage === 'css' ? 'primary' : 'ghost'}
								onclick={() => selectedLanguage = 'css'}
							>
								CSS
							</Button>
						</Flex>
					</Flex>
				</Box>

				<!-- JavaScript Editor -->
				{#if selectedLanguage === 'javascript'}
					<Box padding="0" bg="var(--glass-bg)" borderRadius="8px" style="overflow: hidden;">
						<CodeEditor 
							bind:value={jsCode}
							language="javascript"
							theme="dark"
							lineNumbers={true}
							minHeight="400px"
						/>
					</Box>
				{:else if selectedLanguage === 'python'}
					<Box padding="0" bg="var(--glass-bg)" borderRadius="8px" style="overflow: hidden;">
						<CodeEditor 
							bind:value={pythonCode}
							language="python"
							theme="dark"
							lineNumbers={true}
							minHeight="400px"
						/>
					</Box>
				{:else if selectedLanguage === 'html'}
					<Box padding="0" bg="var(--glass-bg)" borderRadius="8px" style="overflow: hidden;">
						<CodeEditor 
							value={'<div class="container">\n  <h1>Hello World</h1>\n  <p>This is HTML</p>\n</div>'}
							language="html"
							theme="dark"
							lineNumbers={true}
							minHeight="400px"
						/>
					</Box>
				{:else}
					<Box padding="0" bg="var(--glass-bg)" borderRadius="8px" style="overflow: hidden;">
						<CodeEditor 
							value={'.container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}'}
							language="css"
							theme="dark"
							lineNumbers={true}
							minHeight="400px"
						/>
					</Box>
				{/if}

				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px">
					<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
						[Code example - see component docs]
					</Text>
				</Box>

				<Box padding="16px" bg="rgba(139, 92, 246, 0.1)" borderRadius="8px">
					<Text size="sm" weight="medium" style="margin-bottom: 8px;">Features:</Text>
					<Text size="sm" color="var(--text-secondary)">
						• Powered by CodeMirror 6 - industry-standard editor<br />
						• Syntax highlighting for JavaScript, Python, HTML, CSS, JSON, Markdown<br />
						• Autocomplete and bracket matching<br />
						• Search and replace (Ctrl+F)<br />
						• Multiple selections and cursors<br />
						• Code folding and line numbers<br />
						• Undo/redo history<br />
						• Tab key indentation<br />
						• Light and dark themes
					</Text>
				</Box>
			</Flex>
		</section>

		<!-- Code Block (Read-only Display) -->
		<section class="demo-section">
			<Heading as="h2" size="3">CodeBlock</Heading>
			<Text>Read-only code display with syntax highlighting and copy button</Text>
			
			<Flex direction="column" gap={16}>
				<CodeBlock 
					code={`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log('Fibonacci(10):', result);`}
					language="javascript"
					theme="dark"
					showLineNumbers={true}
					title="fibonacci.js"
					copyable={true}
					maxHeight="400px"
				/>

				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px">
					<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
						[Code example - see component docs]
					</Text>
				</Box>

				<Box padding="16px" bg="rgba(34, 197, 94, 0.1)" borderRadius="8px">
					<Text size="sm" weight="medium" style="margin-bottom: 8px;">Use Cases:</Text>
					<Text size="sm" color="var(--text-secondary)">
						• Documentation and tutorials<br />
						• Code snippets display<br />
						• Blog posts and articles<br />
						• Static code examples<br />
						• One-click copy for users
					</Text>
				</Box>
			</Flex>
		</section>

		<!-- Live Code Preview -->
		<section class="demo-section">
			<Heading as="h2" size="3">LiveCodePreview</Heading>
			<Text>Interactive code playground with live HTML/CSS/JS preview and console</Text>
			
			<Flex direction="column" gap={16}>
				<LiveCodePreview 
					initialHtml={'<div class="card">\n  <h2>Live Preview</h2>\n  <p>Edit the code to see changes instantly!</p>\n  <button id="btn">Click Me</button>\n</div>'}
					initialCss={'.card {\n  max-width: 400px;\n  padding: 24px;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.3);\n}\n\n.card h2 {\n  margin-bottom: 12px;\n  font-size: 24px;\n}\n\n.card button {\n  margin-top: 16px;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  background: white;\n  color: #667eea;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n\n.card button:hover {\n  transform: scale(1.05);\n}'}
					initialJs={`const btn = document.getElementById('btn');
let clicks = 0;

btn.addEventListener('click', () => {
  clicks++;
  console.log('Button clicked ' + clicks + ' times!');
  btn.textContent = 'Clicked ' + clicks + ' times';
});`}
					layout="horizontal"
					autoRun={true}
					minHeight="600px"
				/>

				<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px">
					<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
						[Code example - see component docs]
					</Text>
				</Box>

				<Box padding="16px" bg="rgba(245, 158, 11, 0.1)" borderRadius="8px">
					<Text size="sm" weight="medium" style="margin-bottom: 8px;">Features:</Text>
					<Text size="sm" color="var(--text-secondary)">
						• Three-tab editor (HTML, CSS, JavaScript)<br />
						• Live preview with instant updates<br />
						• Integrated console for debugging<br />
						• Toggle preview visibility<br />
						• Horizontal or vertical layout<br />
						• Auto-run or manual execution<br />
						• Perfect for code tutorials and playgrounds
					</Text>
				</Box>
			</Flex>
		</section>

		<!-- Complete Form Example -->
		<section class="demo-section">
			<Heading as="h2" size="3">Complete Form</Heading>
			<Text>All form elements together</Text>
			
			<Box padding="32px" bg="var(--glass-bg)" borderRadius="8px">
				<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
					<Flex direction="column" gap={24}>
						<Heading as="h3" size="4">Contact Information</Heading>
						
						<div>
							<label for="form-name"><Text weight="medium">Full Name</Text></label>
							<Input 
								id="form-name"
								bind:value={name}
								placeholder="John Doe"
								required
							/>
						</div>

						<div>
							<label for="form-email"><Text weight="medium">Email</Text></label>
							<Input 
								id="form-email"
								type="email"
								bind:value={email}
								placeholder="john@example.com"
								required
							/>
						</div>

						<div>
							<label for="form-country"><Text weight="medium">Country</Text></label>
							<Select 
								id="form-country"
								bind:value={country}
								options={countryOptions}
								placeholder="Select your country"
							/>
						</div>

						<div>
							<label for="form-message"><Text weight="medium">Message</Text></label>
							<Textarea 
								id="form-message"
								bind:value={message}
								placeholder="Your message..."
								rows={4}
							/>
						</div>

						<div>
							<Checkbox bind:checked={newsletter} label="Subscribe to our newsletter" />
						</div>

						<Flex gap={12} justify="end">
							<Button type="button" variant="ghost">Cancel</Button>
							<Button type="submit" variant="primary">Submit</Button>
						</Flex>
					</Flex>
				</form>
			</Box>
		</section>
	</div>
</div>

<style>
	.forms-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
		border-bottom: 1px solid var(--border-color);
		margin-bottom: 40px;
	}

	.demo-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px 80px;
	}

	.demo-section {
		margin-bottom: 60px;
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		margin: 24px 0;
	}

	label {
		display: block;
		margin-bottom: 8px;
	}

	@media (max-width: 768px) {
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
