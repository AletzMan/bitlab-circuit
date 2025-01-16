import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentState, ComponentType } from "@/types";
import { LockIcon, NodeIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { useState } from "react";


export function NodeComponent({ data: { type, state, isLock, reference }, selected, id, parentId }: NodeProps<AnalogNode>) {
    const { updateNode } = useReactFlow();
    const [isConnected, setIsConnected] = useState<boolean[]>([false, false, false, false]);

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
            const newState = [...isConnected];
            if (connection.target === id) {
                const handleNumber = Number(connection.targetHandle) - 1;
                newState[handleNumber] = isOnConnect;
                setIsConnected(newState);
                return connection.target === id;
            }
            if (connection.source === id) {
                const handleNumber = Number(connection.sourceHandle) - 1;
                newState[handleNumber] = isOnConnect;
                setIsConnected(newState);
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
            <div className={`${styles.terminal} ${styles.terminal_vertical}`}></div>
            <div className={`${styles.terminal} ${styles.terminal_horizontal}`}></div>
            <div className={styles.icon}>
                {type === ComponentType.Node && <NodeIcon />}
            </div>
            <span className={`${styles.id}  `} >{reference}</span>
            <Terminal type="source" position={Position.Top} id="1" nodeid={id} style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[0]} />
            <Terminal type="source" position={Position.Right} id="2" nodeid={id} style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[1]} />
            <Terminal type="source" position={Position.Bottom} id="3" nodeid={id} style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[2]} />
            <Terminal type="source" position={Position.Left} id="4" nodeid={id} style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[3]} />
        </div>
    );
}