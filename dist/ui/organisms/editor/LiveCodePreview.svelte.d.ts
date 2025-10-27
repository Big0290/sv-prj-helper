interface Props {
    initialHtml?: string;
    initialCss?: string;
    initialJs?: string;
    layout?: 'horizontal' | 'vertical';
    showPreview?: boolean;
    autoRun?: boolean;
    minHeight?: string;
}
declare const LiveCodePreview: import("svelte").Component<Props, {}, "showPreview">;
type LiveCodePreview = ReturnType<typeof LiveCodePreview>;
export default LiveCodePreview;
//# sourceMappingURL=LiveCodePreview.svelte.d.ts.map