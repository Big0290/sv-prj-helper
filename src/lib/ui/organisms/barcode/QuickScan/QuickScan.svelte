<script lang="ts">
	import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

	interface Props {
		onScan?: (code: string, format: string) => void;
		onError?: (error: string) => void;
		height?: string;
		width?: string;
		autoClose?: boolean;
	}

	let {
		onScan,
		onError,
		height = '200px',
		width = '100%',
		autoClose = true
	}: Props = $props();

	let videoElement = $state<HTMLVideoElement>();
	let isScanning = $state(false);
	let stream: MediaStream | null = null;
	let codeReader: BrowserMultiFormatReader | null = null;
	let scanResult = $state('');
	let cameraError = $state('');
	let showFlash = $state(false);

	async function startScanning() {
		try {
			cameraError = '';
			scanResult = '';
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
						
						showFlash = true;
						setTimeout(() => showFlash = false, 150);
						
						playBeep();
						
						onScan?.(code, BarcodeFormat[format]);
						
						if (autoClose) {
							setTimeout(() => {
								stopScanning();
							}, 600);
						}
					}
				}
			);
			
			await new Promise(resolve => setTimeout(resolve, 100));
			if (videoElement.srcObject) {
				stream = videoElement.srcObject as MediaStream;
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : 'Camera access denied';
			cameraError = errorMsg;
			onError?.(errorMsg);
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
	}

	function playBeep() {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		oscillator.frequency.setValueAtTime(2800, audioContext.currentTime);
		oscillator.frequency.exponentialRampToValueAtTime(2200, audioContext.currentTime + 0.06);
		oscillator.type = 'square';
		
		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.06);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.06);
	}

	$effect(() => {
		return () => {
			stopScanning();
		};
	});
</script>

<div class="quick-scan" style="width: {width};">
	{#if !isScanning}
		<button type="button" class="scan-trigger" onclick={startScanning} style="height: {height};">
			<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M3 7V5a2 2 0 0 1 2-2h2" />
				<path d="M17 3h2a2 2 0 0 1 2 2v2" />
				<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
				<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
				<rect x="7" y="7" width="10" height="10" rx="1" />
			</svg>
			<span>Tap to Scan</span>
		</button>
	{:else}
		<div class="scanner-container" style="height: {height};">
			<video bind:this={videoElement} class="scanner-video" autoplay playsinline aria-label="Camera feed">
				<track kind="captions" />
			</video>
			
			{#if showFlash}
				<div class="scan-flash"></div>
			{/if}
			
			<div class="scanner-overlay">
				<div class="scan-frame">
					<div class="scan-line"></div>
				</div>
				
				{#if scanResult}
					<div class="success-badge">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<path d="M20 6L9 17l-5-5" />
						</svg>
						Scanned!
					</div>
				{/if}
			</div>
			
			<button type="button" class="close-btn" onclick={stopScanning} aria-label="Close scanner">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>
		</div>
	{/if}
	
	{#if cameraError}
		<div class="error-msg">{cameraError}</div>
	{/if}
</div>

<style>
	.quick-scan {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.scan-trigger {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-3);
		width: 100%;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 2px dashed var(--glass-border);
		border-radius: var(--radius-xl);
		color: var(--color-neutral-300);
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.scan-trigger:hover {
		border-color: var(--color-primary-500);
		color: var(--color-primary-400);
		background: rgba(139, 92, 246, 0.05);
	}

	.scan-trigger span {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
	}

	.scanner-container {
		position: relative;
		width: 100%;
		background: var(--color-neutral-900);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--glass-shadow-lg);
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
		animation: flash 0.15s ease-out;
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
		gap: var(--spacing-4);
	}

	.scan-frame {
		position: relative;
		width: 180px;
		height: 180px;
		border: 2px solid var(--color-primary-500);
		border-radius: var(--radius-lg);
		box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4);
		overflow: hidden;
	}

	.scan-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(to bottom, transparent, var(--color-primary-400), transparent);
		animation: scan 1.5s ease-in-out infinite;
	}

	@keyframes scan {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(180px); }
	}

	.success-badge {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-4);
		background: var(--color-success-600);
		border-radius: var(--radius-full);
		color: white;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		box-shadow: var(--glass-shadow-lg);
		animation: slideUp 0.3s ease-out;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.close-btn {
		position: absolute;
		top: var(--spacing-3);
		right: var(--spacing-3);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-full);
		color: white;
		cursor: pointer;
		transition: all var(--transition-fast);
		z-index: 10;
	}

	.close-btn:hover {
		background: rgba(0, 0, 0, 0.8);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.error-msg {
		padding: var(--spacing-2) var(--spacing-3);
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: var(--radius-lg);
		color: var(--color-danger-400);
		font-size: var(--font-size-sm);
		text-align: center;
	}
</style>
