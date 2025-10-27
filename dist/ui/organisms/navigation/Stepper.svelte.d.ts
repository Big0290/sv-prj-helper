export interface Step {
    label: string;
    description?: string;
    icon?: string;
    status?: 'complete' | 'current' | 'upcoming' | 'error';
}
interface Props {
    steps: Step[];
    currentStep?: number;
    variant?: 'default' | 'dots' | 'numbered' | 'arrows';
    orientation?: 'horizontal' | 'vertical';
    size?: 'sm' | 'md' | 'lg';
    clickable?: boolean;
    showConnector?: boolean;
    onStepClick?: (step: Step, index: number) => void;
}
declare const Stepper: import("svelte").Component<Props, {}, "currentStep">;
type Stepper = ReturnType<typeof Stepper>;
export default Stepper;
//# sourceMappingURL=Stepper.svelte.d.ts.map