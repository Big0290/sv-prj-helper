<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OTPInput from './OTPInput.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/OTPInput',
		component: OTPInput,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A one-time password input component with multiple digits and paste support.'
				}
			}
		}
	});
</script>

<Story name="Default" args={{}} />

<Story name="FourDigits">
	<OTPInput length={4} />
</Story>

<Story name="EightDigits">
	<OTPInput length={8} />
</Story>

<Story name="WithValue">
	<script>
		let value = '123456';
	</script>
	<OTPInput value={value} length={6} />
</Story>
