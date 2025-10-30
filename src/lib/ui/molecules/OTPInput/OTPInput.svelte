<script lang="ts">
	interface Props {
		length?: number;
		value?: string;
		onComplete?: (code: string) => void;
	}

	let {
		length = 6,
		value = $bindable(''),
		onComplete
	}: Props = $props();

	let inputs = $state<HTMLInputElement[]>([]);
	let digits = $state<string[]>(Array(length).fill(''));

	function handleInput(index: number, e: Event) {
		const input = e.target as HTMLInputElement;
		const val = input.value.slice(-1);
		digits[index] = val;
		value = digits.join('');
		
		if (val && index < length - 1) {
			inputs[index + 1]?.focus();
		}
		
		if (value.length === length) {
			onComplete?.(value);
		}
	}

	function handleKeydown(index: number, e: KeyboardEvent) {
		if (e.key === 'Backspace' && !digits[index] && index > 0) {
			inputs[index - 1]?.focus();
		}
		if (e.key === 'ArrowLeft' && index > 0) {
			inputs[index - 1]?.focus();
		}
		if (e.key === 'ArrowRight' && index < length - 1) {
			inputs[index + 1]?.focus();
		}
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const paste = e.clipboardData?.getData('text') || '';
		const chars = paste.slice(0, length).split('');
		chars.forEach((char, i) => {
			if (i < length) digits[i] = char;
		});
		value = digits.join('');
		inputs[Math.min(chars.length, length - 1)]?.focus();
		if (value.length === length) onComplete?.(value);
	}
</script>

<div class="otp-input">
	{#each Array(length) as _, i}
		<input
			bind:this={inputs[i]}
			type="text"
			inputmode="numeric"
			maxlength="1"
			value={digits[i]}
			oninput={(e) => handleInput(i, e)}
			onkeydown={(e) => handleKeydown(i, e)}
			onpaste={handlePaste}
			autocomplete="one-time-code"
		/>
	{/each}
</div>

<style>
	.otp-input { display: flex; gap: var(--spacing-2); }
	.otp-input input { width: 3rem; height: 3.5rem; text-align: center; font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); background: var(--glass-bg); border: 2px solid var(--glass-border); border-radius: var(--radius-md); transition: all var(--transition-fast); }
	.otp-input input:focus { outline: none; border-color: var(--color-primary-600); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
	.otp-input input:not(:placeholder-shown) { border-color: var(--color-primary-600); }
	@media (max-width: 768px) {
		.otp-input input { width: 2.5rem; height: 3rem; font-size: var(--font-size-lg); }
	}
</style>
