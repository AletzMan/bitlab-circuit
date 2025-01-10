
import { Background, BackgroundVariant, Connection, Edge, ReactFlow, addEdge, useEdgesState, useNodesState, Node, ConnectionMode, Controls, MarkerType, Panel, useReactFlow, reconnectEdge, OnNodeDrag, useStore } from "@xyflow/react";
import { DragEvent, useCallback, useRef, useState } from "react";
import { ElectricalComponent } from "@/components/ElectricalComponents/ElectricalComponent";
import { ElectricalComponentState, ElectricalComponentType } from "@/types";
import { Wire } from "@/components/Wire/Wire";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import { ConnectionLine } from "@/components/ConnectionLine/ConnectionLine";
import { COMPONENTS } from "@/constants";
import ComponentDetail from "../ComponentDetails/ComponentDetails";
import { Board } from "../Board/Board";
import { zoomSelector } from "@/helpers";

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'electricalComponent',
        data: { type: ElectricalComponentType.Resistor, value: 100 },
        position: { x: 50, y: 200 },
    },
    {
        id: '2',
        type: 'electricalComponent',
        data: { type: ElectricalComponentType.Capacitor, value: 50 },
        position: { x: 250, y: 200 },
    },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
    electricalComponent: ElectricalComponent,
    board: Board
};

const edgeTypes = {
    wire: Wire
};

export function WorkFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | undefined>();
    const dragOutsideRef = useRef<ElectricalComponentType | null>(null);
    const edgeReconnectSuccessful = useRef(false);
    const overlappingNodeRef = useRef<Node | null>(null);
    const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();
    const showContent = useStore(zoomSelector);

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge({ ...connection, id: uuid(), type: "wire", markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: "#00aaff" } }, eds)),
        [setEdges]
    );

    const isConnectionValid = (connection: Edge | Connection) => {
        const { source, target } = connection;
        if (source === target) return false;
        return true;
    };

    const handleOnDragStart = (e: DragEvent<HTMLButtonElement>, type: ElectricalComponentType) => {
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
        const position = screenToFlowPosition({
            x: e.clientX - 24,
            y: e.clientY - 24
        });
        let node: Node | undefined;
        if ([ElectricalComponentType.Capacitor, ElectricalComponentType.Resistor].includes(type)) {
            node = {
                id: uuid(),
                type: 'electricalComponent',
                position,
                data: { type, value: 50 }
            };
        } else if (type === ElectricalComponentType.Board) {
            node = {
                id: uuid(),
                type,
                position,
                data: {},
                style: { height: 200, width: 200 },

            };
        }
        if (node) {
            setNodes((prevnodes) => prevnodes.concat(node));
        }
    };

    const handleNodeClick = (e: React.MouseEvent<Element>, node: Node) => {
        e.preventDefault();
        setSelectedNode(node);
    };

    const handlePaneClick = () => {
        setSelectedNode(undefined);
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
            setEdges(prevEdges => prevEdges.filter(prevEdge => prevEdge.id !== edge.id));
        }
    };

    const handleOnNodeDrag: OnNodeDrag = (e, dragNode) => {
        e.preventDefault();
        nodes.at(0);
        const overlappingNode = getIntersectingNodes(dragNode)?.[0];
        overlappingNodeRef.current = overlappingNode;

        setNodes((prevNodes) =>
            prevNodes.map((node) => {
                if (node.id === dragNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            state:
                                overlappingNode &&
                                    [
                                        ElectricalComponentType.Capacitor,
                                        ElectricalComponentType.Resistor,
                                    ].includes(
                                        overlappingNode?.data?.type as ElectricalComponentType
                                    )
                                    ? overlappingNode?.data?.type === dragNode?.data?.type
                                        ? ElectricalComponentState.Add
                                        : ElectricalComponentState.NotAdd
                                    : undefined,
                        },
                    };
                }
                return node;
            })
        );
    };

    const handleNodeDragStop: OnNodeDrag = (e, dragNode) => {
        e.preventDefault();
        if (
            !overlappingNodeRef.current ||
            (overlappingNodeRef?.current?.type !== ElectricalComponentType.Board &&
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

                        const position = { x: dragX + x, y: dragY + y };

                        return { ...node, position, parentId: undefined };
                    }
                    return node;
                });
            });
        }

        if (
            [
                ElectricalComponentType.Capacitor,
                ElectricalComponentType.Resistor,
            ].includes(
                overlappingNodeRef?.current?.data?.type as ElectricalComponentType
            ) &&
            dragNode?.data?.type === overlappingNodeRef?.current?.data?.type
        ) {
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

        if (overlappingNodeRef?.current?.type === ElectricalComponentType.Board) {
            setNodes((prevNodes) => [
                overlappingNodeRef?.current as Node,
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
                                }),
                                draggable: showContent,
                                selectable: showContent,
                                data: {
                                    ...node.data,
                                    visible: showContent,
                                    connectable: showContent,
                                },
                            };
                        }
                        return node;
                    }),
            ]);
        }
    };

    return (
        <div className={styles.board}>
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
                onNodeClick={handleNodeClick}
                onPaneClick={handlePaneClick}
                onReconnectStart={handleReconnectStart}
                onReconnect={handleReconnect}
                onReconnectEnd={handleReconnectEnd}
                onNodeDrag={handleOnNodeDrag}
                onNodeDragStop={handleNodeDragStop}
            >
                <Panel position="top-right" className={styles.panelComponents}>
                    <label className={styles.components_title}>Componentes</label>
                    <div className={styles.components}>
                        {COMPONENTS.map(component => (
                            <button key={component.label} className={styles.components_button} draggable onDragStart={(e) => handleOnDragStart(e, component.type)} title={component.label}>
                                {component.icon}
                            </button>
                        ))}
                    </div>
                </Panel>
                {selectedNode && <ComponentDetail node={selectedNode} />}
                <Background color="#f0f0f0" gap={10} variant={BackgroundVariant.Lines} id='1' />
                <Background color="#c1c1c1" gap={100} variant={BackgroundVariant.Lines} id='2' />
                <Controls />
            </ReactFlow>
        </div>
    );
}