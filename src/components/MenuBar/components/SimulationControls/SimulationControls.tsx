import { calculateVoltageDropPerEdge, isSimulationReady, offAllComponents } from "@/helpers";
import { useSimulation } from "@/store";
import { AnalogNode, ComponentEdge, ComponentType } from "@/types";
import { CaretRightFilled, PauseOutlined } from "@ant-design/icons";
import { useReactFlow, useStore } from "@xyflow/react";
// No necesitamos 'shallow' si usamos el hash
import { Button, notification, Tooltip } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useEffect } from "react";

// --- Función para generar un hash de los estados de los interruptores ---
// Esta función debe estar FUERA del componente para evitar ser recreada en cada render
function getSwitchStatesHash(nodes: AnalogNode[]): string {
	return nodes
		.filter((node) => node.data.type === ComponentType.SwitchSPST)
		.sort((a, b) => a.id.localeCompare(b.id)) // Ordena por ID para asegurar un orden consistente
		.map((node) => `${node.id}:${node.data.state?.on ? "on" : "off"}`) // Crea una cadena para cada interruptor
		.join(","); // Une todas las cadenas con una coma
}
// ----------------------------------------------------------------------

export function SimulationControls() {
	const { setIsSimulationRunning, isSimulationRunning } = useSimulation();
	const { getNodes, getEdges, updateEdge, updateNode } = useReactFlow();
	const [api, contextHolder] = notification.useNotification();

	// 1. Usa useStore para obtener el hash de los estados de los interruptores
	const switchStateHash = useStore(
		(state) => getSwitchStatesHash(state.nodes as AnalogNode[])
		// No necesitamos función de comparación aquí porque el hash es una cadena (comparación por valor)
	);

	// 2. El useEffect ahora depende de 'isSimulationRunning' y del 'switchStateHash'
	useEffect(() => {
		if (isSimulationRunning) {
			startSimulation();
		}
	}, [isSimulationRunning, switchStateHash]); // <-- Dependencia clave

	const openNotification = (placement: NotificationPlacement, message: string) => {
		api.error({
			message: "Error al iniciar la simulación",
			description: message,
			placement,
			showProgress: true,
		});
	};

	function handleSimulationClick() {
		const currentState = isSimulationRunning;
		if (currentState) {
			const updatedNodes = offAllComponents(getNodes() as AnalogNode[]);
			updatedNodes.forEach((node) => {
				updateNode(node.id, node);
			});
			setIsSimulationRunning(false);
			return;
		}
		startSimulation();
		setIsSimulationRunning(true);
	}

	const startSimulation = () => {
		const nodes = getNodes() as AnalogNode[];
		const edges = getEdges() as ComponentEdge[];
		const { isReady, message, updatedEdges, paths } = isSimulationReady(nodes, edges);

		if (isReady) {
			const results = calculateVoltageDropPerEdge(edges, nodes, paths);

			console.clear(); // Mueve o desactiva para depurar mejor
			console.table(results.edgeVoltagesAtStart);
			console.table(results.componentVoltageDrops);
			console.table(results.nodeVoltages);
			console.table(results.nodeStateChanges.map((node) => node.state));

			updatedEdges.forEach((currentEdge) => {
				const newVoltage =
					results.edgeVoltagesAtStart?.find((edge) => edge.edgeId === currentEdge.id)?.voltage ?? 0;
				// Solo actualiza si el voltaje de la arista ha cambiado
				if (currentEdge.data?.voltage !== newVoltage) {
					updateEdge(currentEdge.id, {
						...currentEdge,
						data: {
							...currentEdge.data,
							voltage: newVoltage,
						},
					});
				}
			});

			results.nodeStateChanges.forEach((nodeUpdate) => {
				const currentNode = nodes.find((nodeFind) => nodeFind.id === nodeUpdate.id);
				if (currentNode) {
					// *** ¡CRÍTICO!: Solo llama a updateNode si el estado 'on' es realmente diferente ***
					if (currentNode.data.state?.on !== nodeUpdate.state.on) {
						updateNode(nodeUpdate.id, {
							...currentNode,
							data: {
								...currentNode?.data,
								state: {
									...currentNode?.data.state,
									on: nodeUpdate.state.on,
								},
							},
						});
					} else {
						// console.log(`Nodo ${nodeUpdate.id}: 'on' sin cambios (${currentNode.data.state?.on}). No se actualiza.`);
					}
				}
			});
		} else {
			openNotification("topRight", message);
			setIsSimulationRunning(false); // Detener simulación en caso de error
		}
	};

	return (
		<>
			{contextHolder}
			<Tooltip title={isSimulationRunning ? "Pause Simulation" : "Run Simulation"}>
				<Button
					type="text"
					icon={
						isSimulationRunning ? (
							<PauseOutlined style={{ fontSize: "1.3em", color: "var(--success-color)" }} />
						) : (
							<CaretRightFilled style={{ fontSize: "1.5em", color: "var(--success-color)" }} />
						)
					}
					onClick={handleSimulationClick}
				/>
			</Tooltip>
		</>
	);
}
