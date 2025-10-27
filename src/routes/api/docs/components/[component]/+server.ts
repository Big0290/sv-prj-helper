import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Mock component documentation - in a real app this would come from generated documentation
const mockComponentDocs = {
	button: {
		name: 'Button',
		description: 'A versatile button component with multiple variants and sizes',
		category: 'atoms',
		version: '1.0.0',
		importPath: '@sv-project-helper/ui',
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
			},
			{
				name: 'loading',
				type: 'boolean',
				defaultValue: 'false',
				required: false,
				description: 'Shows loading state with spinner'
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
				description: 'Simple button with different variants',
				code: `<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="ghost">Ghost Button</Button>`,
				language: 'svelte'
			},
			{
				title: 'Button Sizes',
				description: 'Buttons in different sizes',
				code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
				language: 'svelte'
			},
			{
				title: 'Loading State',
				description: 'Button with loading indicator',
				code: `<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>`,
				language: 'svelte'
			}
		],
		accessibility: {
			keyboardNavigation: [
				'Enter and Space keys activate the button',
				'Tab key moves focus to the button'
			],
			ariaAttributes: [
				'aria-disabled when disabled',
				'aria-busy when loading'
			],
			focusManagement: 'Receives focus and shows visible focus indicator',
			guidelines: [
				'Use descriptive button text',
				'Ensure sufficient color contrast',
				'Provide alternative text for icon-only buttons'
			]
		},
		relatedComponents: ['Link', 'IconButton']
	}
};

export const GET: RequestHandler = async ({ params }) => {
	const componentName = params.component?.toLowerCase();
	
	if (!componentName || !mockComponentDocs[componentName as keyof typeof mockComponentDocs]) {
		throw error(404, {
			message: `Component "${params.component}" not found`,
			error: 'Component documentation not available'
		});
	}
	
	return json(mockComponentDocs[componentName as keyof typeof mockComponentDocs]);
};