

import { Node, NodeProps, NodeResizer } from "@xyflow/react";
import { ComponentData } from "@/types";
import styles from "./styles.module.css";

type BoardNode = Node<ComponentData, "string">;

export function Board({ selected, data: { isReferenceVisible, designator } }: NodeProps<BoardNode>) {

    return (
        <div className={`${styles.board} ${selected && styles.board_selected}`}
        >
            {isReferenceVisible && <label className={styles.board_label}>{designator}</label>}
            {selected && <NodeResizer minWidth={200} minHeight={200} />}
        </div>
    );
}
