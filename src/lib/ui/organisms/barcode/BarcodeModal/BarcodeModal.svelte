<script lang="ts">
	import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
		onScan?: (code: string, format: string) => void;
		title?: string;
		beepOnScan?: boolean;
	}

	let {
		isOpen = $bindable(false),
		onClose,
		onScan,
		title = 'Scan Barcode',
		beepOnScan = true
	}: Props = $props();

	let videoElement = $state<HTMLVideoElement>();
	let isScanning = $state(false);
	let stream: MediaStream | null = null;
	let codeReader: BrowserMultiFormatReader | null = null;
	let scanResult = $state('');
	let scanFormat = $state('');
	let cameraError = $state('');
	let torchEnabled = $state(false);
	let torchSupported = $state(false);
	let showFlash = $state(false);

	async function startScanning() {
		try {
			cameraError = '';
			isScanning = true;
			
			await new Promise(resolve => setTimeout(resolve, 0));
			
			if (!videoElement) throw new Error('Video element not ready');
			
			const hints = new Map();
			codeReader = new BrowserMultiFormatReader(hints);
			
			const constraints = {
				video: { 
					facingMode: { ideal: 'environment' },
					width: { ideal: 1280 },
					height: { ideal: 720 }
				}
			};
			
			await codeReader.decodeFromConstraints(
				constraints,
				videoElement,
				(result, error) => {
					if (result) {
						const code = result.getText();
						const format = result.getBarcodeFormat();
						
						scanResult = code;
						scanFormat = BarcodeFormat[format];
						
						showFlash = true;
						setTimeout(() => showFlash = false, 200);
						
						if (beepOnScan) playBeep();
						
						onScan?.(code, scanFormat);
						
						// Auto-close after scan
						setTimeout(() => {
							handleClose();
						}, 800);
					}
				}
			);
			
			await new Promise(resolve => setTimeout(resolve, 100));
			if (videoElement.srcObject) {
				stream = videoElement.srcObject as MediaStream;
				const track = stream.getVideoTracks()[0];
				if (track) {
					const capabilities = track.getCapabilities();
					torchSupported = 'torch' in capabilities;
				}
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : 'Camera access denied';
			cameraError = errorMsg;
			console.error('Scanner error:', err);
			isScanning = false;
		}
	}

	function stopScanning() {
		if (codeReader) {
			codeReader.reset();
			codeReader = null;
		}
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
			stream = null;
		}
		isScanning = false;
		torchEnabled = false;
	}

	async function toggleTorch() {
		if (!stream || !torchSupported) return;
		
		try {
			const track = stream.getVideoTracks()[0];
			await track.applyConstraints({
				advanced: [{ torch: !torchEnabled } as any]
			});
			torchEnabled = !torchEnabled;
		} catch (err) {
			console.error('Torch error:', err);
		}
	}

	function playBeep() {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		oscillator.frequency.setValueAtTime(2800, audioContext.currentTime);
		oscillator.frequency.exponentialRampToValueAtTime(2200, audioContext.currentTime + 0.08);
		oscillator.type = 'square';
		
		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.08);
	}

	function handleClose() {
		stopScanning();
		scanResult = '';
		scanFormat = '';
		cameraError = '';
		isOpen = false;
		onClose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			handleClose();
		}
	}

	$effect(() => {
		if (isOpen && !isScanning) {
			startScanning();
		} else if (!isOpen && isScanning) {
			stopScanning();
		}
	});

	$effect(() => {
		return () => {
			stopScanning();
		};
	});
</script>

{#if isOpen}
	<div class="modal-backdrop" onclick={handleClose} onkeydown={handleKeydown} role="presentation">
		<div class="modal-content" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
			<div class="modal-header">
				<h3 id="modal-title">{title}</h3>
				<button type="button" class="close-btn" onclick={handleClose} aria-label="Close scanner">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="scanner-container">
				{#if isScanning}
					<video bind:this={videoElement} class="scanner-video" autoplay playsinline aria-label="Camera feed">
						<track kind="captions" />
					</video>
					
					{#if showFlash}
						<div class="scan-flash"></div>
					{/if}
					
					<div class="scanner-overlay">
						{#if torchSupported}
							<button 
								type="button" 
								class="torch-btn"
								class:active={torchEnabled}
								onclick={toggleTorch}
								aria-label="Toggle flash"
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
									<path d="M7 2v11h3v9l7-12h-4l4-8z" />
								</svg>
							</button>
						{/if}
						
						<div class="scanner-frame">
							<div class="scan-line"></div>
						</div>
						
						<div class="scanner-instructions">
							<div class="scanning-indicator"></div>
							Align barcode within frame
						</div>
					</div>
				{:else}
					<div class="scanner-placeholder">
						<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
							<rect x="7" y="7" width="10" height="10" rx="1" />
						</svg>
						<p>Initializing camera...</p>
					</div>
				{/if}
			</div>

			{#if cameraError}
				<div class="error-message">
					<strong>Error:</strong> {cameraError}
				</div>
			{/if}

			{#if scanResult}
				<div class="scan-result">
					<div class="result-header">
						<strong>Scanned Successfully</strong>
						<span class="format-badge">{scanFormat}</span>
					</div>
					<div class="result-data">{scanResult}</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: var(--spacing-4);
	}

	.modal-content {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-2xl);
		box-shadow: var(--glass-shadow-xl);
		max-width: 600px;
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-4);
		border-bottom: 1px solid var(--glass-border);
	}

	.modal-header h3 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-50);
	}

	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: var(--radius-lg);
		color: var(--color-neutral-300);
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-neutral-50);
	}

	.scanner-container {
		position: relative;
		width: 100%;
		height: 400px;
		background: var(--color-neutral-900);
		overflow: hidden;
	}

	.scanner-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.scan-flash {
		position: absolute;
		inset: 0;
		background: rgba(255, 255, 255, 0.9);
		animation: flash 0.2s ease-out;
		pointer-events: none;
		z-index: 999;
	}

	@keyframes flash {
		0% { opacity: 1; }
		100% { opacity: 0; }
	}

	.scanner-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.torch-btn {
		position: absolute;
		top: var(--spacing-4);
		right: var(--spacing-4);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-full);
		color: white;
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.torch-btn:hover {
		background: rgba(0, 0, 0, 0.7);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.torch-btn.active {
		background: var(--color-primary-600);
		border-color: var(--color-primary-500);
		color: white;
	}

	.scanner-frame {
		position: relative;
		width: 280px;
		height: 280px;
		border: 3px solid var(--color-primary-500);
		border-radius: var(--radius-xl);
		box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
		overflow: hidden;
	}

	.scan-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(to bottom, transparent, var(--color-primary-400), transparent);
		animation: scan 2s ease-in-out infinite;
	}

	@keyframes scan {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(280px); }
	}

	.scanner-instructions {
		position: absolute;
		bottom: var(--spacing-8);
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-4);
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(10px);
		border-radius: var(--radius-full);
		color: white;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}

	.scanning-indicator {
		width: 8px;
		height: 8px;
		background: var(--color-primary-500);
		border-radius: var(--radius-full);
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}

	.scanner-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: var(--color-neutral-400);
		gap: var(--spacing-3);
	}

	.scanner-placeholder p {
		margin: 0;
		font-size: var(--font-size-base);
	}

	.error-message {
		padding: var(--spacing-3) var(--spacing-4);
		background: rgba(239, 68, 68, 0.1);
		border-top: 1px solid rgba(239, 68, 68, 0.2);
		color: var(--color-danger-400);
		font-size: var(--font-size-sm);
	}

	.scan-result {
		padding: var(--spacing-4);
		border-top: 1px solid var(--glass-border);
		background: rgba(34, 197, 94, 0.1);
	}

	.result-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-2);
	}

	.result-header strong {
		color: var(--color-success-400);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
	}

	.format-badge {
		padding: var(--spacing-1) var(--spacing-2);
		background: var(--color-primary-600);
		border-radius: var(--radius-md);
		color: white;
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
	}

	.result-data {
		padding: var(--spacing-3);
		background: rgba(0, 0, 0, 0.3);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-50);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		word-break: break-all;
	}
</style>
