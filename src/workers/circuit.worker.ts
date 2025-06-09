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
console.log("¡Hola desde el worker simple!"); // Esto será la línea 1
onmessage = (event) => {
	const { type, payload } = event.data;
	console.log("Worker: Mensaje recibido:", event.data);
	if (type === "startSimulation") {
		const { nodesArray, edgesArray } = payload;

		// Reconstruye Maps si los pasaste como arrays de entradas desde el hilo principal
		// Si ya son AnalogNode[] y ComponentEdge[], puedes usarlos directamente.
		const nodes: AnalogNode[] = nodesArray;
		const edges: ComponentEdge[] = edgesArray;
		try {
			//console.log("Worker: Llamando a isSimulationReady..."); // <-- Agrega este log

			// 1. Ejecuta isSimulationReady en el worker
			const { isReady, message, updatedEdges, paths, graph } = isSimulationReady(nodes, edges);
			//console.log("Worker: isSimulationReady resultado:", isReady, message); // <-- Agrega este log

			if (!isReady) {
				console.log("Worker: Simulación no lista, enviando error."); // <-- Agrega este log

				// Si la simulación no está lista, envía un mensaje de error de vuelta al hilo principal
				self.postMessage({ type: "simulationError", message });
				return; // Termina la ejecución en el worker para este mensaje
			}
			//console.log("Worker: Simulación lista, llamando a calculateVoltageDropPerEdge..."); // <-- Agrega este log

			// 2. Si la simulación está lista, ejecuta calculateVoltageDropPerEdge en el worker
			const results: CombinedCircuitResults = calculateVoltageDropPerEdge(
				updatedEdges, // Usa los updatedEdges de isSimulationReady
				nodes,
				paths,
				graph
			);

			console.log("Worker: Objeto de resultados FINAL que se envía:", {
				type: "simulationResults",
				results: results,
				updatedEdgesForDisplay: updatedEdges,
			});

			// 3. Envía los resultados y los edges actualizados de vuelta al hilo principal
			postMessage({
				type: "simulationResults",
				results: results,
				// También puedes enviar updatedEdges si tu UI necesita esos datos específicos
				// de la fase de isSimulationReady para actualizar la visualización de los edges.
				updatedEdgesForDisplay: updatedEdges,
			});
		} catch (error) {
			console.error("Worker: Error al ejecutar la simulación:", error);
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
