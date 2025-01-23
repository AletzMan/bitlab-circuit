import { useSelectedItems } from "@/store";

export function useSelectedItemsState() {
    const selectedNode = useSelectedItems((state) => state.selectedNode);
    const setSelectedNode = useSelectedItems((state) => state.setSelectedNode);
    const selectedNodes = useSelectedItems((state) => state.selectedNodes);
    const setSelectedNodes = useSelectedItems((state) => state.setSelectedNodes);
    const selectedEdge = useSelectedItems((state) => state.selectedEdge);
    const setSelectedEdge = useSelectedItems((state) => state.setSelectedEdge);
    const selectedEdges = useSelectedItems((state) => state.selectedEdges);
    const setSelectedEdges = useSelectedItems((state) => state.setSelectedEdges);
    const isSingleEdgeSelection = useSelectedItems((state) => state.isSingleEdgeSelection);
    const setIsSingleNodeSelection = useSelectedItems((state) => state.setIsSingleNodeSelection);
    const setIsSingleEdgeSelection = useSelectedItems((state) => state.setIsSingleEdgeSelection);

    return {
        selectedNode,
        setSelectedNode,
        selectedNodes,
        setSelectedNodes,
        selectedEdge,
        setSelectedEdge,
        selectedEdges,
        setSelectedEdges,
        isSingleEdgeSelection,
        setIsSingleNodeSelection,
        setIsSingleEdgeSelection,
    };
}
