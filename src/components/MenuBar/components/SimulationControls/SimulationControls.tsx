import { changeVoltageView } from "@/helpers";
import { useSimulation } from "@/store";
import { AnalogNode, ComponentEdge, ComponentType } from "@/types";
import { ComponentInfo, EdgeInfo } from "@/workers/functions";
import { CaretRightFilled, PauseOutlined } from "@ant-design/icons";
import { useReactFlow, useStore } from "@xyflow/react";
import { Button, notification, Tooltip } from "antd";
import { useEffect, useRef } from "react";

// --- Función para generar un hash de los estados de los interruptores ---
function getSwitchStatesHash(nodes: AnalogNode[]): string {
	return nodes
		.filter(
			(node) =>
				node.data.type === ComponentType.SwitchSPST ||
				node.data.type === ComponentType.PusuhButtonOpen ||
				node.data.type === ComponentType.PusuhButtonClose
		)
		.sort((a, b) => a.id.localeCompare(b.id))
		.map((node) => `${node.id}:${node.data.state?.on ? "on" : "off"}`)
		.join(",");
}
// ----------------------------------------------------------------------

export function SimulationControls() {
	const { setIsSimulationRunning, isSimulationRunning } = useSimulation();
	const [api, contextHolder] = notification.useNotification();
	const workerRef = useRef<Worker | null>(null);
	const { getNodes, getEdges, updateEdge, updateNode } = useReactFlow(); // <-- Importa setNodes y setEdges

	// Estado para detectar cambios en interruptores
	const switchStatesHashRef = useRef<string>("");

	// Hook para el worker
	useEffect(() => {
		workerRef.current = new Worker(
			new URL("../../../../workers/circuit.worker.ts", import.meta.url),
			{
				type: "module",
			}
		);

		workerRef.current.onmessage = (event: MessageEvent) => {
			const { type, results, message } = event.data; // Desestructuramos para acceder a 'results'
			console.log("Hilo principal: Mensaje recibido del worker:", event.data);

			if (type === "simulationResults") {
				// Aquí es donde tomas los resultados y los aplicas a los nodos y aristas.
				// Los `updatedNodes` y `updatedEdgesForDisplay` vienen dentro del objeto `results`
				// enviado desde el worker.
				if (results?.updatedNodes) {
					console.log("Nodos actualizados aplicados:", results.updatedNodes);
					const updatedNodes = results.updatedNodes as ComponentInfo[];
					updatedNodes.forEach((node) => {
						updateNode(node.componentId, (prevNode) => ({
							data: {
								...prevNode.data,
								voltageDrop: node.voltageDrop,
								currentDrop: node.currentDrop,
								state: { on: node.isOn },
							},
						}));
					});
				}
				if (results.circuitResults) {
					console.log("Resultados de la simulación:");
					console.dir(results.circuitResults);
				}
				if (results.updatedEdges) {
					console.log("Aristas actualizadas aplicadas:", results.updatedEdges);
					const updatedEdges = results.updatedEdges as EdgeInfo[];

					updatedEdges.forEach((edge) => {
						changeVoltageView(edge.edgeId, edge.voltageDisplay);
						console.log("Edge:", edge);
						updateEdge(edge.edgeId, (prevEdge) => ({
							data: {
								...prevEdge.data,
								path: "REr",
								voltage: edge.voltageDisplay,
							},
						}));
					});
				}

				if (results?.error) {
					openNotificationWithIcon("error", "Error de Simulación", results.error);
				}
			} else if (type === "simulationError") {
				openNotificationWithIcon("error", "Error del Worker", message);
				setIsSimulationRunning(false); // Detener la simulación en caso de error
			}
		};

		workerRef.current.onerror = (error) => {
			console.error("Error del Web Worker:", error);
			openNotificationWithIcon(
				"error",
				"Error Crítico del Worker",
				"Ha ocurrido un error inesperado en la simulación."
			);
			setIsSimulationRunning(false); // Detener la simulación en caso de error
		};

		return () => {
			if (workerRef.current) {
				workerRef.current.terminate();
				workerRef.current = null;
			}
		};
	}, []); // Dependencias: [] para que se ejecute solo una vez al montar el componente

	// Hook para detectar cambios en los interruptores y reiniciar la simulación
	// No usa `useNodes` de ReactFlow para evitar re-renderizados innecesarios del componente
	// cuando cambian otras propiedades del nodo. Solo reacciona a cambios en los interruptores.
	const nodes = useStore((state) => state.nodes);

	useEffect(() => {
		if (!isSimulationRunning) return; // Solo si la simulación está corriendo

		const currentSwitchStatesHash = getSwitchStatesHash(nodes as AnalogNode[]);

		if (
			switchStatesHashRef.current !== "" &&
			switchStatesHashRef.current !== currentSwitchStatesHash
		) {
			console.log("Cambio en el estado de los interruptores detectado. Reiniciando simulación...");
			startSimulation(); // Reinicia la simulación si cambian los interruptores
		}
		switchStatesHashRef.current = currentSwitchStatesHash;
	}, [nodes, isSimulationRunning]); // Depende de `nodes` y `isSimulationRunning`

	const openNotificationWithIcon = (
		type: "success" | "info" | "warning" | "error",
		message: string,
		description: string
	) => {
		api[type]({
			message: message,
			description: description,
			placement: "topRight",
			duration: 3,
		});
	};

	const handleRunPauseSimulation = () => {
		if (isSimulationRunning) {
			if (workerRef.current) {
				// Usa workerRef.current
				console.log("Hilo principal: postMessage a worker (stop):", workerRef.current); // LOG AQUI
				workerRef.current.postMessage({
					type: "stopSimulation",
					payload: {
						nodesArray: getNodes() as AnalogNode[],
					},
				});
			}
			setIsSimulationRunning(false);
			return;
		}
		startSimulation();
		setIsSimulationRunning(true);
	};

	const startSimulation = () => {
		const nodes = getNodes() as AnalogNode[];
		const edges = getEdges() as ComponentEdge[];

		if (workerRef.current) {
			workerRef.current.postMessage({
				type: "startSimulation",
				payload: {
					nodesArray: nodes,
					edgesArray: edges,
				},
			});
		} else {
			console.error("Worker no inicializado para simulación.");
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
							<PauseOutlined style={{ color: "var(--accent-color)" }} />
						) : (
							<CaretRightFilled style={{ color: "var(--accent-color)" }} />
						)
					}
					onClick={handleRunPauseSimulation}
				/>
			</Tooltip>
		</>
	);
}
