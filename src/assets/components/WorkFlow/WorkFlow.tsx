
import { Background, BackgroundVariant, Connection, Edge, ReactFlow, addEdge, useEdgesState, useNodesState, Node, ConnectionMode, Controls, MarkerType, Panel } from "@xyflow/react";
import { useCallback } from "react";
import { ElectricalComponent } from "../ElectricalComponents/ElectricalComponent";
import { ElectricalComponentType } from "../../types";
import { Wire } from "../Wire/Wire";
import styles from "./styles.module.css";
import { ConnectionLine } from "../ConnectionLine/ConnectionLine";

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
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge({ ...connection, type: "wire", markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: "#00aaff" } }, eds)),
        [setEdges]
    );

    const isConnectionValid = (connection: Edge | Connection) => {
        const { source, target } = connection;
        if (source === target) return false;
        return true;
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
            >
                <Panel position="top-right" className={styles.panel}>{'HOLA'}</Panel>
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