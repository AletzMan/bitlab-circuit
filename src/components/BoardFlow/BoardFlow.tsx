
import {
    Background, BackgroundVariant, Connection, Edge, ReactFlow, useEdgesState, useNodesState,
    ConnectionMode, Controls, MarkerType, useReactFlow, reconnectEdge, OnNodeDrag, Viewport, MiniMap,
    SelectionMode, OnSelectionChangeFunc,
    OnSelectionChangeParams,
} from "@xyflow/react";
import { DragEvent, useCallback, useRef, useState, KeyboardEvent } from "react";
import { AnalogComponent } from "@/components/AnalogComponent/AnalogComponent";
import { ComponentNode, ComponentState, ComponentType, UnitsType } from "@/types";
import { Wire } from "@/components/Wire/Wire";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import { ConnectionLine } from "@/components/ConnectionLine/ConnectionLine";
import { ARRAY_COMPONENTS, COMPONENTS } from "@/constants";
import ComponentProperties from "../ComponentProperties/ComponentProperties";
import { Board } from "../Board/Board";
import { isPointInBox } from "@/helpers";
import EdgeDetails from "../EdgeDetails/EdgeDetails";
import { Button, Card, ConfigProvider, Divider, Dropdown, Flex, Input, MenuProps, Space, Switch, Tabs, Tooltip, theme } from "antd";
import { DarkIcon, DeletetIcon, ExportIcon, FitZoomIcon, LightIcon, MenuIcon, MinusIcon, OpenFileIcon, PlusIcon, RedoIcon, ResetZoomIcon, SaveIcon, UndoIcon } from "@/icons";
import useHistoryManager from "@/hooks/useHistoryManager";
import useShortcuts from "@/hooks/useShortcuts";
import { useTheme } from "@/store";


const initialNodes: ComponentNode[] = [
    {
        id: uuid(),
        type: 'analogComponent',
        data: { type: ComponentType.Resistor, value: 100, rotation: 0, state: ComponentState.Undefined, isLock: false, unit: UnitsType.Ohm, prefix: 'Ω', has_properties: true },
        position: { x: 50, y: 200 },
    },
    {
        id: uuid(),
        type: 'analogComponent',
        data: { type: ComponentType.Capacitor, value: 50, rotation: 0, state: ComponentState.Undefined, isLock: false, unit: UnitsType.Henrio, prefix: 'mH', has_properties: true },
        position: { x: 250, y: 200 },
    },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
    analogComponent: AnalogComponent,
    board: Board
};

const edgeTypes = {
    wire: Wire,
    custom: Wire
};

const gridSize = 10; // Tamaño del grid 
export function BoardFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [activeTab, setActiveTab] = useState('components');
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<ComponentNode | undefined>();
    const [selectedNodes, setSelectedNodes] = useState<ComponentNode[]>([]);
    const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);
    const [viewPort, setViewPort] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
    const [selectedEdge, setSelectedEdge] = useState<Edge | undefined>();
    const [isSingleNodeSelection, setIsSingleNodeSelection] = useState(false);
    const [isSingleEdgeSelection, setIsSingleEdgeSelection] = useState(false);
    const dragOutsideRef = useRef<ComponentType | null>(null);
    const edgeReconnectSuccessful = useRef(false);
    const overlappingNodeRef = useRef<ComponentNode | null>(null);
    const { screenToFlowPosition, getIntersectingNodes, fitView } = useReactFlow();
    const { addNode, removeNode, addEdge, removeEdge, undo, redo, canUndo, canRedo } = useHistoryManager();
    const { duplicateComponents } = useShortcuts({ removeEdge, removeNode, undo, redo });
    const { currentTheme, setCurrentTheme } = useTheme();

    const onConnect = useCallback(
        (connection: Connection) => {
            const edge = {
                ...connection, id: uuid(),
                type: "wire", markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 10,
                    height: 10,
                    color: "#00aaff",
                    orient: "auto-start-reverse"
                }
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

    const handleOnDragStart = (e: DragEvent<HTMLElement>, type: ComponentType) => {
        dragOutsideRef.current = type;
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleOnDragover = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const type = dragOutsideRef.current;
        if (!type) return;
        let position = screenToFlowPosition({
            x: e.clientX - 24,
            y: e.clientY - 24
        });

        const boards = nodes?.filter(
            (node) => node.type === ComponentType.Board
        );
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

        let node: ComponentNode | undefined;
        if (ARRAY_COMPONENTS.includes(type)) {

            node = {
                id: uuid(),
                type: 'analogComponent',
                position,
                data: { type, value: 50, isLock: false, rotation: 0, state: ComponentState.Undefined, unit: UnitsType.Ohm, prefix: "Ω", has_properties: true },
                parentId: board?.id
            };
        } else if (type === ComponentType.Board) {
            node = {
                id: uuid(),
                type,
                position,
                data: { type: ComponentType.Board, value: 0, isLock: false, rotation: 0, state: ComponentState.Undefined, unit: UnitsType.Henrio, prefix: 'mH' },
                parentId: board?.id,
                style: { height: 200, width: 200 },
            };
        }
        if (node) {
            addNode(node);
        }
    };

    const handleNodeClick = (e: React.MouseEvent<Element>, node: ComponentNode) => {
        e.preventDefault();
        setSelectedNode(node);
        setSelectedEdge(undefined);
        setActiveTab("properties");
    };

    const handlePaneClick = () => {
        setSelectedNode(undefined);
        setSelectedEdge(undefined);
        setActiveTab("components");
    };

    const handleOnEdgeClick = (e: React.MouseEvent<Element, MouseEvent>, edge: Edge) => {
        e.preventDefault();
        setSelectedEdge(edge);
        setSelectedNode(undefined);
        setActiveTab("properties");
    };

    const handleOnEdgeMouseLeave = () => {

    };

    const handleReconnectStart = () => {
        edgeReconnectSuccessful.current = false;
    };

    const handleReconnect = (oldEdge: Edge, newConnection: Connection) => {
        edgeReconnectSuccessful.current = true;
        setEdges((prevEdges) => reconnectEdge(oldEdge, newConnection, prevEdges));
    };

    const handleReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            removeEdge([edge]);
        }
    };


    const handleOnNodeDrag: OnNodeDrag<ComponentNode> = (e, dragNode) => {
        e.preventDefault();

        const snapToGrid = (value: number) => Math.round(value / gridSize) * gridSize;

        // Ajustar la posición del nodo al grid
        const snappedX = snapToGrid(dragNode.position.x);
        const snappedY = snapToGrid(dragNode.position.y);

        // Encontrar nodos superpuestos
        const overlappingNode = getIntersectingNodes(dragNode)?.[0];
        overlappingNodeRef.current = overlappingNode as ComponentNode;

        // Actualizar nodos y su posición ajustada
        setNodes((prevNodes) =>
            prevNodes.map((node) => {
                if (node.id === dragNode.id) {
                    return {
                        ...node,
                        position: { x: snappedX, y: snappedY },
                        data: {
                            ...node.data,
                            state:
                                overlappingNode &&
                                    ARRAY_COMPONENTS.includes(overlappingNode?.data?.type as ComponentType)
                                    ? overlappingNode?.data?.type === dragNode?.data?.type
                                        ? ComponentState.Add
                                        : ComponentState.NotAdd
                                    : undefined,
                        },
                    };
                }
                return node;
            })
        );

    };


    const handleNodeDragStop: OnNodeDrag<ComponentNode> = (e, dragNode) => {
        e.preventDefault();
        if (
            !overlappingNodeRef.current ||
            (overlappingNodeRef?.current?.type !== ComponentType.Board &&
                dragNode?.parentId)
        ) {
            setNodes((prevNodes) => {
                const board = prevNodes?.find(
                    (prevNode) => prevNode.id === dragNode?.parentId
                );

                return prevNodes.map((node) => {
                    if (node.id === dragNode.id) {
                        const { x, y } = board?.position || { x: 0, y: 0 };
                        const { x: dragX, y: dragY } = dragNode?.position || { x: 0, y: 0 };

                        // Define el tamaño del grid
                        const gridSize = 10;

                        // Función para ajustar las coordenadas al grid
                        const snapToGrid = (value: number) => Math.round(value / gridSize) * gridSize;

                        // Ajustar la posición del nodo al grid
                        const snappedX = snapToGrid(dragX + x);
                        const snappedY = snapToGrid(dragY + y);

                        // Devuelve el nodo con la posición ajustada
                        return {
                            ...node,
                            position: { x: snappedX, y: snappedY },
                            parentId: undefined,
                        };
                    }
                    return node;
                });

            });
        }

        if (
            ARRAY_COMPONENTS.includes(overlappingNodeRef?.current?.data?.type as ComponentType) && dragNode?.data?.type === overlappingNodeRef?.current?.data?.type) {
            setNodes((prevNodes) =>
                prevNodes
                    .map((node) => {
                        if (node.id === overlappingNodeRef?.current?.id) {
                            return {
                                ...node,
                                data: {
                                    ...node?.data,
                                    value:
                                        (dragNode?.data?.value as number) +
                                        (node?.data?.value as number),
                                },
                            };
                        }
                        return node;
                    })
                    .filter((node) => node.id !== dragNode?.id)
            );
        }

        if (overlappingNodeRef?.current?.type === ComponentType.Board && selectedNode?.data.type !== ComponentType.Board) {
            setNodes((prevNodes) => [
                overlappingNodeRef?.current as ComponentNode,
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
                            } else if (
                                node.parentId &&
                                node?.parentId !== overlappingNodeRef?.current?.id
                            ) {
                                const prevBoard = prevNodes?.find(
                                    (node) => node?.id === dragNode?.parentId
                                );
                                const { x: prevBoardX, y: prevBoardY } =
                                    prevBoard?.position || {
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
                                })
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
        if (isUniqueNode) setSelectedNode(params.nodes[0] as ComponentNode);
        if (isUniqueEdge) setSelectedEdge(params.edges[0]);
        setSelectedNodes(params.nodes as ComponentNode[]);
        setSelectedEdges(params.edges);
    };

    const handleOnChangeTab = (activeKey: string) => {
        setActiveTab(activeKey);
    };

    const handleChangeViewPort = (viewport: Viewport) => {
        setViewPort(viewport);
    };

    const handleZoomReset = (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        setViewPort({ x: 0, y: 0, zoom: 1 });
    };

    const handleSelectionEnd = (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        if (selectedNode || selectedEdge) {
            setActiveTab("properties");
        } else {
            setActiveTab("components");
        }
    };

    const handleClickMenu: MenuProps['onClick'] = (info) => {
        console.log(info);
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const movement = {
            ArrowUp: { dx: 0, dy: -gridSize / 2 },
            ArrowDown: { dx: 0, dy: gridSize / 2 },
            ArrowLeft: { dx: -gridSize / 2, dy: 0 },
            ArrowRight: { dx: gridSize / 2, dy: 0 },
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

    const handleZoom = (position: 'in' | 'out' | 'reset' | 'fit') => {
        const newZoom = viewPort.zoom;

        switch (position) {
            case "in":
                if (newZoom < 3)
                    setViewPort({ x: 0, y: 0, zoom: newZoom + 0.1 });
                break;
            case "out":
                if (newZoom > 0.5)
                    if ((newZoom - 0.1) < 0.5)
                        setViewPort({ x: 0, y: 0, zoom: 0.5 });
                    else
                        setViewPort({ x: 0, y: 0, zoom: newZoom - 0.1 });
                break;
            case "reset":
                setViewPort({ x: 0, y: 0, zoom: 1 });
                break;
            case "fit":
                fitView({ maxZoom: 2, });
                break;
            default:
                break;
        }
    };

    return (
        <ConfigProvider theme={{ algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
            <div className={styles.board}>
                <Card className={styles.menu} size="small" styles={{ body: { padding: "0", width: "100%" } }}>
                    <Flex gap={30} >
                        <Dropdown menu={{ items: itemsFileMenu, onClick: handleClickMenu }}>
                            <Button styles={{ icon: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }} icon={<MenuIcon />} variant="filled" color="default" />
                        </Dropdown>
                        <Flex gap={10} style={{ width: "100%" }}>
                            <Divider type="vertical" orientation="center" style={{ height: "100%" }} />
                            <Tooltip placement="top" title="Undo (Ctrl+Z)"  >
                                <Button icon={<UndoIcon />} variant="dashed" color="default" onClick={undo} disabled={!canUndo} />
                            </Tooltip>
                            <Tooltip placement="top" title="Redo (Ctrl+Y)"  >
                                <Button icon={<RedoIcon />} variant="dashed" color="default" onClick={redo} disabled={!canRedo} />
                            </Tooltip>
                            <Divider type="vertical" orientation="center" style={{ height: "100%" }} />
                            <Space.Compact size="middle" >
                                <Tooltip placement="top" title="Zoom In (Ctrl+Scroll)"  >
                                    <Button
                                        type="primary"
                                        variant="outlined"
                                        color="default" icon={<PlusIcon />}
                                        styles={{ icon: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }}

                                        onClick={() => handleZoom('in')}
                                        disabled={viewPort.zoom >= 3} />
                                </Tooltip>
                                <Input value={`${Math.floor(viewPort.zoom * 100)}`.concat('%')} size="small" style={{ width: "50px", pointerEvents: 'none', textAlign: 'center' }} contentEditable={false} />
                                <Tooltip placement="top" title="Zoom Out (Ctrl+Scroll)"  >
                                    <Button
                                        type="primary"
                                        variant="outlined"
                                        color="default"
                                        icon={<MinusIcon />}
                                        styles={{ icon: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }}
                                        onClick={() => handleZoom('out')}
                                        disabled={viewPort.zoom === 0.5} />
                                </Tooltip>
                            </Space.Compact>
                            <Tooltip placement="top" title="Reset Zoom "  >
                                <Button icon={<ResetZoomIcon />} variant="dashed" color="default" onClick={() => handleZoom('reset')} />
                            </Tooltip>
                            <Tooltip placement="top" title="Fit Zoom "  >
                                <Button icon={<FitZoomIcon />} variant="dashed" color="default" onClick={() => handleZoom('fit')} />
                            </Tooltip>
                            <Divider type="vertical" orientation="center" style={{ height: "100%" }} />
                        </Flex>
                        <Flex align="center" style={{ padding: "0 10px 0 0" }} >
                            <Switch value={currentTheme === "light"} checkedChildren={<DarkIcon />} unCheckedChildren={<LightIcon />} onChange={(e) => e ? setCurrentTheme('light') : setCurrentTheme('dark')} />
                        </Flex>
                    </Flex>
                </Card>

                <div className={styles.flow}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        connectionMode={ConnectionMode.Loose}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        connectionLineComponent={ConnectionLine}
                        isValidConnection={isConnectionValid}
                        onDragOver={handleOnDragover}
                        onDrop={handleOnDrop}
                        onNodeDragStart={handleNodeClick}
                        onEdgeClick={handleOnEdgeClick}
                        onEdgeMouseLeave={handleOnEdgeMouseLeave}
                        onNodeClick={handleNodeClick}
                        onPaneClick={handlePaneClick}
                        onReconnectStart={handleReconnectStart}
                        onReconnect={handleReconnect}
                        onReconnectEnd={handleReconnectEnd}
                        onNodeDrag={handleOnNodeDrag}
                        onNodeDragStop={handleNodeDragStop}
                        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                        viewport={viewPort}
                        onViewportChange={handleChangeViewPort}
                        panOnScroll
                        maxZoom={3}
                        minZoom={0.5}
                        zoomOnPinch
                        selectionOnDrag
                        onSelectionChange={handleOnSelectionChange}
                        onSelectionEnd={handleSelectionEnd}
                        panOnDrag={[1, 2]} selectNodesOnDrag
                        selectionMode={SelectionMode.Partial} onKeyDown={handleOnKeyDown}

                    >

                        <Background color="var(--grid-small-color-dark)" gap={10} variant={BackgroundVariant.Lines} id='1' />
                        <Background color="var(--grid-large-color-dark)" gap={100} variant={BackgroundVariant.Lines} id='2' />
                        <Controls position="bottom-center" orientation="horizontal">
                            <button className="react-flow__controls-button" title="reset zoom" onClick={handleZoomReset}>
                                <ResetZoomIcon />
                            </button>
                        </Controls>
                        <MiniMap position="bottom-left" pannable />
                    </ReactFlow>
                </div>
                <Card className={styles.containerTabs} styles={{ body: { padding: "0" } }}>
                    <Tabs className={styles.tabs} type="card" size="small" items={[
                        {
                            label: "Components",
                            key: "components",
                            children:
                                <Flex wrap className={styles.divider}>
                                    <label className={styles.label}>Analog</label>
                                    <Divider style={{ margin: "0px 0 12px 0" }} variant="dashed" />
                                    <div className={styles.components}>
                                        {COMPONENTS.map(component => (
                                            <Tooltip key={component.label} placement="top" title={component.label}  >
                                                <Button className={styles.components_button} color="default" variant="filled" draggable onDragStart={(e) => handleOnDragStart(e, component.type)}   >
                                                    {component.icon}
                                                </Button>
                                            </Tooltip>
                                        ))}
                                    </div>
                                    <Divider style={{ margin: "12px 0 24px 0" }} />
                                </Flex>
                        },
                        {
                            label: "Properties",
                            key: "properties",
                            children: <>
                                {selectedNode && selectedNodes?.length > 0 &&
                                    <ComponentProperties
                                        node={selectedNode}
                                        removeNode={removeNode}
                                        selectedNodes={selectedNodes}
                                        isSingleNode={isSingleNodeSelection}
                                        duplicateComponents={duplicateComponents} />
                                }
                                {selectedEdge && selectedEdges?.length > 0 &&
                                    <EdgeDetails
                                        edge={selectedEdge}
                                        setSelectedEdge={setSelectedEdge}
                                        removeEdges={removeEdge}
                                        isSingleEdgeSelection={isSingleEdgeSelection}
                                        selectedEdges={selectedEdges} />
                                }
                            </>
                        }
                    ]} activeKey={activeTab} onChange={handleOnChangeTab} />
                </Card>
            </div>
        </ConfigProvider>
    );
}

const itemsFileMenu: MenuProps['items'] = [
    {
        label: 'Open File',
        key: '1',
        icon: <OpenFileIcon />,
        extra: 'Ctrl+Alt+O',
    },
    {
        label: 'Save File',
        key: '2',
        icon: <SaveIcon />,
        extra: 'Ctrl+Alt+S',
    },
    {
        label: 'Export Image...',
        key: '3',
        icon: <ExportIcon />,
        extra: 'Ctrl+Shift+E',
    },
    {
        label: 'Delete All',
        key: '4',
        icon: <DeletetIcon />,
        extra: 'Ctrl+Delete',
    }
];


