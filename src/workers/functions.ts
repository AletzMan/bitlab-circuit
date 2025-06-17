import { AnalogNode, ComponentEdge, ComponentType } from "@/types";
import { XYPosition } from "@xyflow/react";
import * as math from "mathjs";

// --- Nuevas Interfaces (las que definimos en la respuesta anterior) ---
export interface ElectricalNode {
	id: string;
	index: number;
	voltage?: number;
	isGround?: boolean;
	connectedHandles: Set<string>;
	position?: XYPosition;
}

export interface MNAComponent {
	id: string; // ID del nodo de ReactFlow
	type: ComponentType;
	node1Id: string; // ID del primer nodo eléctrico conectado
	node2Id: string; // ID del segundo nodo eléctrico conectado (si aplica)
	value?: number; // Valor principal (resistencia, voltaje, etc.)
	state?: boolean; // Para switches (true = cerrado/on, false = abierto/off)
	color?: string; // Para LEDs
	// Propiedades internas para el LED modelado (caída de voltaje, resistencia)
	voltageDrop?: number;
	internalResistance?: number;
	current?: number; // Corriente a través del componente
}

export interface SimulationResults {
	electricalNodes: Map<string, ElectricalNode>;
	components: Map<string, { current?: number; voltageDrop?: number; isOn?: boolean }>;
}

export interface EdgeInfo {
	edgeId: string;
	voltageDisplay: number;
}

export interface ComponentInfo {
	componentId: string;
	voltageDrop: number;
	currentDrop: number;
	isOn: boolean;
}

export interface CircuitData {
	updatedNodes: ComponentInfo[];
	updatedEdges: EdgeInfo[];
	error: string | undefined;
}

export interface CombinedCircuitResults {
	circuitResults: SimulationResults;
	updatedNodes: ComponentInfo[];
	updatedEdges: EdgeInfo[];
	error?: string;
}
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
		// Correcto: usar solo template literals para construir la clave
		const key1 = `${e.source}:${e.sourceHandle}-${e.target}:${e.targetHandle}`;
		const key2 = `${e.target}:${e.targetHandle}-${e.source}:${e.sourceHandle}`;
		map.set(key1, e);
		map.set(key2, e);
	}
	return map;
}
/**
 * Construye un gráfico a partir de las conexiones del circuito,
 * manejando nodos de unión (ComponentType.Node) como puntos de conexión ideales.
 * @param edges - Las conexiones del circuito.
 * @param nodes - Todos los nodos del circuito, necesarios para identificar ComponentType.Node.
 * @returns Un gráfico que representa el circuito.
 */
function buildGraph(edges: ComponentEdge[], nodes: AnalogNode[]): Map<string, Set<string>> {
	const graph = new Map<string, Set<string>>();

	// 1. Añadir conexiones explícitas de los edges (cables)
	for (const e of edges) {
		const handle1 = `${e.source}:${e.sourceHandle}`;
		const handle2 = `${e.target}:${e.targetHandle}`;

		if (!graph.has(handle1)) graph.set(handle1, new Set());
		if (!graph.has(handle2)) graph.set(handle2, new Set());

		graph.get(handle1)!.add(handle2);
		graph.get(handle2)!.add(handle1); // Bidirectional
	}

	// 2. Manejar ComponentType.Node (NodeL) como puntos de unión ideales
	for (const node of nodes) {
		if (node.data.type === ComponentType.Node) {
			const handlesConnectedToThisNodeL = new Set<string>();

			edges.forEach((edge) => {
				if (edge.source === node.id) {
					handlesConnectedToThisNodeL.add(`${edge.source}:${edge.sourceHandle}`);
				}
				if (edge.target === node.id) {
					handlesConnectedToThisNodeL.add(`${edge.target}:${edge.targetHandle}`);
				}
			});

			const handlesArray = Array.from(handlesConnectedToThisNodeL);
			for (let i = 0; i < handlesArray.length; i++) {
				for (let j = i + 1; j < handlesArray.length; j++) {
					const handleA = handlesArray[i];
					const handleB = handlesArray[j];

					if (!graph.has(handleA)) graph.set(handleA, new Set());
					if (!graph.has(handleB)) graph.set(handleB, new Set());

					graph.get(handleA)!.add(handleB);
					graph.get(handleB)!.add(handleA);
				}
			}
		}
		// ---> AÑADE ESTA SECCIÓN PARA LOS SWITCHES <---
		else if (
			node.data.type === ComponentType.SwitchSPST ||
			node.data.type === ComponentType.PusuhButtonClose ||
			node.data.type === ComponentType.PusuhButtonOpen
		) {
			const handle1 = `${node.id}:1`; // Asumiendo handles '1' y '2' para switches
			const handle2 = `${node.id}:2`;

			// CRUCIAL: Solo añade la conexión si el switch está ON
			// Si node.data.state es undefined o node.data.state.on es false, el switch está OFF
			const isSwitchOn = node.data.state?.on === true;

			if (isSwitchOn) {
				if (!graph.has(handle1)) graph.set(handle1, new Set());
				if (!graph.has(handle2)) graph.set(handle2, new Set());

				graph.get(handle1)!.add(handle2);
				graph.get(handle2)!.add(handle1);
			}
			// Si el switch está OFF, NO se añade ninguna arista entre sus handles internos.
			// Esto asegura que assignElectricalNodes los vea como desconectados.
		}
		// Para otros componentes (resistencias, LEDs, baterías), sus terminales están
		// siempre "internamente conectados" para formar parte de la malla MNA,
		// pero esa conexión no se representa en el grafo de nodos eléctricos.
		// Sus handles se conectan a los nodos eléctricos a través de los *cables* (edges)
		// y su comportamiento (resistencia, fuente de voltaje) se modela en solveMNA.
	}

	return graph;
}

/**
 * Asigna nodos eléctricos a los handles de los componentes.
 */
function assignElectricalNodes(
	nodes: AnalogNode[],
	edges: ComponentEdge[],
	graph: Map<string, Set<string>>
): {
	electricalNodes: Map<string, ElectricalNode>;
	nodeToElectricalNodeMap: Map<string, string>;
	groundNodeId: string;
	groundIndex: number;
} {
	const electricalNodes = new Map<string, ElectricalNode>();
	const nodeToElectricalNodeMap = new Map<string, string>();
	let electricalNodeIndex = 0;
	let groundNodeId: string | null = null; // Lo estableceremos después de encontrar el grupo de tierra.
	let groundIndex = -1;

	// --- PASO 1: Identificar el handle del símbolo de tierra que inicia el recorrido de la tierra ---
	let startingGroundHandle: string | null = null;
	for (const node of nodes) {
		if (node.data.type === ComponentType.Ground) {
			// Asumimos que el componente Ground tiene al menos un handle,
			// por simplicidad tomamos el primero que aparece en las aristas conectadas a él.
			const connectedEdges = edges.filter(
				(edge) => edge.source === node.id || edge.target === node.id
			);
			if (connectedEdges.length > 0) {
				// Tomamos el handle de este componente Ground. Si tiene múltiples, uno es suficiente para iniciar el grupo.
				startingGroundHandle =
					connectedEdges[0].source === node.id
						? `${connectedEdges[0].source}:${connectedEdges[0].sourceHandle}`
						: `${connectedEdges[0].target}:${connectedEdges[0].targetHandle}`;
				break; // Una vez que encontramos un handle de tierra, podemos salir del bucle.
			}
		}
	}

	// --- PASO 2: Recorrer el grafo para crear los electricalNodes ---
	const visitedHandles = new Set<string>();

	// Primero, si encontramos un handle de tierra, procesamos su grupo de nodos primero.
	if (startingGroundHandle) {
		const newGroundId = `N${electricalNodeIndex}`;
		const groundElectricalNode: ElectricalNode = {
			id: newGroundId,
			index: electricalNodeIndex,
			isGround: true, // ¡Este será nuestro nodo de tierra!
			connectedHandles: new Set<string>(),
			position: { x: 0, y: 0 }, // Se puede mejorar la posición si se toma del nodo ground
		};
		electricalNodes.set(newGroundId, groundElectricalNode);
		groundNodeId = newGroundId;
		groundIndex = electricalNodeIndex;
		electricalNodeIndex++;

		const queue: string[] = [startingGroundHandle];
		visitedHandles.add(startingGroundHandle);

		while (queue.length > 0) {
			const currentTraverseHandle = queue.shift()!;
			groundElectricalNode.connectedHandles.add(currentTraverseHandle);
			nodeToElectricalNodeMap.set(currentTraverseHandle, groundElectricalNode.id);

			const neighbors = graph.get(currentTraverseHandle) || new Set<string>();
			for (const neighborHandle of neighbors) {
				if (!visitedHandles.has(neighborHandle)) {
					visitedHandles.add(neighborHandle);
					queue.push(neighborHandle);
				}
			}
		}
	}

	// Luego, procesamos los handles restantes que no son parte de la tierra (si hay)
	for (const node of nodes) {
		const componentHandles = new Set<string>();
		edges.forEach((edge) => {
			if (edge.source === node.id) {
				componentHandles.add(`${edge.source}:${edge.sourceHandle}`);
			}
			if (edge.target === node.id) {
				componentHandles.add(`${edge.target}:${edge.targetHandle}`);
			}
		});

		for (const handleId of componentHandles) {
			if (!visitedHandles.has(handleId)) {
				// Si el handle aún no ha sido visitado (no es parte del grupo de tierra ni de otro grupo)
				const newElectricalNodeId = `N${electricalNodeIndex}`;
				const electricalNode: ElectricalNode = {
					id: newElectricalNodeId,
					index: electricalNodeIndex,
					isGround: false,
					connectedHandles: new Set<string>(),
					position: node.position || { x: 0, y: 0 },
				};
				electricalNodes.set(newElectricalNodeId, electricalNode);
				electricalNodeIndex++;

				const queue: string[] = [handleId];
				visitedHandles.add(handleId);

				while (queue.length > 0) {
					const currentTraverseHandle = queue.shift()!;
					electricalNode.connectedHandles.add(currentTraverseHandle);
					nodeToElectricalNodeMap.set(currentTraverseHandle, electricalNode.id);

					const neighbors = graph.get(currentTraverseHandle) || new Set<string>();
					for (const neighborHandle of neighbors) {
						if (!visitedHandles.has(neighborHandle)) {
							visitedHandles.add(neighborHandle);
							queue.push(neighborHandle);
						}
					}
				}
			}
		}
	}

	// --- PASO 3: Fallback si no se encontró NINGÚN componente Ground explícito ---
	if (groundNodeId === null && electricalNodes.size > 0) {
		// Si no se encontró un ComponentType.Ground, asignamos el primer nodo eléctrico como tierra.
		const firstElectricalNode = electricalNodes.values().next().value;
		if (firstElectricalNode) {
			firstElectricalNode.isGround = true;
			groundNodeId = firstElectricalNode.id;
			groundIndex = firstElectricalNode.index;
			console.warn(
				`Assigned electrical node ${firstElectricalNode.id} as ground (no explicit ground component found).`
			);
		}
	}

	if (groundNodeId === null) {
		throw new Error(
			"Could not establish a ground node for the circuit. A ground reference is required for MNA."
		);
	}

	return { electricalNodes, nodeToElectricalNodeMap, groundNodeId, groundIndex };
}
/**
 * Convierte los nodos y edges de ReactFlow en un formato compatible con MNA.
 * Retorna los componentes MNA, un mapa de nodos eléctricos y el ID del nodo de tierra.
 */
function prepareForMNA(
	nodes: AnalogNode[],
	edges: ComponentEdge[]
): {
	mnaComponents: MNAComponent[];
	electricalNodes: Map<string, ElectricalNode>;
	groundNodeId: string;
	paths: Map<string, string[]>;
	graph: Map<string, Set<string>>;
} {
	const graph = buildGraph(edges, nodes);
	const { electricalNodes, nodeToElectricalNodeMap, groundNodeId } = assignElectricalNodes(
		nodes,
		edges,
		graph
	); // Asegúrate de que assignElectricalNodes esté con la última versión

	if (groundNodeId === null) {
		throw new Error("No ground node found in the circuit. A ground reference is required for MNA.");
	}

	const mnaComponents: MNAComponent[] = [];
	const paths = new Map<string, string[]>();

	for (const node of nodes) {
		// En lugar de recolectar todos los handles y luego tomar los electricalNodesArray[0] y [1],
		// vamos a obtener los electricalNodes para los handles específicos de cada componente.

		// NOTA IMPORTANTE: Necesitas saber los nombres de los handles de cada tipo de componente
		// Por ejemplo, para una resistencia, podrías tener handles '1' y '2'.
		// Para una batería, '1' podría ser el positivo y '2' el negativo.
		// Para un LED, '1' el ánodo y '2' el cátodo.

		// Lógica común para 2-terminales (o componentes donde el orden importa)
		//let primaryHandle: string | undefined;
		//let secondaryHandle: string | undefined;

		// Intentar obtener handles estándar para componentes de 2 terminales
		// Esto asume que tus componentes tienen handles llamados '1' y '2'
		// para sus dos terminales principales.
		const handle1 = `${node.id}:1`;
		const handle2 = `${node.id}:2`;
		//debugger;
		// Verifica si estos handles existen en el mapa
		const electricalNodeId1 = nodeToElectricalNodeMap.get(handle1);
		const electricalNodeId2 = nodeToElectricalNodeMap.get(handle2);

		// Define los IDs de los nodos eléctricos para este componente
		let compNode1Id: string | undefined;
		let compNode2Id: string | undefined;

		// Asignación inteligente de compNode1Id y compNode2Id basada en el tipo de componente
		switch (node.data.type) {
			case ComponentType.Resistor:
			case ComponentType.Capacitor:
			case ComponentType.Inductor:
			case ComponentType.SwitchSPST: // y otros interruptores simples
			// ... (añade más tipos que tienen 2 terminales genéricos) ...
			case ComponentType.PusuhButtonClose:
			case ComponentType.PusuhButtonOpen:
				// Para estos, el orden de 1 y 2 generalmente no importa para la función,
				// pero si tus visuales o la simulación dependen de un orden específico,
				// usa electricalNodeId1 y electricalNodeId2.

				compNode1Id = electricalNodeId1;
				compNode2Id = electricalNodeId2;
				if (!compNode1Id || !compNode2Id) {
					console.warn(
						`Component ${node.id} (${node.data.type}) does not have both handles '1' and '2' connected to electrical nodes. Skipping.`
					);
					continue; // Skip if not fully connected
				}
				mnaComponents.push({
					id: node.id,
					type: node.data.type,
					node1Id: compNode1Id,
					node2Id: compNode2Id,
					value: Number(node.data.value),
					state: node.data.state?.on, // For switches
				});
				break;

			case ComponentType.Diode:
			case ComponentType.Led:
			case ComponentType.Schottky:
			case ComponentType.Zener:
				// ... (otros diodos y LED) ...
				// Para diodos y LEDs, handle '1' es ánodo (node1Id) y handle '2' es cátodo (node2Id)
				compNode1Id = electricalNodeId1; // Ánodo
				compNode2Id = electricalNodeId2; // Cátodo

				if (!compNode1Id || !compNode2Id) {
					console.warn(`Diode-type component ${node.id} is not fully connected. Skipping.`);
					continue;
				}
				mnaComponents.push({
					id: node.id,
					type: node.data.type,
					node1Id: compNode1Id,
					node2Id: compNode2Id,
					color: node.data.color, // For LEDs
					voltageDrop: node.data.forwardVoltage, // For LEDs
					internalResistance: node.data.internalResistance,
				});
				break;

			case ComponentType.PowerSupply:
			case ComponentType.Battery:
				// Para baterías, handle '1' es positivo (node1Id) y handle '2' es negativo (node2Id)
				compNode1Id = electricalNodeId1; // Positivo
				compNode2Id = electricalNodeId2; // Negativo

				if (!compNode1Id || !compNode2Id) {
					console.warn(`Voltage source component ${node.id} is not fully connected. Skipping.`);
					continue;
				}

				// *** ESTA ES LA CORRECCIÓN CLAVE PARA TU BATERÍA Y RESISTENCIA ***
				// Si el terminal negativo de la batería está conectado al groundNodeId (N0)
				// a través del mapeo en assignElectricalNodes, ¡este ya será N0!
				// No necesitas hacer un cambio aquí a "N0" explícitamente,
				// porque electricalNodeId2 (que es el nodeToElectricalNodeMap.get(`${node.id}:2`))
				// YA DEBERÍA SER N0 si la función assignElectricalNodes hizo su trabajo.

				mnaComponents.push({
					id: node.id,
					type: node.data.type,
					node1Id: compNode1Id, // Positivo
					node2Id: compNode2Id, // Negativo (¡este debería ser N0 si está conectado a tierra!)
					value: Number(node.data.value),
				});
				break;

			case ComponentType.Ground:
				// Ground is handled by `assignElectricalNodes`, no MNA component needed
				// Asegúrate de que tu assignElectricalNodes lo mapee al groundNodeId.
				break;

			case ComponentType.Node: // Tu "componente Nodo"
				// Los nodos de unión no son componentes MNA, solo puntos de conexión.
				// Sus handles ya están mapeados a electricalNodes por assignElectricalNodes.
				break;
			// ... (rest of your cases for transistors, gates, etc.) ...
			default:
				console.warn(
					`Unknown or unsupported component type for MNA: ${node.data.type} (${node.id}). Skipping.`
				);
				break;
		}
	}

	return { mnaComponents, electricalNodes, groundNodeId, paths, graph };
}

/**
 * Realiza el análisis de nodos modificados (MNA) para resolver el circuito.
 * @param mnaComponents - Lista de componentes del circuito con sus nodos eléctricos.
 * @param electricalNodes - Mapa de nodos eléctricos por ID.
 * @param groundNodeId - El ID del nodo de tierra.
 * @returns Los resultados de la simulación (voltajes de nodo).
 */
function solveMNA(
	mnaComponents: MNAComponent[],
	electricalNodes: Map<string, ElectricalNode>,
	groundNodeId: string,
	maxIterations = 100,
	tolerance = 1e-6
): SimulationResults {
	let currentElectricalNodes = new Map(electricalNodes);
	let previousNodeVoltages: Map<string, number> = new Map();
	currentElectricalNodes.forEach((node) => {
		previousNodeVoltages.set(node.id, node.id === groundNodeId ? 0 : 0);
	});

	const LED_FORWARD_VOLTAGE_THRESHOLD = 1.7; // Este valor es el "forward voltage" o voltaje de umbral
	const LED_ON_INTERNAL_RESISTANCE = 10; // Esta es la resistencia de la unión cuando está encendido
	const LED_OFF_RESISTANCE = 1e9; // Resistencia cuando está apagado

	let finalX: math.Matrix | null = null;

	const componentStates = new Map<
		string,
		{ isOn: boolean; current?: number; voltageDrop?: number }
	>();

	mnaComponents.forEach((comp) => {
		if (comp.type === ComponentType.Led || comp.type === ComponentType.Diode) {
			componentStates.set(comp.id, { isOn: false });
		} else if (comp.type === ComponentType.SwitchSPST) {
			componentStates.set(comp.id, { isOn: comp.state as boolean });
		}
	});

	const voltageSourceToXIndexMap = new Map<string, number>();

	for (let iter = 0; iter < maxIterations; iter++) {
		const nodeMap = new Map<string, number>();
		let localCurrentIndex = 0; // Este será el número de nodos NO-TIERRA
		currentElectricalNodes.forEach((node) => {
			if (node.id === groundNodeId) {
				nodeMap.set(node.id, -1); // El nodo de tierra se mapea a -1
			} else {
				nodeMap.set(node.id, localCurrentIndex++); // Los nodos no-tierra se indexan desde 0
			}
		});

		let voltageSourceCount = 0;
		voltageSourceToXIndexMap.clear();
		mnaComponents.forEach((comp) => {
			if (comp.type === ComponentType.PowerSupply || comp.type === ComponentType.Battery) {
				// Las variables de corriente de la fuente de voltaje se añaden después de las variables de voltaje nodal
				voltageSourceToXIndexMap.set(comp.id, localCurrentIndex + voltageSourceCount);
				voltageSourceCount++;
			}
		});

		// El tamaño de la matriz es (número de nodos no-tierra) + (número de fuentes de voltaje)
		const matrixSize = localCurrentIndex + voltageSourceCount;
		const A = math.zeros(matrixSize, matrixSize) as math.Matrix;
		const Z = math.zeros(matrixSize, 1) as math.Matrix;

		// Helper para añadir conductancias a la matriz A, manejando el nodo de tierra
		const addConductance = (n1Idx: number, n2Idx: number, conductance: number) => {
			// Términos diagonales (G_ii)
			if (n1Idx !== -1) {
				A.set([n1Idx, n1Idx], A.get([n1Idx, n1Idx]) + conductance);
			}
			if (n2Idx !== -1) {
				A.set([n2Idx, n2Idx], A.get([n2Idx, n2Idx]) + conductance);
			}
			// Términos fuera de la diagonal (G_ij)
			if (n1Idx !== -1 && n2Idx !== -1) {
				A.set([n1Idx, n2Idx], A.get([n1Idx, n2Idx]) - conductance);
				A.set([n2Idx, n1Idx], A.get([n2Idx, n1Idx]) - conductance);
			}
		};

		mnaComponents.forEach((comp) => {
			const n1Idx = nodeMap.get(comp.node1Id)!;
			const n2Idx = nodeMap.get(comp.node2Id)!;

			switch (comp.type) {
				case ComponentType.Resistor:
				case ComponentType.Potentiometer:
				case ComponentType.Rheostat:
				case ComponentType.Photoresistance:
					const resistance = comp.value && comp.value !== 0 ? comp.value : 1e-9;
					const conductance = 1 / resistance;
					addConductance(n1Idx, n2Idx, conductance);
					break;

				case ComponentType.Led:
				case ComponentType.Diode:
				case ComponentType.Schottky:
				case ComponentType.Zener:
				case ComponentType.PhotoDiode:
				case ComponentType.PhotovoltaicCell:
					// Aquí usamos el modelo de diodo linealizado.
					// El voltageDrop que viene de comp.voltageDrop es el Vf (forward voltage)
					// El internalResistance que viene de comp.internalResistance es la resistencia serie
					const diodeVf = comp.voltageDrop || LED_FORWARD_VOLTAGE_THRESHOLD;
					const diodeR_on = comp.internalResistance || LED_ON_INTERNAL_RESISTANCE; // Esta es la resistencia de la unión cuando está ON

					const currentDiodeState = componentStates.get(comp.id)?.isOn || false;

					if (currentDiodeState) {
						const diodeConductanceOn = 1 / diodeR_on;
						addConductance(n1Idx, n2Idx, diodeConductanceOn);

						// La fuente de corriente controlada por voltaje para el Vf
						// Si (Vn1 - Vn2) es la caída de voltaje, entonces I = (Vn1 - Vn2 - Vf) / R_on
						// En la ecuación KCL para nodo n1: (Vn1 - Vn2) * G - Vf * G.
						// El término -Vf * G se mueve al lado Z (fuente de corriente).
						// Para el nodo n1 (ánodo): -currentSourceDueToVf
						// Para el nodo n2 (cátodo): +currentSourceDueToVf
						const currentSourceDueToVf = diodeVf / diodeR_on;
						if (n1Idx !== -1) Z.set([n1Idx, 0], Z.get([n1Idx, 0]) + currentSourceDueToVf); // Corriente entra al nodo n1 (ánodo)
						if (n2Idx !== -1) Z.set([n2Idx, 0], Z.get([n2Idx, 0]) - currentSourceDueToVf); // Corriente sale del nodo n2 (cátodo)
					} else {
						const diodeConductanceOff = 1 / LED_OFF_RESISTANCE;
						addConductance(n1Idx, n2Idx, diodeConductanceOff);
					}
					break;

				case ComponentType.PowerSupply:
				case ComponentType.Battery:
					const vsIdx = voltageSourceToXIndexMap.get(comp.id)!;

					// KCL en n1: corriente de la fuente entra en n1
					if (n1Idx !== -1) {
						A.set([n1Idx, vsIdx], A.get([n1Idx, vsIdx]) + 1);
					}
					// KCL en n2: corriente de la fuente sale de n2
					if (n2Idx !== -1) {
						A.set([n2Idx, vsIdx], A.get([n2Idx, vsIdx]) - 1);
					}

					// Ecuación de la fuente de voltaje: V_n1 - V_n2 = V_source
					if (n1Idx !== -1) {
						A.set([vsIdx, n1Idx], A.get([vsIdx, n1Idx]) + 1);
					}
					if (n2Idx !== -1) {
						A.set([vsIdx, n2Idx], A.get([vsIdx, n2Idx]) - 1);
					}
					Z.set([vsIdx, 0], comp.value || 0);
					break;

				case ComponentType.SwitchSPST:
				case ComponentType.PusuhButtonOpen:
				case ComponentType.PusuhButtonClose:
					/*const switchConductance = comp.state ? 1e9 : 1e-12; // Muy alta para cerrado, muy baja para abierto
					addConductance(n1Idx, n2Idx, switchConductance);
					break;
					*/
					break;

				case ComponentType.Capacitor:
				case ComponentType.PolarisedCapacitor:
				case ComponentType.VariableCapacitor:
					const capConductance = 1e-12; // En DC, un capacitor es un circuito abierto (conductancia muy baja)
					addConductance(n1Idx, n2Idx, capConductance);
					break;

				case ComponentType.Inductor:
				case ComponentType.IronCoreInductor:
				case ComponentType.FerriteCoreInductor:
				case ComponentType.VariableIronCoreInductor:
				case ComponentType.VariableFerriteCoreInductor:
				case ComponentType.PresetIronCoreInductor:
				case ComponentType.PresetFerriteCoreInductor:
					const indConductanceInMNA = 1e9; // En DC, un inductor es un cortocircuito (conductancia muy alta)
					addConductance(n1Idx, n2Idx, indConductanceInMNA);
					break;

				default:
					const defaultCond = 1e-12; // Para otros componentes no modelados, tratarlos como circuito abierto
					addConductance(n1Idx, n2Idx, defaultCond);
					break;
			}
		});

		// Imprime las matrices después de que se hayan llenado
		// console.log("Matrix A", JSON.stringify(A)); // Descomentar para depurar
		// console.log("Vector Z", JSON.stringify(Z)); // Descomentar para depurar

		let currentX: math.Matrix;

		try {
			currentX = math.lusolve(A, Z) as math.Matrix;
			finalX = currentX;
		} catch (e) {
			throw new Error("No se pudo resolver el circuito (iteración " + iter + "): " + e);
		}

		let converged = true;
		let currentMaxVoltageDiff = 0;
		const newElectricalNodes = new Map<string, ElectricalNode>();

		currentElectricalNodes.forEach((node) => {
			const nodeMappedIdx = nodeMap.get(node.id)!;
			const newNodeVoltage =
				node.id === groundNodeId ? 0 : (currentX.get([nodeMappedIdx, 0]) as number);

			newElectricalNodes.set(node.id, { ...node, voltage: newNodeVoltage });

			if (previousNodeVoltages.has(node.id)) {
				const diff = Math.abs(newNodeVoltage - previousNodeVoltages.get(node.id)!);
				if (diff > tolerance) {
					converged = false;
					currentMaxVoltageDiff = Math.max(currentMaxVoltageDiff, diff);
				}
			}
			previousNodeVoltages.set(node.id, newNodeVoltage);
		});

		let diodeStatesChanged = false;
		mnaComponents.forEach((comp) => {
			if (
				comp.type === ComponentType.Led ||
				comp.type === ComponentType.Diode ||
				comp.type === ComponentType.Schottky ||
				comp.type === ComponentType.Zener ||
				comp.type === ComponentType.PhotoDiode ||
				comp.type === ComponentType.PhotovoltaicCell
			) {
				const node1 = newElectricalNodes.get(comp.node1Id)!;
				const node2 = newElectricalNodes.get(comp.node2Id)!;
				const currentVoltageDrop = node1.voltage! - node2.voltage!;
				const diodeVf = comp.voltageDrop || LED_FORWARD_VOLTAGE_THRESHOLD;

				const wasOn = componentStates.get(comp.id)?.isOn;
				let newIsOn;

				// Criterio de encendido/apagado del diodo
				if (currentVoltageDrop > diodeVf) {
					newIsOn = true;
				} else {
					newIsOn = false;
				}
				if (newIsOn !== wasOn) {
					diodeStatesChanged = true;
				}
				componentStates.set(comp.id, { isOn: newIsOn });
			}
		});

		if (converged && !diodeStatesChanged && iter > 0) {
			break;
		} else if (iter === maxIterations - 1) {
			console.warn(
				`Max iterations reached (${maxIterations}) without convergence. Max voltage diff: ${currentMaxVoltageDiff}`
			);
		}

		currentElectricalNodes = newElectricalNodes;
	}

	if (!finalX) {
		throw new Error("La simulación no produjo resultados válidos.");
	}

	const componentsResult = new Map<
		string,
		{ current?: number; voltageDrop?: number; isOn?: boolean }
	>();

	// --- Obtener la corriente de la rama principal (la de la fuente de voltaje) ---
	let mainBranchCurrent: number | undefined;

	// Buscar el ID de la batería/fuente de voltaje principal
	for (const comp of mnaComponents) {
		if (comp.type === ComponentType.PowerSupply || comp.type === ComponentType.Battery) {
			const sourceXIndex = voltageSourceToXIndexMap.get(comp.id);
			if (sourceXIndex !== undefined && finalX) {
				mainBranchCurrent = finalX.get([sourceXIndex, 0]) as number;
				// La corriente de la fuente es la variable extra en X.
				// Ajustar el signo si es necesario para que sea corriente saliendo del positivo.
				const node1 = currentElectricalNodes.get(comp.node1Id)!;
				const node2 = currentElectricalNodes.get(comp.node2Id)!;
				if (node1.voltage! < node2.voltage!) {
					// Si node1 es el cátodo y node2 es el ánodo (como una batería que va de negativo a positivo)
					mainBranchCurrent = -mainBranchCurrent; // Invertir signo para que sea saliendo del positivo
				}
			}
			break; // Asume que hay solo una fuente principal para esta rama serie
		}
	}
	// --- Fin de la obtención de la corriente de la rama principal ---

	mnaComponents.forEach((comp) => {
		const node1 = currentElectricalNodes.get(comp.node1Id)!;
		const node2 = currentElectricalNodes.get(comp.node2Id)!;

		let voltageDrop = node1.voltage! - node2.voltage!;
		let current = 0;
		let isOn: boolean | undefined = undefined;

		switch (comp.type) {
			case ComponentType.Resistor:
			case ComponentType.Potentiometer:
			case ComponentType.Rheostat:
			case ComponentType.Photoresistance:
				if (comp.value && comp.value !== 0) {
					current = voltageDrop / comp.value; // Para resistores, esto es correcto
				}
				break;

			case ComponentType.Led:
			case ComponentType.Diode:
			case ComponentType.Schottky:
			case ComponentType.Zener:
			case ComponentType.PhotoDiode:
			case ComponentType.PhotovoltaicCell:
				isOn = componentStates.get(comp.id)?.isOn || false;
				const diodeVf = comp.voltageDrop || LED_FORWARD_VOLTAGE_THRESHOLD;
				const diodeR_on = comp.internalResistance || LED_ON_INTERNAL_RESISTANCE;

				if (isOn) {
					// Calcula la corriente individual del LED usando su caída de voltaje y modelo
					// (V_anode - V_cathode - Vf) / R_on
					current = (voltageDrop - diodeVf) / diodeR_on; // Asegúrate de que la corriente no sea negativa si el modelo lo permite ligeramente // (aunque `isOn` ya debería manejar esto si el Vf es el umbral)
					if (current < 0) current = 0;
				} else {
					current = 0; // Si está apagado, la corriente es cero (o muy pequeña)
				}
				break;

			case ComponentType.SwitchSPST:
			case ComponentType.PusuhButtonOpen:
			case ComponentType.PusuhButtonClose:
				isOn = comp.state;
				if (isOn) {
					// Si el switch está cerrado, su corriente es la corriente de la rama
					if (mainBranchCurrent !== undefined) {
						current = Math.abs(mainBranchCurrent);
						if (voltageDrop < 0) {
							// Si el voltaje cae de node2 a node1
							current = -current;
						}
					} else {
						current = voltageDrop / 1e-9; // Fallback: resistencia muy baja
					}
				} else {
					current = 0; // Abierto
				}
				break;

			case ComponentType.PowerSupply:
			case ComponentType.Battery:
				const sourceXIndex = voltageSourceToXIndexMap.get(comp.id);
				if (sourceXIndex !== undefined && finalX) {
					current = finalX.get([sourceXIndex, 0]) as number; // La corriente de la fuente es la variable extra en X
				}
				break;

			case ComponentType.Capacitor:
			case ComponentType.PolarisedCapacitor:
			case ComponentType.VariableCapacitor:
				current = 0; // En DC, los capacitores son circuitos abiertos
				break;

			case ComponentType.Inductor:
			case ComponentType.IronCoreInductor:
			case ComponentType.FerriteCoreInductor:
			case ComponentType.VariableIronCoreInductor:
			case ComponentType.VariableFerriteCoreInductor:
			case ComponentType.PresetIronCoreInductor:
			case ComponentType.PresetFerriteCoreInductor:
				// Un inductor se comporta como un cortocircuito en DC.
				// Si están en serie, toma la corriente principal del circuito
				if (mainBranchCurrent !== undefined) {
					current = Math.abs(mainBranchCurrent);
					if (voltageDrop < 0) {
						// Si el voltaje cae de node2 a node1
						current = -current;
					}
				} else {
					// Fallback: si no hay corriente principal disponible
					const inductorDCCond = 1e9; // Conductancia asumida de cortocircuito
					current = voltageDrop * inductorDCCond;
				}
				break;

			default:
				current = 0; // Por defecto, no hay corriente
				break;
		}

		componentsResult.set(comp.id, { current, voltageDrop, isOn });
	});

	return {
		electricalNodes: currentElectricalNodes,
		components: componentsResult,
	};
}

/**
 * Checks if the simulation is ready to run and prepares initial data.
 * @param nodes - All circuit nodes.
 * @param edges - All circuit edges.
 * @returns An object indicating readiness and prepared data.
 */
export function isSimulationReady(
	nodes: AnalogNode[],
	edges: ComponentEdge[]
): {
	isReady: boolean;
	message?: string;
	updatedEdges: ComponentEdge[];
} {
	if (nodes.length === 0 || edges.length === 0) {
		return {
			isReady: false,
			message: "Circuit is empty.",
			updatedEdges: [],
		};
	}

	// 1. Check for isolated components
	const connectedNodes = new Set<string>();
	edges.forEach((edge) => {
		connectedNodes.add(edge.source);
		connectedNodes.add(edge.target);
	});

	const isolatedNodes = nodes.filter((node) => !connectedNodes.has(node.id));
	if (isolatedNodes.length > 0) {
		const isolatedNodeNames = isolatedNodes.map((node) => node.data.name || node.id).join(", ");
		return {
			isReady: false,
			message: `Isolated components found: ${isolatedNodeNames}. Please connect all components.`,
			updatedEdges: [],
		};
	}

	// 2. Check for power sources
	const hasPowerSource = nodes.some(
		(node) =>
			node.data.type === ComponentType.PowerSupply || node.data.type === ComponentType.Battery
	);
	if (!hasPowerSource) {
		return {
			isReady: false,
			message: "No power source found in the circuit.",
			updatedEdges: [],
		};
	}

	// 3. Check for ground
	const hasGround = nodes.some((node) => node.data.type === ComponentType.Ground);
	if (!hasGround) {
		return {
			isReady: false,
			message: "No ground (reference) found in the circuit. Please add a ground component.",
			updatedEdges: [],
		};
	}
	// Initial updatedEdges (can be modified later with simulation results)
	const updatedEdges = edges.map((edge) => ({
		...edge,
		data: {
			...edge.data,
			color: edge.data?.color || "var(--foreground-color)",
			path: edge.data?.path || "",
			voltage: edge.data?.voltage || 0,
			current: edge.data?.current || 0,
		},
	}));

	return {
		isReady: true,
		updatedEdges,
	};
}

/**
 * Calculates voltage drop per edge and updates node states.
 * @param initialEdges - The initial edges of the circuit.
 * @param nodes - All circuit nodes.
 * @param paths - Paths calculated from graph traversal (if needed for current display).
 * @param graph - The circuit graph.
 * @returns Combined simulation results including updated nodes and edges for display.
 */
export function calculateVoltageDropPerEdge(
	initialEdges: ComponentEdge[],
	nodes: AnalogNode[]
): CombinedCircuitResults {
	// 1. Prepare data for MNA analysis
	const { mnaComponents, electricalNodes, groundNodeId } = prepareForMNA(nodes, initialEdges);

	// 2. Solve the MNA equations
	let simulationResults: SimulationResults;
	let error: string | undefined;
	let updatedEdges: EdgeInfo[] = [];
	let updatedNodes: ComponentInfo[] = [];

	try {
		simulationResults = solveMNA(mnaComponents, electricalNodes, groundNodeId);

		const results = updateCircuitVisualsAnimation(simulationResults, initialEdges);

		updatedEdges = results.updatedEdges;
		updatedNodes = results.updatedNodes;
	} catch (e: any) {
		console.error("Error solving MNA:", e);
		error = e.message || "Circuit cannot be solved.";
		simulationResults = { electricalNodes: new Map(), components: new Map() }; // Return empty results on error
	}

	return {
		circuitResults: simulationResults,
		updatedNodes,
		updatedEdges,
		error: error,
	};
}

export function offAllComponents(nodes: AnalogNode[]): AnalogNode[] {
	return nodes.map((node) => {
		let updatedData = { ...node.data };

		// Reset visual state for LEDs and switches
		if (
			node?.type === ComponentType.Led || // All LED types
			node?.type === ComponentType.SwitchSPST ||
			node?.type === ComponentType.PusuhButtonOpen ||
			node?.type === ComponentType.PusuhButtonClose
		) {
			updatedData = { ...node.data, state: { on: false } };
			// Optionally reset color to default if it's LED
			if (node.type === ComponentType.Led) {
				updatedData.color = "#FFFFFF"; // Default LED color when off
			}
		}
		// Reset current and voltage drop labels
		if (updatedData.designator) {
			updatedData.name = `${updatedData.designator}`;
		}

		return {
			...node,
			data: updatedData,
		};
	});
}

export function updateCircuitVisualsAnimation(
	simulationResults: SimulationResults,
	edges: ComponentEdge[]
): CircuitData {
	let results: CircuitData = {
		updatedNodes: [],
		updatedEdges: [],
		error: undefined,
	};
	let nodesResults: ComponentInfo[] = [];
	const edgesResults: EdgeInfo[] = [];

	const { electricalNodes, components } = simulationResults;
	for (const edge of edges) {
		const sourceNode = `${edge.source}:${edge.sourceHandle}`;
		const targetNode = `${edge.target}:${edge.targetHandle}`;
		if (!sourceNode || !targetNode) continue;

		electricalNodes.forEach((node) => {
			//debugger;
			if (node.connectedHandles.has(sourceNode) && node.connectedHandles.has(targetNode)) {
				edgesResults.push({
					edgeId: edge.id,
					voltageDisplay: node.voltage || 0,
				});
			}
		});
	}
	for (const component of components) {
		nodesResults.push({
			componentId: component[0],
			voltageDrop: component[1].voltageDrop || 0,
			currentDrop: component[1].current || 0,
			isOn: component[1].isOn || false,
		});
	}

	results = {
		updatedNodes: nodesResults,
		updatedEdges: edgesResults,
		error: undefined,
	};
	return results;
}
