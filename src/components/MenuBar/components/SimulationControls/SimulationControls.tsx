// En src/components/MenuBar/components/SimulationControls/SimulationControls.tsx

import { useSimulation } from "@/store";
import { AnalogNode, ComponentEdge, ComponentType } from "@/types"; // Importa tus tipos
import { CombinedCircuitResults } from "@/workers/functions"; // Asegúrate de que esta importación sea correcta y worker-compatible
import { CaretRightFilled, PauseOutlined } from "@ant-design/icons";
import { useReactFlow, useStore } from "@xyflow/react";
import { Button, notification, Tooltip } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useEffect, useRef } from "react"; // `useState` ya no para el worker, pero se usa para otros estados

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
	const { getNodes, getEdges, updateEdge, updateNode } = useReactFlow();
	const [api, contextHolder] = notification.useNotification();
	const lastSimulatedHashRef = useRef<string | null>(null);

	// *** ¡VUELTA A USAR useRef PARA EL WORKER! ***
	const workerRef = useRef<Worker | null>(null);

	const switchStateHash = useStore((state) => getSwitchStatesHash(state.nodes as AnalogNode[]));

	useEffect(() => {
		// Inicializa el worker solo una vez cuando el componente se monte
		if (!workerRef.current) {
			const circuitWorker = new Worker(
				new URL("../../../../workers/circuit.worker?worker", import.meta.url),
				{ type: "module" }
			);

			// Asigna el worker a la referencia
			workerRef.current = circuitWorker;
			console.log(
				"Hilo principal: Worker CREADO y asignado a workerRef.current:",
				workerRef.current
			); // LOG AQUI

			// Manejar mensajes del Web Worker
			circuitWorker.onmessage = (event) => {
				console.log("Hilo principal: Datos recibidos COMPLETOS del worker:", event.data); // LOG AQUI
				const { type, results, message, updatedNodes, updatedEdgesForDisplay } = event.data;

				if (type === "simulationResults") {
					const simulationResults: CombinedCircuitResults = results;
					const initialEdgesFromWorker: ComponentEdge[] = updatedEdgesForDisplay;

					console.table(simulationResults.edgeVoltagesAtStart);
					console.table(simulationResults.componentVoltageDrops);
					console.table(simulationResults.nodeVoltages);
					console.log(simulationResults.nodeStateChanges);
					console.log("Edges updated:", JSON.stringify(updatedEdgesForDisplay));

					// Aquí actualizas tu ReactFlow con los resultados
					simulationResults.edgeVoltagesAtStart.forEach((currentEdgeResult) => {
						const currentEdgeData = initialEdgesFromWorker.find(
							(edge) => edge.id === currentEdgeResult.edgeId
						);
						if (currentEdgeData) {
							updateEdge(currentEdgeData.id, {
								...currentEdgeData,
								data: {
									...currentEdgeData.data,
									voltage: currentEdgeResult.voltage,
									current: currentEdgeResult.current,
									flowDirection: currentEdgeData.data?.flowDirection,
								},
							});
						}
					});

					simulationResults.nodeStateChanges.forEach((nodeUpdate) => {
						updateNode(nodeUpdate.id, (currentNode) => {
							if ((currentNode as AnalogNode).data.state?.on !== nodeUpdate.state.on) {
								return {
									...currentNode,
									data: {
										...currentNode.data,
										state: {
											...(currentNode as AnalogNode).data.state,
											on: nodeUpdate.state.on,
										},
									},
								};
							}
							return currentNode;
						});
					});
				} else if (type === "simulationError") {
					openNotification("topRight", message);
					setIsSimulationRunning(false);
				} else if (type === "componentsOff") {
					const updatedNodesTwo: AnalogNode[] = updatedNodes;
					updatedNodesTwo.forEach((node) => {
						updateNode(node.id, node);
					});
				}
			};

			circuitWorker.onerror = (error) => {
				console.error("Error en el Web Worker:", error);
				openNotification("topRight", "Ocurrió un error en la simulación. Revisa la consola.");
				setIsSimulationRunning(false);
			};
		}

		// Lógica de inicio/reinicio de simulación
		if (isSimulationRunning) {
			if (lastSimulatedHashRef.current !== switchStateHash) {
				startSimulation();
				lastSimulatedHashRef.current = switchStateHash;
			} else {
				console.log("🔁 El estado del interruptor no cambió, no se vuelve a simular.");
			}
		}

		// Limpieza: terminar el worker cuando el componente se desmonte
		return () => {
			if (workerRef.current) {
				console.log("Hilo principal: Terminando worker:", workerRef.current); // LOG AQUI
				workerRef.current.terminate();
				workerRef.current = null;
			}
		};
	}, [isSimulationRunning, switchStateHash, updateEdge, updateNode, api, setIsSimulationRunning]); // Dependencias del useEffect

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
	}

	const startSimulation = () => {
		const nodes = getNodes() as AnalogNode[];
		const edges = getEdges() as ComponentEdge[];

		if (workerRef.current) {
			// Usa workerRef.current
			console.log("Hilo principal: postMessage a worker (start):", workerRef.current); // LOG AQUI
			console.log("NODES", nodes);
			workerRef.current.postMessage({
				type: "startSimulation",
				payload: {
					nodesArray: nodes,
					edgesArray: edges,
				},
			});
			console.log("Datos de simulación enviados al Web Worker...");
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
