import React, {
	createContext,
	useContext,
	useCallback,
	useRef,
	useState,
	ReactNode,
	useMemo,
} from "react";
import { AnalogNode, HistoryAction } from "../types";
import { Edge, useReactFlow } from "@xyflow/react";
import { reorderComponentDesignators } from "../helpers";

type HistoryItem = {
	action: HistoryAction;
	data:
		| AnalogNode
		| AnalogNode[]
		| Edge
		| Edge[]
		| { oldNode: AnalogNode; updatedNode: AnalogNode }
		| undefined;
};

interface HistoryContextType {
	addNode: (node: AnalogNode | undefined) => void;
	removeNode: (nodes: AnalogNode[]) => void;
	addEdge: (edge: Edge | undefined) => void;
	removeEdge: (edges: Edge[]) => void;
	recordNodeMove: (oldNode: AnalogNode, updatedNode: AnalogNode) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
}

const deepCopy = <T,>(obj: T): T => {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
	try {
		// ¡Cuidado! Esto solo funciona para objetos JSON serializables.
		// Si AnalogNode o Edge tienen funciones, Date, o clases, JSON.stringify fallará.
		// Para estructuras complejas, considera usar una librería como `lodash.clonedeep`.
		return JSON.parse(JSON.stringify(obj));
	} catch (e) {
		console.error("Error al hacer deepCopy con JSON.parse(JSON.stringify()):", e);
		console.warn(
			"El objeto podría contener datos no serializables y se hará una copia superficial:",
			obj
		);
		// Fallback: una copia superficial si JSON.stringify falla.
		return { ...obj };
	}
};

export const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

interface HistoryProviderProps {
	children: ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const currentIndex = useRef<number>(-1); // -1: historial vacío, 0: primera acción

	// useReactFlow debe ser llamado dentro de ReactFlowProvider
	// Esto significa que HistoryProvider debe ser un hijo de ReactFlowProvider
	const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

	// Modificada para recibir una sola `HistoryItem` para mayor claridad
	const addToHistory = useCallback((newEntry: HistoryItem) => {
		setHistory((prev) => {
			// Si el currentIndex no apunta al final, truncamos el "futuro" del historial
			const newHistory = prev.slice(0, currentIndex.current + 1);
			const updated = [...newHistory, deepCopy(newEntry)]; // Asegura copia profunda al añadir
			currentIndex.current = updated.length - 1;
			return updated;
		});
	}, []);

	// --- Funciones internas que modifican el estado de React Flow (NO AÑADEN al historial) ---
	// Estas son las que se llaman desde undo/redo para aplicar los cambios.
	const _addNodes = useCallback(
		(nodesToAdd: AnalogNode[]) => {
			setNodes((prev) => [...prev, ...nodesToAdd]);
		},
		[setNodes]
	);

	const _addEdges = useCallback(
		(edgesToAdd: Edge[]) => {
			setEdges((prev) => [...prev, ...edgesToAdd]);
		},
		[setEdges]
	);

	const _removeNodes = useCallback(
		(nodesToRemove: AnalogNode[]) => {
			const remaining = getNodes().filter((n) => !nodesToRemove.some((r) => r.id === n.id));
			const reordered = reorderComponentDesignators(remaining as AnalogNode[]);
			setNodes(reordered);
		},
		[getNodes, setNodes]
	);

	const _removeEdges = useCallback(
		(edgesToRemove: Edge[]) => {
			const remaining = getEdges().filter((e) => !edgesToRemove.some((r) => r.id === e.id));
			setEdges(remaining);
		},
		[getEdges, setEdges]
	);

	// Función interna para actualizar la posición de un nodo por su ID
	const _updateNodePosition = useCallback(
		(nodeId: string, position: { x: number; y: number }) => {
			setNodes((prevNodes) =>
				prevNodes.map((n) => (n.id === nodeId ? { ...n, position: position } : n))
			);
		},
		[setNodes]
	);

	// --- Acciones del usuario (estas funciones SÍ AÑADEN al historial) ---

	const addNode = useCallback(
		(node: AnalogNode | undefined) => {
			if (!node) return;
			_addNodes([node]);
			addToHistory({ action: HistoryAction.AddNode, data: deepCopy(node) });
		},
		[_addNodes, addToHistory]
	);

	const addEdge = useCallback(
		(edge: Edge | undefined) => {
			if (!edge) return;
			_addEdges([edge]);
			addToHistory({ action: HistoryAction.AddEdge, data: deepCopy(edge) });
		},
		[_addEdges, addToHistory]
	);

	const removeNode = useCallback(
		(nodes: AnalogNode[]) => {
			if (!nodes || nodes.length === 0) return;
			_removeNodes(nodes);
			addToHistory({ action: HistoryAction.RemoveNode, data: deepCopy(nodes) });
		},
		[_removeNodes, addToHistory]
	);

	const removeEdge = useCallback(
		(edges: Edge[]) => {
			if (!edges || edges.length === 0) return;
			_removeEdges(edges);
			addToHistory({ action: HistoryAction.RemoveEdge, data: deepCopy(edges) });
		},
		[_removeEdges, addToHistory]
	);

	// ********* FUNCIÓN PARA REGISTRAR MOVIMIENTOS *********
	// Recibe el estado del nodo ANTES y DESPUÉS del movimiento.
	const recordNodeMove = useCallback(
		(oldNode: AnalogNode, updatedNode: AnalogNode) => {
			// Solo registra si la posición realmente cambió
			if (
				oldNode.position.x !== updatedNode.position.x ||
				oldNode.position.y !== updatedNode.position.y
			) {
				// Guarda AMBOS nodos (deepCopy debería asegurar que sean inmutables)
				addToHistory({
					action: HistoryAction.MoveNode,
					data: { oldNode: deepCopy(oldNode), updatedNode: deepCopy(updatedNode) },
				});
			}
		},
		[addToHistory]
	);

	// --- Lógica de Deshacer / Rehacer ---

	const undo = useCallback(() => {
		// No se puede deshacer si el puntero está antes de la primera acción (o si no hay acciones)
		if (currentIndex.current < 0) {
			console.warn("UNDO: Ya no hay más acciones para deshacer.");
			return;
		}

		const actionToUndo = history[currentIndex.current]; // Obtiene la acción en el índice actual

		switch (actionToUndo.action) {
			case HistoryAction.AddNode:
				// Para deshacer un AddNode, lo eliminamos. Data es un solo AnalogNode.
				_removeNodes([actionToUndo.data as AnalogNode]);
				break;
			case HistoryAction.AddEdge:
				// Para deshacer un AddEdge, lo eliminamos. Data es un solo Edge.
				_removeEdges([actionToUndo.data as Edge]);
				break;
			case HistoryAction.RemoveNode:
				// Para deshacer un RemoveNode, lo volvemos a añadir. Data es un array de AnalogNode.
				_addNodes(actionToUndo.data as AnalogNode[]);
				break;
			case HistoryAction.RemoveEdge:
				// Para deshacer un RemoveEdge, lo volvemos a añadir. Data es un array de Edge.
				_addEdges(actionToUndo.data as Edge[]);
				break;
			case HistoryAction.MoveNode:
				const moveDataUndo = actionToUndo.data as { oldNode: AnalogNode; updatedNode: AnalogNode };
				// Para deshacer un movimiento, volvemos a la posición del oldNode
				_updateNodePosition(moveDataUndo.oldNode.id, moveDataUndo.oldNode.position);
				break;
			default:
				console.warn("UNDO: Acción no reconocida o no manejada:", actionToUndo.action);
		}
		currentIndex.current--; // Mueve el puntero UNA posición hacia atrás después de deshacer
		setHistory((prev) => [...prev]);
	}, [history, _addNodes, _addEdges, _removeNodes, _removeEdges, _updateNodePosition]);

	const redo = useCallback(() => {
		// No se puede rehacer si el puntero ya está en la última acción del historial
		if (currentIndex.current >= history.length - 1) {
			console.warn("REDO: Ya no hay más acciones para rehacer.");
			return;
		}

		currentIndex.current++; // Mueve el puntero UNA posición hacia adelante ANTES de rehacer
		const actionToRedo = history[currentIndex.current]; // Obtiene la acción en el nuevo índice

		switch (actionToRedo.action) {
			case HistoryAction.AddNode:
				// Para rehacer un AddNode, lo volvemos a añadir. Data es un solo AnalogNode.
				_addNodes([actionToRedo.data as AnalogNode]);
				break;
			case HistoryAction.AddEdge:
				// Para rehacer un AddEdge, lo volvemos a añadir. Data es un solo Edge.
				_addEdges([actionToRedo.data as Edge]);
				break;
			case HistoryAction.RemoveNode:
				// Para rehacer un RemoveNode, lo volvemos a eliminar. Data es un array.
				_removeNodes(actionToRedo.data as AnalogNode[]);
				break;
			case HistoryAction.RemoveEdge:
				// Para rehacer un RemoveEdge, lo volvemos a eliminar. Data es un array.
				_removeEdges(actionToRedo.data as Edge[]);
				break;
			case HistoryAction.MoveNode:
				const moveDataRedo = actionToRedo.data as { oldNode: AnalogNode; updatedNode: AnalogNode };
				// Para rehacer un movimiento, volvemos a la posición del updatedNode
				_updateNodePosition(moveDataRedo.updatedNode.id, moveDataRedo.updatedNode.position);
				break;
			default:
				console.warn("REDO: Acción no reconocida o no manejada:", actionToRedo.action);
		}
		setHistory((prev) => [...prev]);
	}, [history, _addNodes, _addEdges, _removeNodes, _removeEdges, _updateNodePosition]);

	// Comprobación de si se puede deshacer/rehacer
	const canUndo = useMemo(() => currentIndex.current >= 0, [currentIndex.current]);
	const canRedo = useMemo(
		() => currentIndex.current < history.length - 1,
		[history.length, currentIndex.current]
	);
	console.log(currentIndex.current, history.length);

	const contextValue = {
		addNode,
		removeNode,
		addEdge,
		removeEdge,
		recordNodeMove,
		undo,
		redo,
		canUndo,
		canRedo,
	};

	return <HistoryContext.Provider value={contextValue}>{children}</HistoryContext.Provider>;
};

export const useHistory = () => {
	const context = useContext(HistoryContext);
	if (context === undefined) {
		throw new Error("useHistory must be used within a HistoryProvider.");
	}
	return context;
};
