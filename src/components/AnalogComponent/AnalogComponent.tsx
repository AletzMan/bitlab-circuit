import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ComponentNode, ComponentState, ComponentType } from "@/types";
import { CapacitorElectrolyticIcon, CapacitorIcon, DiodeIcon, InductorIcon, LockIcon, ResistorIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";


export function AnalogComponent({ data: { type, value, rotation, state, isLock, prefix, reference }, selected, id, parentId }: NodeProps<ComponentNode>) {
    const { updateNode } = useReactFlow();


    const isAdditionValid = state === ComponentState.Add;
    const isAdditionInvalid = state === ComponentState.NotAdd;

    let positionTerminals: Position[] = [Position.Right, Position.Left];
    if (rotation === 90) positionTerminals = [Position.Bottom, Position.Top];
    if (rotation === 180) positionTerminals = [Position.Left, Position.Right];
    if (rotation === 270) positionTerminals = [Position.Top, Position.Bottom];

    return (
        <div className={`${styles.box} ${selected && styles.box_selected} ${isAdditionValid && styles.box_valid} ${isAdditionInvalid && styles.box_invalid}`} >
            {parentId && selected &&
                <div className={`${styles.lock} ${rotation === 90 && styles.lock_90}   ${rotation === 270 && styles.lock_270}`} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon />}
                    {isLock && <LockIcon />}
                </div>
            }
            <div style={{ transform: `rotate(${rotation}deg)` }} className={styles.icon}>
                {type === ComponentType.Resistor && <ResistorIcon />}
                {type === ComponentType.Capacitor && <CapacitorIcon />}
                {type === ComponentType.CapacitorElectrlytic && <CapacitorElectrolyticIcon />}
                {type === ComponentType.Diode && <DiodeIcon />}
                {type === ComponentType.Inductor && <InductorIcon />}
            </div>
            <span className={`${styles.value} ${rotation === 90 && styles.value_90}   ${rotation === 270 && styles.value_270}`} style={{ transform: `rotate(${rotation - rotation}deg)` }}>{value}{prefix}</span>
            <span className={`${styles.id} ${rotation === 90 && styles.value_90}   ${rotation === 270 && styles.value_270}`} style={{ transform: `rotate(${rotation - rotation}deg)` }}>{reference}</span>
            <Terminal type="source" position={positionTerminals[0]} id="1" />
            <Terminal type="source" position={positionTerminals[1]} id="2" />
        </div>
    );
}