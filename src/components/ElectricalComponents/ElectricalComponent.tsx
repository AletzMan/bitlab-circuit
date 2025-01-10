import { Node, NodeProps, Position } from "@xyflow/react";
import { ElectricalComponentData, ElectricalComponentState, ElectricalComponentType } from "@/types";
import { CapacitorIcon, ResistorIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";
import RotationHandle from "../RotationHandle/RotationHandle";

type ElectricalComponentNode = Node<ElectricalComponentData, 'string'>;

export function ElectricalComponent({ data: { type, value, rotation, state }, selected, id }: NodeProps<ElectricalComponentNode>) {

    const isAdditionValid = state === ElectricalComponentState.Add;
    const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

    return (
        <div className={styles.box} style={{
            transform: `rotate(${rotation}deg)`,
            ...(isAdditionValid && { background: "#58ed58" }),
            ...(isAdditionInvalid && { background: "#ff0505" }),
        }}>
            <RotationHandle selected={selected} id={id} />
            {type === ElectricalComponentType.Resistor && <ResistorIcon />}
            {type === ElectricalComponentType.Capacitor && <CapacitorIcon />}
            <span className={styles.value} style={{ transform: `rotate(-${rotation}deg)` }}>{value}</span>
            <Terminal type="source" position={Position.Right} id="right" />
            <Terminal type="source" position={Position.Left} id="left" />
        </div>
    );
}