export interface TreeNode {
    id: string;
    label: string;
    icon?: string;
    children?: TreeNode[];
    expanded?: boolean;
}
import TreeView from './TreeView.svelte';
interface Props {
    nodes: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
}
declare const TreeView: import("svelte").Component<Props, {}, "">;
type TreeView = ReturnType<typeof TreeView>;
export default TreeView;
//# sourceMappingURL=TreeView.svelte.d.ts.map