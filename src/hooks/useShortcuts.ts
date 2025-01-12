import { ComponentNode } from "@/types";
import { Edge, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function useShortcuts({
    removeNode,
    removeEdge,
    undo,
    redo,
}: {
    removeNode: (node: ComponentNode[] | undefined) => void;
    removeEdge: (node: Edge[] | undefined) => void;
    undo: () => void;
    redo: () => void;
}) {
    const { setNodes, getNodes, getEdges } = useReactFlow();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key?.toLowerCase();

            switch (true) {
                case e.ctrlKey && key === "z": {
                    undo();
                    break;
                }
                case e.ctrlKey && key === "y": {
                    redo();
                    break;
                }
                case key === "delete": {
                    const selectedNodes = getNodes().filter((node) => node.selected) as ComponentNode[];
                    removeNode(selectedNodes);
                    if (selectedNodes.length === 0) {
                        const selectedEdges = getEdges().filter((edge) => edge.selected);
                        removeEdge(selectedEdges);
                    }
                    break;
                }
                case e.ctrlKey && e.altKey && key === "d": {
                    const selectedNode = getNodes().find((node) => node.selected);
                    if (!selectedNode) return;
                    setNodes((prevNodes) => {
                        return [
                            ...prevNodes.map((node) =>
                                node.selected ? { ...node, selected: false } : node
                            ),
                            {
                                ...selectedNode,
                                id: uuid(),
                                position: {
                                    x: selectedNode?.position?.x + 40,
                                    y: selectedNode?.position?.y + 40,
                                },
                                selected: true,
                            },
                        ];
                    });
                    break;
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [getNodes, removeNode, setNodes, undo, redo]);

    return null;
}