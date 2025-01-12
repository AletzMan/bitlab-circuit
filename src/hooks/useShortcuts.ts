/* eslint-disable react-hooks/exhaustive-deps */
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
                    duplicateComponents();
                    break;
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [getNodes, removeNode, setNodes, undo, redo, getEdges, removeEdge]);


    const duplicateComponents = () => {
        const selectedNodes = getNodes().filter((node) => node.selected);
        if (selectedNodes.length === 0) return;

        setNodes((prevNodes) => {
            const duplicatedNodes = selectedNodes.map((node) => ({
                ...node,
                id: uuid(),
                position: {
                    x: node.position.x + 60,
                    y: node.position.y + 60,
                },
                selected: true,
            }));

            return [
                ...prevNodes.map((node) =>
                    node.selected ? { ...node, selected: false } : node
                ),
                ...duplicatedNodes,
            ];
        });
    };


    return { duplicateComponents };
}