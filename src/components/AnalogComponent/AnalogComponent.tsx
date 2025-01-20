import { Connection, NodeProps, Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import { AnalogNode, ComponentState, ComponentType } from "@/types";
import { CapacitorElectrolyticIcon, CapacitorIcon, DiodeIcon, InductorIcon, LEDIcon, LockIcon, PhotoDiodeIcon, ResistorIcon, RheostatIcon, SchottkyIcon, TVSDiodeIcon, ThermistorIcon, TunnelIcon, UnlockIcon, VaractorIcon, ZenerIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { useEffect, useMemo, useState } from "react";


export function AnalogComponent({ data: { type, value, rotation, flip, state, isLock, prefix, reference, isReferenceVisible, isValueVisible, connectedHandles }, selected, id, parentId }: NodeProps<AnalogNode>) {
    const { updateNode } = useReactFlow();
    const [isConnected, setIsConnected] = useState<boolean[]>([false, false]);

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

    const positionTerminals = useMemo(() => {
        switch (rotation) {
            case 90:
                return [Position.Bottom, Position.Top];
            case 180:
                return [Position.Left, Position.Right];
            case 270:
                return [Position.Top, Position.Bottom];
            default:
                return [Position.Right, Position.Left];
        }
    }, [rotation]);

    return (
        <div className={`${styles.box}  ${isAdditionValid && styles.box_valid} ${isAdditionInvalid && styles.box_invalid}`} >
            {parentId && selected &&
                <div className={`${styles.lock} ${rotation === 90 && styles.lock_90}   ${rotation === 270 && styles.lock_270}`} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon />}
                    {isLock && <LockIcon />}
                </div>
            }<div className={`${selected && styles.box_selected}`}>

            </div>
            <div style={{ transform: `rotate(${rotation}deg) scaleX(${rotation === 0 || rotation === 180 ? flip.x : flip.y})  scaleY(${rotation === 0 || rotation === 180 ? flip.y : flip.x})` }} className={styles.icon}>
                {type === ComponentType.Resistor && <ResistorIcon />}
                {type === ComponentType.Capacitor && <CapacitorIcon />}
                {type === ComponentType.CapacitorElectrolytic && <CapacitorElectrolyticIcon />}
                {type === ComponentType.Diode && <DiodeIcon />}
                {type === ComponentType.Led && <LEDIcon />}
                {type === ComponentType.Zener && <ZenerIcon />}
                {type === ComponentType.Schottky && <SchottkyIcon />}
                {type === ComponentType.Tunnel && <TunnelIcon />}
                {type === ComponentType.PhotoDiode && <PhotoDiodeIcon />}
                {type === ComponentType.TVSDiode && <TVSDiodeIcon />}
                {type === ComponentType.Varactor && <VaractorIcon />}
                {type === ComponentType.Rheostat && <RheostatIcon />}
                {type === ComponentType.Thermistor && <ThermistorIcon />}
                {type === ComponentType.Inductor && <InductorIcon />}
            </div>
            {isValueVisible && <span className={`${styles.value} ${rotation === 90 && styles.value_90}   ${rotation === 270 && styles.value_270}`} style={{ transform: `rotate(${rotation - rotation}deg) ` }}>{value}{prefix}</span>}
            {isReferenceVisible && <span className={`${styles.id} ${rotation === 90 && styles.value_90}   ${rotation === 270 && styles.value_270}`} style={{ transform: `rotate(${rotation - rotation}deg)` }}>{reference}</span>}
            <Terminal type="source" position={positionTerminals[0]} id="1" isConnectable={!isConnected[0]} />
            <Terminal type="source" position={positionTerminals[1]} id="2" isConnectable={!isConnected[1]} />
        </div>
    );
}