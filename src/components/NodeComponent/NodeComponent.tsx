import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentState } from "@/types";
import { LockIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { CSSProperties, useEffect, useState } from "react";
import { useTheme } from "@/store";
import { COMPONENTS } from "@/constants";


export function NodeComponent({ data: { type, state, isLock, reference, isReferenceVisible, connectedHandles, color }, selected, id, parentId, }: NodeProps<AnalogNode>) {
    const { updateNode } = useReactFlow();
    const [isConnected, setIsConnected] = useState<boolean[]>([]);
    const { currentTheme } = useTheme();

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
            <svg viewBox="0 0 100 100" className={styles.paths}>
                <path d="m 53.65 1.83 v 36 h -7.3 V 1.83 z" className={`${styles.path} ${styles.path_top} ${isConnected[0] && styles.path_top_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></path>
                <path d="m 98.2 46.4 v 7.25 h -34 V 46.4 z" className={`${styles.path} ${styles.path_right} ${isConnected[1] && styles.path_right_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></path>
                <path d="m 53.65 62.13 v 36 h -7.3 V 62.13 z" className={`${styles.path} ${styles.path_bottom} ${isConnected[2] && styles.path_bottom_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></path>
                <path d="m 35.8 46.4 v 7.25 h -34 V 46.4 z" className={`${styles.path} ${styles.path_left} ${isConnected[3] && styles.path_left_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></path>
            </svg>
            {/*<div className={`${styles.terminal} ${styles.terminal_top} ${isConnected[0] && styles.terminal_top_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></div>
            <div className={`${styles.terminal} ${styles.terminal_right} ${isConnected[1] && styles.terminal_right_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></div>
            <div className={`${styles.terminal} ${styles.terminal_bottom} ${isConnected[2] && styles.terminal_bottom_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></div>
        <div className={`${styles.terminal} ${styles.terminal_left} ${isConnected[3] && styles.terminal_left_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></div>*/}
            <div className={styles.icon} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}>
                {COMPONENTS[type].icon}
            </div>
            {isReferenceVisible && <span className={`${styles.id} `} >{reference}</span>}
            <Terminal type="source" position={Position.Top} id="1" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[0]} />
            <Terminal type="source" position={Position.Right} id="2" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[1]} />
            <Terminal type="source" position={Position.Bottom} id="3" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[2]} />
            <Terminal type="source" position={Position.Left} id="4" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[3]} />
        </div>
    );
}