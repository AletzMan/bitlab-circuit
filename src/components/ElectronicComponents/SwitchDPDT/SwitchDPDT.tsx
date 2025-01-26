import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentCollapsed, ComponentType } from "@/types";
import { ArrowPushIcon, LockIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { useEffect, useMemo, useState, MouseEvent, CSSProperties } from "react";
import { ComponentsMap } from "@/constants/components";


export function SwitchDPDT({ data: { type, rotation, flip, collapsed, isLock, reference, isReferenceVisible, connectedHandles, size, state }, selected, id, parentId }: NodeProps<AnalogNode>) {
    const { updateNode, updateNodeData } = useReactFlow();
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

    const positionTerminals: { position: Position[], adjustment: CSSProperties[] } = useMemo(() => {
        let tempRotation: Position[] = [];
        let adjustment: CSSProperties[] = [];
        switch (rotation) {
            case 0: {
                tempRotation = [Position.Left, Position.Right, Position.Right];
                adjustment = [{ top: `calc(50% )` }, { top: `calc(50% + 10px)` }, { top: `calc(50% - 10px)` }];
                if (flip.x === -1 && flip.y === 1) {
                    tempRotation = [Position.Right, Position.Left, Position.Left];
                    adjustment = [{ top: `calc(50%)` }, { top: `calc(50% + 10px)` }, { top: `calc(50% - 10px)` }];
                } else if (flip.y === -1 && flip.x === 1) {
                    tempRotation = [Position.Left, Position.Right, Position.Right];
                    adjustment = [{ top: `calc(50% )` }, { top: `calc(50% - 10px)` }, { top: `calc(50% + 10px)` }];
                } else if (flip.y === -1 && flip.x === -1) {
                    tempRotation = [Position.Right, Position.Left, Position.Left];
                    adjustment = [{ top: `calc(50% )` }, { top: `calc(50% - 10px)` }, { top: `calc(50% + 10px)` }];
                }
                return { position: tempRotation, adjustment };
            }
            case 90: {
                tempRotation = [Position.Top, Position.Bottom, Position.Bottom];
                adjustment = [{ left: `calc(50%)` }, { left: `calc(50% - 10px)` }, { left: `calc(50% + 10px)` }];
                if (flip.x === -1 && flip.y === 1) {
                    tempRotation = [Position.Top, Position.Bottom, Position.Bottom];
                    adjustment = [{ left: `calc(50%)` }, { left: `calc(50% + 10px)` }, { left: `calc(50% - 10px)` }];
                } else if (flip.y === -1 && flip.x === 1) {
                    tempRotation = [Position.Bottom, Position.Top, Position.Top];
                    adjustment = [{ left: `calc(50%)` }, { left: `calc(50% - 10px)` }, { left: `calc(50% + 10px)` }];
                } else if (flip.y === -1 && flip.x === -1) {
                    tempRotation = [Position.Bottom, Position.Top, Position.Top];
                    adjustment = [{ left: `calc(50%)` }, { left: `calc(50% + 10px)` }, { left: `calc(50% - 10px)` }];
                }
                return { position: tempRotation, adjustment };
            }
            case 180: {
                tempRotation = [Position.Right, Position.Left, Position.Left];
                adjustment = [{ top: `calc(50% )` }, { top: `calc(50% - 10px)` }, { top: `calc(50% + 10px)` }];
                if (flip.x === -1 && flip.y === 1) {
                    tempRotation = [Position.Left, Position.Right, Position.Right];
                    adjustment = [{ top: `calc(50%)` }, { top: `calc(50% - 10px)` }, { top: `calc(50% + 10px)` }];
                } else if (flip.y === -1 && flip.x === 1) {
                    tempRotation = [Position.Right, Position.Left, Position.Left];
                    adjustment = [{ top: `calc(50% )` }, { top: `calc(50% + 10px)` }, { top: `calc(50% - 10px)` }];
                } else if (flip.y === -1 && flip.x === -1) {
                    tempRotation = [Position.Left, Position.Right, Position.Right];
                    adjustment = [{ top: `calc(50%)` }, { top: `calc(50% + 10px)` }, { top: `calc(50% - 10px)` }];
                }
                return { position: tempRotation, adjustment };
            }
            case 270: {
                tempRotation = [Position.Bottom, Position.Top, Position.Top];
                adjustment = [{ left: `calc(50%)` }, { left: `calc(50% + 10px)` }, { left: `calc(50% - 10px)` }];
                if (flip.x === -1 && flip.y === 1) {
                    tempRotation = [Position.Bottom, Position.Top, Position.Top];
                    adjustment = [{ left: `calc(50%)` }, { left: `calc(50% - 10px)` }, { left: `calc(50% + 10px)` }];
                } else if (flip.y === -1 && flip.x === 1) {
                    tempRotation = [Position.Top, Position.Bottom, Position.Bottom];
                    adjustment = [{ left: `calc(50%)` }, { left: `calc(50% + 10px)` }, { left: `calc(50% - 10px)` }];
                } else if (flip.y === -1 && flip.x === -1) {
                    tempRotation = [Position.Top, Position.Bottom, Position.Bottom];
                    adjustment = [{ left: `calc(50%)` }, { left: `calc(50% - 10px)` }, { left: `calc(50% + 10px)` }];
                }
                return { position: tempRotation, adjustment };;
            }

            default:
                return { position: tempRotation, adjustment };;
        }
    }, [rotation, flip.x, flip.y]);

    const handleChangeState = (e: MouseEvent<HTMLButtonElement>) => {

        console.log(e);
        updateNodeData(id, { state: { ...state, on: !state?.on } });
        if (type === ComponentType.PusuhButtonClose || type === ComponentType.PusuhButtonOpen) {
            setTimeout(() => {
                updateNodeData(id, { state: { ...state, on: state?.on } });
            }, 100);
        }
    };

    return (
        <div className={`${styles.box}  ${isAdditionValid && styles.box_valid} ${isAdditionInvalid && styles.box_invalid}`} >
            {parentId && selected &&
                <div className={`${styles.lock} ${rotation === 90 && styles.lock_90}   ${rotation === 270 && styles.lock_270}`} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon />}
                    {isLock && <LockIcon />}
                </div>
            }<div className={`${selected && styles.box_selected}`}></div>
            {selected &&
                <button className={styles.action} onClick={handleChangeState} >
                    <ArrowPushIcon className={`${styles.action_icon} ${state?.on && styles.action_icon_active}`} />
                </button>
            }
            <div style={{ transform: `rotate(${rotation}deg) scaleX(${rotation === 0 || rotation === 180 ? flip.x : flip.y})  scaleY(${rotation === 0 || rotation === 180 ? flip.y : flip.x})` }} className={styles.icon}>
                {state ? state?.on ? ComponentsMap[type]?.state?.iconON : ComponentsMap[type].state?.iconOFF : ComponentsMap[type].icon}
            </div>
            <Terminal type="source" position={positionTerminals.position[0]} id="1" isConnectable={!isConnected[0]} style={positionTerminals.adjustment[0]} />
            <Terminal type="source" position={positionTerminals.position[1]} id="2" isConnectable={!isConnected[1]} style={positionTerminals.adjustment[1]} />
            <Terminal type="source" position={positionTerminals.position[2]} id="3" isConnectable={!isConnected[2]} style={positionTerminals.adjustment[2]} />
            {isReferenceVisible && <span className={`${styles.reference} ${size === 'small' && styles.reference_small} ${size === 'medium' && styles.reference_medium} ${size === 'large' && styles.reference_large} ${rotation === 90 && styles.reference_90}   ${rotation === 270 && styles.reference_270}`} style={{ transform: `rotate(${rotation - rotation}deg)` }} >{reference}</span>}
        </div>
    );
}