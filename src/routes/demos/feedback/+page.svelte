<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link,
		Toast, Snackbar, Alert, Skeleton, Progress, Spinner, LoadingOverlay,
		EmptyState, ConfirmDialog, Button
	} from '$lib/ui';
	import '../../../lib/styles/theme.css';

	let showToast = $state(false);
	let toastVariant = $state<'success' | 'error' | 'warning' | 'info'>('success');
	let showSnackbar = $state(false);
	let showLoading = $state(false);
	let showConfirm = $state(false);
	let uploadProgress = $state(65);

	function handleToast(variant: 'success' | 'error' | 'warning' | 'info') {
		toastVariant = variant;
		showToast = true;
		setTimeout(() => showToast = false, 3000);
	}

	function handleSnackbar() {
		showSnackbar = true;
		setTimeout(() => showSnackbar = false, 3000);
	}

	function handleLoading() {
		showLoading = true;
		setTimeout(() => showLoading = false, 2000);
	}
</script>

<div class="feedback-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Feedback</Heading>
				<Text color="var(--text-secondary)">User feedback and status indicators</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Toast -->
		<section class="demo-section">
			<Heading as="h2" size="3">Toast</Heading>
			<Text>Temporary notification messages with auto-dismiss</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex gap={12} wrap="wrap">
					<Button onclick={() => handleToast('success')}>Success Toast</Button>
					<Button onclick={() => handleToast('error')} variant="danger">Error Toast</Button>
					<Button onclick={() => handleToast('warning')} variant="secondary">Warning Toast</Button>
					<Button onclick={() => handleToast('info')} variant="ghost">Info Toast</Button>
				</Flex>
			</Box>

			{#if showToast}
				<Toast 
					message={toastVariant === 'success' ? 'Action completed successfully!' : 
					         toastVariant === 'error' ? 'An error occurred!' :
					         toastVariant === 'warning' ? 'Please check your input!' :
					         'Here is some information'}
					variant={toastVariant}
					position="top-right"
					duration={3000}
					showClose={true}
					onClose={() => showToast = false}
				/>
			{/if}

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Snackbar -->
		<section class="demo-section">
			<Heading as="h2" size="3">Snackbar</Heading>
			<Text>Bottom notification with optional action button</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Button onclick={handleSnackbar}>Show Snackbar</Button>
			</Box>

			<Snackbar 
				bind:isOpen={showSnackbar}
				message="Item deleted successfully"
				variant="success"
				position="bottom"
				actionLabel="Undo"
				onAction={() => console.log('Undo clicked')}
				onClose={() => showSnackbar = false}
			/>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Alert -->
		<section class="demo-section">
			<Heading as="h2" size="3">Alert</Heading>
			<Text>Contextual notification banners with optional titles and dismissible option</Text>
			
			<Flex direction="column" gap={12}>
				<Alert variant="info">
					<strong>Info:</strong> New features are available in version 2.0!
				</Alert>
				<Alert variant="success" title="Success">
					Your changes have been saved successfully.
				</Alert>
				<Alert variant="warning" dismissible={true}>
					<strong>Warning:</strong> Your session will expire in 5 minutes.
				</Alert>
				<Alert variant="error" title="Error" dismissible={true}>
					Failed to load data. Please try again later.
				</Alert>
			</Flex>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Progress -->
		<section class="demo-section">
			<Heading as="h2" size="3">Progress</Heading>
			<Text>Progress bars for tracking operations - supports default, success, warning, error variants</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={20}>
					<div>
						<Flex justify="space-between" style="margin-bottom: 8px;">
							<Text size="sm">Default (Upload progress)</Text>
							<Text size="sm" color="var(--text-secondary)">{uploadProgress}%</Text>
						</Flex>
						<Progress value={uploadProgress} variant="default" />
					</div>

					<div>
						<Flex justify="space-between" style="margin-bottom: 8px;">
							<Text size="sm">Success (Complete)</Text>
							<Text size="sm" color="var(--text-secondary)">100%</Text>
						</Flex>
						<Progress value={100} variant="success" />
					</div>

					<div>
						<Flex justify="space-between" style="margin-bottom: 8px;">
							<Text size="sm">Warning (Low disk space)</Text>
							<Text size="sm" color="var(--text-secondary)">85%</Text>
						</Flex>
						<Progress value={85} variant="warning" />
					</div>

					<div>
						<Flex justify="space-between" style="margin-bottom: 8px;">
							<Text size="sm">Error (Upload failed)</Text>
							<Text size="sm" color="var(--text-secondary)">45%</Text>
						</Flex>
						<Progress value={45} variant="error" />
					</div>
				</Flex>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Spinner -->
		<section class="demo-section">
			<Heading as="h2" size="3">Spinner</Heading>
			<Text>Loading indicators in three sizes</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex gap={24} align="center" justify="center">
					<div style="text-align: center;">
						<Spinner size="sm" />
						<Text size="sm" style="margin-top: 8px;">Small</Text>
					</div>
					<div style="text-align: center;">
						<Spinner size="md" />
						<Text size="sm" style="margin-top: 8px;">Medium (default)</Text>
					</div>
					<div style="text-align: center;">
						<Spinner size="lg" />
						<Text size="sm" style="margin-top: 8px;">Large</Text>
					</div>
				</Flex>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					&lt;Spinner size="sm|md|lg" /&gt;
				</Text>
			</Box>
		</section>

		<!-- Loading Overlay -->
		<section class="demo-section">
			<Heading as="h2" size="3">LoadingOverlay</Heading>
			<Text>Fullscreen or local overlay with spinner, dots, or pulse animations</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Button onclick={handleLoading}>Show Loading Overlay (2s)</Button>
			</Box>

			<LoadingOverlay 
				isLoading={showLoading}
				message="Loading data..."
				variant="spinner"
				blur={true}
				fullscreen={true}
			/>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Skeleton -->
		<section class="demo-section">
			<Heading as="h2" size="3">Skeleton</Heading>
			<Text>Content placeholder while loading - shows animated shimmer effect</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Flex direction="column" gap={24}>
					<!-- User profile card skeleton -->
					<div>
						<Text size="sm" style="margin-bottom: 12px;" color="var(--text-secondary)">Profile Card Loading:</Text>
						<Flex gap={16} align="center">
							<Skeleton variant="circular" width="48px" height="48px" />
							<Flex direction="column" gap={8} style="flex: 1;">
								<Skeleton variant="text" width="60%" />
								<Skeleton variant="text" width="40%" />
							</Flex>
						</Flex>
					</div>

					<!-- Content skeleton -->
					<div>
						<Text size="sm" style="margin-bottom: 12px;" color="var(--text-secondary)">Content Loading:</Text>
						<Skeleton variant="rectangular" height="200px" />
					</div>

					<!-- Text lines skeleton -->
					<div>
						<Text size="sm" style="margin-bottom: 12px;" color="var(--text-secondary)">Text Lines:</Text>
						<Skeleton variant="text" width="100%" count={3} />
					</div>
				</Flex>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Empty State -->
		<section class="demo-section">
			<Heading as="h2" size="3">EmptyState</Heading>
			<Text>No content placeholder with optional custom icon and action button</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<EmptyState 
					title="No items found"
					description="Get started by adding your first item to see it appear here."
					compact={false}
				>
					{#snippet action()}
						<Button onclick={() => console.log('Add clicked')}>Add Item</Button>
					{/snippet}
				</EmptyState>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Confirm Dialog -->
		<section class="demo-section">
			<Heading as="h2" size="3">ConfirmDialog</Heading>
			<Text>Confirmation modal for destructive actions with danger variant</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Button variant="danger" onclick={() => showConfirm = true}>
					Delete Account
				</Button>
			</Box>

			<ConfirmDialog
				bind:open={showConfirm}
				title="Delete Account"
				message="Are you sure you want to delete your account? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				variant="danger"
				onconfirm={() => {
					console.log('Account deleted');
					showConfirm = false;
				}}
				oncancel={() => showConfirm = false}
			/>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>
	</div>
</div>

<style>
	.feedback-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.1));
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
</style>
