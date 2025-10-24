<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link, Code, Chip 
	} from '$lib/ui';
	import { 
		useTheme, useMediaQuery, useLocalStorage, useToast, useDialog, createToastContext 
	} from '$lib/ui';
	import '../../../lib/styles/theme.css';

	// Create toast context
	const toastContext = createToastContext();

	// Hook demos
	const mediaQuery = useMediaQuery('(max-width: 768px)');
	const storage = useLocalStorage('demo-settings', { darkMode: false, notifications: true });
	const dialog = useDialog();

	let customQuery = $state('(max-width: 1024px)');
	const customMediaQuery = $derived(useMediaQuery(customQuery));

	function showSuccessToast() {
		toastContext.show({ message: 'Success! Operation completed.', type: 'success', duration: 3000 });
	}

	function showErrorToast() {
		toastContext.show({ message: 'Error! Something went wrong.', type: 'error', duration: 3000 });
	}

	function showInfoToast() {
		toastContext.show({ message: 'Info: This is an information message.', type: 'info', duration: 3000 });
	}

	function toggleDarkMode() {
		storage.value = { ...storage.value, darkMode: !storage.value.darkMode };
	}

	function toggleNotifications() {
		storage.value = { ...storage.value, notifications: !storage.value.notifications };
	}
</script>

<div class="hooks-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Hooks</Heading>
				<Text color="var(--text-secondary)">React-like hooks for Svelte 5</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- useMediaQuery Hook -->
		<section class="demo-section">
			<Heading as="h2" size="3">useMediaQuery</Heading>
			<Text>Responsive design with media query hooks - returns reactive { matches } object</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Heading as="h4" size="5" style="margin-bottom: 12px;">Current Screen Size</Heading>
						<Flex gap={12} align="center">
							{#if mediaQuery.matches}
								<Chip color="success">Mobile (≤ 768px)</Chip>
							{:else}
								<Chip color="primary">Desktop (> 768px)</Chip>
							{/if}
							<Text size="sm" color="var(--text-secondary)">
								Resize window to see changes
							</Text>
						</Flex>
					</div>

					<div>
						<Heading as="h4" size="5" style="margin-bottom: 12px;">Custom Query</Heading>
						<Flex direction="column" gap={12}>
							<input 
								type="text" 
								bind:value={customQuery} 
								placeholder="(max-width: 1024px)"
								class="query-input"
							/>
							<Flex gap={8} align="center">
								<Text size="sm">Matches:</Text>
								{#if customMediaQuery.matches}
									<Chip size="sm" color="success">True</Chip>
								{:else}
									<Chip size="sm" color="error">False</Chip>
								{/if}
							</Flex>
						</Flex>
					</div>
				</Flex>
			</Box>

			<Code language="typescript" inline={false}>{`const mobile = useMediaQuery('(max-width: 768px)');

{#if mobile.matches}
  <MobileLayout />
{:else}
  <DesktopLayout />
{/if}`}</Code>
		</section>

		<!-- useLocalStorage Hook -->
		<section class="demo-section">
			<Heading as="h2" size="3">useLocalStorage</Heading>
			<Text>Persistent state synchronized with localStorage - automatically saves and loads data</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Heading as="h4" size="5" style="margin-bottom: 12px;">Settings (Persisted)</Heading>
						<Flex direction="column" gap={12}>
							<Flex align="center" justify="space-between">
								<Text>Dark Mode</Text>
								<button onclick={toggleDarkMode} class="toggle-btn">
									{storage.value.darkMode ? 'ON' : 'OFF'}
								</button>
							</Flex>
							<Flex align="center" justify="space-between">
								<Text>Notifications</Text>
								<button onclick={toggleNotifications} class="toggle-btn">
									{storage.value.notifications ? 'ON' : 'OFF'}
								</button>
							</Flex>
						</Flex>
					</div>

					<div>
						<Text size="sm" color="var(--text-secondary)" style="padding: 12px; background: var(--bg-secondary); border-radius: 6px;">
							💡 These settings are saved in localStorage. Refresh the page to see them persist!
						</Text>
					</div>

					<div>
						<Heading as="h4" size="5" style="margin-bottom: 8px;">Current Value</Heading>
						<Code inline={false}>{JSON.stringify(storage.value, null, 2)}</Code>
					</div>
				</Flex>
			</Box>

			<Code language="typescript" inline={false}>{`const settings = useLocalStorage('app-settings', { theme: 'light' });

// Update value
settings.value = { theme: 'dark' };

// Remove from storage
settings.remove();`}</Code>
		</section>

		<!-- useToast Hook -->
		<section class="demo-section">
			<Heading as="h2" size="3">useToast / createToastContext</Heading>
			<Text>Display toast notifications with success, error, and info types - auto-dismiss with duration</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Heading as="h4" size="5" style="margin-bottom: 12px;">Show Toasts</Heading>
						<Flex gap={12} wrap="wrap">
							<button onclick={showSuccessToast} class="toast-btn success">
								Success Toast
							</button>
							<button onclick={showErrorToast} class="toast-btn error">
								Error Toast
							</button>
							<button onclick={showInfoToast} class="toast-btn info">
								Info Toast
							</button>
							<button onclick={() => toastContext.clear()} class="toast-btn secondary">
								Clear All
							</button>
						</Flex>
					</div>

					<div>
						<Heading as="h4" size="5" style="margin-bottom: 8px;">Active Toasts ({toastContext.toasts.length})</Heading>
						{#if toastContext.toasts.length > 0}
							<Flex direction="column" gap={8}>
								{#each toastContext.toasts as toast}
									<Flex align="center" justify="space-between" style="padding: 8px 12px; background: var(--bg-secondary); border-radius: 6px;">
										<Flex gap={8} align="center">
											<Chip size="sm" color={toast.type === 'success' ? 'success' : toast.type === 'error' ? 'error' : 'primary'}>
												{toast.type}
											</Chip>
											<Text size="sm">{toast.message}</Text>
										</Flex>
										<button onclick={() => toastContext.dismiss(toast.id)} class="dismiss-btn">×</button>
									</Flex>
								{/each}
							</Flex>
						{:else}
							<Text size="sm" color="var(--text-secondary)">No active toasts</Text>
						{/if}
					</div>
				</Flex>
			</Box>

			<Code language="typescript" inline={false}>{`const toast = useToast();

// Show toast
toast.show({ 
  message: 'Success!', 
  type: 'success', 
  duration: 3000 
});

// Dismiss specific toast
toast.dismiss(toastId);

// Clear all
toast.clear();`}</Code>
		</section>

		<!-- useDialog Hook -->
		<section class="demo-section">
			<Heading as="h2" size="3">useDialog</Heading>
			<Text>Simple dialog/modal state management with open(), close(), toggle() methods</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Heading as="h4" size="5" style="margin-bottom: 12px;">Dialog Controls</Heading>
						<Flex gap={12} wrap="wrap">
							<button onclick={() => dialog.open()} class="dialog-btn primary">
								Open Dialog
							</button>
							<button onclick={() => dialog.close()} class="dialog-btn secondary">
								Close Dialog
							</button>
							<button onclick={() => dialog.toggle()} class="dialog-btn">
								Toggle Dialog
							</button>
						</Flex>
					</div>

					<div>
						<Flex align="center" gap={12}>
							<Text weight="medium">Dialog State:</Text>
							{#if dialog.isOpen}
								<Chip color="success">Open</Chip>
							{:else}
								<Chip color="secondary">Closed</Chip>
							{/if}
						</Flex>
					</div>

					{#if dialog.isOpen}
						<Box padding="20px" border="2px solid var(--color-primary)" borderRadius="8px" bg="var(--bg-secondary)">
							<Flex direction="column" gap={12} align="center">
								<Heading as="h4" size="5">Dialog Content</Heading>
								<Text align="center">This dialog is controlled by useDialog hook</Text>
								<button onclick={() => dialog.close()} class="dialog-btn secondary">
									Close
								</button>
							</Flex>
						</Box>
					{/if}
				</Flex>
			</Box>

			<Code language="typescript" inline={false}>{`const dialog = useDialog();

// Open dialog
dialog.open();

// Close dialog
dialog.close();

// Toggle dialog
dialog.toggle();

// Check state
{#if dialog.isOpen}
  <Modal />
{/if}`}</Code>
		</section>

		<!-- Hook Combination Example -->
		<section class="demo-section">
			<Heading as="h2" size="3">Combined Example</Heading>
			<Text>Using multiple hooks together</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Code language="svelte" inline={false}>{`<script lang="ts">
  import { useMediaQuery, useLocalStorage, useToast, useDialog } from '$lib/ui';
  
  const mobile = useMediaQuery('(max-width: 768px)');
  const settings = useLocalStorage('settings', { theme: 'light' });
  const toast = useToast();
  const modal = useDialog();
  
  function saveSettings() {
    settings.value = { ...settings.value, lastSaved: Date.now() };
    toast.show({ message: 'Settings saved!', type: 'success' });
  }
</script>

{#if mobile.matches}
  <MobileLayout />
{:else}
  <DesktopLayout />
{/if}

<button onclick={saveSettings}>Save Settings</button>

{#if modal.isOpen}
  <Modal onClose={() => modal.close()}>
    <SettingsForm />
  </Modal>
{/if}`}</Code>
			</Box>
		</section>
	</div>
</div>

<style>
	.hooks-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(59, 130, 246, 0.1));
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

	.query-input {
		width: 100%;
		padding: 10px 14px;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: 6px;
		color: var(--text-primary);
		font-size: 14px;
		font-family: var(--font-family-mono, monospace);
	}

	.query-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.toggle-btn {
		padding: 6px 16px;
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.toggle-btn:hover {
		opacity: 0.9;
	}

	.toast-btn {
		padding: 10px 20px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.toast-btn.success {
		background: var(--color-success);
		color: white;
	}

	.toast-btn.error {
		background: var(--color-error);
		color: white;
	}

	.toast-btn.info {
		background: var(--color-primary);
		color: white;
	}

	.toast-btn.secondary {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.toast-btn:hover {
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.dismiss-btn {
		width: 24px;
		height: 24px;
		padding: 0;
		background: transparent;
		border: none;
		color: var(--text-secondary);
		font-size: 20px;
		cursor: pointer;
		transition: color 0.2s;
	}

	.dismiss-btn:hover {
		color: var(--text-primary);
	}

	.dialog-btn {
		padding: 10px 20px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.dialog-btn.primary {
		background: var(--color-primary);
		color: white;
	}

	.dialog-btn.secondary {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.dialog-btn:hover {
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	@media (max-width: 768px) {
		.page-header {
			padding: 30px 20px;
		}
	}
</style>
