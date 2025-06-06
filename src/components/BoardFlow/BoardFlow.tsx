/* eslint-disable react-hooks/exhaustive-deps */

import {
	Background,
	Connection,
	Edge,
	ReactFlow,
	useEdgesState,
	useNodesState,
	ConnectionMode,
	useReactFlow,
	reconnectEdge,
	OnNodeDrag,
	Viewport,
	SelectionMode,
	OnSelectionChangeFunc,
	OnSelectionChangeParams,
	OnEdgesChange,
	XYPosition,
} from "@xyflow/react";
import { DragEvent, useCallback, useRef, KeyboardEvent, useEffect } from "react";
import { ComponentEdge, AnalogNode, ComponentCollapsed, ComponentType } from "@/types";
import { Wire } from "@/components/Wire/Wire";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import { ConnectionLine } from "@/components/ConnectionLine/ConnectionLine";
import { AnalogComponent } from "@/components/ElectronicComponents/AnalogComponent/AnalogComponent";
import { Board } from "@/components/ElectronicComponents/Board/Board";
import { NodeComponent } from "@/components/ElectronicComponents/NodeComponent/NodeComponent";
import { TransistorComponent } from "@/components/ElectronicComponents/TransistorComponent/TransistorComponent";
import { MechanicalComponent } from "@/components/ElectronicComponents/MechanicalComponent/MechanicalComponent";
import { getComponentProperties, getNewPositionByOverlapping, isPointInBox } from "@/helpers";
import { ConfigProvider, theme } from "antd";
import { useHistory } from "@/contexts/HistoryContext";
import { ComponentsMap } from "@/constants/components";
import { useSelectedItemsState } from "@/hooks/useSelectedItemsState";
import { useSettings, useTheme } from "@/store";
import { SwitchSPDT } from "../ElectronicComponents/SwitchSPDT/SwitchSPDT";
import { SwitchDPST } from "../ElectronicComponents/SwitchDPST/SwitchDPST";
import { SwitchDPDT } from "../ElectronicComponents/SwitchDPDT/SwitchDPDT";
import { RelayDPST } from "../ElectronicComponents/RelayDPST/RelayDPST";
import { RelaySPDT } from "../ElectronicComponents/RelaySPDT/RelaySPDT";
import { RelayDPDT } from "../ElectronicComponents/RelayDPDT/RelayDPDT";
import { RelaySPST } from "../ElectronicComponents/RelaySPST/RelaySPST";
import { LogicGate } from "../ElectronicComponents/LogicGate/LogicGate";
import { PowerSupply } from "../ElectronicComponents/PowerSupply/PowerSupply";
import { Battery } from "../ElectronicComponents/Battery/Battery";
import { MenuBar } from "../MenuBar/MenuBar";
import { SideTools } from "../SideTools/SideTools";

const initialNodes: AnalogNode[] = [
	/*{
		id: uuid(),
		type: "analogComponent",
		data: {
			name: "Resistor",
			category: Categories.Resistors,
			type: ComponentType.Resistor,
			value: 1,
			rotation: 0,
			flip: { x: 1, y: 1 },
			collapsed: ComponentCollapsed.Undefined,
			isLock: false,
			unit: UnitsType.Ohm,
			prefix: "KΩ",
			has_properties: true,
			designator: "R1",
			isValueVisible: true,
			isDesignatorVisible: true,
			connectedHandles: [false, false],
			size: "small",
		},
		position: { x: 100, y: 170 },
	},
	{
		id: uuid(),
		type: "analogComponent",
		data: {
			name: "Capacitor",
			category: Categories.Capacitors,
			type: ComponentType.Capacitor,
			value: 4.7,
			rotation: 0,
			flip: { x: 1, y: 1 },
			collapsed: ComponentCollapsed.Undefined,
			isLock: false,
			unit: UnitsType.Capacitance,
			prefix: "µF",
			has_properties: true,
			designator: "C1",
			isValueVisible: true,
			isDesignatorVisible: true,
			connectedHandles: [false, false],
			size: "small",
		},
		position: { x: 240, y: 170 },
	},
	{
		id: uuid(),
		type: "nodeComponent",
		data: {
			name: "Node",
			category: Categories.Structure,
			type: ComponentType.Node,
			value: 0,
			rotation: 0,
			flip: { x: 1, y: 1 },
			collapsed: ComponentCollapsed.Undefined,
			isLock: false,
			unit: UnitsType.Undefined,
			prefix: "",
			has_properties: false,
			designator: "N1",
			isValueVisible: false,
			isDesignatorVisible: false,
			connectedHandles: [false, false, false, false],
			color: "var(--foreground-color)",
			size: "small",
		},
		position: { x: 90, y: 90 },
	},*/
];

const initialEdges: ComponentEdge[] = [];

const nodeTypes = {
	analogComponent: AnalogComponent,
	nodeComponent: NodeComponent,
	transistorComponent: TransistorComponent,
	mechanicalComponent: MechanicalComponent,
	board: Board,
	switchSPDT: SwitchSPDT,
	switchDPST: SwitchDPST,
	switchDPDT: SwitchDPDT,
	relaySPST: RelaySPST,
	relayDPST: RelayDPST,
	relaySPDT: RelaySPDT,
	relayDPDT: RelayDPDT,
	logicGate: LogicGate,
	powerSupply: PowerSupply,
	battery: Battery,
};

const edgeTypes = {
	wire: Wire,
	custom: Wire,
};

const GRID_SIZE = 10;
export function BoardFlow() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<ComponentEdge>(initialEdges);
	const currentGridType = useSettings((state) => state.currentGridType);
	const setActiveTab = useSettings((state) => state.setActiveTab);
	const setViewPort = useSettings((state) => state.setViewPort);
	const viewPort = useSettings((state) => state.viewPort);
	const viewTools = useSettings((state) => state.viewTools);
	const dragOutsideRef = useRef<ComponentType | null>(null);
	const edgeReconnectSuccessful = useRef(false);
	const overlappingNodeRef = useRef<AnalogNode | null>(null);
	const { screenToFlowPosition, getIntersectingNodes, updateNode } = useReactFlow();
	const { addNode, addEdge, removeEdge, recordNodeMove } = useHistory();
	const nodeSelection = useRef<AnalogNode | null>(null);
	const nodeBeingDragged = useRef<AnalogNode | null>(null);
	const { currentTheme } = useTheme();
	const {
		selectedNode,
		setSelectedNode,
		setSelectedNodes,
		selectedEdge,
		setSelectedEdge,
		setSelectedEdges,
		setIsSingleNodeSelection,
		setIsSingleEdgeSelection,
	} = useSelectedItemsState();

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", currentTheme);
	}, []);

	const onConnect = useCallback(
		(connection: Connection) => {
			const edge = {
				...connection,
				id: uuid(),
				data: {
					color:
						nodes.find((node) => node.id === connection.target)?.data.color ||
						nodes.find((node) => node.id === connection.source)?.data.color ||
						"var(--foreground-color)",
				},
			};
			addEdge(edge);
		},
		[addEdge]
	);

	const isConnectionValid = (connection: Edge | Connection) => {
		const { source, target } = connection;
		if (source === target) return false;
		return true;
	};

	const handleOnDragover = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const type = dragOutsideRef.current;
		if (!type) return;
		let position = screenToFlowPosition({
			x: e.clientX - 30,
			y: e.clientY - 30,
		});

		const boards = nodes?.filter((node) => node.type === ComponentType.Board);
		const board = boards.find((board) => {
			return isPointInBox(
				{ x: position.x, y: position.y },
				{
					x: board.position?.x || 0,
					y: board?.position?.y || 0,
					height: board?.measured?.height || 0,
					width: board?.measured?.width || 0,
				}
			);
		});

		if (board) {
			const { x, y } = board?.position || {
				x: 0,
				y: 0,
			};
			const { x: dragX, y: dragY } = position || {
				x: 0,
				y: 0,
			};
			position = { x: dragX - x, y: dragY - y };
		}

		let node: AnalogNode | undefined;

		const {
			value,
			unit,
			prefix,
			designator,
			type: typeComponent,
			has_properties,
			isDesignatorVisible,
			isValueVisible,
			connectedHandles,
			color,
			style,
			size,
			name,
			category,
			collapsed,
			state,
			value_optional,
			unit_optional,
			prefix_optional,
			isValueOptionalVisible,
		} = getComponentProperties(type, nodes);
		if ((type as ComponentType) && Object.keys(ComponentsMap).includes(type)) {
			node = {
				id: `${designator.replace(/\d+/g, "")}-${uuid()}`,
				type: typeComponent,
				position,
				data: {
					name,
					type,
					category,
					value,
					isLock: false,
					rotation: 0,
					flip: { x: 1, y: 1 },
					collapsed,
					state,
					unit,
					prefix,
					has_properties,
					designator,
					isDesignatorVisible,
					isValueVisible,
					connectedHandles: connectedHandles.map((handles) => ({ ...handles })),
					color,
					size,
					value_optional,
					unit_optional,
					prefix_optional,
					isValueOptionalVisible,
				},
				parentId: board?.id,
				style,
			};
		}
		if (node) {
			addNode(node);
		}
	};

	const handleOnNodeDragStart = (_e: React.MouseEvent<Element>, node: AnalogNode) => {
		setActiveTab("properties");
		nodeBeingDragged.current = JSON.parse(JSON.stringify(node));
		setSelectedNode(node);
	};

	const handleNodeClick = (_e: React.MouseEvent<Element>, node: AnalogNode) => {
		nodeSelection.current = node;
		setSelectedNode(node);
		setSelectedEdge(undefined);
		setActiveTab("properties");
	};

	const handlePaneClick = () => {
		setSelectedNode(undefined);
		setSelectedEdge(undefined);
		setActiveTab("components");
	};

	const handleOnEdgeClick = (e: React.MouseEvent<Element, MouseEvent>, edge: ComponentEdge) => {
		e.preventDefault();
		console.log(edge);
		setSelectedEdge(edge);
		setSelectedNode(undefined);
		setActiveTab("properties");
	};

	const handleReconnectStart = () => {
		edgeReconnectSuccessful.current = false;
	};

	const handleReconnect = (oldEdge: ComponentEdge, newConnection: Connection) => {
		edgeReconnectSuccessful.current = true;
		const oldNode = nodes.find((node) => node.id === oldEdge.target);
		const newNode = nodes.find((node) => node.id === newConnection.target);
		if (oldNode && newNode) {
			const newHandlesStateOldNode = [...oldNode?.data.connectedHandles];
			const newHandlesStateNewNode = [...newNode?.data.connectedHandles];
			newHandlesStateOldNode[Number(oldEdge.targetHandle) - 1].isConnected = false;
			newHandlesStateNewNode[Number(newConnection.targetHandle) - 1].isConnected = true;

			updateNode(oldNode?.id, (prevNode) => ({
				data: {
					...prevNode.data,
					connectedHandles: [...newHandlesStateOldNode],
				},
			}));
			updateNode(newConnection.target, (prevNode) => ({
				data: {
					...prevNode.data,
					connectedHandles: [...newHandlesStateNewNode],
				},
			}));
		}
		setEdges((prevEdges) => reconnectEdge(oldEdge, newConnection, prevEdges));
	};

	const handleReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
		if (!edgeReconnectSuccessful.current) {
			removeEdge([edge]);
		}
	};

	const handleOnEdgesChanges: OnEdgesChange<ComponentEdge> = (changes) => {
		onEdgesChange(changes);
	};

	const handleOnNodeDrag: OnNodeDrag<AnalogNode> = (e, dragNode) => {
		e.preventDefault();
		// Encontrar nodos superpuestos
		const overlappingNode = getIntersectingNodes(dragNode)?.[0];
		overlappingNodeRef.current = overlappingNode as AnalogNode;

		// Actualizar nodos y su posición ajustada

		setNodes((prevNodes) =>
			prevNodes.map((node) => {
				if (node.id === dragNode.id) {
					return {
						...node,
						position: {
							x: dragNode.position.x,
							y: dragNode.position.y,
						},
						data: {
							...node.data,
							collapsed:
								overlappingNode &&
								Object.keys(ComponentsMap).includes(overlappingNode?.data?.type as ComponentType)
									? overlappingNode.data.type !== ComponentType.Board
										? ComponentCollapsed.NotAdd
										: undefined
									: undefined,
						},
					};
				}
				return node;
			})
		);
	};

	const handleNodeDragStop: OnNodeDrag<AnalogNode> = (_e, dragNode) => {
		if (nodeBeingDragged.current) {
			const oldNode = nodeBeingDragged.current;
			// ¡CRÍTICO! Obtén una COPIA PROFUNDA del nodo con su posición final.
			const updatedNode = JSON.parse(JSON.stringify(dragNode));

			// Llama a recordNodeMove para registrar el cambio en el historial
			// Solo si la posición realmente cambió
			if (
				oldNode.position.x !== updatedNode.position.x ||
				oldNode.position.y !== updatedNode.position.y
			) {
				recordNodeMove(oldNode, updatedNode);
			}
			nodeBeingDragged.current = null; // Limpia la referencia
		}
		if (
			!overlappingNodeRef.current ||
			(overlappingNodeRef?.current?.type !== ComponentType.Board && dragNode?.parentId)
		) {
			setNodes((prevNodes) => {
				const board = prevNodes?.find((prevNode) => prevNode.id === dragNode?.parentId);

				return prevNodes.map((node) => {
					if (node.id === dragNode.id) {
						const { x, y } = board?.position || { x: 0, y: 0 };
						const { x: dragX, y: dragY } = dragNode?.position || {
							x: 0,
							y: 0,
						};

						return {
							...node,
							position: { x: dragX + x, y: dragY + y },
							parentId: undefined,
						};
					}
					return node;
				});
			});
		}
		const typeComponent = overlappingNodeRef?.current?.data?.type as ComponentType;

		if (
			Object.keys(ComponentsMap).includes(typeComponent) &&
			selectedNode?.data.type !== ComponentType.Board &&
			typeComponent !== ComponentType.Board
		) {
			const newPosition = getNewPositionByOverlapping(
				dragNode.position,
				overlappingNodeRef?.current?.position as XYPosition
			);
			setNodes((prevNodes) =>
				prevNodes.map((node) => {
					if (node.id === dragNode?.id) {
						return {
							...node,
							position: newPosition,
							data: {
								...node?.data,
								collapsed: ComponentCollapsed.Undefined,
							},
						};
					}
					return node;
				})
			);
		}

		if (
			overlappingNodeRef?.current?.type === ComponentType.Board &&
			selectedNode?.data.type !== ComponentType.Board
		) {
			setNodes((prevNodes) => [
				overlappingNodeRef?.current as AnalogNode,
				...prevNodes
					.filter((node) => node.id !== overlappingNodeRef?.current?.id)
					.map((node) => {
						if (node.id === dragNode?.id) {
							const { x, y } = overlappingNodeRef?.current?.position || {
								x: 0,
								y: 0,
							};
							const { x: dragX, y: dragY } = dragNode?.position || {
								x: 0,
								y: 0,
							};

							let position;
							if (!node.parentId) {
								position = { x: dragX - x, y: dragY - y };
							} else if (node.parentId && node?.parentId !== overlappingNodeRef?.current?.id) {
								const prevBoard = prevNodes?.find((node) => node?.id === dragNode?.parentId);
								const { x: prevBoardX, y: prevBoardY } = prevBoard?.position || {
									x: 0,
									y: 0,
								};
								position = {
									x: dragX + prevBoardX - x,
									y: dragY + prevBoardY - y,
								};
							}

							return {
								...node,
								parentId: overlappingNodeRef?.current?.id,
								...((!dragNode?.parentId ||
									dragNode?.parentId !== overlappingNodeRef?.current?.id) && {
									position,
								}),
							};
						}
						return node;
					}),
			]);
		}
	};

	const handleOnSelectionChange: OnSelectionChangeFunc = (params: OnSelectionChangeParams) => {
		const numberNodes = params.nodes.length;
		const numberEdges = params.edges.length;
		const isUniqueNode = numberNodes === 1;
		const isUniqueEdge = numberEdges === 1;
		setIsSingleNodeSelection(isUniqueNode);
		setIsSingleEdgeSelection(isUniqueEdge);
		if (isUniqueNode) setSelectedNode(params.nodes[0] as AnalogNode);
		if (isUniqueEdge) setSelectedEdge(params.edges[0] as ComponentEdge);
		setSelectedNodes(params.nodes as AnalogNode[]);
		setSelectedEdges(params.edges as ComponentEdge[]);
	};

	const handleChangeViewPort = (viewport: Viewport) => {
		setViewPort(viewport);
	};

	const handleSelectionEnd = (e: React.MouseEvent<Element, MouseEvent>) => {
		e.preventDefault();
		if (selectedNode || selectedEdge) {
			setActiveTab("properties");
		} else {
			setActiveTab("components");
		}
	};

	const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const movement = {
			ArrowUp: { dx: 0, dy: -GRID_SIZE / 2 + 5 },
			ArrowDown: { dx: 0, dy: GRID_SIZE / 2 - 5 },
			ArrowLeft: { dx: -GRID_SIZE / 2 + 5, dy: 0 },
			ArrowRight: { dx: GRID_SIZE / 2 - 5, dy: 0 },
		}[e.key];

		if (movement) {
			setNodes((currentNodes) =>
				currentNodes.map((node) => {
					if (node.selected) {
						return {
							...node,
							position: {
								x: node.position.x + movement.dx,
								y: node.position.y + movement.dy,
							},
						};
					}
					return node;
				})
			);
		}
	};

	return (
		<ConfigProvider
			theme={{
				algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
			}}
		>
			<div className={styles.board}>
				<MenuBar />
				<div className={`${styles.flow} ${viewTools ? "" : styles.flow_hidden}`}>
					<ReactFlow
						defaultEdgeOptions={{ type: "wire" }}
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={handleOnEdgesChanges}
						onConnect={onConnect}
						connectionMode={ConnectionMode.Loose}
						nodeTypes={nodeTypes}
						edgeTypes={edgeTypes}
						connectionLineComponent={ConnectionLine}
						isValidConnection={isConnectionValid}
						onDragOver={handleOnDragover}
						onDrop={handleOnDrop}
						onNodeDragStart={handleOnNodeDragStart}
						onEdgeClick={handleOnEdgeClick}
						onNodeClick={handleNodeClick}
						onPaneClick={handlePaneClick}
						onReconnectStart={handleReconnectStart}
						onReconnect={handleReconnect}
						onReconnectEnd={handleReconnectEnd}
						onNodeDrag={handleOnNodeDrag}
						onNodeDragStop={handleNodeDragStop}
						viewport={viewPort}
						onViewportChange={handleChangeViewPort}
						panOnScroll
						maxZoom={25}
						minZoom={0.5}
						zoomOnPinch
						selectionOnDrag
						onSelectionChange={handleOnSelectionChange}
						onSelectionEnd={handleSelectionEnd}
						snapGrid={[GRID_SIZE, GRID_SIZE]}
						snapToGrid
						panOnDrag={[1, 2]}
						selectNodesOnDrag
						selectionMode={SelectionMode.Partial}
						onKeyDown={handleOnKeyDown}
					>
						<Background
							color={"var(--grid-small-color)"}
							gap={GRID_SIZE}
							variant={currentGridType}
							id="1"
							size={1.5}
						/>
						<Background
							color={"var(--grid-large-color)"}
							gap={GRID_SIZE * 10}
							variant={currentGridType}
							id="2"
						/>
						<svg>
							<defs>
								<marker
									id="head"
									orient="auto"
									markerWidth="5"
									markerHeight="3"
									refX="0.1"
									refY="1.5"
								>
									<path d="M 0 0 V 3 L 5 1.5 Z" fill="var(--foreground-color)" />
								</marker>
							</defs>
							<defs>
								<marker
									id="headTwo"
									orient="auto"
									markerWidth="3.5"
									markerHeight="5"
									refX="0"
									refY="2.5"
								>
									<path d="M 0 0 V 5 L 3.5 2.5 Z" fill="var(--foreground-color)" />
								</marker>
							</defs>
						</svg>
					</ReactFlow>
				</div>
				<SideTools dragOutsideRef={dragOutsideRef} />
			</div>
		</ConfigProvider>
	);
}
