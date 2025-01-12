/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from "react";
import { ComponentNode, HistoryAction } from "@/types";
import { Edge, useReactFlow } from "@xyflow/react";

type HistoryItem = {
    action: HistoryAction;
    data: ComponentNode | ComponentNode[] | Edge | Edge[] | undefined;
};

export default function useHistoryManager() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const currentIndex = useRef(-1);

    const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

    const addToHistory = useCallback(
        (newStates: HistoryItem[]) => {
            const newHistory = [...history].slice(0, currentIndex.current + 1);
            newStates.forEach(newState => {
                newHistory.push(newState);
            });
            setHistory(newHistory);
            currentIndex.current += 1;
        },
        [history]
    );

    const addNode = useCallback(
        (node: ComponentNode | undefined, shouldAddToHistory = true) => {
            if (node) setNodes((prevNodes) => prevNodes.concat(node));
            if (shouldAddToHistory)
                addToHistory([{
                    action: HistoryAction.AddNode,
                    data: node,
                }]);
        },
        [addToHistory, setNodes]
    );

    const addEdge = useCallback(
        (edge: Edge | undefined, shouldAddToHistory = true) => {
            if (edge) setEdges((prevEdges) => prevEdges.concat(edge));
            if (shouldAddToHistory) {

                addToHistory([{
                    action: HistoryAction.AddEdge,
                    data: edge,
                }]);
            }
        },
        [addToHistory, setEdges]
    );

    const removeNode = useCallback(
        (nodes: ComponentNode[] | undefined, shouldAddToHistory = true) => {
            if (nodes) {
                const filteredNodes = getNodes().filter(
                    node => !nodes.some(n => n.id === node.id)
                );
                setNodes(filteredNodes);
            }
            if (shouldAddToHistory) {
                addToHistory([{
                    action: HistoryAction.RemoveNode,
                    data: nodes,
                }]);
            }
        },
        [addToHistory, setNodes]
    );

    const removeEdge = useCallback(
        (edges: Edge[] | undefined, shouldAddToHistory = true) => {
            if (edges) {
                const filteredEdges = getEdges().filter(
                    edge => !edges.some(n => n.id === edge.id)
                );
                setEdges(filteredEdges);
            }
            if (shouldAddToHistory) {
                addToHistory([
                    {
                        action: HistoryAction.RemoveEdge,
                        data: edges,
                    },
                ]);
            }
        },
        [addToHistory, setEdges, getEdges]
    );

    const undo = useCallback(() => {
        const canUndo = currentIndex.current > -1;
        if (canUndo) {
            const { action, data } = history[currentIndex.current] || {};
            currentIndex.current -= 1;
            switch (action) {
                case HistoryAction.AddNode: {
                    removeNode([data as ComponentNode], false);
                    break;
                }
                case HistoryAction.AddEdge: {
                    removeEdge([data as Edge], false);
                    break;
                }
                case HistoryAction.RemoveNode: {
                    addNode(data as ComponentNode, false);
                    break;
                }
                case HistoryAction.RemoveEdge: {
                    addEdge(data as Edge, false);
                    break;
                }
            }
        }
    }, [addEdge, addNode, history, removeEdge, removeNode]);

    const redo = useCallback(() => {
        const canRedo = currentIndex.current < history.length - 1;
        if (canRedo) {
            currentIndex.current += 1;
            const { action, data } = history[currentIndex.current] || {};
            switch (action) {
                case HistoryAction.AddNode: {
                    addNode(data as ComponentNode, false);
                    break;
                }
                case HistoryAction.AddEdge: {
                    addEdge(data as Edge, false);
                    break;
                }
                case HistoryAction.RemoveNode: {
                    removeNode([data as ComponentNode], false);
                    break;
                }
                case HistoryAction.RemoveEdge: {
                    removeEdge([data as Edge], false);
                    break;
                }
            }
        }
    }, [addEdge, addNode, history, removeEdge, removeNode]);

    const canUndo = currentIndex.current > -1;
    const canRedo = currentIndex.current < history.length - 1;

    return { addNode, removeNode, addEdge, removeEdge, undo, redo, canUndo, canRedo };
}