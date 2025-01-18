import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentState, ComponentType } from "@/types";
import { LockIcon, NodeIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { useEffect, useState } from "react";


export function NodeComponent({ data: { type, state, isLock, reference, isReferenceVisible, connectedHandles, color }, selected, id, parentId, }: NodeProps<AnalogNode>) {
    const { updateNode } = useReactFlow();
    const [isConnected, setIsConnected] = useState<boolean[]>([]);

    useEffect(() => {
        setIsConnected(connectedHandles);
    }, [connectedHandles]);

    const isAdditionValid = state === ComponentState.Add;
    const isAdditionInvalid = state === ComponentState.NotAdd;

    const onConnect = (connections: Connection[]) => {
        setConnectionsTerminals(connections, true);
    };

    const onDisconnect = (connections: Connection[]) => {
        setConnectionsTerminals(connections, false);
    };

    useNodeConnections({ onConnect, onDisconnect });

    const setConnectionsTerminals = (connections: Connection[], isOnConnect: boolean) => {
        connections.map((connection) => {
            const newState = [...connectedHandles];
            if (connection.target === id) {
                const handleNumber = Number(connection.targetHandle) - 1;
                newState[handleNumber] = isOnConnect;
                setIsConnected(newState);
                updateNode(id, (prevNode) => ({ data: { ...prevNode.data, connectedHandles: newState } }));
                return connection.target === id;
            }
            if (connection.source === id) {
                const handleNumber = Number(connection.sourceHandle) - 1;
                newState[handleNumber] = isOnConnect;
                setIsConnected(newState);
                updateNode(id, (prevNode) => ({ data: { ...prevNode.data, connectedHandles: newState } }));
                return connection.source === id;
            }
        });
    };

    return (
        <div className={`${styles.box}  ${isAdditionValid && styles.box_valid} ${isAdditionInvalid && styles.box_invalid}`} >
            {parentId && selected &&
                <div className={`${styles.lock} `} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon />}
                    {isLock && <LockIcon />}
                </div>
            }
            <div className={`${selected && styles.box_selected}`}></div>
            <div className={`${styles.terminal} ${styles.terminal_top} ${isConnected[0] && styles.terminal_top_connected}`} style={{ backgroundColor: isConnected[0] ? color : 'transparent' }}></div>
            <div className={`${styles.terminal} ${styles.terminal_right} ${isConnected[1] && styles.terminal_right_connected}`} style={{ backgroundColor: isConnected[1] ? color : 'transparent' }}></div>
            <div className={`${styles.terminal} ${styles.terminal_bottom} ${isConnected[2] && styles.terminal_bottom_connected}`} style={{ backgroundColor: isConnected[2] ? color : 'transparent' }}></div>
            <div className={`${styles.terminal} ${styles.terminal_left} ${isConnected[3] && styles.terminal_left_connected}`} style={{ backgroundColor: isConnected[3] ? color : 'transparent' }}></div>
            <div className={styles.icon} style={{ color: color }}>
                {type === ComponentType.Node && <NodeIcon />}
            </div>
            {isReferenceVisible && <span className={`${styles.id} `} >{reference}</span>}
            <Terminal type="source" position={Position.Top} id="1" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[0]} />
            <Terminal type="source" position={Position.Right} id="2" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[1]} />
            <Terminal type="source" position={Position.Bottom} id="3" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[2]} />
            <Terminal type="source" position={Position.Left} id="4" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[3]} />
        </div>
    );
}