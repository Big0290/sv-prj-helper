<script lang="ts">
	interface Props {
		onSend?: (audioBlob: Blob, duration: number) => void;
		onCancel?: () => void;
		maxDuration?: number; // in seconds
	}

	let {
		onSend,
		onCancel,
		maxDuration = 120
	}: Props = $props();

	let isRecording = $state(false);
	let isPaused = $state(false);
	let isPlaying = $state(false);
	let duration = $state(0);
	let audioBlob = $state<Blob | null>(null);
	let audioUrl = $state<string>('');
	
	let mediaRecorder: MediaRecorder | null = null;
	let audioChunks: Blob[] = [];
	let recordingInterval: number;
	let audioElement = $state<HTMLAudioElement>();

	async function startRecording() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);
			audioChunks = [];
			duration = 0;

			mediaRecorder.ondataavailable = (event) => {
				audioChunks.push(event.data);
			};

			mediaRecorder.onstop = () => {
				const blob = new Blob(audioChunks, { type: 'audio/webm' });
				audioBlob = blob;
				audioUrl = URL.createObjectURL(blob);
				stream.getTracks().forEach(track => track.stop());
			};

			mediaRecorder.start();
			isRecording = true;

			recordingInterval = setInterval(() => {
				duration++;
				if (duration >= maxDuration) {
					stopRecording();
				}
			}, 1000);
		} catch (err) {
			console.error('Microphone access denied:', err);
		}
	}

	function pauseRecording() {
		if (mediaRecorder && isRecording) {
			mediaRecorder.pause();
			clearInterval(recordingInterval);
			isPaused = true;
		}
	}

	function resumeRecording() {
		if (mediaRecorder && isPaused) {
			mediaRecorder.resume();
			recordingInterval = setInterval(() => {
				duration++;
				if (duration >= maxDuration) {
					stopRecording();
				}
			}, 1000);
			isPaused = false;
		}
	}

	function stopRecording() {
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
			clearInterval(recordingInterval);
			isRecording = false;
			isPaused = false;
		}
	}

	function playRecording() {
		if (audioElement && audioUrl) {
			audioElement.play();
			isPlaying = true;
		}
	}

	function pausePlayback() {
		if (audioElement) {
			audioElement.pause();
			isPlaying = false;
		}
	}

	function handleSend() {
		if (audioBlob) {
			onSend?.(audioBlob, duration);
			reset();
		}
	}

	function handleCancel() {
		stopRecording();
		reset();
		onCancel?.();
	}

	function reset() {
		if (audioUrl) {
			URL.revokeObjectURL(audioUrl);
		}
		audioBlob = null;
		audioUrl = '';
		duration = 0;
		isRecording = false;
		isPaused = false;
		isPlaying = false;
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<div class="voice-recorder">
	{#if !isRecording && !audioBlob}
		<button type="button" class="record-btn start" onclick={startRecording} aria-label="Start recording">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
				<path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	{:else if isRecording}
		<div class="recording-controls">
			<button type="button" class="control-btn cancel" onclick={handleCancel} aria-label="Cancel">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>

			<div class="recording-status">
				<span class="recording-dot"></span>
				<span class="duration">{formatTime(duration)}</span>
				<div class="waveform">
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
				</div>
			</div>

			{#if isPaused}
				<button type="button" class="control-btn" onclick={resumeRecording} aria-label="Resume">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<polygon points="5 3 19 12 5 21 5 3" />
					</svg>
				</button>
			{:else}
				<button type="button" class="control-btn" onclick={pauseRecording} aria-label="Pause">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<rect x="6" y="4" width="4" height="16" />
						<rect x="14" y="4" width="4" height="16" />
					</svg>
				</button>
			{/if}

			<button type="button" class="control-btn stop" onclick={stopRecording} aria-label="Stop">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<rect x="6" y="6" width="12" height="12" />
				</svg>
			</button>
		</div>
	{:else if audioBlob}
		<div class="playback-controls">
			<button type="button" class="control-btn cancel" onclick={handleCancel} aria-label="Delete">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="3 6 5 6 21 6" />
					<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
				</svg>
			</button>

			{#if isPlaying}
				<button type="button" class="control-btn" onclick={pausePlayback} aria-label="Pause">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<rect x="6" y="4" width="4" height="16" />
						<rect x="14" y="4" width="4" height="16" />
					</svg>
				</button>
			{:else}
				<button type="button" class="control-btn" onclick={playRecording} aria-label="Play">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<polygon points="5 3 19 12 5 21 5 3" />
					</svg>
				</button>
			{/if}

			<span class="duration">{formatTime(duration)}</span>

			<button type="button" class="control-btn send" onclick={handleSend} aria-label="Send">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="22" y1="2" x2="11" y2="13" />
					<polygon points="22 2 15 22 11 13 2 9 22 2" />
				</svg>
			</button>

			<audio bind:this={audioElement} src={audioUrl} onended={() => isPlaying = false}>
				<track kind="captions" />
			</audio>
		</div>
	{/if}
</div>

<style>
	.voice-recorder {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-2);
	}

	.record-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		padding: 0;
		background: linear-gradient(135deg, var(--color-danger-600), var(--color-danger-700));
		border: none;
		border-radius: 50%;
		color: white;
		cursor: pointer;
		transition: all var(--transition-normal);
		box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
	}

	.record-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
	}

	.record-btn:active {
		transform: scale(0.95);
	}

	.recording-controls,
	.playback-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		min-width: 300px;
	}

	.recording-status {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		flex: 1;
	}

	.recording-dot {
		width: 8px;
		height: 8px;
		background: var(--color-danger-500);
		border-radius: 50%;
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.7;
			transform: scale(1.2);
		}
	}

	.duration {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-200);
		font-variant-numeric: tabular-nums;
		min-width: 40px;
	}

	.waveform {
		display: flex;
		align-items: center;
		gap: 2px;
		height: 24px;
		flex: 1;
	}

	.bar {
		width: 3px;
		background: var(--color-primary-500);
		border-radius: 2px;
		animation: wave 1.2s ease-in-out infinite;
	}

	.bar:nth-child(1) { height: 40%; animation-delay: 0s; }
	.bar:nth-child(2) { height: 70%; animation-delay: 0.1s; }
	.bar:nth-child(3) { height: 100%; animation-delay: 0.2s; }
	.bar:nth-child(4) { height: 60%; animation-delay: 0.3s; }
	.bar:nth-child(5) { height: 80%; animation-delay: 0.4s; }

	@keyframes wave {
		0%, 100% {
			height: 40%;
		}
		50% {
			height: 100%;
		}
	}

	.control-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-300);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-neutral-100);
	}

	.control-btn.cancel:hover {
		border-color: var(--color-danger-500);
		color: var(--color-danger-400);
	}

	.control-btn.stop {
		background: rgba(239, 68, 68, 0.1);
		border-color: var(--color-danger-500);
		color: var(--color-danger-400);
	}

	.control-btn.stop:hover {
		background: rgba(239, 68, 68, 0.2);
	}

	.control-btn.send {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		border-color: var(--color-primary-500);
		color: white;
	}

	.control-btn.send:hover {
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
		transform: translateY(-1px);
	}

	audio {
		display: none;
	}
</style>
