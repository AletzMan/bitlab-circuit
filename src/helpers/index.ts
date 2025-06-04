/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentsMap, TypeGroupKey, typeGroups } from "@/constants/components";
import {
	AnalogNode,
	ComponentEdge,
	ComponentProperties,
	ComponentType,
	EdgeData,
	Presets,
} from "../types";
import { XYPosition } from "@xyflow/react";
import { createRoot } from "react-dom/client";

export const isPointInBox = (
	point: { x: number; y: number },
	box: { x: number; y: number; height: number; width: number }
) => {
	return (
		point.x >= box.x &&
		point.x <= box.x + box.width &&
		point.y >= box.y &&
		point.y <= box.y + box.height
	);
};

export function getUnit(type: ComponentType) {
	let unit;
	switch (type) {
		case ComponentType.Resistor: {
			unit = "kΩ";
			break;
		}
		case ComponentType.Capacitor: {
			unit = "μF";
			break;
		}
	}
	return unit;
}

// Función para calcular la luminancia
export function getLuminance(hex: string): number {
	const [r, g, b] = hex
		.replace("#", "")
		.match(/.{2}/g)!
		.map((channel) => parseInt(channel, 16) / 255);

	const toLinear = (value: number) =>
		value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

	return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

// Función para verificar si hay buen contraste
export function hasGoodContrast(colorHex: string, theme: "dark" | "light"): boolean {
	const colorLuminance = getLuminance(colorHex);
	const themeLuminance = theme === "dark" ? 0 : 1;

	const contrastRatio =
		(Math.max(colorLuminance, themeLuminance) + 0.05) /
		(Math.min(colorLuminance, themeLuminance) + 0.05);

	return contrastRatio >= 4.5;
}

export function genPresets(customColors: { [key: string]: string[] }) {
	return Object.entries(customColors).map<Presets>(([label, colors]) => ({
		label,
		colors,
		key: label,
	}));
}

export function getComponentProperties(
	type: ComponentType,
	components: AnalogNode[]
): ComponentProperties {
	const designator = ComponentsMap[type]?.designator;
	if (!designator) {
		throw new Error(`Unknown component type: ${type}`);
	}

	// Buscar el grupo correspondiente al tipo
	const groupEntry = Object.entries(typeGroups).find(([_, group]) => group.types.has(type));

	let matchingComponents: AnalogNode[] = [];
	if (groupEntry) {
		const [, group] = groupEntry;
		matchingComponents = components.filter((component) => group.types.has(component.data.type));
	} else {
		matchingComponents = components.filter((component) => component.data.type === type);
	}

	const properties: ComponentProperties = {
		designator: `${designator}${matchingComponents.length + 1}`,
		prefix: ComponentsMap[type].prefix,
		unit: ComponentsMap[type].unit,
		prefix_optional: ComponentsMap[type].prefix_optional,
		unit_optional: ComponentsMap[type].unit_optional,
		value: ComponentsMap[type].value,
		value_optional: ComponentsMap[type].value_optional,
		state: ComponentsMap[type].state,
		collapsed: ComponentsMap[type].collapsed,
		icon: ComponentsMap[type].icon,
		category: ComponentsMap[type].category,
		componentType: ComponentsMap[type].componentType,
		type: ComponentsMap[type].type,
		has_properties: ComponentsMap[type].has_properties,
		isDesignatorVisible: ComponentsMap[type].isDesignatorVisible,
		isValueVisible: ComponentsMap[type].isValueVisible,
		isValueOptionalVisible: ComponentsMap[type].isValueOptionalVisible,
		connectedHandles: ComponentsMap[type].connectedHandles,
		color: ComponentsMap[type].color,
		size: ComponentsMap[type].size,
		style: ComponentsMap[type].style,
		name: ComponentsMap[type].name,
	};

	return properties;
}

const initialValues = Object.keys(ComponentsMap).reduce((acc, key) => {
	acc[key as ComponentType] = 0; // Asigna el valor inicial (por ejemplo, 0)
	return acc;
}, {} as Record<ComponentType, number>);

export function reorderComponentDesignators(components: AnalogNode[]): AnalogNode[] {
	const typeCounters: Record<
		| ComponentType
		| "DiodeGroup"
		| "CapacitorGroup"
		| "VariableCapacitorGroup"
		| "ResistorGroup"
		| "TransistorGroup"
		| "InductorGroup"
		| "SwitchGroup"
		| "RelayGroup"
		| "GateGroup",
		number
	> = {
		CapacitorGroup: 0,
		DiodeGroup: 0,
		VariableCapacitorGroup: 0,
		ResistorGroup: 0,
		TransistorGroup: 0,
		InductorGroup: 0,
		SwitchGroup: 0,
		RelayGroup: 0,
		GateGroup: 0,
		...initialValues,
	};

	return components.map((component) => {
		// Itera sobre el mapa para encontrar el grupo al que pertenece el tipo
		let groupKey: TypeGroupKey | undefined;
		for (const key in typeGroups) {
			if (typeGroups[key as TypeGroupKey].types.has(component.data.type)) {
				groupKey = key as TypeGroupKey;
				break;
			}
		}

		// Incrementar el contador correspondiente
		if (groupKey) {
			typeCounters[groupKey] += 1; // Aquí ya no dará error porque groupKey tiene el tipo correcto
		} else {
			// Si no pertenece a ningún grupo predefinido, usa el tipo directamente
			typeCounters[component.data.type] += 1; // Este tipo debe coincidir con las claves de typeCounters
		}

		// Generar la nueva referencia
		const newDesignator = groupKey
			? `${typeGroups[groupKey].designator}${typeCounters[groupKey]}` // Usa la primera letra del grupo
			: `${ComponentsMap[component.data.type].designator.toUpperCase()}${
					typeCounters[component.data.type]
			  }`;

		return {
			...component,
			data: {
				...component.data,
				designator: newDesignator,
			},
		};
	});
}

export function getImageBackgroundDrag(type: ComponentType): HTMLDivElement {
	let currentComponent: ComponentProperties | undefined = undefined;

	currentComponent = ComponentsMap[type];

	if (!currentComponent) currentComponent = ComponentsMap[type];

	const tempContainer = document.createElement("div");
	if (currentComponent) {
		tempContainer.className = "elementDrag";

		// Renderizar el ResistorIcon en el contenedor
		const root = createRoot(tempContainer as HTMLElement);
		root.render(currentComponent.icon);
		document.body.appendChild(tempContainer);

		// Usar el contenedor como la imagen de arrastre
		setTimeout(() => {
			root.unmount(); // Desmontar el componente
			document.body.removeChild(tempContainer);
		}, 0);
	}
	return tempContainer;
}

export const getNewPositionByOverlapping = (
	dragNodePosition: XYPosition,
	overlappingNodePosition: XYPosition
): XYPosition => {
	const widthNode = 60;
	const horizontalOverlapping: "right" | "left" | "none" =
		overlappingNodePosition.x === dragNodePosition.x
			? "none"
			: overlappingNodePosition.x > dragNodePosition.x
			? "left"
			: "right";
	const verticalOverlapping: "top" | "bottom" | "none" =
		overlappingNodePosition.y === dragNodePosition.y
			? "none"
			: overlappingNodePosition.y > dragNodePosition.y
			? "top"
			: "bottom";

	// Si no hay solapamiento en ninguna dirección, no mover el nodo
	if (horizontalOverlapping === "none" && verticalOverlapping === "none") {
		return {
			x: dragNodePosition.x + widthNode * 2, // Mover a la derecha
			y: dragNodePosition.y, // Mover hacia abajo
		};
	}
	// Desplazamientos predeterminados en caso de solapamiento
	let offsetX = verticalOverlapping === "none" ? 20 : 0;
	let offsetY = horizontalOverlapping === "none" ? 20 : 0;

	// Desplazar al lado más cercano en horizontal
	if (horizontalOverlapping !== "none") {
		const distanceLeft = dragNodePosition.x - overlappingNodePosition.x;
		const distanceRight = overlappingNodePosition.x - dragNodePosition.x;
		if (distanceLeft < distanceRight) {
			offsetX = widthNode; // Mover a la derecha
		} else {
			offsetX = -widthNode; // Mover a la izquierda
		}
	}

	// Desplazar al lado más cercano en vertical
	if (verticalOverlapping !== "none") {
		const distanceTop = dragNodePosition.y - overlappingNodePosition.y;
		const distanceBottom = overlappingNodePosition.y - dragNodePosition.y;

		if (distanceTop < distanceBottom) {
			offsetY = widthNode; // Mover hacia abajo
		} else {
			offsetY = -widthNode; // Mover hacia arriba
		}
	}

	return { x: dragNodePosition.x - offsetX, y: dragNodePosition.y - offsetY };
};

export function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
	return items.reduce((acc, item) => {
		const groupKey = String(item[key]); // Convertimos la clave a string
		if (!acc[groupKey]) {
			acc[groupKey] = [];
		}
		acc[groupKey].push(item);
		return acc;
	}, {} as Record<string, T[]>);
}

export function groupByToArray<T, K extends keyof T>(
	items: T[],
	key: K
): Array<{ category: T[K]; items: T[] }> {
	const grouped = items.reduce((acc, item) => {
		const groupKey = item[key];
		if (!acc.has(groupKey)) {
			acc.set(groupKey, []);
		}
		acc.get(groupKey)!.push(item);
		return acc;
	}, new Map<T[K], T[]>());

	// Convertimos el Map a un array de objetos con categoría e ítems
	return Array.from(grouped, ([category, items]) => ({
		category,
		items,
	}));
}

export function getNextDesignatorNumber(designator: string, nodes: AnalogNode[]): string {
	const quantityNodes = nodes.filter(
		(node) => node.data.designator.replace(/\d+/g, "") === designator.replace(/\d+/g, "")
	).length;
	const letterDesignator = designator.replace(/\d+/g, "");
	return `${letterDesignator}${quantityNodes + 1}`;
}

function buildGraph(edges: ComponentEdge[]): Map<string, Set<string>> {
	const graph = new Map<string, Set<string>>();

	for (const edge of edges) {
		const source = `${edge.source}:${edge.sourceHandle}`;
		const target = `${edge.target}:${edge.targetHandle}`;

		if (!graph.has(source)) graph.set(source, new Set());
		if (!graph.has(target)) graph.set(target, new Set());

		graph.get(source)!.add(target);
		graph.get(target)!.add(source); // Bidireccional
	}

	return graph;
}

function connectInternalTerminals(nodes: AnalogNode[], graph: Map<string, Set<string>>): void {
	for (const node of nodes) {
		const handles = node.data.connectedHandles;
		for (let i = 0; i < handles.length; i++) {
			for (let j = i + 1; j < handles.length; j++) {
				const h1 = `${node.id}:${i + 1}`;
				const h2 = `${node.id}:${j + 1}`;

				if (!graph.has(h1)) graph.set(h1, new Set());
				if (!graph.has(h2)) graph.set(h2, new Set());

				graph.get(h1)!.add(h2);
				graph.get(h2)!.add(h1);
			}
		}
	}
}

export function isSimulationReady(
	nodes: AnalogNode[],
	edges: ComponentEdge[]
): { isReady: boolean; message: string; updatedEdges: ComponentEdge[] } {
	const graph = buildGraph(edges);
	connectInternalTerminals(nodes, graph);

	const powerSources = nodes.filter((n) => ["battery", "powersupply"].includes(n.data.type));

	if (powerSources.length === 0) {
		return { isReady: false, message: "No hay fuente de energía.", updatedEdges: edges };
	}

	let allValidPaths: string[][] = [];

	for (const source of powerSources) {
		const handles = source.data.connectedHandles;

		const posIndex = handles.findIndex((h) => h.type === "positive");
		const negIndex = handles.findIndex((h) => h.type === "negative");

		if (
			posIndex !== -1 &&
			negIndex !== -1 &&
			handles[posIndex].isConnected &&
			handles[negIndex].isConnected
		) {
			const start = `${source.id}:${posIndex + 1}`;
			const end = `${source.id}:${negIndex + 1}`;

			const paths = findAllPaths(graph, start, end);
			const validPaths = paths.filter((p) => p.length > 2);

			allValidPaths.push(...validPaths);
		}
	}

	let updatedEdges = [...edges];

	if (allValidPaths.length > 0) {
		for (const path of allValidPaths) {
			updatedEdges = markEdgeFlowDirection(path, updatedEdges);
		}

		return {
			isReady: true,
			message: "Circuito cerrado con al menos un camino.",
			updatedEdges,
		};
	}

	return {
		isReady: false,
		message: "No se encontró un camino válido en el circuito.",
		updatedEdges,
	};
}

function findAllPaths(graph: Map<string, Set<string>>, start: string, end: string): string[][] {
	const paths: string[][] = [];
	const visited = new Set<string>();

	function dfs(current: string, path: string[]) {
		if (current === end) {
			paths.push([...path]);
			return;
		}

		visited.add(current);

		for (const neighbor of graph.get(current) || []) {
			if (!visited.has(neighbor)) {
				path.push(neighbor);
				dfs(neighbor, path);
				path.pop();
			}
		}

		visited.delete(current);
	}

	dfs(start, [start]);
	return paths;
}
type PathInfo = {
	sourceId: string;
	start: string;
	end: string;
	path: string[];
	nodesInPath: AnalogNode[];
};

export function getClosedCircuitPaths(nodes: AnalogNode[], edges: ComponentEdge[]): PathInfo[] {
	const graph = buildGraph(edges);
	connectInternalTerminals(nodes, graph);

	const powerSources = nodes.filter((n) => ["battery", "powersupply"].includes(n.data.type));

	const results: PathInfo[] = [];

	for (const source of powerSources) {
		const handles = source.data.connectedHandles;

		const posIndex = handles.findIndex((h) => h.type === "positive");
		const negIndex = handles.findIndex((h) => h.type === "negative");

		if (
			posIndex !== -1 &&
			negIndex !== -1 &&
			handles[posIndex].isConnected &&
			handles[negIndex].isConnected
		) {
			const start = `${source.id}:${posIndex + 1}`;
			const end = `${source.id}:${negIndex + 1}`;

			const paths = findAllPaths(graph, start, end);

			// Solo caminos de longitud mayor a 2
			const validPaths = paths.filter((p) => p.length > 2);

			for (const path of validPaths) {
				const nodeIds = new Set(path.map((handleId) => handleId.split(":")[0]));

				const nodesInPath = nodes.filter((n) => nodeIds.has(n.id));

				results.push({
					sourceId: source.id,
					start,
					end,
					path,
					nodesInPath,
				});
			}
		}
	}

	return results;
}

export type FlowDirection = "forward" | "backward" | "none";

export function markEdgeFlowDirection(path: string[], edges: ComponentEdge[]): ComponentEdge[] {
	const updatedEdgeIds = new Set<string>();
	const updatedEdges: ComponentEdge[] = [];

	for (let i = 0; i < path.length - 1; i++) {
		const from = path[i];
		const to = path[i + 1];

		const [fromNode, fromHandle] = from.split(":");
		const [toNode, toHandle] = to.split(":");

		const edge = edges.find(
			(e) =>
				(e.source === fromNode &&
					e.sourceHandle === fromHandle &&
					e.target === toNode &&
					e.targetHandle === toHandle) ||
				(e.source === toNode &&
					e.sourceHandle === toHandle &&
					e.target === fromNode &&
					e.targetHandle === fromHandle)
		);

		if (edge && !updatedEdgeIds.has(edge.id)) {
			const isForward =
				edge.source === toNode &&
				edge.sourceHandle === toHandle &&
				edge.target === fromNode &&
				edge.targetHandle === fromHandle;

			updatedEdgeIds.add(edge.id);

			updatedEdges.push({
				...edge,
				data: {
					...(edge.data as EdgeData),
					flowDirection: isForward ? "forward" : "backward",
				},
			});
		}
	}

	// Devolver una nueva lista con los edges modificados reemplazados
	return edges.map((edge) =>
		updatedEdgeIds.has(edge.id) ? updatedEdges.find((e) => e.id === edge.id)! : edge
	);
}
