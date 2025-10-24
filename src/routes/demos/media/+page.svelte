<script lang="ts">
	import { 
		Heading, Text, Box, Flex, Link, Image,
		Webcam, Video, Audio, ImageCropper, ImageGallery, BarcodeScanner, BarcodeDisplay, VoiceRecorder
	} from '$lib/ui';
	import '../../../lib/styles/theme.css';

	const galleryImages = [
		{ src: 'https://picsum.photos/600/400?random=1', alt: 'Gallery 1' },
		{ src: 'https://picsum.photos/600/400?random=2', alt: 'Gallery 2' },
		{ src: 'https://picsum.photos/600/400?random=3', alt: 'Gallery 3' },
		{ src: 'https://picsum.photos/600/400?random=4', alt: 'Gallery 4' }
	];
</script>

<div class="media-demo">
	<header class="page-header">
		<Flex justify="space-between" align="center" style="max-width: 1400px; margin: 0 auto; padding: 0 20px;">
			<div>
				<Heading as="h1">Media</Heading>
				<Text color="var(--text-secondary)">Audio, video, and image components</Text>
			</div>
			<Link href="/demos">← Back to Demos</Link>
		</Flex>
	</header>

	<div class="demo-container">
		<!-- Webcam -->
		<section class="demo-section">
			<Heading as="h2" size="3">Webcam</Heading>
			<Text>Camera capture with photo and video recording capabilities</Text>
			
			<Box 
				padding="0" 
				bg="var(--glass-bg)" 
				borderRadius="8px" 
				style="overflow: hidden;"
			>
				<Webcam variant="both" />
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Video Player -->
		<section class="demo-section">
			<Heading as="h2" size="3">Video</Heading>
			<Text>Custom video player with controls, autoplay, and poster image support</Text>
			
			<Box 
				padding="0" 
				bg="var(--glass-bg)" 
				borderRadius="8px" 
				style="overflow: hidden;"
			>
				<Video 
					src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
					poster="https://picsum.photos/800/450?random=5"
				/>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Audio Player -->
		<section class="demo-section">
			<Heading as="h2" size="3">Audio</Heading>
			<Text>Audio playback with custom controls and waveform visualization</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<Audio 
					src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
					title="Sample Audio Track"
				/>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Voice Recorder -->
		<section class="demo-section">
			<Heading as="h2" size="3">VoiceRecorder</Heading>
			<Text>Record audio from microphone with playback and download options</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<VoiceRecorder />
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Image Gallery -->
		<section class="demo-section">
			<Heading as="h2" size="3">ImageGallery</Heading>
			<Text>Photo gallery with lightbox viewer and grid layout</Text>
			
			<ImageGallery images={galleryImages} />

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Image Component -->
		<section class="demo-section">
			<Heading as="h2" size="3">Image</Heading>
			<Text>Optimized image display with lazy loading and placeholder states</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Image 
						src="https://picsum.photos/400/300?random=6" 
						alt="Sample image"
						width="100%"
						height="auto"
					/>
					<Text size="sm" color="var(--text-secondary)" style="margin-top: 8px; text-align: center;">Standard loading</Text>
				</Box>
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
					<Image 
						src="https://picsum.photos/400/300?random=7" 
						alt="Sample image"
						width="100%"
						height="auto"
						borderRadius="8px"
					/>
					<Text size="sm" color="var(--text-secondary)" style="margin-top: 8px; text-align: center;">With border radius</Text>
				</Box>
			</div>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>

		<!-- Image Cropper -->
		<section class="demo-section">
			<Heading as="h2" size="3">ImageCropper</Heading>
			<Text>Interactive image cropper with zoom and rotation controls</Text>
			
			<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px">
				<ImageCropper 
					src="https://picsum.photos/800/600?random=8"
					onCrop={(croppedImage) => console.log('Cropped:', croppedImage)}
				/>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Barcode Scanner -->
		<section class="demo-section">
			<Heading as="h2" size="3">BarcodeScanner</Heading>
			<Text>Scan QR codes and barcodes using device camera with real-time detection</Text>
			
			<Box 
				padding="0" 
				bg="var(--glass-bg)" 
				borderRadius="8px" 
				style="overflow: hidden;"
			>
				<BarcodeScanner 
					onScan={(result) => console.log('Scanned:', result)}
				/>
			</Box>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
				</Text>
			</Box>
		</section>

		<!-- Barcode Display -->
		<section class="demo-section">
			<Heading as="h2" size="3">BarcodeDisplay</Heading>
			<Text>Generate and display QR codes and barcodes in various formats</Text>
			
			<div class="demo-grid">
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px" style="text-align: center;">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">QR Code</Heading>
					<BarcodeDisplay 
						value="https://example.com"
						format="qr"
						size={200}
					/>
					<Text size="sm" color="var(--text-secondary)" style="margin-top: 12px;">https://example.com</Text>
				</Box>
				<Box padding="24px" bg="var(--glass-bg)" borderRadius="8px" style="text-align: center;">
					<Heading as="h4" size="5" style="margin-bottom: 16px;">Barcode</Heading>
					<BarcodeDisplay 
						value="1234567890"
						format="code128"
						size={200}
					/>
					<Text size="sm" color="var(--text-secondary)" style="margin-top: 12px;">1234567890</Text>
				</Box>
			</div>

			<Box padding="16px" bg="var(--glass-bg)" borderRadius="8px" style="margin-top: 16px;">
				<Text size="sm" color="var(--text-secondary)" style="font-family: monospace;">
					[Code example - see component docs]
				</Text>
			</Box>
		</section>
	</div>
</div>

<style>
	.media-demo {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.page-header {
		padding: 40px 20px;
		background: linear-gradient(135deg, rgba(217, 70, 239, 0.1), rgba(168, 85, 247, 0.1));
		border-bottom: 1px solid var(--border-color);
		margin-bottom: 40px;
	}

	.demo-container {
		max-width: 1400px;
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

	@media (max-width: 768px) {
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
