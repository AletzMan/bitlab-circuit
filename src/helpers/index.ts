/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentsMap, TypeGroupKey, typeGroups } from "@/constants/components";
import {
	AnalogNode,
	Categories,
	ComponentEdge,
	ComponentProperties,
	ComponentType,
	EdgeData,
	Presets,
} from "../types";
import { XYPosition } from "@xyflow/react";
import { createRoot } from "react-dom/client";

/**
 * Verifica si un punto está dentro de un cuadrado.
 * @param point - El punto a verificar.
 * @param box - El cuadrado en el que se verificará.
 * @returns Un booleano que indica si el punto está dentro del cuadrado.
 */
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

/**
 * Obtiene la unidad de un componente.
 * @param type - El tipo del componente.
 * @returns Un string que representa la unidad del componente.
 */
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

/**
 * Calcula la luminancia de un color en formato hexadecimal.
 * @param hex - El color en formato hexadecimal.
 * @returns Un número que representa la luminancia del color.
 */
export function getLuminance(hex: string): number {
	const [r, g, b] = hex
		.replace("#", "")
		.match(/.{2}/g)!
		.map((channel) => parseInt(channel, 16) / 255);

	const toLinear = (value: number) =>
		value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

	return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Verifica si hay buen contraste.
 * @param colorHex - El color en formato hexadecimal.
 * @param theme - El tema ("dark" o "light").
 * @returns Un booleano que indica si hay buen contraste.
 */
export function hasGoodContrast(colorHex: string, theme: "dark" | "light"): boolean {
	const colorLuminance = getLuminance(colorHex);
	const themeLuminance = theme === "dark" ? 0 : 1;

	const contrastRatio =
		(Math.max(colorLuminance, themeLuminance) + 0.05) /
		(Math.min(colorLuminance, themeLuminance) + 0.05);

	return contrastRatio >= 4.5;
}

/**
 * Genera los presets para los colores.
 * @param customColors - Los colores personalizados.
 * @returns Un array de presets.
 */
export function genPresets(customColors: { [key: string]: string[] }) {
	return Object.entries(customColors).map<Presets>(([label, colors]) => ({
		label,
		colors,
		key: label,
	}));
}

/**
 * Obtiene las propiedades de un componente.
 * @param type - El tipo del componente.
 * @param components - Los componentes del circuito.
 * @returns Un objeto con las propiedades del componente.
 */
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

/**
 * Reordena los designadores de los componentes.
 * @param components - Los componentes a reordenar.
 * @returns Un array de componentes con los designadores reordenados.
 */
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

/**
 * Obtiene la imagen de arrastre para un componente.
 * @param type - El tipo del componente.
 * @returns Un div con la imagen de arrastre.
 */
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

/**
 * Obtiene la nueva posición de un nodo al solaparse con otro.
 * @param dragNodePosition - La posición del nodo que se está arrastrando.
 * @param overlappingNodePosition - La posición del nodo que se solapa.
 * @returns La nueva posición del nodo.
 */
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

/**
 * Agrupa los ítems en un objeto con claves y valores.
 * @param items - Los ítems a agrupar.
 * @param key - La clave por la que se agruparán los ítems.
 * @returns Un objeto con claves y valores.
 */
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

/**
 * Agrupa los ítems en un array de objetos con categoría e ítems.
 * @param items - Los ítems a agrupar.
 * @param key - La clave por la que se agruparán los ítems.
 * @returns Un array de objetos con categoría e ítems.
 */
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

/**
 * Obtiene el siguiente número de designador para un componente.
 * @param designator - El designador actual.
 * @param nodes - Los nodos del circuito.
 * @returns El siguiente número de designador.
 */
export function getNextDesignatorNumber(designator: string, nodes: AnalogNode[]): string {
	const quantityNodes = nodes.filter(
		(node) => node.data.designator.replace(/\d+/g, "") === designator.replace(/\d+/g, "")
	).length;
	const letterDesignator = designator.replace(/\d+/g, "");
	return `${letterDesignator}${quantityNodes + 1}`;
}

/**
 * Construye un gráfico a partir de las conexiones del circuito.
 * @param edges - Las conexiones del circuito.
 * @returns Un gráfico que representa el circuito.
 */
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

/**
 * Conecta los terminales internos de los nodos en el gráfico.
 * @param nodes - Los nodos del circuito.
 * @param graph - El gráfico que representa el circuito.
 */
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

/**
 * Verifica si el circuito está listo para la simulación.
 * @param nodes - Los nodos del circuito.
 * @param edges - Las conexiones del circuito.
 * @returns Un objeto que indica si el circuito está listo, un mensaje y las conexiones actualizadas.
 */
export function isSimulationReady(
	nodes: AnalogNode[],
	edges: ComponentEdge[]
): { isReady: boolean; message: string; updatedEdges: ComponentEdge[]; paths: string[][] } {
	const graph = buildGraph(edges);
	connectInternalTerminals(nodes, graph);
	const powerSources = nodes.filter((n) => ["battery", "powerSupply"].includes(n.type!));

	if (powerSources.length === 0) {
		return {
			isReady: false,
			message: "No hay fuente de energía.",
			updatedEdges: edges,
			paths: [],
		};
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

	if (allValidPaths.length === 0) {
		return {
			isReady: false,
			message: "No se encontró un camino válido en el circuito.",
			updatedEdges: edges,
			paths: [],
		};
	}

	// Validar polaridad consistente entre fuentes
	const consistentPaths = allValidPaths.filter((path) =>
		isPathPolarityConsistent(path, powerSources)
	);

	if (consistentPaths.length === 0) {
		return {
			isReady: false,
			message: "Hay conflictos de polaridad entre las fuentes de energía.",
			updatedEdges: edges,
			paths: [],
		};
	}

	// Marcar direcciones solo en caminos válidos y consistentes
	let updatedEdges = [...edges];
	for (const path of consistentPaths) {
		updatedEdges = markEdgeFlowDirection(path, updatedEdges);
	}

	return {
		isReady: true,
		message: "Circuito cerrado con al menos un camino válido y polaridad consistente.",
		updatedEdges,
		paths: consistentPaths,
	};
}

/**
 * Encuentra todos los caminos posibles en el gráfico.
 * @param graph - El gráfico que representa el circuito.
 * @param start - El nodo de inicio.
 * @param end - El nodo de fin.
 * @returns Un array de arrays que representan los caminos posibles.
 */
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

/**
 * Obtiene los caminos cerrados en el circuito.
 * @param nodes - Los nodos del circuito.
 * @param edges - Las conexiones del circuito.
 * @returns Un array de objetos que representan los caminos cerrados.
 */
function getClosedCircuitPaths(
	nodes: AnalogNode[],
	edges: ComponentEdge[],
	paths: string[][]
): PathInfo[] {
	const graph = buildGraph(edges);
	connectInternalTerminals(nodes, graph);

	const powerSources = nodes.filter((n) => ["battery", "powerSupply"].includes(n.type!));

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

			//const paths = findAllPaths(graph, start, end);

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

export type FlowDirection = "forward" | "backward";

/**
 * Marca la dirección de las aristas en el circuito.
 * @param path - El camino que se va a marcar.
 * @param edges - Las aristas del circuito.
 * @returns Un array de aristas actualizadas.
 */
function markEdgeFlowDirection(path: string[], edges: ComponentEdge[]): ComponentEdge[] {
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

/**
 * Verifica si el circuito está cerrado y tiene una polaridad consistente.
 * @param path - El camino que se va a verificar.
 * @param powerSources - Las fuentes de energía del circuito.
 * @returns Un booleano que indica si el circuito está cerrado y tiene una polaridad consistente.
 */
function isPathPolarityConsistent(path: string[], powerSources: AnalogNode[]): boolean {
	//Iterar sobre las fuentes de energía del circuito para verificar si el circuito está cerrado y tiene una polaridad consistente.
	for (let i = 0; i < powerSources.length; i++) {
		const source = powerSources[i];
		const handles = source.data.connectedHandles;
		const posIndex = handles.findIndex((h) => h.type === "positive");
		const negIndex = handles.findIndex((h) => h.type === "negative");

		if (posIndex === -1 || negIndex === -1) continue;

		const posHandle = `${source.id}:${posIndex + 1}`;
		const negHandle = `${source.id}:${negIndex + 1}`;

		const posIdx = path.indexOf(posHandle);
		const negIdx = path.indexOf(negHandle);

		if (posIdx !== -1 && negIdx !== -1) {
			// Corriente convencional: entra por positivo y sale por negativo → positivo debe ir antes
			if (posIdx < negIdx && i === 0) {
				continue; // OK
			} else if (posIdx > negIdx && i > 0) {
				continue; // OK
			} else {
				return false; // conflicto de polaridad
			}
		}
	}

	return true;
}

type NodeVoltageResult = {
	nodeId: string;
	voltageMeasurement: number; // Voltaje absoluto en el nodo, respecto a la referencia (0V en tierra)
	current: number;
};

// Nuevo tipo para la caída de voltaje A TRAVÉS de un COMPONENTE
type ComponentVoltageDropResult = {
	componentId: string; // El ID del nodo del componente (ej. la resistencia)
	voltageDrop: number; // La caída de voltaje en voltios A TRAVÉS de ese componente
	current: number; // La corriente que fluye a través de ese componente
};

// Mantén EdgeVoltageDropResult si aún quieres mostrar el voltaje de la línea/edge (inicio de la línea)
// O elimínalo si solo necesitas nodeVoltages y componentVoltageDrops.
// Si lo mantienes, recuerda que 'voltageDrop' en este tipo representa 'voltageAtStartOfEdge'.
type EdgeVoltageDropResult = {
	edgeId: string;
	voltage: number; // Aquí sigue siendo el voltaje al inicio de la línea/edge
	current: number;
};

interface NodeStateChange {
	id: string;
	state: { on: boolean };
}

// Interfaz para los resultados combinados de la simulación
interface CombinedCircuitResults {
	nodeVoltages: NodeVoltageResult[];
	componentVoltageDrops: ComponentVoltageDropResult[];
	edgeVoltagesAtStart: EdgeVoltageDropResult[]; // Asumiendo que esta es la interfaz correcta que tienes
	nodeStateChanges: NodeStateChange[]; // Nueva: para devolver los cambios de estado de los nodos
}

/**
 * Calcula tanto el voltaje absoluto en el inicio de cada arista/componente
 * como los voltajes absolutos en los nodos/uniones para un path dado,
 * las caídas de voltaje a través de los componentes, y los cambios de estado de los nodos.
 *
 * @param path Una secuencia de IDs de handles (e.g., "nodeId:handleId") que define el camino del circuito.
 * @param totalCurrent La corriente que fluye a través de este path específico (YA CALCULADA).
 * @param allEdges Todas las aristas del circuito.
 * @param allNodes Todos los nodos (incluyendo componentes como resistencias).
 * @param sourceVoltage El voltaje de la fuente que alimenta este path (e.g., 12V).
 * @returns Un objeto que contiene: `nodeVoltages`, `componentDrops`, `edgeVoltagesAtStart`, `nodeStateChanges`.
 */
export function calculateVoltageDropPerEdge(
	edges: ComponentEdge[],
	nodes: AnalogNode[],
	paths: string[][]
): CombinedCircuitResults {
	const pathsInfo = getClosedCircuitPaths(nodes, edges, paths); // Asume que esta función existe y es correcta
	const allNodeVoltages: NodeVoltageResult[] = [];
	const allComponentVoltageDrops: ComponentVoltageDropResult[] = [];
	const allEdgeVoltagesAtStart: EdgeVoltageDropResult[] = [];
	const allNodeStateChanges: NodeStateChange[] = [];

	const pathGroups = new Map<string, PathInfo[]>();
	for (const pathInfo of pathsInfo) {
		const key = `${pathInfo.sourceId}-${pathInfo.start}-${pathInfo.end}`;
		if (!pathGroups.has(key)) pathGroups.set(key, []);
		pathGroups.get(key)!.push(pathInfo);
	}

	for (const group of pathGroups.values()) {
		const sourceNode = nodes.find((n) => n.id === group[0].sourceId);
		const V_source = Number(sourceNode?.data.value ?? 5);

		for (const currentPathInfo of group) {
			const currentPath = currentPathInfo.path;

			// PRIMERO: Verificar si el camino está ABIERTO por un LED invertido o un switch.
			const pathIsEffectivelyOpen = isPathEffectivelyOpen(currentPath, nodes);

			let totalCurrentForThisPath = 0;

			if (pathIsEffectivelyOpen) {
				totalCurrentForThisPath = 0; // Si el camino está abierto, la corriente es CERO.
			} else {
				// Si el camino está CERRADO, calcula la corriente normalmente.
				const ohmicResistance = getTotalResistance(currentPath, edges, nodes);
				const fixedVoltageDrops = getFixedVoltageDropsInPath(currentPath, nodes, edges);
				const effectiveVoltage = V_source - fixedVoltageDrops;

				if (ohmicResistance === 0) {
					if (effectiveVoltage > 0) {
						console.warn(
							`Path ${currentPath.join(
								"->"
							)} has fixed drops (${fixedVoltageDrops}V) less than source (${V_source}V) but zero ohmic resistance. Short circuit. Current set to 0 to avoid Infinity.`
						);
						totalCurrentForThisPath = 0;
					} else {
						totalCurrentForThisPath = 0; // No hay suficiente voltaje para superar las caídas fijas
					}
				} else {
					if (effectiveVoltage <= 0) {
						totalCurrentForThisPath = 0; // Voltaje efectivo cero o negativo, no hay corriente
					} else {
						totalCurrentForThisPath = effectiveVoltage / ohmicResistance;
					}
				}
			}
			// AHORA LLAMA A calculatePathVoltages con la corriente ya determinada.
			const { nodeVoltages, componentDrops, edgeVoltagesAtStart, nodeStateChanges } =
				calculatePathVoltages(currentPath, totalCurrentForThisPath, edges, nodes, V_source);

			allNodeVoltages.push(...nodeVoltages);
			allComponentVoltageDrops.push(...componentDrops);
			allEdgeVoltagesAtStart.push(...edgeVoltagesAtStart);
			allNodeStateChanges.push(...nodeStateChanges);
		}
	}

	// --- Deduplicar resultados finales ---
	const uniqueNodeVoltagesMap = new Map<string, NodeVoltageResult>();
	for (const r of allNodeVoltages) {
		// La última medición de voltaje para un nodo sobrescribe la anterior.
		// Si hay múltiples paths que pasan por el mismo nodo, esta lógica podría necesitar un ajuste
		// más complejo si el voltaje en ese nodo varía significativamente entre los paths.
		// Para circuitos simples en serie/paralelo, esto suele ser suficiente.
		uniqueNodeVoltagesMap.set(r.nodeId, r);
	}

	const uniqueComponentDropsMap = new Map<string, ComponentVoltageDropResult>();
	for (const r of allComponentVoltageDrops) {
		uniqueComponentDropsMap.set(r.componentId, r);
	}

	const uniqueEdgeVoltagesAtStartMap = new Map<string, EdgeVoltageDropResult>();
	for (const r of allEdgeVoltagesAtStart) {
		uniqueEdgeVoltagesAtStartMap.set(r.edgeId, r);
	}

	// Los cambios de estado de los nodos también deben ser únicos por nodo,
	// y fusionar los newState para no perder propiedades si se actualizan múltiples veces.
	const uniqueNodeStateChangesMap = new Map<string, NodeStateChange>();
	for (const change of allNodeStateChanges) {
		uniqueNodeStateChangesMap.set(change.id, {
			id: change.id,
			state: {
				...(uniqueNodeStateChangesMap.get(change.id)?.state || {}),
				...change.state,
			},
		});
	}
	return {
		nodeVoltages: Array.from(uniqueNodeVoltagesMap.values()),
		componentVoltageDrops: Array.from(uniqueComponentDropsMap.values()),
		edgeVoltagesAtStart: Array.from(uniqueEdgeVoltagesAtStartMap.values()),
		nodeStateChanges: Array.from(uniqueNodeStateChangesMap.values()),
	};
}

/**
 * Calcula las caídas de voltaje en un camino dado, actualizando los voltajes de los nodos y los estados de los componentes.
 *
 * @param path - Un array ordenado de IDs de handles que define el camino a analizar.
 * @param initialTotalCurrent - La corriente total que fluye a través del camino.
 * @param allEdges - Todas las aristas del circuito.
 * @param allNodes - Todos los nodos del circuito.
 * @param sourceVoltage - El voltaje inicial en el comienzo del camino (ej. el voltaje de la fuente).
 * @returns Un objeto que contiene:
 * - `nodeVoltages`: Voltajes medidos en cada nodo del camino.
 * - `componentDrops`: Caídas de voltaje a través de cada componente.
 * - `edgeVoltagesAtStart`: Voltajes al inicio de cada arista.
 * - `nodeStateChanges`: Cambios de estado (ej. LED on/off, switch on/off).
 */
export function calculatePathVoltages(
	path: string[],
	initialTotalCurrent: number, // <-- Este es el valor de corriente que usaremos
	allEdges: ComponentEdge[],
	allNodes: AnalogNode[],
	sourceVoltage: number
): {
	nodeVoltages: NodeVoltageResult[];
	componentDrops: ComponentVoltageDropResult[];
	edgeVoltagesAtStart: EdgeVoltageDropResult[];
	nodeStateChanges: NodeStateChange[];
} {
	const nodeVoltages: NodeVoltageResult[] = [];
	const componentDrops: ComponentVoltageDropResult[] = [];
	const edgeVoltagesAtStart: EdgeVoltageDropResult[] = [];
	const nodeStateChanges: NodeStateChange[] = [];

	let currentVoltageAtNode = sourceVoltage;
	let totalCurrent = initialTotalCurrent; // USAMOS LA CORRIENTE RECIBIDA

	// --- NUEVA CONSTANTE PARA EL UMBRAL DE CORRIENTE DEL LED ---
	const MIN_LED_ON_CURRENT_AMPS = 0.02; // 20mA

	const visitedEdges = new Set<string>();
	// Este set rastreará los IDs de componentes para los cuales ya hemos calculado y aplicado su caída de voltaje
	// en este camino específico, evitando duplicidades.
	const processedComponentDropIds = new Set<string>();

	// Bandera para indicar si el camino ha sido roto por un interruptor abierto
	let isPathBroken = false;

	// 1. Registrar el voltaje en el nodo inicial del path (ej. la fuente positiva)
	let initialNodeId: string | undefined;
	if (path.length > 0) {
		initialNodeId = path[0].split(":")[0];
		nodeVoltages.push({
			nodeId: initialNodeId,
			voltageMeasurement: currentVoltageAtNode,
			current: totalCurrent,
		});
	}

	// 2. Recorrer el path segmento por segmento (a través de los handles y edges)
	for (let i = 0; i < path.length - 1; i++) {
		// Si el camino ya ha sido roto, la corriente y el voltaje serán 0 para los segmentos restantes.
		// Ya no usamos 'continue' aquí, permitimos que el resto del bucle se ejecute para registrar 0V/0A.
		if (isPathBroken) {
			totalCurrent = 0;
			currentVoltageAtNode = 0;
		}

		const fromHandleId = path[i];
		const toHandleId = path[i + 1];

		const edge = findEdgeBetween(fromHandleId, toHandleId, allEdges);

		if (!edge || visitedEdges.has(edge.id)) {
			continue;
		}

		const node1 = allNodes.find((n) => n.id === edge.source);
		const node2 = allNodes.find((n) => n.id === edge.target);

		let componentNodeInSegment: AnalogNode | undefined;
		const excludedNodeTypes = ["battery", "powerSupply", "node", "board", "wire", "ground"];

		// Prioridad 1: Si el 'node2' (destino de la arista) es un componente y no ha sido procesado aún.
		// Esto es crucial para detectar el siguiente componente en serie.
		if (
			node2 &&
			!excludedNodeTypes.includes(node2.type!) &&
			!processedComponentDropIds.has(node2.id)
		) {
			componentNodeInSegment = { ...node2 }; // Usar una copia para consistencia con el código original
		}
		// Prioridad 2: Si el 'node1' (origen de la arista) es un componente y no ha sido procesado aún.
		// Esto cubre casos donde el path podría comenzar directamente en un componente o si el 'node2' no es un componente.
		else if (
			node1 &&
			!excludedNodeTypes.includes(node1.type!) &&
			!processedComponentDropIds.has(node1.id)
		) {
			componentNodeInSegment = { ...node1 }; // Usar una copia para consistencia con el código original
		}

		// --- PROCESAR COMPONENTES (Resistores, LEDs, Switches) ---
		// Esto se hace una vez por componente encontrado en el path si no ha sido procesado antes.
		// Aquí se actualiza el estado y se registra en `componentDrops`.
		if (componentNodeInSegment && !processedComponentDropIds.has(componentNodeInSegment.id)) {
			let voltageDropForComponentDisplay = 0; // La caída para mostrar en `componentDrops`

			// Lógica para Resistor: Obtener su valor de resistencia y calcular su caída
			if (componentNodeInSegment.data.type === ComponentType.Resistor) {
				const resistanceValue =
					Number(componentNodeInSegment.data.value ?? 0) *
					getMultiplier(componentNodeInSegment.data.prefix!); // Asume que getMultiplier existe

				if (totalCurrent > 0) {
					voltageDropForComponentDisplay = totalCurrent * resistanceValue;
				}

				componentDrops.push({
					componentId: componentNodeInSegment.id,
					voltageDrop: voltageDropForComponentDisplay,
					current: totalCurrent,
				});
			}
			// Lógica para Diodo/LED: Determinar estado (on/off) y registrar caída
			else if (
				componentNodeInSegment.data.type === ComponentType.Diode ||
				componentNodeInSegment.data.type === ComponentType.Led
			) {
				const forwardVoltageValue = Number(componentNodeInSegment.data.value_optional ?? 0);

				// Determinar si el LED está correctamente polarizado (lógica ya existente)
				let isLEDProperlyOriented = false;
				const currentFromNodeId = fromHandleId.split(":")[0];
				const currentFromHandleName = fromHandleId.split(":")[1];
				const currentToNodeId = toHandleId.split(":")[0];
				const currentToHandleName = toHandleId.split(":")[1];

				if (
					(currentToNodeId === componentNodeInSegment.id && currentToHandleName === "1") ||
					(currentFromNodeId === componentNodeInSegment.id && currentFromHandleName === "2") ||
					(currentFromNodeId === componentNodeInSegment.id &&
						currentToNodeId === componentNodeInSegment.id &&
						currentFromHandleName === "1" &&
						currentToHandleName === "2")
				) {
					isLEDProperlyOriented = true;
				}

				// --- CAMBIO AQUÍ: Añadir el umbral de corriente para encender el LED ---
				if (
					totalCurrent >= MIN_LED_ON_CURRENT_AMPS &&
					forwardVoltageValue > 0 &&
					isLEDProperlyOriented
				) {
					nodeStateChanges.push({ id: componentNodeInSegment.id, state: { on: true } });
				} else {
					nodeStateChanges.push({ id: componentNodeInSegment.id, state: { on: false } });
				}

				// Registrar la caída de voltaje en componentDrops para el LED
				// Incluso si la corriente es 0, el componente se registra con 0V de caída o su Vf si hay corriente y polarización
				if (totalCurrent > 0 && isLEDProperlyOriented) {
					// La caída de voltaje sí ocurre si hay cualquier corriente y está polarizado
					voltageDropForComponentDisplay = forwardVoltageValue;
				} else {
					voltageDropForComponentDisplay = 0; // No hay corriente o no está bien polarizado
				}

				componentDrops.push({
					componentId: componentNodeInSegment.id,
					voltageDrop: voltageDropForComponentDisplay,
					current: totalCurrent,
				});
			}
			// Lógica para Switches: Determinar estado (on/off) y afectar la corriente del camino
			else if (componentNodeInSegment.data.category === Categories["Switches & Relays"]) {
				if (componentNodeInSegment.data.state?.on === true) {
					// Si el interruptor está cerrado, permite el paso de corriente, no hay caída de voltaje ideal
					nodeStateChanges.push({ id: componentNodeInSegment.id, state: { on: true } });
					voltageDropForComponentDisplay = 0; // Caída de voltaje de 0V para un interruptor cerrado ideal
				} else {
					// Si el interruptor está abierto, no permite el paso de corriente
					nodeStateChanges.push({ id: componentNodeInSegment.id, state: { on: false } });
					voltageDropForComponentDisplay = currentVoltageAtNode; // El interruptor abierto "cae" todo el voltaje restante
					totalCurrent = 0; // La corriente se vuelve 0 para el resto del camino
					isPathBroken = true; // Marca el camino como roto
				}
				componentDrops.push({
					componentId: componentNodeInSegment.id,
					voltageDrop: voltageDropForComponentDisplay,
					current: totalCurrent, // Esto será 0 si el interruptor está abierto
				});
			}

			// Marca el componente como procesado para este path
			processedComponentDropIds.add(componentNodeInSegment.id);
		}

		// --- REGISTRAR VOLTAJE DE LA ARISTA ACTUAL ---
		// Esto siempre se hace para cada segmento recorrido
		edgeVoltagesAtStart.push({
			edgeId: edge.id,
			voltage: currentVoltageAtNode,
			current: totalCurrent,
		});
		visitedEdges.add(edge.id);

		// --- Aplicar caídas de voltaje para la PROPAGACIÓN del voltaje ---
		// Esto afecta a `currentVoltageAtNode` para el siguiente nodo
		let voltageDropForPropagation = 0;

		// Las caídas de voltaje para propagación solo ocurren si hay corriente
		if (totalCurrent > 0) {
			if (componentNodeInSegment) {
				if (componentNodeInSegment.data.type === ComponentType.Resistor) {
					const resistanceValue =
						Number(componentNodeInSegment.data.value ?? 0) *
						getMultiplier(componentNodeInSegment.data.prefix!);
					voltageDropForPropagation = totalCurrent * resistanceValue;
				} else if (
					componentNodeInSegment.data.type === ComponentType.Diode ||
					componentNodeInSegment.data.type === ComponentType.Led
				) {
					// Se necesita re-verificar polarización aquí para aplicar la caída
					let isLEDProperlyOriented = false;
					const currentFromNodeId = fromHandleId.split(":")[0];
					const currentFromHandleName = fromHandleId.split(":")[1];
					const currentToNodeId = toHandleId.split(":")[0];
					const currentToHandleName = toHandleId.split(":")[1];

					if (
						(currentToNodeId === componentNodeInSegment.id && currentToHandleName === "1") ||
						(currentFromNodeId === componentNodeInSegment.id && currentFromHandleName === "2") ||
						(currentFromNodeId === componentNodeInSegment.id &&
							currentToNodeId === componentNodeInSegment.id &&
							currentFromHandleName === "1" &&
							currentToHandleName === "2")
					) {
						isLEDProperlyOriented = true;
					}
					// Aplica la caída solo si hay corriente y está correctamente polarizado
					if (isLEDProperlyOriented) {
						voltageDropForPropagation = Number(componentNodeInSegment.data.value_optional ?? 0);
					}
				}
				// Para switches, la lógica de totalCurrent = 0 y isPathBroken = true ya maneja la propagación
				// haciendo que currentVoltageAtNode se convierta en 0 en la siguiente iteración.
			}
		} else {
			// Si la corriente total es 0 (ej. por un interruptor abierto o no hay fuente),
			// el voltaje en los nodos subsiguientes cae a 0.
			currentVoltageAtNode = 0;
			voltageDropForPropagation = 0; // No hay caída si no hay corriente
		}

		currentVoltageAtNode -= voltageDropForPropagation; // Aplica la caída para el siguiente nodo

		// 4. Registrar el voltaje en el nodo al que llegamos (`toHandleId`).
		const currentSegmentToNodeId = toHandleId.split(":")[0];

		// Solo registra si no es el nodo inicial (ya registrado)
		if (currentSegmentToNodeId !== initialNodeId) {
			const existingNodeVoltageIndex = nodeVoltages.findIndex(
				(res) => res.nodeId === currentSegmentToNodeId
			);

			if (existingNodeVoltageIndex !== -1) {
				// Actualiza el voltaje si ya está en la lista (maneja múltiples caminos llegando al mismo nodo)
				nodeVoltages[existingNodeVoltageIndex].voltageMeasurement = currentVoltageAtNode;
				nodeVoltages[existingNodeVoltageIndex].current = totalCurrent;
			} else {
				// Añade el nuevo nodo a la lista de voltajes
				nodeVoltages.push({
					nodeId: currentSegmentToNodeId,
					voltageMeasurement: currentVoltageAtNode,
					current: totalCurrent,
				});
			}
		}
	}
	return { nodeVoltages, componentDrops, edgeVoltagesAtStart, nodeStateChanges };
}

/**
 * Obtiene el multiplicador correspondiente al prefijo de resistencia.
 * @param prefix - El prefijo de la resistencia (Ω, kΩ, MΩ).
 * @returns El multiplicador correspondiente al prefijo.
 */
function getMultiplier(prefix: string): number {
	switch (prefix) {
		case "Ω":
			return 1;
		case "kΩ":
			return 1000;
		case "MΩ":
			return 1000000;
		default:
			return 1;
	}
}

/**
 * Calcula la resistencia total de un camino.
 * @param path - El array de IDs de handles que define el camino.
 * @param edges - Todas las aristas del circuito.
 * @param nodes - Todos los nodos del circuito.
 * @returns La resistencia óhmica total del camino.
 */
function getTotalResistance(path: string[], edges: ComponentEdge[], nodes: AnalogNode[]): number {
	let totalResistance = 0;
	const processedComponentNodes = new Set<string>();

	for (let i = 0; i < path.length - 1; i++) {
		const fromHandleId = path[i];
		const toHandleId = path[i + 1];
		const edge = findEdgeBetween(fromHandleId, toHandleId, edges);
		if (!edge) continue;

		const node1 = nodes.find((n) => n.id === edge.source);
		const node2 = nodes.find((n) => n.id === edge.target);

		let componentNode: AnalogNode | undefined;
		if (
			node1 &&
			!["battery", "powerSupply", "node", "board", "wire", "ground"].includes(node1.type!) &&
			!processedComponentNodes.has(node1.id)
		) {
			componentNode = node1;
		} else if (
			node2 &&
			!["battery", "powerSupply", "node", "board", "wire", "ground"].includes(node2.type!) &&
			!processedComponentNodes.has(node2.id)
		) {
			componentNode = node2;
		}
		if (componentNode && componentNode.data.type === ComponentType.Resistor) {
			totalResistance +=
				Number(componentNode.data.value ?? 0) * getMultiplier(componentNode.data.prefix!);
			processedComponentNodes.add(componentNode.id);
		}
	}
	return totalResistance;
}

/**
 * Encuentra la arista que conecta dos nodos.
 * @param from - El nodo de origen.
 * @param to - El nodo de destino.
 * @param edges - Las aristas del circuito.
 * @returns La arista que conecta los nodos o undefined si no se encuentra.
 */
function findEdgeBetween(
	from: string,
	to: string,
	edges: ComponentEdge[]
): ComponentEdge | undefined {
	const [fromNode, fromHandle] = from.split(":");
	const [toNode, toHandle] = to.split(":");

	return edges.find(
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
}

/**
 * Calcula las caídas de voltaje fijas (e.g., de diodos/LEDs polarizados directamente) en un camino.
 * @param path - El array de IDs de handles que define el camino.
 * @param nodes - Todos los nodos del circuito.
 * @param edges - Todas las aristas del circuito.
 * @returns La suma de las caídas de voltaje fijas.
 */
// index.ts
function getFixedVoltageDropsInPath(
	path: string[],
	nodes: AnalogNode[],
	edges: ComponentEdge[]
): number {
	let totalFixedDrop = 0;
	const processedComponentNodes = new Set<string>();

	for (let i = 0; i < path.length - 1; i++) {
		const fromHandleId = path[i];
		const toHandleId = path[i + 1];
		const edge = findEdgeBetween(fromHandleId, toHandleId, edges);
		if (!edge) continue;

		const node1 = nodes.find((n) => n.id === edge.source);
		const node2 = nodes.find((n) => n.id === edge.target);

		let componentNode: AnalogNode | undefined;
		if (
			node1 &&
			!["battery", "powerSupply", "node", "board", "wire", "ground"].includes(node1.type!) &&
			!processedComponentNodes.has(node1.id)
		) {
			componentNode = node1;
		} else if (
			node2 &&
			!["battery", "powerSupply", "node", "board", "wire", "ground"].includes(node2.type!) &&
			!processedComponentNodes.has(node2.id)
		) {
			componentNode = node2;
		}

		if (componentNode) {
			// Si tu lógica para `isLEDProperlyOriented` NO está en esta función,
			// entonces asume que el LED siempre está bien polarizado para esta depuración,
			// o revisa dónde se calcula y usa esa variable.
			// Por ahora, para la depuración, vamos a asumir que si es un LED, se suma el Vf.
			// Si hay una lógica de polaridad global, la veremos más tarde.
			if (
				componentNode.data.type === ComponentType.Diode ||
				componentNode.data.type === ComponentType.Led
			) {
				const forwardVoltageValue = Number(componentNode.data.value_optional ?? 0);
				totalFixedDrop += forwardVoltageValue;
				processedComponentNodes.add(componentNode.id);
			}
		}
	}
	return totalFixedDrop;
}

/**
 * Verifica si un camino contiene un componente que causa un circuito abierto,
 * como un interruptor abierto o un LED/Diodo polarizado inversamente.
 *
 * @param path El array de IDs de handles que define el camino.
 * @param nodes Todos los nodos del circuito.
 * @param edges Todas las aristas del circuito (necesario para determinar la orientación del LED).
 * @returns true si se encuentra un componente que abre el circuito, false en caso contrario.
 */
function isPathEffectivelyOpen(path: string[], nodes: AnalogNode[]): boolean {
	const processedComponentNodes = new Set<string>(); // Este set es local y solo para esta función

	for (let i = 0; i < path.length - 1; i++) {
		const fromHandleId = path[i];
		const toHandleId = path[i + 1];

		const node1 = nodes.find((n) => n.id === fromHandleId.split(":")[0]);
		const node2 = nodes.find((n) => n.id === toHandleId.split(":")[0]);

		let componentNode: AnalogNode | undefined;

		// Identificamos el nodo del componente (no fuentes, ground, cables, etc.)
		// y aseguramos que no se procese dos veces si el path pasa por sus handles.
		if (
			node1 &&
			!["battery", "powerSupply", "node", "board", "wire", "ground"].includes(node1.type!) &&
			!processedComponentNodes.has(node1.id)
		) {
			componentNode = node1;
		} else if (
			node2 &&
			!["battery", "powerSupply", "node", "board", "wire", "ground"].includes(node2.type!) &&
			!processedComponentNodes.has(node2.id)
		) {
			componentNode = node2;
		}

		if (componentNode) {
			// Lógica para Switches
			if (
				componentNode.data.category === Categories["Switches & Relays"] &&
				(componentNode.data.state?.on === false || componentNode.data.state?.on === undefined)
			) {
				return true; // Interruptor abierto
			}
			// Lógica para Diodos y LEDs (verificar polarización)
			else if (
				componentNode.data.type === ComponentType.Diode ||
				componentNode.data.type === ComponentType.Led
			) {
				let isLEDProperlyOriented = false;

				const currentFromNodeId = fromHandleId.split(":")[0];
				const currentFromHandleName = fromHandleId.split(":")[1];
				const currentToNodeId = toHandleId.split(":")[0];
				const currentToHandleName = toHandleId.split(":")[1];

				// Asumiendo que el ánodo es handle '1' y el cátodo es handle '2'.
				// Corriente debe entrar por '1' y salir por '2'.
				if (
					(currentToNodeId === componentNode.id && currentToHandleName === "1") || // La corriente entra por el ánodo (handle 1)
					(currentFromNodeId === componentNode.id && currentFromHandleName === "2") || // La corriente sale por el cátodo (handle 2)
					// Si el edge conecta directamente el handle '1' al handle '2' dentro del mismo componente (path "LED:1" -> "LED:2")
					(currentFromNodeId === componentNode.id &&
						currentToNodeId === componentNode.id &&
						currentFromHandleName === "1" &&
						currentToHandleName === "2")
				) {
					isLEDProperlyOriented = true;
				}

				// Si el LED no está bien polarizado, el circuito está abierto.
				if (!isLEDProperlyOriented) {
					return true;
				}
			}
			processedComponentNodes.add(componentNode.id); // Marca el componente como procesado para este path
		}
	}
	return false; // No se encontró ningún componente que abriera el circuito
}

export function offAllComponents(nodes: AnalogNode[]): AnalogNode[] {
	const updatedNodes = [...nodes];
	nodes.forEach((node) => {
		if (node.data.type === ComponentType.Led) {
			if (node.data.state?.on === true) {
				node.data.state.on = false;
			}
		}
	});
	return updatedNodes;
}
