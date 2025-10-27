import type { PropDefinition, EventDefinition, SlotDefinition } from '../../docs/types.js';
interface Props {
    items: PropDefinition[] | EventDefinition[] | SlotDefinition[];
    type: 'props' | 'events' | 'slots';
}
declare const ComponentAPITable: import("svelte").Component<Props, {}, "">;
type ComponentAPITable = ReturnType<typeof ComponentAPITable>;
export default ComponentAPITable;
//# sourceMappingURL=ComponentAPITable.svelte.d.ts.map