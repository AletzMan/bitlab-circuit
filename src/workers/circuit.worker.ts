// circuit.worker.ts
// Asegúrate de que todas estas funciones y tipos estén disponibles aquí,
// ya sea que las definas directamente o las importes de otros archivos (si tu proyecto está modularizado).
// Si importas de otros archivos, esos archivos también deben ser accesibles/empaquetados por tu bundler para el worker.

import { AnalogNode, ComponentEdge } from "../types"; // Ajusta la ruta a tus tipos
import {
	calculateVoltageDropPerEdge,
	CombinedCircuitResults,
	isSimulationReady,
	offAllComponents,
} from "./functions";
onmessage = (event) => {
	const { type, payload } = event.data;
	if (type === "startSimulation") {
		const { nodesArray, edgesArray } = payload;

		// Reconstruye Maps si los pasaste como arrays de entradas desde el hilo principal
		// Si ya son AnalogNode[] y ComponentEdge[], puedes usarlos directamente.
		const nodes: AnalogNode[] = nodesArray;
		const edges: ComponentEdge[] = edgesArray;
		try {
			// 1. Ejecuta isSimulationReady en el worker
			const { isReady, message, updatedEdges } = isSimulationReady(nodes, edges);
			if (!isReady) {
				// Si la simulación no está lista, envía un mensaje de error de vuelta al hilo principal
				self.postMessage({ type: "simulationError", message });
				return; // Termina la ejecución en el worker para este mensaje
			}

			// 2. Si la simulación está lista, ejecuta calculateVoltageDropPerEdge en el worker
			const results: CombinedCircuitResults = calculateVoltageDropPerEdge(
				updatedEdges, // Usa los updatedEdges de isSimulationReady
				nodes
			);

			// 3. Envía los resultados y los edges actualizados de vuelta al hilo principal
			postMessage({
				type: "simulationResults",
				results: results,
				updatedEdgesForDisplay: updatedEdges,
			});
		} catch (error) {
			postMessage({ type: "simulationError", message: "Error al ejecutar la simulación" });
		}
	} else if (type === "stopSimulation") {
		// Lógica para apagar componentes, si necesitas hacerlo en el worker
		const { nodesArray } = payload;
		const nodes: AnalogNode[] = nodesArray;
		const updatedNodes = offAllComponents(nodes);
		postMessage({ type: "componentsOff", updatedNodes: updatedNodes });
	}
};
