import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ElectricalComponentNode, ElectricalComponentState, ElectricalComponentType } from "@/types";
import { CapacitorIcon, LockIcon, ResistorIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";



export function ElectricalComponent({ data: { type, value, rotation, state, isLock, prefix }, selected, id, parentId }: NodeProps<ElectricalComponentNode>) {
    const { updateNode } = useReactFlow();


    const isAdditionValid = state === ElectricalComponentState.Add;
    const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

    let positionTerminals: Position[] = [Position.Right, Position.Left];
    if (rotation === 90) positionTerminals = [Position.Bottom, Position.Top];
    if (rotation === 180) positionTerminals = [Position.Left, Position.Right];
    if (rotation === 270) positionTerminals = [Position.Top, Position.Bottom];

    return (
        <div className={`${styles.box} ${selected && styles.box_selected} ${isAdditionValid && styles.box_valid} ${isAdditionInvalid && styles.box_invalid}`} >
            {parentId && selected &&
                <div className={styles.lock} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon style={{ transform: `rotate(-${rotation}deg)` }} />}
                    {isLock && <LockIcon style={{ transform: `rotate(-${rotation}deg)` }} />}
                </div>
            }
            <div style={{ transform: `rotate(${rotation}deg)` }} className={styles.icon}>
                {type === ElectricalComponentType.Resistor && <ResistorIcon />}
                {type === ElectricalComponentType.Capacitor && <CapacitorIcon />}
            </div>
            <span className={styles.value} style={{ transform: `rotate(${rotation - rotation}deg)` }}>{value}{prefix}</span>
            <Terminal type="source" position={positionTerminals[0]} id="1" />
            <Terminal type="source" position={positionTerminals[1]} id="2" />
        </div>
    );
}