import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Mock documentation metadata - in a real app this would come from a database or generated files
const mockDocumentation = {
	version: '1.0.0',
	lastUpdated: new Date().toISOString(),
	totalComponents: 50,
	categories: [
		{ name: 'atoms', components: ['Button', 'Input', 'Text', 'Heading', 'Badge'] },
		{ name: 'molecules', components: ['Card', 'Alert', 'Menu', 'Toast'] },
		{ name: 'organisms', components: ['DataTable', 'Chat', 'Navigation'] },
		{ name: 'layouts', components: ['Container', 'Stack', 'Grid'] }
	],
	components: {
		Button: {
			category: 'atoms',
			path: '/src/lib/components/atoms/Button',
			exports: ['Button'],
			dependencies: [],
			documentation: {
				name: 'Button',
				description: 'A versatile button component with multiple variants and sizes',
				props: [
					{
						name: 'variant',
						type: "'primary' | 'secondary' | 'ghost' | 'danger'",
						defaultValue: 'primary',
						required: false,
						description: 'Visual style variant of the button'
					},
					{
						name: 'size',
						type: "'sm' | 'md' | 'lg'",
						defaultValue: 'md',
						required: false,
						description: 'Size of the button'
					},
					{
						name: 'disabled',
						type: 'boolean',
						defaultValue: 'false',
						required: false,
						description: 'Whether the button is disabled'
					}
				],
				events: [
					{
						name: 'click',
						type: 'MouseEvent',
						description: 'Fired when the button is clicked'
					}
				],
				slots: [
					{
						name: 'default',
						description: 'Button content'
					}
				],
				examples: [
					{
						title: 'Basic Usage',
						code: '<Button variant="primary">Click me</Button>',
						language: 'svelte'
					}
				],
				accessibility: {
					keyboardNavigation: ['Enter and Space keys activate the button'],
					ariaAttributes: ['aria-disabled when disabled'],
					focusManagement: 'Receives focus and shows focus indicator'
				}
			}
		}
	}
};

export const GET: RequestHandler = async () => {
	return json(mockDocumentation);
};