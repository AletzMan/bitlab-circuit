/* eslint-disable react-hooks/exhaustive-deps */

import { Edge, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { AnalogNode } from "@/types";
import { getNextDesignatorNumber } from "@/helpers";

export default function useShortcuts({
	undo,
	redo,
	removeNode,
	removeEdge,
	addNode,
}: {
	undo: () => void;
	redo: () => void;
	removeNode: (nodes: AnalogNode[]) => void;
	removeEdge: (edges: Edge[]) => void;
	addNode: (node: AnalogNode) => void;
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
					const selectedNodes = getNodes().filter((node) => node.selected) as AnalogNode[];
					if (selectedNodes?.length === 0) {
						const selectedEdges = getEdges().filter((edge) => edge.selected);
						removeEdge(selectedEdges);
						removeNode(selectedNodes);
					} else {
						const selectedNodeIds = new Set(selectedNodes?.map((node) => node.id));
						const nodeEdges: Edge[] = [];
						getEdges().forEach((element) => {
							if (selectedNodeIds.has(element.source) || selectedNodeIds.has(element.target)) {
								nodeEdges.push(element);
							}
						});
						removeEdge(nodeEdges);
						removeNode(selectedNodes);
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
		const selectedNodes = getNodes().filter((node) => node.selected) as AnalogNode[];
		if (selectedNodes?.length === 0) return;

		if (selectedNodes) {
			setNodes((prevNodes) => {
				const duplicatedNodes = selectedNodes?.map((node) => ({
					...node,
					id: uuid(),
					position: {
						x: node.position.x + 60,
						y: node.position.y + 60,
					},
					selected: true,
					data: {
						...node.data,
						designator: getNextDesignatorNumber(node.data.designator, getNodes() as AnalogNode[]),
					},
				}));

				duplicatedNodes.forEach((node) => addNode(node));

				return [
					...prevNodes.map((node) => (node.selected ? { ...node, selected: false } : node)),
					...duplicatedNodes,
				];
			});
		}
	};

	return { duplicateComponents };
}
