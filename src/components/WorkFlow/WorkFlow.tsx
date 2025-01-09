
import { Background, BackgroundVariant, Connection, Edge, ReactFlow, addEdge, useEdgesState, useNodesState, Node, ConnectionMode, Controls, MarkerType, Panel, useReactFlow } from "@xyflow/react";
import { DragEvent, useCallback, useRef } from "react";
import { ElectricalComponent } from "@/components/ElectricalComponents/ElectricalComponent";
import { ElectricalComponentType } from "@/types";
import { Wire } from "@/components/Wire/Wire";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import { ConnectionLine } from "@/components/ConnectionLine/ConnectionLine";
import { COMPONENTS } from "@/constants";

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
    electricalComponent: ElectricalComponent
};

const edgeTypes = {
    wire: Wire
};

export function WorkFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const dragOutsideRef = useRef<ElectricalComponentType | null>(null);
    const { screenToFlowPosition } = useReactFlow();


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
        }
        if (node) {
            setNodes((prevnodes) => prevnodes.concat(node));
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
                <Background color="#f0f0f0" gap={10} variant={BackgroundVariant.Lines} id='1' />
                <Background color="#c1c1c1" gap={100} variant={BackgroundVariant.Lines} id='2' />
                <Controls />
                <svg>
                    <defs>
                        <linearGradient id="wire">
                            <stop offset={0} stopColor="#028dff" />
                            <stop offset={100} stopColor="#0235ff" />
                        </linearGradient>
                    </defs>
                </svg>
            </ReactFlow>
        </div>
    );
}