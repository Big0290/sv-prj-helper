import type { Snippet } from 'svelte';

export interface StepperProps {
steps: Step[];
		currentStep?: number;
		variant?: 'default' | 'dots' | 'numbered' | 'arrows';
		orientation?: 'horizontal' | 'vertical';
		size?: 'sm' | 'md' | 'lg';
		clickable?: boolean;
		showConnector?: boolean;
		onStepClick?: (step: Step, index: number) => void;
}

export interface StepperEvents {
  // Add component events here
}

export interface StepperSlots {
  default: {};
}