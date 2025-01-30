

import { Node, NodeProps, NodeResizer } from "@xyflow/react";
import { ComponentData } from "@/types";
import styles from "./styles.module.css";

type BoardNode = Node<ComponentData, "string">;

export function Board({ selected, data: { isDesignatorVisible, designator } }: NodeProps<BoardNode>) {

    return (
        <div className={`${styles.board} ${selected && styles.board_selected}`}
        >
            {isDesignatorVisible && <label className={styles.board_label}>{designator}</label>}
            {selected && <NodeResizer minWidth={200} minHeight={200} />}
        </div>
    );
}
