<script lang="ts">
	interface Props {
		onCapture?: (blob: Blob) => void;
		onRecordingComplete?: (blob: Blob) => void;
		height?: string;
		width?: string;
		facingMode?: 'user' | 'environment';
		mirrored?: boolean;
		variant?: 'photo' | 'video' | 'both';
		showControls?: boolean;
	}

	let {
		onCapture,
		onRecordingComplete,
		height = '400px',
		width = '100%',
		facingMode = 'user',
		mirrored = true,
		variant = 'photo',
		showControls = true
	}: Props = $props();

	let videoEl = $state<HTMLVideoElement>();
	let canvasEl = $state<HTMLCanvasElement>();
	let stream: MediaStream | null = $state(null);
	let isActive = $state(false);
	let isRecording = $state(false);
	let mediaRecorder: MediaRecorder | null = null;
	let recordedChunks: Blob[] = [];
	let recordingTime = $state(0);
	let recordingInterval: number | null = null;
	let error = $state<string | null>(null);

	async function startCamera() {
		try {
			error = null;
			const constraints = {
				video: { 
					facingMode,
					width: { ideal: 1280 },
					height: { ideal: 720 }
				},
				audio: variant === 'video' || variant === 'both'
			};
			console.log('Requesting camera with constraints:', constraints);
			const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
			console.log('Camera stream obtained:', mediaStream.getTracks());
			stream = mediaStream;
			isActive = true;
		} catch (err) {
			error = 'Failed to access camera. Please grant permission.';
			console.error('Camera error:', err);
		}
	}

	function stopCamera() {
		if (isRecording) {
			stopRecording();
		}
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
			stream = null;
		}
		if (videoEl) {
			videoEl.srcObject = null;
		}
		isActive = false;
	}

	function captureImage() {
		if (!videoEl || !canvasEl) return;

		const context = canvasEl.getContext('2d');
		if (!context) return;

		canvasEl.width = videoEl.videoWidth;
		canvasEl.height = videoEl.videoHeight;

		if (mirrored && facingMode === 'user') {
			context.translate(canvasEl.width, 0);
			context.scale(-1, 1);
		}

		context.drawImage(videoEl, 0, 0);

		canvasEl.toBlob((blob) => {
			if (blob) {
				onCapture?.(blob);
			}
		}, 'image/jpeg', 0.95);
	}

	function startRecording() {
		if (!stream) return;

		try {
			recordedChunks = [];
			mediaRecorder = new MediaRecorder(stream, {
				mimeType: 'video/webm;codecs=vp9'
			});

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					recordedChunks.push(event.data);
				}
			};

			mediaRecorder.onstop = () => {
				const blob = new Blob(recordedChunks, { type: 'video/webm' });
				onRecordingComplete?.(blob);
				recordedChunks = [];
			};

			mediaRecorder.start();
			isRecording = true;
			recordingTime = 0;
			recordingInterval = window.setInterval(() => {
				recordingTime++;
			}, 1000);
		} catch (err) {
			console.error('Recording error:', err);
			error = 'Failed to start recording';
		}
	}

	function stopRecording() {
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
			isRecording = false;
			if (recordingInterval) {
				clearInterval(recordingInterval);
				recordingInterval = null;
			}
		}
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	// Update video element when stream changes
	$effect(() => {
		if (videoEl && stream) {
			console.log('Connecting stream to video element', stream.getTracks());
			videoEl.srcObject = stream;
			videoEl.play().catch(err => console.error('Play error:', err));
		}
	});

	// Cleanup on unmount
	$effect(() => {
		return () => {
			stopCamera();
		};
	});
</script>

<div class="webcam" style="--height: {height}; --width: {width}">
	{#if !isActive}
		<div class="webcam-placeholder">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
				<circle cx="12" cy="13" r="4" />
			</svg>
			{#if error}
				<p class="error">{error}</p>
			{:else}
				<p>Camera not started</p>
			{/if}
			<button class="start-btn" onclick={startCamera}>Start Camera</button>
		</div>
	{:else}
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			bind:this={videoEl}
			autoplay
			playsinline
			muted
			class:mirrored={mirrored && facingMode === 'user'}
			onloadedmetadata={() => console.log('Video ready:', videoEl.videoWidth, 'x', videoEl.videoHeight)}
		></video>
		
		{#if isRecording}
			<div class="recording-indicator">
				<span class="rec-dot"></span>
				<span class="rec-time">{formatTime(recordingTime)}</span>
			</div>
		{/if}
		
		{#if showControls}
			<div class="controls">
				{#if variant === 'photo' || variant === 'both'}
					<button class="control-btn" onclick={captureImage} title="Capture Photo" disabled={isRecording}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10" />
						</svg>
					</button>
				{/if}
				
				{#if variant === 'video' || variant === 'both'}
					{#if !isRecording}
						<button class="control-btn record" onclick={startRecording} title="Start Recording">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10" fill="currentColor" />
							</svg>
						</button>
					{:else}
						<button class="control-btn stop-record" onclick={stopRecording} title="Stop Recording">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="6" y="6" width="12" height="12" fill="currentColor" />
							</svg>
						</button>
					{/if}
				{/if}
				
				<button class="control-btn secondary" onclick={stopCamera} title="Stop Camera">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>
		{/if}
	{/if}
	<canvas bind:this={canvasEl} style="display: none;"></canvas>
</div>

<style>
	.webcam {
		position: relative;
		width: var(--width);
		height: var(--height);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.webcam-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: var(--spacing-4);
		color: var(--text-secondary);
	}

	.webcam-placeholder svg {
		opacity: 0.5;
	}

	.error {
		color: var(--color-error);
		font-size: var(--font-size-sm);
	}

	video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: #000;
		position: relative;
		z-index: 1;
	}

	video.mirrored {
		transform: scaleX(-1);
	}

	.controls {
		position: absolute;
		bottom: var(--spacing-4);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: var(--spacing-3);
		z-index: 10;
	}

	.start-btn,
	.control-btn {
		padding: var(--spacing-3) var(--spacing-6);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		color: var(--text-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.control-btn {
		width: 56px;
		height: 56px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.start-btn:hover,
	.control-btn:hover {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary);
	}

	.control-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.control-btn.record {
		background: var(--color-error);
		border-color: var(--color-error);
	}

	.control-btn.stop-record {
		background: var(--color-error);
		border-color: var(--color-error);
		animation: pulse 1.5s infinite;
	}

	.control-btn.secondary {
		opacity: 0.8;
	}

	.recording-indicator {
		position: absolute;
		top: var(--spacing-4);
		left: var(--spacing-4);
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-3);
		background: rgba(220, 38, 38, 0.9);
		border-radius: var(--radius-full);
		color: white;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		z-index: 10;
	}

	.rec-dot {
		width: 8px;
		height: 8px;
		background: white;
		border-radius: 50%;
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0.3; }
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.05); }
	}
</style>
