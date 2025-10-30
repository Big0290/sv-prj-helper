<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileUpload from './FileUpload.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Forms/FileUpload',
		component: FileUpload,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A file upload component with drag-and-drop support and file validation.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<FileUpload />
</Story>

<Story name="Multiple">
	<FileUpload multiple={true} label="Upload multiple files" />
</Story>

<Story name="ImageOnly">
	<FileUpload accept="image/*" label="Upload images" />
</Story>

<Story name="WithMaxSize">
	<FileUpload maxSize={1048576} label="Upload files (max 1MB)" />
</Story>

<Story name="PDFOnly">
	<FileUpload accept=".pdf" label="Upload PDF documents" />
</Story>
