<script lang="ts">
	import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';
	import QRCode from 'qrcode';
	import JsBarcode from 'jsbarcode';
	import { onMount } from 'svelte';

	interface Props {
		onScan?: (code: string, format: string) => void;
		onError?: (error: string) => void;
		width?: string;
		height?: string;
		continuousScan?: boolean;
		showSettings?: boolean;
	}

	let {
		onScan,
		onError,
		width = '100%',
		height = '400px',
		continuousScan = false,
		showSettings = true
	}: Props = $props();

	// DOM element references (warnings are false positives for bind:this)
	let videoElement = $state<HTMLVideoElement>();
	let isScanning = $state(false);
	let stream: MediaStream | null = null;
	let scanResult = $state('');
	let scanFormat = $state('');
	let cameraError = $state('');
	let torchEnabled = $state(false);
	let torchSupported = $state(false);
	let showSettingsPanel = $state(false);
	let beepOnScan = $state(true);
	let lastScannedCode = '';
	let codeReader: BrowserMultiFormatReader | null = null;
	let showFlash = $state(false);
	let scannedHistory = $state<Array<{code: string, format: string, timestamp: Date}>>([]);
	let showHistory = $state(false);
	let showGenerator = $state(false);
	
	// Generator state
	let generatorText = $state('');
	let generatorType = $state<'qrcode' | 'code128' | 'ean13' | 'code39' | 'upca'>('qrcode');
	let qrCanvas = $state<HTMLCanvasElement>();
	let barcodeCanvas = $state<HTMLCanvasElement>();
	let generatedCode = $state('');
	let qrErrorLevel = $state<'L' | 'M' | 'Q' | 'H'>('M');
	let qrSize = $state(256);
	let barcodeHeight = $state(80);
	let barcodeWidth = $state(2);
	let showBarcodeText = $state(true);

	async function startScanning() {
		try {
			cameraError = '';
			isScanning = true;
			
			// Wait for next tick to ensure video element is mounted
			await new Promise(resolve => setTimeout(resolve, 0));
			
			if (!videoElement) {
				throw new Error('Video element not ready');
			}
			
			// Initialize ZXing reader
			const hints = new Map();
			codeReader = new BrowserMultiFormatReader(hints);
			
			// Use decodeFromConstraints which is more reliable
			const constraints = {
				video: { 
					facingMode: { ideal: 'environment' },
					width: { ideal: 1280 },
					height: { ideal: 720 }
				}
			};
			
			try {
				const controls = await codeReader.decodeFromConstraints(
					constraints,
					videoElement,
					(result, error) => {
						if (result) {
							const code = result.getText();
							const format = result.getBarcodeFormat();
							
							// Avoid duplicate scans
							if (code !== lastScannedCode) {
								lastScannedCode = code;
								scanResult = code;
								scanFormat = BarcodeFormat[format];
								
								// Add to history
								scannedHistory = [{code, format: BarcodeFormat[format], timestamp: new Date()}, ...scannedHistory].slice(0, 20);
								
								// Flash effect
								showFlash = true;
								setTimeout(() => showFlash = false, 200);
								
								if (beepOnScan) {
									playBeep();
								}
								
								onScan?.(code, scanFormat);
								
								if (!continuousScan) {
									stopScanning();
									return;
								}
								
								// Reset after 2 seconds for continuous scanning
								setTimeout(() => {
									lastScannedCode = '';
								}, 2000);
								}
							}
					}
				);
				
				// Get the stream that ZXing created and check for torch support
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
				console.error('Scanner error:', err);
				throw err;
			}
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : 'Camera access denied';
			cameraError = errorMsg;
			onError?.(errorMsg);
			console.error('Camera error:', err);
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
		lastScannedCode = '';
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
		
		// Create a more authentic cashier scanner beep sound
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		// Higher frequency for that classic scanner beep
		oscillator.frequency.setValueAtTime(2800, audioContext.currentTime);
		oscillator.frequency.exponentialRampToValueAtTime(2200, audioContext.currentTime + 0.08);
		oscillator.type = 'square'; // Square wave for sharper sound
		
		// Quick attack and decay
		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.08);
	}


	function handleManualInput(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.value) {
			scanResult = input.value;
			scanFormat = 'Manual';
			onScan?.(input.value, scanFormat);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isScanning) {
			e.preventDefault();
			stopScanning();
		}
	}

	async function generateCode() {
		if (!generatorText.trim()) return;
		
		// Set generatedCode first to render the canvas
		generatedCode = generatorText;
		
		// Wait for canvas to render
		await new Promise(resolve => setTimeout(resolve, 0));
		
		try {
			if (generatorType === 'qrcode') {
				if (!qrCanvas) throw new Error('QR canvas not ready');
				await QRCode.toCanvas(qrCanvas, generatorText, {
					width: qrSize,
					margin: 2,
					errorCorrectionLevel: qrErrorLevel,
					color: {
						dark: '#000000',
						light: '#FFFFFF'
					}
				});
			} else {
				if (!barcodeCanvas) throw new Error('Barcode canvas not ready');
				// Generate 1D barcode (Code128, Code39, EAN13, UPC-A)
				const format = generatorType === 'code128' ? 'CODE128' : 
								 generatorType === 'code39' ? 'CODE39' : 
								 generatorType === 'upca' ? 'UPC' : 'EAN13';
				
				JsBarcode(barcodeCanvas, generatorText, {
					format: format,
					height: barcodeHeight,
					width: barcodeWidth,
					displayValue: showBarcodeText,
					margin: 10,
					background: '#FFFFFF',
					lineColor: '#000000'
				});
			}
		} catch (err) {
			console.error('Barcode generation error:', err);
			generatedCode = ''; // Reset on error
		}
	}

	function downloadCode() {
		const canvas = generatorType === 'qrcode' ? qrCanvas : barcodeCanvas;
		if (!canvas) return;
		
		const link = document.createElement('a');
		const fileName = generatorType === 'qrcode' ? 'qrcode' : generatorType;
		link.download = `${fileName}-${Date.now()}.png`;
		link.href = canvas.toDataURL();
		link.click();
	}

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	$effect(() => {
		return () => {
			stopScanning();
		};
	});
</script>

<div class="barcode-scanner" style="width: {width};" role="region" aria-label="Barcode scanner">
	<div class="scanner-container" style="height: {height};">
		{#if isScanning}
			<video bind:this={videoElement} class="scanner-video" autoplay playsinline aria-label="Camera feed for barcode scanning">
				<track kind="captions" />
			</video>
			<!-- Flash Effect -->
			{#if showFlash}
				<div class="scan-flash"></div>
			{/if}
			
			<div class="scanner-overlay">
				<!-- Top Controls -->
				<div class="scanner-top-controls">
					{#if torchSupported}
						<button 
							type="button" 
							class="scanner-overlay-button"
							class:active={torchEnabled}
							onclick={toggleTorch}
							aria-label="Toggle flash"
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M7 2v11h3v9l7-12h-4l4-8z" />
							</svg>
						</button>
					{/if}
					<button 
						type="button" 
						class="scanner-overlay-button"
						class:active={showHistory}
						onclick={() => showHistory = !showHistory}
						aria-label="Scan history"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						{#if scannedHistory.length > 0}
							<span class="history-badge">{scannedHistory.length}</span>
						{/if}
					</button>
					{#if showSettings}
						<button 
							type="button" 
							class="scanner-overlay-button"
							class:active={showSettingsPanel}
							onclick={() => showSettingsPanel = !showSettingsPanel}
							aria-label="Scanner settings"
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="3" />
								<path d="M12 1v6m0 6v6M3 12h6m6 0h6" />
							</svg>
						</button>
					{/if}
				</div>
				
				<!-- History Panel -->
				{#if showHistory}
					<div class="history-panel">
						<div class="panel-header">
							<strong>Scan History</strong>
							<button type="button" class="clear-btn" onclick={() => scannedHistory = []}>Clear</button>
						</div>
						<div class="history-list">
							{#if scannedHistory.length === 0}
								<div class="empty-state">No scans yet</div>
							{:else}
								{#each scannedHistory as item}
									<div class="history-item">
										<div class="history-item-header">
											<span class="history-format">{item.format}</span>
											<span class="history-time">{item.timestamp.toLocaleTimeString()}</span>
										</div>
										<div class="history-code">{item.code}</div>
										<button 
											type="button" 
											class="copy-btn"
											onclick={() => navigator.clipboard.writeText(item.code)}
										>
											Copy
										</button>
									</div>
								{/each}
							{/if}
						</div>
					</div>
				{/if}
				
				<!-- Settings Panel -->
				{#if showSettingsPanel}
					<div class="settings-panel">
						<div class="panel-header">
							<strong>Settings</strong>
						</div>
						<label class="setting-item">
							<input type="checkbox" bind:checked={beepOnScan} />
							<span>Beep on scan</span>
						</label>
						<label class="setting-item">
							<input type="checkbox" bind:checked={continuousScan} disabled={!isScanning} />
							<span>Continuous scan mode</span>
						</label>
					</div>
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
					<path d="M3 7V5a2 2 0 0 1 2-2h2" />
					<path d="M17 3h2a2 2 0 0 1 2 2v2" />
					<path d="M21 17v2a2 2 0 0 1-2 2h-2" />
					<path d="M7 21H5a2 2 0 0 1-2-2v-2" />
					<rect x="7" y="7" width="10" height="10" rx="1" />
				</svg>
				<p>Click start to begin scanning</p>
			</div>
		{/if}
	</div>

	<div class="scanner-controls">
		{#if !isScanning}
			<button type="button" class="scanner-button scanner-button-primary" onclick={startScanning}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10" />
					<polygon points="10 8 16 12 10 16 10 8" />
				</svg>
				Start Scanning
			</button>
		{:else}
			<button 
				type="button" 
				class="scanner-button scanner-button-secondary" 
				onclick={stopScanning}
				onkeydown={handleKeydown}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<rect x="6" y="6" width="12" height="12" />
				</svg>
				Stop (or press Esc)
			</button>
		{/if}
	</div>

	{#if cameraError}
		<div class="scanner-error">
			<strong>Error:</strong> {cameraError}
		</div>
	{/if}

	<!-- Generator Toggle -->
	<button 
		type="button" 
		class="generator-toggle"
		onclick={() => showGenerator = !showGenerator}
	>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<rect x="3" y="3" width="18" height="18" rx="2" />
			<path d="M7 7h.01M12 7h.01M17 7h.01M7 12h.01M12 12h.01M17 12h.01M7 17h.01M12 17h.01M17 17h.01" />
		</svg>
		{showGenerator ? 'Hide' : 'Generate'} Barcode
	</button>

	{#if showGenerator}
		<div class="generator-panel">
			<h3>Barcode Generator</h3>
			
			<!-- Type Selector -->
			<div class="generator-section">
				<label class="generator-label">Type</label>
				<div class="type-selector-grid">
					<button 
						type="button"
						class="type-btn"
						class:active={generatorType === 'qrcode'}
						onclick={() => generatorType = 'qrcode'}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<rect x="3" y="3" width="7" height="7" />
							<rect x="14" y="3" width="7" height="7" />
							<rect x="3" y="14" width="7" height="7" />
							<rect x="17" y="17" width="2" height="2" />
							<rect x="14" y="14" width="2" height="2" />
						</svg>
						QR Code
					</button>
					<button 
						type="button"
						class="type-btn"
						class:active={generatorType === 'code128'}
						onclick={() => generatorType = 'code128'}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="8" width="2" height="8" />
							<rect x="7" y="8" width="1" height="8" />
							<rect x="10" y="8" width="3" height="8" />
							<rect x="15" y="8" width="1" height="8" />
							<rect x="18" y="8" width="2" height="8" />
						</svg>
						Code128
					</button>
					<button 
						type="button"
						class="type-btn"
						class:active={generatorType === 'code39'}
						onclick={() => generatorType = 'code39'}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="4" y="9" width="1" height="6" />
							<rect x="7" y="9" width="2" height="6" />
							<rect x="11" y="9" width="1" height="6" />
							<rect x="14" y="9" width="3" height="6" />
							<rect x="19" y="9" width="1" height="6" />
						</svg>
						Code39
					</button>
					<button 
						type="button"
						class="type-btn"
						class:active={generatorType === 'ean13'}
						onclick={() => generatorType = 'ean13'}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="7" width="1" height="10" />
							<rect x="6" y="7" width="1" height="10" />
							<rect x="9" y="7" width="2" height="10" />
							<rect x="13" y="7" width="1" height="10" />
							<rect x="16" y="7" width="2" height="10" />
							<rect x="20" y="7" width="1" height="10" />
						</svg>
						EAN-13
					</button>
					<button 
						type="button"
						class="type-btn"
						class:active={generatorType === 'upca'}
						onclick={() => generatorType = 'upca'}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="2" y="7" width="1" height="10" />
							<rect x="5" y="7" width="2" height="10" />
							<rect x="9" y="7" width="1" height="10" />
							<rect x="12" y="7" width="2" height="10" />
							<rect x="16" y="7" width="1" height="10" />
							<rect x="19" y="7" width="2" height="10" />
						</svg>
						UPC-A
					</button>
				</div>
			</div>

			<!-- Text Input -->
			<div class="generator-section">
				<label class="generator-label" for="gen-text">Content</label>
				<textarea
					id="gen-text"
					class="generator-textarea"
					bind:value={generatorText}
					placeholder="Enter text, URL, or data to encode..."
					rows="3"
				></textarea>
			</div>

			<!-- Options -->
			<div class="generator-section">
				<label class="generator-label">Options</label>
				{#if generatorType === 'qrcode'}
					<div class="options-grid">
						<div class="option-group">
							<label class="option-label" for="qr-size">Size</label>
							<select id="qr-size" class="option-select" bind:value={qrSize}>
								<option value={128}>128px</option>
								<option value={256}>256px</option>
								<option value={512}>512px</option>
								<option value={1024}>1024px</option>
							</select>
						</div>
						<div class="option-group">
							<label class="option-label" for="qr-error">Error Correction</label>
							<select id="qr-error" class="option-select" bind:value={qrErrorLevel}>
								<option value="L">Low (7%)</option>
								<option value="M">Medium (15%)</option>
								<option value="Q">Quartile (25%)</option>
								<option value="H">High (30%)</option>
							</select>
						</div>
					</div>
				{:else}
					<!-- Barcode Options -->
					<div class="options-grid">
						<div class="option-group">
							<label class="option-label" for="bar-height">Height</label>
							<select id="bar-height" class="option-select" bind:value={barcodeHeight}>
								<option value={50}>50px</option>
								<option value={80}>80px</option>
								<option value={100}>100px</option>
								<option value={150}>150px</option>
							</select>
						</div>
						<div class="option-group">
							<label class="option-label" for="bar-width">Bar Width</label>
							<select id="bar-width" class="option-select" bind:value={barcodeWidth}>
								<option value={1}>Thin</option>
								<option value={2}>Medium</option>
								<option value={3}>Thick</option>
							</select>
						</div>
					</div>
					<label class="setting-item" style="margin-top: var(--spacing-2);">
						<input type="checkbox" bind:checked={showBarcodeText} />
						<span>Show text below barcode</span>
					</label>
				{/if}
			</div>

			<!-- Generate Button -->
			<button
				type="button"
				class="generate-btn"
				onclick={generateCode}
				disabled={!generatorText.trim()}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
				</svg>
				Generate {generatorType === 'qrcode' ? 'QR Code' : generatorType.toUpperCase()}
			</button>

			<!-- Generated Code Display -->
			{#if generatedCode}
				<div class="generated-display">
					<div class="canvas-wrapper">
						{#if generatorType === 'qrcode'}
							<canvas bind:this={qrCanvas} class="qr-canvas"></canvas>
						{:else}
							<canvas bind:this={barcodeCanvas} class="barcode-canvas"></canvas>
						{/if}
					</div>
					<div class="generated-actions">
						<button type="button" class="action-btn" onclick={downloadCode}>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
							</svg>
							Download
						</button>
						<button type="button" class="action-btn" onclick={() => copyToClipboard(generatedCode)}>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="9" y="9" width="13" height="13" rx="2" />
								<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
							</svg>
							Copy Text
						</button>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<div class="manual-input">
		<input
			type="text"
			placeholder="Or enter barcode manually"
			class="barcode-input"
			onchange={handleManualInput}
			aria-label="Manual barcode input"
		/>
	</div>

	{#if scanResult}
		<div class="scan-result">
			<div class="scan-result-header">
				<strong>Scanned Successfully</strong>
				<span class="scan-format-badge">{scanFormat}</span>
			</div>
			<div class="scan-result-data">{scanResult}</div>
		</div>
	{/if}
</div>

<style>
	.barcode-scanner {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.scanner-container {
		position: relative;
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
		animation: flash 0.2s ease-out;
		pointer-events: none;
		z-index: 999;
	}

	@keyframes flash {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	.scanner-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.scanner-top-controls {
		position: absolute;
		top: var(--spacing-4);
		right: var(--spacing-4);
		display: flex;
		gap: var(--spacing-2);
		pointer-events: auto;
	}

	.scanner-overlay-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		padding: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-full);
		color: white;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.scanner-overlay-button:hover {
		background: rgba(0, 0, 0, 0.8);
		transform: scale(1.05);
	}

	.scanner-overlay-button.active {
		background: var(--color-primary-500);
		border-color: var(--color-primary-400);
	}

	.scanner-overlay-button {
		position: relative;
	}

	.history-badge {
		position: absolute;
		top: -4px;
		right: -4px;
		min-width: 18px;
		height: 18px;
		padding: 0 4px;
		background: var(--color-primary-500);
		color: white;
		font-size: 11px;
		font-weight: bold;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.settings-panel,
	.history-panel {
		position: absolute;
		top: var(--spacing-16);
		right: var(--spacing-4);
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-lg);
		padding: var(--spacing-4);
		pointer-events: auto;
		min-width: 250px;
		max-width: 350px;
		animation: fadeIn var(--transition-fast);
	}

	.history-panel {
		max-height: 400px;
		display: flex;
		flex-direction: column;
	}

	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-3);
		padding-bottom: var(--spacing-2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		color: white;
		font-size: var(--font-size-sm);
	}

	.clear-btn,
	.copy-btn {
		padding: var(--spacing-1) var(--spacing-2);
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-sm);
		color: white;
		font-size: var(--font-size-xs);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	.clear-btn:hover,
	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.history-list {
		overflow-y: auto;
		max-height: 300px;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.empty-state {
		text-align: center;
		padding: var(--spacing-8);
		color: rgba(255, 255, 255, 0.5);
		font-size: var(--font-size-sm);
	}

	.history-item {
		padding: var(--spacing-3);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		position: relative;
	}

	.history-item-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--spacing-1);
	}

	.history-format {
		padding: 2px var(--spacing-2);
		background: var(--color-primary-500);
		border-radius: var(--radius-sm);
		color: white;
		font-size: 10px;
		font-weight: bold;
	}

	.history-time {
		color: rgba(255, 255, 255, 0.6);
		font-size: var(--font-size-xs);
	}

	.history-code {
		color: white;
		font-family: monospace;
		font-size: var(--font-size-sm);
		word-break: break-all;
		margin-bottom: var(--spacing-2);
	}

	.copy-btn {
		position: absolute;
		bottom: var(--spacing-2);
		right: var(--spacing-2);
	}

	.setting-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		color: white;
		font-size: var(--font-size-sm);
		cursor: pointer;
	}

	.setting-item input[type="checkbox"] {
		cursor: pointer;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.scanner-frame {
		position: relative;
		width: 250px;
		height: 250px;
		border: 3px solid var(--color-primary-500);
		border-radius: var(--radius-lg);
		box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
		animation: pulse 2s infinite;
		overflow: hidden;
	}

	.scan-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--color-primary-400), transparent);
		box-shadow: 0 0 8px var(--color-primary-500);
		animation: scan 2s ease-in-out infinite;
	}

	@keyframes scan {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(250px);
		}
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	.scanner-instructions {
		position: absolute;
		bottom: var(--spacing-6);
		color: white;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		text-align: center;
		padding: var(--spacing-2) var(--spacing-4);
		background: rgba(0, 0, 0, 0.6);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.scanning-indicator {
		width: 8px;
		height: 8px;
		background: var(--color-primary-500);
		border-radius: 50%;
		animation: blink 1.5s ease-in-out infinite;
	}

	@keyframes blink {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	.scanner-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--color-neutral-500);
		gap: var(--spacing-3);
	}

	.scanner-placeholder p {
		margin: 0;
		font-size: var(--font-size-sm);
	}

	.scanner-controls {
		display: flex;
		gap: var(--spacing-3);
	}

	.scanner-button {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-6);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		border: none;
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.scanner-button-primary {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		color: white;
	}

	.scanner-button-primary:hover {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		transform: translateY(-1px);
		box-shadow: var(--glass-shadow-lg);
	}

	.scanner-button-secondary {
		background: var(--glass-bg);
		color: var(--color-neutral-700);
		border: 1px solid var(--glass-border);
	}

	@media (prefers-color-scheme: dark) {
		.scanner-button-secondary {
			color: var(--color-neutral-300);
		}
	}

	.scanner-button-secondary:hover {
		background: var(--glass-bg-hover);
	}

	.scanner-button:focus-visible {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
	}

	.manual-input {
		width: 100%;
	}

	.barcode-input {
		width: 100%;
		padding: var(--spacing-3) var(--spacing-4);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		color: var(--color-neutral-900);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		transition: all var(--transition-base);
	}

	@media (prefers-color-scheme: dark) {
		.scan-result-data {
			color: var(--color-neutral-50);
		}
	}

	.generator-toggle {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-700);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	@media (prefers-color-scheme: dark) {
		.generator-toggle {
			color: var(--color-neutral-300);
		}
	}

	.generator-toggle:hover {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-500);
		color: var(--color-primary-500);
	}

	.generator-panel {
		padding: var(--spacing-6);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		animation: slideUp var(--transition-base);
	}

	.generator-panel h3 {
		margin: 0 0 var(--spacing-3) 0;
		color: var(--color-neutral-900);
		font-size: var(--font-size-lg);
	}

	@media (prefers-color-scheme: dark) {
		.generator-panel h3 {
			color: var(--color-neutral-50);
		}
	}

	.generator-section {
		margin-bottom: var(--spacing-4);
	}

	.generator-label {
		display: block;
		margin-bottom: var(--spacing-2);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-700);
	}

	@media (prefers-color-scheme: dark) {
		.generator-label {
			color: var(--color-neutral-300);
		}
	}

	.type-selector-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-2);
	}

	@media (min-width: 500px) {
		.type-selector-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.type-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		background: var(--glass-bg);
		border: 2px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-600);
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.type-btn:hover:not(:disabled) {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-400);
	}

	.type-btn.active {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		border-color: var(--color-primary-500);
		color: white;
	}

	.type-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.generator-textarea {
		width: 100%;
		padding: var(--spacing-3);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		color: var(--color-neutral-900);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		resize: vertical;
		transition: border-color var(--transition-fast);
	}

	@media (prefers-color-scheme: dark) {
		.generator-textarea {
			color: var(--color-neutral-50);
		}
	}

	.generator-textarea:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	.options-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3);
	}

	.option-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.option-label {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-600);
	}

	@media (prefers-color-scheme: dark) {
		.option-label {
			color: var(--color-neutral-400);
		}
	}

	.option-select {
		padding: var(--spacing-2);
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		color: var(--color-neutral-900);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		cursor: pointer;
	}

	@media (prefers-color-scheme: dark) {
		.option-select {
			color: var(--color-neutral-50);
		}
	}

	.generate-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		padding: var(--spacing-4);
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		border: none;
		border-radius: var(--radius-lg);
		color: white;
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.generate-btn:hover:not(:disabled) {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		transform: translateY(-1px);
		box-shadow: var(--glass-shadow-lg);
	}

	.generate-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.generated-display {
		margin-top: var(--spacing-4);
		padding: var(--spacing-4);
		background: rgba(168, 85, 247, 0.05);
		border: 2px solid rgba(168, 85, 247, 0.2);
		border-radius: var(--radius-lg);
		animation: slideUp var(--transition-base);
	}

	.canvas-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: var(--spacing-4);
		padding: var(--spacing-4);
		background: white;
		border-radius: var(--radius-md);
	}

	.qr-canvas,
	.barcode-canvas {
		max-width: 100%;
		height: auto;
		display: block;
	}

	.generated-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-2);
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-neutral-700);
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	@media (prefers-color-scheme: dark) {
		.action-btn {
			color: var(--color-neutral-300);
		}
	}

	.action-btn:hover {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-500);
		color: var(--color-primary-500);
		transform: translateY(-1px);
	}

	.barcode-input:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	.scan-result {
		padding: var(--spacing-4);
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: var(--radius-lg);
		animation: slideUp var(--transition-base);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.scan-result-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-2);
		color: rgb(22, 163, 74);
		font-size: var(--font-size-sm);
	}

	.scan-format-badge {
		padding: var(--spacing-1) var(--spacing-2);
		background: rgba(34, 197, 94, 0.2);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
	}

	.scan-result-data {
		font-family: monospace;
		font-size: var(--font-size-base);
		color: var(--color-neutral-900);
		word-break: break-all;
	}

	@media (prefers-color-scheme: dark) {
		.scan-result {
			background: rgba(34, 197, 94, 0.15);
		}
		.scan-result-header {
			color: rgb(134, 239, 172);
		}
		.scan-result-data {
			color: var(--color-neutral-50);
		}
	}

	.scanner-error {
		padding: var(--spacing-4);
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: var(--radius-lg);
		font-size: var(--font-size-sm);
		color: rgb(220, 38, 38);
	}

	@media (prefers-color-scheme: dark) {
		.scanner-error {
			background: rgba(239, 68, 68, 0.15);
			color: rgb(248, 113, 113);
		}
	}
</style>
