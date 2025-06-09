import { AnalogNode, Categories, ComponentEdge, ComponentType, EdgeData } from "@/types";

/**
 * Utilidad para indexar nodos por ID para búsquedas rápidas.
 */
export function createNodeMap(nodes: AnalogNode[]): Map<string, AnalogNode> {
	return new Map(nodes.map((n) => [n.id, n]));
}

/**
 * Utilidad para indexar edges por combinaciones de terminales.
 */
export function createEdgeMap(edges: ComponentEdge[]): Map<string, ComponentEdge> {
	const map = new Map<string, ComponentEdge>();
	for (const e of edges) {
		const key1 = `${e.source}:${e.sourceHandle}-${e.target}:${e.targetHandle}`;
		const key2 = `${e.target}:${e.targetHandle}-${e.source}:${e.sourceHandle}`;
		map.set(key1, e);
		map.set(key2, e);
	}
	return map;
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
): {
	isReady: boolean;
	message: string;
	updatedEdges: ComponentEdge[];
	paths: string[][];
	graph: Map<string, Set<string>>;
} {
	const graph = buildGraph(edges);
	connectInternalTerminals(nodes, graph);
	const powerSources = nodes.filter((n) => ["battery", "powerSupply"].includes(n.type!));

	if (powerSources.length === 0) {
		return {
			isReady: false,
			message: "No hay fuente de energía.",
			updatedEdges: edges,
			paths: [],
			graph,
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

			const paths = findAllPathsLimited(graph, start, end, 28);
			console.log("Paths:", paths);
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
			graph,
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
			graph,
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
		graph,
	};
}

/**
 * Encuentra caminos desde start hasta end, evitando loops y caminos redundantes.
 * @param graph Mapa de conexiones entre nodos
 * @param start Nodo inicial (por ejemplo: BAT+:1)
 * @param end Nodo final (por ejemplo: BAT-:2)
 * @param maxDepth Profundidad máxima (camino máximo permitido)
 */
export function findAllPathsLimited(
	graph: Map<string, Set<string>>,
	start: string,
	end: string,
	maxDepth = 20
): string[][] {
	const paths: string[][] = [];
	const visited = new Set<string>();

	function dfs(current: string, path: string[]) {
		if (path.length > maxDepth) return;

		if (current === end) {
			paths.push([...path]);
			return;
		}

		visited.add(current);

		const neighbors = graph.get(current) || new Set();
		for (const neighbor of neighbors) {
			if (!visited.has(neighbor)) {
				path.push(neighbor);
				dfs(neighbor, path);
				path.pop();
			}
		}

		visited.delete(current);
	}

	dfs(start, [start]);

	// Opcional: eliminar caminos duplicados (por set de nodos)
	const seen = new Set<string>();
	const uniquePaths = paths.filter((path) => {
		const key = path.join("→");
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});

	return uniquePaths;
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
	paths: string[][],
	graph: Map<string, Set<string>>
): PathInfo[] {
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
export interface CombinedCircuitResults {
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
	paths: string[][],
	graph: Map<string, Set<string>>
): CombinedCircuitResults {
	const nodeMap = createNodeMap(nodes);
	const edgeMap = createEdgeMap(edges);

	const pathsInfo = getClosedCircuitPaths(nodes, paths, graph);

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
		const sourceNode = nodeMap.get(group[0].sourceId);
		const V_source = Number(sourceNode?.data.value ?? 5);

		for (const currentPathInfo of group) {
			const currentPath = currentPathInfo.path;

			const pathIsEffectivelyOpen = isPathEffectivelyOpen(currentPath, nodeMap);

			let totalCurrentForThisPath = 0;

			if (!pathIsEffectivelyOpen) {
				const ohmicResistance = getTotalResistance(currentPath, edgeMap, nodeMap);
				const fixedVoltageDrops = getFixedVoltageDropsInPath(currentPath, nodeMap, edgeMap);
				const effectiveVoltage = V_source - fixedVoltageDrops;

				if (ohmicResistance > 0 && effectiveVoltage > 0) {
					totalCurrentForThisPath = effectiveVoltage / ohmicResistance;
				}
			}

			const { nodeVoltages, componentDrops, edgeVoltagesAtStart, nodeStateChanges } =
				calculatePathVoltages(currentPath, totalCurrentForThisPath, nodeMap, edgeMap, V_source);

			allNodeVoltages.push(...nodeVoltages);
			allComponentVoltageDrops.push(...componentDrops);
			allEdgeVoltagesAtStart.push(...edgeVoltagesAtStart);
			allNodeStateChanges.push(...nodeStateChanges);
		}
	}

	// Deduplicación - Lógica modificada para priorizar resultados con corriente
	const uniqueNodeVoltagesMap = new Map<string, NodeVoltageResult>();
	allNodeVoltages.forEach((r) => {
		const existing = uniqueNodeVoltagesMap.get(r.nodeId);
		// Si no existe, añádelo. Si existe y el nuevo tiene corriente (o mayor voltaje si la corriente es cero), actualízalo.
		if (
			!existing ||
			(r.current > 0 &&
				(existing.current === 0 || r.voltageMeasurement > existing.voltageMeasurement)) ||
			(r.current === 0 &&
				existing.current === 0 &&
				r.voltageMeasurement > existing.voltageMeasurement)
		) {
			uniqueNodeVoltagesMap.set(r.nodeId, r);
		}
	});

	const uniqueComponentDropsMap = new Map<string, ComponentVoltageDropResult>();
	allComponentVoltageDrops.forEach((r) => {
		const existing = uniqueComponentDropsMap.get(r.componentId);
		// Prioriza el current más alto. Si el nuevo current es > que el existente, úsalo.
		// O si el existente es 0 y el nuevo no es 0, usa el nuevo.
		if (!existing || r.current > existing.current || (existing.current === 0 && r.current !== 0)) {
			uniqueComponentDropsMap.set(r.componentId, r);
		}
	});

	const uniqueEdgeVoltagesAtStartMap = new Map<string, EdgeVoltageDropResult>();
	allEdgeVoltagesAtStart.forEach((r) => {
		const existing = uniqueEdgeVoltagesAtStartMap.get(r.edgeId);
		// Prioriza el current más alto. Si el nuevo current es > que el existente, úsalo.
		// O si el existente es 0 y el nuevo no es 0, usa el nuevo.
		if (!existing || r.current > existing.current || (existing.current === 0 && r.current !== 0)) {
			uniqueEdgeVoltagesAtStartMap.set(r.edgeId, r);
		}
	});

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
	initialTotalCurrent: number,
	nodeMap: Map<string, AnalogNode>,
	edgeMap: Map<string, ComponentEdge>,
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

	const MIN_LED_ON_CURRENT_AMPS = 0.02;
	let totalCurrent = initialTotalCurrent;
	let currentVoltageAtNode = sourceVoltage;

	const visitedEdges = new Set<string>();
	const processedComponentDropIds = new Set<string>();
	let isPathBroken = false;

	const initialNodeId = path[0].split(":")[0];
	nodeVoltages.push({
		nodeId: initialNodeId,
		voltageMeasurement: currentVoltageAtNode,
		current: totalCurrent,
	});

	for (let i = 0; i < path.length - 1; i++) {
		if (isPathBroken) {
			totalCurrent = 0;
			currentVoltageAtNode = 0;
		}

		const fromHandleId = path[i];
		const toHandleId = path[i + 1];
		const edge = findEdgeBetween(fromHandleId, toHandleId, edgeMap);

		if (!edge || visitedEdges.has(edge.id)) continue;

		const node1 = nodeMap.get(edge.source);
		const node2 = nodeMap.get(edge.target);
		const excludedTypes = ["battery", "powersupply", "nodeComponent", "board", "wire", "ground"];

		let componentNode = undefined;

		if (
			node2 &&
			!excludedTypes.includes(node2.data.type) &&
			!processedComponentDropIds.has(node2.id)
		) {
			componentNode = node2;
		} else if (
			node1 &&
			!excludedTypes.includes(node1.data.type) &&
			!processedComponentDropIds.has(node1.id)
		) {
			componentNode = node1;
		}

		let voltageDrop = 0;

		if (componentNode) {
			const { type, value, value_optional, prefix, state, category } = componentNode.data;

			if (type === ComponentType.Resistor) {
				const resistance = Number(value ?? 0) * getMultiplier(prefix ?? "");
				voltageDrop = totalCurrent * resistance;

				componentDrops.push({ componentId: componentNode.id, voltageDrop, current: totalCurrent });
			} else if (type === ComponentType.Diode || type === ComponentType.Led) {
				const Vf = Number(value_optional ?? 0);
				const [fromId, fromPin] = fromHandleId.split(":");
				const [toId, toPin] = toHandleId.split(":");

				const isForward =
					(toId === componentNode.id && toPin === "1") ||
					(fromId === componentNode.id && fromPin === "2") ||
					(fromId === componentNode.id &&
						toId === componentNode.id &&
						fromPin === "1" &&
						toPin === "2");

				const isOn = totalCurrent >= MIN_LED_ON_CURRENT_AMPS && isForward;

				nodeStateChanges.push({ id: componentNode.id, state: { on: isOn } });

				voltageDrop = isOn ? Vf : 0;

				componentDrops.push({ componentId: componentNode.id, voltageDrop, current: totalCurrent });
			} else if (category === Categories["Switches & Relays"]) {
				const isOn = state?.on === true;
				nodeStateChanges.push({ id: componentNode.id, state: { on: isOn } });

				voltageDrop = isOn ? 0 : currentVoltageAtNode;
				if (!isOn) {
					totalCurrent = 0;
					isPathBroken = true;
				}

				componentDrops.push({ componentId: componentNode.id, voltageDrop, current: totalCurrent });
			}

			processedComponentDropIds.add(componentNode.id);
		}

		// REGISTRO DE EDGE
		edgeVoltagesAtStart.push({
			edgeId: edge.id,
			voltage: currentVoltageAtNode,
			current: totalCurrent,
		});

		visitedEdges.add(edge.id);

		// APLICACIÓN DE CAÍDA DE VOLTAJE
		currentVoltageAtNode -= voltageDrop;

		// REGISTRO DE VOLTAJE EN NODO
		const nextNodeId = toHandleId.split(":")[0];
		if (nextNodeId !== initialNodeId) {
			const existing = nodeVoltages.find((n) => n.nodeId === nextNodeId);
			if (existing) {
				existing.voltageMeasurement = currentVoltageAtNode;
				existing.current = totalCurrent;
			} else {
				nodeVoltages.push({
					nodeId: nextNodeId,
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

function getTotalResistance(
	path: string[],
	edgeMap: Map<string, ComponentEdge>,
	nodeMap: Map<string, AnalogNode>
): number {
	let totalResistance = 0;
	const processedComponentNodes = new Set<string>();

	for (let i = 0; i < path.length - 1; i++) {
		const fromHandleId = path[i];
		const toHandleId = path[i + 1];
		const edge = findEdgeBetween(fromHandleId, toHandleId, edgeMap);
		if (!edge) continue;

		const node1 = nodeMap.get(edge.source);
		const node2 = nodeMap.get(edge.target);

		let componentNode: AnalogNode | undefined;

		if (
			node1 &&
			!["battery", "powersupply", "nodeComponent", "board", "wire", "ground"].includes(
				node1.data.type
			) &&
			!processedComponentNodes.has(node1.id)
		) {
			componentNode = node1;
		} else if (
			node2 &&
			!["battery", "powersupply", "nodeComponent", "board", "wire", "ground"].includes(
				node2.data.type
			) &&
			!processedComponentNodes.has(node2.id)
		) {
			componentNode = node2;
		}

		if (componentNode && componentNode.data.type === ComponentType.Resistor) {
			const baseValue = Number(componentNode.data.value ?? 0);
			const multiplier = getMultiplier(componentNode.data.prefix || "");
			totalResistance += baseValue * multiplier;
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
export function findEdgeBetween(from: string, to: string, edgeMap: Map<string, ComponentEdge>) {
	return edgeMap.get(`${from}-${to}`);
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
	nodes: Map<string, AnalogNode>,
	edges: Map<string, ComponentEdge>
): number {
	let totalFixedDrop = 0;
	const processedComponentNodes = new Set<string>();

	for (let i = 0; i < path.length - 1; i++) {
		const fromHandleId = path[i];
		const toHandleId = path[i + 1];
		const edge = findEdgeBetween(fromHandleId, toHandleId, edges);
		if (!edge) continue;

		const node1 = nodes.get(edge.source);
		const node2 = nodes.get(edge.target);

		let componentNode: AnalogNode | undefined;
		if (
			node1 &&
			!["battery", "powerSupply", "nodeComponent", "board", "wire", "ground"].includes(
				node1.type!
			) &&
			!processedComponentNodes.has(node1.id)
		) {
			componentNode = node1;
		} else if (
			node2 &&
			!["battery", "powerSupply", "nodeComponent", "board", "wire", "ground"].includes(
				node2.type!
			) &&
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
function isPathEffectivelyOpen(path: string[], nodes: Map<string, AnalogNode>): boolean {
	const processedComponentNodes = new Set<string>(); // Este set es local y solo para esta función

	for (let i = 0; i < path.length - 1; i++) {
		const fromHandleId = path[i];
		const toHandleId = path[i + 1];

		const node1 = nodes.get(fromHandleId.split(":")[0]);
		const node2 = nodes.get(toHandleId.split(":")[0]);

		let componentNode: AnalogNode | undefined;

		// Identificamos el nodo del componente (no fuentes, ground, cables, etc.)
		// y aseguramos que no se procese dos veces si el path pasa por sus handles.
		if (
			node1 &&
			!["battery", "powerSupply", "nodeComponent", "board", "wire", "ground"].includes(
				node1.type!
			) &&
			!processedComponentNodes.has(node1.id)
		) {
			componentNode = node1;
		} else if (
			node2 &&
			!["battery", "powerSupply", "nodeComponent", "board", "wire", "ground"].includes(
				node2.type!
			) &&
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
