import type { Snippet } from 'svelte';
interface Props {
    title: string;
    open?: boolean;
    children: Snippet;
}
declare const Accordion: import("svelte").Component<Props, {}, "open">;
type Accordion = ReturnType<typeof Accordion>;
export default Accordion;
//# sourceMappingURL=Accordion.svelte.d.ts.map