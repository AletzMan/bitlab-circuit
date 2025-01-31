import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentCollapsed } from "@/types";
import { LockIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { ComponentsMap } from "@/constants/components";


export function RelayDPST({ data: { type, rotation, flip, collapsed, isLock, designator, isDesignatorVisible, connectedHandles, size, state }, selected, id, parentId }: NodeProps<AnalogNode>) {
    const { updateNode } = useReactFlow();
    const [isConnected, setIsConnected] = useState<boolean[]>([false, false]);

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
        connections.map((connection) => {
            const newState = [...isConnected];
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

    const terminalSettings: { position: Position[], adjustment: CSSProperties[] } = useMemo(() => {
        let position: Position[] = [];
        let adjustment: CSSProperties[] = [];
        switch (rotation) {
            case 0: {
                position = [Position.Left, Position.Left, Position.Left, Position.Right, Position.Right, Position.Right];
                adjustment = [{ top: `calc(50% + 35px)` }, { top: `calc(50% + 5px)` }, { top: `calc(50% - 25px)` }, { top: `calc(50% - 25px)` }, { top: `calc(50% + 5px)` }, { top: `calc(50% + 35px)` }];
                if (flip.x === -1 && flip.y === 1) {
                    position = [Position.Right, Position.Right, Position.Right, Position.Left, Position.Left, Position.Left];
                    adjustment = [{ top: `calc(50% + 35px)` }, { top: `calc(50% + 5px)` }, { top: `calc(50% - 25px)` }, { top: `calc(50% - 25px)` }, { top: `calc(50% + 5px)` }, { top: `calc(50% + 35px)` }];
                } else if (flip.y === -1 && flip.x === 1) {
                    position = [Position.Left, Position.Left, Position.Left, Position.Right, Position.Right, Position.Right];
                    adjustment = [{ top: `calc(50% - 35px)` }, { top: `calc(50% - 5px)` }, { top: `calc(50% + 25px)` }, { top: `calc(50% + 25px)` }, { top: `calc(50% - 5px)` }, { top: `calc(50% - 35px)` }];
                } else if (flip.y === -1 && flip.x === -1) {
                    position = [Position.Right, Position.Right, Position.Right, Position.Left, Position.Left, Position.Left];
                    adjustment = [{ top: `calc(50% - 35px)` }, { top: `calc(50% - 5px)` }, { top: `calc(50% + 25px)` }, { top: `calc(50% + 25px)` }, { top: `calc(50% - 5px)` }, { top: `calc(50% - 35px)` }];
                }
                return { position: position, adjustment };
            }
            case 90: {
                position = [Position.Top, Position.Top, Position.Top, Position.Bottom, Position.Bottom, Position.Bottom];
                adjustment = [{ left: `calc(50% - 35px)` }, { left: `calc(50% - 5px)` }, { left: `calc(50% + 25px)` }, { left: `calc(50% + 25px)` }, { left: `calc(50% - 5px)` }, { left: `calc(50% - 35px)` }];
                if (flip.x === -1 && flip.y === 1) {
                    position = [Position.Top, Position.Top, Position.Top, Position.Bottom, Position.Bottom, Position.Bottom];
                    adjustment = [{ left: `calc(50% + 35px)` }, { left: `calc(50% + 5px)` }, { left: `calc(50% - 25px)` }, { left: `calc(50% - 25px)` }, { left: `calc(50% + 5px)` }, { left: `calc(50% + 35px)` }];
                } else if (flip.y === -1 && flip.x === 1) {
                    position = [Position.Bottom, Position.Bottom, Position.Bottom, Position.Top, Position.Top, Position.Top];
                    adjustment = [{ left: `calc(50% - 35px)` }, { left: `calc(50% - 5px)` }, { left: `calc(50% + 25px)` }, { left: `calc(50% + 25px)` }, { left: `calc(50% - 5px)` }, { left: `calc(50% - 35px)` }];
                } else if (flip.y === -1 && flip.x === -1) {
                    position = [Position.Bottom, Position.Bottom, Position.Bottom, Position.Top, Position.Top, Position.Top];
                    adjustment = [{ left: `calc(50% + 35px)` }, { left: `calc(50% + 5px)` }, { left: `calc(50% - 25px)` }, { left: `calc(50% - 25px)` }, { left: `calc(50% + 5px)` }, { left: `calc(50% + 35px)` }];
                }
                return { position: position, adjustment };
            }
            case 180: {
                position = [Position.Right, Position.Right, Position.Right, Position.Left, Position.Left, Position.Left];
                adjustment = [{ top: `calc(50% - 35px)` }, { top: `calc(50% - 5px)` }, { top: `calc(50% + 25px)` }, { top: `calc(50% + 25px)` }, { top: `calc(50% - 5px)` }, { top: `calc(50% - 35px)` }];
                if (flip.x === -1 && flip.y === 1) {
                    position = [Position.Left, Position.Left, Position.Left, Position.Right, Position.Right, Position.Right];
                    adjustment = [{ top: `calc(50% - 35px)` }, { top: `calc(50% - 5px)` }, { top: `calc(50% + 25px)` }, { top: `calc(50% + 25px)` }, { top: `calc(50% - 5px)` }, { top: `calc(50% - 35px)` }];
                } else if (flip.y === -1 && flip.x === 1) {
                    position = [Position.Right, Position.Right, Position.Right, Position.Left, Position.Left, Position.Left];
                    adjustment = [{ top: `calc(50% + 35px)` }, { top: `calc(50% + 5px)` }, { top: `calc(50% - 25px)` }, { top: `calc(50% - 25px)` }, { top: `calc(50% + 5px)` }, { top: `calc(50% + 35px)` }];
                } else if (flip.y === -1 && flip.x === -1) {
                    position = [Position.Left, Position.Left, Position.Left, Position.Right, Position.Right, Position.Right];
                    adjustment = [{ top: `calc(50% + 35px)` }, { top: `calc(50% + 5px)` }, { top: `calc(50% - 25px)` }, { top: `calc(50% - 25px)` }, { top: `calc(50% + 5px)` }, { top: `calc(50% + 35px)` }];
                }
                return { position: position, adjustment, };
            }
            case 270: {
                position = [Position.Bottom, Position.Bottom, Position.Bottom, Position.Top, Position.Top, Position.Top];
                adjustment = [{ left: `calc(50% + 35px)` }, { left: `calc(50% + 5px)` }, { left: `calc(50% - 25px)` }, { left: `calc(50% - 25px)` }, { left: `calc(50% + 5px)` }, { left: `calc(50% + 35px)` }];
                if (flip.x === -1 && flip.y === 1) {
                    position = [Position.Bottom, Position.Bottom, Position.Bottom, Position.Top, Position.Top, Position.Top];
                    adjustment = [{ left: `calc(50% - 35px)` }, { left: `calc(50% - 5px)` }, { left: `calc(50% + 25px)` }, { left: `calc(50% + 25px)` }, { left: `calc(50% - 5px)` }, { left: `calc(50% - 35px)` }];
                } else if (flip.y === -1 && flip.x === 1) {
                    position = [Position.Top, Position.Top, Position.Top, Position.Bottom, Position.Bottom, Position.Bottom];
                    adjustment = [{ left: `calc(50% + 35px)` }, { left: `calc(50% + 5px)` }, { left: `calc(50% - 25px)` }, { left: `calc(50% - 25px)` }, { left: `calc(50% + 5px)` }, { left: `calc(50% + 35px)` }];
                } else if (flip.y === -1 && flip.x === -1) {
                    position = [Position.Top, Position.Top, Position.Top, Position.Bottom, Position.Bottom, Position.Bottom];
                    adjustment = [{ left: `calc(50% - 35px)` }, { left: `calc(50% - 5px)` }, { left: `calc(50% + 25px)` }, { left: `calc(50% + 25px)` }, { left: `calc(50% - 5px)` }, { left: `calc(50% - 35px)` }];
                }
                return { position: position, adjustment };
            }

            default:
                return { position: position, adjustment, };
        }
    }, [rotation, flip.x, flip.y]);

    return (
        <div className={`${styles.box}  ${isAdditionValid && styles.box_valid} ${isAdditionInvalid && styles.box_invalid} ${rotation === 90 && styles.box_90} ${rotation === 270 && styles.box_270}`}  >
            {parentId && selected &&
                <div className={`${styles.lock} ${rotation === 90 && styles.lock_90}   ${rotation === 270 && styles.lock_270}`} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon />}
                    {isLock && <LockIcon />}
                </div>
            }<div className={`${selected && styles.box_selected}`}></div>
            <div className={styles.icon} style={{ transform: `rotate(${rotation}deg) scaleX(${rotation === 0 || rotation === 180 ? flip.x : flip.y})  scaleY(${rotation === 0 || rotation === 180 ? flip.y : flip.x})` }}>
                {state ? state?.on ? ComponentsMap[type]?.state?.iconON : ComponentsMap[type].state?.iconOFF : ComponentsMap[type].icon}
            </div>
            <Terminal type="source" position={terminalSettings.position[0]} id="1" isConnectable={!isConnected[0]} style={terminalSettings.adjustment[0]} />
            <Terminal type="source" position={terminalSettings.position[1]} id="2" isConnectable={!isConnected[1]} style={terminalSettings.adjustment[1]} />
            <Terminal type="source" position={terminalSettings.position[2]} id="3" isConnectable={!isConnected[2]} style={terminalSettings.adjustment[2]} />
            <Terminal type="source" position={terminalSettings.position[3]} id="4" isConnectable={!isConnected[3]} style={terminalSettings.adjustment[3]} />
            <Terminal type="source" position={terminalSettings.position[4]} id="5" isConnectable={!isConnected[4]} style={terminalSettings.adjustment[4]} />
            <Terminal type="source" position={terminalSettings.position[5]} id="6" isConnectable={!isConnected[5]} style={terminalSettings.adjustment[5]} />
            {isDesignatorVisible && <span className={`${styles.designator} ${size === 'small' && styles.designator_small} ${size === 'medium' && styles.designator_medium} ${size === 'large' && styles.designator_large} ${rotation === 90 && styles.designator_90}   ${rotation === 270 && styles.designator_270}`} style={{ transform: `rotate(${rotation - rotation}deg)` }} >{designator}</span>}
        </div>
    );
}