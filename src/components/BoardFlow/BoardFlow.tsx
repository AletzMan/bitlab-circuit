
/* eslint-disable react-hooks/exhaustive-deps */

import {
    Background, BackgroundVariant, Connection, Edge, ReactFlow, useEdgesState, useNodesState,
    ConnectionMode, useReactFlow, reconnectEdge, OnNodeDrag, Viewport, MiniMap,
    SelectionMode, OnSelectionChangeFunc,
    OnSelectionChangeParams,
    OnEdgesChange,
    XYPosition,
} from "@xyflow/react";
import { DragEvent, useCallback, useRef, useState, KeyboardEvent, useEffect } from "react";
import { ComponentEdge, AnalogNode, ComponentCollapsed, ComponentType, UnitsType, Categories } from "@/types";
import { Wire } from "@/components/Wire/Wire";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import { ConnectionLine } from "@/components/ConnectionLine/ConnectionLine";
import { ComponentProperties } from "../ComponentProperties/ComponentProperties";
import { AnalogComponent } from "@/components/ElectronicComponents/AnalogComponent/AnalogComponent";
import { Board } from "@/components/ElectronicComponents/Board/Board";
import { NodeComponent } from "@/components/ElectronicComponents/NodeComponent/NodeComponent";
import { TransistorComponent } from "@/components/ElectronicComponents/TransistorComponent/TransistorComponent";
import { MechanicalComponent } from "@/components/ElectronicComponents/MechanicalComponent/MechanicalComponent";
import { getComponentProperties, getImageBackgroundDrag, getNewPositionByOverlapping, groupByToArray, isPointInBox } from "@/helpers";
import EdgeDetails from "../EdgeDetails/EdgeDetails";
import { Button, Card, Collapse, ConfigProvider, Divider, Dropdown, Flex, Input, MenuProps, Select, Space, Switch, Tabs, Tooltip, theme } from "antd";
import { DarkIcon, DeletetIcon, ExportIcon, FitZoomIcon, LightIcon, MenuIcon, MinusIcon, OpenFileIcon, PlusIcon, RedoIcon, ResetZoomIcon, SaveIcon, UndoIcon } from "@/icons";
import useHistoryManager from "@/hooks/useHistoryManager";
import useShortcuts from "@/hooks/useShortcuts";
import { ComponentsMap } from "@/constants/components";
import { useSelectedItemsState } from "@/hooks/useSelectedItemsState";
import { useTheme } from "@/store";
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

const initialNodes: AnalogNode[] = [
    {
        id: uuid(),
        type: 'analogComponent',
        data: { name: 'Resistor', category: Categories.Resistors, type: ComponentType.Resistor, value: 1, rotation: 0, flip: { x: 1, y: 1 }, collapsed: ComponentCollapsed.Undefined, isLock: false, unit: UnitsType.Ohm, prefix: 'KΩ', has_properties: true, designator: "R1", isValueVisible: true, isDesignatorVisible: true, connectedHandles: [false, false], size: 'small' },
        position: { x: 100, y: 170 },
    },
    {
        id: uuid(),
        type: 'analogComponent',
        data: { name: 'Capacitor', category: Categories.Capacitors, type: ComponentType.Capacitor, value: 4.7, rotation: 0, flip: { x: 1, y: 1 }, collapsed: ComponentCollapsed.Undefined, isLock: false, unit: UnitsType.Capacitance, prefix: 'µF', has_properties: true, designator: "C1", isValueVisible: true, isDesignatorVisible: true, connectedHandles: [false, false], size: 'small' },
        position: { x: 240, y: 170 },
    },
    {
        id: uuid(),
        type: 'nodeComponent',
        data: { name: 'Node', category: Categories.Structure, type: ComponentType.Node, value: 0, rotation: 0, flip: { x: 1, y: 1 }, collapsed: ComponentCollapsed.Undefined, isLock: false, unit: UnitsType.Undefined, prefix: '', has_properties: false, designator: "N1", isValueVisible: false, isDesignatorVisible: false, connectedHandles: [false, false, false, false], color: "var(--foreground-color)", size: 'small' },
        position: { x: 90, y: 90 },
    },
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
    custom: Wire
};

const GRID_SIZE = 10; // Tamaño del grid 
export function BoardFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [activeTab, setActiveTab] = useState('components');
    const [edges, setEdges, onEdgesChange] = useEdgesState<ComponentEdge>(initialEdges);
    const [currentTypeGrid, setCurrentTypeGrid] = useState<BackgroundVariant | undefined>(BackgroundVariant.Lines);
    const [viewPort, setViewPort] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
    const dragOutsideRef = useRef<ComponentType | null>(null);
    const edgeReconnectSuccessful = useRef(false);
    const overlappingNodeRef = useRef<AnalogNode | null>(null);
    const { screenToFlowPosition, getIntersectingNodes, fitView, updateNode } = useReactFlow();
    const { addNode, addEdge, removeEdge, undo, redo, canUndo, canRedo } = useHistoryManager();
    const { duplicateComponents } = useShortcuts({ undo, redo });
    const { currentTheme, setCurrentTheme } = useTheme();
    const { selectedNode, setSelectedNode, selectedNodes, setSelectedNodes, selectedEdge, setSelectedEdge, selectedEdges, setSelectedEdges, setIsSingleNodeSelection, setIsSingleEdgeSelection } = useSelectedItemsState();


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", currentTheme);
    }, []);

    const onConnect = useCallback(
        (connection: Connection) => {
            const edge = {
                ...connection, id: uuid(),
                data: {
                    color: nodes.find(node => node.id === connection.target)?.data.color || nodes.find(node => node.id === connection.source)?.data.color || 'var(--foreground-color)',
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
        const imageBackgroundDrag = getImageBackgroundDrag(type);
        e.dataTransfer.setDragImage(imageBackgroundDrag, 30, 25);
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
            x: e.clientX - 30,
            y: e.clientY - 30
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

        let node: AnalogNode | undefined;

        const { value, unit, prefix, designator, type: typeComponent, has_properties, isDesignatorVisible, isValueVisible, connectedHandles, color, style, size, name, category, collapsed, state, value_optional, unit_optional, prefix_optional, isValueOptionalVisible } = getComponentProperties(type, nodes);

        if (type as ComponentType && Object.keys(ComponentsMap).includes(type)) {

            node = {
                id: uuid(),
                type: typeComponent,
                position,
                data: { name, type, category, value, isLock: false, rotation: 0, flip: { x: 1, y: 1 }, collapsed, state, unit, prefix, has_properties, designator, isDesignatorVisible, isValueVisible, connectedHandles, color, size, value_optional, unit_optional, prefix_optional, isValueOptionalVisible },
                parentId: board?.id,
                style
            };
        }
        if (node) {
            addNode(node);
        }
    };

    const handleNodeClick = (e: React.MouseEvent<Element>, node: AnalogNode) => {
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

    const handleOnEdgeClick = (e: React.MouseEvent<Element, MouseEvent>, edge: ComponentEdge) => {
        e.preventDefault();
        setSelectedEdge(edge);
        setSelectedNode(undefined);
        setActiveTab("properties");
    };



    const handleReconnectStart = () => {
        edgeReconnectSuccessful.current = false;
    };

    const handleReconnect = (oldEdge: ComponentEdge, newConnection: Connection) => {
        edgeReconnectSuccessful.current = true;
        const oldNode = nodes.find(node => node.id === oldEdge.target);
        const newNode = nodes.find(node => node.id === newConnection.target);
        if (oldNode && newNode) {
            const newHandlesStateOldNode = oldNode?.data.connectedHandles;
            const newHandlesStateNewNode = newNode?.data.connectedHandles;
            newHandlesStateOldNode[Number(oldEdge.targetHandle) - 1] = false;
            newHandlesStateNewNode[Number(newConnection.targetHandle) - 1] = true;
            updateNode(oldNode?.id, (prevNode) => ({ data: { ...prevNode.data, connectedHandles: newHandlesStateOldNode } }));
            updateNode(newConnection.target, (prevNode) => ({ data: { ...prevNode.data, connectedHandles: newHandlesStateNewNode } }));
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
                        position: { x: dragNode.position.x, y: dragNode.position.y },
                        data: {
                            ...node.data,
                            collapsed:
                                overlappingNode &&
                                    Object.keys(ComponentsMap).includes(overlappingNode?.data?.type as ComponentType)
                                    ? overlappingNode.data.type !== ComponentType.Board ? ComponentCollapsed.NotAdd : undefined
                                    : undefined,
                        },
                    };
                }
                return node;
            })
        );

    };

    const handleNodeDragStop: OnNodeDrag<AnalogNode> = (e, dragNode) => {
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

        if (Object.keys(ComponentsMap).includes(typeComponent) && selectedNode?.data.type !== ComponentType.Board && typeComponent !== ComponentType.Board) {

            const newPosition = getNewPositionByOverlapping(dragNode.position, overlappingNodeRef?.current?.position as XYPosition);
            setNodes((prevNodes) =>
                prevNodes
                    .map((node) => {
                        if (node.id === dragNode?.id) {
                            return {
                                ...node,
                                position: newPosition,
                                data: {
                                    ...node?.data,
                                    collapsed: ComponentCollapsed.Undefined
                                },
                            };
                        }
                        return node;
                    })
            );
        }

        if (overlappingNodeRef?.current?.type === ComponentType.Board && selectedNode?.data.type !== ComponentType.Board) {
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
        if (isUniqueNode) setSelectedNode(params.nodes[0] as AnalogNode);
        if (isUniqueEdge) setSelectedEdge(params.edges[0] as ComponentEdge);
        setSelectedNodes(params.nodes as AnalogNode[]);
        setSelectedEdges(params.edges as ComponentEdge[]);
    };

    const handleOnChangeTab = (activeKey: string) => {
        setActiveTab(activeKey);
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

    const handleClickMenu: MenuProps['onClick'] = (info) => {
        console.log(info);
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const movement = {
            ArrowUp: { dx: 0, dy: (-GRID_SIZE / 2) + 5 },
            ArrowDown: { dx: 0, dy: (GRID_SIZE / 2) - 5 },
            ArrowLeft: { dx: (-GRID_SIZE / 2) + 5, dy: 0 },
            ArrowRight: { dx: (GRID_SIZE / 2) - 5, dy: 0 },
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

    const handleChangeTheme = (checked: boolean, e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newTheme = checked ? 'light' : 'dark';
        setCurrentTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
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
                            <Tooltip placement="top" title="Reset Zoom" >
                                <Button icon={<ResetZoomIcon />} variant="dashed" color="default" onClick={() => handleZoom('reset')} />
                            </Tooltip>
                            <Tooltip placement="top" title="Fit Zoom" >
                                <Button icon={<FitZoomIcon />} variant="dashed" color="default" onClick={() => handleZoom('fit')} />
                            </Tooltip>
                            <Divider type="vertical" orientation="center" style={{ height: "100%" }} />
                            <Tooltip placement="top" title="Grid Pattern" >
                                <Select options={[
                                    { title: 'Lines', label: 'Lines', value: BackgroundVariant.Lines },
                                    { title: 'Dots', label: 'Dots', value: BackgroundVariant.Dots },
                                    { title: 'Cross', label: 'Cross', value: BackgroundVariant.Cross },
                                ]} defaultValue={currentTypeGrid} onChange={(e) => setCurrentTypeGrid(e)} />
                            </Tooltip>
                            <Divider type="vertical" orientation="center" style={{ height: "100%" }} />
                        </Flex>
                        <Flex align="center" style={{ padding: "0 10px 0 0" }} >
                            <Switch value={currentTheme === "light"} checkedChildren={<DarkIcon />} unCheckedChildren={<LightIcon />} onChange={handleChangeTheme} />
                        </Flex>
                    </Flex>
                </Card>

                <div className={styles.flow} >
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
                        onNodeDragStart={handleNodeClick}
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
                        snapGrid={[GRID_SIZE, GRID_SIZE]} snapToGrid
                        panOnDrag={[1, 2]}
                        selectNodesOnDrag
                        selectionMode={SelectionMode.Partial} onKeyDown={handleOnKeyDown}>
                        <Background color={'var(--grid-small-color)'} gap={GRID_SIZE} variant={currentTypeGrid} id='1' size={1.5} />
                        <Background color={'var(--grid-large-color)'} gap={GRID_SIZE * 10} variant={currentTypeGrid} id='2' />
                        <svg>
                            <defs>
                                <marker
                                    id='head'
                                    orient="auto"
                                    markerWidth='5'
                                    markerHeight='3'
                                    refX='0.1'
                                    refY='1.5'
                                >
                                    <path d='M 0 0 V 3 L 5 1.5 Z' fill="var(--foreground-color)" />
                                </marker>
                            </defs>
                            <defs>
                                <marker
                                    id='headTwo'
                                    orient="auto"
                                    markerWidth='3.5'
                                    markerHeight='5'
                                    refX='0'
                                    refY='2.5'
                                >
                                    <path d='M 0 0 V 5 L 3.5 2.5 Z' fill="var(--foreground-color)" />
                                </marker>
                            </defs>
                        </svg>
                    </ReactFlow>
                </div>
                <Card className={styles.containerTabs} styles={{ body: { padding: "0" } }}>
                    <Tabs className={styles.tabs} type="card" size="small" items={[
                        {
                            label: "Design",
                            key: "components",
                            children:
                                <Collapse className={styles.divider} size="small" defaultActiveKey={['1']} items={
                                    [{
                                        key: "1",
                                        label: "Components",
                                        showArrow: false,
                                        children:
                                            <div className={styles.components}>
                                                {groupByToArray(Object.values(ComponentsMap), 'category').map(category => (
                                                    <div key={category.category} className={styles.components_container}>
                                                        <label className={styles.label}>{category.category}</label>
                                                        <Divider style={{ margin: '0' }} variant="dashed" />
                                                        <div className={styles.components_group}>
                                                            {category.items.map(component => (
                                                                <Tooltip key={component.name} placement="top" title={component.name} color="cyan" >
                                                                    <Button className={styles.components_button} color="default" variant="filled" draggable onDragStart={(e) => handleOnDragStart(e, component.componentType)} >
                                                                        {component.icon}
                                                                    </Button>
                                                                </Tooltip>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))

                                                }
                                            </div>
                                    },
                                    {
                                        key: "2",
                                        label: 'Overview',
                                        showArrow: false,
                                        children: <>
                                            <Flex className={styles.minimap} vertical>
                                                <MiniMap pannable style={{ alignSelf: 'center', justifySelf: 'flex-end', position: 'relative', bottom: 0 }} />
                                            </Flex>
                                        </>
                                    }
                                    ]
                                }>

                                </Collapse>
                        },
                        {
                            label: "Properties",
                            key: "properties",
                            children: <>
                                {selectedNode && selectedNodes!.length > 0 &&
                                    <ComponentProperties
                                        duplicateComponents={duplicateComponents} />
                                }
                                {selectedEdge && selectedEdges?.length > 0 &&
                                    <EdgeDetails
                                        setEdges={setEdges}
                                        removeEdges={removeEdge} />
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


