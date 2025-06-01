/* eslint-disable react-hooks/exhaustive-deps */

import { Edge, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { AnalogNode } from "@/types";
import { getNextDesignatorNumber } from "@/helpers";
import { useHistory } from "@/contexts/HistoryContext";

export default function useShortcuts() {
	const { setNodes, getNodes, getEdges, updateNode } = useReactFlow();
	const { undo, redo, removeNode, removeEdge, addNode } = useHistory();

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
		let totalNodes = [...getNodes()];
		const selectedNodes = totalNodes.filter((node) => node.selected) as AnalogNode[];
		if (selectedNodes?.length === 0) return;

		if (selectedNodes) {
			for (let index = 0; index < selectedNodes.length; index++) {
				const node = selectedNodes[index];
				const duplicatedNode = {
					...node,
					id: uuid(),
					position: {
						x: node.position.x + (selectedNodes.length === 1 ? 60 : 120),
						y: node.position.y + (selectedNodes.length === 1 ? 60 : 0),
					},
					selected: true,
					data: {
						...node.data,
						designator: getNextDesignatorNumber(node.data.designator, totalNodes as AnalogNode[]),
					},
				};
				updateNode(node.id, { selected: false });
				addNode(duplicatedNode);
				totalNodes = [...totalNodes, duplicatedNode];
			}
		}
	};

	return { duplicateComponents };
}
