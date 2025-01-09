import { Node, NodeProps, Position } from "@xyflow/react";
import { ElectricalComponentData, ElectricalComponentType } from "@/types";
import { CapacitorIcon, ResistorIcon } from "@/icons";
import styles from "./styles.module.css";
import { Terminal } from "@/components/Terminal/Terminal";

type ElectricalComponentNode = Node<ElectricalComponentData, 'string'>;

export function ElectricalComponent({ data: { type, value } }: NodeProps<ElectricalComponentNode>) {
    return (
        <div className={styles.box}>
            {type === ElectricalComponentType.Resistor && <ResistorIcon />}
            {type === ElectricalComponentType.Capacitor && <CapacitorIcon />}
            <span className={styles.value}>{value}</span>
            <Terminal type="source" position={Position.Right} id="right" />
            <Terminal type="source" position={Position.Left} id="left" />
        </div>
    );
}