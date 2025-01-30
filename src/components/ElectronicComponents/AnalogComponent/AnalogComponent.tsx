import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentCollapsed, ComponentType } from "@/types";
import { LEDIcon, LockIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { useEffect, useMemo, useState } from "react";
import { ComponentsMap } from "@/constants/components";


export function AnalogComponent({ data: { type, value, rotation, flip, collapsed, isLock, prefix, designator, isReferenceVisible, isValueVisible, connectedHandles, size, color }, selected, id, parentId }: NodeProps<AnalogNode>) {
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

    const terminalSettings: Position[] = useMemo(() => {
        let position: Position[] = [];
        switch (rotation) {
            case 0: {
                position = [Position.Left, Position.Right, Position.Top];
                if (flip.x === -1 && flip.y === 1) {
                    position = [Position.Right, Position.Left, Position.Top];
                } else if (flip.y === -1 && flip.x === 1) {
                    position = [Position.Left, Position.Right, Position.Bottom];
                } else if (flip.y === -1 && flip.x === -1) {
                    position = [Position.Right, Position.Left, Position.Bottom];
                }
                return position;
            }
            case 90: {
                position = [Position.Top, Position.Bottom, Position.Right];
                if (flip.x === -1 && flip.y === 1) {
                    position = [Position.Top, Position.Bottom, Position.Left];
                } else if (flip.y === -1 && flip.x === 1) {
                    position = [Position.Bottom, Position.Top, Position.Right];
                } else if (flip.y === -1 && flip.x === -1) {
                    position = [Position.Bottom, Position.Top, Position.Left];
                }
                return position;
            }
            case 180: {
                position = [Position.Right, Position.Left, Position.Bottom];
                if (flip.x === -1 && flip.y === 1) {
                    position = [Position.Left, Position.Right, Position.Bottom];
                } else if (flip.y === -1 && flip.x === 1) {
                    position = [Position.Right, Position.Left, Position.Top];
                } else if (flip.y === -1 && flip.x === -1) {
                    position = [Position.Left, Position.Right, Position.Top];
                }
                return position;
            }
            case 270: {
                position = [Position.Bottom, Position.Top, Position.Left];
                if (flip.x === -1 && flip.y === 1) {
                    position = [Position.Bottom, Position.Top, Position.Right];
                } else if (flip.y === -1 && flip.x === 1) {
                    position = [Position.Top, Position.Bottom, Position.Left];
                } else if (flip.y === -1 && flip.x === -1) {
                    position = [Position.Top, Position.Bottom, Position.Right];
                }
                return position;
            }

            default:
                return [Position.Right, Position.Left, Position.Top];
        }
    }, [rotation, flip.x, flip.y]);

    return (
        <div className={`${styles.box}  ${isAdditionValid && styles.box_valid} ${isAdditionInvalid && styles.box_invalid}`} >
            {parentId && selected &&
                <div className={`${styles.lock} ${rotation === 90 && styles.lock_90}   ${rotation === 270 && styles.lock_270}`} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon />}
                    {isLock && <LockIcon />}
                </div>
            }<div className={`${selected && styles.box_selected}`}></div>
            <div style={{ transform: `rotate(${rotation}deg) scaleX(${rotation === 0 || rotation === 180 ? flip.x : flip.y})  scaleY(${rotation === 0 || rotation === 180 ? flip.y : flip.x})` }} className={styles.icon}>
                {ComponentsMap[type].componentType === ComponentType.Led
                    ? <LEDIcon color_led={color} />
                    : ComponentsMap[type].icon
                }
            </div>
            <Terminal type="source" position={terminalSettings[0]} id="1" isConnectable={!isConnected[0]} />
            <Terminal type="source" position={terminalSettings[1]} id="2" isConnectable={!isConnected[1]} />
            {type === ComponentType.Potentiometer && <Terminal type="source" position={terminalSettings[2]} id="3" isConnectable={!isConnected[2]} />}
            {isValueVisible && <span className={`${styles.value}  ${size === 'small' && styles.value_small} ${size === 'medium' && styles.value_medium} ${size === 'large' && styles.value_large}  ${rotation === 90 && styles.value_90}   ${rotation === 270 && styles.value_270}`} style={{ transform: `rotate(${rotation - rotation}deg) ` }}>{value}{prefix}</span>}
            {isReferenceVisible && <span className={`${styles.designator} ${size === 'small' && styles.designator_small} ${size === 'medium' && styles.designator_medium} ${size === 'large' && styles.designator_large} ${rotation === 90 && styles.designator_90}   ${rotation === 270 && styles.designator_270}`} style={{ transform: `rotate(${rotation - rotation}deg)` }} >{designator}</span>}
        </div>
    );
}