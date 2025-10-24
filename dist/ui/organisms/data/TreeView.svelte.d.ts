declare const TreeView: import("svelte").Component<{
    nodes: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
}, {}, "">;
type TreeView = ReturnType<typeof TreeView>;
export default TreeView;
