import type { Snippet } from 'svelte';
interface Props {
    cols?: '1' | '2' | '3' | '4' | '6' | '12';
    gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
    children: Snippet;
}
declare const Grid: import("svelte").Component<Props, {}, "">;
type Grid = ReturnType<typeof Grid>;
export default Grid;
//# sourceMappingURL=Grid.svelte.d.ts.map