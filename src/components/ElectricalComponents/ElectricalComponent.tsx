import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ElectricalComponentData, ElectricalComponentState, ElectricalComponentType } from "@/types";
import { CapacitorIcon, LockIcon, ResistorIcon, UnlockIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
//import RotationHandle from "../RotationHandle/RotationHandle";

type ElectricalComponentNode = Node<ElectricalComponentData, 'string'>;

export function ElectricalComponent({ data: { type, value, rotation, state, isLock }, selected, id, parentId }: NodeProps<ElectricalComponentNode>) {
    const { updateNode } = useReactFlow();

    const isAdditionValid = state === ElectricalComponentState.Add;
    const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

    let positionTerminals: Position[] = [Position.Right, Position.Left];
    if (rotation === 90) positionTerminals = [Position.Bottom, Position.Top];

    return (
        <div className={`${styles.box} ${selected && styles.box_selected}`} style={{
            //transform: `rotate(${rotation}deg)`,
            ...(isAdditionValid && { background: "#58ed58" }),
            ...(isAdditionInvalid && { background: "#ff0505" }),
        }}>
            {/*<RotationHandle selected={selected} id={id} />*/}
            {parentId && selected &&
                <div className={styles.lock} onClick={() => updateNode(id, (prevNode) => ({ extent: prevNode.extent === 'parent' ? undefined : 'parent', data: { ...prevNode.data, isLock: !isLock } }))}>
                    {!isLock && <UnlockIcon style={{ transform: `rotate(-${rotation}deg)` }} />}
                    {isLock && <LockIcon style={{ transform: `rotate(-${rotation}deg)` }} />}
                </div>
            }
            <div style={{ transform: `rotate(${rotation}deg) ` }} >
                {type === ElectricalComponentType.Resistor && <ResistorIcon />}
                {type === ElectricalComponentType.Capacitor && <CapacitorIcon />}
            </div>
            <span className={styles.value} style={{ transform: `rotate(-${rotation}deg)` }}>{value}</span>
            <span style={{ position: "absolute", margin: "0 0 0 30px" }}>{rotation}</span>
            <Terminal type="source" style={{ position: "absolute", bottom: 0 }} position={positionTerminals[0]} id="right" />
            <Terminal type="source" position={positionTerminals[1]} id="left" />
        </div>
    );
}