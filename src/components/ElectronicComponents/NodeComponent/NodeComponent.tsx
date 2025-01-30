import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentCollapsed } from "@/types";
import { LockIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { CSSProperties, useEffect, useState } from "react";
import { useTheme } from "@/store";
import { ComponentsMap } from "@/constants/components";


export function NodeComponent({ data: { type, collapsed, isLock, designator, isDesignatorVisible, connectedHandles, color }, selected, id, parentId, }: NodeProps<AnalogNode>) {
    const { updateNode } = useReactFlow();
    const [isConnected, setIsConnected] = useState<boolean[]>([]);
    const { currentTheme } = useTheme();

    useEffect(() => {
        setIsConnected(connectedHandles);
    }, [connectedHandles]);

    const isAdditionValid = collapsed === ComponentCollapsed.Add;
    const isAdditionInvalid = collapsed === ComponentCollapsed.NotAdd;

    const onConnect = (connections: Connection[]) => {
        setConnectionsTerminals(connections, true);
    };

    const onDisconnect = (connections: Connection[]) => {
        setConnectionsTerminals(connections, false);
    };

    useNodeConnections({ onConnect, onDisconnect });

    const setConnectionsTerminals = (connections: Connection[], isOnConnect: boolean) => {
        const newState = [...connectedHandles];
        connections.map((connection) => {
            if (connection.target === id) {
                const handleNumber = Number(connection.targetHandle) - 1;
                newState[handleNumber] = isOnConnect;
            }
            if (connection.source === id) {
                const handleNumber = Number(connection.sourceHandle) - 1;
                newState[handleNumber] = isOnConnect;
            }
        });
        setIsConnected(newState);
        updateNode(id, (prevNode) => ({ data: { ...prevNode.data, connectedHandles: newState } }));
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
                <path d="M50,50 L50,3" className={`${styles.path} ${styles.path_top} ${isConnected[0] && styles.path_top_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></path>
                <path d="M50,50 L97,50" className={`${styles.path} ${styles.path_right} ${isConnected[1] && styles.path_right_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></path>
                <path d="M50,50 L50,97" className={`${styles.path} ${styles.path_bottom} ${isConnected[2] && styles.path_bottom_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></path>
                <path d="M50,50 L3,50" className={`${styles.path} ${styles.path_left} ${isConnected[3] && styles.path_left_connected}`} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}></path>
            </svg>
            <div className={styles.icon} style={{ "--wire-color": ((color === "#000000" || color === "rgb(0,0,0)") && currentTheme === 'dark') ? '#FFFFFF' : ((color?.toLowerCase() === "#ffffff" || color === "rgb(255,255,255)") && currentTheme === 'light') ? "#000000" : color } as CSSProperties}>
                {ComponentsMap[type].icon}
            </div>
            {isDesignatorVisible && <span className={`${styles.id} `} >{designator}</span>}
            <Terminal type="source" position={Position.Top} id="1" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[0]} />
            <Terminal type="source" position={Position.Right} id="2" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[1]} />
            <Terminal type="source" position={Position.Bottom} id="3" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[2]} />
            <Terminal type="source" position={Position.Left} id="4" style={{ backgroundColor: "transparent", borderColor: "transparent" }} isConnectable={!isConnected[3]} />
        </div>
    );
}